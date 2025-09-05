-- Migration: Add Comprehensive Business Views
-- Description: Creates all v_ prefixed views for detailed business analytics and reporting

-- =====================================================
-- 1. PRICING STRUCTURE VIEWS
-- =====================================================

-- Complete pricing catalog with all relationships
create or replace view public.v_pricing_catalog as
select 
    -- Tier Information
    t.id as tier_id,
    t.slug as tier_slug,
    t.name as tier_name,
    t.description as tier_description,
    t.target_audience as tier_target_audience,
    t.sort_order as tier_sort_order,
    t.is_active as tier_is_active,
    
    -- Level Information
    l.id as level_id,
    l.level_code as level_code,
    l.name as level_name,
    l.price as level_price_eur,
    l.original_price as level_original_price_eur,
    l.description as level_description,
    l.features as level_features,
    l.sort_order as level_sort_order,
    l.is_active as level_is_active,
    
    -- Calculated Fields
    case 
        when l.original_price is not null and l.original_price > l.price 
        then round(((l.original_price - l.price) / l.original_price * 100)::numeric, 2)
        else 0
    end as level_discount_percentage,
    
    -- Metadata
    l.created_at as level_created_at,
    l.updated_at as level_updated_at
from 
    public.pricing_tiers t
    inner join public.pricing_levels l on t.id = l.tier_id
where 
    t.is_active = true
order by 
    t.sort_order, l.sort_order;

comment on view public.v_pricing_catalog is 'Complete pricing structure with tiers and levels for catalog display';

-- Service availability matrix showing which services are available for each tier/level
create or replace view public.v_service_availability_matrix as
select 
    -- Service Information
    s.id as service_id,
    s.slug as service_slug,
    s.name as service_name,
    s.category as service_category,
    s.base_price as service_price_eur,
    s.description as service_description,
    s.features as service_features,
    
    -- Tier Information
    t.id as tier_id,
    t.slug as tier_slug,
    t.name as tier_name,
    
    -- Level Information
    l.id as level_id,
    l.level_code as level_code,
    l.name as level_name,
    
    -- Availability Logic
    case 
        when s.tier_restrictions::jsonb ? t.slug then false
        when s.excluded_from_levels::jsonb ? l.level_code then false
        else true
    end as is_available,
    
    -- Inclusion Logic (is it included in the base price?)
    case 
        when l.level_code = 'C' and s.category in ('advanced', 'premium') then true
        when l.level_code = 'B' and s.category = 'advanced' then true
        else false
    end as is_included_in_level,
    
    -- Effective Price (0 if included, base_price if not)
    case 
        when l.level_code = 'C' and s.category in ('advanced', 'premium') then 0
        when l.level_code = 'B' and s.category = 'advanced' then 0
        else s.base_price
    end as effective_price_eur
from 
    public.optional_services s
    cross join public.pricing_tiers t
    cross join public.pricing_levels l
where 
    t.is_active = true 
    and l.tier_id = t.id
    and s.is_active = true
order by 
    t.sort_order, l.sort_order, s.category, s.sort_order;

comment on view public.v_service_availability_matrix is 'Matrix showing service availability and pricing for each tier/level combination';

-- =====================================================
-- 2. QUOTE MANAGEMENT VIEWS
-- =====================================================

