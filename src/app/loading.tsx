import { LumaSpin } from '@/components/ui/luma-spin'

/**
 * Loading component displayed while pages are being loaded.
 * This provides a consistent loading experience across the application.
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-color-subtle">
      <div className="text-center space-y-4">
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <LumaSpin size={60} />
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <p className="text-lg font-medium text-color-primary">
            Loading...
          </p>
          <p className="text-sm text-color-muted">
            Please wait while we prepare your content
          </p>
        </div>
      </div>
    </div>
  )
}