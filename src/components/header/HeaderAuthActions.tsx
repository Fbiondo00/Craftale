/**
 * HeaderAuthActions Component - Client Component
 * 
 * Purpose: Handles authentication-related UI in the header
 * 
 * Features:
 * - Shows user avatar dropdown when authenticated
 * - Shows Sign In/Get Started buttons when not authenticated
 * - Different layouts for desktop and mobile
 * - User menu with Dashboard, Profile, Logout options
 * 
 * Why client-side: 
 * - Interactive buttons and dropdown menus
 * - Uses framer-motion for animations
 * 
 * Note: This component uses props for auth state and callbacks,
 * avoiding multiple AuthProvider instances.
 */

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AptyPrimaryButton, AptySecondaryButton } from '@/components/apty/AptyButton';
import {
  LogIn,
  LogOut,
  User,
  LayoutDashboard,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type SessionUser } from '@/lib/supabase/get-session';
import { ClientThemeToggle } from '@/components/ClientThemeToggle';

interface HeaderAuthActionsProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
  sessionUser: SessionUser | null;
  onOpenAuthModal?: (mode: 'signin' | 'signup') => void;
  onSignOut?: () => void;
}

export function HeaderAuthActions({ 
  isMobile = false, 
  onMobileMenuClose,
  sessionUser,
  onOpenAuthModal,
  onSignOut 
}: HeaderAuthActionsProps) {
  // Use props instead of context
  const user = sessionUser;
  const isAuthenticated = !!sessionUser;

  // Mobile layout version
  if (isMobile) {
    return (
      <>
        {isAuthenticated ? (
          // Authenticated mobile menu
          <div className='space-y-2'>
            {/* User info card with APTY tokens */}
            <div className='flex items-center space-x-3 px-4 py-3 mb-4 bg-apty-bg-muted/50 rounded-apty-lg'>
              <Avatar className='h-10 w-10'>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className='bg-apty-gradient-primary text-apty-text-on-brand'>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <p className='text-sm font-medium text-apty-text-primary'>{user?.name}</p>
                <p className='text-xs text-apty-text-secondary'>{user?.email}</p>
              </div>
            </div>
            {/* Menu actions */}
            <Button
              variant='ghost'
              className='w-full justify-start'
              onClick={onMobileMenuClose}
            >
              <LayoutDashboard className='mr-2 h-4 w-4' />
              Dashboard
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start'
              onClick={onMobileMenuClose}
              asChild
            >
              <a href='/profile'>
                <User className='mr-2 h-4 w-4' />
                Profilo
              </a>
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-apty-error hover:text-apty-error-hover apty-transition'
              onClick={() => {
                onSignOut?.();
                onMobileMenuClose?.();
              }}
            >
              <LogOut className='mr-2 h-4 w-4' />
              Esci
            </Button>
          </div>
        ) : (
          // Not authenticated mobile menu - same size as desktop
          <div className='flex gap-3'>
            <AptySecondaryButton
              className='flex-1'
              onClick={() => {
                onOpenAuthModal?.('signin');
                onMobileMenuClose?.();
              }}
              size='md'
            >
              Accedi
            </AptySecondaryButton>
            <AptyPrimaryButton
              className='flex-[3.5]'
              onClick={() => {
                onOpenAuthModal?.('signup');
                onMobileMenuClose?.();
              }}
              size='md'
              withChevron
            >
              Richiedi un preventivo
            </AptyPrimaryButton>
          </div>
        )}
      </>
    );
  }

  // Desktop version
  return (
    <div className='flex items-center'>
      {/* Theme Toggle */}
      <ClientThemeToggle />
      
      {/* Vertical Divider - using APTY design tokens */}
      <div className='h-8 w-px bg-apty-border-subtle mx-3' />
      
      {/* Auth Actions */}
      {isAuthenticated ? (
        // Authenticated desktop dropdown
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
              <Avatar className='h-10 w-10'>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className='bg-apty-gradient-primary text-apty-text-on-brand'>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end'>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none text-apty-text-primary'>{user?.name}</p>
                <p className='text-xs leading-none text-apty-text-secondary'>{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>
              <LayoutDashboard className='mr-2 h-4 w-4' />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' asChild>
              <a href='/profile'>
                <User className='mr-2 h-4 w-4' />
                <span>Profilo</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer text-apty-error hover:text-apty-error-hover focus:text-apty-error-hover apty-transition'
              onClick={onSignOut}
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>Esci</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // Not authenticated desktop buttons
        <div className='flex items-center space-x-2'>
          <AptySecondaryButton
            onClick={() => onOpenAuthModal?.('signin')}
            size='md'
          >
            Accedi
          </AptySecondaryButton>
          <AptyPrimaryButton
            onClick={() => onOpenAuthModal?.('signin')}
            size='md'
            withChevron
          >
            Inizia Ora
          </AptyPrimaryButton>
        </div>
      )}
    </div>
  );
}

/**
 * MobileAuthButton Component
 * 
 * Simple login button shown in mobile header when not authenticated
 * Separated to keep mobile menu toggle clean
 */
export function MobileAuthButton({ 
  sessionUser,
  onOpenAuthModal 
}: { 
  sessionUser: SessionUser | null;
  onOpenAuthModal?: (mode: 'signin' | 'signup') => void;
}) {
  const isAuthenticated = !!sessionUser;
  
  // Only show when not authenticated
  if (isAuthenticated) return null;
  
  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => onOpenAuthModal?.('signin')}
      className='relative hover:bg-transparent active:bg-transparent focus:bg-transparent'
    >
      <LogIn className='w-5 h-5' />
    </Button>
  );
}