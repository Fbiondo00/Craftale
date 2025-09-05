-- Migration: Create Quote Management Tables
-- Description: Sets up tables for managing user quotes and versions

-- ============================================
-- 1. Create user_quotes table
-- ============================================
create table if not exists public.user_quotes (
  id bigint generated always as identity primary key,
  quote_sequence bigint generated always as identity unique not null,  -- Auto-incrementing sequence
  user_id uuid references auth.users(id) on delete cascade,
  quote_number text unique not null,  -- Formatted: Q-YYYY-NNNN
  tier_id bigint references public.pricing_tiers(id),
  level_id bigint references public.pricing_levels(id),
  selected_services jsonb default '[]'::jsonb,
  base_price numeric(10, 2) not null default 0,
  services_price numeric(10, 2) default 0,
  discount_amount numeric(10, 2) default 0,
  tax_amount numeric(10, 2) default 0,
  total_price numeric(10, 2) not null default 0,
  status text default 'draft' check (status in ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'expired')),
  expires_at timestamp with time zone,
  submitted_at timestamp with time zone,
  reviewed_at timestamp with time zone,
  contact_preferences jsonb default '{}'::jsonb,
  notes text,
  admin_notes text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.user_quotes is 'Stores user-generated quotes with pricing details and status tracking';

-- ============================================
-- 2. Create quote_versions table for tracking changes
-- ============================================
create table if not exists public.quote_versions (
  id bigint generated always as identity primary key,
  quote_id bigint references public.user_quotes(id) on delete cascade,
  version_number int not null,
  changes jsonb not null,
  changed_by uuid references auth.users(id),
  created_at timestamp with time zone default now(),
  constraint unique_quote_version unique(quote_id, version_number)
);

comment on table public.quote_versions is 'Tracks version history and changes for each quote';

-- ============================================
-- 3. Create trigger to auto-generate quote numbers
-- ============================================
-- Simple function to format the quote number based on the auto-incrementing sequence
create or replace function public.set_quote_number()
returns trigger
language plpgsql
security invoker  -- No special privileges needed
set search_path = ''
as $$
declare
  current_year int;
begin
  -- Only set if quote_number is null
  if new.quote_number is not null then
    return new;
  end if;
  
  -- Get current year
  current_year := extract(year from now())::int;
  
  -- Format the quote number using the auto-generated sequence
  -- The quote_sequence column is already populated by IDENTITY
  new.quote_number := 'Q-' || current_year || '-' || lpad(new.quote_sequence::text, 4, '0');
  
  return new;
end;
$$;

-- Grant execute to authenticated users (needed for trigger)
grant execute on function public.set_quote_number() to authenticated;

-- Revoke from public/anon
revoke execute on function public.set_quote_number() from public, anon;

create trigger auto_generate_quote_number
  before insert on public.user_quotes
  for each row
  execute function public.set_quote_number();

-- ============================================
-- 5. Create function to track quote versions
-- ============================================
create or replace function public.track_quote_version()
returns trigger
language plpgsql
security definer  -- Changed to definer to bypass RLS for system operations
set search_path = ''
as $$
declare
  v_version_number int;
  v_changes jsonb;
begin
  -- Only track if there are actual changes
  if old is distinct from new then
    -- Get the next version number
    select coalesce(max(version_number), 0) + 1
    into v_version_number
    from public.quote_versions
    where quote_id = new.id;
    
    -- Build changes object
    v_changes := jsonb_build_object(
      'old', to_jsonb(old),
      'new', to_jsonb(new),
      'changed_fields', (
        select jsonb_object_agg(key, jsonb_build_object('old', old_val, 'new', new_val))
        from (
          select key, 
                 to_jsonb(old) -> key as old_val,
                 to_jsonb(new) -> key as new_val
          from jsonb_object_keys(to_jsonb(new)) as key
          where to_jsonb(old) -> key is distinct from to_jsonb(new) -> key
        ) changes
      )
    );
    
    -- Insert version record
    insert into public.quote_versions (quote_id, version_number, changes, changed_by)
    values (new.id, v_version_number, v_changes, auth.uid());
  end if;
  
  return new;
end;
$$;

-- Grant execute to authenticated users (needed for trigger)
grant execute on function public.track_quote_version() to authenticated;

-- Revoke from public/anon
revoke execute on function public.track_quote_version() from public, anon;

create trigger track_quote_changes
  after update on public.user_quotes
  for each row
  execute function public.track_quote_version();

-- ============================================
-- 6. Apply updated_at trigger to user_quotes
-- ============================================
create trigger update_user_quotes_updated_at 
  before update on public.user_quotes
  for each row 
  execute function public.update_updated_at_column();

-- ============================================
-- 7. Function to expire old quotes
-- ============================================
-- Uses SECURITY DEFINER for system maintenance task that needs to update all quotes
create or replace function public.expire_old_quotes()
returns void
language plpgsql
security definer  -- System maintenance function needs to bypass RLS
set search_path = ''  -- Prevent search path attacks
as $$
declare
  v_expired_count int;
begin
  -- Update all expired quotes regardless of owner (system maintenance)
  update public.user_quotes
  set status = 'expired',
      updated_at = now()
  where status in ('submitted', 'under_review')
    and expires_at < now();
  
  -- Get count for logging
  get diagnostics v_expired_count = row_count;
  
  if v_expired_count > 0 then
    raise notice 'Expired % quotes', v_expired_count;
  end if;
exception
  when others then
    -- Log error but don't fail
    raise warning 'Failed to expire quotes: %', sqlerrm;
