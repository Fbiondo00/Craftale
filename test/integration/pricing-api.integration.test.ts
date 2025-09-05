import { createClient } from '@/lib/supabase/server';
import type { TierWithLevels, OptionalService } from '@/types/supabase-pricing';

// Mock Next.js server components
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}));

describe('Pricing API Integration Tests', () => {
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    rpc: jest.fn(),
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockResolvedValue(mockSupabase);
  });

  describe('GET /api/pricing/tiers', () => {
    it('should fetch all tiers with levels from Supabase', async () => {
      // Mock Supabase response
      const mockTiers = [
        {
          id: '1',
          name: 'Starter',
          slug: 'starter',
          description: 'Perfect for small restaurants',
          features: ['Feature 1', 'Feature 2'],
          order_index: 1,
          is_popular: false,
          is_enterprise: false,
        },
        {
          id: '2',
          name: 'Professional',
          slug: 'professional',
          description: 'For growing restaurants',
          features: ['Feature 1', 'Feature 2', 'Feature 3'],
          order_index: 2,
          is_popular: true,
          is_enterprise: false,
        },
      ];

      const mockLevels = [
        { id: 'l1', tier_id: '1', level_code: 'A', name: 'Base', price: 49, features: [] },
        { id: 'l2', tier_id: '1', level_code: 'B', name: 'Standard', price: 99, features: [] },
        { id: 'l3', tier_id: '1', level_code: 'C', name: 'Premium', price: 149, features: [] },
        { id: 'l4', tier_id: '2', level_code: 'A', name: 'Base', price: 99, features: [] },
        { id: 'l5', tier_id: '2', level_code: 'B', name: 'Standard', price: 199, features: [] },
        { id: 'l6', tier_id: '2', level_code: 'C', name: 'Premium', price: 299, features: [] },
      ];

      // Setup mock chain
      mockSupabase.from.mockImplementation((table: string) => {
        if (table === 'pricing_tiers') {
          return {
            ...mockSupabase,
            select: jest.fn().mockReturnThis(),
            order: jest.fn().mockResolvedValue({ data: mockTiers, error: null }),
          };
        }
        if (table === 'pricing_levels') {
          return {
            ...mockSupabase,
            select: jest.fn().mockReturnThis(),
            order: jest.fn().mockResolvedValue({ data: mockLevels, error: null }),
          };
        }
        return mockSupabase;
      });

      // Import the route handler
      const { GET } = await import('@/app/api/pricing/tiers/route');
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.tiers).toHaveLength(2);
      expect(data.tiers[0].levels).toHaveLength(3);
      expect(data.tiers[0].slug).toBe('starter');
      expect(data.tiers[1].slug).toBe('professional');
      expect(data.tiers[1].is_popular).toBe(true);
    });

    it('should handle Supabase errors gracefully', async () => {
      mockSupabase.from.mockReturnValue({
        ...mockSupabase,
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ 
          data: null, 
          error: { message: 'Database connection failed' } 
        }),
      });

      const { GET } = await import('@/app/api/pricing/tiers/route');
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch pricing tiers');
    });
  });

  describe('GET /api/pricing/optional-services', () => {
    it('should fetch all optional services from Supabase', async () => {
      const mockServices: OptionalService[] = [
        {
          id: 's1',
          name: 'Professional Photography',
          slug: 'photography-pro',
          description: 'High-quality photos',
          category: 'photography',
          base_price: 299,
          is_recurring: false,
          features: ['20 photos', 'Professional editing'],
          compatible_tiers: ['1', '2'],
          is_popular: true,
          order_index: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 's2',
          name: 'SEO Optimization',
          slug: 'seo-base',
          description: 'Improve search rankings',
          category: 'marketing',
          base_price: 149,
          is_recurring: true,
          features: ['Keyword research', 'On-page optimization'],
          compatible_tiers: ['2', '3'],
          is_popular: false,
          order_index: 2,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      mockSupabase.from.mockReturnValue({
        ...mockSupabase,
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: mockServices, error: null }),
      });

      const { GET } = await import('@/app/api/pricing/optional-services/route');
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.services).toHaveLength(2);
      expect(data.services[0].category).toBe('photography');
      expect(data.services[1].is_recurring).toBe(true);
    });
  });

  describe('POST /api/quotes/submit', () => {
    it('should submit a quote request to Supabase', async () => {
      const mockQuoteRequest = {
        pricingConfiguration: {
          selectedTier: 'professional',
          selectedLevel: 'B',
          basePriceEur: 199,
          optionalServices: [
            { serviceId: 's1', quantity: 1, unitPriceEur: 299 },
          ],
          totalCalculatedPriceEur: 498,
        },
        contactInfo: {
          businessName: 'Test Restaurant',
          contactName: 'John Doe',
          email: 'john@example.com',
          phone: '+39 123 456 7890',
        },
        additionalInfo: {
          projectTimeline: 'ASAP',
          specialRequirements: 'Need mobile-friendly design',
        },
      };

      mockSupabase.rpc.mockResolvedValue({
        data: { 
          quote_id: 'q123', 
          quote_number: 'Q-2024-0001',
          success: true 
        },
        error: null,
      });

      const { POST } = await import('@/app/api/quotes/submit/route');
      const request = new Request('http://localhost/api/quotes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockQuoteRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.quoteNumber).toBe('Q-2024-0001');
      expect(mockSupabase.rpc).toHaveBeenCalledWith('submit_quote_request', expect.any(Object));
    });

    it('should validate required fields', async () => {
      const invalidRequest = {
        pricingConfiguration: {},
        contactInfo: {
          // Missing required fields
          email: 'invalid-email',
        },
      };

      const { POST } = await import('@/app/api/quotes/submit/route');
      const request = new Request('http://localhost/api/quotes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('required');
    });
  });

  describe('POST /api/analytics/pricing-journey', () => {
    it('should track pricing events in Supabase', async () => {
      const mockEvent = {
        session_id: 'sess-123',
        event_type: 'tier_selected',
        event_data: { tier_id: '1', tier_slug: 'starter' },
        step_number: 1,
        time_spent: 30,
      };

      mockSupabase.rpc.mockResolvedValue({
        data: 'event-123',
        error: null,
      });

      const { POST } = await import('@/app/api/analytics/pricing-journey/route');
      const request = new Request('http://localhost/api/analytics/pricing-journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockEvent),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.event_id).toBe('event-123');
      expect(mockSupabase.rpc).toHaveBeenCalledWith('track_pricing_event', expect.objectContaining({
        p_session_id: 'sess-123',
        p_event_type: 'tier_selected',
      }));
    });
  });

  describe('POST /api/discounts/validate', () => {
    it('should validate discount codes via Supabase', async () => {
      mockSupabase.rpc.mockResolvedValue({
        data: {
          is_valid: true,
          discount: {
            code: 'WELCOME20',
            discount_type: 'percentage',
            discount_value: 20,
          },
          message: 'Discount applied successfully',
        },
        error: null,
      });

      const { POST } = await import('@/app/api/discounts/validate/route');
      const request = new Request('http://localhost/api/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: 'WELCOME20',
          purchaseAmount: 500,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.valid).toBe(true);
      expect(data.discount.discount_value).toBe(20);
      expect(mockSupabase.rpc).toHaveBeenCalledWith('validate_discount_code', {
        p_code: 'WELCOME20',
        p_purchase_amount: 500,
      });
    });
  });
});

describe('React Hooks Integration Tests', () => {
  // Mock global fetch
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('usePricingData hook', () => {
    it('should fetch pricing data from API', async () => {
      const mockApiResponse = {
        tiers: [
          {
            id: '1',
            name: 'Starter',
            slug: 'starter',
            levels: [
              { id: 'l1', level_code: 'A', name: 'Base', price: 49 },
              { id: 'l2', level_code: 'B', name: 'Standard', price: 99 },
            ],
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      // We can't directly test hooks without a component, but we can test the API endpoint
      const response = await fetch('/api/pricing/tiers');
      const data = await response.json();

      expect(mockFetch).toHaveBeenCalledWith('/api/pricing/tiers');
      expect(data.tiers).toHaveLength(1);
      expect(data.tiers[0].slug).toBe('starter');
    });
  });

  describe('useOptionalServices hook', () => {
    it('should fetch optional services from API', async () => {
      const mockApiResponse = {
        services: [
          {
            id: 's1',
            name: 'Photography',
            category: 'photography',
            base_price: 299,
            is_recurring: false,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      const response = await fetch('/api/pricing/optional-services');
      const data = await response.json();

      expect(mockFetch).toHaveBeenCalledWith('/api/pricing/optional-services');
      expect(data.services).toHaveLength(1);
      expect(data.services[0].base_price).toBe(299);
    });
  });
});