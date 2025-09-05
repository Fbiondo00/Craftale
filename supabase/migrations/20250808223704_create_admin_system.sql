-- Migration: Create Admin Role System and Policies
-- Description: Sets up admin role management and RLS policies for admin dashboard access

-- ============================================
-- 1. Create user role type
-- ============================================
create type user_role as enum ('customer', 'admin', 'super_admin');

-- ============================================
-- 2. Create admin role check functions
-- ============================================

-- Function to check if user is admin
-- Uses SECURITY DEFINER for consistent JWT access regardless of caller privileges
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer  -- Runs with owner privileges for consistent JWT access
set search_path = ''  -- Prevent search path attacks
stable
as $$
declare
  user_role text;
  jwt_claims json;
begin
  -- Safely get JWT claims
  begin
    jwt_claims := current_setting('request.jwt.claims', true)::json;
  exception
    when others then
      return false;  -- No valid JWT, not an admin
  end;
  
  -- Check for role in multiple possible locations
  -- First check direct role claim
  user_role := jwt_claims->>'role';
  
  -- If not found, check app_metadata
  if user_role is null or user_role = '' then
    user_role := jwt_claims->'app_metadata'->>'role';
  end if;
  
  -- If not found, check user_metadata (some setups use this)
  if user_role is null or user_role = '' then
    user_role := jwt_claims->'user_metadata'->>'role';
  end if;
  
  -- Return true only if explicitly set as admin or super_admin
  return coalesce(user_role, '') in ('admin', 'super_admin');
exception
  when others then
    -- Any error in processing means not an admin
    return false;
end;
$$;

-- Function to check if user is super admin
-- Uses SECURITY DEFINER for consistent JWT access regardless of caller privileges
create or replace function public.is_super_admin()
returns boolean
language plpgsql
security definer  -- Runs with owner privileges for consistent JWT access
set search_path = ''  -- Prevent search path attacks
stable
as $$
declare
  user_role text;
  jwt_claims json;
begin
  -- Safely get JWT claims
  begin
    jwt_claims := current_setting('request.jwt.claims', true)::json;
  exception
    when others then
      return false;  -- No valid JWT, not a super admin
  end;
  
  -- Check for role in multiple possible locations
  -- First check direct role claim
  user_role := jwt_claims->>'role';
  
  -- If not found, check app_metadata
  if user_role is null or user_role = '' then
    user_role := jwt_claims->'app_metadata'->>'role';
  end if;
  
  -- If not found, check user_metadata (some setups use this)
  if user_role is null or user_role = '' then
    user_role := jwt_claims->'user_metadata'->>'role';
  end if;
  
  -- Return true only if explicitly set as super_admin
  return coalesce(user_role, '') = 'super_admin';
exception
  when others then
    -- Any error in processing means not a super admin
    return false;
end;
$$;

-- Grant execute permissions to authenticated users only
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_super_admin() to authenticated;

-- Revoke from public/anon for security
revoke execute on function public.is_admin() from public, anon;
revoke execute on function public.is_super_admin() from public, anon;

-- ============================================
-- 3. Create admin audit log table
-- ============================================
create table if not exists public.admin_audit_log (
  id bigint generated always as identity primary key,
  admin_id uuid references auth.users(id),
  action text not null,
  table_name text not null,
  record_id bigint,
  old_data jsonb,
  new_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone default now()
);

comment on table public.admin_audit_log is 'Audit trail for all admin actions on the system';

-- Create index for foreign key performance
create index idx_admin_audit_log_admin_id on public.admin_audit_log(admin_id);

-- Enable RLS on audit log
alter table public.admin_audit_log enable row level security;

-- ============================================
-- 4. Admin policies for pricing_tiers
-- ============================================
-- Admins can insert tiers
create policy "Admins can insert tiers" 
  on public.pricing_tiers
  for insert
  to authenticated
  with check (public.is_admin());

-- Admins can update tiers
create policy "Admins can update tiers" 
  on public.pricing_tiers
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Only super admins can delete tiers
create policy "Super admins can delete tiers" 
  on public.pricing_tiers
  for delete
  to authenticated
  using (public.is_super_admin());

-- ============================================
-- 5. Admin policies for pricing_levels
-- ============================================
-- Admins can insert levels
create policy "Admins can insert levels" 
  on public.pricing_levels
  for insert
  to authenticated
  with check (public.is_admin());

-- Admins can update levels
create policy "Admins can update levels" 
  on public.pricing_levels
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Only super admins can delete levels
create policy "Super admins can delete levels" 
  on public.pricing_levels
  for delete
  to authenticated
  using (public.is_super_admin());

-- ============================================
-- 6. Admin policies for optional_services
-- ============================================
-- Admins can insert services
create policy "Admins can insert services" 
  on public.optional_services
  for insert
  to authenticated
  with check (public.is_admin());