end;
$$;

-- Grant execute only to authenticated (typically called by cron/scheduled job)
grant execute on function public.expire_old_quotes() to authenticated;

-- Revoke from public/anon
revoke execute on function public.expire_old_quotes() from public, anon;

-- ============================================
-- 8. Function to calculate quote totals
-- ============================================
create or replace function public.calculate_quote_totals(
  p_level_id bigint,
  p_service_ids jsonb,
  p_discount_amount numeric default 0
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
stable
as $$
declare
  v_base_price numeric;
  v_services_price numeric;
  v_subtotal numeric;
  v_tax_amount numeric;
  v_total numeric;
begin
  -- Get base price from level
  select price into v_base_price
  from public.pricing_levels
  where id = p_level_id;
  
  -- Calculate services price
  select coalesce(sum(base_price), 0) into v_services_price
  from public.optional_services
  where id::text = any(array(select jsonb_array_elements_text(p_service_ids)));
  
  -- Calculate totals
  v_subtotal := v_base_price + v_services_price - coalesce(p_discount_amount, 0);
  v_tax_amount := v_subtotal * 0.22;
  v_total := v_subtotal + v_tax_amount;
  
  return jsonb_build_object(
    'base_price', v_base_price,
    'services_price', v_services_price,
    'discount_amount', p_discount_amount,
    'subtotal', v_subtotal,
    'tax_amount', v_tax_amount,
    'total', v_total
  );
end;
$$;

-- Grant execute to authenticated users (calculation function)
grant execute on function public.calculate_quote_totals(bigint, jsonb, numeric) to authenticated;

-- Revoke from public/anon
revoke execute on function public.calculate_quote_totals(bigint, jsonb, numeric) from public, anon;

-- ============================================
-- Create indexes for performance
-- ============================================
create index idx_user_quotes_user_id on public.user_quotes(user_id);
create index idx_user_quotes_status on public.user_quotes(status);
create index idx_user_quotes_created_at on public.user_quotes(created_at desc);
create index idx_user_quotes_expires_at on public.user_quotes(expires_at);
create index idx_user_quotes_tier_id on public.user_quotes(tier_id);
create index idx_user_quotes_level_id on public.user_quotes(level_id);
create index idx_quote_versions_quote_id on public.quote_versions(quote_id);
create index idx_quote_versions_changed_by on public.quote_versions(changed_by);

-- ============================================
-- Enable Row Level Security
-- ============================================
alter table public.user_quotes enable row level security;
alter table public.quote_versions enable row level security;

-- ============================================
-- Create RLS policies for user_quotes
-- ============================================
-- Note: SELECT policy for user_quotes is defined in admin_system migration
-- as a combined policy to avoid multiple permissive policies

-- Users can insert their own quotes
create policy "Users can create quotes" 
  on public.user_quotes
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

-- Note: UPDATE policy for user_quotes is defined in admin_system migration
-- as a combined policy to avoid multiple permissive policies

-- Users cannot delete quotes (soft delete via status change only)
-- No DELETE policy created intentionally

-- ============================================
-- Create RLS policies for quote_versions
-- ============================================
-- Users can view versions of their quotes
create policy "Users can view versions of their quotes" 
  on public.quote_versions
  for select
  to authenticated
  using (
    exists (
      select 1 
      from public.user_quotes 
      where public.user_quotes.id = quote_id 
      and public.user_quotes.user_id = (select auth.uid())
    )
  );

-- Users can insert versions for their own quotes (through trigger)
create policy "Users can insert versions for their quotes" 
  on public.quote_versions
  for insert
  to authenticated
  with check (
    exists (
      select 1 
      from public.user_quotes 
      where public.user_quotes.id = quote_id 
      and public.user_quotes.user_id = (select auth.uid())
    )
  );

-- ============================================
-- Create helper functions for quotes
-- ============================================

-- Function to calculate quote totals
create or replace function public.calculate_quote_total(
  p_base_price numeric,
  p_services_price numeric,
  p_discount_amount numeric,
  p_tax_rate numeric default 0.22
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
immutable
as $$
declare
  v_subtotal numeric;
  v_tax_amount numeric;
  v_total numeric;
begin
  v_subtotal := coalesce(p_base_price, 0) + coalesce(p_services_price, 0) - coalesce(p_discount_amount, 0);
  v_tax_amount := v_subtotal * p_tax_rate;
  v_total := v_subtotal + v_tax_amount;
  
  return jsonb_build_object(
    'subtotal', v_subtotal,
    'tax_amount', v_tax_amount,
    'total', v_total
  );
end;
$$;

-- Grant execute to authenticated and anon (pure calculation)
grant execute on function public.calculate_quote_total(numeric, numeric, numeric, numeric) to authenticated, anon;

-- Function to check if quote is editable
create or replace function public.is_quote_editable(p_quote_id bigint)
returns boolean
language plpgsql
security invoker
set search_path = ''
stable
as $$
declare
  v_status text;
  v_user_id uuid;
begin
  select status, user_id
  into v_status, v_user_id
  from public.user_quotes
  where id = p_quote_id;
  
  if not found then
    return false;
  end if;
  
  -- Check if user owns the quote and it's in draft status
  return v_user_id = (select auth.uid()) and v_status = 'draft';
end;
$$;

-- Grant execute to authenticated users (needs user context)
grant execute on function public.is_quote_editable(bigint) to authenticated;

-- Revoke from public/anon
revoke execute on function public.is_quote_editable(bigint) from public, anon;