-- Detailed quote information with all relationships
create or replace view public.v_quote_details as
select 
    -- Quote Core Information
    q.id as quote_id,
    q.quote_number,
    q.status as quote_status,
    q.created_at as quote_created_at,
    q.updated_at as quote_updated_at,
    q.submitted_at as quote_submitted_at,
    q.reviewed_at as quote_reviewed_at,
    q.expires_at as quote_expires_at,
    
    -- User Information
    q.user_id,
    u.email as user_email,
    u.raw_user_meta_data->>'full_name' as user_full_name,
    u.raw_user_meta_data->>'phone' as user_phone,
    
    -- Pricing Information
    t.id as tier_id,
    t.slug as tier_slug,
    t.name as tier_name,
    l.id as level_id,
    l.level_code,
    l.name as level_name,
    
    -- Financial Details
    q.base_price as base_price_eur,
    q.services_price as services_price_eur,
    q.discount_amount as discount_amount_eur,
    q.tax_amount as tax_amount_eur,
    q.total_price as total_price_eur,
    
    -- Service Details
    q.selected_services,
    array_length(array(select jsonb_array_elements_text(q.selected_services)), 1) as service_count,
    
    -- Contact Preferences
    q.contact_preferences,
    q.contact_preferences->>'preferred_method' as preferred_contact_method,
    q.contact_preferences->>'preferred_time' as preferred_contact_time,
    
    -- Notes
    q.notes as customer_notes,
    q.admin_notes,
    
    -- Status Helpers
    case 
        when q.status = 'expired' then true
        when q.expires_at < now() then true
        else false
    end as is_expired,
    case 
        when q.status = 'draft' then true
        else false
    end as is_editable,
    extract(days from (coalesce(q.expires_at, now() + interval '30 days') - now())) as days_until_expiry
from 
    public.user_quotes q
    left join auth.users u on q.user_id = u.id
    left join public.pricing_tiers t on q.tier_id = t.id
    left join public.pricing_levels l on q.level_id = l.id;

comment on view public.v_quote_details is 'Comprehensive quote details with user, pricing, and status information';

-- Quote lifecycle tracking with stage durations
create or replace view public.v_quote_lifecycle as
with quote_stages as (
    select 
        q.id as quote_id,
        q.quote_number,
        q.created_at,
        q.submitted_at,
        q.reviewed_at,
        qv_accepted.created_at as accepted_at,
        qv_rejected.created_at as rejected_at,
        q.expires_at,
        q.status
    from 
        public.user_quotes q
        left join lateral (
            select created_at 
            from public.quote_versions 
            where quote_id = q.id 
            and changes->>'status' = 'accepted'
            order by created_at desc 
            limit 1
        ) qv_accepted on true
        left join lateral (
            select created_at 
            from public.quote_versions 
            where quote_id = q.id 
            and changes->>'status' = 'rejected'
            order by created_at desc 
            limit 1
        ) qv_rejected on true
)
select 
    quote_id,
    quote_number,
    status,
    created_at,
    submitted_at,
    reviewed_at,
    accepted_at,
    rejected_at,
    expires_at,
    
    -- Duration in each stage (in hours)
    extract(epoch from (coalesce(submitted_at, now()) - created_at)) / 3600 as hours_in_draft,
    extract(epoch from (coalesce(reviewed_at, now()) - submitted_at)) / 3600 as hours_in_submitted,
    extract(epoch from (coalesce(accepted_at, rejected_at, now()) - reviewed_at)) / 3600 as hours_in_review,
    
    -- Total time to decision
    extract(epoch from (coalesce(accepted_at, rejected_at, now()) - created_at)) / 3600 as total_hours_to_decision,
    
    -- Days since creation
    extract(days from (now() - created_at)) as days_since_creation
from 
    quote_stages
order by 
    created_at desc;

comment on view public.v_quote_lifecycle is 'Quote lifecycle tracking with time spent in each stage';

-- Quote selected services breakdown
create or replace view public.v_quote_selected_services as
select 
    q.id as quote_id,
    q.quote_number,
    q.status as quote_status,
    s.id as service_id,
    s.slug as service_slug,
    s.name as service_name,
    s.category as service_category,
    s.base_price as service_price_eur,
    s.description as service_description,
    s.features as service_features
from 
    public.user_quotes q
    cross join lateral (
        select value::bigint as service_id
        from jsonb_array_elements_text(q.selected_services)
    ) service_ids
    inner join public.optional_services s on s.id = service_ids.service_id
order by 
    q.created_at desc, s.category, s.sort_order;

comment on view public.v_quote_selected_services is 'Breakdown of selected services for each quote';

-- =====================================================
-- 3. USER JOURNEY ANALYTICS VIEWS
-- =====================================================

