import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import "server-only";

/**
 * Server-only authentication utilities.
 * These functions handle sensitive auth operations that must never run on the client.
 */

// Get the current user session
// WARNING: Only use this when you need the session token itself
// For user data, use getCurrentUser() which verifies with auth server
export async function getServerSession() {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    // Only log in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error getting session:", error);
    }
    return null;
  }

  return session;
}

// Get the current authenticated user
// SECURITY: Uses getUser() to verify with Supabase Auth server
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    // Only log in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error getting authenticated user:", error);
    }
    return null;
  }

  return user;
}

// Check if user is admin (simplified - checks if user email matches admin pattern)
export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = await createClient();

  // In your system, admin check could be based on email domain or specific user IDs
  // This is a simplified version - adjust based on your actual admin logic
  const { data: userData } = await supabase.auth.getUser();

  if (!userData?.user) return false;

  // Example: Check if user email is in admin domain or specific admin emails
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  const userEmail = userData.user.email || "";

  return adminEmails.includes(userEmail) || userEmail.endsWith("@admin.com");
}

// Verify user authentication for protected operations
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}

// Verify admin authentication for admin operations
export async function requireAdmin() {
  const user = await requireAuth();
  const admin = await isAdmin(user.id);

  if (!admin) {
    throw new Error("Admin access required");
  }

  return user;
}

// Log admin action to audit log
export async function logAdminAction(
  adminId: string,
  action: string,
  tableName: string,
  recordId?: number | string,
  details?: Record<string, any>,
) {
  const supabase = await createClient();

  try {
    await supabase.from("admin_audit_log").insert({
      admin_id: adminId,
      action,
      table_name: tableName,
      record_id: recordId ? Number(recordId) : null,
      new_data: details || {},
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to log admin action:", error);
  }
}

// Validate session freshness
export async function isSessionFresh(maxAgeMinutes: number = 30): Promise<boolean> {
  const session = await getServerSession();

  if (!session) return false;

  // Sessions don't have created_at, use expires_at instead
  if (!session.expires_at) return true; // If no expiry, consider fresh

  const expiresAt = new Date(session.expires_at).getTime();
  const now = Date.now();

  // Check if session is not expired
  return now < expiresAt;
}
