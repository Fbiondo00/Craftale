/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			// Brand Colors - Fixing hardcoded issues from audit
  			brand: {
  				primary: '#5033FF',      // Main brand purple (was hardcoded in Header.tsx)
  				'primary-hover': '#4129E6', // Brand purple hover
  				secondary: '#4f46e5',    // Indigo (was used 12 times)
  				tertiary: '#9333ea',     // Purple (was used 8 times)
  				accent: '#ec4899',       // Pink (was used 6 times)
  			},
  			
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
  			// Transparency overlays for gradients (from audit)
  			overlay: {
  				light: 'rgba(99, 102, 241, 0.15)', // Was used for radial gradients
  				medium: 'rgba(99, 102, 241, 0.3)', // Was used for background patterns
  				dark: 'rgba(0, 0, 0, 0.5)',
  			},
  			primary: {
  				'50': '#eff6ff',
  				'100': '#dbeafe',
  				'200': '#bfdbfe',
  				'300': '#93c5fd',
  				'400': '#60a5fa',
  				'500': '#3b82f6',
  				'600': '#2563eb',
  				'700': '#1d4ed8',
  				'800': '#1e40af',
  				'900': '#1e3a8a',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f0fdf4',
  				'100': '#dcfce7',
  				'200': '#bbf7d0',
  				'300': '#86efac',
  				'400': '#4ade80',
  				'500': '#22c55e',
  				'600': '#16a34a',
  				'700': '#15803d',
  				'800': '#166534',
  				'900': '#14532d',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  						// Semantic Design Tokens - Properly at root level of colors
			// These generate utilities like: bg-color-primary, text-color-muted, border-color-strong
			// The 'color-' prefix maintains namespace separation from other colors
			
			// Text semantic tokens
			'color-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
			'color-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
			'color-tertiary': 'rgb(var(--color-text-tertiary) / <alpha-value>)',
			'color-disabled': 'rgb(var(--color-text-disabled) / <alpha-value>)',
			'color-placeholder': 'rgb(var(--color-text-placeholder) / <alpha-value>)',
			'color-on-brand': 'rgb(var(--color-text-on-brand) / <alpha-value>)',
			
			// Background semantic tokens
			'color-base': 'rgb(var(--color-bg-base) / <alpha-value>)',
			'color-subtle': 'rgb(var(--color-bg-subtle) / <alpha-value>)',
			'color-muted': 'rgb(var(--color-bg-muted) / <alpha-value>)',
			'color-elevated': 'rgb(var(--color-bg-elevated) / <alpha-value>)',
			'color-overlay': 'rgb(var(--color-bg-overlay) / <alpha-value>)',
			'color-hover': 'rgb(var(--color-bg-hover) / <alpha-value>)',
			'color-active': 'rgb(var(--color-bg-active) / <alpha-value>)',
			'color-inverse': 'rgb(var(--color-bg-inverse) / <alpha-value>)',
			'color-inverse-subtle': 'rgb(var(--color-bg-inverse-subtle) / <alpha-value>)',
			
			// Border semantic tokens
			'color-default': 'rgb(var(--color-border-default) / <alpha-value>)',
			'color-strong': 'rgb(var(--color-border-strong) / <alpha-value>)',
			'color-focus': 'rgb(var(--color-border-focus) / <alpha-value>)',
			'color-error': 'rgb(var(--color-border-error) / <alpha-value>)',
			'color-success': 'rgb(var(--color-border-success) / <alpha-value>)',
			
			// State colors - full names for clarity
			'color-state-success': 'rgb(var(--color-state-success) / <alpha-value>)',
			'color-state-success-strong': 'rgb(var(--color-state-success-strong) / <alpha-value>)',
			'color-state-success-subtle': 'rgb(var(--color-state-success-subtle) / <alpha-value>)',
			'color-state-success-bg': 'rgb(var(--color-state-success-bg) / <alpha-value>)',
			'color-state-success-border': 'rgb(var(--color-state-success-border) / <alpha-value>)',
			'color-state-success-text': 'rgb(var(--color-state-success-text) / <alpha-value>)',
			
			'color-state-error': 'rgb(var(--color-state-error) / <alpha-value>)',
			'color-state-error-strong': 'rgb(var(--color-state-error-strong) / <alpha-value>)',
			'color-state-error-subtle': 'rgb(var(--color-state-error-subtle) / <alpha-value>)',
			'color-state-error-bg': 'rgb(var(--color-state-error-bg) / <alpha-value>)',
			'color-state-error-border': 'rgb(var(--color-state-error-border) / <alpha-value>)',
			'color-state-error-text': 'rgb(var(--color-state-error-text) / <alpha-value>)',
			
			'color-state-warning': 'rgb(var(--color-state-warning) / <alpha-value>)',
			'color-state-warning-strong': 'rgb(var(--color-state-warning-strong) / <alpha-value>)',
			'color-state-warning-subtle': 'rgb(var(--color-state-warning-subtle) / <alpha-value>)',
			'color-state-warning-bg': 'rgb(var(--color-state-warning-bg) / <alpha-value>)',
			'color-state-warning-border': 'rgb(var(--color-state-warning-border) / <alpha-value>)',
			'color-state-warning-text': 'rgb(var(--color-state-warning-text) / <alpha-value>)',
			
			'color-state-info': 'rgb(var(--color-state-info) / <alpha-value>)',
			'color-state-info-strong': 'rgb(var(--color-state-info-strong) / <alpha-value>)',
			'color-state-info-subtle': 'rgb(var(--color-state-info-subtle) / <alpha-value>)',
			'color-state-info-bg': 'rgb(var(--color-state-info-bg) / <alpha-value>)',
			'color-state-info-border': 'rgb(var(--color-state-info-border) / <alpha-value>)',
			'color-state-info-text': 'rgb(var(--color-state-info-text) / <alpha-value>)',
			
			// Interactive elements
			'color-interactive-link': 'rgb(var(--color-interactive-link) / <alpha-value>)',
			'color-interactive-link-hover': 'rgb(var(--color-interactive-link-hover) / <alpha-value>)',
			'color-interactive-link-visited': 'rgb(var(--color-interactive-link-visited) / <alpha-value>)',
			'color-interactive-focus': 'rgb(var(--color-interactive-focus) / <alpha-value>)',
			'color-interactive-focus-ring': 'rgb(var(--color-interactive-focus-ring) / <alpha-value>)',
			
			// Surface elevation levels
			'color-surface-level0': 'rgb(var(--color-surface-level0) / <alpha-value>)',
			'color-surface-level1': 'rgb(var(--color-surface-level1) / <alpha-value>)',
			'color-surface-level2': 'rgb(var(--color-surface-level2) / <alpha-value>)',
			'color-surface-level3': 'rgb(var(--color-surface-level3) / <alpha-value>)',
			
			// APTY Design System - Full CSS Variables Implementation
			// Brand colors with RGB triplets for opacity support
			'apty-primary': 'rgb(var(--apty-primary) / <alpha-value>)',  // Uses brand primary color
			'apty-primary-hover': 'rgb(var(--apty-primary-hover) / <alpha-value>)',
			'apty-primary-active': 'rgb(var(--apty-primary-active) / <alpha-value>)',
			'apty-primary-focus': 'rgb(var(--apty-primary-focus) / <alpha-value>)',
			'apty-secondary': 'rgb(var(--apty-secondary) / <alpha-value>)',
			'apty-secondary-hover': 'rgb(var(--apty-secondary-hover) / <alpha-value>)',
			'apty-tertiary': 'rgb(var(--apty-tertiary) / <alpha-value>)',
			'apty-tertiary-hover': 'rgb(var(--apty-tertiary-hover) / <alpha-value>)',
			'apty-accent': 'rgb(var(--apty-accent) / <alpha-value>)',
			'apty-accent-hover': 'rgb(var(--apty-accent-hover) / <alpha-value>)',
			'apty-accent-active': 'rgb(var(--apty-accent-active) / <alpha-value>)',
			
			// Text colors with CSS variables
			'apty-text-primary': 'rgb(var(--apty-text-primary) / <alpha-value>)',  // Uses text primary color
			'apty-text-primary-hover': 'rgb(var(--apty-text-primary-hover) / <alpha-value>)',
			'apty-text-secondary': 'rgb(var(--apty-text-secondary) / <alpha-value>)',
			'apty-text-secondary-hover': 'rgb(var(--apty-text-secondary-hover) / <alpha-value>)',
			'apty-text-tertiary': 'rgb(var(--apty-text-tertiary) / <alpha-value>)',
			'apty-text-muted': 'rgb(var(--apty-text-muted) / <alpha-value>)',
			'apty-text-disabled': 'rgb(var(--apty-text-disabled) / <alpha-value>)',
			'apty-text-placeholder': 'rgb(var(--apty-text-placeholder) / <alpha-value>)',
			'apty-text-inverse': 'rgb(var(--apty-text-inverse) / <alpha-value>)',
			'apty-text-on-brand': 'rgb(var(--apty-text-on-brand) / <alpha-value>)',
			'apty-text-link': 'rgb(var(--apty-text-link) / <alpha-value>)',
			'apty-text-link-hover': 'rgb(var(--apty-text-link-hover) / <alpha-value>)',
			'apty-text-link-visited': 'rgb(var(--apty-text-link-visited) / <alpha-value>)',
			
			// Background colors with CSS variables
			'apty-bg-base': 'rgb(var(--apty-bg-base) / <alpha-value>)',
			'apty-bg-subtle': 'rgb(var(--apty-bg-subtle) / <alpha-value>)',
			'apty-bg-subtle-hover': 'rgb(var(--apty-bg-subtle-hover) / <alpha-value>)',
			'apty-bg-muted': 'rgb(var(--apty-bg-muted) / <alpha-value>)',
			'apty-bg-elevated': 'rgb(var(--apty-bg-elevated) / <alpha-value>)',
			'apty-bg-inverse': 'rgb(var(--apty-bg-inverse) / <alpha-value>)',
			'apty-bg-inverse-subtle': 'rgb(var(--apty-bg-inverse-subtle) / <alpha-value>)',
			'apty-bg-inverse-hover': 'rgb(var(--apty-bg-inverse-hover) / <alpha-value>)',
			'apty-bg-overlay': 'rgba(var(--apty-bg-overlay) / 0.4)',  // Special case for overlay
			'apty-bg-hover': 'rgb(var(--apty-bg-hover) / <alpha-value>)',
			'apty-bg-active': 'rgb(var(--apty-bg-active) / <alpha-value>)',
			'apty-bg-selected': 'rgb(var(--apty-bg-selected) / <alpha-value>)',
			'apty-bg-highlight': 'rgb(var(--apty-bg-highlight) / <alpha-value>)',
			
			// Border colors with CSS variables
			'apty-border-default': 'rgb(var(--apty-border-default) / <alpha-value>)',
			'apty-border-hover': 'rgb(var(--apty-border-hover) / <alpha-value>)',
			'apty-border-focus': 'rgb(var(--apty-border-focus) / <alpha-value>)',
			'apty-border-active': 'rgb(var(--apty-border-active) / <alpha-value>)',
			'apty-border-subtle': 'rgb(var(--apty-border-subtle) / <alpha-value>)',
			'apty-border-strong': 'rgb(var(--apty-border-strong) / <alpha-value>)',
			'apty-border-disabled': 'rgb(var(--apty-border-disabled) / <alpha-value>)',
			'apty-border-error': 'rgb(var(--apty-border-error) / <alpha-value>)',
			'apty-border-success': 'rgb(var(--apty-border-success) / <alpha-value>)',
			
			// State colors with CSS variables
			'apty-success': 'rgb(var(--apty-success) / <alpha-value>)',
			'apty-success-hover': 'rgb(var(--apty-success-hover) / <alpha-value>)',
			'apty-success-bg': 'rgb(var(--apty-success-bg) / <alpha-value>)',
			'apty-success-border': 'rgb(var(--apty-success-border) / <alpha-value>)',
			'apty-success-text': 'rgb(var(--apty-success-text) / <alpha-value>)',
			
			'apty-error': 'rgb(var(--apty-error) / <alpha-value>)',
			'apty-error-hover': 'rgb(var(--apty-error-hover) / <alpha-value>)',
			'apty-error-bg': 'rgb(var(--apty-error-bg) / <alpha-value>)',
			'apty-error-border': 'rgb(var(--apty-error-border) / <alpha-value>)',
			'apty-error-text': 'rgb(var(--apty-error-text) / <alpha-value>)',
			
			'apty-warning': 'rgb(var(--apty-warning) / <alpha-value>)',
			'apty-warning-hover': 'rgb(var(--apty-warning-hover) / <alpha-value>)',
			'apty-warning-bg': 'rgb(var(--apty-warning-bg) / <alpha-value>)',
			'apty-warning-border': 'rgb(var(--apty-warning-border) / <alpha-value>)',
			'apty-warning-text': 'rgb(var(--apty-warning-text) / <alpha-value>)',
			
			'apty-info': 'rgb(var(--apty-info) / <alpha-value>)',
			'apty-info-hover': 'rgb(var(--apty-info-hover) / <alpha-value>)',
			'apty-info-bg': 'rgb(var(--apty-info-bg) / <alpha-value>)',
			'apty-info-border': 'rgb(var(--apty-info-border) / <alpha-value>)',
			'apty-info-text': 'rgb(var(--apty-info-text) / <alpha-value>)',
			
			// Focus ring color with CSS variable
			'apty-focus-ring': 'var(--apty-focus-ring)',
			
			// Legacy compatibility - these will be phased out
  			success: {
  				DEFAULT: '#10b981',
  				light: 'rgba(34, 197, 94, 0.1)',
  				medium: 'rgba(34, 197, 94, 0.5)',
  			},
  			error: {
  				DEFAULT: '#ef4444',
  				light: 'rgba(239, 68, 68, 0.1)',
  			},
  			warning: {
  				DEFAULT: '#f59e0b',
  				light: 'rgba(245, 158, 11, 0.1)',
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			heading: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  			// APTY Typography
  			'apty-body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  			'apty-heading': ['Gilroy', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			gradient: 'gradient 3s ease infinite',
  			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			spin: 'spin 1s linear infinite',
  			// APTY Animations
  			'apty-fade': 'aptyFade 0.3s ease-out',
  			'apty-scale': 'aptyScale 0.2s ease-out',
  			'apty-slide': 'aptySlide 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  			'apty-pulse': 'aptyPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'apty-shake': 'aptyShake 0.5s ease-in-out',
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
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
  			// APTY Keyframes
  			aptyFade: {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' }
  			},
  			aptyScale: {
  				'0%': { transform: 'scale(0.95)' },
  				'100%': { transform: 'scale(1)' }
  			},
  			aptySlide: {
  				'0%': { transform: 'translateY(-4px)', opacity: '0' },
  				'100%': { transform: 'translateY(0)', opacity: '1' }
  			},
  			aptyPulse: {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.8' }
  			},
  			aptyShake: {
  				'0%, 100%': { transform: 'translateX(0)' },
  				'25%': { transform: 'translateX(-4px)' },
  				'75%': { transform: 'translateX(4px)' }
  			},
  		},
  		// Background Gradients - Centralized from audit
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'brand-gradient': 'linear-gradient(135deg, #5033FF 0%, #9333ea 100%)',
  			'brand-gradient-hover': 'linear-gradient(135deg, #4129E6 0%, #ec4899 100%)',
  			'indigo-purple': 'linear-gradient(to right, #4f46e5, #9333ea)',
  			'purple-pink': 'linear-gradient(to right, #9333ea, #ec4899)',
  			'blue-indigo': 'linear-gradient(to right, #3b82f6, #4f46e5)',
  			// APTY Gradients with CSS variables
  			'apty-gradient-primary': 'var(--apty-gradient-primary)',
  			'apty-gradient-secondary': 'var(--apty-gradient-secondary)',
  			'apty-gradient-vibrant': 'var(--apty-gradient-vibrant)',
  			'apty-gradient-soft': 'var(--apty-gradient-soft)',
  			'apty-gradient-dark': 'var(--apty-gradient-dark)',
  			'apty-gradient-subtle': 'var(--apty-gradient-subtle)',
  			'apty-gradient-hover': 'var(--apty-gradient-hover)',
  		},
  		// Fixed dimensions from audit
  		width: {
  			'modal-sm': '400px',
  			'modal-md': '600px',
  			'modal-lg': '800px',
  		},
  		height: {
  			'header': '60px',
  			'header-lg': '80px',
  			'header-xl': '90px',
  			'hero': '580px',
  		},
  		maxHeight: {
  			'modal': 'calc(90vh - 200px)', // Was hardcoded in multiple places
  			'dropdown': '400px',
  		},
  		minWidth: {
  			'button': '180px', // Was hardcoded min-w-[180px]
  			'card': '280px',
  		},
  		// Box shadows for depth
  		boxShadow: {
  			'brand': '0 4px 14px 0 rgba(80, 51, 255, 0.39)',
  			'brand-lg': '0 10px 30px 0 rgba(80, 51, 255, 0.3)',
  			// APTY Shadows with CSS variables
  			'apty-sm': 'var(--apty-shadow-sm)',
  			'apty-md': 'var(--apty-shadow-md)',
  			'apty-lg': 'var(--apty-shadow-lg)',
  			'apty-xl': 'var(--apty-shadow-xl)',
  			'apty-brand': 'var(--apty-shadow-brand)',
  			'apty-brand-lg': 'var(--apty-shadow-brand-lg)',
  			'apty-hover': 'var(--apty-shadow-hover)',
  			'apty-active': 'var(--apty-shadow-active)',
  			'apty-focus': 'var(--apty-shadow-focus)',
  		},
  		// Transition timing functions
  		transitionTimingFunction: {
  			'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  			'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
  			// APTY Transitions with CSS variables
  			'apty-smooth': 'var(--apty-ease-smooth)',
  			'apty-bounce': 'var(--apty-ease-bounce)',
  			'apty-elastic': 'var(--apty-ease-elastic)',
  		},
  		// Transition durations with CSS variables
  		transitionDuration: {
  			'apty-fast': 'var(--apty-duration-fast)',
  			'apty-normal': 'var(--apty-duration-normal)',
  			'apty-slow': 'var(--apty-duration-slow)',
  		},
  		// Additional opacity values
  		opacity: {
  			'15': '0.15',
  			'35': '0.35',
  			'85': '0.85',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			// APTY Border Radius with CSS variables
  			'apty-sm': 'var(--apty-radius-sm)',
  			'apty-md': 'var(--apty-radius-md)',
  			'apty-lg': 'var(--apty-radius-lg)',
  			'apty-xl': 'var(--apty-radius-xl)',
  			'apty-2xl': 'var(--apty-radius-2xl)',
  			'apty-full': 'var(--apty-radius-full)',
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    // Custom utilities for repeated patterns from audit
    function({ addUtilities, addComponents, theme }) {
      // Mix-blend-mode utilities (was repeated inline 3 times)
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
      
      // Gradient text component (was repeated in multiple files)
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
        // APTY Components
        '.apty-gradient-text': {
          backgroundImage: theme('backgroundImage.apty-gradient-primary'),
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        },
        '.apty-gradient-text-hover': {
          '&:hover': {
            backgroundImage: theme('backgroundImage.apty-gradient-hover'),
          },
        },
        // Base button styles - sizing is handled by components
        '.apty-button': {
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          boxSizing: 'border-box',
        },
        '.apty-button-primary': {
          backgroundColor: 'rgb(var(--apty-primary))',
          color: 'rgb(var(--apty-text-on-brand))',
          '&:hover': {
            backgroundColor: 'rgb(var(--apty-primary-hover))',
            boxShadow: 'var(--apty-shadow-brand)',
          },
          '&:active': {
            backgroundColor: 'rgb(var(--apty-primary-active))',
            boxShadow: 'var(--apty-shadow-active)',
          },
          '&:focus': {
            outline: 'none',
            boxShadow: 'var(--apty-shadow-focus)',
          },
        },
        '.apty-button-secondary': {
          backgroundColor: 'transparent',
          color: 'rgb(var(--apty-primary))',
          border: '1.5px solid rgb(var(--apty-tertiary))',
          boxSizing: 'border-box',
          '&:hover': {
            borderColor: 'rgb(var(--apty-primary))',
            backgroundColor: 'rgba(var(--apty-primary) / 0.05)',
          },
          '&:active': {
            borderColor: 'rgb(var(--apty-primary-hover))',
            backgroundColor: 'rgba(var(--apty-primary) / 0.1)',
          },
        },
        '.apty-link': {
          color: 'rgb(var(--apty-text-primary))',
          transition: 'color 200ms ease',
          '&:hover': {
            color: 'rgb(var(--apty-primary))',
          },
        },
        '.apty-link-primary': {
          color: 'rgb(var(--apty-primary))',
          '&:hover': {
            color: 'rgb(var(--apty-primary-hover))',
          },
        },
        '.apty-card': {
          backgroundColor: 'rgb(var(--apty-bg-base))',
          borderRadius: 'var(--apty-radius-lg)',
          padding: '24px',
          border: '1px solid rgb(var(--apty-border-default))',
          transition: 'all var(--apty-duration-normal) var(--apty-ease-smooth)',
          '&:hover': {
            boxShadow: 'var(--apty-shadow-hover)',
            transform: 'translateY(-4px)',
          },
        },
        '.apty-input': {
          width: '100%',
          padding: '10px 16px',
          fontSize: '16px',
          color: 'rgb(var(--apty-text-primary))',
          backgroundColor: 'rgb(var(--apty-bg-base))',
          border: '1.5px solid rgb(var(--apty-border-default))',
          borderRadius: 'var(--apty-radius-md)',
          transition: 'all 200ms ease',
          '&::placeholder': {
            color: 'rgb(var(--apty-text-placeholder))',
          },
          '&:hover': {
            borderColor: 'rgb(var(--apty-border-hover))',
          },
          '&:focus': {
            outline: 'none',
            borderColor: 'rgb(var(--apty-border-focus))',
            boxShadow: 'var(--apty-shadow-focus)',
          },
          '&:disabled': {
            backgroundColor: 'rgb(var(--apty-bg-active))',
            borderColor: 'rgb(var(--apty-border-disabled))',
            color: 'rgb(var(--apty-text-disabled))',
            cursor: 'not-allowed',
          },
        },
      })
      
      // APTY Utilities
      addUtilities({
        '.apty-transition': {
          transition: 'all var(--apty-duration-normal) var(--apty-ease-smooth)',
        },
        '.apty-transition-fast': {
          transition: 'all var(--apty-duration-fast) var(--apty-ease-smooth)',
        },
        '.apty-transition-slow': {
          transition: 'all var(--apty-duration-slow) var(--apty-ease-smooth)',
        },
        '.apty-hover-lift': {
          transition: 'transform var(--apty-duration-normal) var(--apty-ease-smooth), box-shadow var(--apty-duration-normal) var(--apty-ease-smooth)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 'var(--apty-shadow-hover)',
          },
        },
        '.apty-hover-scale': {
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        '.apty-active-scale': {
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        '.apty-focus-ring': {
          '&:focus': {
            outline: 'none',
            boxShadow: 'var(--apty-shadow-focus)',
          },
        },
        '.apty-disabled': {
          opacity: '0.5',
          cursor: 'not-allowed',
          pointerEvents: 'none',
        },
      })
    },
  ],
} 