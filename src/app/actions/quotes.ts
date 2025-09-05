'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { QuoteDraftSchema, QuoteSubmissionSchema, ApplyDiscountSchema } from '@/lib/validations/quote'
import { calculateQuoteTotals } from '@/lib/pricing/calculations'

// Standardized action state type
export type ActionState = 
  | { success: true; data: any }
  | { success: false; message: string; errors?: Record<string, string[]> }

// Save or update draft quote
export async function saveDraftAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return {
        success: false,
        message: 'Authentication required'
      }
    }
    
    // Parse and validate form data
    const rawData = {
      tier_id: formData.get('tier_id'),
      level_id: formData.get('level_id'),
      selected_services: formData.getAll('selected_services'),
      notes: formData.get('notes'),
      contact_preferences: formData.get('contact_preferences')
    }
    
    console.log('💾 SERVER: saveDraftAction called with data:', {
      tier_id: rawData.tier_id,
      tier_id_type: typeof rawData.tier_id,
      level_id: rawData.level_id,
      level_id_type: typeof rawData.level_id,
      selected_services: rawData.selected_services,
      notes: rawData.notes ? 'has notes' : 'no notes',
      contact_preferences: rawData.contact_preferences ? 'has contact_preferences' : 'no contact_preferences'
    })
    
    const validation = QuoteDraftSchema.safeParse(rawData)
    if (!validation.success) {
      console.error('❌ Validation failed:', {
        rawData,
        errors: validation.error.flatten().fieldErrors,
        formErrors: validation.error.flatten().formErrors
      })
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors
      }
    }
    
    const data = validation.data
    
    // Try to find existing draft
    const { data: drafts, error: checkError } = await supabase
      .from('user_quotes')
      .select('id, created_at')
      .eq('user_id', user.id)
      .eq('status', 'draft')
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (checkError) {
      console.error('Error checking for existing draft:', checkError)
      return {
        success: false,
        message: 'Failed to check for existing draft'
      }
    }
    
    const existingQuote = drafts && drafts.length > 0 ? drafts[0] : null
    let quoteId: number
    
    if (existingQuote) {
      // Update existing draft
      const updateData: any = {
        tier_id: data.tier_id,
        level_id: data.level_id,
        selected_services: data.selected_services,
        updated_at: new Date().toISOString(),
        metadata: {
          last_updated: new Date().toISOString(),
          update_source: 'saveDraftAction'
        }
      }
      
      // Handle contact preferences if provided
      if (rawData.contact_preferences) {
        try {
          updateData.contact_preferences = JSON.parse(rawData.contact_preferences as string);
        } catch (e) {
          console.error('Failed to parse contact_preferences:', e);
        }
      }
      
      // Handle notes separately if provided
      if (data.notes) {
        updateData.notes = data.notes;
      }
      
      const { data: updated, error: updateError } = await supabase
        .from('user_quotes')
        .update(updateData)
        .eq('id', existingQuote.id)
        .select()
        .single()
      
      if (updateError) {
        console.error('Error updating draft:', updateError)
        return {
          success: false,
          message: 'Failed to update draft'
        }
      }
      
      quoteId = updated.id
    } else {
      // Create new draft
      const insertData: any = {
        user_id: user.id,
        status: 'draft',
        tier_id: data.tier_id,
        level_id: data.level_id,
        selected_services: data.selected_services,
        metadata: {
          created_source: 'server_action',
          created_at: new Date().toISOString()
        }
      }
      
      // Handle contact preferences if provided
      if (rawData.contact_preferences) {
        try {
          insertData.contact_preferences = JSON.parse(rawData.contact_preferences as string);
        } catch (e) {
          console.error('Failed to parse contact_preferences:', e);
        }
      }
      
      // Handle notes separately if provided
      if (data.notes) {
        insertData.notes = data.notes;
      }
      
      const { data: created, error: createError } = await supabase
        .from('user_quotes')
        .insert(insertData)
        .select()
        .single()
      
      if (createError) {
        console.error('Error creating draft:', createError)
        return {
          success: false,
          message: 'Failed to create draft'
        }
      } else {
        quoteId = created.id
      }
    }
    
    // Calculate totals
    try {
      await calculateQuoteTotals(quoteId.toString())
    } catch (calcError) {
      console.error('Error calculating totals:', calcError)
    }
    
    // Revalidate the pricing page to show updated draft
    revalidatePath('/pricing')
    
    return {
      success: true,
      data: { 
        message: 'Draft saved successfully',
        quote_id: quoteId 
      }
    }
  } catch (error) {
    console.error('Error in saveDraftAction:', error)
    return {
      success: false,
      message: 'An unexpected error occurred'
    }
  }
}

