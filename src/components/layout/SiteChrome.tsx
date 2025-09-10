"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import HeaderWrapper from '@/components/header/HeaderWrapper';
import Footer from '@/components/Footer';
import { type SessionUser } from '@/lib/supabase/get-session';

interface SiteChromeProps {
  sessionUser: SessionUser | null;
}

/**
 * SiteChrome
 * Renders the global Header + Footer except on specific standalone pages.
 * Currently excludes /profile (user profile management) from navbar & footer.
 */
export function SiteChrome({ sessionUser }: SiteChromeProps) {
  const pathname = usePathname();

  // Standalone routes that should NOT show header/footer
  const hideChrome = pathname === '/profile';

  if (hideChrome) return null;

  return (
    <>
      <HeaderWrapper sessionUser={sessionUser} />
      <Footer />
    </>
  );
}

export default SiteChrome;
