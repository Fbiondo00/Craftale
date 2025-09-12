/**
 * Input Sanitization Utility
 * Provides secure sanitization for various input types across the application
 */

/**
 * HTML entities that should be escaped
 */
const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(str: string): string {
  if (typeof str !== "string") return "";

  return str.replace(/[&<>"'`=\/]/g, char => HTML_ENTITIES[char] || char);
}

/**
 * Remove all HTML tags from a string
 */
export function stripHtml(str: string): string {
  if (typeof str !== "string") return "";

  // Remove script tags and their content first
  let cleaned = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  // Remove style tags and their content
  cleaned = cleaned.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  // Remove all remaining HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, "");
  // Decode HTML entities
  const textarea = document.createElement("textarea");
  textarea.innerHTML = cleaned;
  return textarea.value;
}

/**
 * Sanitize user input for safe storage and display
 */
export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
  maxLength?: number;
  trim?: boolean;
  lowercase?: boolean;
  removeSpaces?: boolean;
  alphanumericOnly?: boolean;
}

export function sanitizeInput(input: string, options: SanitizeOptions = {}): string {
  if (typeof input !== "string") return "";

  let sanitized = input;

  // Apply max length first to avoid processing unnecessarily long strings
  if (options.maxLength && sanitized.length > options.maxLength) {
    sanitized = sanitized.substring(0, options.maxLength);
  }

  // Remove all HTML by default unless specific tags are allowed
  if (options.allowedTags && options.allowedTags.length > 0) {
    // This is a simplified version - for production, use a library like DOMPurify
    sanitized = stripDangerousTags(sanitized, options.allowedTags);
  } else {
    sanitized = escapeHtml(sanitized);
  }

  // Trim whitespace
  if (options.trim !== false) {
    sanitized = sanitized.trim();
  }

  // Convert to lowercase
  if (options.lowercase) {
    sanitized = sanitized.toLowerCase();
  }

  // Remove all spaces
  if (options.removeSpaces) {
    sanitized = sanitized.replace(/\s+/g, "");
  }

  // Keep only alphanumeric characters
  if (options.alphanumericOnly) {
    sanitized = sanitized.replace(/[^a-zA-Z0-9]/g, "");
  }

  return sanitized;
}

/**
 * Strip dangerous tags while allowing safe ones
 */
function stripDangerousTags(html: string, allowedTags: string[]): string {
  // List of always dangerous tags
  const dangerousTags = [
    "script",
    "style",
    "iframe",
    "frame",
    "frameset",
    "object",
    "embed",
    "applet",
    "link",
    "meta",
    "base",
    "form",
  ];

  let cleaned = html;

  // Remove dangerous tags
  dangerousTags.forEach(tag => {
    const regex = new RegExp(`<${tag}\\b[^<]*(?:(?!<\\/${tag}>)<[^<]*)*<\\/${tag}>`, "gi");
    cleaned = cleaned.replace(regex, "");
    // Also remove self-closing versions
    cleaned = cleaned.replace(new RegExp(`<${tag}\\b[^>]*\\/?>`, "gi"), "");
  });

  // Remove event handlers
  cleaned = cleaned.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
  cleaned = cleaned.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, "");

  // Remove javascript: protocol
  cleaned = cleaned.replace(/javascript:/gi, "");

  // Escape all tags not in allowed list
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;

  cleaned = cleaned.replace(tagRegex, (match, tagName) => {
    if (allowedTags.includes(tagName.toLowerCase())) {
      return match;
    }
    return escapeHtml(match);
  });

  return cleaned;
}

/**
 * Sanitize email addresses
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== "string") return "";

  // Convert to lowercase and trim
  let sanitized = email.toLowerCase().trim();

  // Remove any characters that aren't typically in email addresses
  sanitized = sanitized.replace(/[^a-z0-9@._+-]/gi, "");

  // Basic email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(sanitized)) {
    return "";
  }

  return sanitized;
}

/**
 * Sanitize URLs to prevent javascript: and data: protocols
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== "string") return "";

  const trimmed = url.trim();

  // Block dangerous protocols
  const dangerousProtocols = ["javascript:", "data:", "vbscript:", "file:", "about:"];

  const lowerUrl = trimmed.toLowerCase();
  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return "";
    }
  }

  // Ensure URL starts with http://, https://, or / for relative URLs
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://") && !trimmed.startsWith("/")) {
    return "";
  }

  return trimmed;
}

/**
 * Sanitize JSON strings to prevent injection
 */
