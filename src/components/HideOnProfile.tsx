"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface HideOnProfileProps {
  children: ReactNode;
  /**
   * Exact path where children should be hidden. Default: '/profile'
   */
  path?: string;
}

export default function HideOnProfile({ children, path = '/profile' }: HideOnProfileProps) {
  const pathname = usePathname();
  if (pathname === path) return null;
  return <>{children}</>;
}
