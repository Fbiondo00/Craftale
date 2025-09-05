-- Migration: Fix all security issues identified by Supabase Security Advisor
-- Description: 
--   1. Create users_profile table to prevent auth.users exposure
--   2. Fix exposed auth.users in admin_quote_overview by using users_profile table
--   3. Rename admin_quote_overview to v_admin_quote_overview for consistency
--   4. Convert ALL views to use SECURITY INVOKER to respect RLS policies

-- =====================================================
-- PART 1: Create users_profile table (Security Best Practice)
-- =====================================================
-- This table prevents direct exposure of auth.users in public views
CREATE TABLE IF NOT EXISTS public.users_profile (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  display_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.users_profile IS 'Public user profile with safe fields only - prevents auth.users exposure';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_profile_email ON public.users_profile(email);
CREATE INDEX IF NOT EXISTS idx_users_profile_user_id ON public.users_profile(id);

-- Enable RLS (using existing is_admin function from admin_system migration)
ALTER TABLE public.users_profile ENABLE ROW LEVEL SECURITY;

-- RLS policies for users_profile
-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view profiles" ON public.users_profile;
CREATE POLICY "Users can view profiles" 
  ON public.users_profile
  FOR SELECT
  TO authenticated
  USING (
    id = (SELECT auth.uid())  -- Users can see their own profile
    OR 
    public.is_admin()          -- Admins can see all profiles
  );

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users_profile;
CREATE POLICY "Users can update their own profile" 
  ON public.users_profile
  FOR UPDATE
  TO authenticated
  USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

-- Grant select to authenticated users
GRANT SELECT ON public.users_profile TO authenticated;
GRANT UPDATE (display_name, avatar_url, updated_at) ON public.users_profile TO authenticated;

-- Populate users_profile from existing auth.users
INSERT INTO public.users_profile (id, email, display_name)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'display_name', raw_user_meta_data->>'full_name', split_part(email, '@', 1))
FROM auth.users
ON CONFLICT (id) DO UPDATE
SET 
  email = excluded.email,
  display_name = COALESCE(excluded.display_name, users_profile.display_name),
  updated_at = now();

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- PART 2: Fix admin_quote_overview from admin_system migration
-- =====================================================

-- Drop the old view that exposes auth.users
DROP VIEW IF EXISTS public.admin_quote_overview CASCADE;

-- Recreate as v_admin_quote_overview using users_profile instead of auth.users
CREATE OR REPLACE VIEW public.v_admin_quote_overview
WITH (security_invoker = true)
AS
SELECT 
    q.id AS quote_id,
    q.quote_number,
    q.status AS quote_status,
    q.created_at AS quote_created_at,
    q.updated_at AS quote_updated_at,
    q.submitted_at AS quote_submitted_at,
    q.reviewed_at AS quote_reviewed_at,
    q.expires_at AS quote_expires_at,
    
    -- User information from users_profile (safe, no auth.users exposure)
    up.id AS user_id,
    up.email AS user_email,
    up.display_name AS user_name,
    
    -- Pricing tier and level
    t.id AS tier_id,
    t.slug AS tier_slug,
    t.name AS tier_name,
    l.id AS level_id,
    l.level_code,
    l.name AS level_name,
    
    -- Financial details
    q.base_price AS base_price_eur,
    q.services_price AS services_price_eur,
    q.discount_amount AS discount_amount_eur,
    q.tax_amount AS tax_amount_eur,
    q.total_price AS total_price_eur,
    
    -- Service details
    q.selected_services,
    array_length(array(SELECT jsonb_array_elements_text(q.selected_services)), 1) AS service_count,
    
    -- Contact preferences
    q.contact_preferences,
    q.contact_preferences->>'preferred_method' AS preferred_contact_method,
    
    -- Notes
    q.notes AS customer_notes,
    q.admin_notes,
    
    -- Status flags
    CASE 
        WHEN q.status = 'expired' THEN true
        WHEN q.expires_at < now() THEN true
        ELSE false
    END AS is_expired,
    CASE 
        WHEN q.status = 'draft' THEN true
        ELSE false
    END AS is_editable
FROM 
    public.user_quotes q
    LEFT JOIN public.users_profile up ON q.user_id = up.id
    LEFT JOIN public.pricing_tiers t ON q.tier_id = t.id
    LEFT JOIN public.pricing_levels l ON q.level_id = l.id;

-- Add comment
COMMENT ON VIEW public.v_admin_quote_overview IS 'Administrative view of quotes with all related details using users_profile for security';

-- Grant appropriate permissions
GRANT SELECT ON public.v_admin_quote_overview TO authenticated;
GRANT SELECT ON public.v_admin_quote_overview TO service_role;

-- =====================================================
-- PART 2: Convert ALL views to SECURITY INVOKER
-- =====================================================

-- Views from comprehensive views migration (20250808223707)
ALTER VIEW IF EXISTS public.v_pricing_catalog SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_service_availability_matrix SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_quote_details SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_quote_lifecycle SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_quote_selected_services SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_pricing_funnel_analysis SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_persona_matcher_analysis SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_revenue_analysis SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_service_adoption_analysis SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_executive_dashboard SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_admin_quote_review_queue SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_time_slot_availability SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_contact_outreach_list SET (security_invoker = true);
ALTER VIEW IF EXISTS public.v_pricing_system_summary SET (security_invoker = true);

-- Any other views that might exist
ALTER VIEW IF EXISTS public.complete_pricing_view SET (security_invoker = true);
ALTER VIEW IF EXISTS public.quote_analytics_summary SET (security_invoker = true);
ALTER VIEW IF EXISTS public.persona_matcher_analytics SET (security_invoker = true);
ALTER VIEW IF EXISTS public.active_discounts_view SET (security_invoker = true);
ALTER VIEW IF EXISTS public.service_popularity_view SET (security_invoker = true);
ALTER VIEW IF EXISTS public.quote_status_analytics SET (security_invoker = true);
ALTER VIEW IF EXISTS public.persona_insights_view SET (security_invoker = true);
ALTER VIEW IF EXISTS public.pricing_funnel_analytics SET (security_invoker = true);
ALTER VIEW IF EXISTS public.tier_comparison_view SET (security_invoker = true);
ALTER VIEW IF EXISTS public.service_categories_view SET (security_invoker = true);
ALTER VIEW IF EXISTS public.user_journey_funnel_view SET (security_invoker = true);
ALTER VIEW IF EXISTS public.quote_statistics_view SET (security_invoker = true);
ALTER VIEW IF EXISTS public.tier_performance_view SET (security_invoker = true);
ALTER VIEW IF EXISTS public.time_slot_availability_view SET (security_invoker = true);

-- =====================================================
-- SUMMARY
-- =====================================================
-- This migration fixes all 30 security errors:
-- 1. Exposed auth.users in admin_quote_overview (1 error) - FIXED by using users_profile
-- 2. SECURITY DEFINER views (29 errors) - FIXED by converting all to SECURITY INVOKER
-- 
-- All views will now respect RLS policies of their underlying tables
-- No auth.users data is exposed in any public view