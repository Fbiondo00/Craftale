'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import type { PricingEventType } from '@/types/database-extended'

// Standardized action state type
export type ActionState = 
  | { success: true; data: { sessionId: string } }
  | { success: false; message: string }

// Get or create session ID
async function getSessionId(): Promise<string> {
  const cookieStore = await cookies()
  const existingSessionId = cookieStore.get('pricing_session_id')?.value
  
  if (existingSessionId) {
    return existingSessionId
  }
  
  // Generate new session ID
  const newSessionId = crypto.randomUUID()
  cookieStore.set('pricing_session_id', newSessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  })
  
  return newSessionId
}

// Track pricing journey event
export async function trackPricingJourneyAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  try {
    const eventType = formData.get('event_type') as PricingEventType
    const eventData = formData.get('event_data')
    const stepNumber = formData.get('step_number')
    
    console.log(`📊 SERVER: trackPricingJourneyAction called - Event: ${eventType}`)
    
    const sessionId = await getSessionId()
    const supabase = await createClient()
    const timeSpent = formData.get('time_spent')
    const quoteId = formData.get('quote_id')
    
    // Get user if authenticated
    const { data: { user } } = await supabase.auth.getUser()
    
    // Build insert payload; cast to any to bypass generated types mismatch on CI
    const insertData: any = {
      session_id: sessionId,
      user_id: user?.id ?? null,
      event_type: eventType,
      event_data: eventData ? JSON.parse(eventData as string) : {},
      // In server actions we don't have access to window/document; store null
      page_path: null,
      referrer: null,
      // Optional analytics fields if provided
      step_number: stepNumber ? Number(stepNumber) : null,
      time_spent: timeSpent ? Number(timeSpent) : null,
  quote_id: typeof quoteId === 'string' ? quoteId : null
    }

    const { error } = await supabase
      .from('pricing_journey_events' as any)
      .insert(insertData)
    
    if (error) {
      console.error('Error tracking pricing journey:', error)
      return {
        success: false,
        message: 'Failed to track event'
      }
    }
    
    return {
      success: true,
      data: { sessionId }
    }
  } catch (error) {
    console.error('Error in trackPricingJourneyAction:', error)
    return {
      success: false,
      message: 'Failed to track event'
    }
  }
}

// Track persona matcher analytics
export async function trackPersonaMatcherAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  try {
    const sessionId = await getSessionId()
    const supabase = await createClient()
    
    const stepType = formData.get('step_type') as 'tier_selection' | 'level_selection'
    const questions = formData.get('questions')
    const recommendation = formData.get('recommendation')
    const completed = formData.get('completed') === 'true'
    const abandonedAt = formData.get('abandoned_at_question')
    const totalTime = formData.get('total_time_seconds')
    
    // Get user if authenticated
    const { data: { user } } = await supabase.auth.getUser()
    
    const insertData = {
      session_id: sessionId,
      user_id: user?.id || null,
      questions: questions ? JSON.parse(questions as string) : {},
      answers: {},  // We don't have answers in the formData, using empty object
      matched_tier: stepType === 'tier_selection' ? recommendation : null,
      matched_level: stepType === 'level_selection' ? recommendation : null,
      confidence_score: completed ? 0.8 : 0.5,  // Default confidence scores
      recommendations: recommendation ? { recommendation } : {},
      metadata: {
        completed,
        abandoned_at_question: abandonedAt ? Number(abandonedAt) : null,
        total_time_seconds: totalTime ? Number(totalTime) : null
      }
    } as any  // Type assertion due to generated types mismatch
    
    const { error } = await supabase
      .from('persona_matcher_responses')
      .insert(insertData)
    
    if (error) {
      console.error('Error tracking persona matcher:', error)
      return {
        success: false,
        message: 'Failed to track persona matcher'
      }
    }
    
    return {
      success: true,
      data: { sessionId }
    }
  } catch (error) {
    console.error('Error in trackPersonaMatcherAction:', error)
    return {
      success: false,
      message: 'Failed to track persona matcher'
    }
  }
}

// Helper functions for direct server usage
export async function trackEvent(
  eventType: PricingEventType,
  eventData?: Record<string, any>,
  stepNumber?: number,
  quoteId?: string | number
) {
  const formData = new FormData()
  formData.set('event_type', eventType)
  if (eventData) formData.set('event_data', JSON.stringify(eventData))
  if (stepNumber !== undefined) formData.set('step_number', stepNumber.toString())
  if (quoteId) formData.set('quote_id', quoteId.toString())
  
  return trackPricingJourneyAction(null, formData)
}

export async function trackStepView(step: number) {
  return trackEvent('step_viewed', { step }, step)
}

export async function trackTierSelection(tierId: string | number, tierSlug: string) {
  return trackEvent('tier_selected', { tier_id: tierId, tier_slug: tierSlug })
}

export async function trackLevelSelection(levelId: string | number, levelCode: string) {
  return trackEvent('level_selected', { level_id: levelId, level_code: levelCode })
}

export async function trackServiceToggle(serviceId: string | number, selected: boolean) {
  return trackEvent(
    selected ? 'service_added' : 'service_removed',
    { service_id: serviceId }
  )
}