-- Pricing funnel analysis with conversion metrics
create or replace view public.v_pricing_funnel_analysis as
with funnel_stages as (
    select 
        date_trunc('day', created_at) as day,
        count(distinct session_id) as total_sessions,
        count(distinct case when event_type = 'page_view' then session_id end) as viewed_pricing,
        count(distinct case when event_type = 'tier_selected' then session_id end) as selected_tier,
        count(distinct case when event_type = 'level_selected' then session_id end) as selected_level,
        count(distinct case when event_type = 'services_selected' then session_id end) as selected_services,
        count(distinct case when event_type = 'contact_info_entered' then session_id end) as entered_contact,
        count(distinct case when event_type = 'quote_created' then session_id end) as created_quote,
        count(distinct case when event_type = 'quote_submitted' then session_id end) as submitted_quote
    from 
        public.pricing_journey_events
    group by 
        date_trunc('day', created_at)
)
select 
    day,
    total_sessions,
    viewed_pricing,
    selected_tier,
    selected_level,
    selected_services,
    entered_contact,
    created_quote,
    submitted_quote,
    
    -- Conversion rates
    round(100.0 * selected_tier / nullif(viewed_pricing, 0), 2) as tier_selection_rate,
    round(100.0 * selected_level / nullif(selected_tier, 0), 2) as level_selection_rate,
    round(100.0 * selected_services / nullif(selected_level, 0), 2) as service_selection_rate,
    round(100.0 * created_quote / nullif(selected_services, 0), 2) as quote_creation_rate,
    round(100.0 * submitted_quote / nullif(created_quote, 0), 2) as quote_submission_rate,
    round(100.0 * submitted_quote / nullif(viewed_pricing, 0), 2) as overall_conversion_rate
from 
    funnel_stages
order by 
    day desc;

comment on view public.v_pricing_funnel_analysis is 'Daily pricing funnel conversion analysis';

-- Persona matcher analysis with conversion correlation
create or replace view public.v_persona_matcher_analysis as
select 
    pm.matched_tier,
    pm.matched_level,
    count(distinct pm.session_id) as total_matches,
    avg(pm.confidence_score) as avg_confidence_score,
    
    -- Quote conversion
    count(distinct q.id) as quotes_created,
    count(distinct case when q.status = 'submitted' then q.id end) as quotes_submitted,
    count(distinct case when q.status = 'accepted' then q.id end) as quotes_accepted,
    
    -- Conversion rates
    round(100.0 * count(distinct q.id) / nullif(count(distinct pm.session_id), 0), 2) as quote_creation_rate,
    round(100.0 * count(distinct case when q.status = 'accepted' then q.id end) / nullif(count(distinct q.id), 0), 2) as acceptance_rate,
    
    -- Recommendation accuracy
    count(distinct case when q.tier_id = t.id and pm.matched_tier = t.slug then q.id end) as matched_tier_quotes,
    round(100.0 * count(distinct case when q.tier_id = t.id and pm.matched_tier = t.slug then q.id end) / nullif(count(distinct q.id), 0), 2) as tier_match_accuracy
from 
    public.persona_matcher_responses pm
    left join public.user_quotes q on q.user_id = pm.user_id
    left join public.pricing_tiers t on t.slug = pm.matched_tier
group by 
    pm.matched_tier, pm.matched_level
order by 
    total_matches desc;

comment on view public.v_persona_matcher_analysis is 'Persona matcher effectiveness and conversion analysis';

-- =====================================================
-- 4. BUSINESS ANALYTICS VIEWS
-- =====================================================

-- Revenue analysis by tier, level, and time period
create or replace view public.v_revenue_analysis as
select 
    date_trunc('month', q.created_at) as month,
    t.slug as tier_slug,
    t.name as tier_name,
    l.level_code,
    l.name as level_name,
    
    -- Quote metrics
    count(distinct q.id) as total_quotes,
    count(distinct case when q.status = 'accepted' then q.id end) as accepted_quotes,
    count(distinct case when q.status = 'rejected' then q.id end) as rejected_quotes,
    count(distinct case when q.status = 'expired' then q.id end) as expired_quotes,
    
    -- Revenue metrics
    sum(case when q.status = 'accepted' then q.total_price else 0 end) as realized_revenue_eur,
    sum(q.total_price) as potential_revenue_eur,
    avg(q.total_price) as avg_quote_value_eur,
    
    -- Service attachment
    avg(array_length(array(select jsonb_array_elements_text(q.selected_services)), 1)) as avg_services_per_quote,
    sum(q.services_price) as total_services_revenue_eur,
    
    -- Discount usage
    sum(q.discount_amount) as total_discounts_given_eur,
    avg(case when q.discount_amount > 0 then q.discount_amount end) as avg_discount_when_used_eur,
    
    -- Conversion metrics
    round(100.0 * count(distinct case when q.status = 'accepted' then q.id end) / nullif(count(distinct q.id), 0), 2) as acceptance_rate
