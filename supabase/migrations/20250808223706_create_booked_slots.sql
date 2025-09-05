-- Migration: Create Booked Slots Table
-- Description: Tracks time slot bookings for quotes

-- ============================================
-- Create booked_slots table to track availability
-- ============================================
create table if not exists public.booked_slots (
  id bigint generated always as identity primary key,
  time_slot_id bigint references public.time_slots(id),
  booking_date date not null,
  quote_id bigint references public.user_quotes(id) on delete cascade,
  confirmed boolean default false,
  created_at timestamp with time zone default now(),
  constraint unique_booking unique(time_slot_id, booking_date, quote_id)
);

comment on table public.booked_slots is 'Tracks booked time slots for contact appointments';

-- ============================================
-- Create indexes for performance
-- ============================================
create index idx_booked_slots_date on public.booked_slots(booking_date);
create index idx_booked_slots_slot on public.booked_slots(time_slot_id);
create index idx_booked_slots_quote on public.booked_slots(quote_id);
create index idx_booked_slots_confirmed on public.booked_slots(confirmed);

-- ============================================
-- Enable Row Level Security
-- ============================================
alter table public.booked_slots enable row level security;

-- ============================================
-- Create RLS policies for booked_slots
-- ============================================
-- Combined SELECT policy for users and admins
create policy "Users and admins can view booked slots" 
  on public.booked_slots
  for select
  to authenticated
  using (
    -- Users can view their own bookings
    exists (
      select 1 
      from public.user_quotes q
      where q.id = booked_slots.quote_id
      and q.user_id = (select auth.uid())
    )
    or
    -- Admins can view all bookings
    public.is_admin()
  );

-- Users can create bookings for their quotes
create policy "Users can book slots for their quotes" 
  on public.booked_slots
  for insert
  to authenticated
  with check (
    exists (
      select 1 
      from public.user_quotes q
      where q.id = quote_id
      and q.user_id = (select auth.uid())
      and q.status = 'draft'
    )
  );

-- Combined UPDATE policy for users and admins
create policy "Users and admins can update bookings" 
  on public.booked_slots
  for update
  to authenticated
  using (
    -- Users can update their unconfirmed bookings
    (confirmed = false and
    exists (
      select 1 
      from public.user_quotes q
      where q.id = booked_slots.quote_id
      and q.user_id = (select auth.uid())
    ))
    or
    -- Admins can update any booking
    public.is_admin()
  )
  with check (
    -- Users can only update their own bookings
    exists (
      select 1 
      from public.user_quotes q
      where q.id = quote_id
      and q.user_id = (select auth.uid())
    )
    or
    -- Admins can update any booking
    public.is_admin()
  );

-- Combined DELETE policy for users and admins
create policy "Users and admins can delete bookings" 
  on public.booked_slots
  for delete
  to authenticated
  using (
    -- Users can delete their unconfirmed bookings
    (confirmed = false and
    exists (
      select 1 
      from public.user_quotes q
      where q.id = booked_slots.quote_id
      and q.user_id = (select auth.uid())
    ))
    or
    -- Admins can delete any booking
    public.is_admin()
  );

-- ============================================
-- Update get_available_time_slots function to consider bookings
-- ============================================
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
    ts.max_bookings - coalesce(
      (select count(*) 
       from public.booked_slots bs
       where bs.time_slot_id = ts.id
       and bs.booking_date = p_date
       and bs.confirmed = true),
      0
    )::int as available_spots
  from public.time_slots ts
  where ts.day_of_week = extract(dow from p_date)::int
    and ts.slot_type = p_slot_type
    and ts.is_available = true
    and ts.max_bookings - coalesce(
      (select count(*) 
       from public.booked_slots bs
       where bs.time_slot_id = ts.id
       and bs.booking_date = p_date
       and bs.confirmed = true),
      0
    ) > 0
  order by ts.start_time;
end;
$$;

-- Grant execute to authenticated and anon (query function)
grant execute on function public.get_available_time_slots(date, text) to authenticated, anon;

-- ============================================
-- Function to check if slot is available
-- ============================================
create or replace function public.is_slot_available(
  p_slot_id bigint,
  p_date date
)
returns boolean
language plpgsql
security invoker
set search_path = ''
stable
as $$
declare
  v_max_bookings int;
  v_current_bookings int;
begin
  -- Get max bookings for the slot
  select max_bookings into v_max_bookings
  from public.time_slots
  where id = p_slot_id
    and is_available = true;
  
  if v_max_bookings is null then
    return false;
  end if;
  
  -- Count current confirmed bookings
  select count(*) into v_current_bookings
  from public.booked_slots
  where time_slot_id = p_slot_id
    and booking_date = p_date
    and confirmed = true;
  
  return v_current_bookings < v_max_bookings;
end;
$$;

-- Grant execute to authenticated and anon (query function)
grant execute on function public.is_slot_available(bigint, date) to authenticated, anon;

-- ============================================
-- Function to book a time slot
-- ============================================
create or replace function public.book_time_slot(
  p_slot_id bigint,
  p_date date,
  p_quote_id bigint
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user_id uuid;
  v_booking_id bigint;
begin
  -- Verify user owns the quote
  select user_id into v_user_id
  from public.user_quotes
  where id = p_quote_id
    and user_id = (select auth.uid())
    and status = 'draft';
  
  if v_user_id is null then
    return jsonb_build_object(
      'success', false,
      'message', 'Quote not found or not in draft status'
    );
  end if;
  
  -- Check if slot is available
  if not public.is_slot_available(p_slot_id, p_date) then
    return jsonb_build_object(
      'success', false,
      'message', 'Time slot is not available'
    );
  end if;
  
  -- Book the slot
  insert into public.booked_slots (time_slot_id, booking_date, quote_id, confirmed)
  values (p_slot_id, p_date, p_quote_id, false)
  on conflict (time_slot_id, booking_date, quote_id) 
  do update set confirmed = false
  returning id into v_booking_id;
  
  return jsonb_build_object(
    'success', true,
    'booking_id', v_booking_id,
    'message', 'Time slot booked successfully'
  );
end;
$$;

-- Grant execute to authenticated users (user action)
grant execute on function public.book_time_slot(bigint, date, bigint) to authenticated;

-- Revoke from public/anon
revoke execute on function public.book_time_slot(bigint, date, bigint) from public, anon;

-- ============================================
-- Admin policies for booked_slots
-- ============================================
-- Note: Admin policies are combined with user policies to avoid multiple permissive policies
-- See combined policies above for SELECT, UPDATE, and DELETE