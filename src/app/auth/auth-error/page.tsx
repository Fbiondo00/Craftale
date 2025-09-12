"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-color-state-error-subtle rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-color-state-error-strong" />
          </div>
          <CardTitle className="text-2xl text-color-primary">Authentication Error</CardTitle>
          <CardDescription className="text-base mt-2">
            The authentication link is invalid or has expired.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-color-tertiary text-center">This can happen if:</p>
          <ul className="text-sm text-color-tertiary space-y-1 list-disc list-inside">
            <li>The link has already been used</li>
            <li>The link has expired (links are valid for 24 hours)</li>
            <li>The link was modified or corrupted</li>
          </ul>

          <div className="pt-4">
            <Link href="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