from 
    public.user_quotes q
    left join public.pricing_tiers t on q.tier_id = t.id
    left join public.pricing_levels l on q.level_id = l.id
group by 
    date_trunc('month', q.created_at), t.slug, t.name, l.level_code, l.name
order by 
    month desc, tier_slug, level_code;

comment on view public.v_revenue_analysis is 'Revenue analysis by tier, level, and time period';

-- Service adoption analysis
create or replace view public.v_service_adoption_analysis as
with service_usage as (
    select 
        s.id as service_id,
        s.slug as service_slug,
        s.name as service_name,
        s.category as service_category,
        s.base_price as service_price_eur,
        count(distinct q.id) as times_selected,
        count(distinct q.user_id) as unique_users,
        count(distinct case when q.status = 'accepted' then q.id end) as times_in_accepted_quotes
    from 
        public.optional_services s
        left join public.user_quotes q on q.selected_services ? s.id::text
    group by 
        s.id, s.slug, s.name, s.category, s.base_price
)
select 
    *,
    round(100.0 * times_selected / nullif((select count(*) from public.user_quotes), 0), 2) as selection_rate,
    round(100.0 * times_in_accepted_quotes / nullif(times_selected, 0), 2) as acceptance_rate_when_selected,
    times_selected * service_price_eur as potential_revenue_eur,
    times_in_accepted_quotes * service_price_eur as realized_revenue_eur
from 
    service_usage
order by 
    times_selected desc;

comment on view public.v_service_adoption_analysis is 'Analysis of optional service adoption and revenue impact';

-- =====================================================
-- 5. ADMIN DASHBOARD VIEWS
-- =====================================================

-- Executive dashboard summary
create or replace view public.v_executive_dashboard as
with current_month as (
    select 
        count(*) as quotes_this_month,
        count(distinct user_id) as unique_users_this_month,
        sum(case when status = 'accepted' then total_price else 0 end) as revenue_this_month,
        avg(total_price) as avg_quote_value_this_month
    from public.user_quotes
    where created_at >= date_trunc('month', now())
),
previous_month as (
    select 
        count(*) as quotes_last_month,
        count(distinct user_id) as unique_users_last_month,
        sum(case when status = 'accepted' then total_price else 0 end) as revenue_last_month,
        avg(total_price) as avg_quote_value_last_month
    from public.user_quotes
    where created_at >= date_trunc('month', now() - interval '1 month')
    and created_at < date_trunc('month', now())
),
pending_actions as (
    select 
        count(*) filter (where status = 'submitted') as quotes_pending_review,
        count(*) filter (where status = 'under_review') as quotes_under_review,
        count(*) filter (where status = 'draft' and created_at < now() - interval '7 days') as abandoned_drafts
    from public.user_quotes
)
select 
    -- Current month metrics
    cm.quotes_this_month,
    cm.unique_users_this_month,
    cm.revenue_this_month,
    cm.avg_quote_value_this_month,
    
    -- Growth metrics
    round(100.0 * (cm.quotes_this_month - pm.quotes_last_month) / nullif(pm.quotes_last_month, 0), 2) as quote_growth_rate,
    round(100.0 * (cm.revenue_this_month - pm.revenue_last_month) / nullif(pm.revenue_last_month, 0), 2) as revenue_growth_rate,
    
    -- Pending actions
    pa.quotes_pending_review,
    pa.quotes_under_review,
    pa.abandoned_drafts,
    
    -- Total metrics
    (select count(*) from public.user_quotes) as total_quotes_all_time,
    (select sum(total_price) from public.user_quotes where status = 'accepted') as total_revenue_all_time
