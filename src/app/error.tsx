"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Error boundary component for handling errors in the application.
 * This component catches JavaScript errors anywhere in the child component tree.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; cause?: any };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);

    // Create detailed error log
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      name: error.name,
      cause: error.cause,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== "undefined" ? window.navigator.userAgent : "unknown",
      url: typeof window !== "undefined" ? window.location.href : "unknown",
      platform: typeof window !== "undefined" ? window.navigator.platform : "unknown",
    };

    console.error("DETAILED ERROR LOG:", errorDetails);

    // You can also send this to an error tracking service like Sentry
    // if (window.Sentry) {
    //   window.Sentry.captureException(error)
    // }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-color-subtle px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-color-state-error-subtle">
            <svg
              className="h-10 w-10 text-color-state-error-strong"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <div>
            <h1 className="text-3xl font-bold text-color-primary">Qualcosa è andato storto</h1>
            <p className="mt-2 text-color-tertiary">
              Ci scusiamo per l'inconveniente. Si è verificato un errore inaspettato.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={reset} className="w-full" size="lg">
              Riprova
            </Button>
            <Button onClick={() => (window.location.href = "/")} variant="outline" className="w-full" size="lg">
              Vai alla Homepage
            </Button>
          </div>

          {/* Support Link */}
          <p className="text-sm text-color-muted">
            Se il problema persiste, per favore{" "}
            <a href="/contact" className="font-medium text-brand-secondary hover:text-brand-secondary/90">
              contatta il supporto
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
