import * as React from 'react';
import { Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextInputField, PasswordField, SocialAuthButtons } from '../molecules';
import { ErrorMessage } from '../atoms';
import { SignUpFormData, SignUpFormErrors } from '@/types/auth';
import { useAuthForm } from '@/hooks/auth/useAuthForm';
import { cn } from '@/lib/utils';
import { AptyPrimaryButton } from '@/components/apty/AptyButton';

export interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => Promise<void>;
  onModeToggle: () => void;
  onSocialAuth: (provider: 'google' | 'facebook') => void;
  className?: string;
}

export const SignUpForm = React.forwardRef<HTMLFormElement, SignUpFormProps>(
  ({ onSubmit, onModeToggle, onSocialAuth, className, ...props }, ref) => {
    const {
      formData,
      errors,
      isLoading,
      updateField,
      markFieldTouched,
      submitForm,
      clearGeneralError,
    } = useAuthForm('signup');

    const handleSubmit = React.useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        await submitForm(async (data) => {
          await onSubmit(data as SignUpFormData);
        });
      },
      [submitForm, onSubmit]
    );

    const signUpFormData = formData as SignUpFormData;
    const signUpErrors = errors as SignUpFormErrors;

    const handleGoogleAuth = React.useCallback(() => {
      onSocialAuth('google');
    }, [onSocialAuth]);

    const handleFacebookAuth = React.useCallback(() => {
      onSocialAuth('facebook');
    }, [onSocialAuth]);

    const handleFieldChange = React.useCallback(
      (field: keyof SignUpFormData) => (value: string | boolean) => {
        updateField(field, value);
        if (signUpErrors.general) {
          clearGeneralError();
        }
      },
      [updateField, signUpErrors.general, clearGeneralError]
    );

    const handleFieldBlur = React.useCallback(
      (field: string) => () => {
        markFieldTouched(field);
      },
      [markFieldTouched]
    );

    return (
      <Card
        className={cn(
          'w-full max-w-md mx-auto',
          className
        )}
      >
        <CardHeader className='text-center pb-4'>
          <CardTitle className='text-2xl font-semibold font-apty-heading text-apty-text-primary'>Create Account</CardTitle>
          <CardDescription className='text-apty-text-secondary'>Start your journey with us today</CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          <form ref={ref} onSubmit={handleSubmit} className='space-y-4' {...props}>
            <div className='grid grid-cols-2 gap-4'>
              <TextInputField
                id='signup-firstName'
                label='First Name'
                placeholder='John'
                value={signUpFormData.firstName}
                onChange={handleFieldChange('firstName')}
                onBlur={handleFieldBlur('firstName')}
                error={signUpErrors.firstName}
                icon={User}
                required
              />

              <TextInputField
                id='signup-lastName'
                label='Last Name'
                placeholder='Doe'
                value={signUpFormData.lastName}
                onChange={handleFieldChange('lastName')}
                onBlur={handleFieldBlur('lastName')}
                error={signUpErrors.lastName}
                icon={User}
                required
              />
            </div>

            <TextInputField
              id='signup-email'
              label='Email'
              type='email'
              placeholder='john@example.com'
              value={signUpFormData.email}
              onChange={handleFieldChange('email')}
              onBlur={handleFieldBlur('email')}
              error={signUpErrors.email}
              icon={Mail}
              required
            />

            <PasswordField
              id='signup-password'
              label='Password'
              placeholder='Create a strong password'
              value={signUpFormData.password}
              onChange={handleFieldChange('password')}
              onBlur={handleFieldBlur('password')}
              error={signUpErrors.password}
              required
            />

            <PasswordField
              id='signup-confirmPassword'
              label='Confirm Password'
              placeholder='Confirm your password'
              value={signUpFormData.confirmPassword}
              onChange={handleFieldChange('confirmPassword')}
              onBlur={handleFieldBlur('confirmPassword')}
              error={signUpErrors.confirmPassword}
              required
            />

            {signUpErrors.general && <ErrorMessage>{signUpErrors.general}</ErrorMessage>}

            <AptyPrimaryButton type='submit' className='w-full justify-center' size='lg' disabled={isLoading}>
              {isLoading ? (
                <div className='flex items-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-apty-text-on-brand/30 border-t-apty-text-on-brand rounded-full animate-spin' />
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </AptyPrimaryButton>
          </form>
{/* 
          <SocialAuthButtons
            onGoogleAuth={handleGoogleAuth}
            onFacebookAuth={handleFacebookAuth}
            isLoading={isLoading}
          /> */}

          <div className='text-center'>
            <span className='text-sm text-apty-text-secondary'>Already have an account?</span>
            <button
              type='button'
              onClick={onModeToggle}
              className='ml-1 text-sm text-apty-primary hover:text-apty-primary-hover font-medium apty-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apty-primary focus-visible:ring-offset-2'
            >
              Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

SignUpForm.displayName = 'SignUpForm';
