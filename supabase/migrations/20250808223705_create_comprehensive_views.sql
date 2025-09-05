-- Migration: Create Comprehensive Pricing Views
-- Description: Creates optimized views for pricing, services, and tier comparisons

-- ============================================
-- 1. Complete Pricing View with All Details
-- ============================================
create or replace view public.complete_pricing_view as
with tier_services as (
  select 
    t.id as tier_id,
    t.slug as tier_slug,
    t.name as tier_name,
    l.id as level_id,
    l.level_code,
    l.name as level_name,
    l.price as level_price,
    l.original_price as level_original_price,
    jsonb_agg(
      jsonb_build_object(
        'id', os.id,
        'slug', os.slug,
        'name', os.name,
        'category', os.category,
        'base_price', os.base_price,
        'is_excluded', 
        case 
          when os.tier_restrictions @> jsonb_build_array(t.slug) then false
          when jsonb_array_length(os.tier_restrictions) > 0 then true
          when os.excluded_from_levels @> jsonb_build_array(l.level_code) then true
          else false
        end
      ) order by os.sort_order
    ) filter (where os.is_active = true) as available_services
  from public.pricing_tiers t
  join public.pricing_levels l on t.id = l.tier_id
  left join public.optional_services os on os.is_active = true
  where t.is_active = true and l.is_active = true
  group by t.id, t.slug, t.name, l.id, l.level_code, l.name, l.price, l.original_price
)
select 
  tier_id,
  tier_slug,
  tier_name,
  level_id,
  level_code,
  level_name,
  level_price,
  level_original_price,
  case 
    when level_original_price is not null and level_original_price > 0 
    then round(((level_original_price - level_price) / level_original_price * 100)::numeric, 0)
    else 0
  end as discount_percentage,
  available_services,
  (
    select count(*) 
    from jsonb_array_elements(available_services) s 
    where not (s->>'is_excluded')::boolean
  ) as available_services_count
from tier_services
order by tier_id, level_code;

comment on view public.complete_pricing_view is 'Complete pricing structure with tiers, levels, and available services';

-- ============================================
-- 2. Service Categories View
-- ============================================
create or replace view public.service_categories_view as
select 
  category,
  count(*) as service_count,
  json_agg(
    json_build_object(
      'id', id,
      'slug', slug,
      'name', name,
      'description', description,
      'base_price', base_price,
      'features', features,
      'sort_order', sort_order
    ) order by sort_order, name
  ) as services
from public.optional_services
where is_active = true
group by category
order by 
  case category
    when 'content' then 1
    when 'media' then 2
    when 'branding' then 3
    when 'marketing' then 4
    when 'localization' then 5
    when 'support' then 6
    else 99
  end;

comment on view public.service_categories_view is 'Optional services grouped by category';

-- ============================================
-- 3. Tier Comparison View
-- ============================================
create or replace view public.tier_comparison_view as
with level_features as (
  select 
    t.slug as tier_slug,
    t.name as tier_name,
    t.description as tier_description,
    t.target_audience,
    l.level_code,
    l.name as level_name,
    l.price,
    l.original_price,
    l.features,
    row_number() over (partition by t.id order by l.level_code) as level_order
  from public.pricing_tiers t
  join public.pricing_levels l on t.id = l.tier_id
  where t.is_active = true and l.is_active = true
)
select 
  tier_slug,
  tier_name,
  tier_description,
  target_audience,
  jsonb_object_agg(
    level_code,
    jsonb_build_object(
      'name', level_name,
      'price', price,
      'original_price', original_price,
      'features', features
    )
  ) as levels
from level_features
group by tier_slug, tier_name, tier_description, target_audience
order by 
  case tier_slug
    when 'starter' then 1
    when 'pro' then 2
    when 'ecommerce' then 3
    else 99
  end;

comment on view public.tier_comparison_view is 'Side-by-side comparison of all tiers and their levels';

