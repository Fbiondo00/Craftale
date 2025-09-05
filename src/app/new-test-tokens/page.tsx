/**
 * new-test-tokens/page.tsx
 * 
 * APTY Design System test page with comprehensive dark mode implementation.
 * 
 * Purpose:
 * - Showcase all APTY design tokens in both light and dark modes
 * - Test theme switching functionality with real-time updates
 * - Demonstrate hover states, micro-interactions, and transitions
 * - Validate color contrast ratios for accessibility
 * - Serve as a living style guide for the design system
 * 
 * Features:
 * - Theme-aware components that adapt to light/dark mode
 * - Interactive elements showcasing all design tokens
 * - Comprehensive hover and focus states
 * - Loading state to prevent hydration mismatches
 * - Storage status indicator for debugging
 * 
 * Structure:
 * - ThemeProvider wrapper for context access
 * - TestTokensContent component for theme-aware rendering
 * - Fixed position theme toggle for easy access
 * 
 * @page
 */

'use client';

import { useState } from 'react';
import AptyHomepageWireframe from '@/components/test-tokens/AptyHomepageWireframe';
import AptyPricingWireframe from '@/components/test-tokens/AptyPricingWireframe';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

// Inner component that uses theme context
function TestTokensContent() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<string | null>(null);
  const { isDarkMode, hasStorageSupport, isInitialized } = useTheme();
  
  return (
    <div className="min-h-screen bg-apty-bg-base text-apty-text-primary font-apty-body">
      <div className="container mx-auto p-8">
        <h1 className="text-6xl font-bold mb-8 font-apty-heading apty-gradient-text">
          APTY Design System Test Page
        </h1>
        <p className="text-lg text-apty-text-secondary mb-8">
          Production-grade design tokens with comprehensive hover states and micro-interactions
        </p>
        
        {/* Dark Mode Status Indicator */}
        <div className="mb-8 p-4 bg-apty-bg-subtle rounded-apty-lg border border-apty-border-default">
          <p className="text-sm text-apty-text-tertiary">
            {isInitialized ? (
              <>
                Current Mode: <span className="font-semibold text-apty-primary">{isDarkMode ? 'Dark' : 'Light'}</span>
                {' • '}
                All APTY design tokens automatically adapt to the selected theme
                {!hasStorageSupport && (
                  <>
                    {' • '}
                    <span className="text-apty-warning">Storage unavailable - preferences won't persist</span>
                  </>
                )}
              </>
            ) : (
              <span className="opacity-50">Loading theme preferences...</span>
            )}
          </p>
        </div>
        
        {/* Brand Colors with Interactive States */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Brand Colors with States
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="apty-hover-lift">
              <div className="w-full h-20 bg-apty-primary rounded-apty-lg mb-2 apty-transition hover:bg-apty-primary-hover active:bg-apty-primary-active"></div>
              <p className="text-sm">apty-primary<br/>#6720FF</p>
              <p className="text-xs text-apty-text-tertiary">Hover & Active states</p>
            </div>
            <div className="apty-hover-lift">
              <div className="w-full h-20 bg-apty-secondary rounded-apty-lg mb-2 apty-transition hover:bg-apty-secondary-hover"></div>
              <p className="text-sm">apty-secondary<br/>#5033FF</p>
            </div>
            <div className="apty-hover-lift">
              <div className="w-full h-20 bg-apty-tertiary rounded-apty-lg mb-2 apty-transition hover:bg-apty-tertiary-hover"></div>
              <p className="text-sm">apty-tertiary<br/>#A176FF</p>
            </div>
            <div className="apty-hover-lift">
              <div className="w-full h-20 bg-apty-accent rounded-apty-lg mb-2 apty-transition hover:bg-apty-accent-hover active:bg-apty-accent-active"></div>
              <p className="text-sm">apty-accent<br/>#FF4E8C</p>
            </div>
            <div className="apty-hover-lift">
              <div className="w-full h-20 bg-apty-bg-inverse rounded-apty-lg mb-2 apty-transition hover:bg-apty-bg-inverse-hover"></div>
              <p className="text-sm">apty-inverse<br/>#191919</p>
            </div>
          </div>
        </section>

        {/* Gradients with Hover Transitions */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Gradients with Hover Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="h-20 rounded-apty-lg bg-apty-gradient-primary apty-transition apty-hover-lift cursor-pointer"
              onMouseEnter={() => setIsHovered('gradient1')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="h-full rounded-apty-lg flex items-center justify-center">
                <p className="text-apty-text-on-brand font-semibold">
                  {isHovered === 'gradient1' ? 'Hovered!' : 'apty-gradient-primary'}
                </p>
              </div>
            </div>
            <div className="h-20 rounded-apty-lg bg-apty-gradient-secondary apty-transition apty-hover-lift"></div>
            <div className="h-20 rounded-apty-lg bg-apty-gradient-vibrant apty-transition apty-hover-lift"></div>
            <div className="h-20 rounded-apty-lg bg-apty-gradient-soft apty-transition apty-hover-lift"></div>
          </div>
        </section>

        {/* Typography with Hover States */}
        <section className="mb-12 bg-apty-bg-subtle p-8 rounded-apty-xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Typography with Interactive States
          </h2>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold font-apty-heading text-apty-text-primary apty-transition hover:text-apty-primary cursor-pointer">
              Heading with Hover Effect
            </h1>
            <h2 className="text-4xl font-semibold font-apty-heading text-apty-text-primary">
              Section Heading
            </h2>
            <p className="text-lg text-apty-text-secondary apty-transition hover:text-apty-text-secondary-hover">
              Body text that changes color on hover - a key APTY interaction pattern
            </p>
            <a href="#" className="apty-link inline-block">
              Standard link that turns purple on hover →
            </a>
            <br />
            <a href="#" className="apty-link-primary inline-block">
              Primary link with darker hover state →
            </a>
          </div>
        </section>

        {/* Interactive Buttons with All States */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Buttons with Micro-interactions
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="apty-button apty-button-primary">
              Primary Button
            </button>
            <button className="apty-button apty-button-secondary">
              Secondary Button
            </button>
            <button className="px-4 py-2 bg-apty-bg-inverse text-apty-text-inverse rounded-apty-md apty-transition hover:bg-apty-bg-inverse-hover apty-hover-lift apty-active-scale">
              Dark Button
            </button>
            <button className="px-4 py-2 bg-apty-gradient-vibrant text-apty-text-on-brand rounded-apty-md apty-transition apty-hover-lift apty-active-scale font-semibold">
              Gradient Button
            </button>
            <button className="px-4 py-2 bg-apty-bg-base text-apty-text-disabled border-2 border-apty-border-disabled rounded-apty-md apty-disabled">
              Disabled Button
            </button>
          </div>
        </section>

        {/* Form Elements with Focus States */}
        <section className="mb-12 bg-apty-bg-muted p-8 rounded-apty-xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Form Elements with Focus & Hover States
          </h2>
          <div className="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Text input with hover and focus states"
              className="apty-input"
              onFocus={() => setIsFocused('input1')}
              onBlur={() => setIsFocused(null)}
            />
            {isFocused === 'input1' && (
              <p className="text-sm text-apty-primary animate-apty-fade">Focus ring active with brand color</p>
            )}
            
            <select className="apty-input">
              <option>Select with APTY styling</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            
            <textarea
              placeholder="Textarea with all interactive states"
              className="apty-input min-h-[100px] resize-none"
            />
            
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="mr-2" />
                <span className="text-apty-text-primary group-hover:text-apty-primary apty-transition">
                  Checkbox with label hover
                </span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input type="radio" name="radio" className="mr-2" />
                <span className="text-apty-text-primary group-hover:text-apty-primary apty-transition">
                  Radio option
                </span>
              </label>
            </div>
          </div>
        </section>

        {/* Cards with Hover Effects */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Cards with Elevation Changes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="apty-card">
              <div className="w-12 h-12 bg-apty-primary rounded-apty-md mb-4"></div>
              <h3 className="text-lg font-semibold mb-2 text-apty-text-primary hover:text-apty-primary apty-transition cursor-pointer">
                Feature Card
              </h3>
              <p className="text-sm text-apty-text-secondary">
                Card lifts on hover with smooth shadow transition
              </p>
            </div>
            
            <div className="bg-apty-bg-elevated p-6 rounded-apty-lg border-2 border-apty-primary shadow-apty-brand apty-transition hover:shadow-apty-brand-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-apty-gradient-primary rounded-apty-md mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Highlighted Card</h3>
              <p className="text-sm text-apty-text-secondary">
                Primary border with brand shadow
              </p>
            </div>
            
            <div className="bg-apty-bg-inverse p-6 rounded-apty-lg apty-transition hover:bg-apty-bg-inverse-hover apty-hover-lift">
              <div className="w-12 h-12 bg-apty-accent rounded-apty-md mb-4"></div>
              <h3 className="text-lg font-semibold mb-2 text-apty-text-inverse">Dark Card</h3>
              <p className="text-sm text-apty-text-inverse opacity-80">
                Dark theme with hover background change
              </p>
            </div>
          </div>
        </section>

        {/* State Colors with Interactive Examples */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            State Colors & Notifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-apty-success-bg border border-apty-success-border rounded-apty-md p-4 apty-transition hover:border-apty-success cursor-pointer">
              <p className="text-apty-success-text font-semibold">Success</p>
              <p className="text-apty-success-text text-sm mt-1">Operation complete</p>
            </div>
            <div className="bg-apty-error-bg border border-apty-error-border rounded-apty-md p-4 apty-transition hover:border-apty-error cursor-pointer animate-apty-pulse">
              <p className="text-apty-error-text font-semibold">Error</p>
              <p className="text-apty-error-text text-sm mt-1">Please try again</p>
            </div>
            <div className="bg-apty-warning-bg border border-apty-warning-border rounded-apty-md p-4 apty-transition hover:border-apty-warning cursor-pointer">
              <p className="text-apty-warning-text font-semibold">Warning</p>
              <p className="text-apty-warning-text text-sm mt-1">Check details</p>
            </div>
            <div className="bg-apty-info-bg border border-apty-info-border rounded-apty-md p-4 apty-transition hover:border-apty-info cursor-pointer">
              <p className="text-apty-info-text font-semibold">Info</p>
              <p className="text-apty-info-text text-sm mt-1">New update</p>
            </div>
          </div>
        </section>

        {/* Shadow Elevations */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Shadow Elevations & Focus States
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-apty-bg-base p-6 rounded-apty-lg shadow-apty-sm text-center apty-transition hover:shadow-apty-md">
              <p className="text-sm text-apty-text-secondary">Small Shadow</p>
            </div>
            <div className="bg-apty-bg-base p-6 rounded-apty-lg shadow-apty-md text-center apty-transition hover:shadow-apty-lg">
              <p className="text-sm text-apty-text-secondary">Medium Shadow</p>
            </div>
            <div className="bg-apty-bg-base p-6 rounded-apty-lg shadow-apty-lg text-center apty-transition hover:shadow-apty-xl">
              <p className="text-sm text-apty-text-secondary">Large Shadow</p>
            </div>
            <div className="bg-apty-bg-base p-6 rounded-apty-lg shadow-apty-xl text-center apty-transition hover:shadow-apty-brand-lg">
              <p className="text-sm text-apty-text-secondary">XL Shadow</p>
            </div>
          </div>
        </section>

        {/* Interactive Link Examples */}
        <section className="mb-12 bg-apty-bg-subtle p-8 rounded-apty-xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Link Behaviors & Text Interactions
          </h2>
          <div className="space-y-4">
            <p className="text-lg">
              This is a paragraph with an <a href="#" className="apty-link underline">inline link</a> that changes from black to purple on hover,
              matching APTY's signature interaction pattern.
            </p>
            <p className="text-lg text-apty-text-secondary apty-transition hover:text-apty-text-primary cursor-pointer">
              Entire paragraph becomes primary color on hover
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-apty-text-primary hover:text-apty-primary apty-transition font-semibold">
                Navigation Link
              </a>
              <a href="#" className="text-apty-text-secondary hover:text-apty-primary apty-transition">
                Secondary Nav
              </a>
              <a href="#" className="text-apty-text-link-visited hover:text-apty-primary apty-transition">
                Visited Link
              </a>
            </div>
          </div>
        </section>

        {/* Loading States & Animations */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Loading States & Animations
          </h2>
          <div className="flex items-center space-x-8">
            <div className="animate-spin h-8 w-8 border-4 border-apty-primary border-t-transparent rounded-full"></div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-apty-primary rounded-full animate-apty-pulse"></div>
              <div className="w-3 h-3 bg-apty-primary rounded-full animate-apty-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-apty-primary rounded-full animate-apty-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="h-2 w-32 bg-apty-bg-muted rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-apty-gradient-primary animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Hover State Matrix */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Comprehensive Hover State Matrix
          </h2>
          <div className="bg-apty-bg-base border border-apty-border-default rounded-apty-xl p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-apty-border-subtle">
                  <th className="text-left py-3 text-sm font-semibold text-apty-text-secondary">Element</th>
                  <th className="text-left py-3 text-sm font-semibold text-apty-text-secondary">Default</th>
                  <th className="text-left py-3 text-sm font-semibold text-apty-text-secondary">Hover</th>
                  <th className="text-left py-3 text-sm font-semibold text-apty-text-secondary">Active</th>
                  <th className="text-left py-3 text-sm font-semibold text-apty-text-secondary">Focus</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-apty-border-subtle hover:bg-apty-bg-hover apty-transition">
                  <td className="py-3">Text</td>
                  <td className="py-3 text-apty-text-primary">#111111</td>
                  <td className="py-3 text-apty-primary">#6720FF</td>
                  <td className="py-3">-</td>
                  <td className="py-3">-</td>
                </tr>
                <tr className="border-b border-apty-border-subtle hover:bg-apty-bg-hover apty-transition">
                  <td className="py-3">Button</td>
                  <td className="py-3">
                    <span className="px-3 py-1 bg-apty-primary text-white text-sm rounded">Primary</span>
                  </td>
                  <td className="py-3">
                    <span className="px-3 py-1 bg-apty-primary-hover text-white text-sm rounded">Darker + Lift</span>
                  </td>
                  <td className="py-3">
                    <span className="px-3 py-1 bg-apty-primary-active text-white text-sm rounded">Pressed</span>
                  </td>
                  <td className="py-3">Ring</td>
                </tr>
                <tr className="hover:bg-apty-bg-hover apty-transition">
                  <td className="py-3">Card</td>
                  <td className="py-3">No shadow</td>
                  <td className="py-3">Shadow + Lift</td>
                  <td className="py-3">-</td>
                  <td className="py-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Transition Timing Examples */}
        <section className="mb-12 bg-apty-bg-muted p-8 rounded-apty-xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Transition Timing & Easing
          </h2>
          <div className="space-y-4">
            <div 
              className="bg-apty-primary text-white p-4 rounded-apty-md text-center duration-apty-fast ease-apty-smooth hover:bg-apty-primary-hover cursor-pointer"
            >
              Fast Transition (150ms)
            </div>
            <div className="bg-apty-secondary text-white p-4 rounded-apty-md text-center duration-apty-normal ease-apty-smooth hover:bg-apty-secondary-hover cursor-pointer">
              Normal Transition (250ms)
            </div>
            <div className="bg-apty-tertiary text-white p-4 rounded-apty-md text-center duration-apty-slow ease-apty-bounce hover:bg-apty-tertiary-hover cursor-pointer">
              Slow with Bounce (350ms)
            </div>
          </div>
        </section>

        {/* Homepage Wireframe with APTY Style */}
        <section className="mb-12">
          <AptyHomepageWireframe />
        </section>

        {/* Pricing Page Wireframe with APTY Style */}
        <section className="mb-12">
          <AptyPricingWireframe />
        </section>

        {/* Design System Comparison */}
        <section className="mb-12 bg-apty-bg-inverse p-8 rounded-apty-xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-inverse opacity-80 mb-6 font-apty-heading">
            Design System Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-apty-accent text-lg font-semibold mb-4">Current System</h3>
              <ul className="text-apty-text-inverse text-sm space-y-2 opacity-90">
                <li>• Primary: #5033FF (brand-primary)</li>
                <li>• Typography: System fonts</li>
                <li>• Shadows: Tailwind defaults</li>
                <li>• Transitions: Standard ease</li>
                <li>• Hover: Color changes only</li>
              </ul>
            </div>
            <div>
              <h3 className="text-apty-accent text-lg font-semibold mb-4">APTY System</h3>
              <ul className="text-apty-text-inverse text-sm space-y-2 opacity-90">
                <li>• Primary: #6720FF (apty-primary)</li>
                <li>• Typography: Gilroy/Inter</li>
                <li>• Shadows: Custom elevation</li>
                <li>• Transitions: Smooth cubic-bezier</li>
                <li>• Hover: Color + transform + shadow</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Micro-interaction Showcase */}
        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-apty-text-secondary mb-6 font-apty-heading">
            Micro-interactions Showcase
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              className="p-4 bg-apty-bg-subtle rounded-apty-lg apty-transition hover:bg-apty-bg-selected group"
              onMouseEnter={() => setIsHovered('micro1')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="text-apty-text-primary group-hover:text-apty-primary apty-transition">
                {isHovered === 'micro1' ? '✓' : '+'} Hover Transform
              </div>
            </button>
            
            <button className="p-4 bg-apty-bg-subtle rounded-apty-lg apty-hover-scale">
              Scale on Hover
            </button>
            
            <button className="p-4 bg-apty-bg-subtle rounded-apty-lg apty-transition hover:rotate-3">
              Rotate on Hover
            </button>
            
            <button className="p-4 bg-apty-gradient-primary text-white rounded-apty-lg apty-transition hover:opacity-90 active:scale-95">
              Multi-state Button
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

// Main component wrapped with ThemeProvider
export default function NewTestTokensPage() {
  return (
    <ThemeProvider>
      <TestTokensContent />
    </ThemeProvider>
  );
}