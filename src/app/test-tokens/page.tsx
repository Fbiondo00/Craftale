"use client";

import HomepageWireframe from "@/components/test-tokens/HomepageWireframe";
import PricingWireframe from "@/components/test-tokens/PricingWireframe";

export default function TestTokensPage() {
  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-color-primary">Semantic Design Token Test Page</h1>
      <p className="text-color-secondary mb-8">
        All tokens now use color- prefix for better scalability and organization
      </p>

      {/* Brand Colors Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Brand Colors (New Tokens)</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <div className="w-full h-20 bg-brand-primary rounded-lg mb-2"></div>
            <p className="text-sm">
              brand-primary
              <br />
              #5033FF
            </p>
          </div>
          <div>
            <div className="w-full h-20 bg-brand-primary-hover rounded-lg mb-2"></div>
            <p className="text-sm">
              brand-primary-hover
              <br />
              #4129E6
            </p>
          </div>
          <div>
            <div className="w-full h-20 bg-brand-secondary rounded-lg mb-2"></div>
            <p className="text-sm">
              brand-secondary
              <br />
              #4f46e5
            </p>
          </div>
          <div>
            <div className="w-full h-20 bg-brand-tertiary rounded-lg mb-2"></div>
            <p className="text-sm">
              brand-tertiary
              <br />
              #9333ea
            </p>
          </div>
          <div>
            <div className="w-full h-20 bg-brand-accent rounded-lg mb-2"></div>
            <p className="text-sm">
              brand-accent
              <br />
              #ec4899
            </p>
          </div>
        </div>
      </section>

      {/* Gradients Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Gradients (New Tokens)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="w-full h-20 bg-brand-gradient rounded-lg mb-2"></div>
            <p className="text-sm">bg-brand-gradient</p>
          </div>
          <div>
            <div className="w-full h-20 bg-brand-gradient-hover rounded-lg mb-2"></div>
            <p className="text-sm">bg-brand-gradient-hover</p>
          </div>
          <div>
            <div className="w-full h-20 bg-indigo-purple rounded-lg mb-2"></div>
            <p className="text-sm">bg-indigo-purple</p>
          </div>
          <div>
            <div className="w-full h-20 bg-purple-pink rounded-lg mb-2"></div>
            <p className="text-sm">bg-purple-pink</p>
          </div>
        </div>
      </section>

      {/* Text Gradient Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Text Gradients</h2>
        <div className="space-y-4">
          <h3 className="text-4xl font-bold gradient-text">Gradient Text Component</h3>
          <h3 className="text-4xl font-bold gradient-text gradient-text-hover">Hover Me for Different Gradient</h3>
        </div>
      </section>

      {/* Mix Blend Mode Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Mix Blend Mode (New Utilities)</h2>
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg">
          <div className="bg-white p-4 rounded mix-blend-multiply">
            <p className="text-black">mix-blend-multiply applied</p>
          </div>
        </div>
      </section>

      {/* Fixed Dimensions Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Fixed Dimensions (New Tokens)</h2>
        <div className="space-y-4">
          <div className="bg-gray-200 h-header rounded">
            <p className="p-4">h-header (60px)</p>
          </div>
          <div className="bg-gray-300 h-header-lg rounded">
            <p className="p-4">h-header-lg (80px)</p>
          </div>
          <div className="bg-gray-400 h-header-xl rounded">
            <p className="p-4">h-header-xl (90px)</p>
          </div>
          <button className="bg-brand-primary text-white px-4 py-2 rounded min-w-button">min-w-button (180px)</button>
        </div>
      </section>

      {/* Header.tsx Specific Changes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Header.tsx Token Migration</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Before (Hardcoded):</h3>
            <button className="h-14 px-6 text-[#5033FF] border-2 border-[#5033FF] rounded-xl">
              Old Sign Up Button
            </button>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">After (With Tokens):</h3>
            <button className="h-14 px-6 text-brand-primary border-2 border-brand-primary rounded-xl">
              New Sign Up Button
            </button>
          </div>
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-2">Hover State:</h3>
            <button className="h-14 px-6 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl transition-colors">
              Hover Me
            </button>
          </div>
        </div>
      </section>

      {/* Overlay Colors Test */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overlay Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative h-32 bg-blue-500 rounded">
            <div className="absolute inset-0 bg-overlay-light rounded"></div>
            <p className="relative z-10 p-4 text-white">overlay-light</p>
          </div>
          <div className="relative h-32 bg-blue-500 rounded">
            <div className="absolute inset-0 bg-overlay-medium rounded"></div>
            <p className="relative z-10 p-4 text-white">overlay-medium</p>
          </div>
          <div className="relative h-32 bg-blue-500 rounded">
            <div className="absolute inset-0 bg-overlay-dark rounded"></div>
            <p className="relative z-10 p-4 text-white">overlay-dark</p>
          </div>
        </div>
      </section>

      {/* NEW: Semantic Text Tokens */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-color-primary">Semantic Text Tokens</h2>
        <div className="space-y-2 bg-color-subtle p-6 rounded-lg">
          <p className="text-color-primary">Primary Text (color-text-primary)</p>
          <p className="text-color-secondary">Secondary Text (color-text-secondary)</p>
          <p className="text-color-tertiary">Tertiary Text (color-text-tertiary)</p>
          <p className="text-color-muted">Muted Text (color-text-muted)</p>
          <p className="text-color-disabled">Disabled Text (color-text-disabled)</p>
          <div className="bg-color-inverse p-4 rounded mt-4">
            <p className="text-color-inverse">Inverse Text on dark background</p>
          </div>
        </div>
      </section>

      {/* NEW: Semantic Background Tokens */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-color-primary">Semantic Background Tokens</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-color-base p-4 border border-color-default rounded">
            <p className="text-color-primary">Base BG</p>
          </div>
          <div className="bg-color-subtle p-4 border border-color-default rounded">
            <p className="text-color-primary">Subtle BG</p>
          </div>
          <div className="bg-color-muted p-4 border border-color-default rounded">
            <p className="text-color-primary">Muted BG</p>
          </div>
          <div className="bg-color-elevated p-4 border border-color-default rounded shadow-lg">
            <p className="text-color-primary">Elevated BG</p>
          </div>
          <div className="bg-color-inverse p-4 rounded">
            <p className="text-color-inverse">Inverse BG</p>
          </div>
          <div className="bg-color-inverse-subtle p-4 rounded">
            <p className="text-color-inverse">Inverse Subtle BG</p>
          </div>
        </div>
      </section>

      {/* NEW: Semantic Border Tokens */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-color-primary">Semantic Border Tokens</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border-2 border-color-default rounded bg-color-base">
            <p className="text-color-primary">Default Border</p>
          </div>
          <div className="p-4 border-2 border-color-subtle rounded bg-color-base">
            <p className="text-color-primary">Subtle Border</p>
          </div>
          <div className="p-4 border-2 border-color-strong rounded bg-color-base">
            <p className="text-color-primary">Strong Border</p>
          </div>
          <div className="p-4 border-2 border-color-focus rounded bg-color-base">
            <p className="text-color-primary">Focus Border</p>
          </div>
          <div className="p-4 border-2 border-color-error rounded bg-color-base">
            <p className="text-color-state-error">Error Border</p>
          </div>
          <div className="p-4 border-2 border-color-success rounded bg-color-base">
            <p className="text-color-state-success">Success Border</p>
          </div>
        </div>
      </section>

      {/* NEW: State Colors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-color-primary">State Colors</h2>

        {/* Success States */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">Success States</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-color-state-success-bg p-4 border border-color-state-success-border rounded">
              <p className="text-color-state-success-text">Success Background</p>
            </div>
            <div className="bg-color-state-success p-4 rounded">
              <p className="text-white">Success Base</p>
            </div>
            <div className="bg-color-state-success-strong p-4 rounded">
              <p className="text-white">Success Strong</p>
            </div>
          </div>
        </div>

        {/* Error States */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">Error States</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-color-state-error-bg p-4 border border-color-state-error-border rounded">
              <p className="text-color-state-error-text">Error Background</p>
            </div>
            <div className="bg-color-state-error p-4 rounded">
              <p className="text-white">Error Base</p>
            </div>
            <div className="bg-color-state-error-strong p-4 rounded">
              <p className="text-white">Error Strong</p>
            </div>
          </div>
        </div>

        {/* Warning States */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">Warning States</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-color-state-warning-bg p-4 border border-color-state-warning-border rounded">
              <p className="text-color-state-warning-text">Warning Background</p>
            </div>
            <div className="bg-color-state-warning p-4 rounded">
              <p className="text-black">Warning Base</p>
            </div>
            <div className="bg-color-state-warning-strong p-4 rounded">
              <p className="text-white">Warning Strong</p>
            </div>
          </div>
        </div>

        {/* Info States */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">Info States</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-color-state-info-bg p-4 border border-color-state-info-border rounded">
              <p className="text-color-state-info-text">Info Background</p>
            </div>
            <div className="bg-color-state-info p-4 rounded">
              <p className="text-white">Info Base</p>
            </div>
            <div className="bg-color-state-info-strong p-4 rounded">
              <p className="text-white">Info Strong</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Interactive Elements */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-color-primary">Interactive Elements</h2>
        <div className="space-y-4 bg-color-subtle p-6 rounded-lg">
          <a href="#" className="text-brand-secondary hover:text-brand-primary underline">
            Interactive Link (hover me)
          </a>
          <br />
          <button className="px-6 py-3 bg-color-base text-color-primary border-2 border-color-default hover:border-color-hover focus:border-color-focus focus:ring-2 focus:ring-brand-primary/20 rounded-lg transition-all">
            Focus Me (Tab or Click)
          </button>
        </div>
      </section>

      {/* NEW: Surface Elevation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-color-primary">Surface Elevation</h2>
        <div className="bg-color-base p-6 rounded-lg border border-color-default">
          <p className="text-color-primary font-medium mb-4">Level 0 - Base</p>
          <div className="bg-color-subtle p-4 rounded shadow border border-color-subtle">
            <p className="text-color-secondary mb-4">Level 1 - Card</p>
            <div className="bg-color-muted p-4 rounded shadow-md border border-color-subtle">
              <p className="text-color-tertiary mb-4">Level 2 - Elevated</p>
              <div className="bg-color-elevated p-4 rounded shadow-lg border border-color-subtle">
                <p className="text-color-muted">Level 3 - Highest</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Opacity Support Demo */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-color-primary">Opacity Support</h2>
        <p className="text-color-secondary mb-4">All semantic tokens support opacity modifiers</p>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-color-state-success/20 p-4 rounded">
            <p className="text-color-primary text-sm">20%</p>
          </div>
          <div className="bg-color-state-success/40 p-4 rounded">
            <p className="text-color-primary text-sm">40%</p>
          </div>
          <div className="bg-color-state-success/60 p-4 rounded">
            <p className="text-white text-sm">60%</p>
          </div>
          <div className="bg-color-state-success/80 p-4 rounded">
            <p className="text-white text-sm">80%</p>
          </div>
          <div className="bg-color-state-success p-4 rounded">
            <p className="text-white text-sm">100%</p>
          </div>
        </div>
      </section>

      {/* NEW: Additional Semantic Tokens - Comprehensive Coverage */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-color-primary">Additional Semantic Token Tests</h2>

        {/* Text Variations with All Tokens */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">All Text Tokens</h3>
          <div className="space-y-2 bg-color-subtle p-4 rounded-lg">
            <p className="text-color-primary">text-color-primary - Main content text</p>
            <p className="text-color-secondary">text-color-secondary - Secondary content</p>
            <p className="text-color-tertiary">text-color-tertiary - Supporting text</p>
            <p className="text-color-muted">text-color-muted - Muted/subtle text</p>
            <p className="text-color-disabled">text-color-disabled - Disabled state text</p>
            <p className="text-color-placeholder">text-color-placeholder - Placeholder text</p>
            <div className="bg-color-inverse p-2 rounded mt-2">
              <p className="text-color-inverse">text-color-inverse - Inverse text on dark</p>
            </div>
            <div className="bg-brand-primary p-2 rounded mt-2">
              <p className="text-color-on-brand">text-color-on-brand - Text on brand color</p>
            </div>
          </div>
        </div>

        {/* Background Variations */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">All Background Tokens</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-color-base p-3 border border-color-default rounded">
              <span className="text-sm text-color-primary">bg-color-base</span>
            </div>
            <div className="bg-color-subtle p-3 border border-color-default rounded">
              <span className="text-sm text-color-primary">bg-color-subtle</span>
            </div>
            <div className="bg-color-muted p-3 border border-color-default rounded">
              <span className="text-sm text-color-primary">bg-color-muted</span>
            </div>
            <div className="bg-color-elevated p-3 border border-color-default rounded shadow">
              <span className="text-sm text-color-primary">bg-color-elevated</span>
            </div>
            <div className="bg-color-hover p-3 border border-color-default rounded">
              <span className="text-sm text-color-primary">bg-color-hover</span>
            </div>
            <div className="bg-color-active p-3 border border-color-default rounded">
              <span className="text-sm text-color-primary">bg-color-active</span>
            </div>
            <div className="bg-color-inverse p-3 rounded">
              <span className="text-sm text-color-inverse">bg-color-inverse</span>
            </div>
            <div className="bg-color-inverse-subtle p-3 rounded">
              <span className="text-sm text-color-inverse">bg-color-inverse-subtle</span>
            </div>
            <div className="relative bg-gray-600 p-3 rounded">
              <div className="absolute inset-0 bg-color-overlay/50 rounded"></div>
              <span className="relative text-sm text-white">bg-color-overlay</span>
            </div>
          </div>
        </div>

        {/* Border Variations */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">All Border Tokens</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 border-2 border-color-default rounded bg-color-base">
              <span className="text-xs text-color-primary">border-color-default</span>
            </div>
            <div className="p-3 border-2 border-color-strong rounded bg-color-base">
              <span className="text-xs text-color-primary">border-color-strong</span>
            </div>
            <div className="p-3 border-2 border-color-hover rounded bg-color-base">
              <span className="text-xs text-color-primary">border-color-hover</span>
            </div>
            <div className="p-3 border-2 border-color-focus rounded bg-color-base">
              <span className="text-xs text-color-primary">border-color-focus</span>
            </div>
            <div className="p-3 border-2 border-color-error rounded bg-color-base">
              <span className="text-xs text-color-state-error">border-color-error</span>
            </div>
            <div className="p-3 border-2 border-color-success rounded bg-color-base">
              <span className="text-xs text-color-state-success">border-color-success</span>
            </div>
          </div>
        </div>

        {/* Interactive States */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">Interactive States</h3>
          <div className="space-y-4 bg-color-subtle p-4 rounded-lg">
            <button className="px-4 py-2 bg-color-base text-color-primary border border-color-default hover:bg-color-hover hover:border-color-hover rounded transition-all">
              Hover me - Default to Hover
            </button>
            <button className="px-4 py-2 bg-color-base text-color-primary border border-color-default active:bg-color-active active:border-color-strong rounded transition-all">
              Click me - Active State
            </button>
            <button className="px-4 py-2 bg-color-base text-color-disabled border border-color-default cursor-not-allowed opacity-50 rounded">
              Disabled Button
            </button>
            <input
              type="text"
              placeholder="Input with focus state"
              className="px-4 py-2 bg-color-base text-color-primary border border-color-default focus:border-color-focus focus:ring-2 focus:ring-color-focus/20 rounded transition-all w-full"
            />
          </div>
        </div>

        {/* Opacity Variations */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">Opacity Variations</h3>
          <div className="grid grid-cols-5 gap-2">
            <div className="bg-color-primary/10 p-3 rounded">
              <span className="text-xs text-color-primary">10%</span>
            </div>
            <div className="bg-color-primary/25 p-3 rounded">
              <span className="text-xs text-color-primary">25%</span>
            </div>
            <div className="bg-color-primary/50 p-3 rounded">
              <span className="text-xs text-color-primary">50%</span>
            </div>
            <div className="bg-color-primary/75 p-3 rounded">
              <span className="text-xs text-white">75%</span>
            </div>
            <div className="bg-color-primary p-3 rounded">
              <span className="text-xs text-white">100%</span>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-2">
            <div className="p-3 border-2 border-color-default/20 rounded">
              <span className="text-xs text-color-muted">20%</span>
            </div>
            <div className="p-3 border-2 border-color-default/40 rounded">
              <span className="text-xs text-color-muted">40%</span>
            </div>
            <div className="p-3 border-2 border-color-default/60 rounded">
              <span className="text-xs text-color-secondary">60%</span>
            </div>
            <div className="p-3 border-2 border-color-default/80 rounded">
              <span className="text-xs text-color-secondary">80%</span>
            </div>
            <div className="p-3 border-2 border-color-default rounded">
              <span className="text-xs text-color-primary">100%</span>
            </div>
          </div>
        </div>

        {/* Responsive Variants */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">Responsive Variants</h3>
          <div className="space-y-3 bg-color-subtle p-4 rounded-lg">
            <div className="text-color-muted md:text-color-secondary lg:text-color-primary">
              Changes color based on screen size (mobile→tablet→desktop)
            </div>
            <div className="bg-color-base md:bg-color-subtle lg:bg-color-muted p-3 rounded border border-color-default">
              Background changes with screen size
            </div>
            <div className="border-2 border-color-default md:border-color-strong lg:border-color-focus p-3 rounded">
              Border changes with screen size
            </div>
          </div>
        </div>

        {/* Dark Mode Variants (if applicable) */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">Dark Mode Support</h3>
          <div className="space-y-3 bg-color-subtle dark:bg-color-inverse-subtle p-4 rounded-lg">
            <p className="text-color-primary dark:text-color-inverse">This text adapts to dark mode</p>
            <div className="bg-color-base dark:bg-color-inverse p-3 rounded border border-color-default dark:border-color-strong">
              Container with dark mode support
            </div>
          </div>
        </div>

        {/* State Color Complete Test */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3 text-color-secondary">Complete State Color Matrix</h3>
          <div className="grid grid-cols-4 gap-4">
            {/* Success Complete */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-color-state-success">Success</h4>
              <div className="bg-color-state-success-bg p-2 rounded border border-color-state-success-border">
                <p className="text-color-state-success-text text-xs">Background</p>
              </div>
              <div className="bg-color-state-success-subtle p-2 rounded">
                <p className="text-color-primary text-xs">Subtle</p>
              </div>
              <div className="bg-color-state-success p-2 rounded">
                <p className="text-white text-xs">Base</p>
              </div>
              <div className="bg-color-state-success-strong p-2 rounded">
                <p className="text-white text-xs">Strong</p>
              </div>
            </div>

            {/* Error Complete */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-color-state-error">Error</h4>
              <div className="bg-color-state-error-bg p-2 rounded border border-color-state-error-border">
                <p className="text-color-state-error-text text-xs">Background</p>
              </div>
              <div className="bg-color-state-error-subtle p-2 rounded">
                <p className="text-color-primary text-xs">Subtle</p>
              </div>
              <div className="bg-color-state-error p-2 rounded">
                <p className="text-white text-xs">Base</p>
              </div>
              <div className="bg-color-state-error-strong p-2 rounded">
                <p className="text-white text-xs">Strong</p>
              </div>
            </div>

            {/* Warning Complete */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-color-state-warning">Warning</h4>
              <div className="bg-color-state-warning-bg p-2 rounded border border-color-state-warning-border">
                <p className="text-color-state-warning-text text-xs">Background</p>
              </div>
              <div className="bg-color-state-warning-subtle p-2 rounded">
                <p className="text-color-primary text-xs">Subtle</p>
              </div>
              <div className="bg-color-state-warning p-2 rounded">
                <p className="text-black text-xs">Base</p>
              </div>
              <div className="bg-color-state-warning-strong p-2 rounded">
                <p className="text-white text-xs">Strong</p>
              </div>
            </div>

            {/* Info Complete */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-color-state-info">Info</h4>
              <div className="bg-color-state-info-bg p-2 rounded border border-color-state-info-border">
                <p className="text-color-state-info-text text-xs">Background</p>
              </div>
              <div className="bg-color-state-info-subtle p-2 rounded">
                <p className="text-color-primary text-xs">Subtle</p>
              </div>
              <div className="bg-color-state-info p-2 rounded">
                <p className="text-white text-xs">Base</p>
              </div>
              <div className="bg-color-state-info-strong p-2 rounded">
                <p className="text-white text-xs">Strong</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Homepage Wireframe Visualization - Moved to bottom */}
      <section className="mb-12">
        <HomepageWireframe />
      </section>

      {/* Pricing Page Wireframe Visualization */}
      <section className="mb-12">
        <PricingWireframe />
      </section>
    </div>
  );
}