-- ============================================
-- 4. Active Discounts View
-- ============================================
create or replace view public.active_discounts_view as
select 
  id,
  code,
  name,
  description,
  discount_type,
  discount_value,
  case 
    when discount_type = 'percentage' then 
      discount_value || '%'
    when discount_type = 'fixed' then 
      '€' || discount_value
    else 
      'Special Offer'
  end as display_value,
  min_purchase_amount,
  max_discount_amount,
  usage_limit,
  usage_count,
  case 
    when usage_limit is not null then 
      usage_limit - usage_count
    else 
      null
  end as remaining_uses,
  starts_at,
  expires_at,
  case 
    when expires_at is not null then 
      extract(days from (expires_at - now()))
    else 
      null
  end as days_remaining,
  applies_to,
  applies_to_ids,
  conditions
from public.discounts
where is_active = true
  and now() >= starts_at
  and (expires_at is null or now() <= expires_at)
  and (usage_limit is null or usage_count < usage_limit)
order by 
  case 
    when expires_at is not null then expires_at
    else '9999-12-31'::timestamp with time zone
  end,
  discount_value desc;

comment on view public.active_discounts_view is 'Currently active and available discount codes';

-- ============================================
-- 5. Quote Summary Statistics View
-- ============================================
create or replace view public.quote_statistics_view as
select 
  count(*) as total_quotes,
  count(distinct user_id) as unique_users,
  count(*) filter (where status = 'draft') as draft_count,
  count(*) filter (where status = 'submitted') as submitted_count,
  count(*) filter (where status = 'under_review') as under_review_count,
  count(*) filter (where status = 'accepted') as accepted_count,
  count(*) filter (where status = 'rejected') as rejected_count,
  count(*) filter (where status = 'expired') as expired_count,
  avg(total_price) filter (where status != 'rejected') as avg_quote_value,
  min(total_price) filter (where status != 'rejected') as min_quote_value,
  max(total_price) filter (where status != 'rejected') as max_quote_value,
  sum(total_price) filter (where status = 'accepted') as total_accepted_value,
  avg(extract(epoch from (submitted_at - created_at))/3600) filter (where submitted_at is not null) as avg_hours_to_submit,
  round(
    count(*) filter (where status = 'accepted')::numeric / 
    nullif(count(*) filter (where status in ('accepted', 'rejected')), 0) * 100,
    2
  ) as acceptance_rate
from public.user_quotes;

comment on view public.quote_statistics_view is 'Aggregate statistics for quote performance';

-- ============================================
-- 6. Tier Performance View
-- ============================================
create or replace view public.tier_performance_view as
with tier_stats as (
  select 
    t.id as tier_id,
    t.slug as tier_slug,
    t.name as tier_name,
    l.id as level_id,
    l.level_code,
    count(distinct q.id) as level_quote_count,
    count(distinct case when q.status = 'accepted' then q.id end) as level_accepted_count,
    avg(q.total_price) as level_avg_value
  from public.pricing_tiers t
  left join public.pricing_levels l on t.id = l.tier_id
  left join public.user_quotes q on q.tier_id = t.id and q.level_id = l.id
  where t.is_active = true
  group by t.id, t.slug, t.name, l.id, l.level_code
),
tier_totals as (
  select 
    t.slug as tier_slug,
    t.name as tier_name,
    count(distinct q.id) as total_quotes,
    count(distinct q.id) filter (where q.status = 'accepted') as accepted_quotes,
    avg(q.total_price) as avg_quote_value,
    sum(q.total_price) filter (where q.status = 'accepted') as total_revenue
  from public.pricing_tiers t
  left join public.user_quotes q on q.tier_id = t.id
  where t.is_active = true
  group by t.slug, t.name
)
select 
  tt.tier_slug,
  tt.tier_name,
  tt.total_quotes,
  tt.accepted_quotes,
  tt.avg_quote_value,
  tt.total_revenue,
  jsonb_object_agg(
    ts.level_code,
    jsonb_build_object(
      'quote_count', ts.level_quote_count,
      'accepted_count', ts.level_accepted_count,
      'avg_value', ts.level_avg_value
    )
  ) filter (where ts.level_code is not null) as level_breakdown
from tier_totals tt
left join tier_stats ts on ts.tier_slug = tt.tier_slug
group by tt.tier_slug, tt.tier_name, tt.total_quotes, tt.accepted_quotes, tt.avg_quote_value, tt.total_revenue
order by tt.total_revenue desc nulls last;

