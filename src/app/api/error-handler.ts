import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

/**
 * Centralized error handler for API routes.
 * This ensures consistent error responses and proper security.
 */

interface ErrorResponse {
  error: string
  message?: string
  details?: any
  statusCode: number
}

export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function handleApiError(error: unknown): NextResponse<ErrorResponse> {
  console.error('API Error:', error)

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation Error',
        message: 'Invalid input data',
        details: error.flatten().fieldErrors,
        statusCode: 400,
      },
      { status: 400 }
    )
  }

  // Handle custom API errors
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.name,
        message: error.message,
        details: error.details,
        statusCode: error.statusCode,
      },
      { status: error.statusCode }
    )
  }

  // Handle Supabase errors
  if (error && typeof error === 'object' && 'code' in error) {
    const supabaseError = error as { code: string; message: string }
    
    // Map Supabase error codes to HTTP status codes
    const statusMap: Record<string, number> = {
      '23505': 409, // Unique constraint violation
      '23503': 400, // Foreign key violation
      '23502': 400, // Not null violation
      '22P02': 400, // Invalid input syntax
      'PGRST301': 401, // Authentication required
      'PGRST204': 404, // No rows found
    }
    
    const statusCode = statusMap[supabaseError.code] || 500
    
    return NextResponse.json(
      {
        error: 'Database Error',
        message: supabaseError.message,
        statusCode,
      },
      { status: statusCode }
    )
  }

  // Handle standard errors
  if (error instanceof Error) {
    // Don't expose internal error messages in production
    const message = process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : error.message
    
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message,
        statusCode: 500,
      },
      { status: 500 }
    )
  }

  // Handle unknown errors
  return NextResponse.json(
    {
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
      statusCode: 500,
    },
    { status: 500 }
  )
}

// Middleware to wrap API handlers with error handling
export function withErrorHandler<T = any>(
  handler: (request: Request, context?: any) => Promise<NextResponse<T>>
) {
  return async (request: Request, context?: any) => {
    try {
      return await handler(request, context)
    } catch (error) {
      return handleApiError(error)
    }
  }
}

// Rate limiting error
export class RateLimitError extends ApiError {
  constructor(message = 'Too many requests') {
    super(message, 429)
    this.name = 'RateLimitError'
  }
}

// Authentication error
export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication required') {
    super(message, 401)
    this.name = 'AuthenticationError'
  }
}

// Authorization error
export class AuthorizationError extends ApiError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403)
    this.name = 'AuthorizationError'
  }
}

// Not found error
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

// Validation error
export class ValidationError extends ApiError {
  constructor(message = 'Validation failed', details?: any) {
    super(message, 400, details)
    this.name = 'ValidationError'
  }
}