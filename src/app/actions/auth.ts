"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Input validation helpers
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
  // At least 8 characters
  return password.length >= 8;
}

export async function signInAction(email: string, password: string, rememberMe: boolean = false) {
  // SECURITY: Validate inputs server-side
  if (!email || !password) {
    return {
      success: false,
      error: "Invalid input",
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      error: "Invalid email format",
    };
  }

  if (!isValidPassword(password)) {
    return {
      success: false,
      error: "Invalid password format",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Return error for client to handle
    return {
      success: false,
      error: error.message,
    };
  }

  // Revalidate paths that show user state
  // Revalidate root layout to update header
  revalidatePath("/", "layout");
  // Also revalidate specific pages that show user data
  revalidatePath("/");
  revalidatePath("/pricing");
  revalidatePath("/dashboard");

  // SECURITY: Only return minimal user data needed by client
  return {
    success: true,
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
          user_metadata: {
            name: data.user.user_metadata?.name,
            avatar: data.user.user_metadata?.avatar,
          },
        }
      : null,
  };
}

export async function signUpAction(email: string, password: string, name: string) {
  // SECURITY: Validate inputs server-side
  if (!email || !password || !name) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      error: "Invalid email format",
    };
  }

  if (!isValidPassword(password)) {
    return {
      success: false,
      error: "Password must be at least 8 characters",
    };
  }

  if (name.trim().length < 2) {
    return {
      success: false,
      error: "Name must be at least 2 characters",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/confirm`,
    },
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  // Check if email confirmation is required
  if (data.user && !data.session) {
    // SECURITY: Only return minimal user data
    return {
      success: true,
      needsEmailConfirmation: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        user_metadata: {
          name: data.user.user_metadata?.name,
          avatar: data.user.user_metadata?.avatar,
        },
      },
    };
  }

  // If auto-confirmed, revalidate paths
  if (data.user && data.session) {
    revalidatePath("/", "layout");
    revalidatePath("/");
    revalidatePath("/pricing");
    revalidatePath("/dashboard");

    // SECURITY: Only return minimal user data
    return {
      success: true,
      needsEmailConfirmation: false,
      user: {
        id: data.user.id,
        email: data.user.email,
        user_metadata: {
          name: data.user.user_metadata?.name,
          avatar: data.user.user_metadata?.avatar,
        },
      },
    };
  }

  return {
    success: false,
    error: "Unexpected error during sign up",
  };
}

export async function signOutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  // Revalidate all paths after sign out
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/pricing");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function resetPasswordAction(email: string) {
  // SECURITY: Validate input
  if (!email || !isValidEmail(email)) {
    // Still return success to prevent enumeration
    return { success: true };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/confirm`,
  });

  // Always return success to prevent user enumeration
  // The email will only be sent if the account exists
  return { success: true };
}

export async function resendConfirmationAction(email: string) {
  // SECURITY: Validate input
  if (!email || !isValidEmail(email)) {
    // Still return success to prevent enumeration
    return { success: true };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });

  // Always return success to prevent user enumeration
  return { success: true };
}
