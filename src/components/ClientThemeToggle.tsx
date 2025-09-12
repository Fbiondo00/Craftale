"use client";

import dynamic from "next/dynamic";

// Dynamically import ThemeToggle with no SSR to prevent hydration issues
export const ClientThemeToggle = dynamic(() => import("./ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => (
    <div className="w-12 h-12 lg:w-10 lg:h-10 rounded-full bg-apty-bg-elevated border-2 border-apty-border-default animate-pulse" />
  ),
});
