import { createClient } from '@/lib/supabase/server';

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export async function getSession() {
  const supabase = await createClient();
  
  // WARNING: getSession() returns unverified data from cookies
  // Only use this when you need the session token itself
  const { data: { session } } = await supabase.auth.getSession();
  
  return session;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const supabase = await createClient();
  
  // First check if we have a session at all (from cookies)
  const { data: { session } } = await supabase.auth.getSession();
  
  // If no session exists, return null (user not logged in)
  // This prevents unnecessary getUser() calls that would fail
  if (!session) {
    return null;
  }
  
  // SECURITY: Now verify the session with getUser()
  // This validates the JWT with Supabase Auth server
  const { data: { user }, error } = await supabase.auth.getUser();
  
  // Handle AuthSessionMissingError specifically
  if (error) {
    // AuthSessionMissingError means no valid JWT - treat as unauthenticated
    if (error.message?.includes('Auth session missing')) {
      // This is expected when session is invalid/expired - not an error
      return null;
    }
    
    // Only log other unexpected errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching authenticated user:', error);
    }
    return null;
  }
  
  // If no user despite having a session, return null
  if (!user) {
    return null;
  }
  
  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
    avatar: user.user_metadata?.avatar || 
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
  };
}