from 
    current_month cm,
    previous_month pm,
    pending_actions pa;

comment on view public.v_executive_dashboard is 'Executive dashboard with key metrics and growth indicators';

-- Admin quote review queue
create or replace view public.v_admin_quote_review_queue as
select 
    q.id as quote_id,
    q.quote_number,
    q.status,
    q.created_at,
    q.submitted_at,
    q.expires_at,
    q.total_price as total_price_eur,
    
    -- User info
    u.email as user_email,
    u.raw_user_meta_data->>'full_name' as user_full_name,
    
    -- Tier/Level info
    t.name as tier_name,
    l.level_code,
    l.name as level_name,
    
    -- Priority indicators
    case 
        when q.status = 'submitted' then 1
        when q.status = 'under_review' then 2
        when q.status = 'draft' and q.created_at < now() - interval '7 days' then 3
        else 4
    end as priority,
    
    -- Time metrics
    extract(hours from (now() - q.submitted_at)) as hours_since_submission,
    extract(days from (q.expires_at - now())) as days_until_expiry,
    
    -- Action needed
    case 
        when q.status = 'submitted' then 'Review Required'
        when q.status = 'under_review' then 'Complete Review'
        when q.status = 'draft' and q.created_at < now() - interval '7 days' then 'Follow Up'
        else 'No Action'
    end as action_needed
from 
    public.user_quotes q
    left join auth.users u on q.user_id = u.id
    left join public.pricing_tiers t on q.tier_id = t.id
    left join public.pricing_levels l on q.level_id = l.id
where 
    q.status in ('submitted', 'under_review', 'draft')
order by 
    priority, q.submitted_at nulls last;

comment on view public.v_admin_quote_review_queue is 'Admin queue for quotes requiring review or action';

-- =====================================================
-- 6. OPERATIONAL VIEWS
-- =====================================================

-- Time slot availability overview
create or replace view public.v_time_slot_availability as
with slot_bookings as (
    select 
        ts.id as slot_id,
        ts.day_of_week,
        ts.start_time,
        ts.end_time,
        ts.slot_duration,
        ts.max_bookings,
        count(distinct bs.id) as current_bookings,
        ts.max_bookings - count(distinct bs.id) as available_spots
    from 
        public.time_slots ts
        left join public.booked_slots bs on bs.time_slot_id = ts.id 
            and bs.booking_date >= current_date 
            and bs.booking_date < current_date + interval '7 days'
            and bs.confirmed = true
    where 
        ts.is_available = true
    group by 
        ts.id, ts.day_of_week, ts.start_time, ts.end_time, ts.slot_duration, ts.max_bookings
)
select 
    slot_id,
    case day_of_week
        when 0 then 'Sunday'
        when 1 then 'Monday'
        when 2 then 'Tuesday'
        when 3 then 'Wednesday'
        when 4 then 'Thursday'
        when 5 then 'Friday'
        when 6 then 'Saturday'
    end as day_name,
    start_time,
    end_time,
    slot_duration as duration_minutes,
    max_bookings,
    current_bookings,
    available_spots,
    round(100.0 * current_bookings / nullif(max_bookings, 0), 2) as utilization_rate
from 
    slot_bookings
order by 
    day_of_week, start_time;

comment on view public.v_time_slot_availability is 'Weekly time slot availability and utilization overview';

