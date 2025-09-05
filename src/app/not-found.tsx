import Link from 'next/link'
import { Button } from '@/components/ui/button'

/**
 * 404 Not Found page component.
 * This is displayed when a route is not found.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-color-subtle px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          {/* 404 Illustration */}
          <div className="relative">
            <h1 className="text-9xl font-extrabold text-gray-200 tracking-widest">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-2xl font-semibold text-brand-secondary">
                Page Not Found
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <p className="text-color-tertiary text-lg">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <p className="text-color-muted text-sm">
              The page might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Link href="/" className="block">
              <Button size="lg" className="w-full">
                Go to Homepage
              </Button>
            </Link>
            <Link href="/contact" className="block">
              <Button variant="outline" size="lg" className="w-full">
                Contact Support
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="pt-6 border-t border-color-default">
            <p className="text-sm text-color-muted mb-3">Quick Links:</p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link
                href="/services"
                className="text-brand-secondary hover:text-brand-secondary/90 font-medium"
              >
                Services
              </Link>
              <span className="text-color-disabled">|</span>
              <Link
                href="/pricing"
                className="text-brand-secondary hover:text-brand-secondary/90 font-medium"
              >
                Pricing
              </Link>
              <span className="text-color-disabled">|</span>
              <Link
                href="/blog"
                className="text-brand-secondary hover:text-brand-secondary/90 font-medium"
              >
                Blog
              </Link>
              <span className="text-color-disabled">|</span>
              <Link
                href="/portfolio"
                className="text-brand-secondary hover:text-brand-secondary/90 font-medium"
              >
                Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}