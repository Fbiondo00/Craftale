import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className='flex items-center space-x-2'>
        <input
          type='checkbox'
          id={checkboxId}
          ref={ref}
          className={cn(
            'h-4 w-4 rounded border border-apty-border-default bg-apty-bg-base text-apty-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apty-primary focus-visible:ring-offset-2 focus-visible:ring-offset-apty-bg-elevated disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-apty-bg-muted accent-apty-primary apty-transition',
            error && 'border-apty-error focus-visible:ring-apty-error',
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              'text-sm font-medium text-apty-text-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error && 'text-apty-error'
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