export function sanitizeJson(jsonString: string): object | null {
  if (typeof jsonString !== "string") return null;

  try {
    // Parse JSON to validate it
    const parsed = JSON.parse(jsonString);

    // Re-stringify to remove any code execution attempts
    return JSON.parse(JSON.stringify(parsed));
  } catch {
    return null;
  }
}

/**
 * Sanitize file names
 */
export function sanitizeFileName(fileName: string): string {
  if (typeof fileName !== "string") return "";

  // Remove path components
  let sanitized = fileName.replace(/^.*[\\\/]/, "");

  // Remove special characters that could cause issues
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, "_");

  // Prevent directory traversal
  sanitized = sanitized.replace(/\.\./g, "");

  // Limit length
  if (sanitized.length > 255) {
    const extension = sanitized.substring(sanitized.lastIndexOf("."));
    sanitized = sanitized.substring(0, 255 - extension.length) + extension;
  }

  return sanitized;
}

/**
 * Sanitize SQL-like queries (basic protection)
 * Note: Always use parameterized queries in production!
 */
export function sanitizeSqlInput(input: string): string {
  if (typeof input !== "string") return "";

  // Escape single quotes
  let sanitized = input.replace(/'/g, "''");

  // Remove SQL comment markers
  sanitized = sanitized.replace(/--/g, "");
  sanitized = sanitized.replace(/\/\*/g, "");
  sanitized = sanitized.replace(/\*\//g, "");

  // Remove common SQL injection keywords (case-insensitive)
  const sqlKeywords = ["DROP", "DELETE", "INSERT", "UPDATE", "ALTER", "CREATE", "EXEC", "EXECUTE", "UNION", "SELECT"];

  sqlKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    sanitized = sanitized.replace(regex, "");
  });

  return sanitized;
}

/**
 * Sanitize localStorage keys and values
 */
export function sanitizeStorageKey(key: string): string {
  if (typeof key !== "string") return "";

  // Use alphanumeric plus underscore and dash only
  return key.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 100);
}

export function sanitizeStorageValue(value: any): string {
  // Convert to string and escape
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);
  return escapeHtml(stringValue);
}

/**
 * Create a sanitized theme storage utility
 */
export class SanitizedStorage {
  private prefix: string;

  constructor(prefix: string = "app_") {
    this.prefix = sanitizeStorageKey(prefix);
  }

  setItem(key: string, value: any): void {
    const sanitizedKey = this.prefix + sanitizeStorageKey(key);
    // For theme storage, just store the plain string value
    // The theme-specific sanitization happens in sanitizeThemeValue
    const valueToStore = typeof value === "string" ? value : JSON.stringify(value);

    try {
      localStorage.setItem(sanitizedKey, valueToStore);
    } catch (e) {
      console.warn("Failed to save to localStorage:", e);
    }
  }

  getItem(key: string): string | null {
    const sanitizedKey = this.prefix + sanitizeStorageKey(key);

    try {
      const value = localStorage.getItem(sanitizedKey);
      // For theme values, just return the raw value - sanitizeThemeValue will validate it
      // stripHtml uses DOM APIs that don't work during SSR
      return value;
    } catch (e) {
      console.warn("Failed to read from localStorage:", e);
      return null;
    }
  }

  removeItem(key: string): void {
    const sanitizedKey = this.prefix + sanitizeStorageKey(key);

    try {
      localStorage.removeItem(sanitizedKey);
    } catch (e) {
      console.warn("Failed to remove from localStorage:", e);
    }
  }
}

/**
 * Validate and sanitize theme values specifically
 */
export function sanitizeThemeValue(theme: string): "light" | "dark" | null {
  if (typeof theme !== "string") return null;

  const sanitized = theme.toLowerCase().trim();

  // Only allow specific theme values
  if (sanitized === "light" || sanitized === "dark") {
    return sanitized;
  }

  return null;
}

/**
 * Main sanitization function for any user input
 * Use this as the primary entry point for sanitizing user data
 */
export function sanitize(
  input: any,
  type: "html" | "text" | "email" | "url" | "json" | "filename" | "theme" | "storage" = "text",
  options?: SanitizeOptions,
): any {
  switch (type) {
    case "html":
      return stripHtml(String(input));
    case "email":
      return sanitizeEmail(String(input));
    case "url":
      return sanitizeUrl(String(input));
    case "json":
      return sanitizeJson(String(input));
    case "filename":
      return sanitizeFileName(String(input));
    case "theme":
      return sanitizeThemeValue(String(input));
    case "storage":
      return sanitizeStorageValue(input);
    case "text":
    default:
      return sanitizeInput(String(input), options);
  }
}
