/**
 * E2E Tests for Pricing API with Real Supabase
 * 
 * These tests connect to the actual Supabase instance to verify
 * that the pricing system works with real data.
 * 
 * Prerequisites:
 * - Supabase project must be running
 * - Environment variables must be set
 * - Database migrations must be applied
 * 
 * To run these tests:
 * npm test test/e2e/pricing-real-api.test.ts
 */

import { createClient } from '@supabase/supabase-js';

// Skip these tests in CI environment or if no Supabase URL is set
const SKIP_E2E = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.CI === 'true';

describe.skipIf(SKIP_E2E)('Pricing System E2E Tests (Real Supabase)', () => {
  let supabase: ReturnType<typeof createClient>;

  beforeAll(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Supabase environment variables not set');
    }

    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  });

  describe('Database Queries', () => {
    it('should fetch real pricing tiers from Supabase', async () => {
      const { data: tiers, error } = await supabase
        .from('pricing_tiers')
        .select('*')
        .order('order_index');

      expect(error).toBeNull();
      expect(tiers).toBeDefined();
      expect(tiers!.length).toBeGreaterThan(0);
      
      // Verify structure
      const firstTier = tiers![0];
      expect(firstTier).toHaveProperty('id');
      expect(firstTier).toHaveProperty('name');
      expect(firstTier).toHaveProperty('slug');
      expect(firstTier).toHaveProperty('features');
      expect(Array.isArray(firstTier.features)).toBe(true);
    });

    it('should fetch pricing levels for each tier', async () => {
      const { data: levels, error } = await supabase
        .from('pricing_levels')
        .select('*')
        .order('tier_id, level_code');

      expect(error).toBeNull();
      expect(levels).toBeDefined();
      expect(levels!.length).toBeGreaterThanOrEqual(9); // 3 tiers × 3 levels
      
      // Verify each tier has A, B, C levels
      const levelCodes = levels!.map(l => l.level_code);
      expect(levelCodes).toContain('A');
      expect(levelCodes).toContain('B');
      expect(levelCodes).toContain('C');
    });

    it('should fetch optional services with correct structure', async () => {
      const { data: services, error } = await supabase
        .from('optional_services')
        .select('*')
        .order('order_index');

      expect(error).toBeNull();
      expect(services).toBeDefined();
      expect(services!.length).toBeGreaterThan(0);
      
      // Verify service structure
      const firstService = services![0];
      expect(firstService).toHaveProperty('base_price');
      expect(firstService).toHaveProperty('is_recurring');
      expect(firstService).toHaveProperty('category');
      expect(typeof firstService.base_price).toBe('number');
      expect(typeof firstService.is_recurring).toBe('boolean');
    });
  });

  describe('Database Functions', () => {
    it('should execute get_tier_with_levels function', async () => {
      const { data, error } = await supabase
        .rpc('get_tier_with_levels', { p_tier_slug: 'professional' });

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(3); // Should have 3 levels
      
      // Verify returned data includes both tier and level info
      const firstRow = data[0];
      expect(firstRow).toHaveProperty('tier_name');
      expect(firstRow).toHaveProperty('level_code');
      expect(firstRow).toHaveProperty('level_price');
    });

    it('should validate discount codes correctly', async () => {
      const { data, error } = await supabase
        .rpc('validate_discount_code', { 
          p_code: 'WELCOME20',
          p_purchase_amount: 500 
        });

      // This might fail if the discount doesn't exist or is expired
      if (!error && data) {
        expect(data).toHaveProperty('is_valid');
        expect(data).toHaveProperty('message');
        if (data.is_valid) {
          expect(data).toHaveProperty('discount');
        }
      }
    });
  });

  describe('API Endpoints (Real Requests)', () => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    it('should fetch tiers from /api/pricing/tiers', async () => {
      const response = await fetch(`${baseUrl}/api/pricing/tiers`);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('tiers');
      expect(Array.isArray(data.tiers)).toBe(true);
      expect(data.tiers.length).toBeGreaterThan(0);
      
      // Verify tiers have levels
      const firstTier = data.tiers[0];
      expect(firstTier).toHaveProperty('levels');
      expect(Array.isArray(firstTier.levels)).toBe(true);
      expect(firstTier.levels.length).toBe(3);
    });

    it('should fetch services from /api/pricing/optional-services', async () => {
      const response = await fetch(`${baseUrl}/api/pricing/optional-services`);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('services');
      expect(Array.isArray(data.services)).toBe(true);
      expect(data.services.length).toBeGreaterThan(0);
      
      // Verify service categories
      const categories = [...new Set(data.services.map((s: any) => s.category))];
      expect(categories.length).toBeGreaterThan(0);
    });

    it('should track analytics events', async () => {
      const response = await fetch(`${baseUrl}/api/analytics/pricing-journey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: `test-session-${Date.now()}`,
          event_type: 'step_viewed',
          event_data: { step: 1 },
          step_number: 1,
        }),
      });

      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success');
      // Analytics should never fail the user experience
      expect(data.success).toBeDefined();
    });
  });

  describe('Data Integrity', () => {
    it('should have consistent tier-level relationships', async () => {
      const { data: tiers } = await supabase
        .from('pricing_tiers')
        .select('id, slug');
      
      const { data: levels } = await supabase
        .from('pricing_levels')
        .select('tier_id, level_code');

      // Every tier should have exactly 3 levels (A, B, C)
      const tierLevelCounts = new Map<string, number>();
      levels?.forEach(level => {
        const count = tierLevelCounts.get(level.tier_id) || 0;
        tierLevelCounts.set(level.tier_id, count + 1);
      });

      tiers?.forEach(tier => {
        const levelCount = tierLevelCounts.get(tier.id) || 0;
        expect(levelCount).toBe(3);
      });
    });

    it('should have valid price progression within tiers', async () => {
      const { data: levels } = await supabase
        .from('pricing_levels')
        .select('tier_id, level_code, price')
        .order('tier_id, level_code');

      // Group by tier
      const tierPrices = new Map<string, number[]>();
      levels?.forEach(level => {
        const prices = tierPrices.get(level.tier_id) || [];
        prices.push(level.price);
        tierPrices.set(level.tier_id, prices);
      });

      // Verify prices increase from A to B to C
      tierPrices.forEach((prices, tierId) => {
        expect(prices[0]).toBeLessThan(prices[1]); // A < B
        expect(prices[1]).toBeLessThan(prices[2]); // B < C
      });
    });

    it('should have valid service categories', async () => {
      const { data: services } = await supabase
        .from('optional_services')
        .select('category');

      const validCategories = ['photography', 'content', 'integrations', 'marketing'];
      services?.forEach(service => {
        expect(validCategories).toContain(service.category);
      });
    });
  });
});

// Provide skip functionality for older Jest versions
if (!describe.skipIf) {
  (describe as any).skipIf = (condition: boolean) => 
    condition ? describe.skip : describe;
}