-- Migration: Create Discount System Tables
-- Description: Sets up comprehensive discount and pricing configuration system

-- ============================================
-- 1. Create discounts table
-- ============================================
create table if not exists public.discounts (
  id bigint generated always as identity primary key,
  code text unique not null,
  name text not null,
  description text,
  discount_type text not null check (discount_type in ('percentage', 'fixed', 'bundle')),
  discount_value numeric(10, 2) not null,
  min_purchase_amount numeric(10, 2),
  max_discount_amount numeric(10, 2),
  usage_limit int,
  usage_count int default 0,
  user_specific boolean default false,
  user_id uuid references auth.users(id),
  starts_at timestamp with time zone default now(),
  expires_at timestamp with time zone,
  applies_to text not null check (applies_to in ('all', 'tier', 'level', 'service')),
  applies_to_ids jsonb default '[]'::jsonb,
  conditions jsonb default '{}'::jsonb,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint check_percentage_value check (
    discount_type != 'percentage' or discount_value <= 100
  ),
  constraint check_user_specific check (
    (user_specific = true and user_id is not null) or
    (user_specific = false and user_id is null)
  )
);

comment on table public.discounts is 'Stores discount codes and promotional offers with usage tracking';

-- ============================================
-- 2. Create pricing_config table
-- ============================================
create table if not exists public.pricing_config (
  id bigint generated always as identity primary key,
  config_key text unique not null,
  config_value jsonb not null,
  description text,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.pricing_config is 'Stores global pricing configuration settings and parameters';

-- ============================================
-- 3. Create applied_discounts table
-- ============================================
create table if not exists public.applied_discounts (
  id bigint generated always as identity primary key,
  quote_id bigint references public.user_quotes(id) on delete cascade,
  discount_id bigint references public.discounts(id),
  discount_amount numeric(10, 2) not null,
  applied_at timestamp with time zone default now(),
  constraint unique_quote_discount unique(quote_id)
);

comment on table public.applied_discounts is 'Tracks applied discount codes to quotes';

-- ============================================
-- Create indexes for performance
-- ============================================
create index idx_discounts_code on public.discounts(code);
create index idx_discounts_active on public.discounts(is_active);
create index idx_discounts_dates on public.discounts(starts_at, expires_at);
create index idx_discounts_user_id on public.discounts(user_id);
create index idx_pricing_config_key on public.pricing_config(config_key);
create index idx_applied_discounts_quote_id on public.applied_discounts(quote_id);
create index idx_applied_discounts_discount_id on public.applied_discounts(discount_id);

-- ============================================
-- Apply updated_at triggers
-- ============================================
create trigger update_discounts_updated_at 
  before update on public.discounts
  for each row 
  execute function public.update_updated_at_column();

create trigger update_pricing_config_updated_at 
  before update on public.pricing_config
  for each row 
  execute function public.update_updated_at_column();

-- ============================================
-- Enable Row Level Security
-- ============================================
alter table public.discounts enable row level security;
alter table public.pricing_config enable row level security;
alter table public.applied_discounts enable row level security;

-- ============================================
-- Create RLS policies for discounts
-- ============================================
-- Public can view active discounts (anon only)
create policy "Public can view active discounts" 
  on public.discounts
  for select
  to anon
  using (
    is_active = true 
    and user_specific = false
    and starts_at <= now()
    and (expires_at is null or expires_at > now())
  );

-- ============================================
-- Create RLS policies for pricing_config
-- ============================================
-- Public can view active config
create policy "Public can view active config" 
  on public.pricing_config
  for select
  to anon, authenticated
  using (is_active = true);

-- ============================================
-- Create RLS policies for applied_discounts
-- ============================================
-- Users can view their own applied discounts
create policy "Users can view own applied discounts" 
  on public.applied_discounts
  for select
  to authenticated
  using (
    exists (
      select 1 from public.user_quotes q
      where q.id = applied_discounts.quote_id
      and q.user_id = (select auth.uid())
    )
  );

-- ============================================
-- Create helper functions for discounts
-- ============================================

-- Function to validate discount code
create or replace function public.validate_discount(
  p_code text,
  p_quote_id bigint default null,
  p_tier_id bigint default null,
  p_purchase_amount numeric default 0
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
stable
as $$
declare
  v_discount record;
  v_user_id uuid;
  v_usage_count int;
begin
  v_user_id := (select auth.uid());
  
  -- Get discount details
  select * into v_discount
  from public.discounts
  where lower(code) = lower(p_code)
    and is_active = true
    and now() >= starts_at
    and (expires_at is null or now() <= expires_at);
  
  if not found then
    return jsonb_build_object(
      'valid', false,
      'error', 'Invalid or expired discount code'
    );
  end if;
  
  -- Check usage limit
  if v_discount.usage_limit is not null then
    if v_discount.usage_count >= v_discount.usage_limit then
      return jsonb_build_object(
        'valid', false,
        'error', 'Discount code usage limit reached'
      );
    end if;
    
    -- Check user-specific usage if quote_id provided
    if p_quote_id is not null and v_user_id is not null then
      select count(*) into v_usage_count
      from public.applied_discounts ad
      join public.user_quotes uq on ad.quote_id = uq.id
      where ad.discount_id = v_discount.id
        and uq.user_id = v_user_id
        and uq.status != 'draft';
      
      if v_usage_count > 0 then
        return jsonb_build_object(
          'valid', false,
          'error', 'You have already used this discount code'
        );
      end if;
    end if;
  end if;
  
  -- Check minimum purchase amount
  if v_discount.min_purchase_amount is not null and p_purchase_amount < v_discount.min_purchase_amount then
    return jsonb_build_object(
      'valid', false,
      'error', format('Minimum purchase amount of %s required', v_discount.min_purchase_amount)
    );
  end if;
  
  -- Check applies_to restrictions
  if v_discount.applies_to != 'all' then
    if v_discount.applies_to = 'tier' and p_tier_id is not null then
      if not v_discount.applies_to_ids @> to_jsonb(p_tier_id) then
        return jsonb_build_object(
          'valid', false,
          'error', 'Discount not applicable to selected tier'
        );
      end if;
    end if;
  end if;
  
  -- Calculate discount amount
  declare
    v_discount_amount numeric;
  begin
    if v_discount.discount_type = 'percentage' then
      v_discount_amount := p_purchase_amount * (v_discount.discount_value / 100);
      if v_discount.max_discount_amount is not null then
        v_discount_amount := least(v_discount_amount, v_discount.max_discount_amount);
      end if;
    elsif v_discount.discount_type = 'fixed' then
      v_discount_amount := v_discount.discount_value;
    else -- bundle
      v_discount_amount := v_discount.discount_value;
    end if;
    
    return jsonb_build_object(
      'valid', true,
      'discount_id', v_discount.id,
      'discount_type', v_discount.discount_type,
      'discount_value', v_discount.discount_value,
      'discount_amount', v_discount_amount,
      'description', v_discount.description
    );
  end;
end;
$$;

-- Grant execute to authenticated users
grant execute on function public.validate_discount(text, bigint, bigint, numeric) to authenticated;

-- Allow anon to validate discount codes (for pre-auth validation)
grant execute on function public.validate_discount(text, bigint, bigint, numeric) to anon;

-- Function to apply discount to quote
create or replace function public.apply_discount_to_quote(
  p_quote_id bigint,
  p_discount_code text
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_quote record;
  v_validation jsonb;
  v_discount_amount numeric;
begin
  -- Get quote details
  select * into v_quote
  from public.user_quotes
  where id = p_quote_id
    and user_id = (select auth.uid());
  
  if not found then
    return jsonb_build_object(
      'success', false,
      'error', 'Quote not found or access denied'
    );
  end if;
  
  if v_quote.status != 'draft' then
    return jsonb_build_object(
      'success', false,
      'error', 'Only draft quotes can be modified'
    );
  end if;
  
  -- Validate discount
  v_validation := public.validate_discount(
    p_discount_code,
    p_quote_id,
    v_quote.tier_id,
    v_quote.base_price + v_quote.services_price
  );
  
  if not (v_validation->>'valid')::boolean then
    return jsonb_build_object(
      'success', false,
      'error', v_validation->>'error'
    );
  end if;
  
  v_discount_amount := (v_validation->>'discount_amount')::numeric;
  
  -- Update quote with discount
  update public.user_quotes
  set 
    discount_amount = v_discount_amount,
    total_price = base_price + services_price - v_discount_amount + tax_amount,
    metadata = metadata || jsonb_build_object('discount_code', p_discount_code),
    updated_at = now()
  where id = p_quote_id;
  
  -- Record discount usage (removing old discount first)
  delete from public.applied_discounts where quote_id = p_quote_id;
  
  insert into public.applied_discounts (discount_id, quote_id, discount_amount)
  values (
    (v_validation->>'discount_id')::bigint,
    p_quote_id,
    v_discount_amount
  );
  
  -- Update discount usage count
  update public.discounts
  set usage_count = usage_count + 1
  where id = (v_validation->>'discount_id')::bigint;
  
  return jsonb_build_object(
    'success', true,
    'discount_amount', v_discount_amount,
    'message', 'Discount applied successfully'
  );
end;
$$;

-- Grant execute to authenticated users
grant execute on function public.apply_discount_to_quote(bigint, text) to authenticated;

-- Revoke from public/anon
revoke execute on function public.apply_discount_to_quote(bigint, text) from public, anon;

-- ============================================
-- Add missing helper functions
-- ============================================

-- Function to increment discount usage
-- Uses SECURITY DEFINER to bypass RLS for updating system counters
create or replace function public.increment_discount_usage()
returns trigger
language plpgsql
security definer  -- Needs to update discount counters regardless of ownership
set search_path = ''  -- Prevent search path attacks
as $$
begin
  -- Update usage count (bypasses RLS due to SECURITY DEFINER)
  update public.discounts
  set usage_count = coalesce(usage_count, 0) + 1,
      updated_at = now()
  where id = new.discount_id;
  
  -- Check if discount is now at max usage
  perform 1 from public.discounts
  where id = new.discount_id
    and max_uses is not null
    and usage_count >= max_uses
    and is_active = true;
  
  if found then
    -- Deactivate discount if at max usage
    update public.discounts
    set is_active = false,
        updated_at = now()
    where id = new.discount_id;
    
    raise notice 'Discount % reached max usage and was deactivated', new.discount_id;
  end if;
  
  return new;
exception
  when others then
    -- Log error but don't fail the discount application
    raise warning 'Failed to increment discount usage: %', sqlerrm;
    return new;
end;
$$;

-- Grant execute to authenticated (needed for trigger)
grant execute on function public.increment_discount_usage() to authenticated;

-- Revoke from public/anon
revoke execute on function public.increment_discount_usage() from public, anon;

-- Create trigger for discount usage
create trigger increment_discount_usage_trigger
  after insert on public.applied_discounts
  for each row
  execute function public.increment_discount_usage();

-- Function to calculate discount amount  
create or replace function public.calculate_discount_amount(
  p_discount_type text,
  p_discount_value numeric,
  p_base_amount numeric
)
returns numeric
language plpgsql
security invoker
set search_path = ''
immutable
as $$
begin
  if p_discount_type = 'percentage' then
    return round(p_base_amount * (p_discount_value / 100), 2);
  else -- fixed
    return least(p_discount_value, p_base_amount);
  end if;
end;
$$;

-- Grant execute to authenticated and anon (pure calculation function)
grant execute on function public.calculate_discount_amount(text, numeric, numeric) to authenticated, anon;

-- ============================================
-- Insert default pricing configuration
-- ============================================
insert into public.pricing_config (config_key, config_value, description) values
  -- Original configs from your data
  ('quote_expiry_days', '30'::jsonb, 
   'Giorni di validità del preventivo'),
  ('min_advance_booking_days', '2'::jsonb, 
   'Giorni minimi di anticipo per prenotazione'),
  ('max_advance_booking_days', '14'::jsonb, 
   'Giorni massimi di anticipo per prenotazione'),
  ('tax_rate', '22'::jsonb, 
   'Aliquota IVA in percentuale'),
  ('currency', '"EUR"'::jsonb, 
   'Valuta predefinita'),
  ('abandoned_quote_reminder_hours', '[24, 72, 168]'::jsonb, 
   'Ore dopo abbandono per invio promemoria'),
  ('slot_duration_options', '[45, 60]'::jsonb, 
   'Durate disponibili per gli slot in minuti'),
  
  -- Additional useful configs not in original data
  ('payment_terms', '{"options": ["immediate", "30_days", "60_days"], "default": "30_days"}'::jsonb, 
   'Available payment terms'),
  ('seasonal_promotions', '{"summer": 0.15, "winter": 0.10, "spring": 0.05}'::jsonb, 
   'Seasonal promotion percentages'),
  ('referral_bonus', '{"discount_percentage": 10, "max_uses": 3}'::jsonb, 
   'Referral program configuration'),
  ('rush_delivery', '{"surcharge_percentage": 25, "days_reduction": 15}'::jsonb, 
   'Rush delivery pricing adjustments')
on conflict (config_key) do nothing;

-- ============================================
-- Insert sample discounts
-- ============================================
insert into public.discounts (code, name, description, discount_type, discount_value, min_purchase_amount, expires_at, applies_to, applies_to_ids) values
  ('WELCOME10', 'Welcome Discount', '10% off for new customers', 'percentage', 10, 500, now() + interval '90 days', 'all', '[]'::jsonb),
  ('EARLY20', 'Early Bird', '20% off for early adopters', 'percentage', 20, 1000, now() + interval '30 days', 'all', '[]'::jsonb),
  ('SAVE200', 'Flat Discount', '€200 off on orders above €2000', 'fixed', 200, 2000, now() + interval '60 days', 'all', '[]'::jsonb)
on conflict (code) do nothing;