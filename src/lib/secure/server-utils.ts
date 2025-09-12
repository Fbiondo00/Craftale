import "server-only";

/**
 * Server-only utility functions for secure operations.
 * These functions are protected from client-side imports.
 */

// Environment variable access
export function getSupabaseServiceKey(): string {
  // Support multiple env var names for developer convenience:
  // - NEXT_SERVICE_ROLE_KEY (used in this repo)
  // - SUPABASE_SERVICE_ROLE_KEY (common convention)
  // - NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY (less likely)
  const key =
    process.env.NEXT_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
    "";

  if (!key) {
    throw new Error(
      "Supabase service role key is not configured (expected NEXT_SERVICE_ROLE_KEY or SUPABASE_SERVICE_ROLE_KEY)",
    );
  }

  return key;
}

export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured");
  }
  return url;
}

export function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured");
  }
  return key;
}

// Server-side configuration
export function getServerConfig() {
  return {
    supabase: {
      url: getSupabaseUrl(),
      anonKey: getSupabaseAnonKey(),
      serviceKey: getSupabaseServiceKey(),
    },
    security: {
      maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || "5", 10),
      sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || "86400", 10), // 24 hours
      rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10),
      },
    },
    features: {
      enableAnalytics: process.env.ENABLE_ANALYTICS === "true",
      enableRateLimiting: process.env.ENABLE_RATE_LIMITING !== "false",
      enableSecurityHeaders: process.env.ENABLE_SECURITY_HEADERS !== "false",
    },
  };
}

// Secure token generation
export function generateSecureToken(): string {
  return crypto.randomUUID();
}

// IP address validation
export function isValidIP(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

// Sanitize user input for logging
export function sanitizeForLog(input: unknown): string {
  if (typeof input !== "string") {
    return JSON.stringify(input).slice(0, 100);
  }
  // Remove potential injection patterns
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .slice(0, 200);
}

// Check if request is from allowed origin
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment && origin.includes("localhost")) {
    return true;
  }

  return allowedOrigins.includes(origin);
}