// Submit quote for approval
export async function submitQuoteAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return {
        success: false,
        message: 'Authentication required'
      }
    }
    
    // Get quote ID
    const quoteId = parseInt(formData.get('quote_id')?.toString() || '0', 10)
    if (!quoteId) {
      return {
        success: false,
        message: 'No draft quote to submit'
      }
    }
    
    // Verify quote belongs to user and is in draft status
    const { data: quote, error: quoteError } = await supabase
      .from('user_quotes')
      .select('*')
      .eq('id', quoteId)
      .eq('user_id', user.id)
      .eq('status', 'draft')
      .single()
    
    if (quoteError || !quote) {
      return {
        success: false,
        message: 'Quote not found or not in draft status'
      }
    }
    
    // Validate quote has required fields
    if (!quote.tier_id || !quote.level_id) {
      return {
        success: false,
        message: 'Please select a package before submitting'
      }
    }
    
    // Get quote expiry days from config
    const { data: expiryConfig } = await supabase
      .from('pricing_config')
      .select('config_value')
      .eq('config_key', 'quote_expiry_days')
      .single()
    
    const expiryDays = Number(expiryConfig?.config_value || 30)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + expiryDays)
    
    // Update quote status
    const { data: updated, error: updateError } = await supabase
      .from('user_quotes')
      .update({
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', quoteId)
      .select()
      .single()
    
    if (updateError) {
      console.error('Error updating quote status:', updateError)
      return {
        success: false,
        message: 'Failed to submit quote'
      }
    }
    
    // Revalidate the pricing page
    revalidatePath('/pricing')
    revalidatePath('/quotes')
    
    return {
      success: true,
      data: {
        message: 'Quote submitted successfully',
        quote_id: updated.id,
        quote_number: updated.quote_number,
        expires_at: updated.expires_at
      }
    }
  } catch (error) {
    console.error('Error in submitQuoteAction:', error)
    return {
      success: false,
      message: 'An unexpected error occurred'
    }
  }
}

// Apply discount code to quote
export async function applyDiscountAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return {
        success: false,
        message: 'Authentication required'
      }
    }
    
    // Parse and validate form data
    const rawData = {
      quote_id: formData.get('quote_id'),
      discount_code: formData.get('discount_code')
    }
    
    const validation = ApplyDiscountSchema.safeParse(rawData)
    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validation.error.flatten().fieldErrors
      }
    }
    
    const { quote_id, discount_code } = validation.data
    
    // Verify quote belongs to user
    const { data: quote, error: quoteError } = await supabase
      .from('user_quotes')
      .select('id, user_id')
      .eq('id', quote_id)
      .eq('user_id', user.id)
      .single()
    
    if (quoteError || !quote) {
      return {
        success: false,
        message: 'Quote not found'
      }
    }
    
    // Apply discount using database function
    const { data, error } = await supabase
      .rpc('apply_discount_to_quote', {
        p_quote_id: quote_id,
        p_discount_code: discount_code
      })
      .single()
    
    if (error) {
      console.error('Error applying discount:', error)
      return {
        success: false,
        message: 'Failed to apply discount'
      }
    }
    
    const discountResult = data as { 
      success: boolean
      message?: string
      discount_amount?: number 
    }
    
    if (!discountResult.success) {
      return {
        success: false,
        message: discountResult.message || 'Invalid discount code'
      }
    }
    
    // Revalidate the pricing page
    revalidatePath('/pricing')
    
    return {
      success: true,
      data: {
        message: discountResult.message || 'Discount applied successfully',
        discount_amount: discountResult.discount_amount
      }
    }
  } catch (error) {
    console.error('Error in applyDiscountAction:', error)
    return {
      success: false,
      message: 'An unexpected error occurred'
    }
  }
}

