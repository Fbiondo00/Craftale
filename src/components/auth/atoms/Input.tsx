import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-apty-md border border-apty-border-default bg-apty-bg-base px-3 py-2 text-sm text-apty-text-primary placeholder:text-apty-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apty-primary focus-visible:ring-offset-2 focus-visible:ring-offset-apty-bg-elevated disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-apty-bg-muted apty-transition',
          error && 'border-apty-error focus-visible:ring-apty-error',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
