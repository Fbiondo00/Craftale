import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormField, Label, Input, ErrorMessage } from '../atoms';

export interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      id,
      label,
      placeholder = 'Enter your password',
      value,
      onChange,
      onBlur,
      error,
      required = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const errorId = `${id}-error`;

    const togglePasswordVisibility = React.useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

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
          <Input
            ref={ref}
            id={id}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onBlur={onBlur}
            error={Boolean(error)}
            required={required}
            disabled={disabled}
            aria-describedby={error ? errorId : undefined}
            className='pr-10'
            {...props}
          />

          <button
            type='button'
            onClick={togglePasswordVisibility}
            disabled={disabled}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 text-apty-text-tertiary hover:text-apty-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apty-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              'apty-transition'
            )}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
          </button>
        </div>

        <ErrorMessage id={errorId}>{error}</ErrorMessage>
      </FormField>
    );
  }
);

PasswordField.displayName = 'PasswordField';
