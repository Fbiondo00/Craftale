/**
 * Header Component - Server Component
 * 
 * This is the main header component that is rendered on the server.
 * It contains the static structure of the header including:
 * - Logo (server-rendered)
 * - Navigation items (server-rendered structure)
 * - Background effects (static CSS)
 * 
 * Client interactivity is handled by child components:
 * - HeaderScrollEffects: Handles scroll-based styling changes
 * - HeaderNavDropdown: Handles dropdown menu interactions
 * - HeaderAuthActions: Handles auth state UI
 * - HeaderMobileMenu: Handles mobile menu toggle and display
 * 
 * This component is placed OUTSIDE AuthProvider in the layout,
 * making it truly server-side while child components can still
 * access auth context when needed.
 */

import React from 'react';
import { Code2, Monitor, Search, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationItems } from '@/components/header/navigation';
import { HeaderScrollEffects } from './HeaderScrollEffects';
import { HeaderNavDropdown } from './HeaderNavDropdown';
import { HeaderAuthActions } from './HeaderAuthActions';
import { HeaderMobileMenu } from './HeaderMobileMenu';
import { type SessionUser } from '@/lib/supabase/get-session';

interface HeaderProps {
  className?: string;
  sessionUser: SessionUser | null;
  onOpenAuthModal?: (mode: 'signin' | 'signup') => void;
  onSignOut?: () => void;
}

export default function Header({ className, sessionUser, onOpenAuthModal, onSignOut }: HeaderProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Static Background Effects - Pure CSS with APTY gradients */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-br from-apty-primary/5 via-apty-tertiary/5 to-apty-accent/5' />
      </div>

      {/* Header wrapped in scroll effects component for dynamic styling */}
      <HeaderScrollEffects>
        <div className='container mx-auto px-4'>
          <nav className='flex items-center justify-between h-16 md:h-20'>
            {/* Logo Section - Fully server-rendered with APTY tokens */}
            <a
              href='/'
              className='flex items-center space-x-3 group hover:scale-[1.02] apty-transition'
            >
              <div className='relative'>
                <img 
                  src='/logo.png' 
                  alt='Craftale Logo' 
                  className='w-10 h-10 md:w-12 md:h-12'
                />
              </div>
              <div className='flex flex-col'>
                <span className='text-xl font-bold apty-gradient-text'>
                  Craftale
                </span>
                <span className='text-xs text-apty-text-secondary font-medium'>Agenzia Web</span>
              </div>
            </a>

            {/* Desktop Navigation - Server-rendered structure with client dropdowns */}
            <div className='hidden lg:flex items-center space-x-1'>
              {navigationItems.map((item) => {
                // Map nav item titles to appropriate icons
                const Icon =
                  item.title === 'Our Work' || item.title === 'I Nostri Lavori'
                    ? Monitor
                    : item.title === 'Services' || item.title === 'Servizi'
                      ? Code2
                      : item.title === 'Resources' || item.title === 'Risorse'
                        ? Search
                        : item.title === 'About' || item.title === 'Chi Siamo'
                          ? Users
                          : item.title === 'Pricing' || item.title === 'Prezzi'
                            ? Sparkles
                            : item.title === 'Blog'
                              ? Search
                              : Monitor;

                // Handle coming soon items differently
                if ((item as any).comingSoon) {
                  return (
                    <div
                      key={item.title}
                      className='nav-trigger group flex items-center space-x-2 px-4 py-2 text-sm font-medium text-apty-text-secondary hover:text-apty-primary apty-transition rounded-apty-md relative overflow-hidden cursor-pointer'
                      title='In Arrivo'
                    >
                      <Icon className='w-4 h-4' />
                      <span>{item.title}</span>
                      <span className='ml-1 px-2 py-0.5 text-[10px] font-semibold bg-apty-primary/20 text-apty-primary rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-apty-primary/30 group-active:scale-95'>
                        Presto
                      </span>
                      {/* Animated hover background effect with APTY colors */}
                      <div className='absolute inset-0 bg-gradient-to-r from-apty-primary/5 to-apty-tertiary/5 rounded-apty-md opacity-0 group-hover:opacity-100 apty-transition -z-10' />
                    </div>
                  );
                }

                return (
                  // HeaderNavDropdown handles hover interactions on client
                  <HeaderNavDropdown
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    items={item.items}
                  >
                    {/* Regular nav link - NO chevron, NO APTY button */}
                    <a
                      href={item.href || '#'}
                      className='nav-trigger group flex items-center space-x-2 px-4 py-2 text-sm font-medium text-apty-text-primary hover:text-apty-primary apty-transition rounded-apty-md relative overflow-hidden cursor-pointer'
                    >
                      <Icon className='w-4 h-4' />
                      <span>{item.title}</span>
                      {/* Animated hover background effect with APTY colors */}
                      <div className='absolute inset-0 bg-gradient-to-r from-apty-primary/10 to-apty-tertiary/10 rounded-apty-md opacity-0 group-hover:opacity-100 apty-transition -z-10' />
                    </a>
                  </HeaderNavDropdown>
                );
              })}
            </div>

            {/* Desktop Auth Actions - Client component for auth state */}
            <div className='hidden lg:flex items-center space-x-2'>
              <HeaderAuthActions 
                sessionUser={sessionUser} 
                onOpenAuthModal={onOpenAuthModal}
                onSignOut={onSignOut}
              />
            </div>

            {/* Mobile Menu - Client component for mobile interactions */}
            <HeaderMobileMenu 
              navigationItems={navigationItems} 
              sessionUser={sessionUser}
              onOpenAuthModal={onOpenAuthModal}
              onSignOut={onSignOut}
            />
          </nav>
        </div>
      </HeaderScrollEffects>
    </div>
  );
}