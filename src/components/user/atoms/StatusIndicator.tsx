import * as React from 'react';
import { cn } from '@/lib/utils';
import { StatusIndicatorProps } from '@/types/user';

const statusColors = {
  online: 'bg-emerald-500 border-emerald-400',
  offline: 'bg-gray-400 border-color-strong',
  away: 'bg-color-state-warning border-yellow-400',
  busy: 'bg-color-state-error border-red-400',
} as const;

const statusAnimations = {
  online: 'animate-pulse',
  offline: '',
  away: 'animate-bounce',
  busy: 'animate-pulse',
} as const;

const statusSizes = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
} as const;

export const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ status, size = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-full border-2 border-white shadow-sm',
          statusColors[status],
          statusAnimations[status],
          statusSizes[size],
          className
        )}
        aria-label={`User is ${status}`}
        role="status"
        {...props}
      />
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator'; 