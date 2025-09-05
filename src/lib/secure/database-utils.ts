import 'server-only'
import { getSupabaseServiceKey, getSupabaseUrl } from './server-utils'
import { createClient as createServiceClient } from '@supabase/supabase-js'

/**
 * Server-only database utilities.
 * These functions handle sensitive database operations with elevated privileges.
 */

// Create a Supabase client with service role (bypasses RLS)
export function createAdminClient() {
  return createServiceClient(
    getSupabaseUrl(),
    getSupabaseServiceKey(),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

// Batch insert with transaction-like behavior
export async function batchInsert<T extends Record<string, any>>(
  table: string,
  records: T[],
  options: { returnData?: boolean; upsert?: boolean } = {}
): Promise<T[] | null> {
  const supabase = createAdminClient()
  
  try {
    let query
    
    if (options.upsert) {
      query = supabase.from(table).upsert(records)
    } else {
      query = supabase.from(table).insert(records)
    }
    
    if (options.returnData) {
      const { data, error } = await query.select()
      if (error) throw error
      return data
    }
    
    const { error } = await query
    if (error) throw error
    return null
  } catch (error) {
    console.error(`Batch insert failed for table ${table}:`, error)
    throw error
  }
}


// Audit log for admin data changes
export async function createAdminAuditLog(
  adminId: string,
  action: string,
  tableName: string,
  recordId?: number,
  oldData?: Record<string, any>,
  newData?: Record<string, any>
) {
  const supabase = createAdminClient()
  
  try {
    await supabase.from('admin_audit_log').insert({
      admin_id: adminId,
      action,
      table_name: tableName,
      record_id: recordId || null,
      old_data: oldData || null,
      new_data: newData || null,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Failed to create admin audit log:', error)
  }
}


// Cleanup old records (for maintenance)
export async function cleanupOldRecords(
  table: string,
  dateField: string = 'created_at',
  daysOld: number = 90
): Promise<number> {
  const supabase = createAdminClient()
  const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000)
  
  try {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .lt(dateField, cutoffDate.toISOString())
      .select()
    
    if (error) throw error
    return data?.length || 0
  } catch (error) {
    console.error(`Cleanup failed for ${table}:`, error)
    return 0
  }
}

// Check table health
export async function checkTableHealth(table: string): Promise<{
  exists: boolean
  rowCount: number
  lastModified: Date | null
}> {
  const supabase = createAdminClient()
  
  try {
    const { count, error: countError } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
    
    if (countError) {
      return { exists: false, rowCount: 0, lastModified: null }
    }
    
    const { data: lastRecord, error: lastError } = await supabase
      .from(table)
      .select('created_at, updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()
    
    return {
      exists: true,
      rowCount: count || 0,
      lastModified: lastRecord?.updated_at
        ? new Date(lastRecord.updated_at)
        : lastRecord?.created_at
        ? new Date(lastRecord.created_at)
        : null,
    }
  } catch (error) {
    console.error(`Health check failed for ${table}:`, error)
    return { exists: false, rowCount: 0, lastModified: null }
  }
}