/**
 * Global error handling utilities.
 * These functions provide consistent error handling across the application.
 */

// Error types
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  RATE_LIMIT = 'RATE_LIMIT',
  SERVER = 'SERVER',
  NETWORK = 'NETWORK',
  UNKNOWN = 'UNKNOWN',
}

// Custom error class
export class AppError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public details?: any,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// Error messages for user display
const USER_FRIENDLY_MESSAGES: Record<ErrorType, string> = {
  [ErrorType.VALIDATION]: 'Please check your input and try again.',
  [ErrorType.AUTHENTICATION]: 'Please sign in to continue.',
  [ErrorType.AUTHORIZATION]: 'You don\'t have permission to perform this action.',
  [ErrorType.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorType.RATE_LIMIT]: 'Too many requests. Please try again later.',
  [ErrorType.SERVER]: 'Something went wrong on our end. Please try again.',
  [ErrorType.NETWORK]: 'Network error. Please check your connection.',
  [ErrorType.UNKNOWN]: 'An unexpected error occurred. Please try again.',
}

// Get user-friendly error message
export function getUserFriendlyMessage(error: unknown): string {
  if (error instanceof AppError) {
    return USER_FRIENDLY_MESSAGES[error.type] || error.message
  }
  
  if (error instanceof Error) {
    // Don't expose internal error messages to users
    if (process.env.NODE_ENV === 'production') {
      return USER_FRIENDLY_MESSAGES[ErrorType.UNKNOWN]
    }
    return error.message
  }
  
  return USER_FRIENDLY_MESSAGES[ErrorType.UNKNOWN]
}

// Log error for debugging
export function logError(error: unknown, context?: Record<string, any>): void {
  const timestamp = new Date().toISOString()
  
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${timestamp}] Error:`, error)
    if (context) {
      console.error('Context:', context)
    }
  } else {
    // In production, send to error tracking service
    // Example: Sentry, LogRocket, etc.
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        extra: context,
      })
    }
  }
}

// Parse error to get type
export function getErrorType(error: unknown): ErrorType {
  if (error instanceof AppError) {
    return error.type
  }
  
  if (error instanceof Error) {
    const message = error.message.toLowerCase()
    
    if (message.includes('unauthorized') || message.includes('authentication')) {
      return ErrorType.AUTHENTICATION
    }
    if (message.includes('forbidden') || message.includes('permission')) {
      return ErrorType.AUTHORIZATION
    }
    if (message.includes('not found')) {
      return ErrorType.NOT_FOUND
    }
    if (message.includes('rate limit') || message.includes('too many')) {
      return ErrorType.RATE_LIMIT
    }
    if (message.includes('network') || message.includes('fetch')) {
      return ErrorType.NETWORK
    }
    if (message.includes('validation') || message.includes('invalid')) {
      return ErrorType.VALIDATION
    }
  }
  
  return ErrorType.UNKNOWN
}

// Retry logic for transient errors
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: unknown
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      // Don't retry non-transient errors
      const errorType = getErrorType(error)
      if (
        errorType === ErrorType.VALIDATION ||
        errorType === ErrorType.AUTHENTICATION ||
        errorType === ErrorType.AUTHORIZATION ||
        errorType === ErrorType.NOT_FOUND
      ) {
        throw error
      }
      
      // Wait before retrying (exponential backoff)
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError
}

// Error boundary fallback component props
export interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

// Format error for display
export function formatError(error: unknown): {
  title: string
  message: string
  details?: any
  type: ErrorType
} {
  const type = getErrorType(error)
  const message = getUserFriendlyMessage(error)
  
  let title = 'Error'
  switch (type) {
    case ErrorType.VALIDATION:
      title = 'Validation Error'
      break
    case ErrorType.AUTHENTICATION:
      title = 'Authentication Required'
      break
    case ErrorType.AUTHORIZATION:
      title = 'Access Denied'
      break
    case ErrorType.NOT_FOUND:
      title = 'Not Found'
      break
    case ErrorType.RATE_LIMIT:
      title = 'Too Many Requests'
      break
    case ErrorType.SERVER:
      title = 'Server Error'
      break
    case ErrorType.NETWORK:
      title = 'Network Error'
      break
    default:
      title = 'Unexpected Error'
  }
  
  const result: any = { title, message, type }
  
  if (error instanceof AppError && error.details) {
    result.details = error.details
  }
  
  return result
}

// Check if error is retryable
export function isRetryableError(error: unknown): boolean {
  const type = getErrorType(error)
  return [
    ErrorType.SERVER,
    ErrorType.NETWORK,
    ErrorType.RATE_LIMIT,
    ErrorType.UNKNOWN,
  ].includes(type)
}