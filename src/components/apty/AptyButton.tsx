/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

/**
 * APTY Button Components
 *
 * Reusable button components following APTY design system
 * These ensure consistency across the application
 */

interface AptyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  withChevron?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Primary CTA Button - Exact clone from /new-test-tokens
 * Used for main CTAs like "Get Started"
 */
export function AptyPrimaryButton({
  children,
  className,
  size = "md",
  withChevron = false,
  ...props
}: AptyButtonProps) {
  const sizeClasses = {
    xs: "px-2.5 py-1 text-xs font-normal rounded-md",
    sm: "px-3.5 py-1.5 text-sm font-medium rounded-md",
    md: "px-3.5 py-1.5 text-sm font-medium rounded-lg", // Default navbar size
    lg: "px-5 py-2.5 text-base font-semibold rounded-lg",
    xl: "px-6 py-3 text-lg font-semibold rounded-xl",
  };

  const chevronSizes = {
    xs: "text-sm",
    sm: "text-base",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <button
      className={cn(
        "group inline-flex items-center justify-center",
        "bg-apty-primary text-apty-text-on-brand",
        "transition-all duration-200 ease-out cursor-pointer",
        "hover:bg-apty-primary-hover hover:shadow-apty-brand",
        "active:bg-apty-primary-active",
        "box-border",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
      {withChevron && (
        <span
          className={cn(
            "inline-block ml-0.5 transition-transform duration-200 group-hover:translate-x-1",
            chevronSizes[size],
          )}
        >
          ›
        </span>
      )}
    </button>
  );
}

/**
 * Secondary outline button - Exact clone from /new-test-tokens
 * Used for secondary actions like "Sign up"
 */
export function AptySecondaryButton({
  children,
  className,
  size = "md",
  withChevron = false,
  ...props
}: AptyButtonProps) {
  const sizeClasses = {
    xs: "px-2.5 py-1 text-xs font-normal rounded-md",
    sm: "px-3.5 py-1.5 text-sm font-medium rounded-md",
    md: "px-3.5 py-1.5 text-sm font-medium rounded-lg", // Default navbar size
    lg: "px-5 py-2.5 text-base font-semibold rounded-lg",
    xl: "px-6 py-3 text-lg font-semibold rounded-xl",
  };

  const chevronSizes = {
    xs: "text-sm",
    sm: "text-base",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <button
      className={cn(
        "group inline-flex items-center justify-center",
        "bg-transparent text-apty-primary",
        "border-[1.5px] border-apty-tertiary",
        "transition-all duration-200 ease-out cursor-pointer",
        "hover:border-apty-primary hover:bg-apty-primary/5",
        "active:border-apty-primary-hover active:bg-apty-primary/10",
        "box-border",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
      {withChevron && (
        <span
          className={cn(
            "inline-block ml-0.5 transition-transform duration-200 group-hover:translate-x-1",
            chevronSizes[size],
          )}
        >
          ›
        </span>
      )}
    </button>
  );
}

/**
 * Ghost button (text only)
 */
export function AptyGhostButton({ children, className, withChevron = false, ...props }: AptyButtonProps) {
  return (
    <button
      className={cn(
        "group inline-flex items-center gap-2 text-apty-text-secondary",
        "font-medium transition-all duration-200",
        "hover:text-apty-primary",
        className,
      )}
      {...props}
    >
      {children}
      {withChevron && (
        <span className="text-xl font-light transition-transform duration-200 group-hover:translate-x-1">›</span>
      )}
    </button>
  );
}

/**
 * Small CTA button for dropdown menus
 */
export function AptyDropdownCTA({ children, className, ...props }: Omit<AptyButtonProps, "size">) {
  // Dropdown CTAs are always small
  return (
    <AptyPrimaryButton size="sm" className={className} withChevron {...props}>
      {children}
    </AptyPrimaryButton>
  );
}
