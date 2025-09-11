

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."user_role" AS ENUM (
    'customer',
    'admin',
    'super_admin'
);


ALTER TYPE "public"."user_role" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."apply_discount_to_quote"("p_quote_id" bigint, "p_discount_code" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."apply_discount_to_quote"("p_quote_id" bigint, "p_discount_code" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."assign_admin_role"("p_user_id" "uuid", "p_role" "text" DEFAULT 'admin'::"text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."assign_admin_role"("p_user_id" "uuid", "p_role" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."audit_admin_changes"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."audit_admin_changes"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."book_time_slot"("p_slot_id" bigint, "p_date" "date", "p_quote_id" bigint) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."book_time_slot"("p_slot_id" bigint, "p_date" "date", "p_quote_id" bigint) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_discount_amount"("p_discount_type" "text", "p_discount_value" numeric, "p_base_amount" numeric) RETURNS numeric
    LANGUAGE "plpgsql" IMMUTABLE
    SET "search_path" TO ''
    AS $$
begin
  if p_discount_type = 'percentage' then
    return round(p_base_amount * (p_discount_value / 100), 2);
  else -- fixed
    return least(p_discount_value, p_base_amount);
  end if;
end;
$$;


ALTER FUNCTION "public"."calculate_discount_amount"("p_discount_type" "text", "p_discount_value" numeric, "p_base_amount" numeric) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_quote_total"("p_base_price" numeric, "p_services_price" numeric, "p_discount_amount" numeric, "p_tax_rate" numeric DEFAULT 0.22) RETURNS "jsonb"
    LANGUAGE "plpgsql" IMMUTABLE
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."calculate_quote_total"("p_base_price" numeric, "p_services_price" numeric, "p_discount_amount" numeric, "p_tax_rate" numeric) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."calculate_quote_totals"("p_level_id" bigint, "p_service_ids" "jsonb", "p_discount_amount" numeric DEFAULT 0) RETURNS "jsonb"
    LANGUAGE "plpgsql" STABLE
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."calculate_quote_totals"("p_level_id" bigint, "p_service_ids" "jsonb", "p_discount_amount" numeric) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."cleanup_test_data"() RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
begin
  -- Remove test quotes
  delete from public.user_quotes 
  where quote_number like 'Q-%-TEST%';
  
  -- Remove test discounts
  delete from public.discounts 
  where code like 'TEST%';
  
  -- Reset sequences if needed
  -- ALTER SEQUENCE public.user_quotes_id_seq RESTART WITH 1;
  
  raise notice 'Test data cleaned up';
end;
$$;


ALTER FUNCTION "public"."cleanup_test_data"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."expire_old_quotes"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."expire_old_quotes"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."generate_sample_quotes"("p_count" integer DEFAULT 10) RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
declare
  v_user_id uuid;
  v_tier_id bigint;
  v_level_id bigint;
  v_base_price numeric;
  v_services_price numeric;
  v_total_price numeric;
  v_status text;
begin
  -- This function is for development only
  -- Remove or disable in production
  
  -- Get a sample user (would need to exist)
  select id into v_user_id 
  from auth.users 
  limit 1;
  
  if v_user_id is null then
    raise notice 'No users found. Create users first.';
    return;
  end if;
  
  for v_counter in 1..p_count loop
    -- Random tier and level
    select 
      t.id, l.id, l.price
    into v_tier_id, v_level_id, v_base_price
    from public.pricing_tiers t
    join public.pricing_levels l on t.id = l.tier_id
    where t.is_active = true and l.is_active = true
    order by random()
    limit 1;
    
    -- Random services price
    v_services_price := floor(random() * 2000);
    v_total_price := v_base_price + v_services_price;
    
    -- Random status
    v_status := (array['draft', 'submitted', 'under_review', 'accepted', 'rejected'])[floor(random() * 5 + 1)];
    
    -- Insert sample quote
    insert into public.user_quotes (
      user_id, tier_id, level_id, 
      base_price, services_price, total_price, 
      status, created_at
    ) values (
      v_user_id, v_tier_id, v_level_id,
      v_base_price, v_services_price, v_total_price,
      v_status, now() - (random() * interval '30 days')
    );
  end loop;
  
  raise notice 'Generated % sample quotes', p_count;
end;
$$;


ALTER FUNCTION "public"."generate_sample_quotes"("p_count" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_available_time_slots"("p_date" "date" DEFAULT CURRENT_DATE, "p_slot_type" "text" DEFAULT 'contact'::"text") RETURNS TABLE("slot_id" bigint, "slot_date" "date", "start_time" time without time zone, "end_time" time without time zone, "available_spots" integer)
    LANGUAGE "plpgsql" STABLE
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."get_available_time_slots"("p_date" "date", "p_slot_type" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_journey_summary"("p_session_id" "text") RETURNS TABLE("total_events" integer, "total_time_seconds" integer, "steps_completed" integer[], "last_step" integer, "has_quote" boolean, "abandoned" boolean)
    LANGUAGE "plpgsql" STABLE
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."get_user_journey_summary"("p_session_id" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
BEGIN
  INSERT INTO public.users_profile (id, email, display_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = excluded.email,
    display_name = COALESCE(excluded.display_name, users_profile.display_name),
    updated_at = now();
  RETURN new;
END;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."increment_discount_usage"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."increment_discount_usage"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_quote_editable"("p_quote_id" bigint) RETURNS boolean
    LANGUAGE "plpgsql" STABLE
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."is_quote_editable"("p_quote_id" bigint) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_slot_available"("p_slot_id" bigint, "p_date" "date") RETURNS boolean
    LANGUAGE "plpgsql" STABLE
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."is_slot_available"("p_slot_id" bigint, "p_date" "date") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_super_admin"() RETURNS boolean
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."is_super_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_quote_number"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."set_quote_number"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."track_analytics_event"("p_session_id" "text", "p_event_type" "text", "p_event_data" "jsonb" DEFAULT '{}'::"jsonb", "p_page_path" "text" DEFAULT NULL::"text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."track_analytics_event"("p_session_id" "text", "p_event_type" "text", "p_event_data" "jsonb", "p_page_path" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."track_pricing_event"("p_user_id" "uuid", "p_session_id" "text", "p_event_type" "text", "p_event_data" "jsonb" DEFAULT '{}'::"jsonb", "p_step_number" integer DEFAULT NULL::integer, "p_time_spent" integer DEFAULT NULL::integer, "p_quote_id" bigint DEFAULT NULL::bigint) RETURNS bigint
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."track_pricing_event"("p_user_id" "uuid", "p_session_id" "text", "p_event_type" "text", "p_event_data" "jsonb", "p_step_number" integer, "p_time_spent" integer, "p_quote_id" bigint) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."track_quote_version"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."track_quote_version"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."validate_discount"("p_code" "text", "p_quote_id" bigint DEFAULT NULL::bigint, "p_tier_id" bigint DEFAULT NULL::bigint, "p_purchase_amount" numeric DEFAULT 0) RETURNS "jsonb"
    LANGUAGE "plpgsql" STABLE
    SET "search_path" TO ''
    AS $$
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


ALTER FUNCTION "public"."validate_discount"("p_code" "text", "p_quote_id" bigint, "p_tier_id" bigint, "p_purchase_amount" numeric) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."discounts" (
    "id" bigint NOT NULL,
    "code" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "discount_type" "text" NOT NULL,
    "discount_value" numeric(10,2) NOT NULL,
    "min_purchase_amount" numeric(10,2),
    "max_discount_amount" numeric(10,2),
    "usage_limit" integer,
    "usage_count" integer DEFAULT 0,
    "user_specific" boolean DEFAULT false,
    "user_id" "uuid",
    "starts_at" timestamp with time zone DEFAULT "now"(),
    "expires_at" timestamp with time zone,
    "applies_to" "text" NOT NULL,
    "applies_to_ids" "jsonb" DEFAULT '[]'::"jsonb",
    "conditions" "jsonb" DEFAULT '{}'::"jsonb",
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "check_percentage_value" CHECK ((("discount_type" <> 'percentage'::"text") OR ("discount_value" <= (100)::numeric))),
    CONSTRAINT "check_user_specific" CHECK (((("user_specific" = true) AND ("user_id" IS NOT NULL)) OR (("user_specific" = false) AND ("user_id" IS NULL)))),
    CONSTRAINT "discounts_applies_to_check" CHECK (("applies_to" = ANY (ARRAY['all'::"text", 'tier'::"text", 'level'::"text", 'service'::"text"]))),
    CONSTRAINT "discounts_discount_type_check" CHECK (("discount_type" = ANY (ARRAY['percentage'::"text", 'fixed'::"text", 'bundle'::"text"])))
);


ALTER TABLE "public"."discounts" OWNER TO "postgres";


COMMENT ON TABLE "public"."discounts" IS 'Stores discount codes and promotional offers with usage tracking';



CREATE OR REPLACE VIEW "public"."active_discounts_view" WITH ("security_invoker"='true') AS
 SELECT "id",
    "code",
    "name",
    "description",
    "discount_type",
    "discount_value",
        CASE
            WHEN ("discount_type" = 'percentage'::"text") THEN ("discount_value" || '%'::"text")
            WHEN ("discount_type" = 'fixed'::"text") THEN ('€'::"text" || "discount_value")
            ELSE 'Special Offer'::"text"
        END AS "display_value",
    "min_purchase_amount",
    "max_discount_amount",
    "usage_limit",
    "usage_count",
        CASE
            WHEN ("usage_limit" IS NOT NULL) THEN ("usage_limit" - "usage_count")
            ELSE NULL::integer
        END AS "remaining_uses",
    "starts_at",
    "expires_at",
        CASE
            WHEN ("expires_at" IS NOT NULL) THEN EXTRACT(days FROM ("expires_at" - "now"()))
            ELSE NULL::numeric
        END AS "days_remaining",
    "applies_to",
    "applies_to_ids",
    "conditions"
   FROM "public"."discounts"
  WHERE (("is_active" = true) AND ("now"() >= "starts_at") AND (("expires_at" IS NULL) OR ("now"() <= "expires_at")) AND (("usage_limit" IS NULL) OR ("usage_count" < "usage_limit")))
  ORDER BY
        CASE
            WHEN ("expires_at" IS NOT NULL) THEN "expires_at"
            ELSE '9999-12-31 00:00:00+00'::timestamp with time zone
        END, "discount_value" DESC;


ALTER VIEW "public"."active_discounts_view" OWNER TO "postgres";


COMMENT ON VIEW "public"."active_discounts_view" IS 'Currently active and available discount codes';



CREATE TABLE IF NOT EXISTS "public"."admin_audit_log" (
    "id" bigint NOT NULL,
    "admin_id" "uuid",
    "action" "text" NOT NULL,
    "table_name" "text" NOT NULL,
    "record_id" bigint,
    "old_data" "jsonb",
    "new_data" "jsonb",
    "ip_address" "inet",
    "user_agent" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."admin_audit_log" OWNER TO "postgres";


COMMENT ON TABLE "public"."admin_audit_log" IS 'Audit trail for all admin actions on the system';



ALTER TABLE "public"."admin_audit_log" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."admin_audit_log_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."applied_discounts" (
    "id" bigint NOT NULL,
    "quote_id" bigint,
    "discount_id" bigint,
    "discount_amount" numeric(10,2) NOT NULL,
    "applied_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."applied_discounts" OWNER TO "postgres";


COMMENT ON TABLE "public"."applied_discounts" IS 'Tracks applied discount codes to quotes';



ALTER TABLE "public"."applied_discounts" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."applied_discounts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."booked_slots" (
    "id" bigint NOT NULL,
    "time_slot_id" bigint,
    "booking_date" "date" NOT NULL,
    "quote_id" bigint,
    "confirmed" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."booked_slots" OWNER TO "postgres";


COMMENT ON TABLE "public"."booked_slots" IS 'Tracks booked time slots for contact appointments';



ALTER TABLE "public"."booked_slots" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."booked_slots_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."optional_services" (
    "id" bigint NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "category" "text" NOT NULL,
    "base_price" numeric(10,2) NOT NULL,
    "features" "jsonb" DEFAULT '[]'::"jsonb",
    "excluded_from_levels" "jsonb" DEFAULT '[]'::"jsonb",
    "tier_restrictions" "jsonb" DEFAULT '[]'::"jsonb",
    "sort_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."optional_services" OWNER TO "postgres";


COMMENT ON TABLE "public"."optional_services" IS 'Stores optional add-on services that can be purchased with any tier/level combination';



CREATE TABLE IF NOT EXISTS "public"."pricing_levels" (
    "id" bigint NOT NULL,
    "tier_id" bigint,
    "level_code" character(1) NOT NULL,
    "name" "text" NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "original_price" numeric(10,2),
    "description" "text",
    "features" "jsonb" DEFAULT '[]'::"jsonb",
    "sort_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "pricing_levels_level_code_check" CHECK (("level_code" = ANY (ARRAY['A'::"bpchar", 'B'::"bpchar", 'C'::"bpchar"])))
);


ALTER TABLE "public"."pricing_levels" OWNER TO "postgres";


COMMENT ON TABLE "public"."pricing_levels" IS 'Stores pricing levels (A, B, C) for each tier with associated features and pricing';



CREATE TABLE IF NOT EXISTS "public"."pricing_tiers" (
    "id" bigint NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "target_audience" "text",
    "sort_order" integer DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."pricing_tiers" OWNER TO "postgres";


COMMENT ON TABLE "public"."pricing_tiers" IS 'Stores different pricing tiers (Starter, Pro, Ecommerce) for the web agency services';



CREATE OR REPLACE VIEW "public"."complete_pricing_view" WITH ("security_invoker"='true') AS
 WITH "tier_services" AS (
         SELECT "t"."id" AS "tier_id",
            "t"."slug" AS "tier_slug",
            "t"."name" AS "tier_name",
            "l"."id" AS "level_id",
            "l"."level_code",
            "l"."name" AS "level_name",
            "l"."price" AS "level_price",
            "l"."original_price" AS "level_original_price",
            "jsonb_agg"("jsonb_build_object"('id', "os"."id", 'slug', "os"."slug", 'name', "os"."name", 'category', "os"."category", 'base_price', "os"."base_price", 'is_excluded',
                CASE
                    WHEN ("os"."tier_restrictions" @> "jsonb_build_array"("t"."slug")) THEN false
                    WHEN ("jsonb_array_length"("os"."tier_restrictions") > 0) THEN true
                    WHEN ("os"."excluded_from_levels" @> "jsonb_build_array"("l"."level_code")) THEN true
                    ELSE false
                END) ORDER BY "os"."sort_order") FILTER (WHERE ("os"."is_active" = true)) AS "available_services"
           FROM (("public"."pricing_tiers" "t"
             JOIN "public"."pricing_levels" "l" ON (("t"."id" = "l"."tier_id")))
             LEFT JOIN "public"."optional_services" "os" ON (("os"."is_active" = true)))
          WHERE (("t"."is_active" = true) AND ("l"."is_active" = true))
          GROUP BY "t"."id", "t"."slug", "t"."name", "l"."id", "l"."level_code", "l"."name", "l"."price", "l"."original_price"
        )
 SELECT "tier_id",
    "tier_slug",
    "tier_name",
    "level_id",
    "level_code",
    "level_name",
    "level_price",
    "level_original_price",
        CASE
            WHEN (("level_original_price" IS NOT NULL) AND ("level_original_price" > (0)::numeric)) THEN "round"(((("level_original_price" - "level_price") / "level_original_price") * (100)::numeric), 0)
            ELSE (0)::numeric
        END AS "discount_percentage",
    "available_services",
    ( SELECT "count"(*) AS "count"
           FROM "jsonb_array_elements"("tier_services"."available_services") "s"("value")
          WHERE (NOT (("s"."value" ->> 'is_excluded'::"text"))::boolean)) AS "available_services_count"
   FROM "tier_services"
  ORDER BY "tier_id", "level_code";


ALTER VIEW "public"."complete_pricing_view" OWNER TO "postgres";


COMMENT ON VIEW "public"."complete_pricing_view" IS 'Complete pricing structure with tiers, levels, and available services';



CREATE TABLE IF NOT EXISTS "public"."contact_preferences" (
    "id" bigint NOT NULL,
    "user_id" "uuid",
    "quote_id" bigint,
    "preferred_method" "text" NOT NULL,
    "contact_email" "text",
    "contact_phone" "text",
    "preferred_time_slot_id" bigint,
    "preferred_date" "date",
    "timezone" "text" DEFAULT 'Europe/Rome'::"text",
    "language_preference" "text" DEFAULT 'it'::"text",
    "additional_notes" "text",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "contact_preferences_preferred_method_check" CHECK (("preferred_method" = ANY (ARRAY['email'::"text", 'phone'::"text", 'whatsapp'::"text", 'video'::"text"])))
);


ALTER TABLE "public"."contact_preferences" OWNER TO "postgres";


COMMENT ON TABLE "public"."contact_preferences" IS 'Stores user contact preferences and scheduling information';



ALTER TABLE "public"."contact_preferences" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."contact_preferences_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."discounts" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."discounts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."optional_services" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."optional_services_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."persona_matcher_responses" (
    "id" bigint NOT NULL,
    "session_id" "text" NOT NULL,
    "user_id" "uuid",
    "questions" "jsonb" NOT NULL,
    "answers" "jsonb" NOT NULL,
    "matched_tier" "text",
    "matched_level" "text",
    "confidence_score" numeric(3,2),
    "recommendations" "jsonb" DEFAULT '{}'::"jsonb",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "persona_matcher_responses_confidence_score_check" CHECK ((("confidence_score" >= (0)::numeric) AND ("confidence_score" <= (1)::numeric)))
);


ALTER TABLE "public"."persona_matcher_responses" OWNER TO "postgres";


COMMENT ON TABLE "public"."persona_matcher_responses" IS 'Stores persona matching quiz responses and recommendations';



CREATE OR REPLACE VIEW "public"."persona_insights_view" WITH ("security_invoker"='true') AS
 WITH "recommendation_counts" AS (
         SELECT "persona_matcher_responses"."matched_tier",
            "persona_matcher_responses"."matched_level",
            "jsonb_object_keys"("persona_matcher_responses"."recommendations") AS "rec_key",
            "count"(*) AS "rec_count"
           FROM "public"."persona_matcher_responses"
          GROUP BY "persona_matcher_responses"."matched_tier", "persona_matcher_responses"."matched_level", ("jsonb_object_keys"("persona_matcher_responses"."recommendations"))
        )
 SELECT "matched_tier",
    "matched_level",
    "count"(*) AS "response_count",
    "avg"("confidence_score") AS "avg_confidence",
    "min"("confidence_score") AS "min_confidence",
    "max"("confidence_score") AS "max_confidence",
    "count"(DISTINCT "user_id") FILTER (WHERE ("user_id" IS NOT NULL)) AS "registered_users",
    "count"(*) FILTER (WHERE ("user_id" IS NULL)) AS "anonymous_users",
    ( SELECT "jsonb_object_agg"("rc"."rec_key", "rc"."rec_count") AS "jsonb_object_agg"
           FROM "recommendation_counts" "rc"
          WHERE (("rc"."matched_tier" = "p"."matched_tier") AND ("rc"."matched_level" = "p"."matched_level"))) AS "recommendation_frequency"
   FROM "public"."persona_matcher_responses" "p"
  GROUP BY "matched_tier", "matched_level"
  ORDER BY ("count"(*)) DESC;


ALTER VIEW "public"."persona_insights_view" OWNER TO "postgres";


COMMENT ON VIEW "public"."persona_insights_view" IS 'Insights from persona matching quiz responses';



CREATE OR REPLACE VIEW "public"."persona_matcher_analytics" WITH ("security_invoker"='true') AS
 WITH "mode_calc" AS (
         SELECT (("persona_matcher_responses"."matched_tier" || '-'::"text") || "persona_matcher_responses"."matched_level") AS "match_combo",
            "count"(*) AS "combo_count"
           FROM "public"."persona_matcher_responses"
          GROUP BY (("persona_matcher_responses"."matched_tier" || '-'::"text") || "persona_matcher_responses"."matched_level")
          ORDER BY ("count"(*)) DESC
         LIMIT 1
        )
 SELECT "matched_tier",
    "matched_level",
    "count"(*) AS "response_count",
    "avg"("confidence_score") AS "avg_confidence",
    "count"(DISTINCT "session_id") AS "unique_sessions",
    "round"(((("count"(*) FILTER (WHERE ("user_id" IS NOT NULL)))::numeric / (NULLIF("count"(*), 0))::numeric) * (100)::numeric), 2) AS "registered_user_percentage",
    ( SELECT "mode_calc"."match_combo"
           FROM "mode_calc") AS "most_common_match"
   FROM "public"."persona_matcher_responses" "p"
  GROUP BY "matched_tier", "matched_level"
  ORDER BY ("count"(*)) DESC;


ALTER VIEW "public"."persona_matcher_analytics" OWNER TO "postgres";


COMMENT ON VIEW "public"."persona_matcher_analytics" IS 'Analytics for persona matching results';



ALTER TABLE "public"."persona_matcher_responses" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."persona_matcher_responses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."pricing_config" (
    "id" bigint NOT NULL,
    "config_key" "text" NOT NULL,
    "config_value" "jsonb" NOT NULL,
    "description" "text",
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."pricing_config" OWNER TO "postgres";


COMMENT ON TABLE "public"."pricing_config" IS 'Stores global pricing configuration settings and parameters';



ALTER TABLE "public"."pricing_config" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."pricing_config_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."pricing_journey_events" (
    "id" bigint NOT NULL,
    "session_id" "text" NOT NULL,
    "user_id" "uuid",
    "event_type" "text" NOT NULL,
    "event_data" "jsonb" DEFAULT '{}'::"jsonb",
    "page_path" "text",
    "referrer" "text",
    "user_agent" "text",
    "ip_address" "inet",
    "device_type" "text",
    "browser" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."pricing_journey_events" OWNER TO "postgres";


COMMENT ON TABLE "public"."pricing_journey_events" IS 'Tracks user journey events through the pricing flow';



CREATE OR REPLACE VIEW "public"."pricing_funnel_analytics" WITH ("security_invoker"='true') AS
 SELECT "date_trunc"('day'::"text", "created_at") AS "date",
    "count"(DISTINCT "session_id") AS "total_sessions",
    "count"(DISTINCT "session_id") FILTER (WHERE ("event_type" = 'page_view'::"text")) AS "page_views",
    "count"(DISTINCT "session_id") FILTER (WHERE ("event_type" = 'tier_selected'::"text")) AS "tier_selections",
    "count"(DISTINCT "session_id") FILTER (WHERE ("event_type" = 'level_selected'::"text")) AS "level_selections",
    "count"(DISTINCT "session_id") FILTER (WHERE ("event_type" = 'services_selected'::"text")) AS "service_selections",
    "count"(DISTINCT "session_id") FILTER (WHERE ("event_type" = 'quote_created'::"text")) AS "quotes_created",
    "count"(DISTINCT "session_id") FILTER (WHERE ("event_type" = 'quote_submitted'::"text")) AS "quotes_submitted",
    "round"(((("count"(DISTINCT "session_id") FILTER (WHERE ("event_type" = 'quote_submitted'::"text")))::numeric / (NULLIF("count"(DISTINCT "session_id") FILTER (WHERE ("event_type" = 'page_view'::"text")), 0))::numeric) * (100)::numeric), 2) AS "conversion_rate"
   FROM "public"."pricing_journey_events"
  GROUP BY ("date_trunc"('day'::"text", "created_at"))
  ORDER BY ("date_trunc"('day'::"text", "created_at")) DESC;


ALTER VIEW "public"."pricing_funnel_analytics" OWNER TO "postgres";


COMMENT ON VIEW "public"."pricing_funnel_analytics" IS 'Daily funnel conversion metrics';



ALTER TABLE "public"."pricing_journey_events" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."pricing_journey_events_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."pricing_levels" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."pricing_levels_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."pricing_tiers" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."pricing_tiers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."user_quotes" (
    "id" bigint NOT NULL,
    "quote_sequence" bigint NOT NULL,
    "user_id" "uuid",
    "quote_number" "text" NOT NULL,
    "tier_id" bigint,
    "level_id" bigint,
    "selected_services" "jsonb" DEFAULT '[]'::"jsonb",
    "base_price" numeric(10,2) DEFAULT 0 NOT NULL,
    "services_price" numeric(10,2) DEFAULT 0,
    "discount_amount" numeric(10,2) DEFAULT 0,
    "tax_amount" numeric(10,2) DEFAULT 0,
    "total_price" numeric(10,2) DEFAULT 0 NOT NULL,
    "status" "text" DEFAULT 'draft'::"text",
    "expires_at" timestamp with time zone,
    "submitted_at" timestamp with time zone,
    "reviewed_at" timestamp with time zone,
    "contact_preferences" "jsonb" DEFAULT '{}'::"jsonb",
    "notes" "text",
    "admin_notes" "text",
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "user_quotes_status_check" CHECK (("status" = ANY (ARRAY['draft'::"text", 'submitted'::"text", 'under_review'::"text", 'accepted'::"text", 'rejected'::"text", 'expired'::"text"])))
);


ALTER TABLE "public"."user_quotes" OWNER TO "postgres";


COMMENT ON TABLE "public"."user_quotes" IS 'User quotes table with RLS policies that allow:
1. Users to view their own quotes
2. Users to create new quotes
3. Users to update their draft quotes
4. Users to submit (transition from draft to submitted) their quotes
5. Users cannot modify quotes after submission
6. Admins have full access to all quotes';



CREATE OR REPLACE VIEW "public"."quote_analytics_summary" WITH ("security_invoker"='true') AS
 SELECT "date_trunc"('day'::"text", "created_at") AS "date",
    "count"(*) AS "total_quotes",
    "count"(DISTINCT "user_id") AS "unique_users",
    "count"(*) FILTER (WHERE ("status" = 'draft'::"text")) AS "draft_quotes",
    "count"(*) FILTER (WHERE ("status" = 'submitted'::"text")) AS "submitted_quotes",
    "count"(*) FILTER (WHERE ("status" = 'accepted'::"text")) AS "accepted_quotes",
    "avg"("total_price") AS "avg_quote_value",
    "sum"("total_price") FILTER (WHERE ("status" = 'accepted'::"text")) AS "total_revenue"
   FROM "public"."user_quotes"
  GROUP BY ("date_trunc"('day'::"text", "created_at"));


ALTER VIEW "public"."quote_analytics_summary" OWNER TO "postgres";


COMMENT ON VIEW "public"."quote_analytics_summary" IS 'Aggregated daily analytics for quotes';



CREATE OR REPLACE VIEW "public"."quote_statistics_view" WITH ("security_invoker"='true') AS
 SELECT "count"(*) AS "total_quotes",
    "count"(DISTINCT "user_id") AS "unique_users",
    "count"(*) FILTER (WHERE ("status" = 'draft'::"text")) AS "draft_count",
    "count"(*) FILTER (WHERE ("status" = 'submitted'::"text")) AS "submitted_count",
    "count"(*) FILTER (WHERE ("status" = 'under_review'::"text")) AS "under_review_count",
    "count"(*) FILTER (WHERE ("status" = 'accepted'::"text")) AS "accepted_count",
    "count"(*) FILTER (WHERE ("status" = 'rejected'::"text")) AS "rejected_count",
    "count"(*) FILTER (WHERE ("status" = 'expired'::"text")) AS "expired_count",
    "avg"("total_price") FILTER (WHERE ("status" <> 'rejected'::"text")) AS "avg_quote_value",
    "min"("total_price") FILTER (WHERE ("status" <> 'rejected'::"text")) AS "min_quote_value",
    "max"("total_price") FILTER (WHERE ("status" <> 'rejected'::"text")) AS "max_quote_value",
    "sum"("total_price") FILTER (WHERE ("status" = 'accepted'::"text")) AS "total_accepted_value",
    "avg"((EXTRACT(epoch FROM ("submitted_at" - "created_at")) / (3600)::numeric)) FILTER (WHERE ("submitted_at" IS NOT NULL)) AS "avg_hours_to_submit",
    "round"(((("count"(*) FILTER (WHERE ("status" = 'accepted'::"text")))::numeric / (NULLIF("count"(*) FILTER (WHERE ("status" = ANY (ARRAY['accepted'::"text", 'rejected'::"text"]))), 0))::numeric) * (100)::numeric), 2) AS "acceptance_rate"
   FROM "public"."user_quotes";


ALTER VIEW "public"."quote_statistics_view" OWNER TO "postgres";


COMMENT ON VIEW "public"."quote_statistics_view" IS 'Aggregate statistics for quote performance';



CREATE OR REPLACE VIEW "public"."quote_status_analytics" WITH ("security_invoker"='true') AS
 SELECT "status",
    "count"(*) AS "count",
    "round"(((("count"(*))::numeric / "sum"("count"(*)) OVER ()) * (100)::numeric), 2) AS "percentage",
    "avg"("total_price") AS "avg_value",
    "sum"("total_price") AS "total_value",
    "max"("created_at") AS "last_created",
    ("avg"((EXTRACT(epoch FROM ("updated_at" - "created_at")) / (3600)::numeric)))::integer AS "avg_hours_in_status"
   FROM "public"."user_quotes"
  GROUP BY "status"
  ORDER BY ("count"(*)) DESC;


ALTER VIEW "public"."quote_status_analytics" OWNER TO "postgres";


COMMENT ON VIEW "public"."quote_status_analytics" IS 'Quote distribution by status with metrics';



CREATE TABLE IF NOT EXISTS "public"."quote_versions" (
    "id" bigint NOT NULL,
    "quote_id" bigint,
    "version_number" integer NOT NULL,
    "changes" "jsonb" NOT NULL,
    "changed_by" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."quote_versions" OWNER TO "postgres";


COMMENT ON TABLE "public"."quote_versions" IS 'Tracks version history and changes for each quote';



ALTER TABLE "public"."quote_versions" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."quote_versions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE OR REPLACE VIEW "public"."service_categories_view" WITH ("security_invoker"='true') AS
 SELECT "category",
    "count"(*) AS "service_count",
    "json_agg"("json_build_object"('id', "id", 'slug', "slug", 'name', "name", 'description', "description", 'base_price', "base_price", 'features', "features", 'sort_order', "sort_order") ORDER BY "sort_order", "name") AS "services"
   FROM "public"."optional_services"
  WHERE ("is_active" = true)
  GROUP BY "category"
  ORDER BY
        CASE "category"
            WHEN 'content'::"text" THEN 1
            WHEN 'media'::"text" THEN 2
            WHEN 'branding'::"text" THEN 3
            WHEN 'marketing'::"text" THEN 4
            WHEN 'localization'::"text" THEN 5
            WHEN 'support'::"text" THEN 6
            ELSE 99
        END;


ALTER VIEW "public"."service_categories_view" OWNER TO "postgres";


COMMENT ON VIEW "public"."service_categories_view" IS 'Optional services grouped by category';



CREATE OR REPLACE VIEW "public"."service_popularity_view" WITH ("security_invoker"='true') AS
 WITH "service_selections" AS (
         SELECT "os"."id",
            "os"."slug",
            "os"."name",
            "os"."category",
            "os"."base_price",
            "count"(*) AS "selection_count",
            "count"(*) FILTER (WHERE ("q"."status" = 'accepted'::"text")) AS "accepted_count"
           FROM ("public"."optional_services" "os"
             CROSS JOIN LATERAL ( SELECT "q_1"."id",
                    "q_1"."quote_sequence",
                    "q_1"."user_id",
                    "q_1"."quote_number",
                    "q_1"."tier_id",
                    "q_1"."level_id",
                    "q_1"."selected_services",
                    "q_1"."base_price",
                    "q_1"."services_price",
                    "q_1"."discount_amount",
                    "q_1"."tax_amount",
                    "q_1"."total_price",
                    "q_1"."status",
                    "q_1"."expires_at",
                    "q_1"."submitted_at",
                    "q_1"."reviewed_at",
                    "q_1"."contact_preferences",
                    "q_1"."notes",
                    "q_1"."admin_notes",
                    "q_1"."metadata",
                    "q_1"."created_at",
                    "q_1"."updated_at",
                    "s"."value" AS "service_id"
                   FROM "public"."user_quotes" "q_1",
                    LATERAL "jsonb_array_elements_text"("q_1"."selected_services") "s"("value")
                  WHERE (("s"."value")::bigint = "os"."id")) "q")
          GROUP BY "os"."id", "os"."slug", "os"."name", "os"."category", "os"."base_price"
        )
 SELECT "id",
    "slug",
    "name",
    "category",
    "base_price",
    "selection_count",
    "accepted_count",
    "round"(((("selection_count")::numeric / (NULLIF(( SELECT "count"(*) AS "count"
           FROM "public"."user_quotes"), 0))::numeric) * (100)::numeric), 2) AS "selection_rate",
    (("selection_count")::numeric * "base_price") AS "potential_revenue",
    (("accepted_count")::numeric * "base_price") AS "actual_revenue"
   FROM "service_selections"
  ORDER BY "selection_count" DESC;


ALTER VIEW "public"."service_popularity_view" OWNER TO "postgres";


COMMENT ON VIEW "public"."service_popularity_view" IS 'Popularity and revenue metrics for optional services';



CREATE OR REPLACE VIEW "public"."tier_comparison_view" WITH ("security_invoker"='true') AS
 WITH "level_features" AS (
         SELECT "t"."slug" AS "tier_slug",
            "t"."name" AS "tier_name",
            "t"."description" AS "tier_description",
            "t"."target_audience",
            "l"."level_code",
            "l"."name" AS "level_name",
            "l"."price",
            "l"."original_price",
            "l"."features",
            "row_number"() OVER (PARTITION BY "t"."id" ORDER BY "l"."level_code") AS "level_order"
           FROM ("public"."pricing_tiers" "t"
             JOIN "public"."pricing_levels" "l" ON (("t"."id" = "l"."tier_id")))
          WHERE (("t"."is_active" = true) AND ("l"."is_active" = true))
        )
 SELECT "tier_slug",
    "tier_name",
    "tier_description",
    "target_audience",
    "jsonb_object_agg"("level_code", "jsonb_build_object"('name', "level_name", 'price', "price", 'original_price', "original_price", 'features', "features")) AS "levels"
   FROM "level_features"
  GROUP BY "tier_slug", "tier_name", "tier_description", "target_audience"
  ORDER BY
        CASE "tier_slug"
            WHEN 'starter'::"text" THEN 1
            WHEN 'pro'::"text" THEN 2
            WHEN 'ecommerce'::"text" THEN 3
            ELSE 99
        END;


ALTER VIEW "public"."tier_comparison_view" OWNER TO "postgres";


COMMENT ON VIEW "public"."tier_comparison_view" IS 'Side-by-side comparison of all tiers and their levels';



CREATE OR REPLACE VIEW "public"."tier_performance_view" WITH ("security_invoker"='true') AS
 WITH "tier_stats" AS (
         SELECT "t"."id" AS "tier_id",
            "t"."slug" AS "tier_slug",
            "t"."name" AS "tier_name",
            "l"."id" AS "level_id",
            "l"."level_code",
            "count"(DISTINCT "q"."id") AS "level_quote_count",
            "count"(DISTINCT
                CASE
                    WHEN ("q"."status" = 'accepted'::"text") THEN "q"."id"
                    ELSE NULL::bigint
                END) AS "level_accepted_count",
            "avg"("q"."total_price") AS "level_avg_value"
           FROM (("public"."pricing_tiers" "t"
             LEFT JOIN "public"."pricing_levels" "l" ON (("t"."id" = "l"."tier_id")))
             LEFT JOIN "public"."user_quotes" "q" ON ((("q"."tier_id" = "t"."id") AND ("q"."level_id" = "l"."id"))))
          WHERE ("t"."is_active" = true)
          GROUP BY "t"."id", "t"."slug", "t"."name", "l"."id", "l"."level_code"
        ), "tier_totals" AS (
         SELECT "t"."slug" AS "tier_slug",
            "t"."name" AS "tier_name",
            "count"(DISTINCT "q"."id") AS "total_quotes",
            "count"(DISTINCT "q"."id") FILTER (WHERE ("q"."status" = 'accepted'::"text")) AS "accepted_quotes",
            "avg"("q"."total_price") AS "avg_quote_value",
            "sum"("q"."total_price") FILTER (WHERE ("q"."status" = 'accepted'::"text")) AS "total_revenue"
           FROM ("public"."pricing_tiers" "t"
             LEFT JOIN "public"."user_quotes" "q" ON (("q"."tier_id" = "t"."id")))
          WHERE ("t"."is_active" = true)
          GROUP BY "t"."slug", "t"."name"
        )
 SELECT "tt"."tier_slug",
    "tt"."tier_name",
    "tt"."total_quotes",
    "tt"."accepted_quotes",
    "tt"."avg_quote_value",
    "tt"."total_revenue",
    "jsonb_object_agg"("ts"."level_code", "jsonb_build_object"('quote_count', "ts"."level_quote_count", 'accepted_count', "ts"."level_accepted_count", 'avg_value', "ts"."level_avg_value")) FILTER (WHERE ("ts"."level_code" IS NOT NULL)) AS "level_breakdown"
   FROM ("tier_totals" "tt"
     LEFT JOIN "tier_stats" "ts" ON (("ts"."tier_slug" = "tt"."tier_slug")))
  GROUP BY "tt"."tier_slug", "tt"."tier_name", "tt"."total_quotes", "tt"."accepted_quotes", "tt"."avg_quote_value", "tt"."total_revenue"
  ORDER BY "tt"."total_revenue" DESC NULLS LAST;


ALTER VIEW "public"."tier_performance_view" OWNER TO "postgres";


COMMENT ON VIEW "public"."tier_performance_view" IS 'Performance metrics for each pricing tier';



CREATE TABLE IF NOT EXISTS "public"."time_slots" (
    "id" bigint NOT NULL,
    "day_of_week" integer NOT NULL,
    "start_time" time without time zone NOT NULL,
    "end_time" time without time zone NOT NULL,
    "slot_duration" integer DEFAULT 60,
    "slot_type" "text" DEFAULT 'contact'::"text",
    "is_available" boolean DEFAULT true,
    "max_bookings" integer DEFAULT 1,
    "current_bookings" integer DEFAULT 0,
    "metadata" "jsonb" DEFAULT '{}'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "time_slots_day_of_week_check" CHECK ((("day_of_week" >= 0) AND ("day_of_week" <= 6))),
    CONSTRAINT "time_slots_slot_type_check" CHECK (("slot_type" = ANY (ARRAY['contact'::"text", 'meeting'::"text", 'support'::"text"]))),
    CONSTRAINT "valid_time_range" CHECK (("end_time" > "start_time"))
);


ALTER TABLE "public"."time_slots" OWNER TO "postgres";


COMMENT ON TABLE "public"."time_slots" IS 'Defines available time slots for contact and meetings';



CREATE OR REPLACE VIEW "public"."time_slot_availability_view" WITH ("security_invoker"='true') AS
 SELECT "day_of_week",
        CASE "day_of_week"
            WHEN 0 THEN 'Sunday'::"text"
            WHEN 1 THEN 'Monday'::"text"
            WHEN 2 THEN 'Tuesday'::"text"
            WHEN 3 THEN 'Wednesday'::"text"
            WHEN 4 THEN 'Thursday'::"text"
            WHEN 5 THEN 'Friday'::"text"
            WHEN 6 THEN 'Saturday'::"text"
            ELSE NULL::"text"
        END AS "day_name",
    "slot_type",
    "count"(*) AS "total_slots",
    "count"(*) FILTER (WHERE ("is_available" = true)) AS "available_slots",
    "sum"("max_bookings") AS "total_capacity",
    "sum"("current_bookings") AS "current_bookings",
    "sum"(("max_bookings" - "current_bookings")) FILTER (WHERE ("is_available" = true)) AS "available_capacity",
    "round"(((("sum"("current_bookings"))::numeric / (NULLIF("sum"("max_bookings"), 0))::numeric) * (100)::numeric), 2) AS "utilization_rate"
   FROM "public"."time_slots"
  GROUP BY "day_of_week", "slot_type"
  ORDER BY "day_of_week", "slot_type";


ALTER VIEW "public"."time_slot_availability_view" OWNER TO "postgres";


COMMENT ON VIEW "public"."time_slot_availability_view" IS 'Overview of time slot availability and utilization';



ALTER TABLE "public"."time_slots" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."time_slots_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE OR REPLACE VIEW "public"."user_journey_funnel_view" WITH ("security_invoker"='true') AS
 WITH "journey_stages" AS (
         SELECT "pricing_journey_events"."session_id",
            "pricing_journey_events"."user_id",
            "min"("pricing_journey_events"."created_at") FILTER (WHERE (("pricing_journey_events"."event_type" = 'page_view'::"text") AND ("pricing_journey_events"."page_path" = '/pricing'::"text"))) AS "viewed_pricing",
            "min"("pricing_journey_events"."created_at") FILTER (WHERE ("pricing_journey_events"."event_type" = 'tier_selected'::"text")) AS "selected_tier",
            "min"("pricing_journey_events"."created_at") FILTER (WHERE ("pricing_journey_events"."event_type" = 'level_selected'::"text")) AS "selected_level",
            "min"("pricing_journey_events"."created_at") FILTER (WHERE ("pricing_journey_events"."event_type" = 'services_added'::"text")) AS "added_services",
            "min"("pricing_journey_events"."created_at") FILTER (WHERE ("pricing_journey_events"."event_type" = 'quote_created'::"text")) AS "created_quote",
            "min"("pricing_journey_events"."created_at") FILTER (WHERE ("pricing_journey_events"."event_type" = 'quote_submitted'::"text")) AS "submitted_quote"
           FROM "public"."pricing_journey_events"
          GROUP BY "pricing_journey_events"."session_id", "pricing_journey_events"."user_id"
        )
 SELECT "count"(*) AS "total_sessions",
    "count"("viewed_pricing") AS "viewed_pricing_count",
    "count"("selected_tier") AS "selected_tier_count",
    "count"("selected_level") AS "selected_level_count",
    "count"("added_services") AS "added_services_count",
    "count"("created_quote") AS "created_quote_count",
    "count"("submitted_quote") AS "submitted_quote_count",
    "round"(((("count"("selected_tier"))::numeric / (NULLIF("count"("viewed_pricing"), 0))::numeric) * (100)::numeric), 2) AS "tier_selection_rate",
    "round"(((("count"("selected_level"))::numeric / (NULLIF("count"("selected_tier"), 0))::numeric) * (100)::numeric), 2) AS "level_selection_rate",
    "round"(((("count"("created_quote"))::numeric / (NULLIF("count"("selected_level"), 0))::numeric) * (100)::numeric), 2) AS "quote_creation_rate",
    "round"(((("count"("submitted_quote"))::numeric / (NULLIF("count"("created_quote"), 0))::numeric) * (100)::numeric), 2) AS "quote_submission_rate",
    "round"(((("count"("submitted_quote"))::numeric / (NULLIF("count"("viewed_pricing"), 0))::numeric) * (100)::numeric), 2) AS "overall_conversion_rate"
   FROM "journey_stages";


ALTER VIEW "public"."user_journey_funnel_view" OWNER TO "postgres";


COMMENT ON VIEW "public"."user_journey_funnel_view" IS 'Conversion funnel metrics for the pricing journey';



ALTER TABLE "public"."user_quotes" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."user_quotes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."user_quotes" ALTER COLUMN "quote_sequence" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."user_quotes_quote_sequence_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."users_profile" (
    "id" "uuid" NOT NULL,
    "email" "text",
    "display_name" "text",
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."users_profile" OWNER TO "postgres";


COMMENT ON TABLE "public"."users_profile" IS 'Public user profile with safe fields only - prevents auth.users exposure';



CREATE OR REPLACE VIEW "public"."v_admin_quote_overview" WITH ("security_invoker"='true') AS
 SELECT "q"."id" AS "quote_id",
    "q"."quote_number",
    "q"."status" AS "quote_status",
    "q"."created_at" AS "quote_created_at",
    "q"."updated_at" AS "quote_updated_at",
    "q"."submitted_at" AS "quote_submitted_at",
    "q"."reviewed_at" AS "quote_reviewed_at",
    "q"."expires_at" AS "quote_expires_at",
    "up"."id" AS "user_id",
    "up"."email" AS "user_email",
    "up"."display_name" AS "user_name",
    "t"."id" AS "tier_id",
    "t"."slug" AS "tier_slug",
    "t"."name" AS "tier_name",
    "l"."id" AS "level_id",
    "l"."level_code",
    "l"."name" AS "level_name",
    "q"."base_price" AS "base_price_eur",
    "q"."services_price" AS "services_price_eur",
    "q"."discount_amount" AS "discount_amount_eur",
    "q"."tax_amount" AS "tax_amount_eur",
    "q"."total_price" AS "total_price_eur",
    "q"."selected_services",
    "array_length"(ARRAY( SELECT "jsonb_array_elements_text"("q"."selected_services") AS "jsonb_array_elements_text"), 1) AS "service_count",
    "q"."contact_preferences",
    ("q"."contact_preferences" ->> 'preferred_method'::"text") AS "preferred_contact_method",
    "q"."notes" AS "customer_notes",
    "q"."admin_notes",
        CASE
            WHEN ("q"."status" = 'expired'::"text") THEN true
            WHEN ("q"."expires_at" < "now"()) THEN true
            ELSE false
        END AS "is_expired",
        CASE
            WHEN ("q"."status" = 'draft'::"text") THEN true
            ELSE false
        END AS "is_editable"
   FROM ((("public"."user_quotes" "q"
     LEFT JOIN "public"."users_profile" "up" ON (("q"."user_id" = "up"."id")))
     LEFT JOIN "public"."pricing_tiers" "t" ON (("q"."tier_id" = "t"."id")))
     LEFT JOIN "public"."pricing_levels" "l" ON (("q"."level_id" = "l"."id")));


ALTER VIEW "public"."v_admin_quote_overview" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_admin_quote_overview" IS 'Administrative view of quotes with all related details using users_profile for security';



CREATE OR REPLACE VIEW "public"."v_admin_quote_review_queue" WITH ("security_invoker"='true') AS
 SELECT "q"."id" AS "quote_id",
    "q"."quote_number",
    "q"."status",
    "q"."created_at",
    "q"."submitted_at",
    "q"."expires_at",
    "q"."total_price" AS "total_price_eur",
    "up"."email" AS "user_email",
    "up"."display_name" AS "user_full_name",
    "t"."name" AS "tier_name",
    "l"."level_code",
    "l"."name" AS "level_name",
        CASE
            WHEN ("q"."status" = 'submitted'::"text") THEN 1
            WHEN ("q"."status" = 'under_review'::"text") THEN 2
            WHEN (("q"."status" = 'draft'::"text") AND ("q"."created_at" < ("now"() - '7 days'::interval))) THEN 3
            ELSE 4
        END AS "priority",
    EXTRACT(hours FROM ("now"() - "q"."submitted_at")) AS "hours_since_submission",
    EXTRACT(days FROM ("q"."expires_at" - "now"())) AS "days_until_expiry",
        CASE
            WHEN ("q"."status" = 'submitted'::"text") THEN 'Review Required'::"text"
            WHEN ("q"."status" = 'under_review'::"text") THEN 'Complete Review'::"text"
            WHEN (("q"."status" = 'draft'::"text") AND ("q"."created_at" < ("now"() - '7 days'::interval))) THEN 'Follow Up'::"text"
            ELSE 'No Action'::"text"
        END AS "action_needed"
   FROM ((("public"."user_quotes" "q"
     LEFT JOIN "public"."users_profile" "up" ON (("q"."user_id" = "up"."id")))
     LEFT JOIN "public"."pricing_tiers" "t" ON (("q"."tier_id" = "t"."id")))
     LEFT JOIN "public"."pricing_levels" "l" ON (("q"."level_id" = "l"."id")))
  WHERE ("q"."status" = ANY (ARRAY['submitted'::"text", 'under_review'::"text", 'draft'::"text"]))
  ORDER BY
        CASE
            WHEN ("q"."status" = 'submitted'::"text") THEN 1
            WHEN ("q"."status" = 'under_review'::"text") THEN 2
            WHEN (("q"."status" = 'draft'::"text") AND ("q"."created_at" < ("now"() - '7 days'::interval))) THEN 3
            ELSE 4
        END, "q"."submitted_at";


ALTER VIEW "public"."v_admin_quote_review_queue" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_admin_quote_review_queue" IS 'Admin queue for quotes requiring review or action';



CREATE OR REPLACE VIEW "public"."v_contact_outreach_list" WITH ("security_invoker"='true') AS
 SELECT "q"."id" AS "quote_id",
    "q"."quote_number",
    "q"."status" AS "quote_status",
    "q"."created_at" AS "quote_created_at",
    "q"."submitted_at" AS "quote_submitted_at",
    "q"."expires_at" AS "quote_expires_at",
    "up"."email" AS "user_email",
    "up"."display_name" AS "user_full_name",
    NULL::"text" AS "user_phone",
    "cp"."preferred_method" AS "preferred_contact_method",
    "cp"."contact_email",
    "cp"."contact_phone",
    "cp"."preferred_date",
    "cp"."timezone",
    "cp"."language_preference",
        CASE
            WHEN (("q"."status" = 'draft'::"text") AND ("q"."created_at" < ("now"() - '3 days'::interval))) THEN 'High - Abandoned Draft'::"text"
            WHEN (("q"."status" = 'submitted'::"text") AND ("q"."submitted_at" < ("now"() - '2 days'::interval))) THEN 'High - Pending Review'::"text"
            WHEN (("q"."status" = 'under_review'::"text") AND ("q"."reviewed_at" < ("now"() - '1 day'::interval))) THEN 'Medium - In Review'::"text"
            WHEN ("q"."expires_at" < ("now"() + '3 days'::interval)) THEN 'High - Expiring Soon'::"text"
            ELSE 'Low - Standard'::"text"
        END AS "outreach_priority",
    EXTRACT(days FROM ("now"() - GREATEST("q"."created_at", "q"."updated_at", "q"."submitted_at", "q"."reviewed_at"))) AS "days_since_activity"
   FROM (("public"."user_quotes" "q"
     LEFT JOIN "public"."users_profile" "up" ON (("q"."user_id" = "up"."id")))
     LEFT JOIN "public"."contact_preferences" "cp" ON (("cp"."quote_id" = "q"."id")))
  WHERE ("q"."status" <> ALL (ARRAY['accepted'::"text", 'rejected'::"text", 'expired'::"text"]))
  ORDER BY
        CASE
            WHEN (("q"."status" = 'draft'::"text") AND ("q"."created_at" < ("now"() - '3 days'::interval))) THEN 1
            WHEN (("q"."status" = 'submitted'::"text") AND ("q"."submitted_at" < ("now"() - '2 days'::interval))) THEN 2
            WHEN ("q"."expires_at" < ("now"() + '3 days'::interval)) THEN 3
            ELSE 4
        END, "q"."created_at";


ALTER VIEW "public"."v_contact_outreach_list" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_contact_outreach_list" IS 'Priority list for customer outreach and follow-ups';



CREATE OR REPLACE VIEW "public"."v_executive_dashboard" WITH ("security_invoker"='true') AS
 WITH "current_month" AS (
         SELECT "count"(*) AS "quotes_this_month",
            "count"(DISTINCT "user_quotes"."user_id") AS "unique_users_this_month",
            "sum"(
                CASE
                    WHEN ("user_quotes"."status" = 'accepted'::"text") THEN "user_quotes"."total_price"
                    ELSE (0)::numeric
                END) AS "revenue_this_month",
            "avg"("user_quotes"."total_price") AS "avg_quote_value_this_month"
           FROM "public"."user_quotes"
          WHERE ("user_quotes"."created_at" >= "date_trunc"('month'::"text", "now"()))
        ), "previous_month" AS (
         SELECT "count"(*) AS "quotes_last_month",
            "count"(DISTINCT "user_quotes"."user_id") AS "unique_users_last_month",
            "sum"(
                CASE
                    WHEN ("user_quotes"."status" = 'accepted'::"text") THEN "user_quotes"."total_price"
                    ELSE (0)::numeric
                END) AS "revenue_last_month",
            "avg"("user_quotes"."total_price") AS "avg_quote_value_last_month"
           FROM "public"."user_quotes"
          WHERE (("user_quotes"."created_at" >= "date_trunc"('month'::"text", ("now"() - '1 mon'::interval))) AND ("user_quotes"."created_at" < "date_trunc"('month'::"text", "now"())))
        ), "pending_actions" AS (
         SELECT "count"(*) FILTER (WHERE ("user_quotes"."status" = 'submitted'::"text")) AS "quotes_pending_review",
            "count"(*) FILTER (WHERE ("user_quotes"."status" = 'under_review'::"text")) AS "quotes_under_review",
            "count"(*) FILTER (WHERE (("user_quotes"."status" = 'draft'::"text") AND ("user_quotes"."created_at" < ("now"() - '7 days'::interval)))) AS "abandoned_drafts"
           FROM "public"."user_quotes"
        )
 SELECT "cm"."quotes_this_month",
    "cm"."unique_users_this_month",
    "cm"."revenue_this_month",
    "cm"."avg_quote_value_this_month",
    "round"(((100.0 * (("cm"."quotes_this_month" - "pm"."quotes_last_month"))::numeric) / (NULLIF("pm"."quotes_last_month", 0))::numeric), 2) AS "quote_growth_rate",
    "round"(((100.0 * ("cm"."revenue_this_month" - "pm"."revenue_last_month")) / NULLIF("pm"."revenue_last_month", (0)::numeric)), 2) AS "revenue_growth_rate",
    "pa"."quotes_pending_review",
    "pa"."quotes_under_review",
    "pa"."abandoned_drafts",
    ( SELECT "count"(*) AS "count"
           FROM "public"."user_quotes") AS "total_quotes_all_time",
    ( SELECT "sum"("user_quotes"."total_price") AS "sum"
           FROM "public"."user_quotes"
          WHERE ("user_quotes"."status" = 'accepted'::"text")) AS "total_revenue_all_time"
   FROM "current_month" "cm",
    "previous_month" "pm",
    "pending_actions" "pa";


ALTER VIEW "public"."v_executive_dashboard" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_executive_dashboard" IS 'Executive dashboard with key metrics and growth indicators';



CREATE OR REPLACE VIEW "public"."v_persona_matcher_analysis" WITH ("security_invoker"='true') AS
 SELECT "pm"."matched_tier",
    "pm"."matched_level",
    "count"(DISTINCT "pm"."session_id") AS "total_matches",
    "avg"("pm"."confidence_score") AS "avg_confidence_score",
    "count"(DISTINCT "q"."id") AS "quotes_created",
    "count"(DISTINCT
        CASE
            WHEN ("q"."status" = 'submitted'::"text") THEN "q"."id"
            ELSE NULL::bigint
        END) AS "quotes_submitted",
    "count"(DISTINCT
        CASE
            WHEN ("q"."status" = 'accepted'::"text") THEN "q"."id"
            ELSE NULL::bigint
        END) AS "quotes_accepted",
    "round"(((100.0 * ("count"(DISTINCT "q"."id"))::numeric) / (NULLIF("count"(DISTINCT "pm"."session_id"), 0))::numeric), 2) AS "quote_creation_rate",
    "round"(((100.0 * ("count"(DISTINCT
        CASE
            WHEN ("q"."status" = 'accepted'::"text") THEN "q"."id"
            ELSE NULL::bigint
        END))::numeric) / (NULLIF("count"(DISTINCT "q"."id"), 0))::numeric), 2) AS "acceptance_rate",
    "count"(DISTINCT
        CASE
            WHEN (("q"."tier_id" = "t"."id") AND ("pm"."matched_tier" = "t"."slug")) THEN "q"."id"
            ELSE NULL::bigint
        END) AS "matched_tier_quotes",
    "round"(((100.0 * ("count"(DISTINCT
        CASE
            WHEN (("q"."tier_id" = "t"."id") AND ("pm"."matched_tier" = "t"."slug")) THEN "q"."id"
            ELSE NULL::bigint
        END))::numeric) / (NULLIF("count"(DISTINCT "q"."id"), 0))::numeric), 2) AS "tier_match_accuracy"
   FROM (("public"."persona_matcher_responses" "pm"
     LEFT JOIN "public"."user_quotes" "q" ON (("q"."user_id" = "pm"."user_id")))
     LEFT JOIN "public"."pricing_tiers" "t" ON (("t"."slug" = "pm"."matched_tier")))
  GROUP BY "pm"."matched_tier", "pm"."matched_level"
  ORDER BY ("count"(DISTINCT "pm"."session_id")) DESC;


ALTER VIEW "public"."v_persona_matcher_analysis" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_persona_matcher_analysis" IS 'Persona matcher effectiveness and conversion analysis';



CREATE OR REPLACE VIEW "public"."v_pricing_catalog" WITH ("security_invoker"='true') AS
 SELECT "t"."id" AS "tier_id",
    "t"."slug" AS "tier_slug",
    "t"."name" AS "tier_name",
    "t"."description" AS "tier_description",
    "t"."target_audience" AS "tier_target_audience",
    "t"."sort_order" AS "tier_sort_order",
    "t"."is_active" AS "tier_is_active",
    "l"."id" AS "level_id",
    "l"."level_code",
    "l"."name" AS "level_name",
    "l"."price" AS "level_price_eur",
    "l"."original_price" AS "level_original_price_eur",
    "l"."description" AS "level_description",
    "l"."features" AS "level_features",
    "l"."sort_order" AS "level_sort_order",
    "l"."is_active" AS "level_is_active",
        CASE
            WHEN (("l"."original_price" IS NOT NULL) AND ("l"."original_price" > "l"."price")) THEN "round"(((("l"."original_price" - "l"."price") / "l"."original_price") * (100)::numeric), 2)
            ELSE (0)::numeric
        END AS "level_discount_percentage",
    "l"."created_at" AS "level_created_at",
    "l"."updated_at" AS "level_updated_at"
   FROM ("public"."pricing_tiers" "t"
     JOIN "public"."pricing_levels" "l" ON (("t"."id" = "l"."tier_id")))
  WHERE ("t"."is_active" = true)
  ORDER BY "t"."sort_order", "l"."sort_order";


ALTER VIEW "public"."v_pricing_catalog" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_pricing_catalog" IS 'Complete pricing structure with tiers and levels for catalog display';



CREATE OR REPLACE VIEW "public"."v_pricing_funnel_analysis" WITH ("security_invoker"='true') AS
 WITH "funnel_stages" AS (
         SELECT "date_trunc"('day'::"text", "pricing_journey_events"."created_at") AS "day",
            "count"(DISTINCT "pricing_journey_events"."session_id") AS "total_sessions",
            "count"(DISTINCT
                CASE
                    WHEN ("pricing_journey_events"."event_type" = 'page_view'::"text") THEN "pricing_journey_events"."session_id"
                    ELSE NULL::"text"
                END) AS "viewed_pricing",
            "count"(DISTINCT
                CASE
                    WHEN ("pricing_journey_events"."event_type" = 'tier_selected'::"text") THEN "pricing_journey_events"."session_id"
                    ELSE NULL::"text"
                END) AS "selected_tier",
            "count"(DISTINCT
                CASE
                    WHEN ("pricing_journey_events"."event_type" = 'level_selected'::"text") THEN "pricing_journey_events"."session_id"
                    ELSE NULL::"text"
                END) AS "selected_level",
            "count"(DISTINCT
                CASE
                    WHEN ("pricing_journey_events"."event_type" = 'services_selected'::"text") THEN "pricing_journey_events"."session_id"
                    ELSE NULL::"text"
                END) AS "selected_services",
            "count"(DISTINCT
                CASE
                    WHEN ("pricing_journey_events"."event_type" = 'contact_info_entered'::"text") THEN "pricing_journey_events"."session_id"
                    ELSE NULL::"text"
                END) AS "entered_contact",
            "count"(DISTINCT
                CASE
                    WHEN ("pricing_journey_events"."event_type" = 'quote_created'::"text") THEN "pricing_journey_events"."session_id"
                    ELSE NULL::"text"
                END) AS "created_quote",
            "count"(DISTINCT
                CASE
                    WHEN ("pricing_journey_events"."event_type" = 'quote_submitted'::"text") THEN "pricing_journey_events"."session_id"
                    ELSE NULL::"text"
                END) AS "submitted_quote"
           FROM "public"."pricing_journey_events"
          GROUP BY ("date_trunc"('day'::"text", "pricing_journey_events"."created_at"))
        )
 SELECT "day",
    "total_sessions",
    "viewed_pricing",
    "selected_tier",
    "selected_level",
    "selected_services",
    "entered_contact",
    "created_quote",
    "submitted_quote",
    "round"(((100.0 * ("selected_tier")::numeric) / (NULLIF("viewed_pricing", 0))::numeric), 2) AS "tier_selection_rate",
    "round"(((100.0 * ("selected_level")::numeric) / (NULLIF("selected_tier", 0))::numeric), 2) AS "level_selection_rate",
    "round"(((100.0 * ("selected_services")::numeric) / (NULLIF("selected_level", 0))::numeric), 2) AS "service_selection_rate",
    "round"(((100.0 * ("created_quote")::numeric) / (NULLIF("selected_services", 0))::numeric), 2) AS "quote_creation_rate",
    "round"(((100.0 * ("submitted_quote")::numeric) / (NULLIF("created_quote", 0))::numeric), 2) AS "quote_submission_rate",
    "round"(((100.0 * ("submitted_quote")::numeric) / (NULLIF("viewed_pricing", 0))::numeric), 2) AS "overall_conversion_rate"
   FROM "funnel_stages"
  ORDER BY "day" DESC;


ALTER VIEW "public"."v_pricing_funnel_analysis" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_pricing_funnel_analysis" IS 'Daily pricing funnel conversion analysis';



CREATE OR REPLACE VIEW "public"."v_pricing_system_summary" WITH ("security_invoker"='true') AS
 SELECT ( SELECT "count"(*) AS "count"
           FROM "public"."pricing_tiers"
          WHERE ("pricing_tiers"."is_active" = true)) AS "active_tiers",
    ( SELECT "count"(*) AS "count"
           FROM "public"."pricing_levels"
          WHERE ("pricing_levels"."is_active" = true)) AS "active_levels",
    ( SELECT "count"(*) AS "count"
           FROM "public"."optional_services"
          WHERE ("optional_services"."is_active" = true)) AS "active_services",
    ( SELECT "count"(*) AS "count"
           FROM "public"."user_quotes") AS "total_quotes",
    ( SELECT "count"(*) AS "count"
           FROM "public"."user_quotes"
          WHERE ("user_quotes"."status" = 'draft'::"text")) AS "draft_quotes",
    ( SELECT "count"(*) AS "count"
           FROM "public"."user_quotes"
          WHERE ("user_quotes"."status" = 'submitted'::"text")) AS "submitted_quotes",
    ( SELECT "count"(*) AS "count"
           FROM "public"."user_quotes"
          WHERE ("user_quotes"."status" = 'accepted'::"text")) AS "accepted_quotes",
    ( SELECT "count"(DISTINCT "user_quotes"."user_id") AS "count"
           FROM "public"."user_quotes") AS "total_users",
    ( SELECT "count"(DISTINCT "user_quotes"."user_id") AS "count"
           FROM "public"."user_quotes"
          WHERE ("user_quotes"."created_at" >= ("now"() - '30 days'::interval))) AS "active_users_30d",
    ( SELECT "sum"("user_quotes"."total_price") AS "sum"
           FROM "public"."user_quotes"
          WHERE ("user_quotes"."status" = 'accepted'::"text")) AS "total_revenue_eur",
    ( SELECT "avg"("user_quotes"."total_price") AS "avg"
           FROM "public"."user_quotes"
          WHERE ("user_quotes"."status" = 'accepted'::"text")) AS "avg_accepted_quote_eur",
    ( SELECT "count"(*) AS "count"
           FROM "public"."discounts"
          WHERE (("discounts"."is_active" = true) AND (("discounts"."expires_at" IS NULL) OR ("discounts"."expires_at" > "now"())))) AS "active_discounts",
    ( SELECT "sum"("applied_discounts"."discount_amount") AS "sum"
           FROM "public"."applied_discounts") AS "total_discounts_applied_eur",
    ( SELECT "count"(DISTINCT "pricing_journey_events"."session_id") AS "count"
           FROM "public"."pricing_journey_events") AS "total_sessions",
    ( SELECT "count"(*) AS "count"
           FROM "public"."persona_matcher_responses") AS "total_persona_matches",
    ( SELECT "count"(*) AS "count"
           FROM "public"."time_slots"
          WHERE ("time_slots"."is_available" = true)) AS "available_time_slots",
    ( SELECT "count"(*) AS "count"
           FROM "public"."booked_slots"
          WHERE (("booked_slots"."confirmed" = true) AND ("booked_slots"."booking_date" >= CURRENT_DATE))) AS "upcoming_bookings";


ALTER VIEW "public"."v_pricing_system_summary" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_pricing_system_summary" IS 'High-level summary of the entire pricing system';



CREATE OR REPLACE VIEW "public"."v_quote_details" WITH ("security_invoker"='true') AS
 SELECT "q"."id" AS "quote_id",
    "q"."quote_number",
    "q"."status" AS "quote_status",
    "q"."created_at" AS "quote_created_at",
    "q"."updated_at" AS "quote_updated_at",
    "q"."submitted_at" AS "quote_submitted_at",
    "q"."reviewed_at" AS "quote_reviewed_at",
    "q"."expires_at" AS "quote_expires_at",
    "q"."user_id",
    "up"."email" AS "user_email",
    "up"."display_name" AS "user_full_name",
    NULL::"text" AS "user_phone",
    "t"."id" AS "tier_id",
    "t"."slug" AS "tier_slug",
    "t"."name" AS "tier_name",
    "l"."id" AS "level_id",
    "l"."level_code",
    "l"."name" AS "level_name",
    "q"."base_price" AS "base_price_eur",
    "q"."services_price" AS "services_price_eur",
    "q"."discount_amount" AS "discount_amount_eur",
    "q"."tax_amount" AS "tax_amount_eur",
    "q"."total_price" AS "total_price_eur",
    "q"."selected_services",
    "array_length"(ARRAY( SELECT "jsonb_array_elements_text"("q"."selected_services") AS "jsonb_array_elements_text"), 1) AS "service_count",
    "q"."contact_preferences",
    ("q"."contact_preferences" ->> 'preferred_method'::"text") AS "preferred_contact_method",
    ("q"."contact_preferences" ->> 'preferred_time'::"text") AS "preferred_contact_time",
    "q"."notes" AS "customer_notes",
    "q"."admin_notes",
        CASE
            WHEN ("q"."status" = 'expired'::"text") THEN true
            WHEN ("q"."expires_at" < "now"()) THEN true
            ELSE false
        END AS "is_expired",
        CASE
            WHEN ("q"."status" = 'draft'::"text") THEN true
            ELSE false
        END AS "is_editable",
    EXTRACT(days FROM (COALESCE("q"."expires_at", ("now"() + '30 days'::interval)) - "now"())) AS "days_until_expiry"
   FROM ((("public"."user_quotes" "q"
     LEFT JOIN "public"."users_profile" "up" ON (("q"."user_id" = "up"."id")))
     LEFT JOIN "public"."pricing_tiers" "t" ON (("q"."tier_id" = "t"."id")))
     LEFT JOIN "public"."pricing_levels" "l" ON (("q"."level_id" = "l"."id")));


ALTER VIEW "public"."v_quote_details" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_quote_details" IS 'Comprehensive quote details with user, pricing, and status information';



CREATE OR REPLACE VIEW "public"."v_quote_lifecycle" WITH ("security_invoker"='true') AS
 WITH "quote_stages" AS (
         SELECT "q"."id" AS "quote_id",
            "q"."quote_number",
            "q"."created_at",
            "q"."submitted_at",
            "q"."reviewed_at",
            "qv_accepted"."created_at" AS "accepted_at",
            "qv_rejected"."created_at" AS "rejected_at",
            "q"."expires_at",
            "q"."status"
           FROM (("public"."user_quotes" "q"
             LEFT JOIN LATERAL ( SELECT "quote_versions"."created_at"
                   FROM "public"."quote_versions"
                  WHERE (("quote_versions"."quote_id" = "q"."id") AND (("quote_versions"."changes" ->> 'status'::"text") = 'accepted'::"text"))
                  ORDER BY "quote_versions"."created_at" DESC
                 LIMIT 1) "qv_accepted" ON (true))
             LEFT JOIN LATERAL ( SELECT "quote_versions"."created_at"
                   FROM "public"."quote_versions"
                  WHERE (("quote_versions"."quote_id" = "q"."id") AND (("quote_versions"."changes" ->> 'status'::"text") = 'rejected'::"text"))
                  ORDER BY "quote_versions"."created_at" DESC
                 LIMIT 1) "qv_rejected" ON (true))
        )
 SELECT "quote_id",
    "quote_number",
    "status",
    "created_at",
    "submitted_at",
    "reviewed_at",
    "accepted_at",
    "rejected_at",
    "expires_at",
    (EXTRACT(epoch FROM (COALESCE("submitted_at", "now"()) - "created_at")) / (3600)::numeric) AS "hours_in_draft",
    (EXTRACT(epoch FROM (COALESCE("reviewed_at", "now"()) - "submitted_at")) / (3600)::numeric) AS "hours_in_submitted",
    (EXTRACT(epoch FROM (COALESCE("accepted_at", "rejected_at", "now"()) - "reviewed_at")) / (3600)::numeric) AS "hours_in_review",
    (EXTRACT(epoch FROM (COALESCE("accepted_at", "rejected_at", "now"()) - "created_at")) / (3600)::numeric) AS "total_hours_to_decision",
    EXTRACT(days FROM ("now"() - "created_at")) AS "days_since_creation"
   FROM "quote_stages"
  ORDER BY "created_at" DESC;


ALTER VIEW "public"."v_quote_lifecycle" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_quote_lifecycle" IS 'Quote lifecycle tracking with time spent in each stage';



CREATE OR REPLACE VIEW "public"."v_quote_selected_services" WITH ("security_invoker"='true') AS
 SELECT "q"."id" AS "quote_id",
    "q"."quote_number",
    "q"."status" AS "quote_status",
    "s"."id" AS "service_id",
    "s"."slug" AS "service_slug",
    "s"."name" AS "service_name",
    "s"."category" AS "service_category",
    "s"."base_price" AS "service_price_eur",
    "s"."description" AS "service_description",
    "s"."features" AS "service_features"
   FROM (("public"."user_quotes" "q"
     CROSS JOIN LATERAL ( SELECT ("jsonb_array_elements_text"."value")::bigint AS "service_id"
           FROM "jsonb_array_elements_text"("q"."selected_services") "jsonb_array_elements_text"("value")) "service_ids")
     JOIN "public"."optional_services" "s" ON (("s"."id" = "service_ids"."service_id")))
  ORDER BY "q"."created_at" DESC, "s"."category", "s"."sort_order";


ALTER VIEW "public"."v_quote_selected_services" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_quote_selected_services" IS 'Breakdown of selected services for each quote';



CREATE OR REPLACE VIEW "public"."v_revenue_analysis" WITH ("security_invoker"='true') AS
 SELECT "date_trunc"('month'::"text", "q"."created_at") AS "month",
    "t"."slug" AS "tier_slug",
    "t"."name" AS "tier_name",
    "l"."level_code",
    "l"."name" AS "level_name",
    "count"(DISTINCT "q"."id") AS "total_quotes",
    "count"(DISTINCT
        CASE
            WHEN ("q"."status" = 'accepted'::"text") THEN "q"."id"
            ELSE NULL::bigint
        END) AS "accepted_quotes",
    "count"(DISTINCT
        CASE
            WHEN ("q"."status" = 'rejected'::"text") THEN "q"."id"
            ELSE NULL::bigint
        END) AS "rejected_quotes",
    "count"(DISTINCT
        CASE
            WHEN ("q"."status" = 'expired'::"text") THEN "q"."id"
            ELSE NULL::bigint
        END) AS "expired_quotes",
    "sum"(
        CASE
            WHEN ("q"."status" = 'accepted'::"text") THEN "q"."total_price"
            ELSE (0)::numeric
        END) AS "realized_revenue_eur",
    "sum"("q"."total_price") AS "potential_revenue_eur",
    "avg"("q"."total_price") AS "avg_quote_value_eur",
    "avg"("array_length"(ARRAY( SELECT "jsonb_array_elements_text"("q"."selected_services") AS "jsonb_array_elements_text"), 1)) AS "avg_services_per_quote",
    "sum"("q"."services_price") AS "total_services_revenue_eur",
    "sum"("q"."discount_amount") AS "total_discounts_given_eur",
    "avg"(
        CASE
            WHEN ("q"."discount_amount" > (0)::numeric) THEN "q"."discount_amount"
            ELSE NULL::numeric
        END) AS "avg_discount_when_used_eur",
    "round"(((100.0 * ("count"(DISTINCT
        CASE
            WHEN ("q"."status" = 'accepted'::"text") THEN "q"."id"
            ELSE NULL::bigint
        END))::numeric) / (NULLIF("count"(DISTINCT "q"."id"), 0))::numeric), 2) AS "acceptance_rate"
   FROM (("public"."user_quotes" "q"
     LEFT JOIN "public"."pricing_tiers" "t" ON (("q"."tier_id" = "t"."id")))
     LEFT JOIN "public"."pricing_levels" "l" ON (("q"."level_id" = "l"."id")))
  GROUP BY ("date_trunc"('month'::"text", "q"."created_at")), "t"."slug", "t"."name", "l"."level_code", "l"."name"
  ORDER BY ("date_trunc"('month'::"text", "q"."created_at")) DESC, "t"."slug", "l"."level_code";


ALTER VIEW "public"."v_revenue_analysis" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_revenue_analysis" IS 'Revenue analysis by tier, level, and time period';



CREATE OR REPLACE VIEW "public"."v_service_adoption_analysis" WITH ("security_invoker"='true') AS
 WITH "service_usage" AS (
         SELECT "s"."id" AS "service_id",
            "s"."slug" AS "service_slug",
            "s"."name" AS "service_name",
            "s"."category" AS "service_category",
            "s"."base_price" AS "service_price_eur",
            "count"(DISTINCT "q"."id") AS "times_selected",
            "count"(DISTINCT "q"."user_id") AS "unique_users",
            "count"(DISTINCT
                CASE
                    WHEN ("q"."status" = 'accepted'::"text") THEN "q"."id"
                    ELSE NULL::bigint
                END) AS "times_in_accepted_quotes"
           FROM ("public"."optional_services" "s"
             LEFT JOIN "public"."user_quotes" "q" ON (("q"."selected_services" ? ("s"."id")::"text")))
          GROUP BY "s"."id", "s"."slug", "s"."name", "s"."category", "s"."base_price"
        )
 SELECT "service_id",
    "service_slug",
    "service_name",
    "service_category",
    "service_price_eur",
    "times_selected",
    "unique_users",
    "times_in_accepted_quotes",
    "round"(((100.0 * ("times_selected")::numeric) / (NULLIF(( SELECT "count"(*) AS "count"
           FROM "public"."user_quotes"), 0))::numeric), 2) AS "selection_rate",
    "round"(((100.0 * ("times_in_accepted_quotes")::numeric) / (NULLIF("times_selected", 0))::numeric), 2) AS "acceptance_rate_when_selected",
    (("times_selected")::numeric * "service_price_eur") AS "potential_revenue_eur",
    (("times_in_accepted_quotes")::numeric * "service_price_eur") AS "realized_revenue_eur"
   FROM "service_usage"
  ORDER BY "times_selected" DESC;


ALTER VIEW "public"."v_service_adoption_analysis" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_service_adoption_analysis" IS 'Analysis of optional service adoption and revenue impact';



CREATE OR REPLACE VIEW "public"."v_service_availability_matrix" WITH ("security_invoker"='true') AS
 SELECT "s"."id" AS "service_id",
    "s"."slug" AS "service_slug",
    "s"."name" AS "service_name",
    "s"."category" AS "service_category",
    "s"."base_price" AS "service_price_eur",
    "s"."description" AS "service_description",
    "s"."features" AS "service_features",
    "t"."id" AS "tier_id",
    "t"."slug" AS "tier_slug",
    "t"."name" AS "tier_name",
    "l"."id" AS "level_id",
    "l"."level_code",
    "l"."name" AS "level_name",
        CASE
            WHEN ("s"."tier_restrictions" ? "t"."slug") THEN false
            WHEN ("s"."excluded_from_levels" ? ("l"."level_code")::"text") THEN false
            ELSE true
        END AS "is_available",
        CASE
            WHEN (("l"."level_code" = 'C'::"bpchar") AND ("s"."category" = ANY (ARRAY['advanced'::"text", 'premium'::"text"]))) THEN true
            WHEN (("l"."level_code" = 'B'::"bpchar") AND ("s"."category" = 'advanced'::"text")) THEN true
            ELSE false
        END AS "is_included_in_level",
        CASE
            WHEN (("l"."level_code" = 'C'::"bpchar") AND ("s"."category" = ANY (ARRAY['advanced'::"text", 'premium'::"text"]))) THEN (0)::numeric
            WHEN (("l"."level_code" = 'B'::"bpchar") AND ("s"."category" = 'advanced'::"text")) THEN (0)::numeric
            ELSE "s"."base_price"
        END AS "effective_price_eur"
   FROM (("public"."optional_services" "s"
     CROSS JOIN "public"."pricing_tiers" "t")
     CROSS JOIN "public"."pricing_levels" "l")
  WHERE (("t"."is_active" = true) AND ("l"."tier_id" = "t"."id") AND ("s"."is_active" = true))
  ORDER BY "t"."sort_order", "l"."sort_order", "s"."category", "s"."sort_order";


ALTER VIEW "public"."v_service_availability_matrix" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_service_availability_matrix" IS 'Matrix showing service availability and pricing for each tier/level combination';



CREATE OR REPLACE VIEW "public"."v_time_slot_availability" WITH ("security_invoker"='true') AS
 WITH "slot_bookings" AS (
         SELECT "ts"."id" AS "slot_id",
            "ts"."day_of_week",
            "ts"."start_time",
            "ts"."end_time",
            "ts"."slot_duration",
            "ts"."max_bookings",
            "count"(DISTINCT "bs"."id") AS "current_bookings",
            ("ts"."max_bookings" - "count"(DISTINCT "bs"."id")) AS "available_spots"
           FROM ("public"."time_slots" "ts"
             LEFT JOIN "public"."booked_slots" "bs" ON ((("bs"."time_slot_id" = "ts"."id") AND ("bs"."booking_date" >= CURRENT_DATE) AND ("bs"."booking_date" < (CURRENT_DATE + '7 days'::interval)) AND ("bs"."confirmed" = true))))
          WHERE ("ts"."is_available" = true)
          GROUP BY "ts"."id", "ts"."day_of_week", "ts"."start_time", "ts"."end_time", "ts"."slot_duration", "ts"."max_bookings"
        )
 SELECT "slot_id",
        CASE "day_of_week"
            WHEN 0 THEN 'Sunday'::"text"
            WHEN 1 THEN 'Monday'::"text"
            WHEN 2 THEN 'Tuesday'::"text"
            WHEN 3 THEN 'Wednesday'::"text"
            WHEN 4 THEN 'Thursday'::"text"
            WHEN 5 THEN 'Friday'::"text"
            WHEN 6 THEN 'Saturday'::"text"
            ELSE NULL::"text"
        END AS "day_name",
    "start_time",
    "end_time",
    "slot_duration" AS "duration_minutes",
    "max_bookings",
    "current_bookings",
    "available_spots",
    "round"(((100.0 * ("current_bookings")::numeric) / (NULLIF("max_bookings", 0))::numeric), 2) AS "utilization_rate"
   FROM "slot_bookings"
  ORDER BY "day_of_week", "start_time";


ALTER VIEW "public"."v_time_slot_availability" OWNER TO "postgres";


COMMENT ON VIEW "public"."v_time_slot_availability" IS 'Weekly time slot availability and utilization overview';



ALTER TABLE ONLY "public"."admin_audit_log"
    ADD CONSTRAINT "admin_audit_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."applied_discounts"
    ADD CONSTRAINT "applied_discounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."booked_slots"
    ADD CONSTRAINT "booked_slots_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contact_preferences"
    ADD CONSTRAINT "contact_preferences_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."discounts"
    ADD CONSTRAINT "discounts_code_key" UNIQUE ("code");



ALTER TABLE ONLY "public"."discounts"
    ADD CONSTRAINT "discounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."optional_services"
    ADD CONSTRAINT "optional_services_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."optional_services"
    ADD CONSTRAINT "optional_services_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."persona_matcher_responses"
    ADD CONSTRAINT "persona_matcher_responses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pricing_config"
    ADD CONSTRAINT "pricing_config_config_key_key" UNIQUE ("config_key");



ALTER TABLE ONLY "public"."pricing_config"
    ADD CONSTRAINT "pricing_config_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pricing_journey_events"
    ADD CONSTRAINT "pricing_journey_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pricing_levels"
    ADD CONSTRAINT "pricing_levels_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pricing_tiers"
    ADD CONSTRAINT "pricing_tiers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."pricing_tiers"
    ADD CONSTRAINT "pricing_tiers_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."quote_versions"
    ADD CONSTRAINT "quote_versions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."time_slots"
    ADD CONSTRAINT "time_slots_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."booked_slots"
    ADD CONSTRAINT "unique_booking" UNIQUE ("time_slot_id", "booking_date", "quote_id");



ALTER TABLE ONLY "public"."applied_discounts"
    ADD CONSTRAINT "unique_quote_discount" UNIQUE ("quote_id");



ALTER TABLE ONLY "public"."quote_versions"
    ADD CONSTRAINT "unique_quote_version" UNIQUE ("quote_id", "version_number");



ALTER TABLE ONLY "public"."pricing_levels"
    ADD CONSTRAINT "unique_tier_level" UNIQUE ("tier_id", "level_code");



ALTER TABLE ONLY "public"."time_slots"
    ADD CONSTRAINT "unique_time_slot" UNIQUE ("day_of_week", "start_time", "slot_type");



ALTER TABLE ONLY "public"."contact_preferences"
    ADD CONSTRAINT "unique_user_quote_preference" UNIQUE ("user_id", "quote_id");



ALTER TABLE ONLY "public"."user_quotes"
    ADD CONSTRAINT "user_quotes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_quotes"
    ADD CONSTRAINT "user_quotes_quote_number_key" UNIQUE ("quote_number");



ALTER TABLE ONLY "public"."user_quotes"
    ADD CONSTRAINT "user_quotes_quote_sequence_key" UNIQUE ("quote_sequence");



ALTER TABLE ONLY "public"."users_profile"
    ADD CONSTRAINT "users_profile_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users_profile"
    ADD CONSTRAINT "users_profile_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_admin_audit_log_admin_id" ON "public"."admin_audit_log" USING "btree" ("admin_id");



CREATE INDEX "idx_applied_discounts_discount_id" ON "public"."applied_discounts" USING "btree" ("discount_id");



CREATE INDEX "idx_applied_discounts_quote_id" ON "public"."applied_discounts" USING "btree" ("quote_id");



CREATE INDEX "idx_booked_slots_confirmed" ON "public"."booked_slots" USING "btree" ("confirmed");



CREATE INDEX "idx_booked_slots_date" ON "public"."booked_slots" USING "btree" ("booking_date");



CREATE INDEX "idx_booked_slots_quote" ON "public"."booked_slots" USING "btree" ("quote_id");



CREATE INDEX "idx_booked_slots_slot" ON "public"."booked_slots" USING "btree" ("time_slot_id");



CREATE INDEX "idx_contact_preferences_quote_id" ON "public"."contact_preferences" USING "btree" ("quote_id");



CREATE INDEX "idx_contact_preferences_time_slot" ON "public"."contact_preferences" USING "btree" ("preferred_time_slot_id");



CREATE INDEX "idx_contact_preferences_user_id" ON "public"."contact_preferences" USING "btree" ("user_id");



CREATE INDEX "idx_discounts_active" ON "public"."discounts" USING "btree" ("is_active");



CREATE INDEX "idx_discounts_code" ON "public"."discounts" USING "btree" ("code");



CREATE INDEX "idx_discounts_dates" ON "public"."discounts" USING "btree" ("starts_at", "expires_at");



CREATE INDEX "idx_discounts_user_id" ON "public"."discounts" USING "btree" ("user_id");



CREATE INDEX "idx_optional_services_active" ON "public"."optional_services" USING "btree" ("is_active");



CREATE INDEX "idx_optional_services_category" ON "public"."optional_services" USING "btree" ("category");



CREATE INDEX "idx_persona_matcher_session" ON "public"."persona_matcher_responses" USING "btree" ("session_id");



CREATE INDEX "idx_persona_matcher_user" ON "public"."persona_matcher_responses" USING "btree" ("user_id");



CREATE INDEX "idx_pricing_config_key" ON "public"."pricing_config" USING "btree" ("config_key");



CREATE INDEX "idx_pricing_journey_created" ON "public"."pricing_journey_events" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_pricing_journey_session" ON "public"."pricing_journey_events" USING "btree" ("session_id");



CREATE INDEX "idx_pricing_journey_user" ON "public"."pricing_journey_events" USING "btree" ("user_id");



CREATE INDEX "idx_pricing_levels_active" ON "public"."pricing_levels" USING "btree" ("is_active");



CREATE INDEX "idx_pricing_levels_tier_id" ON "public"."pricing_levels" USING "btree" ("tier_id");



CREATE INDEX "idx_pricing_tiers_active" ON "public"."pricing_tiers" USING "btree" ("is_active");



CREATE INDEX "idx_pricing_tiers_slug" ON "public"."pricing_tiers" USING "btree" ("slug");



CREATE INDEX "idx_quote_versions_changed_by" ON "public"."quote_versions" USING "btree" ("changed_by");



CREATE INDEX "idx_quote_versions_quote_id" ON "public"."quote_versions" USING "btree" ("quote_id");



CREATE INDEX "idx_time_slots_available" ON "public"."time_slots" USING "btree" ("is_available");



CREATE INDEX "idx_time_slots_day_type" ON "public"."time_slots" USING "btree" ("day_of_week", "slot_type");



CREATE INDEX "idx_user_quotes_created_at" ON "public"."user_quotes" USING "btree" ("created_at" DESC);



CREATE INDEX "idx_user_quotes_expires_at" ON "public"."user_quotes" USING "btree" ("expires_at");



CREATE INDEX "idx_user_quotes_level_id" ON "public"."user_quotes" USING "btree" ("level_id");



CREATE INDEX "idx_user_quotes_status" ON "public"."user_quotes" USING "btree" ("status");



CREATE INDEX "idx_user_quotes_tier_id" ON "public"."user_quotes" USING "btree" ("tier_id");



CREATE INDEX "idx_user_quotes_user_id" ON "public"."user_quotes" USING "btree" ("user_id");



CREATE INDEX "idx_users_profile_email" ON "public"."users_profile" USING "btree" ("email");



CREATE INDEX "idx_users_profile_user_id" ON "public"."users_profile" USING "btree" ("id");



CREATE OR REPLACE TRIGGER "audit_discounts_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."discounts" FOR EACH ROW EXECUTE FUNCTION "public"."audit_admin_changes"();



CREATE OR REPLACE TRIGGER "audit_optional_services_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."optional_services" FOR EACH ROW EXECUTE FUNCTION "public"."audit_admin_changes"();



CREATE OR REPLACE TRIGGER "audit_pricing_levels_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."pricing_levels" FOR EACH ROW EXECUTE FUNCTION "public"."audit_admin_changes"();



CREATE OR REPLACE TRIGGER "audit_pricing_tiers_changes" AFTER INSERT OR DELETE OR UPDATE ON "public"."pricing_tiers" FOR EACH ROW EXECUTE FUNCTION "public"."audit_admin_changes"();



CREATE OR REPLACE TRIGGER "audit_user_quotes_admin_changes" AFTER UPDATE ON "public"."user_quotes" FOR EACH ROW WHEN ((("old"."status" IS DISTINCT FROM "new"."status") OR ("old"."admin_notes" IS DISTINCT FROM "new"."admin_notes"))) EXECUTE FUNCTION "public"."audit_admin_changes"();



CREATE OR REPLACE TRIGGER "auto_generate_quote_number" BEFORE INSERT ON "public"."user_quotes" FOR EACH ROW EXECUTE FUNCTION "public"."set_quote_number"();



CREATE OR REPLACE TRIGGER "increment_discount_usage_trigger" AFTER INSERT ON "public"."applied_discounts" FOR EACH ROW EXECUTE FUNCTION "public"."increment_discount_usage"();



CREATE OR REPLACE TRIGGER "track_quote_changes" AFTER UPDATE ON "public"."user_quotes" FOR EACH ROW EXECUTE FUNCTION "public"."track_quote_version"();



CREATE OR REPLACE TRIGGER "update_contact_preferences_updated_at" BEFORE UPDATE ON "public"."contact_preferences" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_discounts_updated_at" BEFORE UPDATE ON "public"."discounts" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_optional_services_updated_at" BEFORE UPDATE ON "public"."optional_services" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_pricing_config_updated_at" BEFORE UPDATE ON "public"."pricing_config" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_pricing_levels_updated_at" BEFORE UPDATE ON "public"."pricing_levels" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_pricing_tiers_updated_at" BEFORE UPDATE ON "public"."pricing_tiers" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_time_slots_updated_at" BEFORE UPDATE ON "public"."time_slots" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE OR REPLACE TRIGGER "update_user_quotes_updated_at" BEFORE UPDATE ON "public"."user_quotes" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



ALTER TABLE ONLY "public"."admin_audit_log"
    ADD CONSTRAINT "admin_audit_log_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."applied_discounts"
    ADD CONSTRAINT "applied_discounts_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "public"."discounts"("id");



ALTER TABLE ONLY "public"."applied_discounts"
    ADD CONSTRAINT "applied_discounts_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "public"."user_quotes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."booked_slots"
    ADD CONSTRAINT "booked_slots_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "public"."user_quotes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."booked_slots"
    ADD CONSTRAINT "booked_slots_time_slot_id_fkey" FOREIGN KEY ("time_slot_id") REFERENCES "public"."time_slots"("id");



ALTER TABLE ONLY "public"."contact_preferences"
    ADD CONSTRAINT "contact_preferences_preferred_time_slot_id_fkey" FOREIGN KEY ("preferred_time_slot_id") REFERENCES "public"."time_slots"("id");



ALTER TABLE ONLY "public"."contact_preferences"
    ADD CONSTRAINT "contact_preferences_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "public"."user_quotes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."contact_preferences"
    ADD CONSTRAINT "contact_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."discounts"
    ADD CONSTRAINT "discounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."persona_matcher_responses"
    ADD CONSTRAINT "persona_matcher_responses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."pricing_journey_events"
    ADD CONSTRAINT "pricing_journey_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."pricing_levels"
    ADD CONSTRAINT "pricing_levels_tier_id_fkey" FOREIGN KEY ("tier_id") REFERENCES "public"."pricing_tiers"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quote_versions"
    ADD CONSTRAINT "quote_versions_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."quote_versions"
    ADD CONSTRAINT "quote_versions_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "public"."user_quotes"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_quotes"
    ADD CONSTRAINT "user_quotes_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "public"."pricing_levels"("id");



ALTER TABLE ONLY "public"."user_quotes"
    ADD CONSTRAINT "user_quotes_tier_id_fkey" FOREIGN KEY ("tier_id") REFERENCES "public"."pricing_tiers"("id");



ALTER TABLE ONLY "public"."user_quotes"
    ADD CONSTRAINT "user_quotes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."users_profile"
    ADD CONSTRAINT "users_profile_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Admin can delete any quote" ON "public"."user_quotes" FOR DELETE TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "Admin can update any quote" ON "public"."user_quotes" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can delete time slots" ON "public"."time_slots" FOR DELETE TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "Admins can insert config" ON "public"."pricing_config" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert discounts" ON "public"."discounts" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert levels" ON "public"."pricing_levels" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert services" ON "public"."optional_services" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert tiers" ON "public"."pricing_tiers" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can insert time slots" ON "public"."time_slots" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can update config" ON "public"."pricing_config" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can update discounts" ON "public"."discounts" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can update levels" ON "public"."pricing_levels" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can update services" ON "public"."optional_services" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can update tiers" ON "public"."pricing_tiers" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can update time slots" ON "public"."time_slots" FOR UPDATE TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());



CREATE POLICY "Admins can view audit logs" ON "public"."admin_audit_log" FOR SELECT TO "authenticated" USING ("public"."is_admin"());



CREATE POLICY "Authenticated users can view discounts" ON "public"."discounts" FOR SELECT TO "authenticated" USING (("public"."is_admin"() OR (("is_active" = true) AND (("user_specific" = false) OR ("user_id" = ( SELECT "auth"."uid"() AS "uid"))) AND ("starts_at" <= "now"()) AND (("expires_at" IS NULL) OR ("expires_at" > "now"())))));



CREATE POLICY "Public can save persona responses" ON "public"."persona_matcher_responses" FOR INSERT TO "authenticated", "anon" WITH CHECK (true);



CREATE POLICY "Public can track journey events" ON "public"."pricing_journey_events" FOR INSERT TO "authenticated", "anon" WITH CHECK (true);



CREATE POLICY "Public can view active config" ON "public"."pricing_config" FOR SELECT TO "authenticated", "anon" USING (("is_active" = true));



CREATE POLICY "Public can view active discounts" ON "public"."discounts" FOR SELECT TO "anon" USING ((("is_active" = true) AND ("user_specific" = false) AND ("starts_at" <= "now"()) AND (("expires_at" IS NULL) OR ("expires_at" > "now"()))));



CREATE POLICY "Public can view active levels" ON "public"."pricing_levels" FOR SELECT TO "authenticated", "anon" USING (("is_active" = true));



CREATE POLICY "Public can view active services" ON "public"."optional_services" FOR SELECT TO "authenticated", "anon" USING (("is_active" = true));



CREATE POLICY "Public can view active tiers" ON "public"."pricing_tiers" FOR SELECT TO "authenticated", "anon" USING (("is_active" = true));



CREATE POLICY "Public can view available time slots" ON "public"."time_slots" FOR SELECT TO "authenticated", "anon" USING (("is_available" = true));



CREATE POLICY "Super admins can delete config" ON "public"."pricing_config" FOR DELETE TO "authenticated" USING ("public"."is_super_admin"());



CREATE POLICY "Super admins can delete discounts" ON "public"."discounts" FOR DELETE TO "authenticated" USING ("public"."is_super_admin"());



CREATE POLICY "Super admins can delete levels" ON "public"."pricing_levels" FOR DELETE TO "authenticated" USING ("public"."is_super_admin"());



CREATE POLICY "Super admins can delete services" ON "public"."optional_services" FOR DELETE TO "authenticated" USING ("public"."is_super_admin"());



CREATE POLICY "Super admins can delete tiers" ON "public"."pricing_tiers" FOR DELETE TO "authenticated" USING ("public"."is_super_admin"());



CREATE POLICY "Users and admins can delete bookings" ON "public"."booked_slots" FOR DELETE TO "authenticated" USING (((("confirmed" = false) AND (EXISTS ( SELECT 1
   FROM "public"."user_quotes" "q"
  WHERE (("q"."id" = "booked_slots"."quote_id") AND ("q"."user_id" = ( SELECT "auth"."uid"() AS "uid")))))) OR "public"."is_admin"()));



CREATE POLICY "Users and admins can update bookings" ON "public"."booked_slots" FOR UPDATE TO "authenticated" USING (((("confirmed" = false) AND (EXISTS ( SELECT 1
   FROM "public"."user_quotes" "q"
  WHERE (("q"."id" = "booked_slots"."quote_id") AND ("q"."user_id" = ( SELECT "auth"."uid"() AS "uid")))))) OR "public"."is_admin"())) WITH CHECK (((EXISTS ( SELECT 1
   FROM "public"."user_quotes" "q"
  WHERE (("q"."id" = "booked_slots"."quote_id") AND ("q"."user_id" = ( SELECT "auth"."uid"() AS "uid"))))) OR "public"."is_admin"()));



CREATE POLICY "Users and admins can view booked slots" ON "public"."booked_slots" FOR SELECT TO "authenticated" USING (((EXISTS ( SELECT 1
   FROM "public"."user_quotes" "q"
  WHERE (("q"."id" = "booked_slots"."quote_id") AND ("q"."user_id" = ( SELECT "auth"."uid"() AS "uid"))))) OR "public"."is_admin"()));



CREATE POLICY "Users and admins can view journey events" ON "public"."pricing_journey_events" FOR SELECT TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "user_id") OR ("user_id" IS NULL) OR "public"."is_admin"()));



CREATE POLICY "Users and admins can view persona responses" ON "public"."persona_matcher_responses" FOR SELECT TO "authenticated" USING (((( SELECT "auth"."uid"() AS "uid") = "user_id") OR ("user_id" IS NULL) OR "public"."is_admin"()));



CREATE POLICY "Users can book slots for their quotes" ON "public"."booked_slots" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_quotes" "q"
  WHERE (("q"."id" = "booked_slots"."quote_id") AND ("q"."user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("q"."status" = 'draft'::"text")))));



CREATE POLICY "Users can create contact preferences" ON "public"."contact_preferences" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Users can insert their own quotes" ON "public"."user_quotes" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can insert versions for their quotes" ON "public"."quote_versions" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."user_quotes"
  WHERE (("user_quotes"."id" = "quote_versions"."quote_id") AND ("user_quotes"."user_id" = ( SELECT "auth"."uid"() AS "uid"))))));



CREATE POLICY "Users can submit their draft quotes" ON "public"."user_quotes" FOR UPDATE TO "authenticated" USING ((("auth"."uid"() = "user_id") AND ("status" = 'draft'::"text"))) WITH CHECK ((("auth"."uid"() = "user_id") AND ("status" = 'submitted'::"text")));



CREATE POLICY "Users can update their contact preferences" ON "public"."contact_preferences" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Users can update their draft quotes fields" ON "public"."user_quotes" FOR UPDATE TO "authenticated" USING ((("auth"."uid"() = "user_id") AND ("status" = 'draft'::"text"))) WITH CHECK ((("auth"."uid"() = "user_id") AND ("status" = 'draft'::"text")));



CREATE POLICY "Users can update their own profile" ON "public"."users_profile" FOR UPDATE TO "authenticated" USING (("id" = ( SELECT "auth"."uid"() AS "uid"))) WITH CHECK (("id" = ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "Users can view own applied discounts" ON "public"."applied_discounts" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."user_quotes" "q"
  WHERE (("q"."id" = "applied_discounts"."quote_id") AND ("q"."user_id" = ( SELECT "auth"."uid"() AS "uid"))))));



CREATE POLICY "Users can view profiles" ON "public"."users_profile" FOR SELECT TO "authenticated" USING ((("id" = ( SELECT "auth"."uid"() AS "uid")) OR "public"."is_admin"()));



CREATE POLICY "Users can view their contact preferences" ON "public"."contact_preferences" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Users can view their own quotes" ON "public"."user_quotes" FOR SELECT TO "authenticated" USING (("public"."is_admin"() OR ("auth"."uid"() = "user_id")));



CREATE POLICY "Users can view versions of their quotes" ON "public"."quote_versions" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."user_quotes"
  WHERE (("user_quotes"."id" = "quote_versions"."quote_id") AND ("user_quotes"."user_id" = ( SELECT "auth"."uid"() AS "uid"))))));



ALTER TABLE "public"."admin_audit_log" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."applied_discounts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."booked_slots" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."contact_preferences" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."discounts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."optional_services" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."persona_matcher_responses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."pricing_config" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."pricing_journey_events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."pricing_levels" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."pricing_tiers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."quote_versions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."time_slots" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_quotes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users_profile" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































REVOKE ALL ON FUNCTION "public"."apply_discount_to_quote"("p_quote_id" bigint, "p_discount_code" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."apply_discount_to_quote"("p_quote_id" bigint, "p_discount_code" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."apply_discount_to_quote"("p_quote_id" bigint, "p_discount_code" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."assign_admin_role"("p_user_id" "uuid", "p_role" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."assign_admin_role"("p_user_id" "uuid", "p_role" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."assign_admin_role"("p_user_id" "uuid", "p_role" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."audit_admin_changes"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."audit_admin_changes"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."audit_admin_changes"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."book_time_slot"("p_slot_id" bigint, "p_date" "date", "p_quote_id" bigint) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."book_time_slot"("p_slot_id" bigint, "p_date" "date", "p_quote_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."book_time_slot"("p_slot_id" bigint, "p_date" "date", "p_quote_id" bigint) TO "service_role";



GRANT ALL ON FUNCTION "public"."calculate_discount_amount"("p_discount_type" "text", "p_discount_value" numeric, "p_base_amount" numeric) TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_discount_amount"("p_discount_type" "text", "p_discount_value" numeric, "p_base_amount" numeric) TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_discount_amount"("p_discount_type" "text", "p_discount_value" numeric, "p_base_amount" numeric) TO "service_role";



GRANT ALL ON FUNCTION "public"."calculate_quote_total"("p_base_price" numeric, "p_services_price" numeric, "p_discount_amount" numeric, "p_tax_rate" numeric) TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_quote_total"("p_base_price" numeric, "p_services_price" numeric, "p_discount_amount" numeric, "p_tax_rate" numeric) TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_quote_total"("p_base_price" numeric, "p_services_price" numeric, "p_discount_amount" numeric, "p_tax_rate" numeric) TO "service_role";



REVOKE ALL ON FUNCTION "public"."calculate_quote_totals"("p_level_id" bigint, "p_service_ids" "jsonb", "p_discount_amount" numeric) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."calculate_quote_totals"("p_level_id" bigint, "p_service_ids" "jsonb", "p_discount_amount" numeric) TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_quote_totals"("p_level_id" bigint, "p_service_ids" "jsonb", "p_discount_amount" numeric) TO "service_role";



GRANT ALL ON FUNCTION "public"."cleanup_test_data"() TO "anon";
GRANT ALL ON FUNCTION "public"."cleanup_test_data"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."cleanup_test_data"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."expire_old_quotes"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."expire_old_quotes"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."expire_old_quotes"() TO "service_role";



GRANT ALL ON FUNCTION "public"."generate_sample_quotes"("p_count" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."generate_sample_quotes"("p_count" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_sample_quotes"("p_count" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_available_time_slots"("p_date" "date", "p_slot_type" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_available_time_slots"("p_date" "date", "p_slot_type" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_available_time_slots"("p_date" "date", "p_slot_type" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."get_user_journey_summary"("p_session_id" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."get_user_journey_summary"("p_session_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_journey_summary"("p_session_id" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."increment_discount_usage"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."increment_discount_usage"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_discount_usage"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."is_admin"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."is_quote_editable"("p_quote_id" bigint) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."is_quote_editable"("p_quote_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_quote_editable"("p_quote_id" bigint) TO "service_role";



GRANT ALL ON FUNCTION "public"."is_slot_available"("p_slot_id" bigint, "p_date" "date") TO "anon";
GRANT ALL ON FUNCTION "public"."is_slot_available"("p_slot_id" bigint, "p_date" "date") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_slot_available"("p_slot_id" bigint, "p_date" "date") TO "service_role";



REVOKE ALL ON FUNCTION "public"."is_super_admin"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."is_super_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_super_admin"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."set_quote_number"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."set_quote_number"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_quote_number"() TO "service_role";



GRANT ALL ON FUNCTION "public"."track_analytics_event"("p_session_id" "text", "p_event_type" "text", "p_event_data" "jsonb", "p_page_path" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."track_analytics_event"("p_session_id" "text", "p_event_type" "text", "p_event_data" "jsonb", "p_page_path" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."track_analytics_event"("p_session_id" "text", "p_event_type" "text", "p_event_data" "jsonb", "p_page_path" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."track_pricing_event"("p_user_id" "uuid", "p_session_id" "text", "p_event_type" "text", "p_event_data" "jsonb", "p_step_number" integer, "p_time_spent" integer, "p_quote_id" bigint) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."track_pricing_event"("p_user_id" "uuid", "p_session_id" "text", "p_event_type" "text", "p_event_data" "jsonb", "p_step_number" integer, "p_time_spent" integer, "p_quote_id" bigint) TO "authenticated";
GRANT ALL ON FUNCTION "public"."track_pricing_event"("p_user_id" "uuid", "p_session_id" "text", "p_event_type" "text", "p_event_data" "jsonb", "p_step_number" integer, "p_time_spent" integer, "p_quote_id" bigint) TO "service_role";



REVOKE ALL ON FUNCTION "public"."track_quote_version"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."track_quote_version"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."track_quote_version"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."update_updated_at_column"() FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";



GRANT ALL ON FUNCTION "public"."validate_discount"("p_code" "text", "p_quote_id" bigint, "p_tier_id" bigint, "p_purchase_amount" numeric) TO "anon";
GRANT ALL ON FUNCTION "public"."validate_discount"("p_code" "text", "p_quote_id" bigint, "p_tier_id" bigint, "p_purchase_amount" numeric) TO "authenticated";
GRANT ALL ON FUNCTION "public"."validate_discount"("p_code" "text", "p_quote_id" bigint, "p_tier_id" bigint, "p_purchase_amount" numeric) TO "service_role";


















GRANT ALL ON TABLE "public"."discounts" TO "anon";
GRANT ALL ON TABLE "public"."discounts" TO "authenticated";
GRANT ALL ON TABLE "public"."discounts" TO "service_role";



GRANT ALL ON TABLE "public"."active_discounts_view" TO "anon";
GRANT ALL ON TABLE "public"."active_discounts_view" TO "authenticated";
GRANT ALL ON TABLE "public"."active_discounts_view" TO "service_role";



GRANT ALL ON TABLE "public"."admin_audit_log" TO "anon";
GRANT ALL ON TABLE "public"."admin_audit_log" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_audit_log" TO "service_role";



GRANT ALL ON SEQUENCE "public"."admin_audit_log_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."admin_audit_log_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."admin_audit_log_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."applied_discounts" TO "anon";
GRANT ALL ON TABLE "public"."applied_discounts" TO "authenticated";
GRANT ALL ON TABLE "public"."applied_discounts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."applied_discounts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."applied_discounts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."applied_discounts_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."booked_slots" TO "anon";
GRANT ALL ON TABLE "public"."booked_slots" TO "authenticated";
GRANT ALL ON TABLE "public"."booked_slots" TO "service_role";



GRANT ALL ON SEQUENCE "public"."booked_slots_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."booked_slots_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."booked_slots_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."optional_services" TO "anon";
GRANT ALL ON TABLE "public"."optional_services" TO "authenticated";
GRANT ALL ON TABLE "public"."optional_services" TO "service_role";



GRANT ALL ON TABLE "public"."pricing_levels" TO "anon";
GRANT ALL ON TABLE "public"."pricing_levels" TO "authenticated";
GRANT ALL ON TABLE "public"."pricing_levels" TO "service_role";



GRANT ALL ON TABLE "public"."pricing_tiers" TO "anon";
GRANT ALL ON TABLE "public"."pricing_tiers" TO "authenticated";
GRANT ALL ON TABLE "public"."pricing_tiers" TO "service_role";



GRANT ALL ON TABLE "public"."complete_pricing_view" TO "anon";
GRANT ALL ON TABLE "public"."complete_pricing_view" TO "authenticated";
GRANT ALL ON TABLE "public"."complete_pricing_view" TO "service_role";



GRANT ALL ON TABLE "public"."contact_preferences" TO "anon";
GRANT ALL ON TABLE "public"."contact_preferences" TO "authenticated";
GRANT ALL ON TABLE "public"."contact_preferences" TO "service_role";



GRANT ALL ON SEQUENCE "public"."contact_preferences_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."contact_preferences_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."contact_preferences_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."discounts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."discounts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."discounts_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."optional_services_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."optional_services_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."optional_services_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."persona_matcher_responses" TO "anon";
GRANT ALL ON TABLE "public"."persona_matcher_responses" TO "authenticated";
GRANT ALL ON TABLE "public"."persona_matcher_responses" TO "service_role";



GRANT ALL ON TABLE "public"."persona_insights_view" TO "anon";
GRANT ALL ON TABLE "public"."persona_insights_view" TO "authenticated";
GRANT ALL ON TABLE "public"."persona_insights_view" TO "service_role";



GRANT ALL ON TABLE "public"."persona_matcher_analytics" TO "anon";
GRANT ALL ON TABLE "public"."persona_matcher_analytics" TO "authenticated";
GRANT ALL ON TABLE "public"."persona_matcher_analytics" TO "service_role";



GRANT ALL ON SEQUENCE "public"."persona_matcher_responses_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."persona_matcher_responses_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."persona_matcher_responses_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."pricing_config" TO "anon";
GRANT ALL ON TABLE "public"."pricing_config" TO "authenticated";
GRANT ALL ON TABLE "public"."pricing_config" TO "service_role";



GRANT ALL ON SEQUENCE "public"."pricing_config_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."pricing_config_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."pricing_config_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."pricing_journey_events" TO "anon";
GRANT ALL ON TABLE "public"."pricing_journey_events" TO "authenticated";
GRANT ALL ON TABLE "public"."pricing_journey_events" TO "service_role";



GRANT ALL ON TABLE "public"."pricing_funnel_analytics" TO "anon";
GRANT ALL ON TABLE "public"."pricing_funnel_analytics" TO "authenticated";
GRANT ALL ON TABLE "public"."pricing_funnel_analytics" TO "service_role";



GRANT ALL ON SEQUENCE "public"."pricing_journey_events_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."pricing_journey_events_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."pricing_journey_events_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."pricing_levels_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."pricing_levels_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."pricing_levels_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."pricing_tiers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."pricing_tiers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."pricing_tiers_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."user_quotes" TO "anon";
GRANT ALL ON TABLE "public"."user_quotes" TO "authenticated";
GRANT ALL ON TABLE "public"."user_quotes" TO "service_role";



GRANT ALL ON TABLE "public"."quote_analytics_summary" TO "anon";
GRANT ALL ON TABLE "public"."quote_analytics_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."quote_analytics_summary" TO "service_role";



GRANT ALL ON TABLE "public"."quote_statistics_view" TO "anon";
GRANT ALL ON TABLE "public"."quote_statistics_view" TO "authenticated";
GRANT ALL ON TABLE "public"."quote_statistics_view" TO "service_role";



GRANT ALL ON TABLE "public"."quote_status_analytics" TO "anon";
GRANT ALL ON TABLE "public"."quote_status_analytics" TO "authenticated";
GRANT ALL ON TABLE "public"."quote_status_analytics" TO "service_role";



GRANT ALL ON TABLE "public"."quote_versions" TO "anon";
GRANT ALL ON TABLE "public"."quote_versions" TO "authenticated";
GRANT ALL ON TABLE "public"."quote_versions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."quote_versions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."quote_versions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."quote_versions_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."service_categories_view" TO "anon";
GRANT ALL ON TABLE "public"."service_categories_view" TO "authenticated";
GRANT ALL ON TABLE "public"."service_categories_view" TO "service_role";



GRANT ALL ON TABLE "public"."service_popularity_view" TO "anon";
GRANT ALL ON TABLE "public"."service_popularity_view" TO "authenticated";
GRANT ALL ON TABLE "public"."service_popularity_view" TO "service_role";



GRANT ALL ON TABLE "public"."tier_comparison_view" TO "anon";
GRANT ALL ON TABLE "public"."tier_comparison_view" TO "authenticated";
GRANT ALL ON TABLE "public"."tier_comparison_view" TO "service_role";



GRANT ALL ON TABLE "public"."tier_performance_view" TO "anon";
GRANT ALL ON TABLE "public"."tier_performance_view" TO "authenticated";
GRANT ALL ON TABLE "public"."tier_performance_view" TO "service_role";



GRANT ALL ON TABLE "public"."time_slots" TO "anon";
GRANT ALL ON TABLE "public"."time_slots" TO "authenticated";
GRANT ALL ON TABLE "public"."time_slots" TO "service_role";



GRANT ALL ON TABLE "public"."time_slot_availability_view" TO "anon";
GRANT ALL ON TABLE "public"."time_slot_availability_view" TO "authenticated";
GRANT ALL ON TABLE "public"."time_slot_availability_view" TO "service_role";



GRANT ALL ON SEQUENCE "public"."time_slots_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."time_slots_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."time_slots_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."user_journey_funnel_view" TO "anon";
GRANT ALL ON TABLE "public"."user_journey_funnel_view" TO "authenticated";
GRANT ALL ON TABLE "public"."user_journey_funnel_view" TO "service_role";



GRANT ALL ON SEQUENCE "public"."user_quotes_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_quotes_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_quotes_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."user_quotes_quote_sequence_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_quotes_quote_sequence_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_quotes_quote_sequence_seq" TO "service_role";



GRANT ALL ON TABLE "public"."users_profile" TO "anon";
GRANT ALL ON TABLE "public"."users_profile" TO "authenticated";
GRANT ALL ON TABLE "public"."users_profile" TO "service_role";



GRANT UPDATE("display_name") ON TABLE "public"."users_profile" TO "authenticated";



GRANT UPDATE("avatar_url") ON TABLE "public"."users_profile" TO "authenticated";



GRANT UPDATE("updated_at") ON TABLE "public"."users_profile" TO "authenticated";



GRANT ALL ON TABLE "public"."v_admin_quote_overview" TO "anon";
GRANT ALL ON TABLE "public"."v_admin_quote_overview" TO "authenticated";
GRANT ALL ON TABLE "public"."v_admin_quote_overview" TO "service_role";



GRANT ALL ON TABLE "public"."v_admin_quote_review_queue" TO "anon";
GRANT ALL ON TABLE "public"."v_admin_quote_review_queue" TO "authenticated";
GRANT ALL ON TABLE "public"."v_admin_quote_review_queue" TO "service_role";



GRANT ALL ON TABLE "public"."v_contact_outreach_list" TO "anon";
GRANT ALL ON TABLE "public"."v_contact_outreach_list" TO "authenticated";
GRANT ALL ON TABLE "public"."v_contact_outreach_list" TO "service_role";



GRANT ALL ON TABLE "public"."v_executive_dashboard" TO "anon";
GRANT ALL ON TABLE "public"."v_executive_dashboard" TO "authenticated";
GRANT ALL ON TABLE "public"."v_executive_dashboard" TO "service_role";



GRANT ALL ON TABLE "public"."v_persona_matcher_analysis" TO "anon";
GRANT ALL ON TABLE "public"."v_persona_matcher_analysis" TO "authenticated";
GRANT ALL ON TABLE "public"."v_persona_matcher_analysis" TO "service_role";



GRANT ALL ON TABLE "public"."v_pricing_catalog" TO "anon";
GRANT ALL ON TABLE "public"."v_pricing_catalog" TO "authenticated";
GRANT ALL ON TABLE "public"."v_pricing_catalog" TO "service_role";



GRANT ALL ON TABLE "public"."v_pricing_funnel_analysis" TO "anon";
GRANT ALL ON TABLE "public"."v_pricing_funnel_analysis" TO "authenticated";
GRANT ALL ON TABLE "public"."v_pricing_funnel_analysis" TO "service_role";



GRANT ALL ON TABLE "public"."v_pricing_system_summary" TO "anon";
GRANT ALL ON TABLE "public"."v_pricing_system_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."v_pricing_system_summary" TO "service_role";



GRANT ALL ON TABLE "public"."v_quote_details" TO "anon";
GRANT ALL ON TABLE "public"."v_quote_details" TO "authenticated";
GRANT ALL ON TABLE "public"."v_quote_details" TO "service_role";



GRANT ALL ON TABLE "public"."v_quote_lifecycle" TO "anon";
GRANT ALL ON TABLE "public"."v_quote_lifecycle" TO "authenticated";
GRANT ALL ON TABLE "public"."v_quote_lifecycle" TO "service_role";



GRANT ALL ON TABLE "public"."v_quote_selected_services" TO "anon";
GRANT ALL ON TABLE "public"."v_quote_selected_services" TO "authenticated";
GRANT ALL ON TABLE "public"."v_quote_selected_services" TO "service_role";



GRANT ALL ON TABLE "public"."v_revenue_analysis" TO "anon";
GRANT ALL ON TABLE "public"."v_revenue_analysis" TO "authenticated";
GRANT ALL ON TABLE "public"."v_revenue_analysis" TO "service_role";



GRANT ALL ON TABLE "public"."v_service_adoption_analysis" TO "anon";
GRANT ALL ON TABLE "public"."v_service_adoption_analysis" TO "authenticated";
GRANT ALL ON TABLE "public"."v_service_adoption_analysis" TO "service_role";



GRANT ALL ON TABLE "public"."v_service_availability_matrix" TO "anon";
GRANT ALL ON TABLE "public"."v_service_availability_matrix" TO "authenticated";
GRANT ALL ON TABLE "public"."v_service_availability_matrix" TO "service_role";



GRANT ALL ON TABLE "public"."v_time_slot_availability" TO "anon";
GRANT ALL ON TABLE "public"."v_time_slot_availability" TO "authenticated";
GRANT ALL ON TABLE "public"."v_time_slot_availability" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
