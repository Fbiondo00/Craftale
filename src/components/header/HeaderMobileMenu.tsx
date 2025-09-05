/**
 * HeaderMobileMenu Component - Client Component
 * 
 * Purpose: Handles mobile navigation menu toggle and display
 * 
 * Features:
 * - Hamburger menu toggle button with animation
 * - Full-screen mobile menu overlay
 * - Accordion-style dropdowns for submenu items
 * - Auth actions at bottom of menu
 * - Body scroll lock when menu is open
 * 
 * Why client-side:
 * - Manages menu open/close state
 * - Handles body scroll locking
 * - Interactive accordion dropdowns
 * - Needs auth context for login button
 * 
 * Performance:
 * - Hidden on desktop via lg:hidden class
 * - Animations use Framer Motion for smooth transitions
 * - Cleanup properly removes scroll lock on unmount
 */

'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { HeaderAuthActions, MobileAuthButton } from './HeaderAuthActions';
import { getIcon } from '@/components/header/icons';
import { type SessionUser } from '@/lib/supabase/get-session';
import { ClientThemeToggle } from '@/components/ClientThemeToggle';

interface NavigationItem {
  title: string;
  href?: string;
  description?: string;
  items?: Array<{
    title: string;
    href: string;
    description: string;
    iconName: string;
  }>;
}

interface HeaderMobileMenuProps {
  navigationItems: NavigationItem[];
  sessionUser: SessionUser | null;
  onOpenAuthModal?: (mode: 'signin' | 'signup') => void;
  onSignOut?: () => void;
}

export function HeaderMobileMenu({ navigationItems, sessionUser, onOpenAuthModal, onSignOut }: HeaderMobileMenuProps) {
  // Mobile menu open/close state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Track which dropdown sections are open
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  // Track if component is mounted (for portal)
  const [mounted, setMounted] = useState(false);

  // Toggle individual dropdown sections
  const toggleMobileDropdown = (key: string) => {
    setMobileDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Set mounted state
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    if (isMobileMenuOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile header buttons - only visible on mobile */}
      <div className='lg:hidden flex items-center space-x-2'>
        {/* Quick login button when not authenticated - wrapped with auth */}
        <MobileAuthButton sessionUser={sessionUser} onOpenAuthModal={onOpenAuthModal} />
        
        {/* Hamburger menu toggle with animated icon */}
        <Button 
          variant='ghost' 
          size='icon' 
          className='relative z-[60] hover:bg-transparent active:bg-transparent focus:bg-transparent'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* Single icon that morphs between Menu and X */}
          {isMobileMenuOpen ? (
            <X className='w-5 h-5 transition-transform duration-200' />
          ) : (
            <Menu className='w-5 h-5 transition-transform duration-200' />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay - Rendered via Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className='fixed left-0 right-0 top-16 bottom-0 bg-apty-bg-base z-40 lg:hidden overflow-y-auto'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div className='min-h-full flex flex-col'>
                {/* Navigation items */}
                <div className='flex-1 container mx-auto px-6 py-8'>
                  <nav className='flex flex-col'>
                    {/* Add Contact to mobile menu */}
                    {[
                      ...navigationItems, 
                      { title: 'Contact Us', href: '/contact' }
                    ].map((item, index) => (
                      <motion.div 
                        key={item.title}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.04, // Stagger animation
                          duration: 0.25,
                          ease: "easeOut"
                        }}
                      >
                        {(item as any).comingSoon ? (
                          // Coming soon item
                          <div
                            className='group flex items-center justify-between py-4 text-lg font-medium text-apty-text-secondary border-b border-apty-border-subtle cursor-pointer active:bg-apty-bg-muted'
                          >
                            <span className='flex items-center'>
                              {item.title}
                              <span className='ml-2 px-2 py-0.5 text-[10px] font-semibold bg-apty-primary/20 text-apty-primary rounded-full transition-all duration-300 group-active:scale-110 group-active:bg-apty-primary/30'>
                                Soon
                              </span>
                            </span>
                            <span className='text-2xl font-light opacity-30'>›</span>
                          </div>
                        ) : item.href ? (
                          // Simple link item
                          <a
                            href={item.href}
                            className='flex items-center justify-between py-4 text-lg font-medium text-apty-text-primary hover:text-apty-text-secondary transition-colors border-b border-apty-border-subtle'
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span>{item.title}</span>
                            <span className='text-2xl font-light opacity-50'>›</span>
                          </a>
                        ) : (
                          // Dropdown item with accordion
                          <>
                            <button
                              className='flex items-center justify-between w-full py-4 text-lg font-medium text-apty-text-primary hover:text-apty-text-secondary transition-colors text-left border-b border-apty-border-subtle'
                              onClick={() => toggleMobileDropdown(item.title)}
                            >
                              <span>{item.title}</span>
                              <ChevronDown
                                className={`h-5 w-5 opacity-50 transition-transform ${
                                  mobileDropdowns[item.title] ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                            {/* Animated dropdown content */}
                            <AnimatePresence>
                              {mobileDropdowns[item.title] && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.15, ease: "easeOut" }}
                                  className='bg-apty-bg-muted'
                                >
                                  {item.items?.map((subItem, subIndex) => {
                                    // Resolve icon from string name
                                    const Icon = getIcon(subItem.iconName);
                                    return (
                                      <motion.a
                                        key={subItem.title}
                                        href={subItem.href}
                                        className='flex items-center space-x-3 py-3 px-8 text-sm text-apty-text-secondary hover:text-apty-text-primary transition-colors border-b border-apty-border-subtle'
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: subIndex * 0.02, duration: 0.2 }}
                                      >
                                        {Icon && <Icon className='w-4 h-4' />}
                                        <div>
                                          <div className='font-medium'>{subItem.title}</div>
                                          <div className='text-xs text-apty-text-tertiary'>
                                            {subItem.description}
                                          </div>
                                        </div>
                                      </motion.a>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        )}
                      </motion.div>
                    ))}
                </nav>
              </div>

              {/* Mobile Auth Actions - Fixed at bottom */}
              <div className='mt-auto bg-apty-bg-base border-t border-apty-border-default'>
                <div className='container mx-auto px-5 py-5'>
                  <HeaderAuthActions 
                    isMobile 
                    onMobileMenuClose={() => setIsMobileMenuOpen(false)}
                    sessionUser={sessionUser}
                    onOpenAuthModal={onOpenAuthModal}
                    onSignOut={onSignOut}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}