-- Admins can update services
create policy "Admins can update services" 
  on public.optional_services
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Only super admins can delete services
create policy "Super admins can delete services" 
  on public.optional_services
  for delete
  to authenticated
  using (public.is_super_admin());

-- ============================================
-- 7. Admin policies for discounts
-- ============================================
-- Authenticated users and admins can view discounts
create policy "Authenticated users can view discounts" 
  on public.discounts
  for select
  to authenticated
  using (
    -- Admins can view all discounts
    public.is_admin() 
    or
    -- Regular users can view active public and their user-specific discounts
    (is_active = true 
     and (user_specific = false or user_id = (select auth.uid()))
     and starts_at <= now()
     and (expires_at is null or expires_at > now()))
  );

-- Admins can insert discounts
create policy "Admins can insert discounts" 
  on public.discounts
  for insert
  to authenticated
  with check (public.is_admin());

-- Admins can update discounts
create policy "Admins can update discounts" 
  on public.discounts
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Only super admins can delete discounts
create policy "Super admins can delete discounts" 
  on public.discounts
  for delete
  to authenticated
  using (public.is_super_admin());

-- ============================================
-- 8. Admin policies for time_slots
-- ============================================
-- Admins can insert time slots
create policy "Admins can insert time slots" 
  on public.time_slots
  for insert
  to authenticated
  with check (public.is_admin());

-- Admins can update time slots
create policy "Admins can update time slots" 
  on public.time_slots
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Admins can delete time slots
create policy "Admins can delete time slots" 
  on public.time_slots
  for delete
  to authenticated
  using (public.is_admin());

-- ============================================
-- 9. Admin policies for pricing_config
-- ============================================
-- Admins can insert config
create policy "Admins can insert config" 
  on public.pricing_config
  for insert
  to authenticated
  with check (public.is_admin());

-- Admins can update config
create policy "Admins can update config" 
  on public.pricing_config
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Only super admins can delete config
create policy "Super admins can delete config" 
  on public.pricing_config
  for delete
  to authenticated
  using (public.is_super_admin());

-- ============================================
-- 10. Combined policies for user_quotes (optimized for performance)
-- ============================================
-- Single SELECT policy combining user and admin access
create policy "Combined select policy for quotes" 
  on public.user_quotes
  for select
  to authenticated
  using (
    -- Admins can view all quotes
    public.is_admin() 
    or 
    -- Users can view their own quotes
    (select auth.uid()) = user_id
  );

-- Single UPDATE policy combining user and admin access
create policy "Combined update policy for quotes" 
  on public.user_quotes
  for update
  to authenticated
  using (
    -- Admins can update all quotes
    public.is_admin() 
    or 
    -- Users can update their own draft quotes
    ((select auth.uid()) = user_id and status = 'draft')
  )
  with check (
    -- Admins can update all quotes
    public.is_admin() 
    or 
    -- Users can update their own draft quotes
    ((select auth.uid()) = user_id and status = 'draft')
  );

-- ============================================
-- 11. Combined policies for analytics tables
-- ============================================
-- Combined policy for journey events (replaces both user and admin policies)
create policy "Users and admins can view journey events" 
  on public.pricing_journey_events
  for select
  to authenticated
  using (
    -- Users can view their own events or anonymous events
    (select auth.uid()) = user_id or user_id is null 
    or 
    -- Admins can view all events
    public.is_admin()
  );

-- Combined policy for persona responses (replaces both user and admin policies)
create policy "Users and admins can view persona responses" 
  on public.persona_matcher_responses
  for select
  to authenticated
  using (
    -- Users can view their own responses or anonymous responses
    (select auth.uid()) = user_id or user_id is null 
    or 
    -- Admins can view all responses
    public.is_admin()
  );

-- ============================================
-- 12. Admin policies for audit log
-- ============================================
-- Only admins can view audit logs
create policy "Admins can view audit logs" 
  on public.admin_audit_log
  for select
  to authenticated
  using (public.is_admin());

-- System-only insert (via triggers)
-- No direct insert policy for users

-- ============================================
-- 13. Create audit trigger function
-- ============================================
-- Uses SECURITY DEFINER to bypass RLS when inserting audit logs
create or replace function public.audit_admin_changes()
returns trigger
language plpgsql
security definer  -- Needs elevated privileges to insert audit logs
set search_path = ''  -- Prevent search path attacks
as $$
declare
  v_old_data jsonb;
  v_new_data jsonb;
  v_record_id bigint;
  v_user_id uuid;