// Check for active quotes (draft or recently submitted)
export async function checkActiveQuoteAction(): Promise<ActionState> {
  try {
    console.log('🔍 SERVER: checkActiveQuoteAction called')
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.log('🔍 SERVER: checkActiveQuoteAction - No authenticated user')
      return {
        success: false,
        message: 'Authentication required'
      }
    }
    
    console.log(`🔍 SERVER: checkActiveQuoteAction - Checking quotes for user: ${user.id}`)
    
    // Check for recently submitted quote (within last 24 hours)
    // const recentDate = new Date()
    // recentDate.setDate(recentDate.getDate() - 1)
    
    const { data: recentQuote } = await supabase
      .from('user_quotes')
      .select(`
        id,
        quote_number,
        status,
        submitted_at,
        tier_id,
        level_id,
        selected_services,
        base_price,
        services_price,
        total_price,
        notes,
        metadata,
        contact_preferences,
        pricing_tiers!inner(name, slug),
        pricing_levels!inner(name, level_code, price)
      `)
      .eq('user_id', user.id)
      .eq('status', 'submitted')
      //.gte('submitted_at', recentDate.toISOString())
      .order('submitted_at', { ascending: false })
      .limit(1)
      .single()
    
    if (recentQuote) {
      return {
        success: true,
        data: {
          type: 'active',
          quote: recentQuote,
          can_create_new: false,
          message: `You have recently submitted quote #${recentQuote.quote_number}`
        }
      }
    }
    
    // Check for draft quote
    const { data: draftQuote } = await supabase
      .from('user_quotes')
      .select(`
        id,
        quote_number,
        status,
        created_at,
        tier_id,
        level_id,
        selected_services,
        base_price,
        services_price,
        total_price,
        notes,
        metadata,
        contact_preferences,
        pricing_tiers(name, slug),
        pricing_levels(name, level_code, price)
      `)
      .eq('user_id', user.id)
      .eq('status', 'draft')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (draftQuote) {
      return {
        success: true,
        data: {
          type: 'draft',
          quote: draftQuote,
          can_create_new: true,
          can_continue: true
        }
      }
    }
    
    // No active quotes
    return {
      success: true,
      data: {
        type: 'none',
        can_create_new: true
      }
    }
  } catch (error) {
    console.error('Error checking active quotes:', error)
    return {
      success: false,
      message: 'Failed to check active quotes'
    }
  }
}

// Load current draft quote
export async function loadDraftAction(): Promise<ActionState> {
  try {
    console.log('📋 SERVER: loadDraftAction called')
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.log('📋 SERVER: loadDraftAction - No authenticated user')
      return {
        success: false,
        message: 'Authentication required'
      }
    }
    
    console.log(`📋 SERVER: loadDraftAction - Loading draft for user: ${user.id}`)
    
    // Get current draft
    const { data: draft, error } = await supabase
      .from('user_quotes')
      .select(`
        *,
        pricing_tiers (
          id,
          name,
          slug
        ),
        pricing_levels (
          id,
          name,
          level_code,
          price
        )
      `)
      .eq('user_id', user.id)
      .eq('status', 'draft')
      .single()
    
    if (error && error.code !== 'PGRST116') {
      // Not found is ok
      console.error('Error fetching draft:', error)
      return {
        success: false,
        message: 'Failed to fetch draft'
      }
    }
    
    return {
      success: true,
      data: { draft: draft || null }
    }
  } catch (error) {
    console.error('Error in loadDraftAction:', error)
    return {
      success: false,
      message: 'An unexpected error occurred'
    }
  }
}