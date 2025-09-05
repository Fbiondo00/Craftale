#!/usr/bin/env node

/**
 * Verification script for pricing system setup
 * Run with: npx tsx scripts/verify-pricing-setup.ts
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables manually from .env.local
try {
  const envPath = join(process.cwd(), '.env.local')
  const envFile = readFileSync(envPath, 'utf-8')
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=')
    if (key && value && !process.env[key]) {
      process.env[key] = value.trim()
    }
  })
} catch (error) {
  console.warn('Could not load .env.local, using existing environment variables')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function verifySetup() {
  console.log('🔍 Verifying Supabase Pricing Setup...\n')
  
  const results = {
    tables: { success: 0, failed: 0 },
    data: { success: 0, failed: 0 },
    functions: { success: 0, failed: 0 }
  }
  
  // Test 1: Check tables exist
  console.log('📊 Checking tables...')
  const tables = [
    'pricing_tiers',
    'pricing_levels',
    'optional_services',
    'user_quotes',
    'discounts',
    'time_slots',
    'pricing_config'
  ]
  
  for (const table of tables) {
    const { error } = await supabase.from(table).select('id').limit(1)
    if (error) {
      console.error(`  ❌ ${table}: ${error.message}`)
      results.tables.failed++
    } else {
      console.log(`  ✅ ${table}`)
      results.tables.success++
    }
  }
  
  // Test 2: Check initial data
  console.log('\n📦 Checking initial data...')
  
  const dataChecks = [
    { table: 'pricing_tiers', expected: 3, name: 'Pricing tiers' },
    { table: 'pricing_levels', expected: 9, name: 'Pricing levels' },
    { table: 'optional_services', expected: 15, name: 'Optional services' },
    { table: 'discounts', expected: 2, name: 'Sample discounts' },
    { table: 'time_slots', expected: 35, name: 'Time slots' },
    { table: 'pricing_config', expected: 7, name: 'Config values' }
  ]
  
  for (const check of dataChecks) {
    const { count, error } = await supabase
      .from(check.table)
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.error(`  ❌ ${check.name}: Error - ${error.message}`)
      results.data.failed++
    } else if (count !== check.expected) {
      console.error(`  ⚠️  ${check.name}: Found ${count}, expected ${check.expected}`)
      results.data.failed++
    } else {
      console.log(`  ✅ ${check.name}: ${count} records`)
      results.data.success++
    }
  }
  
  // Test 3: Check functions
  console.log('\n🔧 Checking database functions...')
  
  const functions = [
    { name: 'generate_quote_number', test: async () => {
      const { data, error } = await supabase.rpc('generate_quote_number')
      return { success: !error && data?.startsWith('Q-'), error }
    }},
    { name: 'get_available_time_slots', test: async () => {
      const today = new Date()
      const nextWeek = new Date()
      nextWeek.setDate(today.getDate() + 7)
      const { data, error } = await supabase.rpc('get_available_time_slots', {
        p_start_date: today.toISOString().split('T')[0],
        p_end_date: nextWeek.toISOString().split('T')[0]
      })
      return { success: !error && Array.isArray(data), error }
    }}
  ]
  
  for (const func of functions) {
    const result = await func.test()
    if (result.success) {
      console.log(`  ✅ ${func.name}`)
      results.functions.success++
    } else {
      console.error(`  ❌ ${func.name}: ${result.error?.message || 'Failed'}`)
      results.functions.failed++
    }
  }
  
  // Summary
  console.log('\n📊 Summary:')
  console.log(`Tables: ${results.tables.success}/${tables.length} ✅`)
  console.log(`Data: ${results.data.success}/${dataChecks.length} ✅`)
  console.log(`Functions: ${results.functions.success}/${functions.length} ✅`)
  
  const totalSuccess = results.tables.success + results.data.success + results.functions.success
  const totalExpected = tables.length + dataChecks.length + functions.length
  
  if (totalSuccess === totalExpected) {
    console.log('\n✅ All checks passed! Your pricing system is ready to use.')
  } else {
    console.log(`\n⚠️  Some checks failed (${totalSuccess}/${totalExpected} passed).`)
    console.log('Please check the errors above and run the missing migrations.')
  }
}

// Run verification
verifySetup().catch(console.error)