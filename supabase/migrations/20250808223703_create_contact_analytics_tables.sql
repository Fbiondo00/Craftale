-- Migration: Create Contact and Analytics Tables
-- Description: Sets up contact preferences, time slots, and analytics tracking

-- ============================================
-- 1. Create time_slots table
-- ============================================
create table if not exists public.time_slots (
  id bigint generated always as identity primary key,
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  slot_duration int default 60,
  slot_type text default 'contact' check (slot_type in ('contact', 'meeting', 'support')),
  is_available boolean default true,
  max_bookings int default 1,
  current_bookings int default 0,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint valid_time_range check (end_time > start_time),
  constraint unique_time_slot unique(day_of_week, start_time, slot_type)
);

comment on table public.time_slots is 'Defines available time slots for contact and meetings';

-- ============================================
-- 2. Create contact_preferences table
-- ============================================
create table if not exists public.contact_preferences (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  quote_id bigint references public.user_quotes(id) on delete cascade,
  preferred_method text not null check (preferred_method in ('email', 'phone', 'whatsapp', 'video')),
  contact_email text,
  contact_phone text,
  preferred_time_slot_id bigint references public.time_slots(id),
  preferred_date date,
  timezone text default 'Europe/Rome',
  language_preference text default 'it',
  additional_notes text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint unique_user_quote_preference unique(user_id, quote_id)
);

comment on table public.contact_preferences is 'Stores user contact preferences and scheduling information';

-- ============================================
-- 3. Create pricing_journey_events table
-- ============================================
create table if not exists public.pricing_journey_events (
  id bigint generated always as identity primary key,
  session_id text not null,
  user_id uuid references auth.users(id),
  event_type text not null,
  event_data jsonb default '{}'::jsonb,
  page_path text,
  referrer text,
  user_agent text,
  ip_address inet,
  device_type text,
  browser text,
  created_at timestamp with time zone default now()
);

comment on table public.pricing_journey_events is 'Tracks user journey events through the pricing flow';

-- ============================================
-- 4. Create persona_matcher_responses table
-- ============================================
create table if not exists public.persona_matcher_responses (
  id bigint generated always as identity primary key,
  session_id text not null,
  user_id uuid references auth.users(id),
  questions jsonb not null,
  answers jsonb not null,
  matched_tier text,
  matched_level text,
  confidence_score numeric(3, 2) check (confidence_score between 0 and 1),
  recommendations jsonb default '{}'::jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);

comment on table public.persona_matcher_responses is 'Stores persona matching quiz responses and recommendations';

-- ============================================
-- 5. Create quote_analytics_summary view
-- ============================================
create or replace view public.quote_analytics_summary as
select 
  date_trunc('day', created_at) as date,
  count(*) as total_quotes,
  count(distinct user_id) as unique_users,
  count(*) filter (where status = 'draft') as draft_quotes,
  count(*) filter (where status = 'submitted') as submitted_quotes,
  count(*) filter (where status = 'accepted') as accepted_quotes,
  avg(total_price) as avg_quote_value,
  sum(total_price) filter (where status = 'accepted') as total_revenue
from public.user_quotes
group by date_trunc('day', created_at);

comment on view public.quote_analytics_summary is 'Aggregated daily analytics for quotes';

-- ============================================
-- Create indexes for performance
-- ============================================
create index idx_time_slots_day_type on public.time_slots(day_of_week, slot_type);
create index idx_time_slots_available on public.time_slots(is_available);
create index idx_contact_preferences_user_id on public.contact_preferences(user_id);
create index idx_contact_preferences_quote_id on public.contact_preferences(quote_id);
create index idx_contact_preferences_time_slot on public.contact_preferences(preferred_time_slot_id);
create index idx_pricing_journey_session on public.pricing_journey_events(session_id);
create index idx_pricing_journey_user on public.pricing_journey_events(user_id);
create index idx_pricing_journey_created on public.pricing_journey_events(created_at desc);
create index idx_persona_matcher_session on public.persona_matcher_responses(session_id);
create index idx_persona_matcher_user on public.persona_matcher_responses(user_id);

