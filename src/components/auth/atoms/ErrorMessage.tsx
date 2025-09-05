import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const ErrorMessage = React.forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({ children, className, id, ...props }, ref) => {
    if (!children) return null;

    return (
      <p
        ref={ref}
        id={id}
        role='alert'
        aria-live='polite'
        className={cn('text-sm text-apty-error font-medium', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

ErrorMessage.displayName = 'ErrorMessage';
