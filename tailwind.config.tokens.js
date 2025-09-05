/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Completely override default theme for consistency
    colors: {
      // Brand Colors - Single source of truth
      brand: {
        primary: '#5033FF',      // Main brand purple (was hardcoded in Header.tsx)
        'primary-hover': '#4129E6', // Brand purple hover
        secondary: '#4f46e5',    // Indigo (was used 12 times)
        tertiary: '#9333ea',     // Purple (was used 8 times)
        accent: '#ec4899',       // Pink (was used 6 times)
      },
      
      // Semantic Colors using CSS variables for light/dark mode
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      
      // Neutral Colors
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
      
      // State Colors
      success: {
        DEFAULT: '#10b981',
        light: 'rgba(34, 197, 94, 0.1)',
        medium: 'rgba(34, 197, 94, 0.5)', // Was hardcoded for green glow
      },
      
      error: {
        DEFAULT: '#ef4444',
        light: 'rgba(239, 68, 68, 0.1)',
      },
      
      warning: {
        DEFAULT: '#f59e0b',
        light: 'rgba(245, 158, 11, 0.1)',
      },
      
      // Transparency values for gradients/overlays
      overlay: {
        light: 'rgba(99, 102, 241, 0.15)', // Was used for radial gradients
        medium: 'rgba(99, 102, 241, 0.3)', // Was used for background patterns
        dark: 'rgba(0, 0, 0, 0.5)',
      },
      
      // Base colors
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      
      // Component-specific colors using CSS vars
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      
      // Chart colors
      chart: {
        1: 'hsl(var(--chart-1))',
        2: 'hsl(var(--chart-2))',
        3: 'hsl(var(--chart-3))',
        4: 'hsl(var(--chart-4))',
        5: 'hsl(var(--chart-5))',
      },
    },
    
    // Spacing Scale - Consistent rem-based system
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',  // 2px
      1: '0.25rem',     // 4px
      1.5: '0.375rem',  // 6px
      2: '0.5rem',      // 8px
      2.5: '0.625rem',  // 10px
      3: '0.75rem',     // 12px
      3.5: '0.875rem',  // 14px
      4: '1rem',        // 16px
      5: '1.25rem',     // 20px
      6: '1.5rem',      // 24px
      7: '1.75rem',     // 28px
      8: '2rem',        // 32px
      9: '2.25rem',     // 36px
      10: '2.5rem',     // 40px
      11: '2.75rem',    // 44px
      12: '3rem',       // 48px
      14: '3.5rem',     // 56px
      16: '4rem',       // 64px
      20: '5rem',       // 80px
      24: '6rem',       // 96px
      28: '7rem',       // 112px
      32: '8rem',       // 128px
      36: '9rem',       // 144px
      40: '10rem',      // 160px
      44: '11rem',      // 176px
      48: '12rem',      // 192px
      52: '13rem',      // 208px
      56: '14rem',      // 224px
      60: '15rem',      // 240px
      64: '16rem',      // 256px
      72: '18rem',      // 288px
      80: '20rem',      // 320px
      96: '24rem',      // 384px
    },
    
    // Typography Scale
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
      '5xl': ['3rem', { lineHeight: '1' }],         // 48px
      '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
      '7xl': ['4.5rem', { lineHeight: '1' }],       // 72px
      '8xl': ['6rem', { lineHeight: '1' }],         // 96px
      '9xl': ['8rem', { lineHeight: '1' }],         // 128px
    },
    
    // Font Families
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
    },
    
    // Font Weights
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    
    // Border Radius Scale
    borderRadius: {
      none: '0',
      sm: '0.125rem',     // 2px
      DEFAULT: '0.25rem', // 4px
      md: '0.375rem',     // 6px
      lg: '0.5rem',       // 8px - var(--radius)
      xl: '0.75rem',      // 12px
      '2xl': '1rem',      // 16px
      '3xl': '1.5rem',    // 24px
      full: '9999px',
      // Dynamic radius based on CSS variable
      base: 'var(--radius)',
      'base-sm': 'calc(var(--radius) - 4px)',
      'base-md': 'calc(var(--radius) - 2px)',
    },
    
    // Box Shadows
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      // Brand shadow
      brand: '0 4px 14px 0 rgba(80, 51, 255, 0.39)',
    },
    
    // Z-index Scale
    zIndex: {
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      auto: 'auto',
    },
    
    // Screens (Responsive Breakpoints)
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
    // Container
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    
    extend: {
      // Animation utilities
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        gradient: 'gradient 3s ease infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite',
      },
      
      // Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      
      // Background Gradients - Reusable definitions
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #5033FF 0%, #9333ea 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #4129E6 0%, #ec4899 100%)',
        'indigo-purple': 'linear-gradient(to right, #4f46e5, #9333ea)',
        'purple-pink': 'linear-gradient(to right, #9333ea, #ec4899)',
        'blue-indigo': 'linear-gradient(to right, #3b82f6, #4f46e5)',
      },
      
      // Transition Timing Functions
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      
      // Transition Duration
      transitionDuration: {
        0: '0ms',
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
      },
      
      // Width/Height utilities for fixed dimensions
      width: {
        'modal-sm': '400px',
        'modal-md': '600px',
        'modal-lg': '800px',
        'modal-xl': '1000px',
      },
      
      height: {
        'header': '60px',
        'header-lg': '80px',
        'header-xl': '90px',
        'hero': '580px',
        'screen-90': '90vh',
        'screen-80': '80vh',
      },
      
      maxHeight: {
        'modal': 'calc(90vh - 200px)', // Was hardcoded
        'dropdown': '400px',
        'content': '600px',
      },
      
      minWidth: {
        'button': '180px', // Was hardcoded
        'card': '280px',
      },
      
      // Opacity
      opacity: {
        5: '0.05',
        10: '0.1',
        15: '0.15',
        20: '0.2',
        25: '0.25',
        30: '0.3',
        35: '0.35',
        40: '0.4',
        45: '0.45',
        50: '0.5',
        55: '0.55',
        60: '0.6',
        65: '0.65',
        70: '0.7',
        75: '0.75',
        80: '0.8',
        85: '0.85',
        90: '0.9',
        95: '0.95',
      },
      
      // Blur
      blur: {
        xs: '2px',
      },
    },
  },
  
  plugins: [
    require('tailwindcss-animate'),
    // Custom plugin for common patterns
    function({ addUtilities, addComponents, theme }) {
      // Utility for mix-blend-mode (was repeated inline)
      addUtilities({
        '.mix-blend-multiply': {
          mixBlendMode: 'multiply',
        },
        '.mix-blend-screen': {
          mixBlendMode: 'screen',
        },
        '.mix-blend-overlay': {
          mixBlendMode: 'overlay',
        },
      })
      
      // Component for gradient text (was repeated)
      addComponents({
        '.gradient-text': {
          backgroundImage: theme('backgroundImage.brand-gradient'),
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        },
        '.gradient-text-hover': {
          '&:hover': {
            backgroundImage: theme('backgroundImage.brand-gradient-hover'),
          },
        },
      })
    },
  ],
}