-- ============================================
-- Apply updated_at triggers
-- ============================================
create trigger update_time_slots_updated_at 
  before update on public.time_slots
  for each row 
  execute function public.update_updated_at_column();

create trigger update_contact_preferences_updated_at 
  before update on public.contact_preferences
  for each row 
  execute function public.update_updated_at_column();

-- ============================================
-- Enable Row Level Security
-- ============================================
alter table public.time_slots enable row level security;
alter table public.contact_preferences enable row level security;
alter table public.pricing_journey_events enable row level security;
alter table public.persona_matcher_responses enable row level security;

-- ============================================
-- Create RLS policies for time_slots
-- ============================================
-- Public can view available time slots
create policy "Public can view available time slots" 
  on public.time_slots
  for select
  to anon, authenticated
  using (is_available = true);

-- ============================================
-- Create RLS policies for contact_preferences
-- ============================================
-- Users can view their own preferences
create policy "Users can view their contact preferences" 
  on public.contact_preferences
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Users can insert their own preferences
create policy "Users can create contact preferences" 
  on public.contact_preferences
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

-- Users can update their own preferences
create policy "Users can update their contact preferences" 
  on public.contact_preferences
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- ============================================
-- Create RLS policies for pricing_journey_events
-- ============================================
-- Note: SELECT policy for pricing_journey_events is defined in admin_system migration
-- as a combined policy to avoid multiple permissive policies

-- Anonymous and authenticated users can insert events
create policy "Public can track journey events" 
  on public.pricing_journey_events
  for insert
  to anon, authenticated
  with check (true);

-- ============================================
-- Create RLS policies for persona_matcher_responses
-- ============================================
-- Note: SELECT policy for persona_matcher_responses is defined in admin_system migration
-- as a combined policy to avoid multiple permissive policies

-- Anonymous and authenticated users can insert responses
create policy "Public can save persona responses" 
  on public.persona_matcher_responses
  for insert
  to anon, authenticated
  with check (true);

-- ============================================
-- Helper functions for time slots
-- ============================================

-- Function to get available time slots
create or replace function public.get_available_time_slots(
  p_date date default current_date,
  p_slot_type text default 'contact'
)
returns table(
  slot_id bigint,
  slot_date date,
  start_time time,
  end_time time,
  available_spots int
)
language plpgsql
security invoker
set search_path = ''
stable
as $$
begin
  return query
  select 
    ts.id as slot_id,
    p_date as slot_date,
    ts.start_time,
    ts.end_time,
    ts.max_bookings - ts.current_bookings as available_spots
  from public.time_slots ts
  where ts.day_of_week = extract(dow from p_date)::int
    and ts.slot_type = p_slot_type
    and ts.is_available = true
    and ts.current_bookings < ts.max_bookings
  order by ts.start_time;
end;
$$;

-- Function to track analytics event
-- Uses SECURITY DEFINER to bypass RLS for inserting analytics
create or replace function public.track_analytics_event(
  p_session_id text,
  p_event_type text,
  p_event_data jsonb default '{}'::jsonb,
  p_page_path text default null
)
returns void
language plpgsql
security definer  -- Needs to insert analytics data regardless of RLS
set search_path = ''  -- Prevent search path attacks
as $$
declare
  v_user_id uuid;
begin
  -- Get current user (may be null for anonymous tracking)
  v_user_id := auth.uid();
  
  -- Insert analytics event (bypasses RLS due to SECURITY DEFINER)
  insert into public.pricing_journey_events (
    session_id,
    user_id,
    event_type,
    event_data,
    page_path
  ) values (
    p_session_id,
    v_user_id,
    p_event_type,
    p_event_data,
    p_page_path
  );
