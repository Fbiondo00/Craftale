/**
 * Semantic Token System for Tailwind CSS
 * Based on 2025 best practices from Perplexity audit
 * 
 * This configuration defines semantic tokens for all 733 remaining hardcoded colors
 * to enable theming, dark mode, and consistent design system
 */

module.exports = {
  // Neutral color scale (replacing 489 gray instances)
  neutral: {
    50: '#f9fafb',   // gray-50 - Very light backgrounds
    100: '#f3f4f6',  // gray-100 - Light backgrounds
    200: '#e5e7eb',  // gray-200 - Light borders/dividers
    300: '#d1d5db',  // gray-300 - Subtle borders
    400: '#9ca3af',  // gray-400 - Disabled states
    500: '#6b7280',  // gray-500 - Muted text
    600: '#4b5563',  // gray-600 - Medium text
    700: '#374151',  // gray-700 - Dark backgrounds/secondary text
    800: '#1f2937',  // gray-800 - Very dark backgrounds
    900: '#111827',  // gray-900 - Dark text/headings
    950: '#030712',  // gray-950 - Darkest
  },

  // Semantic text tokens (purposeful usage)
  text: {
    primary: 'var(--color-neutral-900)',      // Main text (was gray-900)
    secondary: 'var(--color-neutral-700)',    // Secondary text (was gray-700)
    tertiary: 'var(--color-neutral-600)',     // Tertiary text (was gray-600)
    muted: 'var(--color-neutral-500)',        // Muted/disabled (was gray-500)
    disabled: 'var(--color-neutral-400)',     // Disabled text (was gray-400)
    placeholder: 'var(--color-neutral-400)',  // Form placeholders
    inverse: 'var(--color-white)',            // On dark backgrounds
    'on-brand': 'var(--color-white)',         // On brand colors
  },

  // Semantic background tokens
  background: {
    base: 'var(--color-white)',               // Main background
    subtle: 'var(--color-neutral-50)',        // Subtle background (was gray-50)
    muted: 'var(--color-neutral-100)',        // Muted sections (was gray-100)
    elevated: 'var(--color-white)',           // Cards, modals
    overlay: 'rgba(0, 0, 0, 0.5)',           // Modal overlays
    hover: 'var(--color-neutral-50)',         // Hover states
    active: 'var(--color-neutral-100)',       // Active/selected states
    inverse: 'var(--color-neutral-900)',      // Dark sections
    'inverse-subtle': 'var(--color-neutral-800)', // Dark elevated
  },

  // Semantic border tokens
  border: {
    default: 'var(--color-neutral-200)',      // Default borders (was gray-200)
    subtle: 'var(--color-neutral-100)',       // Subtle dividers (was gray-100)
    muted: 'var(--color-neutral-200)',        // Muted borders
    strong: 'var(--color-neutral-300)',       // Strong borders (was gray-300)
    hover: 'var(--color-neutral-400)',        // Hover border
    focus: 'var(--color-brand-primary)',      // Focus border
    error: 'var(--color-state-error)',        // Error border
    success: 'var(--color-state-success)',    // Success border
  },

  // State colors (semantic usage for UI states)
  state: {
    // Success (replacing 78 green instances)
    success: '#10b981',           // green-500
    'success-strong': '#059669',  // green-600
    'success-subtle': '#d1fae5',  // green-100
    'success-bg': '#f0fdf4',      // green-50
    'success-border': '#86efac',  // green-300
    'success-text': '#065f46',    // green-800

    // Error (replacing 47 red instances)
    error: '#ef4444',             // red-500
    'error-strong': '#dc2626',    // red-600
    'error-subtle': '#fee2e2',    // red-100
    'error-bg': '#fef2f2',        // red-50
    'error-border': '#fca5a5',    // red-300
    'error-text': '#991b1b',      // red-800

    // Warning (replacing 31 yellow instances)
    warning: '#f59e0b',           // yellow-500
    'warning-strong': '#d97706',  // yellow-600
    'warning-subtle': '#fed7aa',  // yellow-100
    'warning-bg': '#fffbeb',      // yellow-50
    'warning-border': '#fcd34d',  // yellow-300
    'warning-text': '#92400e',    // yellow-800

    // Info (replacing 56 blue instances)
    info: '#3b82f6',              // blue-500
    'info-strong': '#2563eb',     // blue-600
    'info-subtle': '#dbeafe',     // blue-100
    'info-bg': '#eff6ff',         // blue-50
    'info-border': '#93c5fd',     // blue-300
    'info-text': '#1e40af',       // blue-800
  },

  // Interactive element states
  interactive: {
    link: 'var(--color-brand-secondary)',     // Links
    'link-hover': 'var(--color-brand-primary)', // Link hover
    'link-visited': 'var(--color-brand-tertiary)', // Visited links
    focus: 'var(--color-brand-primary)',      // Focus states
    'focus-ring': 'var(--color-brand-primary/20)', // Focus ring
  },

  // Surface tokens for elevation
  surface: {
    level0: 'var(--color-background-base)',   // Base level
    level1: 'var(--color-background-elevated)', // Cards
    level2: 'var(--color-neutral-50)',        // Elevated cards
    level3: 'var(--color-neutral-100)',       // Highest elevation
  },

  // Mapping for migration script
  colorMappings: [
    // Gray to neutral mappings (489 instances)
    { from: 'gray-50', to: 'neutral-50' },
    { from: 'gray-100', to: 'neutral-100' },
    { from: 'gray-200', to: 'neutral-200' },
    { from: 'gray-300', to: 'neutral-300' },
    { from: 'gray-400', to: 'neutral-400' },
    { from: 'gray-500', to: 'neutral-500' },
    { from: 'gray-600', to: 'neutral-600' },
    { from: 'gray-700', to: 'neutral-700' },
    { from: 'gray-800', to: 'neutral-800' },
    { from: 'gray-900', to: 'neutral-900' },

    // Slate to neutral mappings (20 instances)
    { from: 'slate-50', to: 'neutral-50' },
    { from: 'slate-100', to: 'neutral-100' },
    { from: 'slate-200', to: 'neutral-200' },
    { from: 'slate-300', to: 'neutral-300' },
    { from: 'slate-400', to: 'neutral-400' },
    { from: 'slate-500', to: 'neutral-500' },
    { from: 'slate-600', to: 'neutral-600' },
    { from: 'slate-700', to: 'neutral-700' },
    { from: 'slate-800', to: 'neutral-800' },
    { from: 'slate-900', to: 'neutral-900' },

    // Green to success state mappings (78 instances)
    { from: 'green-50', to: 'state-success-bg' },
    { from: 'green-100', to: 'state-success-subtle' },
    { from: 'green-200', to: 'state-success-subtle' },
    { from: 'green-300', to: 'state-success-border' },
    { from: 'green-400', to: 'state-success/80' },
    { from: 'green-500', to: 'state-success' },
    { from: 'green-600', to: 'state-success-strong' },
    { from: 'green-700', to: 'state-success-strong' },
    { from: 'green-800', to: 'state-success-text' },
    { from: 'green-900', to: 'state-success-text' },

    // Red to error state mappings (47 instances)
    { from: 'red-50', to: 'state-error-bg' },
    { from: 'red-100', to: 'state-error-subtle' },
    { from: 'red-200', to: 'state-error-subtle' },
    { from: 'red-300', to: 'state-error-border' },
    { from: 'red-400', to: 'state-error/80' },
    { from: 'red-500', to: 'state-error' },
    { from: 'red-600', to: 'state-error-strong' },
    { from: 'red-700', to: 'state-error-strong' },
    { from: 'red-800', to: 'state-error-text' },
    { from: 'red-900', to: 'state-error-text' },

    // Yellow to warning state mappings (31 instances)
    { from: 'yellow-50', to: 'state-warning-bg' },
    { from: 'yellow-100', to: 'state-warning-subtle' },
    { from: 'yellow-200', to: 'state-warning-subtle' },
    { from: 'yellow-300', to: 'state-warning-border' },
    { from: 'yellow-400', to: 'state-warning/80' },
    { from: 'yellow-500', to: 'state-warning' },
    { from: 'yellow-600', to: 'state-warning-strong' },
    { from: 'yellow-700', to: 'state-warning-strong' },
    { from: 'yellow-800', to: 'state-warning-text' },
    { from: 'yellow-900', to: 'state-warning-text' },

    // Blue to info state mappings (56 instances)
    { from: 'blue-50', to: 'state-info-bg' },
    { from: 'blue-100', to: 'state-info-subtle' },
    { from: 'blue-200', to: 'state-info-subtle' },
    { from: 'blue-300', to: 'state-info-border' },
    { from: 'blue-400', to: 'state-info/80' },
    { from: 'blue-500', to: 'state-info' },
    { from: 'blue-600', to: 'state-info-strong' },
    { from: 'blue-700', to: 'state-info-strong' },
    { from: 'blue-800', to: 'state-info-text' },
    { from: 'blue-900', to: 'state-info-text' },

    // Orange to warning mappings (10 instances)
    { from: 'orange-50', to: 'state-warning-bg' },
    { from: 'orange-100', to: 'state-warning-subtle' },
    { from: 'orange-200', to: 'state-warning-subtle' },
    { from: 'orange-300', to: 'state-warning-border' },
    { from: 'orange-400', to: 'state-warning/80' },
    { from: 'orange-500', to: 'state-warning' },
    { from: 'orange-600', to: 'state-warning-strong' },
    { from: 'orange-700', to: 'state-warning-strong' },
    { from: 'orange-800', to: 'state-warning-text' },
    { from: 'orange-900', to: 'state-warning-text' },

    // Emerald to success mappings (8 instances)
    { from: 'emerald-50', to: 'state-success-bg' },
    { from: 'emerald-100', to: 'state-success-subtle' },
    { from: 'emerald-200', to: 'state-success-subtle' },
    { from: 'emerald-300', to: 'state-success-border' },
    { from: 'emerald-400', to: 'state-success/80' },
    { from: 'emerald-500', to: 'state-success' },
    { from: 'emerald-600', to: 'state-success-strong' },
    { from: 'emerald-700', to: 'state-success-strong' },
    { from: 'emerald-800', to: 'state-success-text' },
    { from: 'emerald-900', to: 'state-success-text' },
  ]
};