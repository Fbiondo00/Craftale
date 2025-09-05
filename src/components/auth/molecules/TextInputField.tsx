import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormField, Label, Input, ErrorMessage } from '../atoms';

export interface TextInputFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
}

export const TextInputField = React.forwardRef<HTMLInputElement, TextInputFieldProps>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      required = false,
      disabled = false,
      icon: Icon,
      className,
      ...props
    },
    ref
  ) => {
    const errorId = `${id}-error`;

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    return (
      <FormField className={className}>
        <Label htmlFor={id} required={required}>
          {label}
        </Label>

        <div className='relative'>
          {Icon && (
            <Icon className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-apty-text-tertiary' />
          )}
          <Input
            ref={ref}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onBlur={onBlur}
            error={Boolean(error)}
            required={required}
            disabled={disabled}
            aria-describedby={error ? errorId : undefined}
            className={cn(Icon && 'pl-10', className)}
            {...props}
          />
        </div>

        <ErrorMessage id={errorId}>{error}</ErrorMessage>
      </FormField>
    );
  }
);

TextInputField.displayName = 'TextInputField';