exception
  when others then
    -- Don't fail silently - log but don't block user action
    raise warning 'Analytics tracking failed: %', sqlerrm;
end;
$$;

-- Grant execute to both authenticated and anon (for anonymous tracking)
grant execute on function public.track_analytics_event(text, text, jsonb, text) to authenticated, anon;

-- ============================================
-- Additional analytics functions
-- ============================================

-- Function to track pricing events with more details
-- Uses SECURITY DEFINER to bypass RLS for inserting analytics
create or replace function public.track_pricing_event(
  p_user_id uuid,
  p_session_id text,
  p_event_type text,
  p_event_data jsonb default '{}'::jsonb,
  p_step_number int default null,
  p_time_spent int default null,
  p_quote_id bigint default null
)
returns bigint
language plpgsql
security definer  -- Needs to insert analytics data regardless of RLS
set search_path = ''  -- Prevent search path attacks
as $$
declare
  v_event_id bigint;
begin
  -- Insert pricing event (bypasses RLS due to SECURITY DEFINER)
  insert into public.pricing_journey_events (
    user_id,
    session_id,
    event_type,
    event_data
  ) values (
    p_user_id,
    p_session_id,
    p_event_type,
    p_event_data || jsonb_build_object(
      'step_number', p_step_number,
      'time_spent', p_time_spent,
      'quote_id', p_quote_id
    )
  ) returning id into v_event_id;
  
  return v_event_id;
exception
  when others then
    -- Log error but return null to not block user action
    raise warning 'Pricing event tracking failed: %', sqlerrm;
    return null;
end;
$$;

-- Grant execute to authenticated users
grant execute on function public.track_pricing_event(uuid, text, text, jsonb, int, int, bigint) to authenticated;

-- Revoke from public/anon
revoke execute on function public.track_pricing_event(uuid, text, text, jsonb, int, int, bigint) from public, anon;

-- Function to get user journey summary
create or replace function public.get_user_journey_summary(p_session_id text)
returns table (
  total_events int,
  total_time_seconds int,
  steps_completed int[],
  last_step int,
  has_quote boolean,
  abandoned boolean
)
language plpgsql
security invoker
set search_path = ''
stable
as $$
begin
  return query
  select 
    count(*)::int as total_events,
    coalesce(sum((event_data->>'time_spent')::int), 0)::int as total_time_seconds,
    array_agg(distinct (event_data->>'step_number')::int) filter (where event_data->>'step_number' is not null) as steps_completed,
    max((event_data->>'step_number')::int) as last_step,
    bool_or(event_type = 'quote_created') as has_quote,
    case 
      when max(created_at) < now() - interval '30 minutes' 
      and not bool_or(event_type = 'quote_submitted')
      then true 
      else false 
    end as abandoned
  from public.pricing_journey_events
  where session_id = p_session_id
  group by session_id;
end;
$$;

-- Grant execute to authenticated users (query function)
grant execute on function public.get_user_journey_summary(text) to authenticated;

-- Revoke from public/anon (requires authentication for journey tracking)
revoke execute on function public.get_user_journey_summary(text) from public, anon;

-- ============================================
-- Insert default time slots
-- ============================================
insert into public.time_slots (day_of_week, start_time, end_time, slot_type, max_bookings)
select 
  dow,
  time_slot.start_time,
  time_slot.end_time,
  'contact',
  3
from generate_series(1, 5) as dow  -- Monday to Friday
cross join (
  values 
    ('09:00'::time, '10:00'::time),
    ('10:00'::time, '11:00'::time),
    ('11:00'::time, '12:00'::time),
    ('14:00'::time, '15:00'::time),
    ('15:00'::time, '16:00'::time),
    ('16:00'::time, '17:00'::time),
    ('17:00'::time, '18:00'::time)
) as time_slot(start_time, end_time)
on conflict (day_of_week, start_time, slot_type) do nothing;