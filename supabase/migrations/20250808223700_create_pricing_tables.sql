-- Migration: Create Pricing Tables
-- Description: Sets up core pricing structure for tiers, levels, and optional services

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ============================================
-- 1. Create pricing_tiers table
-- ============================================
create table if not exists public.pricing_tiers (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  description text,
  target_audience text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.pricing_tiers is 'Stores different pricing tiers (Starter, Pro, Ecommerce) for the web agency services';

-- ============================================
-- 2. Create pricing_levels table
-- ============================================
create table if not exists public.pricing_levels (
  id bigint generated always as identity primary key,
  tier_id bigint references public.pricing_tiers(id) on delete cascade,
  level_code char(1) not null check (level_code in ('A', 'B', 'C')),
  name text not null,
  price numeric(10, 2) not null,
  original_price numeric(10, 2),
  description text,
  features jsonb default '[]'::jsonb,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  constraint unique_tier_level unique(tier_id, level_code)
);

comment on table public.pricing_levels is 'Stores pricing levels (A, B, C) for each tier with associated features and pricing';

-- ============================================
-- 3. Create optional_services table
-- ============================================
create table if not exists public.optional_services (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  description text,
  category text not null,
  base_price numeric(10, 2) not null,
  features jsonb default '[]'::jsonb,
  excluded_from_levels jsonb default '[]'::jsonb,
  tier_restrictions jsonb default '[]'::jsonb,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

comment on table public.optional_services is 'Stores optional add-on services that can be purchased with any tier/level combination';

-- ============================================
-- Create indexes for performance
-- ============================================
create index idx_pricing_tiers_slug on public.pricing_tiers(slug);
create index idx_pricing_tiers_active on public.pricing_tiers(is_active);
create index idx_pricing_levels_tier_id on public.pricing_levels(tier_id);
create index idx_pricing_levels_active on public.pricing_levels(is_active);
create index idx_optional_services_category on public.optional_services(category);
create index idx_optional_services_active on public.optional_services(is_active);

-- ============================================
-- Create updated_at trigger function
-- ============================================
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Grant execute to authenticated (needed for triggers)
grant execute on function public.update_updated_at_column() to authenticated;

-- Revoke from public/anon
revoke execute on function public.update_updated_at_column() from public, anon;

-- Apply updated_at triggers
create trigger update_pricing_tiers_updated_at 
  before update on public.pricing_tiers
  for each row 
  execute function public.update_updated_at_column();

create trigger update_pricing_levels_updated_at 
  before update on public.pricing_levels
  for each row 
  execute function public.update_updated_at_column();

create trigger update_optional_services_updated_at 
  before update on public.optional_services
  for each row 
  execute function public.update_updated_at_column();

-- ============================================
-- Enable Row Level Security
-- ============================================
alter table public.pricing_tiers enable row level security;
alter table public.pricing_levels enable row level security;
alter table public.optional_services enable row level security;

-- ============================================
-- Create RLS policies for pricing_tiers
-- ============================================
-- Public read access for active tiers
create policy "Public can view active tiers" 
  on public.pricing_tiers
  for select
  to anon, authenticated
  using (is_active = true);

-- ============================================
-- Create RLS policies for pricing_levels
-- ============================================
-- Public read access for active levels
create policy "Public can view active levels" 
  on public.pricing_levels
  for select
  to anon, authenticated
  using (is_active = true);

-- ============================================
-- Create RLS policies for optional_services
-- ============================================
-- Public read access for active services
create policy "Public can view active services" 
  on public.optional_services
  for select
  to anon, authenticated
  using (is_active = true);

-- ============================================
-- Insert initial pricing tiers
-- ============================================
insert into public.pricing_tiers (slug, name, description, target_audience, sort_order) values
  ('starter', 'Starter', 'Perfetto per trattorie familiari che vogliono iniziare la loro presenza digitale', 'Trattorie familiari', 1),
  ('pro', 'Pro', 'Ideale per imprenditori digitali che vogliono un''esperienza cliente interattiva', 'Imprenditori digitali', 2),
  ('ecommerce', 'Ecommerce', 'Soluzione completa per ristoranti upscale con capacità e-commerce complete', 'Ristoranti upscale', 3)
on conflict (slug) do nothing;

-- ============================================
-- Insert initial pricing levels
-- ============================================
with tier_ids as (
  select id, slug from public.pricing_tiers
)
insert into public.pricing_levels (tier_id, level_code, name, price, original_price, description, features, sort_order) 
select 
  t.id,
  level_data.level_code,
  level_data.name,
  level_data.price,
  level_data.original_price,
  level_data.description,
  level_data.features,
  level_data.sort_order
from tier_ids t
cross join (
  values 
    -- Starter Tier Levels (Original pricing and features)
    ('starter', 'A', 'Starter Base', 850.00, NULL::numeric, 'Pacchetto base per iniziare la presenza digitale', 
     '["Sito web responsive", "Menu digitale semplice", "SEO base", "Supporto email"]'::jsonb, 1),
    ('starter', 'B', 'Starter Plus', 1200.00, NULL::numeric, 'Pacchetto standard con funzionalità social', 
     '["Tutto di Starter A", "Integrazione social media", "Analytics di base", "Automazione email", "Supporto prioritario"]'::jsonb, 2),
    ('starter', 'C', 'Starter Pro', 1650.00, NULL::numeric, 'Pacchetto completo con marketing avanzato', 
     '["Tutto di Starter B", "SEO avanzato", "Setup Google Ads", "Gestione recensioni", "Report mensili", "3 ore consulenza incluse"]'::jsonb, 3),
    
    -- Pro Tier Levels (Original pricing and features)
    ('pro', 'A', 'Pro Base', 1800.00, NULL::numeric, 'Sistema interattivo base per ristoranti moderni', 
     '["Sito web interattivo", "Sistema prenotazioni", "Database clienti", "Analytics avanzate", "Integrazione social completa"]'::jsonb, 1),
    ('pro', 'B', 'Pro Plus', 2500.00, NULL::numeric, 'Esperienza cliente completa con automazione', 
     '["Tutto di Pro A", "Automazione SMS", "Programma fedeltà", "Analytics predittive", "A/B testing", "5 ore consulenza incluse"]'::jsonb, 2),
    ('pro', 'C', 'Pro Advanced', 3200.00, NULL::numeric, 'Soluzione enterprise con CRM integrato', 
     '["Tutto di Pro B", "Integrazione CRM", "Marketing automation", "Ottimizzazione performance", "API personalizzate", "10 ore consulenza incluse"]'::jsonb, 3),
    
    -- Ecommerce Tier Levels (Original pricing and features)
    ('ecommerce', 'A', 'Shop Base', 3500.00, NULL::numeric, 'E-commerce base con ordini online', 
     '["Ordini online completi", "Gateway pagamenti", "Consegna base", "Gestione menu dinamico", "Report vendite"]'::jsonb, 1),
    ('ecommerce', 'B', 'Shop Plus', 5000.00, NULL::numeric, 'Piattaforma completa con gestione avanzata', 
     '["Tutto di Ecommerce A", "Gestione inventario", "Multi-corriere", "Automazione ordini", "Dashboard real-time", "Analytics avanzate"]'::jsonb, 2),
    ('ecommerce', 'C', 'Shop Enterprise', 6500.00, NULL::numeric, 'Soluzione enterprise completamente personalizzata', 
     '["Tutto di Ecommerce B", "Funzionalità enterprise", "Integrazioni custom", "Supporto dedicato 24/7", "SLA garantito", "Consulenza illimitata"]'::jsonb, 3)
) as level_data(tier_slug, level_code, name, price, original_price, description, features, sort_order)
where t.slug = level_data.tier_slug
on conflict (tier_id, level_code) do nothing;

-- ============================================
-- Insert initial optional services (Original Data)
-- ============================================
insert into public.optional_services (slug, name, description, category, base_price, features, sort_order) values
  -- Marketing Services
  ('influencer-collaboration', 'Collaborazioni Influencer', 'Gestione partnership con food influencer', 'marketing', 400.00,
   '[{"text": "Ricerca influencer"}, {"text": "Gestione contratti"}, {"text": "Coordinamento contenuti"}, {"text": "Misurazione risultati"}]'::jsonb, 4),
  ('social-media-management', 'Gestione Social Media', 'Gestione professionale dei tuoi canali social', 'marketing', 200.00,
   '[{"text": "3 post settimanali"}, {"text": "Risposta ai commenti"}, {"text": "Report mensile engagement"}, {"text": "Creazione contenuti"}]'::jsonb, 1),
  ('google-ads-campaign', 'Campagne Google Ads', 'Campagne pubblicitarie ottimizzate su Google', 'marketing', 300.00,
   '[{"text": "Setup campagna"}, {"text": "Ottimizzazione keywords"}, {"text": "A/B testing annunci"}, {"text": "Report ROI mensile"}]'::jsonb, 2),
  ('email-marketing', 'Email Marketing Avanzato', 'Sistema di email marketing automatizzato', 'marketing', 150.00,
   '[{"text": "Newsletter mensile"}, {"text": "Automazioni personalizzate"}, {"text": "Segmentazione clienti"}, {"text": "Analytics dettagliate"}]'::jsonb, 3),
  
  -- Technical Services
  ('mobile-app', 'App Mobile Dedicata', 'Applicazione mobile personalizzata per iOS e Android', 'technical', 2000.00,
   '[{"text": "Design personalizzato"}, {"text": "Notifiche push"}, {"text": "Programma fedeltà integrato"}, {"text": "Pubblicazione store"}]'::jsonb, 1),
  ('pos-integration', 'Integrazione POS', 'Collegamento con sistema POS esistente', 'technical', 500.00,
   '[{"text": "Sincronizzazione menu"}, {"text": "Gestione inventario real-time"}, {"text": "Report vendite unificati"}, {"text": "Training staff"}]'::jsonb, 2),
  ('api-custom', 'API Personalizzate', 'Sviluppo API per integrazioni custom', 'technical', 800.00,
   '[{"text": "Documentazione completa"}, {"text": "Endpoints personalizzati"}, {"text": "Autenticazione sicura"}, {"text": "Supporto integrazione"}]'::jsonb, 3),
  ('performance-optimization', 'Ottimizzazione Performance', 'Velocizzazione e ottimizzazione sito', 'technical', 300.00,
   '[{"text": "Audit performance"}, {"text": "Ottimizzazione immagini"}, {"text": "CDN setup"}, {"text": "Caching avanzato"}]'::jsonb, 4),
  
  -- Content Services
  ('photo-shooting', 'Servizio Fotografico', 'Shooting professionale piatti e location', 'content', 600.00,
   '[{"text": "4 ore shooting"}, {"text": "50 foto ritoccate"}, {"text": "Diritti utilizzo completi"}, {"text": "Formato web ottimizzato"}]'::jsonb, 1),
  ('video-production', 'Produzione Video', 'Video promozionali professionali', 'content', 1200.00,
   '[{"text": "Video 2-3 minuti"}, {"text": "Drone shots"}, {"text": "Montaggio professionale"}, {"text": "Formati social inclusi"}]'::jsonb, 2),
  ('copywriting-seo', 'Copywriting SEO', 'Testi ottimizzati per motori di ricerca', 'content', 250.00,
   '[{"text": "Analisi keywords"}, {"text": "20 pagine ottimizzate"}, {"text": "Meta descriptions"}, {"text": "Blog setup"}]'::jsonb, 3),
  ('menu-translation', 'Traduzione Menu', 'Traduzione professionale menu multilingua', 'content', 200.00,
   '[{"text": "3 lingue incluse"}, {"text": "Traduzione professionale"}, {"text": "Revisione madrelingua"}, {"text": "Aggiornamenti inclusi"}]'::jsonb, 4),
  
  -- Support Services  
  ('training-staff', 'Formazione Staff', 'Training completo per il personale', 'support', 400.00,
   '[{"text": "8 ore formazione"}, {"text": "Materiali didattici"}, {"text": "Certificazione"}, {"text": "Supporto post-training"}]'::jsonb, 1),
  ('dedicated-support', 'Supporto Dedicato', 'Account manager dedicato', 'support', 500.00,
   '[{"text": "Risposta prioritaria"}, {"text": "Check mensili"}, {"text": "Consulenza strategica"}, {"text": "Report personalizzati"}]'::jsonb, 2),
  ('backup-disaster', 'Backup & Disaster Recovery', 'Sistema backup automatico avanzato', 'support', 150.00,
   '[{"text": "Backup giornalieri"}, {"text": "Recovery <4 ore"}, {"text": "Storage sicuro"}, {"text": "Test recovery mensili"}]'::jsonb, 3)
on conflict (slug) do nothing;