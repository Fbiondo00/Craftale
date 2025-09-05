'use server'

// Server Actions for pricing data
// These use direct calls instead of FormData for efficient data fetching

import { createClient } from '@/lib/supabase/server'
import type { TierWithLevels } from '@/types/database-extended'

// Server Action to get pricing tiers with levels
// Called directly from Server and Client Components for data fetching
export async function getPricingTiers() {
  try {
    const supabase = await createClient()
    
    // Fetch tiers with their levels
    const { data: tiers, error } = await supabase
      .from('pricing_tiers')
      .select(`
        *,
        pricing_levels (
          id,
          level_code,
          name,
          price,
          original_price,
          features,
          sort_order,
          is_active
        )
      `)
      .eq('is_active', true)
      .order('sort_order')
      
    if (error) {
      console.error('Error fetching pricing tiers:', error)
      throw error
    }
    
    // Transform data to match expected format
    const tiersWithLevels: TierWithLevels[] = (tiers || []).map(tier => ({
      id: tier.id,
      slug: tier.slug,
      name: tier.name,
      description: tier.description,
      target_audience: tier.target_audience,
      levels: (tier.pricing_levels || [])
        .filter((level: any) => level.is_active)
        .sort((a: any, b: any) => a.level_code.localeCompare(b.level_code))
        .map((level: any) => ({
          id: level.id,
          level_code: level.level_code,
          name: level.name,
          price: level.price,
          original_price: level.original_price,
          features: level.features || []
        }))
    }))
    
    return {
      success: true,
      tiers: tiersWithLevels
    }
  } catch (error) {
    console.error('Error in getPricingTiersAction:', error)
    return {
      success: false,
      error: 'Failed to fetch pricing data'
    }
  }
}

// Alias for backward compatibility
export const getPricingTiersAction = getPricingTiers