import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { UserAvatar } from '../atoms';
import { cn } from '@/lib/utils';
import { UserMenuTriggerProps } from '@/types/user';

export const UserMenuTrigger = React.forwardRef<HTMLButtonElement, UserMenuTriggerProps>(
  ({ user, isOpen = false, onClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'relative flex items-center justify-center rounded-full transition-all duration-300 ease-out group',
          'bg-gradient-to-br from-brand-tertiary via-violet-600 to-brand-tertiary',
          'hover:from-brand-tertiary hover:via-violet-700 hover:to-purple-900',
          'shadow-lg hover:shadow-xl hover:shadow-brand-tertiary/90/25',
          'ring-2 ring-brand-tertiary/90/20 hover:ring-brand-tertiary/90/40',
          'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-tertiary/90 focus:ring-offset-2',
          isOpen && 'ring-brand-tertiary/90/40 scale-105',
          className
        )}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        {...props}
      >
        {/* Background gradient overlay */}
        <div 
          className={cn(
            'absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300',
            isOpen || 'opacity-0 group-hover:opacity-100'
          )} 
        />
        
        {/* User Avatar */}
        <div className="relative">
          <UserAvatar
            user={user}
            size="md"
            showStatus={true}
            status={user.status}
            className="ring-2 ring-white/20"
          />
        </div>
        
        {/* Dropdown indicator */}
        <ChevronDown 
          className={cn(
            'absolute -bottom-1 -right-1 w-3 h-3 text-white/80 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
    );
  }
);

UserMenuTrigger.displayName = 'UserMenuTrigger'; 