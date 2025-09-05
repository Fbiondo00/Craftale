-- Seed file for development and testing
-- This file contains sample data for local development
-- DO NOT run this in production

-- ============================================
-- Sample admin user (for testing)
-- ============================================
-- Note: Admin role must be set via Supabase Auth Admin API
-- This is just a placeholder to document the process
-- 
-- To create an admin user:
-- 1. Create user via Supabase Auth
-- 2. Update auth.users set raw_app_meta_data = 
--    raw_app_meta_data || '{"role": "admin"}'::jsonb
--    where email = 'admin@example.com';

-- ============================================
-- Additional sample discounts
-- ============================================
insert into public.discounts (code, name, description, discount_type, discount_value, min_purchase_amount, expires_at, applies_to, applies_to_ids) values
  ('SUMMER24', 'Summer Special', '15% off summer promotion', 'percentage', 15, 750, '2025-09-30'::timestamp with time zone, 'all', '[]'::jsonb),
  ('LOYALTY', 'Loyalty Reward', '€300 off for returning customers', 'fixed', 300, 2500, '2025-12-31'::timestamp with time zone, 'all', '[]'::jsonb),
  ('BUNDLE50', 'Bundle Deal', '€500 off when selecting 3+ services', 'fixed', 500, 3000, '2025-12-31'::timestamp with time zone, 'all', '[]'::jsonb)
on conflict (code) do nothing;


-- ============================================
-- Sample persona questions for matcher
-- ============================================
-- This would typically be managed through an admin interface
-- Documenting the expected structure for persona matcher

-- Expected structure for persona_matcher_responses:
-- questions: [
--   {"id": 1, "text": "What's your business type?", "type": "single"},
--   {"id": 2, "text": "What's your budget range?", "type": "single"},
--   {"id": 3, "text": "What features are important?", "type": "multiple"}
-- ]
-- answers: {
--   "1": "restaurant",
--   "2": "1000-3000",
--   "3": ["online_ordering", "reservations", "social_media"]
-- }

-- ============================================
-- Development helper functions
-- ============================================

-- Function to generate sample quotes for testing
create or replace function public.generate_sample_quotes(p_count int default 10)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
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

-- ============================================
-- Development data cleanup function
-- ============================================
create or replace function public.cleanup_test_data()
returns void
language plpgsql
security invoker
set search_path = ''
as $$
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

-- ============================================
-- Note on running seeds
-- ============================================
-- To run this seed file in local development:
-- supabase db reset
-- supabase db seed
--
-- Or manually:
-- psql -h localhost -p 54322 -U postgres -d postgres -f seed.sql