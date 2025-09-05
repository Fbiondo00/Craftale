/**
 * HeaderNavDropdown Component - Client Component
 * 
 * Purpose: Handles hover-triggered dropdown menus for navigation items
 * 
 * Features:
 * - Shows dropdown on hover (desktop only)
 * - Animated entry/exit with Framer Motion
 * - Two-column layout: description + CTA on left, menu items on right
 * - Icons resolved from string names (avoiding serialization issues)
 * 
 * Why client-side: Needs hover state management and animations
 * 
 * Props:
 * - title: Navigation item title
 * - description: Optional description for the dropdown
 * - items: Array of submenu items with icons
 * - children: The trigger element (nav link)
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AptyDropdownCTA } from '@/components/apty/AptyButton';
import { getIcon } from '@/components/header/icons';

interface DropdownItem {
  title: string;
  href: string;
  description: string;
  iconName: string; // Icon name as string to avoid serialization issues
}

interface HeaderNavDropdownProps {
  title: string;
  description?: string;
  items?: DropdownItem[];
  children: React.ReactNode; // The nav link that triggers dropdown
}

export function HeaderNavDropdown({ 
  title, 
  description, 
  items,
  children 
}: HeaderNavDropdownProps) {
  // Track hover state for showing/hiding dropdown
  const [isHovered, setIsHovered] = useState(false);

  // If no dropdown items, just render the nav link
  if (!items) {
    return <>{children}</>;
  }

  return (
    <div 
      className='relative group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Render the navigation link */}
      {children}

      {/* Animated dropdown menu */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className='dropdown-container absolute top-full left-0 mt-2 w-[600px] bg-apty-bg-base backdrop-blur-xl border border-apty-border-default rounded-apty-xl shadow-apty-xl p-6 z-50'
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className='grid gap-3 lg:grid-cols-2'>
              {/* Left column - Description and CTA */}
              <div className='row-span-3'>
                <div className='flex h-full flex-col justify-between rounded-apty-lg bg-gradient-to-b from-apty-bg-muted/50 to-apty-bg-subtle p-6 no-underline outline-none apty-transition focus:shadow-apty-md'>
                  <div className='mb-2 mt-4 text-lg font-medium text-apty-text-primary'>{title}</div>
                  <p className='text-sm leading-tight text-apty-text-secondary'>
                    {description}
                  </p>
                  <AptyDropdownCTA className='mt-4 w-fit'>
                    Explore {title}
                  </AptyDropdownCTA>
                </div>
              </div>

              {/* Right column - Menu items grid */}
              <div className='grid gap-2'>
                {items.map((subItem) => {
                  // Resolve icon component from string name
                  const SubIcon = getIcon(subItem.iconName);
                  return (
                    <a
                      key={subItem.title}
                      href={subItem.href}
                      className='group grid h-auto w-full items-center justify-start gap-1 rounded-apty-md bg-apty-bg-base p-4 text-sm font-medium apty-transition hover:bg-apty-bg-hover hover:text-apty-text-primary focus:bg-apty-bg-selected focus:text-apty-text-primary focus:outline-none'
                    >
                      <div className='flex items-center space-x-3'>
                        {SubIcon && (
                          <SubIcon className='w-5 h-5 text-apty-text-tertiary group-hover:text-apty-primary apty-transition' />
                        )}
                        <div>
                          <div className='text-sm font-medium leading-none text-apty-text-primary group-hover:underline'>
                            {subItem.title}
                          </div>
                          <div className='line-clamp-2 text-xs leading-snug text-apty-text-secondary mt-1'>
                            {subItem.description}
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}