comment on view public.tier_performance_view is 'Performance metrics for each pricing tier';

-- ============================================
-- 7. Service Popularity View
-- ============================================
create or replace view public.service_popularity_view as
with service_selections as (
  select 
    os.id,
    os.slug,
    os.name,
    os.category,
    os.base_price,
    count(*) as selection_count,
    count(*) filter (where q.status = 'accepted') as accepted_count
  from public.optional_services os
  cross join lateral (
    select q.*, s.value::text as service_id
    from public.user_quotes q,
    jsonb_array_elements_text(q.selected_services) s
    where s.value::bigint = os.id
  ) q
  group by os.id, os.slug, os.name, os.category, os.base_price
)
select 
  *,
  round(selection_count::numeric / nullif((select count(*) from public.user_quotes), 0) * 100, 2) as selection_rate,
  selection_count * base_price as potential_revenue,
  accepted_count * base_price as actual_revenue
from service_selections
order by selection_count desc;

comment on view public.service_popularity_view is 'Popularity and revenue metrics for optional services';

-- ============================================
-- 8. User Journey Funnel View
-- ============================================
create or replace view public.user_journey_funnel_view as
with journey_stages as (
  select 
    session_id,
    user_id,
    min(created_at) filter (where event_type = 'page_view' and page_path = '/pricing') as viewed_pricing,
    min(created_at) filter (where event_type = 'tier_selected') as selected_tier,
    min(created_at) filter (where event_type = 'level_selected') as selected_level,
    min(created_at) filter (where event_type = 'services_added') as added_services,
    min(created_at) filter (where event_type = 'quote_created') as created_quote,
    min(created_at) filter (where event_type = 'quote_submitted') as submitted_quote
  from public.pricing_journey_events
  group by session_id, user_id
)
select 
  count(*) as total_sessions,
  count(viewed_pricing) as viewed_pricing_count,
  count(selected_tier) as selected_tier_count,
  count(selected_level) as selected_level_count,
  count(added_services) as added_services_count,
  count(created_quote) as created_quote_count,
  count(submitted_quote) as submitted_quote_count,
  round(count(selected_tier)::numeric / nullif(count(viewed_pricing), 0) * 100, 2) as tier_selection_rate,
  round(count(selected_level)::numeric / nullif(count(selected_tier), 0) * 100, 2) as level_selection_rate,
  round(count(created_quote)::numeric / nullif(count(selected_level), 0) * 100, 2) as quote_creation_rate,
  round(count(submitted_quote)::numeric / nullif(count(created_quote), 0) * 100, 2) as quote_submission_rate,
  round(count(submitted_quote)::numeric / nullif(count(viewed_pricing), 0) * 100, 2) as overall_conversion_rate
from journey_stages;

comment on view public.user_journey_funnel_view is 'Conversion funnel metrics for the pricing journey';

-- ============================================
-- 9. Time Slot Availability View
-- ============================================
create or replace view public.time_slot_availability_view as
select 
  day_of_week,
  case day_of_week
    when 0 then 'Sunday'
    when 1 then 'Monday'
    when 2 then 'Tuesday'
    when 3 then 'Wednesday'
    when 4 then 'Thursday'
    when 5 then 'Friday'
    when 6 then 'Saturday'
  end as day_name,
  slot_type,
  count(*) as total_slots,
  count(*) filter (where is_available = true) as available_slots,
  sum(max_bookings) as total_capacity,
  sum(current_bookings) as current_bookings,
  sum(max_bookings - current_bookings) filter (where is_available = true) as available_capacity,
  round(
    sum(current_bookings)::numeric / nullif(sum(max_bookings), 0) * 100,
    2
  ) as utilization_rate
from public.time_slots
group by day_of_week, slot_type
order by day_of_week, slot_type;

comment on view public.time_slot_availability_view is 'Overview of time slot availability and utilization';

