"use client";

import React from "react";
import { motion } from "framer-motion";

interface Section {
  name: string;
  background: string;
  height: string;
  colorCode: string;
  elements: React.ReactNode;
}

const PricingWireframe: React.FC = () => {
  const sections: Section[] = [
    {
      name: "Header",
      background: "bg-gradient-to-br from-brand-secondary/5 via-brand-tertiary/5 to-brand-accent/5",
      height: "h-header",
      colorCode: "Gradient: brand-secondary/5 → brand-tertiary/5 → brand-accent/5",
      elements: (
        <div className="flex justify-between items-center px-6 h-full">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-black/10 rounded"></div>
            <div className="w-24 h-6 bg-black/10 rounded"></div>
          </div>
          <div className="flex space-x-4">
            <div className="w-16 h-6 bg-black/10 rounded"></div>
            <div className="w-16 h-6 bg-black/10 rounded"></div>
            <div className="w-16 h-6 bg-black/10 rounded"></div>
            <div className="w-16 h-6 bg-black/10 rounded"></div>
            <div className="w-16 h-6 bg-black/10 rounded"></div>
          </div>
          <div className="flex space-x-2">
            <div className="w-20 h-8 bg-black/10 rounded"></div>
            <div className="w-24 h-8 bg-black/20 rounded"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Pricing Hero",
      background: "bg-white",
      height: "h-48",
      colorCode: "bg-white",
      elements: (
        <div className="flex flex-col items-center justify-center space-y-4 h-full px-6">
          <div className="w-64 h-8 bg-black/10 rounded"></div>
          <div className="w-96 h-4 bg-black/5 rounded"></div>
          <div className="w-80 h-4 bg-black/5 rounded"></div>
        </div>
      ),
    },
    {
      name: "Progress Steps",
      background: "bg-white",
      height: "h-20",
      colorCode: "bg-white",
      elements: (
        <div className="flex justify-center items-center h-full">
          <div className="flex items-center space-x-4 max-w-3xl">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black/20 rounded-full"></div>
              <div className="w-20 h-3 bg-black/10 rounded text-xs"></div>
            </div>
            <div className="w-12 h-px bg-black/10"></div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black/10 rounded-full"></div>
              <div className="w-24 h-3 bg-black/5 rounded text-xs"></div>
            </div>
            <div className="w-12 h-px bg-black/10"></div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black/10 rounded-full"></div>
              <div className="w-20 h-3 bg-black/5 rounded text-xs"></div>
            </div>
            <div className="w-12 h-px bg-black/10"></div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black/10 rounded-full"></div>
              <div className="w-24 h-3 bg-black/5 rounded text-xs"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Pricing Cards",
      background: "bg-white",
      height: "h-[32rem]",
      colorCode: "bg-white",
      elements: (
        <div className="px-8 py-8">
          {/* Section Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-48 h-6 bg-black/10 rounded mb-3"></div>
            <div className="w-80 h-3 bg-black/5 rounded"></div>
          </div>
          {/* Cards Grid */}
          <div className="grid grid-cols-4 gap-6 h-80">
            {/* Starter Card */}
            <div className="bg-white border-2 border-black/10 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-black/10 rounded-lg"></div>
              </div>
              <div className="text-center mb-4">
                <div className="w-20 h-5 bg-black/10 rounded mx-auto mb-2"></div>
                <div className="w-24 h-8 bg-black/20 rounded mx-auto"></div>
              </div>
              <div className="w-full h-8 bg-black/10 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
              </div>
            </div>
            {/* Pro Card (Popular) */}
            <div className="bg-white border-2 border-black/20 rounded-xl p-6 relative">
              <div className="absolute -top-3 right-4 bg-black/20 px-3 py-1 rounded-full">
                <div className="w-12 h-3 bg-white/80 rounded"></div>
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-black/10 rounded-lg"></div>
              </div>
              <div className="text-center mb-4">
                <div className="w-16 h-5 bg-black/10 rounded mx-auto mb-2"></div>
                <div className="w-28 h-8 bg-black/20 rounded mx-auto"></div>
              </div>
              <div className="w-full h-8 bg-black/20 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
              </div>
            </div>
            {/* Ecommerce Card */}
            <div className="bg-white border-2 border-black/10 rounded-xl p-6 relative">
              <div className="absolute -top-3 right-4 bg-black/10 px-3 py-1 rounded-full">
                <div className="w-16 h-3 bg-white/80 rounded"></div>
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-black/10 rounded-lg"></div>
              </div>
              <div className="text-center mb-4">
                <div className="w-24 h-5 bg-black/10 rounded mx-auto mb-2"></div>
                <div className="w-28 h-8 bg-black/20 rounded mx-auto"></div>
              </div>
              <div className="w-full h-8 bg-black/10 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
              </div>
            </div>
            {/* Custom Solution Card */}
            <div className="bg-white border-2 border-black/10 rounded-xl p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-black/10 rounded-lg"></div>
              </div>
              <div className="text-center mb-4">
                <div className="w-28 h-5 bg-black/10 rounded mx-auto mb-2"></div>
                <div className="w-32 h-6 bg-black/10 rounded mx-auto"></div>
              </div>
              <div className="w-full h-8 bg-black/10 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black/10 rounded-full mr-2"></div>
                  <div className="w-full h-3 bg-black/5 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Footer",
      background: "bg-color-inverse",
      height: "h-80",
      colorCode: "bg-color-inverse",
      elements: (
        <div className="grid grid-cols-5 gap-8 px-8 py-8">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded"></div>
              <div className="w-20 h-6 bg-white/10 rounded"></div>
            </div>
            <div className="w-full h-3 bg-white/5 rounded"></div>
            <div className="w-full h-3 bg-white/5 rounded"></div>
            <div className="w-3/4 h-3 bg-white/5 rounded"></div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white/10 rounded"></div>
                <div className="w-32 h-3 bg-white/5 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white/10 rounded"></div>
                <div className="w-36 h-3 bg-white/5 rounded"></div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="w-20 h-5 bg-white/10 rounded mb-3"></div>
            <div className="w-24 h-3 bg-white/5 rounded"></div>
            <div className="w-28 h-3 bg-white/5 rounded"></div>
            <div className="w-20 h-3 bg-white/5 rounded"></div>
            <div className="w-24 h-3 bg-white/5 rounded"></div>
            <div className="w-20 h-3 bg-white/5 rounded"></div>
            <div className="w-24 h-3 bg-white/5 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="w-20 h-5 bg-white/10 rounded mb-3"></div>
            <div className="w-20 h-3 bg-white/5 rounded"></div>
            <div className="w-24 h-3 bg-white/5 rounded"></div>
            <div className="w-16 h-3 bg-white/5 rounded"></div>
            <div className="w-28 h-3 bg-white/5 rounded"></div>
            <div className="w-32 h-3 bg-white/5 rounded"></div>
            <div className="w-24 h-3 bg-white/5 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="w-24 h-5 bg-white/10 rounded mb-3"></div>
            <div className="w-16 h-3 bg-white/5 rounded"></div>
            <div className="w-28 h-3 bg-white/5 rounded"></div>
            <div className="w-24 h-3 bg-white/5 rounded"></div>
            <div className="w-20 h-3 bg-white/5 rounded"></div>
            <div className="w-32 h-3 bg-white/5 rounded"></div>
            <div className="w-28 h-3 bg-white/5 rounded"></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-color-primary mb-2">Pricing Page Wireframe</h2>
        <p className="text-color-secondary">Visual representation of pricing page sections and backgrounds</p>
      </div>

      {/* Desktop View - Show on tablet and desktop */}
      <div className="mb-8 hidden md:block">
        <h3 className="text-lg font-medium mb-4 text-color-secondary">Desktop View</h3>
        <div className="flex">
          {/* Wireframe */}
          <div className="flex-1 border-2 border-color-default rounded-lg overflow-hidden shadow-xl">
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
              const labelHeight = section.height
                .replace("h-header", "h-header")
                .replace("h-48", "h-48")
                .replace("h-20", "h-20")
                .replace("h-[32rem]", "h-[32rem]")
                .replace("h-80", "h-80");

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
                .replace("h-48", "h-32")
                .replace("h-[32rem]", "h-96")
                .replace("h-80", "h-56")
                .replace("h-20", "h-16")
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
                  {section.name === "Pricing Hero" && (
                    <div className="flex flex-col items-center justify-center h-full space-y-2 relative">
                      <div className="absolute top-1 right-2 text-[10px] font-medium text-black/40">Pricing Hero</div>
                      <div className="w-32 h-5 bg-black/10 rounded"></div>
                      <div className="w-40 h-3 bg-black/5 rounded"></div>
                      <div className="w-36 h-3 bg-black/5 rounded"></div>
                    </div>
                  )}
                  {section.name === "Progress Steps" && (
                    <div className="flex justify-center items-center h-full space-x-3 relative">
                      <div className="absolute top-1 right-2 text-[10px] font-medium text-black/40">Steps</div>
                      <div className="w-6 h-6 bg-black/20 rounded-full"></div>
                      <div className="w-8 h-px bg-black/10"></div>
                      <div className="w-6 h-6 bg-black/10 rounded-full"></div>
                      <div className="w-8 h-px bg-black/10"></div>
                      <div className="w-6 h-6 bg-black/10 rounded-full"></div>
                      <div className="w-8 h-px bg-black/10"></div>
                      <div className="w-6 h-6 bg-black/10 rounded-full"></div>
                    </div>
                  )}
                  {section.name === "Pricing Cards" && (
                    <div className="space-y-3 p-3 relative">
                      <div className="absolute top-1 right-2 text-[10px] font-medium text-black/40">Pricing Cards</div>
                      <div className="mt-6 space-y-3">
                        {/* Card 1 */}
                        <div className="bg-white/30 border border-black/10 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-black/10 rounded"></div>
                              <div>
                                <div className="w-16 h-3 bg-black/10 rounded mb-1"></div>
                                <div className="w-20 h-4 bg-black/20 rounded"></div>
                              </div>
                            </div>
                            <div className="w-20 h-6 bg-black/10 rounded"></div>
                          </div>
                        </div>
                        {/* Card 2 - Popular */}
                        <div className="bg-white/30 border-2 border-black/20 rounded-lg p-3 relative">
                          <div className="absolute -top-2 right-2 bg-black/20 px-2 py-0.5 rounded-full">
                            <div className="w-8 h-2 bg-white/80 rounded text-[8px]"></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-black/10 rounded"></div>
                              <div>
                                <div className="w-12 h-3 bg-black/10 rounded mb-1"></div>
                                <div className="w-24 h-4 bg-black/20 rounded"></div>
                              </div>
                            </div>
                            <div className="w-20 h-6 bg-black/20 rounded"></div>
                          </div>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white/30 border border-black/10 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-black/10 rounded"></div>
                              <div>
                                <div className="w-20 h-3 bg-black/10 rounded mb-1"></div>
                                <div className="w-24 h-4 bg-black/20 rounded"></div>
                              </div>
                            </div>
                            <div className="w-20 h-6 bg-black/10 rounded"></div>
                          </div>
                        </div>
                        {/* Custom Solution */}
                        <div className="bg-white/30 border border-black/10 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-black/10 rounded"></div>
                              <div className="w-28 h-3 bg-black/10 rounded"></div>
                            </div>
                            <div className="w-24 h-6 bg-black/10 rounded"></div>
                          </div>
                        </div>
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
                          <div className="w-16 h-3 bg-white/10 rounded"></div>
                          <div className="w-20 h-1 bg-white/5 rounded"></div>
                          <div className="w-20 h-1 bg-white/5 rounded"></div>
                        </div>
                      </div>
                      <div className="flex justify-center space-x-2 mt-3">
                        <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                        <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                        <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                        <div className="w-6 h-6 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              );

              return (
                <motion.div
                  key={section.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <div className="h-20 bg-gradient-to-br from-brand-secondary/5 via-brand-tertiary/5 to-brand-accent/5 rounded-lg border border-color-default flex items-center justify-center">
              <p className="text-xs font-medium text-color-secondary">Header</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-white rounded-lg border border-color-default flex items-center justify-center">
              <p className="text-xs font-medium text-color-secondary">Pricing Hero</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-white rounded-lg border border-color-default flex items-center justify-center">
              <p className="text-xs font-medium text-color-secondary">Progress Steps</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-white rounded-lg border border-color-default flex items-center justify-center">
              <p className="text-xs font-medium text-color-secondary">Pricing Cards</p>
            </div>
          </div>
          <div>
            <div className="h-20 bg-color-inverse rounded-lg border border-color-default flex items-center justify-center">
              <p className="text-xs font-medium text-white">Footer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Pattern Analysis - Desktop/Tablet only */}
      <div className="mt-8 mb-12 hidden md:block">
        <h3 className="text-xl font-semibold mb-6 text-color-primary">Color Pattern Analysis</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-4 text-color-secondary">Section Breakdown</h4>
            <ul className="space-y-2 text-sm">
              <li>• Header: Gradient (brand-secondary/5 → brand-tertiary/5 → brand-accent/5)</li>
              <li>• Pricing Hero: bg-white</li>
              <li>• Progress Steps: bg-white</li>
              <li>• Pricing Cards: bg-white</li>
              <li>• Footer: bg-color-inverse</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-4 text-color-secondary">Visual Rhythm</h4>
            <ul className="space-y-2 text-sm">
              <li>• 1 section with subtle gradient (Header)</li>
              <li>• 3 sections with bg-white (Hero, Steps, Cards)</li>
              <li>• 1 section with bg-color-inverse (Footer)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingWireframe;
