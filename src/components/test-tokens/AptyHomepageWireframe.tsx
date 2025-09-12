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

// Mobile wireframe sections
function MobileWireframe() {
  const mobileSections: Section[] = [
    {
      name: "Header",
      className: "bg-apty-bg-base border-b border-apty-border-default",
      height: "h-14",
      colorCode: "bg-base / border-default",
      elements: (
        <div className="flex items-center justify-between h-full px-4">
          {/* Logo */}
          <div className="w-24 h-7 rounded bg-apty-primary/20"></div>
          {/* Hamburger menu */}
          <div className="flex flex-col space-y-1">
            <div className="w-6 h-0.5 bg-apty-text-primary/60"></div>
            <div className="w-6 h-0.5 bg-apty-text-primary/60"></div>
            <div className="w-6 h-0.5 bg-apty-text-primary/60"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Hero Section",
      className: "bg-apty-bg-subtle",
      height: "h-[480px]",
      colorCode: "bg-subtle",
      elements: (
        <div className="px-4 py-12 space-y-6">
          {/* Badge */}
          <div className="w-32 h-7 rounded-full mx-auto bg-apty-accent/20"></div>
          {/* Title - stacked */}
          <div className="space-y-2">
            <div className="w-full h-10 rounded bg-apty-text-primary/15"></div>
            <div className="w-4/5 h-10 rounded mx-auto bg-apty-text-primary/15"></div>
            <div className="w-3/5 h-10 rounded mx-auto bg-apty-text-primary/15"></div>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
            <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
            <div className="w-3/4 h-3 rounded mx-auto bg-apty-text-secondary/10"></div>
          </div>
          {/* CTA Buttons - stacked */}
          <div className="space-y-3">
            <div className="w-full h-12 rounded-lg bg-apty-primary"></div>
            <div className="w-full h-12 rounded-lg border-[1.5px] border-apty-tertiary bg-transparent"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Trusted By Section",
      className: "bg-apty-bg-subtle border-b border-apty-border-default",
      height: "h-32",
      colorCode: "bg-subtle",
      elements: (
        <div className="px-4 py-8">
          {/* Section title */}
          <div className="w-full h-4 mx-auto mb-6 rounded bg-apty-text-secondary/20"></div>
          {/* Logo scroll */}
          <div className="flex space-x-6 overflow-x-auto">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-20 h-8 rounded bg-apty-text-primary/10 flex-shrink-0"></div>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Features Grid",
      className: "bg-apty-bg-base",
      height: "h-[600px]",
      colorCode: "bg-base",
      elements: (
        <div className="px-4 py-12 space-y-6">
          {/* Section title */}
          <div className="space-y-2 mb-8">
            <div className="w-full h-8 rounded bg-apty-text-primary/15"></div>
            <div className="w-4/5 h-8 rounded mx-auto bg-apty-text-primary/15"></div>
          </div>
          {/* Feature cards - stacked */}
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-xl p-6 bg-apty-bg-base border border-apty-border-default shadow-apty-md">
                <div className="w-12 h-12 rounded-lg mb-4 bg-apty-primary"></div>
                <div className="w-full h-5 rounded mb-3 bg-apty-text-primary/15"></div>
                <div className="space-y-2">
                  <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                  <div className="w-3/4 h-3 rounded bg-apty-text-secondary/10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Stats Section",
      className: "bg-apty-bg-muted",
      height: "h-64",
      colorCode: "bg-muted",
      elements: (
        <div className="px-4 py-12">
          {/* Section title */}
          <div className="w-full h-6 rounded mb-8 mx-auto bg-apty-text-primary/15"></div>
          {/* Stats grid 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-20 h-12 rounded-lg mx-auto mb-2 bg-apty-primary/15"></div>
              <div className="w-16 h-3 rounded mx-auto bg-apty-text-secondary/15"></div>
            </div>
            <div className="text-center">
              <div className="w-20 h-12 rounded-lg mx-auto mb-2 bg-apty-secondary/15"></div>
              <div className="w-16 h-3 rounded mx-auto bg-apty-text-secondary/15"></div>
            </div>
            <div className="text-center">
              <div className="w-20 h-12 rounded-lg mx-auto mb-2 bg-apty-tertiary/15"></div>
              <div className="w-16 h-3 rounded mx-auto bg-apty-text-secondary/15"></div>
            </div>
            <div className="text-center">
              <div className="w-20 h-12 rounded-lg mx-auto mb-2 bg-apty-accent/15"></div>
              <div className="w-16 h-3 rounded mx-auto bg-apty-text-secondary/15"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Code Section",
      className: "bg-apty-bg-inverse",
      height: "h-[600px]",
      colorCode: "bg-inverse",
      elements: (
        <div className="px-4 py-12 space-y-8">
          {/* Text content */}
          <div>
            <div className="w-full h-8 rounded mb-4 bg-apty-text-inverse/20"></div>
            <div className="space-y-2 mb-6">
              <div className="w-full h-3 rounded bg-apty-text-inverse/10"></div>
              <div className="w-5/6 h-3 rounded bg-apty-text-inverse/10"></div>
            </div>
            <div className="w-32 h-10 rounded-lg bg-apty-primary"></div>
          </div>
          {/* Code block */}
          <div className="rounded-xl p-4 bg-apty-bg-base/5">
            {/* Tab bar */}
            <div className="flex space-x-3 mb-4 overflow-x-auto">
              <div className="w-16 h-6 rounded bg-apty-primary/30 flex-shrink-0"></div>
              <div className="w-16 h-6 rounded bg-apty-text-inverse/10 flex-shrink-0"></div>
              <div className="w-16 h-6 rounded bg-apty-text-inverse/10 flex-shrink-0"></div>
            </div>
            {/* Code lines */}
            <div className="space-y-2">
              <div className="w-3/4 h-2 rounded bg-apty-primary/20"></div>
              <div className="w-full h-2 rounded bg-apty-text-inverse/10"></div>
              <div className="w-5/6 h-2 rounded bg-apty-text-inverse/10"></div>
              <div className="w-2/3 h-2 rounded bg-apty-accent/20"></div>
              <div className="w-full h-2 rounded bg-apty-text-inverse/10"></div>
              <div className="w-3/4 h-2 rounded bg-apty-text-inverse/10"></div>
            </div>
          </div>
          {/* Testimonial */}
          <div className="rounded-xl p-4 bg-apty-bg-base/10">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full mr-3 bg-apty-text-inverse/20"></div>
              <div>
                <div className="w-24 h-3 rounded mb-1 bg-apty-text-inverse/20"></div>
                <div className="w-20 h-2 rounded bg-apty-text-inverse/10"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-2 rounded bg-apty-text-inverse/10"></div>
              <div className="w-full h-2 rounded bg-apty-text-inverse/10"></div>
              <div className="w-3/4 h-2 rounded bg-apty-text-inverse/10"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Get SDK Section",
      className: "bg-apty-bg-base",
      height: "h-[400px]",
      colorCode: "bg-base",
      elements: (
        <div className="px-4 py-12">
          {/* Section title */}
          <div className="w-full h-8 rounded mb-8 mx-auto bg-apty-text-primary/15"></div>
          {/* SDK grid 2x4 */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="rounded-lg p-4 bg-apty-bg-subtle border border-apty-border-default">
                <div className="w-10 h-10 rounded mb-3 mx-auto bg-apty-primary/20"></div>
                <div className="w-20 h-4 rounded mx-auto bg-apty-text-primary/15"></div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Alternating Features",
      className: "bg-apty-bg-base",
      height: "h-[1600px]",
      colorCode: "bg-base",
      elements: (
        <div className="px-4 py-12 space-y-12">
          {/* Feature 1 */}
          <div className="space-y-6">
            <div className="h-48 rounded-xl bg-apty-bg-subtle"></div>
            <div>
              <div className="w-3/4 h-6 rounded mb-3 bg-apty-text-primary/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-32 h-9 rounded-lg bg-apty-primary"></div>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="space-y-6">
            <div className="h-48 rounded-xl bg-apty-bg-muted"></div>
            <div>
              <div className="w-3/4 h-6 rounded mb-3 bg-apty-text-primary/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-32 h-9 rounded-lg bg-apty-secondary"></div>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="space-y-6">
            <div className="h-48 rounded-xl bg-apty-bg-subtle"></div>
            <div>
              <div className="w-3/4 h-6 rounded mb-3 bg-apty-text-primary/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-32 h-9 rounded-lg bg-apty-primary"></div>
            </div>
          </div>
          {/* Feature 4 */}
          <div className="space-y-6">
            <div className="h-48 rounded-xl bg-apty-bg-muted"></div>
            <div>
              <div className="w-3/4 h-6 rounded mb-3 bg-apty-text-primary/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-32 h-9 rounded-lg bg-apty-secondary"></div>
            </div>
          </div>
          {/* Feature 5 */}
          <div className="space-y-6">
            <div className="h-48 rounded-xl bg-apty-bg-subtle"></div>
            <div>
              <div className="w-3/4 h-6 rounded mb-3 bg-apty-text-primary/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-32 h-9 rounded-lg bg-apty-primary"></div>
            </div>
          </div>
          {/* Integration section */}
          <div className="space-y-6">
            <div className="rounded-xl p-6 bg-apty-bg-muted">
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="w-full h-12 rounded bg-apty-bg-base/50"></div>
                ))}
              </div>
            </div>
            <div>
              <div className="w-3/4 h-6 rounded mb-3 bg-apty-text-primary/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-40 h-9 rounded-lg bg-apty-primary"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Testimonials Carousel",
      className: "bg-apty-bg-inverse",
      height: "h-96",
      colorCode: "bg-inverse",
      elements: (
        <div className="px-4 py-12">
          {/* Section title */}
          <div className="w-full h-8 rounded mb-8 mx-auto bg-apty-text-inverse/20"></div>
          {/* Testimonial card */}
          <div className="rounded-xl p-6 bg-apty-bg-base/10">
            <div className="space-y-3 mb-6">
              <div className="w-full h-3 rounded bg-apty-text-inverse/15"></div>
              <div className="w-full h-3 rounded bg-apty-text-inverse/15"></div>
              <div className="w-3/4 h-3 rounded bg-apty-text-inverse/15"></div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full mr-3 bg-apty-text-inverse/20"></div>
              <div>
                <div className="w-28 h-4 rounded mb-1 bg-apty-text-inverse/20"></div>
                <div className="w-20 h-3 rounded bg-apty-text-inverse/10"></div>
              </div>
            </div>
            <div className="w-24 h-10 rounded mt-4 bg-apty-text-inverse/10"></div>
          </div>
          {/* Carousel dots */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-apty-primary"></div>
            <div className="w-2 h-2 rounded-full bg-apty-text-inverse/20"></div>
            <div className="w-2 h-2 rounded-full bg-apty-text-inverse/20"></div>
            <div className="w-2 h-2 rounded-full bg-apty-text-inverse/20"></div>
            <div className="w-2 h-2 rounded-full bg-apty-text-inverse/20"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Enterprise Platform",
      className: "bg-apty-bg-base",
      height: "h-[500px]",
      colorCode: "bg-base",
      elements: (
        <div className="px-4 py-12">
          {/* Section title */}
          <div className="w-full h-8 rounded mb-8 mx-auto bg-apty-text-primary/15"></div>
          {/* Three feature sections - stacked */}
          <div className="space-y-8">
            {/* Secure */}
            <div>
              <div className="w-20 h-5 rounded mb-4 bg-apty-text-primary/20"></div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-apty-secondary/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-32 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-apty-secondary/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-24 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-apty-secondary/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-40 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
              </div>
            </div>
            {/* Reliable */}
            <div>
              <div className="w-20 h-5 rounded mb-4 bg-apty-text-primary/20"></div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-apty-primary/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-28 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-apty-primary/30 flex-shrink-0 mt-0.5"></div>
                  <div className="space-y-1">
                    <div className="w-44 h-3 rounded bg-apty-text-primary/15"></div>
                    <div className="w-36 h-3 rounded bg-apty-text-secondary/10"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Responsive */}
            <div>
              <div className="w-24 h-5 rounded mb-4 bg-apty-text-primary/20"></div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-apty-accent/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-44 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-apty-accent/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-48 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-apty-accent/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-36 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-apty-accent/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-32 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "CTA Section",
      className: "bg-apty-bg-subtle",
      height: "h-64",
      colorCode: "bg-subtle",
      elements: (
        <div className="flex flex-col items-center justify-center h-full px-4">
          {/* Title */}
          <div className="w-full h-10 rounded mb-4 bg-apty-text-primary/15"></div>
          {/* Description */}
          <div className="space-y-2 mb-8">
            <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
            <div className="w-4/5 h-3 rounded mx-auto bg-apty-text-secondary/10"></div>
          </div>
          {/* CTA Buttons - stacked */}
          <div className="space-y-3 w-full">
            <div className="w-full h-12 rounded-lg bg-apty-primary"></div>
            <div className="w-full h-12 rounded-lg border-[1.5px] border-apty-tertiary bg-transparent"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Customer Cases",
      className: "bg-apty-bg-muted",
      height: "h-[600px]",
      colorCode: "bg-muted",
      elements: (
        <div className="px-4 py-12">
          {/* Section title */}
          <div className="w-full h-8 rounded mb-8 mx-auto bg-apty-text-primary/15"></div>
          {/* Case study carousel - horizontal scroll */}
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="w-72 flex-shrink-0 rounded-xl p-5 bg-apty-bg-base border border-apty-border-default"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg bg-apty-primary/20 mr-3"></div>
                  <div>
                    <div className="w-20 h-3 rounded mb-1 bg-apty-text-primary/15"></div>
                    <div className="w-16 h-2 rounded bg-apty-text-secondary/10"></div>
                  </div>
                </div>
                <div className="w-32 h-5 rounded mb-3 bg-apty-primary/15"></div>
                <div className="space-y-2 mb-3">
                  <div className="w-full h-2 rounded bg-apty-text-secondary/10"></div>
                  <div className="w-5/6 h-2 rounded bg-apty-text-secondary/10"></div>
                </div>
                <div className="w-20 h-3 rounded bg-apty-text-primary/15"></div>
              </div>
            ))}
          </div>
          {/* Read all cases link */}
          <div className="flex justify-center mt-8">
            <div className="w-32 h-10 rounded-lg bg-apty-primary/10 border border-apty-primary/30"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Footer",
      className: "bg-apty-bg-inverse",
      height: "h-[500px]",
      colorCode: "bg-inverse",
      elements: (
        <div className="px-4 py-8 space-y-8">
          {/* Logo and description */}
          <div>
            <div className="w-24 h-7 rounded mb-3 bg-apty-primary/30"></div>
            <div className="space-y-2">
              <div className="w-full h-3 rounded bg-apty-text-inverse/10"></div>
              <div className="w-full h-3 rounded bg-apty-text-inverse/10"></div>
              <div className="w-3/4 h-3 rounded bg-apty-text-inverse/10"></div>
            </div>
          </div>
          {/* Contact info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-apty-text-inverse/20"></div>
              <div className="w-32 h-3 rounded bg-apty-text-inverse/10"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-apty-text-inverse/20"></div>
              <div className="w-36 h-3 rounded bg-apty-text-inverse/10"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 rounded-full bg-apty-text-inverse/20"></div>
              <div className="w-40 h-3 rounded bg-apty-text-inverse/10"></div>
            </div>
          </div>
          {/* CTA Button */}
          <div className="w-full h-12 rounded-lg bg-apty-primary"></div>
          {/* Links sections */}
          <div className="grid grid-cols-2 gap-6">
            {/* Services */}
            <div>
              <div className="w-20 h-4 rounded mb-3 bg-apty-text-inverse/20"></div>
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-24 h-3 rounded bg-apty-text-inverse/10"></div>
                ))}
              </div>
            </div>
            {/* Company */}
            <div>
              <div className="w-20 h-4 rounded mb-3 bg-apty-text-inverse/20"></div>
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-24 h-3 rounded bg-apty-text-inverse/10"></div>
                ))}
              </div>
            </div>
          </div>
          {/* Newsletter */}
          <div>
            <div className="w-32 h-4 rounded mb-3 bg-apty-text-inverse/20"></div>
            <div className="flex space-x-2">
              <div className="flex-1 h-10 rounded-lg bg-apty-bg-base/20 border border-apty-text-inverse/20"></div>
              <div className="w-24 h-10 rounded-lg bg-apty-primary"></div>
            </div>
          </div>
          {/* Copyright and social */}
          <div className="pt-6 border-t border-white/10">
            <div className="w-48 h-3 rounded mb-4 mx-auto bg-apty-text-inverse/10"></div>
            <div className="flex justify-center space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-apty-text-inverse/15"></div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold tracking-[1.8px] uppercase mb-6 text-apty-text-secondary">Mobile View</h3>
      <div className="w-full max-w-[375px] mx-auto">
        <div className="relative rounded-xl overflow-hidden border border-apty-border-default shadow-apty-xl">
          {mobileSections.map((section, index) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative ${section.height} ${section.className || ""}`}
              style={section.additionalStyles}
            >
              {section.elements}
              {/* Section label overlay */}
              <div className="absolute top-2 right-2 bg-apty-bg-base/90 backdrop-blur-sm rounded-md px-2 py-1">
                <p className="text-xs font-semibold text-apty-text-primary">{section.name}</p>
                {section.colorCode && (
                  <p className="text-[10px] font-mono text-apty-text-secondary">{section.colorCode}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AptyHomepageWireframe() {
  const sections: Section[] = [
    {
      name: "Header",
      className: "bg-apty-bg-base border-b border-apty-border-default",
      height: "h-16",
      colorCode: "bg-base / border-default",
      elements: (
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo */}
          <div className="w-28 h-8 rounded bg-apty-primary/20"></div>
          {/* Nav items */}
          <div className="flex space-x-6">
            <div className="w-20 h-6 rounded bg-apty-text-primary/10"></div>
            <div className="w-20 h-6 rounded bg-apty-text-primary/10"></div>
            <div className="w-20 h-6 rounded bg-apty-text-primary/10"></div>
            <div className="w-20 h-6 rounded bg-apty-text-primary/10"></div>
          </div>
          {/* Auth buttons */}
          <div className="flex space-x-3">
            <div className="w-24 h-9 rounded-lg border-[1.5px] border-apty-tertiary bg-transparent"></div>
            <div className="w-24 h-9 rounded-lg bg-apty-primary"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Hero Section",
      className: "bg-apty-bg-subtle",
      height: "h-[480px]",
      colorCode: "bg-subtle",
      elements: (
        <div className="flex flex-col items-center justify-center h-full px-8 space-y-6">
          {/* Badge */}
          <div className="w-36 h-8 rounded-full bg-apty-accent/20"></div>
          {/* Title */}
          <div className="space-y-3">
            <div className="w-[600px] h-16 rounded mx-auto bg-apty-text-primary/15"></div>
            <div className="w-[480px] h-12 rounded mx-auto bg-apty-text-primary/10"></div>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <div className="w-[500px] h-4 rounded mx-auto bg-apty-text-secondary/15"></div>
            <div className="w-[420px] h-4 rounded mx-auto bg-apty-text-secondary/10"></div>
          </div>
          {/* CTA Buttons */}
          <div className="flex space-x-4 mt-6">
            <div className="w-36 h-12 rounded-lg bg-apty-primary"></div>
            <div className="w-36 h-12 rounded-lg border-[1.5px] border-apty-tertiary bg-transparent"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Trusted By Section",
      className: "bg-apty-bg-subtle border-b border-apty-border-default",
      height: "h-32",
      colorCode: "bg-subtle",
      elements: (
        <div className="px-8 py-8">
          {/* Section title */}
          <div className="w-96 h-4 mx-auto mb-6 rounded bg-apty-text-secondary/20"></div>
          {/* Logo grid */}
          <div className="flex justify-center space-x-8">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-24 h-10 rounded bg-apty-text-primary/10"></div>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Features Grid",
      className: "bg-apty-bg-base",
      height: "h-96",
      colorCode: "bg-base",
      elements: (
        <div className="px-8 py-12">
          {/* Section title */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-96 h-10 rounded mb-3 bg-apty-text-primary/15"></div>
            <div className="w-[480px] h-4 rounded bg-apty-text-secondary/10"></div>
          </div>
          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="h-48 rounded-xl p-6 bg-apty-bg-base border border-apty-border-default shadow-apty-md">
              <div className="w-12 h-12 rounded-lg mb-4 bg-apty-primary"></div>
              <div className="w-full h-5 rounded mb-3 bg-apty-text-primary/15"></div>
              <div className="space-y-2">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-3/4 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
            </div>
            <div className="h-48 rounded-xl p-6 bg-apty-bg-base border border-apty-border-default shadow-apty-md">
              <div className="w-12 h-12 rounded-lg mb-4 bg-apty-secondary"></div>
              <div className="w-full h-5 rounded mb-3 bg-apty-text-primary/15"></div>
              <div className="space-y-2">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-3/4 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
            </div>
            <div className="h-48 rounded-xl p-6 bg-apty-bg-base border border-apty-border-default shadow-apty-md">
              <div className="w-12 h-12 rounded-lg mb-4 bg-apty-accent"></div>
              <div className="w-full h-5 rounded mb-3 bg-apty-text-primary/15"></div>
              <div className="space-y-2">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-3/4 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Stats Section",
      className: "bg-apty-bg-muted",
      height: "h-64",
      colorCode: "bg-muted",
      elements: (
        <div className="px-8 py-12">
          {/* Section title */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-[480px] h-8 rounded bg-apty-text-primary/15"></div>
          </div>
          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-16 rounded-lg mx-auto mb-3 bg-apty-primary/15"></div>
              <div className="w-24 h-4 rounded mx-auto bg-apty-text-secondary/15"></div>
            </div>
            <div className="text-center">
              <div className="w-32 h-16 rounded-lg mx-auto mb-3 bg-apty-secondary/15"></div>
              <div className="w-24 h-4 rounded mx-auto bg-apty-text-secondary/15"></div>
            </div>
            <div className="text-center">
              <div className="w-32 h-16 rounded-lg mx-auto mb-3 bg-apty-tertiary/15"></div>
              <div className="w-24 h-4 rounded mx-auto bg-apty-text-secondary/15"></div>
            </div>
            <div className="text-center">
              <div className="w-32 h-16 rounded-lg mx-auto mb-3 bg-apty-accent/15"></div>
              <div className="w-24 h-4 rounded mx-auto bg-apty-text-secondary/15"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Code Section",
      className: "bg-apty-bg-inverse",
      height: "h-[480px]",
      colorCode: "bg-inverse",
      elements: (
        <div className="px-8 py-12 flex">
          {/* Left content */}
          <div className="w-1/2 pr-12 pt-8">
            <div className="w-96 h-10 rounded mb-4 bg-apty-text-inverse/20"></div>
            <div className="space-y-3 mb-8">
              <div className="w-full h-4 rounded bg-apty-text-inverse/10"></div>
              <div className="w-5/6 h-4 rounded bg-apty-text-inverse/10"></div>
            </div>
            <div className="w-40 h-11 rounded-lg bg-apty-primary"></div>
            {/* Testimonial */}
            <div className="mt-12 p-6 rounded-xl bg-apty-bg-base/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4 bg-apty-text-inverse/20"></div>
                <div>
                  <div className="w-32 h-4 rounded mb-2 bg-apty-text-inverse/20"></div>
                  <div className="w-24 h-3 rounded bg-apty-text-inverse/10"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-3 rounded bg-apty-text-inverse/10"></div>
                <div className="w-full h-3 rounded bg-apty-text-inverse/10"></div>
                <div className="w-3/4 h-3 rounded bg-apty-text-inverse/10"></div>
              </div>
            </div>
          </div>
          {/* Right code block */}
          <div className="w-1/2">
            <div className="h-full rounded-xl p-6 bg-apty-bg-base/5">
              {/* Tab bar */}
              <div className="flex space-x-4 mb-6">
                <div className="w-20 h-8 rounded bg-apty-primary/30"></div>
                <div className="w-20 h-8 rounded bg-apty-text-inverse/10"></div>
                <div className="w-20 h-8 rounded bg-apty-text-inverse/10"></div>
              </div>
              {/* Code lines */}
              <div className="space-y-3">
                <div className="w-3/4 h-3 rounded bg-apty-primary/20"></div>
                <div className="w-full h-3 rounded bg-apty-text-inverse/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-text-inverse/10"></div>
                <div className="w-2/3 h-3 rounded bg-apty-accent/20"></div>
                <div className="w-full h-3 rounded bg-apty-text-inverse/10"></div>
                <div className="w-3/4 h-3 rounded bg-apty-text-inverse/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-secondary/20"></div>
                <div className="w-2/3 h-3 rounded bg-apty-text-inverse/10"></div>
              </div>
              {/* GitHub badge */}
              <div className="mt-8 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-apty-text-inverse/20"></div>
                <div className="w-32 h-4 rounded bg-apty-text-inverse/15"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Alternating Features",
      className: "bg-apty-bg-base",
      height: "h-[720px]",
      colorCode: "bg-base",
      elements: (
        <div className="px-8 py-12 space-y-16">
          {/* Feature 1 - Left text, right image */}
          <div className="flex items-center">
            <div className="w-1/2 pr-12">
              <div className="w-80 h-8 rounded mb-4 bg-apty-text-primary/15"></div>
              <div className="space-y-2 mb-6">
                <div className="w-full h-4 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-4 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-36 h-10 rounded-lg bg-apty-primary"></div>
            </div>
            <div className="w-1/2">
              <div className="h-64 rounded-xl bg-apty-bg-subtle"></div>
            </div>
          </div>
          {/* Feature 2 - Right text, left image */}
          <div className="flex items-center">
            <div className="w-1/2">
              <div className="h-64 rounded-xl bg-apty-bg-muted"></div>
            </div>
            <div className="w-1/2 pl-12">
              <div className="w-80 h-8 rounded mb-4 bg-apty-text-primary/15"></div>
              <div className="space-y-2 mb-6">
                <div className="w-full h-4 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-4 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-36 h-10 rounded-lg bg-apty-secondary"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Testimonials Carousel",
      className: "bg-apty-bg-inverse",
      height: "h-96",
      colorCode: "bg-inverse",
      elements: (
        <div className="px-8 py-12">
          {/* Section title */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-96 h-8 rounded mb-3 bg-apty-text-inverse/20"></div>
          </div>
          {/* Testimonial carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="h-48 rounded-xl p-8 bg-apty-bg-base/10">
              <div className="space-y-3 mb-6">
                <div className="w-full h-4 rounded bg-apty-text-inverse/15"></div>
                <div className="w-full h-4 rounded bg-apty-text-inverse/15"></div>
                <div className="w-3/4 h-4 rounded bg-apty-text-inverse/15"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full mr-4 bg-apty-text-inverse/20"></div>
                  <div>
                    <div className="w-32 h-4 rounded mb-2 bg-apty-text-inverse/20"></div>
                    <div className="w-24 h-3 rounded bg-apty-text-inverse/10"></div>
                  </div>
                </div>
                <div className="w-32 h-12 rounded bg-apty-text-inverse/10"></div>
              </div>
            </div>
            {/* Carousel dots */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-2 h-2 rounded-full bg-apty-primary"></div>
              <div className="w-2 h-2 rounded-full bg-apty-text-inverse/20"></div>
              <div className="w-2 h-2 rounded-full bg-apty-text-inverse/20"></div>
              <div className="w-2 h-2 rounded-full bg-apty-text-inverse/20"></div>
              <div className="w-2 h-2 rounded-full bg-apty-text-inverse/20"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Enterprise Platform",
      className: "bg-apty-bg-base",
      height: "h-96",
      colorCode: "bg-base",
      elements: (
        <div className="px-8 py-16">
          {/* Section title */}
          <div className="flex justify-center mb-12">
            <div className="w-[420px] h-10 rounded bg-apty-text-primary/15"></div>
          </div>
          {/* Three column features */}
          <div className="grid grid-cols-3 gap-0 max-w-6xl mx-auto">
            {/* Secure column */}
            <div className="px-12 border-r border-apty-border-subtle">
              <div className="w-24 h-6 rounded mb-6 bg-apty-text-primary/20"></div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-apty-secondary/30 flex-shrink-0 mt-0.5"></div>
                  <div className="space-y-1">
                    <div className="w-32 h-3 rounded bg-apty-text-primary/15"></div>
                    <div className="w-24 h-3 rounded bg-apty-text-secondary/10"></div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-apty-secondary/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-28 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-apty-secondary/30 flex-shrink-0 mt-0.5"></div>
                  <div className="space-y-1">
                    <div className="w-40 h-3 rounded bg-apty-text-primary/15"></div>
                    <div className="w-32 h-3 rounded bg-apty-text-secondary/10"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Reliable column */}
            <div className="px-12 border-r border-apty-border-subtle">
              <div className="w-24 h-6 rounded mb-6 bg-apty-text-primary/20"></div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-apty-primary/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-28 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-apty-primary/30 flex-shrink-0 mt-0.5"></div>
                  <div className="space-y-1">
                    <div className="w-44 h-3 rounded bg-apty-text-primary/15"></div>
                    <div className="w-36 h-3 rounded bg-apty-text-secondary/10"></div>
                    <div className="w-28 h-3 rounded bg-apty-text-secondary/10"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Responsive column */}
            <div className="px-12">
              <div className="w-28 h-6 rounded mb-6 bg-apty-text-primary/20"></div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-apty-accent/30 flex-shrink-0 mt-0.5"></div>
                  <div className="space-y-1">
                    <div className="w-44 h-3 rounded bg-apty-text-primary/15"></div>
                    <div className="w-28 h-3 rounded bg-apty-text-secondary/10"></div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-apty-accent/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-48 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-apty-accent/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-36 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-apty-accent/30 flex-shrink-0 mt-0.5"></div>
                  <div className="w-32 h-3 rounded bg-apty-text-primary/15"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "CTA Section",
      className: "bg-apty-bg-subtle",
      height: "h-64",
      colorCode: "bg-subtle",
      elements: (
        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Title */}
          <div className="w-[500px] h-12 rounded mb-4 bg-apty-text-primary/15"></div>
          {/* Description */}
          <div className="space-y-2 mb-8">
            <div className="w-96 h-4 rounded mx-auto bg-apty-text-secondary/10"></div>
            <div className="w-80 h-4 rounded mx-auto bg-apty-text-secondary/10"></div>
          </div>
          {/* CTA Buttons */}
          <div className="flex space-x-4">
            <div className="w-40 h-12 rounded-lg bg-apty-primary"></div>
            <div className="w-40 h-12 rounded-lg border-[1.5px] border-apty-tertiary bg-transparent"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Customer Cases",
      className: "bg-apty-bg-muted",
      height: "h-[800px]",
      colorCode: "bg-muted",
      elements: (
        <div className="px-8 py-16">
          {/* Section title */}
          <div className="flex justify-center mb-12">
            <div className="w-[480px] h-10 rounded bg-apty-text-primary/15"></div>
          </div>
          {/* Case study cards grid */}
          <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {/* Row 1 */}
            <div className="rounded-xl p-6 bg-apty-bg-base border border-apty-border-default">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-apty-primary/20 mr-3"></div>
                <div>
                  <div className="w-24 h-4 rounded mb-1 bg-apty-text-primary/15"></div>
                  <div className="w-20 h-3 rounded bg-apty-text-secondary/10"></div>
                </div>
              </div>
              <div className="w-40 h-6 rounded mb-3 bg-apty-primary/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-24 h-4 rounded bg-apty-text-primary/15"></div>
            </div>
            <div className="rounded-xl p-6 bg-apty-bg-base border border-apty-border-default">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-apty-secondary/20 mr-3"></div>
                <div>
                  <div className="w-24 h-4 rounded mb-1 bg-apty-text-primary/15"></div>
                  <div className="w-20 h-3 rounded bg-apty-text-secondary/10"></div>
                </div>
              </div>
              <div className="w-44 h-6 rounded mb-3 bg-apty-secondary/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-4/5 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-24 h-4 rounded bg-apty-text-primary/15"></div>
            </div>
            <div className="rounded-xl p-6 bg-apty-bg-base border border-apty-border-default">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-apty-accent/20 mr-3"></div>
                <div>
                  <div className="w-24 h-4 rounded mb-1 bg-apty-text-primary/15"></div>
                  <div className="w-20 h-3 rounded bg-apty-text-secondary/10"></div>
                </div>
              </div>
              <div className="w-36 h-6 rounded mb-3 bg-apty-accent/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-3/4 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-24 h-4 rounded bg-apty-text-primary/15"></div>
            </div>
            {/* Row 2 */}
            <div className="rounded-xl p-6 bg-apty-bg-base border border-apty-border-default">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-apty-tertiary/20 mr-3"></div>
                <div>
                  <div className="w-24 h-4 rounded mb-1 bg-apty-text-primary/15"></div>
                  <div className="w-20 h-3 rounded bg-apty-text-secondary/10"></div>
                </div>
              </div>
              <div className="w-48 h-6 rounded mb-3 bg-apty-error/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-24 h-4 rounded bg-apty-text-primary/15"></div>
            </div>
            <div className="rounded-xl p-6 bg-apty-bg-base border border-apty-border-default">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-apty-bg-inverse/20 mr-3"></div>
                <div>
                  <div className="w-24 h-4 rounded mb-1 bg-apty-text-primary/15"></div>
                  <div className="w-20 h-3 rounded bg-apty-text-secondary/10"></div>
                </div>
              </div>
              <div className="w-40 h-6 rounded mb-3 bg-apty-success/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-4/5 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-24 h-4 rounded bg-apty-text-primary/15"></div>
            </div>
            <div className="rounded-xl p-6 bg-apty-bg-base border border-apty-border-default">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-apty-primary/20 mr-3"></div>
                <div>
                  <div className="w-24 h-4 rounded mb-1 bg-apty-text-primary/15"></div>
                  <div className="w-20 h-3 rounded bg-apty-text-secondary/10"></div>
                </div>
              </div>
              <div className="w-44 h-6 rounded mb-3 bg-apty-info/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-3/4 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-24 h-4 rounded bg-apty-text-primary/15"></div>
            </div>
            {/* Row 3 */}
            <div className="rounded-xl p-6 bg-apty-bg-base border border-apty-border-default">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-apty-secondary/20 mr-3"></div>
                <div>
                  <div className="w-24 h-4 rounded mb-1 bg-apty-text-primary/15"></div>
                  <div className="w-20 h-3 rounded bg-apty-text-secondary/10"></div>
                </div>
              </div>
              <div className="w-36 h-6 rounded mb-3 bg-apty-warning/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-5/6 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-24 h-4 rounded bg-apty-text-primary/15"></div>
            </div>
            <div className="rounded-xl p-6 bg-apty-bg-base border border-apty-border-default">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-apty-accent/20 mr-3"></div>
                <div>
                  <div className="w-24 h-4 rounded mb-1 bg-apty-text-primary/15"></div>
                  <div className="w-20 h-3 rounded bg-apty-text-secondary/10"></div>
                </div>
              </div>
              <div className="w-48 h-6 rounded mb-3 bg-apty-error/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-4/5 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-24 h-4 rounded bg-apty-text-primary/15"></div>
            </div>
            <div className="rounded-xl p-6 bg-apty-bg-base border border-apty-border-default">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-apty-tertiary/20 mr-3"></div>
                <div>
                  <div className="w-24 h-4 rounded mb-1 bg-apty-text-primary/15"></div>
                  <div className="w-20 h-3 rounded bg-apty-text-secondary/10"></div>
                </div>
              </div>
              <div className="w-40 h-6 rounded mb-3 bg-apty-primary/15"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-3 rounded bg-apty-text-secondary/10"></div>
                <div className="w-3/4 h-3 rounded bg-apty-text-secondary/10"></div>
              </div>
              <div className="w-24 h-4 rounded bg-apty-text-primary/15"></div>
            </div>
          </div>
          {/* Read all cases link */}
          <div className="flex justify-center">
            <div className="w-32 h-10 rounded-lg bg-apty-primary/10 border border-apty-primary/30"></div>
          </div>
        </div>
      ),
    },
    {
      name: "Footer",
      className: "bg-apty-bg-inverse",
      height: "h-80",
      colorCode: "bg-inverse",
      elements: (
        <div className="px-8 py-10">
          {/* Top section */}
          <div className="grid grid-cols-5 gap-8 mb-8">
            {/* Logo column */}
            <div>
              <div className="w-28 h-8 rounded mb-4 bg-apty-primary/30"></div>
              <div className="space-y-2">
                <div className="w-32 h-3 rounded bg-apty-text-inverse/10"></div>
                <div className="w-28 h-3 rounded bg-apty-text-inverse/10"></div>
              </div>
            </div>
            {/* Links columns */}
            {[1, 2, 3, 4].map(col => (
              <div key={col}>
                <div className="w-24 h-4 rounded mb-4 bg-apty-text-inverse/20"></div>
                <div className="space-y-2">
                  <div className="w-28 h-3 rounded bg-apty-text-inverse/10"></div>
                  <div className="w-28 h-3 rounded bg-apty-text-inverse/10"></div>
                  <div className="w-28 h-3 rounded bg-apty-text-inverse/10"></div>
                  {col < 3 && <div className="w-28 h-3 rounded bg-apty-text-inverse/10"></div>}
                </div>
              </div>
            ))}
          </div>
          {/* Bottom section */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex justify-between items-center">
              <div className="w-40 h-3 rounded bg-apty-text-inverse/10"></div>
              <div className="flex space-x-3">
                <div className="w-6 h-6 rounded-full bg-apty-text-inverse/15"></div>
                <div className="w-6 h-6 rounded-full bg-apty-text-inverse/15"></div>
                <div className="w-6 h-6 rounded-full bg-apty-text-inverse/15"></div>
                <div className="w-6 h-6 rounded-full bg-apty-text-inverse/15"></div>
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
        Homepage Wireframe - Apty Style
      </h2>
      <p className="text-base mb-8 text-apty-text-secondary">
        Visual representation with Apty design system - fully theme-aware
      </p>

      {/* Desktop/Tablet View - Hidden on mobile */}
      <div className="hidden md:block mb-8">
        <h3 className="text-sm font-semibold tracking-[1.8px] uppercase mb-6 text-apty-text-secondary">Desktop View</h3>
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Main wireframe container */}
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
                {/* Tablet overlay labels - appear on tablets only */}
                <div className="absolute top-2 right-2 lg:hidden bg-apty-bg-base/90 backdrop-blur-sm rounded-md px-2 py-1">
                  <p className="text-xs font-semibold text-apty-text-primary">{section.name}</p>
                  {section.colorCode && (
                    <p className="text-[10px] font-mono text-apty-text-secondary">{section.colorCode}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Desktop side labels - hidden on tablet and below */}
          <div className="hidden lg:block absolute -right-4 top-0 w-80 translate-x-full pl-8 space-y-0">
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

      {/* Mobile View - Show only on mobile */}
      <div className="block md:hidden mb-8">
        <MobileWireframe />
      </div>

      {/* Color Reference */}
      <div className="mt-12">
        <h3 className="text-sm font-semibold tracking-[1.8px] uppercase mb-6 text-apty-text-secondary">
          Apty Color Pattern - Theme Aware
        </h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          <div>
            <div className="h-20 rounded-apty-lg flex items-center justify-center bg-apty-bg-base border border-apty-border-default">
              <p className="text-[11px] text-apty-text-secondary">Base</p>
            </div>
          </div>
          <div>
            <div className="h-20 rounded-apty-lg flex items-center justify-center bg-apty-bg-subtle">
              <p className="text-[11px] text-apty-text-secondary">Subtle</p>
            </div>
          </div>
          <div>
            <div className="h-20 rounded-apty-lg flex items-center justify-center bg-apty-bg-muted">
              <p className="text-[11px] text-apty-text-secondary">Muted</p>
            </div>
          </div>
          <div>
            <div className="h-20 rounded-apty-lg flex items-center justify-center bg-apty-bg-inverse">
              <p className="text-[11px] text-apty-text-inverse">Inverse</p>
            </div>
          </div>
          <div>
            <div className="h-20 rounded-apty-lg flex items-center justify-center bg-apty-primary">
              <p className="text-[11px] text-apty-text-inverse">Primary</p>
            </div>
          </div>
          <div>
            <div className="h-20 rounded-apty-lg flex items-center justify-center bg-apty-secondary">
              <p className="text-[11px] text-apty-text-inverse">Secondary</p>
            </div>
          </div>
          <div>
            <div className="h-20 rounded-apty-lg flex items-center justify-center bg-apty-tertiary">
              <p className="text-[11px] text-apty-text-inverse">Tertiary</p>
            </div>
          </div>
          <div>
            <div className="h-20 rounded-apty-lg flex items-center justify-center bg-apty-accent">
              <p className="text-[11px] text-apty-text-inverse">Accent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