-- ============================================
-- 10. Persona Matcher Insights View
-- ============================================
create or replace view public.persona_insights_view as
with recommendation_counts as (
  select 
    matched_tier,
    matched_level,
    jsonb_object_keys(recommendations) as rec_key,
    count(*) as rec_count
  from public.persona_matcher_responses
  group by matched_tier, matched_level, jsonb_object_keys(recommendations)
)
select 
  p.matched_tier,
  p.matched_level,
  count(*) as response_count,
  avg(p.confidence_score) as avg_confidence,
  min(p.confidence_score) as min_confidence,
  max(p.confidence_score) as max_confidence,
  count(distinct p.user_id) filter (where p.user_id is not null) as registered_users,
  count(*) filter (where p.user_id is null) as anonymous_users,
  (
    select jsonb_object_agg(rec_key, rec_count)
    from recommendation_counts rc
    where rc.matched_tier = p.matched_tier 
      and rc.matched_level = p.matched_level
  ) as recommendation_frequency
from public.persona_matcher_responses p
group by p.matched_tier, p.matched_level
order by response_count desc;

comment on view public.persona_insights_view is 'Insights from persona matching quiz responses';

-- ============================================
-- 11. Additional Analytics Views
-- ============================================

-- Pricing funnel analytics view
create or replace view public.pricing_funnel_analytics as
select 
  date_trunc('day', created_at) as date,
  count(distinct session_id) as total_sessions,
  count(distinct session_id) filter (where event_type = 'page_view') as page_views,
  count(distinct session_id) filter (where event_type = 'tier_selected') as tier_selections,
  count(distinct session_id) filter (where event_type = 'level_selected') as level_selections,
  count(distinct session_id) filter (where event_type = 'services_selected') as service_selections,
  count(distinct session_id) filter (where event_type = 'quote_created') as quotes_created,
  count(distinct session_id) filter (where event_type = 'quote_submitted') as quotes_submitted,
  round(
    count(distinct session_id) filter (where event_type = 'quote_submitted')::numeric / 
    nullif(count(distinct session_id) filter (where event_type = 'page_view'), 0) * 100,
    2
  ) as conversion_rate
from public.pricing_journey_events
group by date_trunc('day', created_at)
order by date desc;

comment on view public.pricing_funnel_analytics is 'Daily funnel conversion metrics';

-- Quote status analytics view
create or replace view public.quote_status_analytics as
select 
  status,
  count(*) as count,
  round(count(*)::numeric / sum(count(*)) over () * 100, 2) as percentage,
  avg(total_price) as avg_value,
  sum(total_price) as total_value,
  max(created_at) as last_created,
  avg(extract(epoch from (updated_at - created_at))/3600)::int as avg_hours_in_status
from public.user_quotes
group by status
order by count desc;

comment on view public.quote_status_analytics is 'Quote distribution by status with metrics';

-- Persona matcher analytics view
create or replace view public.persona_matcher_analytics as
with mode_calc as (
  select 
    matched_tier || '-' || matched_level as match_combo,
    count(*) as combo_count
  from public.persona_matcher_responses
  group by matched_tier || '-' || matched_level
  order by combo_count desc
  limit 1
)
select 
  p.matched_tier,
  p.matched_level,
  count(*) as response_count,
  avg(p.confidence_score) as avg_confidence,
  count(distinct p.session_id) as unique_sessions,
  round(
    count(*) filter (where p.user_id is not null)::numeric / 
    nullif(count(*), 0) * 100,
    2
  ) as registered_user_percentage,
  (select match_combo from mode_calc) as most_common_match
from public.persona_matcher_responses p
group by p.matched_tier, p.matched_level
order by response_count desc;

comment on view public.persona_matcher_analytics is 'Analytics for persona matching results';

-- ============================================
-- Grant permissions for views
-- ============================================
grant select on public.complete_pricing_view to anon, authenticated;
grant select on public.service_categories_view to anon, authenticated;
grant select on public.tier_comparison_view to anon, authenticated;
grant select on public.active_discounts_view to anon, authenticated;
grant select on public.quote_statistics_view to authenticated;
grant select on public.tier_performance_view to authenticated;
grant select on public.service_popularity_view to authenticated;
grant select on public.user_journey_funnel_view to authenticated;
grant select on public.time_slot_availability_view to authenticated;
grant select on public.persona_insights_view to authenticated;
grant select on public.pricing_funnel_analytics to authenticated;
grant select on public.quote_status_analytics to authenticated;
grant select on public.persona_matcher_analytics to authenticated;