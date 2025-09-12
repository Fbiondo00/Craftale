"use client";

import { motion } from "framer-motion";

interface Section {
  name: string;
  background: string;
  height: string;
  colorCode?: string;
  elements?: React.ReactNode;
}

export default function HomepageWireframe() {
  const sections: Section[] = [
    {
      name: "Header",
      background: "bg-gradient-to-br from-brand-secondary/5 via-brand-tertiary/5 to-brand-accent/5",
      height: "h-header", // Using semantic token
      colorCode: "Gradient: brand-secondary/5 → brand-tertiary/5 → brand-accent/5",
      elements: (
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo */}
          <div className="w-24 h-8 bg-black/10 rounded"></div>
          {/* Nav items */}
          <div className="flex space-x-3">
            <div className="w-16 h-6 bg-black/10 rounded"></div>
            <div className="w-16 h-6 bg-black/10 rounded"></div>
            <div className="w-16 h-6 bg-black/10 rounded"></div>
            <div className="w-16 h-6 bg-black/10 rounded"></div>
          </div>
          {/* Auth buttons */}
          <div className="flex space-x-2">
            <div className="w-20 h-8 bg-black/10 rounded"></div>
            <div className="w-20 h-8 bg-black/20 rounded"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Hero Section",
      background: "bg-color-base", // Using semantic token
      height: "h-96",
      colorCode: "bg-color-base (adaptive)",
      elements: (
        <div className="flex flex-col items-center justify-center h-full px-8 space-y-4">
          {/* Badge */}
          <div className="w-32 h-6 bg-black/10 rounded-full"></div>
          {/* Title */}
          <div className="w-80 h-12 bg-black/10 rounded"></div>
          <div className="w-64 h-8 bg-black/10 rounded"></div>
          {/* Description */}
          <div className="w-96 h-4 bg-black/5 rounded"></div>
          <div className="w-80 h-4 bg-black/5 rounded"></div>
          {/* CTA Buttons */}
          <div className="flex space-x-3 mt-4">
            <div className="w-32 h-10 bg-black/20 rounded"></div>
            <div className="w-32 h-10 bg-black/10 rounded"></div>
          </div>
          {/* Features */}
          <div className="flex space-x-8 mt-6">
            <div className="w-20 h-12 bg-black/5 rounded"></div>
            <div className="w-20 h-12 bg-black/5 rounded"></div>
            <div className="w-20 h-12 bg-black/5 rounded"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Portfolio Showcase",
      background: "bg-color-muted/30", // Using semantic token with opacity
      height: "h-64",
      colorCode: "bg-color-muted/30",
      elements: (
        <div className="px-8 py-6">
          {/* Section title */}
          <div className="w-48 h-8 bg-black/10 rounded mb-6"></div>
          {/* Portfolio grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="h-32 bg-white/40 rounded-lg border border-black/5"></div>
            <div className="h-32 bg-white/40 rounded-lg border border-black/5"></div>
            <div className="h-32 bg-white/40 rounded-lg border border-black/5"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Services Section",
      background: "bg-color-base", // Using semantic token
      height: "h-72",
      colorCode: "bg-color-base (adaptive)",
      elements: (
        <div className="px-8 py-6">
          {/* Section title */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-56 h-8 bg-black/10 rounded mb-2"></div>
            <div className="w-96 h-4 bg-black/5 rounded"></div>
          </div>
          {/* Service cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="h-40 bg-black/5 rounded-lg p-4">
              <div className="w-12 h-12 bg-black/10 rounded mb-3"></div>
              <div className="w-full h-4 bg-black/10 rounded mb-2"></div>
              <div className="w-3/4 h-3 bg-black/5 rounded"></div>
            </div>
            <div className="h-40 bg-black/5 rounded-lg p-4">
              <div className="w-12 h-12 bg-black/10 rounded mb-3"></div>
              <div className="w-full h-4 bg-black/10 rounded mb-2"></div>
              <div className="w-3/4 h-3 bg-black/5 rounded"></div>
            </div>
            <div className="h-40 bg-black/5 rounded-lg p-4">
              <div className="w-12 h-12 bg-black/10 rounded mb-3"></div>
              <div className="w-full h-4 bg-black/10 rounded mb-2"></div>
              <div className="w-3/4 h-3 bg-black/5 rounded"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Process Section",
      background: "bg-gradient-to-br from-brand-secondary/10/50 via-brand-tertiary/10/30 to-brand-accent/10/50",
      height: "h-[30rem]", // Increased height to show all cards
      colorCode: "Gradient: secondary/5% → tertiary/3% → accent/5%",
      elements: (
        <div className="px-8 py-6">
          {/* Section title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-64 h-8 bg-black/10 rounded mb-2"></div>
            <div className="w-80 h-4 bg-black/5 rounded"></div>
          </div>
          {/* Vertical Cards Layout - Alternating left and right with circles on the side */}
          <div className="max-w-5xl mx-auto space-y-4">
            {/* Card 1 - Left aligned */}
            <div className="flex justify-start">
              <div className="w-1/2 relative">
                <div className="bg-white/40 rounded-lg p-3 border border-black/5 mr-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-black/10 rounded mr-2"></div>
                    <div className="w-24 h-4 bg-black/10 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-black/5 rounded mb-3"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                  </div>
                </div>
                {/* Circle on the right edge of the card */}
                <div className="absolute -right-5 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/10 rounded-full"></div>
              </div>
            </div>

            {/* Card 2 - Right aligned */}
            <div className="flex justify-end">
              <div className="w-1/2 relative">
                <div className="bg-white/40 rounded-lg p-3 border border-black/5 ml-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-black/10 rounded mr-2"></div>
                    <div className="w-24 h-4 bg-black/10 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-black/5 rounded mb-3"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                  </div>
                </div>
                {/* Circle on the left edge of the card */}
                <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/10 rounded-full"></div>
              </div>
            </div>

            {/* Card 3 - Left aligned */}
            <div className="flex justify-start">
              <div className="w-1/2 relative">
                <div className="bg-white/40 rounded-lg p-3 border border-black/5 mr-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-black/10 rounded mr-2"></div>
                    <div className="w-24 h-4 bg-black/10 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-black/5 rounded mb-3"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                  </div>
                </div>
                {/* Circle on the right edge of the card */}
                <div className="absolute -right-5 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/10 rounded-full"></div>
              </div>
            </div>

            {/* Card 4 - Right aligned */}
            <div className="flex justify-end">
              <div className="w-1/2 relative">
                <div className="bg-white/40 rounded-lg p-3 border border-black/5 ml-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-black/10 rounded mr-2"></div>
                    <div className="w-24 h-4 bg-black/10 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-black/5 rounded mb-3"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                  </div>
                </div>
                {/* Circle on the left edge of the card */}
                <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/10 rounded-full"></div>
              </div>
            </div>

            {/* Card 5 - Left aligned */}
            <div className="flex justify-start">
              <div className="w-1/2 relative">
                <div className="bg-white/40 rounded-lg p-3 border border-black/5 mr-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-black/10 rounded mr-2"></div>
                    <div className="w-24 h-4 bg-black/10 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-black/5 rounded mb-3"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                  </div>
                </div>
                {/* Circle on the right edge of the card */}
                <div className="absolute -right-5 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/10 rounded-full"></div>
              </div>
            </div>

            {/* Card 6 - Right aligned */}
            <div className="flex justify-end">
              <div className="w-1/2 relative">
                <div className="bg-white/40 rounded-lg p-3 border border-black/5 ml-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-black/10 rounded mr-2"></div>
                    <div className="w-24 h-4 bg-black/10 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-black/5 rounded mb-3"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                    <div className="h-3 bg-black/5 rounded"></div>
                  </div>
                </div>
                {/* Circle on the left edge of the card */}
                <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Testimonials Section",
      background: "bg-color-muted/30", // Using semantic token with opacity
      height: "h-64",
      colorCode: "bg-color-muted/30",
      elements: (
        <div className="px-8 py-6">
          {/* Section title */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-48 h-8 bg-black/10 rounded mb-2"></div>
            <div className="w-64 h-4 bg-black/5 rounded"></div>
          </div>
          {/* Testimonial cards */}
          <div className="flex justify-center space-x-4">
            <div className="w-80 h-32 bg-white/40 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-black/10 rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="w-24 h-3 bg-black/10 rounded mb-1"></div>
                  <div className="w-16 h-2 bg-black/5 rounded"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="w-full h-2 bg-black/5 rounded"></div>
                <div className="w-full h-2 bg-black/5 rounded"></div>
                <div className="w-3/4 h-2 bg-black/5 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "CTA Section",
      background: "bg-indigo-purple", // Using existing gradient token
      height: "h-56",
      colorCode: "bg-indigo-purple (gradient token)",
      elements: (
        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Title */}
          <div className="w-96 h-10 bg-white/20 rounded mb-4"></div>
          {/* Description */}
          <div className="w-80 h-4 bg-white/10 rounded mb-2"></div>
          <div className="w-64 h-4 bg-white/10 rounded mb-6"></div>
          {/* CTA Buttons */}
          <div className="flex space-x-4">
            <div className="w-36 h-12 bg-white/90 rounded"></div>
            <div className="w-36 h-12 bg-white/20 rounded"></div>
          </div>
          {/* Features */}
          <div className="flex space-x-6 mt-6">
            <div className="w-24 h-6 bg-white/10 rounded"></div>
            <div className="w-24 h-6 bg-white/10 rounded"></div>
            <div className="w-24 h-6 bg-white/10 rounded"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Footer",
      background: "bg-color-inverse", // Using semantic token
      height: "h-96",
      colorCode: "bg-color-inverse",
      elements: (
        <div className="px-8 py-6">
          {/* Top section */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Logo column */}
            <div>
              <div className="w-24 h-8 bg-white/10 rounded mb-4"></div>
              <div className="w-32 h-3 bg-white/5 rounded mb-2"></div>
              <div className="w-28 h-3 bg-white/5 rounded"></div>
            </div>
            {/* Links columns */}
            <div>
              <div className="w-20 h-4 bg-white/10 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="w-24 h-2 bg-white/5 rounded"></div>
                <div className="w-24 h-2 bg-white/5 rounded"></div>
                <div className="w-24 h-2 bg-white/5 rounded"></div>
                <div className="w-24 h-2 bg-white/5 rounded"></div>
              </div>
            </div>
            <div>
              <div className="w-20 h-4 bg-white/10 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="w-24 h-2 bg-white/5 rounded"></div>
                <div className="w-24 h-2 bg-white/5 rounded"></div>
                <div className="w-24 h-2 bg-white/5 rounded"></div>
                <div className="w-24 h-2 bg-white/5 rounded"></div>
              </div>
            </div>
            {/* Newsletter */}
            <div>
              <div className="w-24 h-4 bg-white/10 rounded mb-3"></div>
              <div className="flex space-x-2">
                <div className="flex-1 h-8 bg-white/5 rounded"></div>
                <div className="w-20 h-8 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
          {/* Bottom section */}
          <div className="border-t border-white/10 pt-4">
            <div className="flex justify-between items-center">
              <div className="w-32 h-3 bg-white/5 rounded"></div>
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                <div className="w-6 h-6 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-color-primary">Homepage Wireframe</h2>
      <p className="text-color-secondary mb-6">
        Visual representation of homepage sections with their background colors and proportional heights
      </p>

      {/* Desktop View - Hidden on mobile, shown on tablet and desktop */}
      <div className="mb-8 hidden md:block">
        <h3 className="text-lg font-medium mb-4 text-color-secondary">Desktop View</h3>
        <div className="flex gap-4 max-w-6xl mx-auto">
          <div className="flex-1 border-2 border-color-default rounded-lg overflow-hidden shadow-lg">
            {sections.map((section, index) => (
              <motion.div
                key={section.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative ${section.background} ${section.height} border-b border-color-default last:border-b-0 overflow-hidden`}
              >
                {section.elements}
              </motion.div>
            ))}
          </div>
          {/* Labels on the right */}
          <div className="w-80 space-y-0">
            {sections.map((section, index) => {
              // Map heights for label positioning
              const labelHeight = section.height
                .replace("h-header", "h-header")
                .replace("h-96", "h-96")
                .replace("h-64", "h-64")
                .replace("h-72", "h-72")
                .replace("h-[30rem]", "h-[30rem]")
                .replace("h-80", "h-80")
                .replace("h-56", "h-56");

              return (
                <motion.div
                  key={`label-${section.name}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`${labelHeight} flex items-center border-b border-transparent last:border-b-0`}
                >
                  <div className="pl-4">
                    <p className="text-sm font-semibold text-color-primary">{section.name}</p>
                    {section.colorCode && (
                      <p className="text-xs text-color-secondary font-mono mt-1">{section.colorCode}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile View - Show only on mobile */}
      <div className="mb-8 md:hidden">
        <h3 className="text-lg font-medium mb-4 text-color-secondary">Mobile View</h3>
        <div className="w-full max-w-sm mx-auto">
          <div className="border-2 border-color-default rounded-lg overflow-hidden shadow-lg">
            {sections.map((section, index) => {
              // Adjust heights for mobile view
              const mobileHeight = section.height
                .replace("h-96", "h-64")
                .replace("h-[30rem]", "h-72")
                .replace("h-80", "h-56")
                .replace("h-72", "h-48")
                .replace("h-64", "h-40")
                .replace("h-56", "h-36")
                .replace("h-header", "h-12");

              // Simplified mobile elements
              const mobileElements = (
                <div className="px-2 py-2">
                  {section.name === "Header" && (
                    <div className="flex justify-between items-center h-full relative">
                      <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 text-[9px] font-medium text-black/40">
                        Header
                      </div>
                      <div className="w-12 h-4 bg-black/10 rounded"></div>
                      <div className="w-6 h-6 bg-black/10 rounded"></div>
                    </div>
                  )}
                  {section.name === "Hero Section" && (
                    <div className="flex flex-col items-center space-y-2 h-full justify-center relative">
                      <div className="absolute top-1 right-2 text-[10px] font-medium text-black/40">Hero Section</div>
                      <div className="w-20 h-4 bg-black/10 rounded-full"></div>
                      <div className="w-40 h-8 bg-black/10 rounded"></div>
                      <div className="w-32 h-6 bg-black/10 rounded"></div>
                      <div className="w-44 h-2 bg-black/5 rounded mt-2"></div>
                      <div className="w-36 h-2 bg-black/5 rounded"></div>
                      <div className="flex space-x-2 mt-3">
                        <div className="w-24 h-8 bg-black/20 rounded"></div>
                        <div className="w-24 h-8 bg-black/10 rounded"></div>
                      </div>
                    </div>
                  )}
                  {section.name === "Portfolio Showcase" && (
                    <div className="space-y-2 p-3 relative">
                      <div className="absolute top-1 right-2 text-[10px] font-medium text-black/40">
                        Portfolio Showcase
                      </div>
                      <div className="mt-6 space-y-2">
                        {/* Portfolio Card 1 */}
                        <div className="bg-white/30 rounded-lg p-3 flex items-center">
                          <div className="w-10 h-10 bg-black/10 rounded-lg mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="w-20 h-3 bg-black/10 rounded mb-1"></div>
                            <div className="w-32 h-2 bg-black/5 rounded"></div>
                          </div>
                        </div>
                        {/* Portfolio Card 2 */}
                        <div className="bg-white/30 rounded-lg p-3 flex items-center">
                          <div className="w-10 h-10 bg-black/10 rounded-lg mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="w-24 h-3 bg-black/10 rounded mb-1"></div>
                            <div className="w-28 h-2 bg-black/5 rounded"></div>
                          </div>
                        </div>
                        {/* Portfolio Card 3 */}
                        <div className="bg-white/30 rounded-lg p-3 flex items-center">
                          <div className="w-10 h-10 bg-black/10 rounded-lg mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="w-16 h-3 bg-black/10 rounded mb-1"></div>
                            <div className="w-36 h-2 bg-black/5 rounded"></div>
                          </div>
                        </div>
                        {/* Navigation dots */}
                        <div className="flex justify-center pt-1 space-x-1">
                          <div className="w-1.5 h-1.5 bg-black/20 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-black/10 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-black/10 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {section.name === "Services Section" && (
                    <div className="space-y-2 p-3 relative">
                      <div className="absolute top-1 right-2 text-[10px] font-medium text-black/40">
                        Services Section
                      </div>
                      <div className="mt-6 space-y-2">
                        {/* Service 1 */}
                        <div className="bg-black/5 rounded-lg p-3 flex items-center">
                          <div className="w-10 h-10 bg-black/10 rounded-lg mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="w-20 h-3 bg-black/10 rounded mb-1"></div>
                            <div className="w-32 h-2 bg-black/5 rounded"></div>
                          </div>
                        </div>
                        {/* Service 2 */}
                        <div className="bg-black/5 rounded-lg p-3 flex items-center">
                          <div className="w-10 h-10 bg-black/10 rounded-lg mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="w-24 h-3 bg-black/10 rounded mb-1"></div>
                            <div className="w-28 h-2 bg-black/5 rounded"></div>
                          </div>
                        </div>
                        {/* Service 3 */}
                        <div className="bg-black/5 rounded-lg p-3 flex items-center">
                          <div className="w-10 h-10 bg-black/10 rounded-lg mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="w-16 h-3 bg-black/10 rounded mb-1"></div>
                            <div className="w-36 h-2 bg-black/5 rounded"></div>
                          </div>
                        </div>
                        {/* Service 4 */}
                        <div className="bg-black/5 rounded-lg p-3 flex items-center">
                          <div className="w-10 h-10 bg-black/10 rounded-lg mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="w-18 h-3 bg-black/10 rounded mb-1"></div>
                            <div className="w-30 h-2 bg-black/5 rounded"></div>
                          </div>
                        </div>
                        {/* Service 5 */}
                        <div className="bg-black/5 rounded-lg p-3 flex items-center">
                          <div className="w-10 h-10 bg-black/10 rounded-lg mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="w-22 h-3 bg-black/10 rounded mb-1"></div>
                            <div className="w-34 h-2 bg-black/5 rounded"></div>
                          </div>
                        </div>
                        {/* Service 6 */}
                        <div className="bg-black/5 rounded-lg p-3 flex items-center">
                          <div className="w-10 h-10 bg-black/10 rounded-lg mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="w-20 h-3 bg-black/10 rounded mb-1"></div>
                            <div className="w-26 h-2 bg-black/5 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {section.name === "Process Section" && (
                    <div className="space-y-2 px-3 py-3 relative">
                      <div className="absolute top-1 right-2 text-[10px] font-medium text-black/40">
                        Process Section
                      </div>
                      <div className="w-40 h-5 bg-black/10 rounded mx-auto mb-3 mt-4"></div>
                      {/* Card 1 - Left */}
                      <div className="flex">
                        <div className="w-3/5 relative">
                          <div className="h-12 bg-white/30 rounded-lg"></div>
                          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-black/10 rounded-full"></div>
                        </div>
                        <div className="w-2/5"></div>
                      </div>
                      {/* Card 2 - Right */}
                      <div className="flex">
                        <div className="w-2/5"></div>
                        <div className="w-3/5 relative">
                          <div className="h-12 bg-white/30 rounded-lg"></div>
                          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-black/10 rounded-full"></div>
                        </div>
                      </div>
                      {/* Card 3 - Left */}
                      <div className="flex">
                        <div className="w-3/5 relative">
                          <div className="h-12 bg-white/30 rounded-lg"></div>
                          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-black/10 rounded-full"></div>
                        </div>
                        <div className="w-2/5"></div>
                      </div>
                      {/* Card 4 - Right */}
                      <div className="flex">
                        <div className="w-2/5"></div>
                        <div className="w-3/5 relative">
                          <div className="h-12 bg-white/30 rounded-lg"></div>
                          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-black/10 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {section.name === "Testimonials Section" && (
                    <div className="p-3 space-y-3 relative">
                      <div className="absolute top-1 right-2 text-[10px] font-medium text-black/40">Testimonials</div>
                      <div className="w-32 h-5 bg-black/10 rounded mx-auto mt-4"></div>
                      <div className="bg-white/30 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-black/10 rounded-full mr-2"></div>
                          <div>
                            <div className="w-20 h-2 bg-black/10 rounded mb-1"></div>
                            <div className="w-16 h-2 bg-black/5 rounded"></div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="w-full h-2 bg-black/5 rounded"></div>
                          <div className="w-full h-2 bg-black/5 rounded"></div>
                          <div className="w-3/4 h-2 bg-black/5 rounded"></div>
                        </div>
                      </div>
                      <div className="flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-black/20 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                      </div>
                    </div>
                  )}
                  {section.name === "CTA Section" && (
                    <div className="flex flex-col items-center justify-center h-full space-y-3 p-3 relative">
                      <div className="absolute top-1 right-2 text-[10px] font-medium text-white/60">CTA Section</div>
                      <div className="w-44 h-6 bg-white/20 rounded"></div>
                      <div className="w-40 h-3 bg-white/10 rounded"></div>
                      <div className="w-36 h-3 bg-white/10 rounded"></div>
                      <div className="flex space-x-2 mt-2">
                        <div className="w-28 h-8 bg-white/80 rounded"></div>
                        <div className="w-28 h-8 bg-white/20 rounded"></div>
                      </div>
                    </div>
                  )}
                  {section.name === "Footer" && (
                    <div className="space-y-3 relative">
                      <div className="absolute top-1 right-2 text-[10px] font-medium text-white/60">Footer</div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="space-y-1">
                          <div className="w-12 h-3 bg-white/10 rounded"></div>
                          <div className="w-16 h-1 bg-white/5 rounded"></div>
                          <div className="w-16 h-1 bg-white/5 rounded"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="w-12 h-3 bg-white/10 rounded"></div>
                          <div className="w-16 h-1 bg-white/5 rounded"></div>
                          <div className="w-16 h-1 bg-white/5 rounded"></div>
                        </div>
                      </div>
                      <div className="border-t border-white/10 pt-2">
                        <div className="flex justify-center space-x-1">
                          <div className="w-4 h-4 bg-white/10 rounded-full"></div>
                          <div className="w-4 h-4 bg-white/10 rounded-full"></div>
                          <div className="w-4 h-4 bg-white/10 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );

              return (
                <motion.div
                  key={`mobile-${section.name}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`relative ${section.background} ${mobileHeight} border-b border-color-default last:border-b-0 overflow-hidden`}
                >
                  {mobileElements}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Color Reference - All devices */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-6 text-color-primary">Quick Color Reference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div>
            <div className="h-20 bg-gradient-to-br from-brand-secondary/5 via-brand-tertiary/5 to-brand-accent/5 border border-color-default rounded-lg flex items-center justify-center">
              <p className="text-xs font-medium text-color-secondary">Header</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-color-base border border-color-default rounded-lg flex items-center justify-center">
              <p className="text-xs font-medium text-color-secondary">Hero</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-color-muted/30 border border-color-default rounded-lg flex items-center justify-center">
              <p className="text-xs font-medium text-color-secondary">Portfolio</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-color-base border border-color-default rounded-lg flex items-center justify-center">
              <p className="text-xs font-medium text-color-secondary">Services</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-gradient-to-br from-brand-secondary/10/50 via-brand-tertiary/10/30 to-brand-accent/10/50 border border-color-default rounded-lg flex items-center justify-center">
              <p className="text-xs font-medium text-color-secondary">Process</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-color-muted/30 border border-color-default rounded-lg flex items-center justify-center">
              <p className="text-xs font-medium text-color-secondary">Testimonials</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-indigo-purple border border-color-default rounded-lg flex items-center justify-center">
              <p className="text-xs font-medium text-white">CTA</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-color-inverse border border-color-default rounded-lg flex items-center justify-center">
              <p className="text-xs font-medium text-white">Footer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Pattern Analysis - Desktop/Tablet only */}
      <div className="mt-8 hidden md:block">
        <h3 className="text-lg font-medium mb-4 text-color-secondary">Color Pattern Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-color-subtle p-4 rounded-lg">
            <h4 className="font-medium text-color-primary mb-2">Alternating Pattern</h4>
            <ul className="space-y-1 text-sm text-color-secondary">
              <li>• Header: Gradient (brand-secondary/5 → brand-tertiary/5 → brand-accent/5)</li>
              <li>• Hero: bg-color-base</li>
              <li>• Portfolio: bg-color-muted/30</li>
              <li>• Services: bg-color-base</li>
              <li>• Process: Gradient (brand-secondary/10/50 → brand-tertiary/10/30 → brand-accent/10/50)</li>
              <li>• Testimonials: bg-color-muted/30</li>
              <li>• CTA: bg-indigo-purple</li>
              <li>• Footer: bg-color-inverse</li>
            </ul>
          </div>
          <div className="bg-color-subtle p-4 rounded-lg">
            <h4 className="font-medium text-color-primary mb-2">Visual Rhythm</h4>
            <ul className="space-y-1 text-sm text-color-secondary">
              <li>• 2 sections with bg-color-base</li>
              <li>• 2 sections with bg-color-muted/30</li>
              <li>• 2 sections with subtle gradients</li>
              <li>• 1 section with bold gradient (CTA)</li>
              <li>• 1 section with bg-color-inverse (Footer)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
