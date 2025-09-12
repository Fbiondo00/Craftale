"use client";

import { motion } from "framer-motion";

interface Section {
  name: string;
  backgroundColor?: string;
  className?: string;
  additionalStyles?: React.CSSProperties;
  height: string;
  colorCode?: string;
  elements?: React.ReactNode;
}

export default function AptyPricingWireframe() {
  const sections: Section[] = [
    {
      name: "Header",
      className: "bg-apty-bg-base border-b border-apty-border-default",
      height: "h-16",
      colorCode: "bg-base",
      elements: (
        <div className="flex items-center justify-between h-full px-6">
          <div className="w-28 h-8 rounded bg-apty-primary/20"></div>
          <div className="flex space-x-6">
            <div className="w-20 h-6 rounded bg-apty-text-primary/10"></div>
            <div className="w-20 h-6 rounded bg-apty-text-primary/10"></div>
            <div className="w-20 h-6 rounded bg-apty-text-primary/10"></div>
            <div className="w-20 h-6 rounded bg-apty-text-primary/10"></div>
          </div>
          <div className="flex space-x-3">
            <div className="w-24 h-9 rounded-lg border-[1.5px] border-apty-tertiary bg-transparent"></div>
            <div className="w-24 h-9 rounded-lg bg-apty-primary"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Hero Section",
      className: "bg-apty-gradient-soft",
      height: "h-64",
      colorCode: "gradient-soft",
      elements: (
        <div className="flex flex-col items-center justify-center h-full px-8 space-y-4">
          <div className="w-32 h-8 rounded-full bg-apty-accent/20"></div>
          <div className="w-[480px] h-12 rounded bg-apty-text-primary/15"></div>
          <div className="space-y-2">
            <div className="w-[420px] h-4 rounded mx-auto bg-apty-text-secondary/10"></div>
            <div className="w-[360px] h-4 rounded mx-auto bg-apty-text-secondary/10"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Toggle Section",
      className: "bg-apty-bg-base",
      height: "h-24",
      colorCode: "bg-base",
      elements: (
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-5 rounded bg-apty-text-secondary/15"></div>
            <div className="w-48 h-12 rounded-full flex items-center p-1 bg-apty-bg-muted border border-apty-border-default">
              <div className="w-1/2 h-10 rounded-full bg-apty-primary"></div>
            </div>
            <div className="w-20 h-5 rounded bg-apty-text-secondary/15"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Pricing Cards",
      className: "bg-apty-bg-base",
      height: "h-[600px]",
      colorCode: "bg-base",
      elements: (
        <div className="px-8 py-12">
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="rounded-xl p-8 bg-apty-bg-base border border-apty-border-default shadow-apty-lg">
              <div className="w-24 h-6 rounded mb-4 bg-apty-text-secondary/20"></div>
              <div className="w-32 h-10 rounded mb-2 bg-apty-text-primary/15"></div>
              <div className="w-20 h-4 rounded mb-8 bg-apty-text-secondary/10"></div>
              <div className="space-y-3 mb-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center">
                    <div className="w-5 h-5 rounded-full mr-3 bg-apty-secondary/20"></div>
                    <div
                      className={`h-3 rounded bg-apty-text-secondary/10 ${i === 2 ? "w-36" : i === 3 ? "w-44" : i === 4 ? "w-32" : "w-40"}`}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="w-full h-12 rounded-lg border-[1.5px] border-apty-tertiary bg-transparent"></div>
            </div>

            {/* Pro Plan - Featured */}
            <div className="rounded-xl p-8 relative bg-apty-bg-base border-2 border-apty-primary shadow-apty-xl">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="px-4 py-1 rounded-full bg-apty-primary">
                  <span className="text-xs text-apty-text-on-brand">POPULAR</span>
                </div>
              </div>
              <div className="w-24 h-6 rounded mb-4 mt-4 bg-apty-primary/20"></div>
              <div className="w-32 h-10 rounded mb-2 bg-apty-text-primary/15"></div>
              <div className="w-20 h-4 rounded mb-8 bg-apty-text-secondary/10"></div>
              <div className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center">
                    <div className="w-5 h-5 rounded-full mr-3 bg-apty-primary"></div>
                    <div
                      className={`h-3 rounded bg-apty-text-secondary/10 ${i === 2 ? "w-36" : i === 3 ? "w-44" : i === 4 ? "w-32" : i === 5 ? "w-38" : "w-40"}`}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="w-full h-12 rounded-lg bg-apty-primary"></div>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-xl p-8 bg-apty-bg-base border border-apty-border-default shadow-apty-lg">
              <div className="w-24 h-6 rounded mb-4 bg-apty-text-secondary/20"></div>
              <div className="w-32 h-10 rounded mb-2 bg-apty-text-primary/15"></div>
              <div className="w-20 h-4 rounded mb-8 bg-apty-text-secondary/10"></div>
              <div className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="flex items-center">
                    <div className="w-5 h-5 rounded-full mr-3 bg-apty-accent/20"></div>
                    <div
                      className={`h-3 rounded bg-apty-text-secondary/10 ${i === 2 ? "w-36" : i === 3 ? "w-44" : i === 4 ? "w-32" : i === 5 ? "w-38" : i === 6 ? "w-42" : "w-40"}`}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="w-full h-12 rounded-lg bg-apty-bg-inverse"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Comparison Table",
      className: "bg-apty-bg-muted",
      height: "h-96",
      colorCode: "bg-muted",
      elements: (
        <div className="px-8 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="w-64 h-8 rounded mb-8 mx-auto bg-apty-text-primary/15"></div>
            <div className="rounded-xl overflow-hidden bg-apty-bg-base shadow-apty-lg">
              {/* Table header */}
              <div className="grid grid-cols-4 gap-0 bg-apty-bg-subtle border-b border-apty-border-default">
                <div className="p-4">
                  <div className="w-20 h-4 rounded bg-apty-text-secondary/20"></div>
                </div>
                <div className="p-4 text-center">
                  <div className="w-16 h-4 rounded mx-auto bg-apty-text-primary/20"></div>
                </div>
                <div className="p-4 text-center bg-apty-primary/10">
                  <div className="w-16 h-4 rounded mx-auto bg-apty-primary"></div>
                </div>
                <div className="p-4 text-center">
                  <div className="w-16 h-4 rounded mx-auto bg-apty-text-primary/20"></div>
                </div>
              </div>
              {/* Table rows */}
              {[1, 2, 3, 4, 5].map(row => (
                <div
                  key={row}
                  className={`grid grid-cols-4 gap-0 ${row < 5 ? "border-b border-apty-border-default" : ""}`}
                >
                  <div className="p-4">
                    <div className="w-32 h-3 rounded bg-apty-text-secondary/10"></div>
                  </div>
                  <div className="p-4 text-center">
                    <div
                      className={`w-6 h-6 rounded-full mx-auto ${row % 2 ? "bg-apty-secondary/20" : "bg-apty-border-default"}`}
                    ></div>
                  </div>
                  <div className="p-4 text-center bg-apty-primary/5">
                    <div className="w-6 h-6 rounded-full mx-auto bg-apty-primary"></div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="w-6 h-6 rounded-full mx-auto bg-apty-accent"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "FAQ Section",
      className: "bg-apty-bg-base",
      height: "h-96",
      colorCode: "bg-base",
      elements: (
        <div className="px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="w-48 h-8 rounded mb-8 mx-auto bg-apty-text-primary/15"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="rounded-lg p-6 bg-apty-bg-base border border-apty-border-default">
                  <div className="flex justify-between items-center">
                    <div className="w-80 h-4 rounded bg-apty-text-primary/15"></div>
                    <div className="w-6 h-6 rounded-full bg-apty-primary/20"></div>
                  </div>
                  {item === 1 && (
                    <div className="mt-4 space-y-2">
                      <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                      <div className="w-5/6 h-3 rounded bg-apty-text-secondary/10"></div>
                      <div className="w-4/6 h-3 rounded bg-apty-text-secondary/10"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "CTA Section",
      className: "bg-apty-gradient-vibrant",
      height: "h-64",
      colorCode: "gradient-vibrant",
      elements: (
        <div className="flex flex-col items-center justify-center h-full px-8">
          <div className="w-[480px] h-12 rounded mb-4 bg-white/20"></div>
          <div className="space-y-2 mb-8">
            <div className="w-96 h-4 rounded mx-auto bg-white/15"></div>
            <div className="w-80 h-4 rounded mx-auto bg-white/15"></div>
          </div>
          <div className="flex space-x-4">
            <div className="w-40 h-12 rounded-lg bg-white/95"></div>
            <div className="w-40 h-12 rounded-lg bg-transparent border-2 border-white/90"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Footer",
      className: "bg-apty-bg-inverse",
      height: "h-64",
      colorCode: "bg-inverse",
      elements: (
        <div className="px-8 py-10">
          <div className="grid grid-cols-5 gap-8 mb-8">
            <div>
              <div className="w-28 h-8 rounded mb-4 bg-apty-primary/30"></div>
              <div className="space-y-2">
                <div className="w-32 h-3 rounded bg-apty-text-inverse/10"></div>
                <div className="w-28 h-3 rounded bg-apty-text-inverse/10"></div>
              </div>
            </div>
            {[1, 2, 3, 4].map(col => (
              <div key={col}>
                <div className="w-24 h-4 rounded mb-4 bg-apty-text-inverse/20"></div>
                <div className="space-y-2">
                  <div className="w-28 h-3 rounded bg-apty-text-inverse/10"></div>
                  <div className="w-28 h-3 rounded bg-apty-text-inverse/10"></div>
                  {col < 3 && <div className="w-28 h-3 rounded bg-apty-text-inverse/10"></div>}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-white/10">
            <div className="flex justify-between items-center">
              <div className="w-40 h-3 rounded bg-apty-text-inverse/10"></div>
              <div className="flex space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-apty-text-inverse/15"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold mb-4 font-apty-heading text-apty-text-primary">
        Pricing Page Wireframe - Apty Style
      </h2>
      <p className="text-base mb-8 text-apty-text-secondary">
        Pricing page layout with Apty design system - fully theme-aware
      </p>

      {/* Responsive Wireframe View */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold tracking-[1.8px] uppercase mb-6 text-apty-text-secondary">Desktop View</h3>
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Main wireframe container - responsive */}
          <div className="relative rounded-xl overflow-hidden border border-apty-border-default shadow-apty-xl">
            {sections.map((section, index) => (
              <motion.div
                key={section.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative ${section.height} ${section.className || ""}`}
                style={section.additionalStyles}
              >
                {section.elements}
                {/* Mobile overlay labels - appear on small screens */}
                <div className="absolute top-2 right-2 md:hidden bg-apty-bg-base/90 backdrop-blur-sm rounded-md px-2 py-1">
                  <p className="text-xs font-semibold text-apty-text-primary">{section.name}</p>
                  {section.colorCode && (
                    <p className="text-[10px] font-mono text-apty-text-secondary">{section.colorCode}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Desktop side labels - hidden on mobile */}
          <div className="hidden md:block absolute -right-4 top-0 w-80 translate-x-full pl-8 space-y-0">
            {sections.map((section, index) => (
              <motion.div
                key={`label-${section.name}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${section.height} flex items-center`}
              >
                <div className="pl-4">
                  <p className="text-sm font-semibold text-apty-text-primary">{section.name}</p>
                  {section.colorCode && (
                    <p className="text-[11px] mt-1 font-mono text-apty-text-secondary">{section.colorCode}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Design Elements */}
      <div className="mt-12">
        <h3 className="text-sm font-semibold tracking-[1.8px] uppercase mb-6 text-apty-text-secondary">
          Key Design Elements - Apty Style
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-apty-bg-subtle rounded-apty-lg">
            <h4 className="text-base font-semibold mb-3 text-apty-text-primary">Color Usage</h4>
            <ul className="text-sm leading-6 text-apty-text-secondary">
              <li>• Primary purple for CTAs and emphasis</li>
              <li>• Subtle backgrounds for sections</li>
              <li>• Dark sections for contrast</li>
              <li>• Gradient CTAs for visual impact</li>
              <li>• Light borders and shadows</li>
            </ul>
          </div>
          <div className="p-6 bg-apty-bg-muted rounded-apty-lg">
            <h4 className="text-base font-semibold mb-3 text-apty-text-primary">Typography & Spacing</h4>
            <ul className="text-sm leading-6 text-apty-text-secondary">
              <li>• Large, bold headings (Gilroy)</li>
              <li>• Clean body text (Inter)</li>
              <li>• Generous whitespace</li>
              <li>• 8px border radius standard</li>
              <li>• Clear visual hierarchy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