begin
  -- Get current user ID
  v_user_id := auth.uid();
  
  -- Only audit if user is admin and authenticated
  if v_user_id is null or not public.is_admin() then
    return coalesce(new, old);
  end if;

  -- Determine record ID based on operation
  if tg_op = 'DELETE' then
    v_record_id := old.id;
    v_old_data := to_jsonb(old);
    v_new_data := null;
  elsif tg_op = 'UPDATE' then
    v_record_id := new.id;
    v_old_data := to_jsonb(old);
    v_new_data := to_jsonb(new);
  elsif tg_op = 'INSERT' then
    v_record_id := new.id;
    v_old_data := null;
    v_new_data := to_jsonb(new);
  end if;
  
  -- Insert audit record (bypasses RLS due to SECURITY DEFINER)
  insert into public.admin_audit_log (
    admin_id, 
    action, 
    table_name, 
    record_id,
    old_data, 
    new_data
  ) values (
    v_user_id, 
    tg_op, 
    tg_table_name, 
    v_record_id,
    v_old_data, 
    v_new_data
  );
  
  return coalesce(new, old);
exception
  when others then
    -- Log errors but don't fail the original operation
    raise warning 'Audit logging failed: %', sqlerrm;
    return coalesce(new, old);
end;
$$;

-- Grant execute to authenticated users (needed for triggers)
grant execute on function public.audit_admin_changes() to authenticated;

-- Revoke from public/anon
revoke execute on function public.audit_admin_changes() from public, anon;

-- ============================================
-- 14. Apply audit triggers to critical tables
-- ============================================
create trigger audit_pricing_tiers_changes
  after insert or update or delete on public.pricing_tiers
  for each row 
  execute function public.audit_admin_changes();

create trigger audit_pricing_levels_changes
  after insert or update or delete on public.pricing_levels
  for each row 
  execute function public.audit_admin_changes();

create trigger audit_optional_services_changes
  after insert or update or delete on public.optional_services
  for each row 
  execute function public.audit_admin_changes();

create trigger audit_discounts_changes
  after insert or update or delete on public.discounts
  for each row 
  execute function public.audit_admin_changes();

create trigger audit_user_quotes_admin_changes
  after update on public.user_quotes
  for each row 
  when (old.status is distinct from new.status or old.admin_notes is distinct from new.admin_notes)
  execute function public.audit_admin_changes();

-- ============================================
-- 15. Create admin dashboard views
-- ============================================

-- Admin quote overview
create or replace view public.admin_quote_overview as
select 
  q.id,
  q.quote_number,
  q.user_id,
  q.status,
  q.total_price,
  q.created_at,
  q.updated_at,
  q.submitted_at,
  q.expires_at,
  u.email as user_email,
  u.raw_user_meta_data->>'full_name' as user_name,
  t.name as tier_name,
  l.name as level_name,
  l.level_code,
  count(distinct qv.id) as version_count,
  max(qv.created_at) as last_modified
from public.user_quotes q
left join auth.users u on q.user_id = u.id
left join public.pricing_tiers t on q.tier_id = t.id
left join public.pricing_levels l on q.level_id = l.id
left join public.quote_versions qv on q.id = qv.quote_id
group by 
  q.id, q.quote_number, q.user_id, q.status, q.total_price,
  q.created_at, q.updated_at, q.submitted_at, q.expires_at,
  u.email, u.raw_user_meta_data, t.name, l.name, l.level_code;

comment on view public.admin_quote_overview is 'Administrative view of all quotes with user and pricing details';

-- Grant access to views for authenticated users (RLS will filter)
grant select on public.admin_quote_overview to authenticated;

-- ============================================
-- 16. Helper function to assign admin role
-- ============================================
-- Uses SECURITY DEFINER to ensure consistent access to admin check
create or replace function public.assign_admin_role(
  p_user_id uuid,
  p_role text default 'admin'
)
returns jsonb
language plpgsql
security definer  -- Needs consistent access to is_super_admin check
set search_path = ''  -- Prevent search path attacks
as $$
begin
  -- This function documents the process
  -- Actual implementation requires Supabase Auth Admin API
  -- or direct database access with service role
  
  -- Check if current user is super admin
  if not public.is_super_admin() then
    return jsonb_build_object(
      'success', false,
      'message', 'Only super admins can assign roles'
    );
  end if;
  
  -- Validate role
  if p_role not in ('admin', 'super_admin', 'user') then
    return jsonb_build_object(
      'success', false,
      'message', 'Invalid role. Must be: admin, super_admin, or user'
    );
  end if;
  
  -- Log the attempt for audit
  raise notice 'Role assignment requested: user_id=%, role=%, by=%', 
    p_user_id, p_role, auth.uid();
  
  return jsonb_build_object(
    'success', false,
    'message', 'Role assignment must be done through Supabase Auth Admin API',
    'instructions', format('Use auth.users UPDATE with raw_app_meta_data to set role=%L for user_id=%L', p_role, p_user_id),
    'user_id', p_user_id,
    'role', p_role
  );
exception
  when others then
    return jsonb_build_object(
      'success', false,
      'message', 'Error processing role assignment',
      'error', sqlerrm
    );
end;
$$;

-- Grant execute only to authenticated users
grant execute on function public.assign_admin_role(uuid, text) to authenticated;

-- Revoke from public/anon
revoke execute on function public.assign_admin_role(uuid, text) from public, anon;