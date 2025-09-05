import * as React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextInputField, PasswordField, SocialAuthButtons } from '../molecules';
import { Checkbox, ErrorMessage } from '../atoms';
import { SignInFormData, SignInFormErrors } from '@/types/auth';
import { useAuthForm } from '@/hooks/auth/useAuthForm';
import { cn } from '@/lib/utils';
import { AptyPrimaryButton } from '@/components/apty/AptyButton';

export interface SignInFormProps {
  onSubmit: (data: SignInFormData) => Promise<void>;
  onModeToggle: () => void;
  onSocialAuth: (provider: 'google' | 'facebook') => void;
  onForgotPassword?: () => void;
  className?: string;
}

export const SignInForm = React.forwardRef<HTMLFormElement, SignInFormProps>(
  ({ onSubmit, onModeToggle, onSocialAuth, onForgotPassword, className, ...props }, ref) => {
    const {
      formData,
      errors,
      isLoading,
      updateField,
      markFieldTouched,
      submitForm,
      clearGeneralError,
    } = useAuthForm('signin');

    const signInFormData = formData as SignInFormData;
    const signInErrors = errors as SignInFormErrors;

    const handleSubmit = React.useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        await submitForm(async (data) => {
          await onSubmit(data as SignInFormData);
        });
      },
      [submitForm, onSubmit]
    );

    const handleGoogleAuth = React.useCallback(() => {
      onSocialAuth('google');
    }, [onSocialAuth]);

    const handleFacebookAuth = React.useCallback(() => {
      onSocialAuth('facebook');
    }, [onSocialAuth]);

    const handleFieldChange = React.useCallback(
      (field: keyof SignInFormData) => (value: string | boolean) => {
        updateField(field, value);
        if (signInErrors.general) {
          clearGeneralError();
        }
      },
      [updateField, signInErrors.general, clearGeneralError]
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
          <CardTitle className='text-2xl font-semibold font-apty-heading text-apty-text-primary'>Welcome Back</CardTitle>
          <CardDescription className='text-apty-text-secondary'>Sign in to your account to continue</CardDescription>
        </CardHeader>

        <CardContent className='space-y-6'>
          <form ref={ref} onSubmit={handleSubmit} className='space-y-4' {...props}>
            <TextInputField
              id='signin-email'
              label='Email'
              type='email'
              placeholder='john@example.com'
              value={signInFormData.email}
              onChange={handleFieldChange('email')}
              onBlur={handleFieldBlur('email')}
              error={signInErrors.email}
              icon={Mail}
              required
            />

            <PasswordField
              id='signin-password'
              label='Password'
              placeholder='Enter your password'
              value={signInFormData.password}
              onChange={handleFieldChange('password')}
              onBlur={handleFieldBlur('password')}
              error={signInErrors.password}
              required
            />

            <div className='flex items-center justify-between'>
              <Checkbox
                id='signin-remember'
                label='Remember me'
                checked={signInFormData.rememberMe}
                onChange={(e) => handleFieldChange('rememberMe')(e.target.checked)}
              />
              <button
                type='button'
                onClick={onForgotPassword}
                className='text-sm text-apty-primary hover:text-apty-primary-hover apty-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apty-primary focus-visible:ring-offset-2'
              >
                Forgot password?
              </button>
            </div>

            {signInErrors.general && <ErrorMessage>{signInErrors.general}</ErrorMessage>}

            <AptyPrimaryButton type='submit' className='w-full justify-center' size='lg' disabled={isLoading}>
              {isLoading ? (
                <div className='flex items-center space-x-2'>
                  <div className='w-4 h-4 border-2 border-apty-text-on-brand/30 border-t-apty-text-on-brand rounded-full animate-spin' />
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </AptyPrimaryButton>
          </form>

          <SocialAuthButtons
            onGoogleAuth={handleGoogleAuth}
            onFacebookAuth={handleFacebookAuth}
            isLoading={isLoading}
          />

          <div className='text-center'>
            <span className='text-sm text-apty-text-secondary'>Don&apos;t have an account?</span>
            <button
              type='button'
              onClick={onModeToggle}
              className='ml-1 text-sm text-apty-primary hover:text-apty-primary-hover font-medium apty-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apty-primary focus-visible:ring-offset-2'
            >
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

SignInForm.displayName = 'SignInForm';
