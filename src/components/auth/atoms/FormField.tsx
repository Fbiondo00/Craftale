import * as React from 'react';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {children}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