-- Contact outreach list for follow-ups
create or replace view public.v_contact_outreach_list as
select 
    q.id as quote_id,
    q.quote_number,
    q.status as quote_status,
    q.created_at as quote_created_at,
    q.submitted_at as quote_submitted_at,
    q.expires_at as quote_expires_at,
    
    -- User contact info
    u.email as user_email,
    u.raw_user_meta_data->>'full_name' as user_full_name,
    u.raw_user_meta_data->>'phone' as user_phone,
    
    -- Contact preferences
    cp.preferred_method as preferred_contact_method,
    cp.contact_email,
    cp.contact_phone,
    cp.preferred_date,
    cp.timezone,
    cp.language_preference,
    
    -- Outreach priority
    case 
        when q.status = 'draft' and q.created_at < now() - interval '3 days' then 'High - Abandoned Draft'
        when q.status = 'submitted' and q.submitted_at < now() - interval '2 days' then 'High - Pending Review'
        when q.status = 'under_review' and q.reviewed_at < now() - interval '1 day' then 'Medium - In Review'
        when q.expires_at < now() + interval '3 days' then 'High - Expiring Soon'
        else 'Low - Standard'
    end as outreach_priority,
    
    -- Days since last activity
    extract(days from (now() - greatest(q.created_at, q.updated_at, q.submitted_at, q.reviewed_at))) as days_since_activity
from 
    public.user_quotes q
    left join auth.users u on q.user_id = u.id
    left join public.contact_preferences cp on cp.quote_id = q.id
where 
    q.status not in ('accepted', 'rejected', 'expired')
order by 
    case 
        when q.status = 'draft' and q.created_at < now() - interval '3 days' then 1
        when q.status = 'submitted' and q.submitted_at < now() - interval '2 days' then 2
        when q.expires_at < now() + interval '3 days' then 3
        else 4
    end,
    q.created_at;

comment on view public.v_contact_outreach_list is 'Priority list for customer outreach and follow-ups';

-- =====================================================
-- 7. SYSTEM SUMMARY VIEW
-- =====================================================

-- Comprehensive system summary
create or replace view public.v_pricing_system_summary as
select 
    -- Pricing structure
    (select count(*) from public.pricing_tiers where is_active = true) as active_tiers,
    (select count(*) from public.pricing_levels where is_active = true) as active_levels,
    (select count(*) from public.optional_services where is_active = true) as active_services,
    
    -- Quote metrics
    (select count(*) from public.user_quotes) as total_quotes,
    (select count(*) from public.user_quotes where status = 'draft') as draft_quotes,
    (select count(*) from public.user_quotes where status = 'submitted') as submitted_quotes,
    (select count(*) from public.user_quotes where status = 'accepted') as accepted_quotes,
    
    -- User metrics
    (select count(distinct user_id) from public.user_quotes) as total_users,
    (select count(distinct user_id) from public.user_quotes where created_at >= now() - interval '30 days') as active_users_30d,
    
    -- Revenue metrics
    (select sum(total_price) from public.user_quotes where status = 'accepted') as total_revenue_eur,
    (select avg(total_price) from public.user_quotes where status = 'accepted') as avg_accepted_quote_eur,
    
    -- Discount metrics
    (select count(*) from public.discounts where is_active = true and (expires_at is null or expires_at > now())) as active_discounts,
    (select sum(discount_amount) from public.applied_discounts) as total_discounts_applied_eur,
    
    -- Journey metrics
    (select count(distinct session_id) from public.pricing_journey_events) as total_sessions,
    (select count(*) from public.persona_matcher_responses) as total_persona_matches,
    
    -- Time slot metrics
    (select count(*) from public.time_slots where is_available = true) as available_time_slots,
    (select count(*) from public.booked_slots where confirmed = true and booking_date >= current_date) as upcoming_bookings;

comment on view public.v_pricing_system_summary is 'High-level summary of the entire pricing system';

-- =====================================================
-- Grant permissions for all views
-- =====================================================
grant select on public.v_pricing_catalog to anon, authenticated;
grant select on public.v_service_availability_matrix to anon, authenticated;
grant select on public.v_quote_details to authenticated;
grant select on public.v_quote_lifecycle to authenticated;
grant select on public.v_quote_selected_services to authenticated;
grant select on public.v_pricing_funnel_analysis to authenticated;
grant select on public.v_persona_matcher_analysis to authenticated;
grant select on public.v_revenue_analysis to authenticated;
grant select on public.v_service_adoption_analysis to authenticated;
grant select on public.v_executive_dashboard to authenticated;
grant select on public.v_admin_quote_review_queue to authenticated;
grant select on public.v_time_slot_availability to authenticated;
grant select on public.v_contact_outreach_list to authenticated;
grant select on public.v_pricing_system_summary to authenticated;