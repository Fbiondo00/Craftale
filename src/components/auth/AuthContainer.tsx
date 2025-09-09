import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Palette, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SignInForm, SignUpForm, ForgotPasswordForm } from './organisms';
import { AuthMode, SignInFormData, SignUpFormData, ForgotPasswordFormData } from '@/types/auth';
import { cn } from '@/lib/utils';

export interface AuthContainerProps {
  initialMode?: AuthMode;
  onSignInSuccess?: (data: SignInFormData) => void;
  onSignUpSuccess?: (data: SignUpFormData) => void;
  onForgotPasswordSuccess?: (data: ForgotPasswordFormData) => void;
  onSocialAuth?: (provider: 'google' | 'facebook') => void;
  className?: string;
}

export const AuthContainer = React.forwardRef<HTMLDivElement, AuthContainerProps>(
  (
    {
      initialMode = 'signin',
      onSignInSuccess,
      onSignUpSuccess,
      onForgotPasswordSuccess,
      onSocialAuth,
      className,
      ...props
    },
    ref
  ) => {
    const [mode, setMode] = React.useState<AuthMode>(initialMode);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');

    const toggleMode = React.useCallback(() => {
      setMode((prev) => (prev === 'signin' ? 'signup' : 'signin'));
    }, []);

    const handleForgotPassword = React.useCallback(() => {
      setMode('forgot-password');
    }, []);

    const handleBackToSignIn = React.useCallback(() => {
      setMode('signin');
    }, []);

    const handleSignInSubmit = React.useCallback(
      async (data: SignInFormData) => {
        try {
          await onSignInSuccess?.(data);
          setSuccessMessage('You have successfully signed in. Welcome back!');
          setIsSuccess(true);
        } catch (error) {
          // Re-throw to be handled by the form
          throw error;
        }
      },
      [onSignInSuccess]
    );

    const handleSignUpSubmit = React.useCallback(
      async (data: SignUpFormData) => {
        try {
          await onSignUpSuccess?.(data);
          setSuccessMessage('Your account has been created successfully! Welcome to our platform!');
          setIsSuccess(true);
        } catch (error) {
          // Re-throw to be handled by the form
          throw error;
        }
      },
      [onSignUpSuccess]
    );

    const handleSocialAuth = React.useCallback(
      (provider: 'google' | 'facebook') => {
        onSocialAuth?.(provider);
      },
      [onSocialAuth]
    );

    const handleForgotPasswordSubmit = React.useCallback(
      async (data: ForgotPasswordFormData) => {
        try {
          await onForgotPasswordSuccess?.(data);
          // The ForgotPasswordForm component handles its own success state
        } catch (error) {
          // Re-throw to be handled by the form
          throw error;
        }
      },
      [onForgotPasswordSuccess]
    );

    const handleContinue = React.useCallback(() => {
      setIsSuccess(false);
      setSuccessMessage('');
    }, []);

    if (isSuccess) {
      return (
        <div
          className={cn(
            'min-h-screen bg-apty-bg-base flex items-center justify-center p-4',
            className
          )}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='w-full max-w-md'
          >
            <Card>
              <CardContent className='p-8 text-center'>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className='w-16 h-16 bg-apty-success/10 rounded-full flex items-center justify-center mx-auto mb-4'
                >
                  <CheckCircle className='w-8 h-8 text-apty-success' />
                </motion.div>
                <h2 className='text-2xl font-bold text-apty-text-primary font-apty-heading mb-2'>
                  {mode === 'signin' ? 'Welcome Back!' : 'Account Created!'}
                </h2>
                <p className='text-apty-text-secondary mb-6'>{successMessage}</p>
                <Button
                  onClick={handleContinue}
                  className='w-full'
                >
                  Continue to Dashboard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen bg-apty-bg-base flex items-center justify-center p-4',
          className
        )}
        {...props}
      >
        {/* Background Elements with APTY gradients */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-apty-primary/10 to-apty-tertiary/10 rounded-full blur-3xl' />
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-apty-tertiary/10 to-apty-accent/10 rounded-full blur-3xl' />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-apty-primary/5 to-apty-tertiary/5 rounded-full blur-3xl' />
        </div>

        <div className='relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center'>
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='hidden lg:block space-y-8'
          >
            <div className='space-y-4'>
              <a 
                href='/'
                className='flex items-center space-x-3 group hover:scale-[1.02] apty-transition w-fit'
              >
                <img 
                  src='/logo.png' 
                  alt='Craftale Logo' 
                  className='w-12 h-12'
                />
                <div className='flex flex-col'>
                  <span className='text-2xl font-bold apty-gradient-text'>
                    Craftale
                  </span>
                  <span className='text-xs text-apty-text-secondary font-medium'>Website Builders</span>
                </div>
              </a>
              <h1 className='text-4xl lg:text-5xl font-bold text-apty-text-primary font-apty-heading leading-tight'>
                Trasforma le tue idee in
                <br />
                <span className='apty-gradient-text'>
                  realtà digitali
                </span>
              </h1>
              <p className='text-xl text-apty-text-secondary leading-relaxed'>
                Sviluppiamo soluzioni web innovative per far crescere il tuo business e raggiungere
                nuovi traguardi nel mondo digitale.
              </p>
            </div>

            {/* Features */}
            <div className='space-y-4'>
              {[
                { icon: Zap, text: 'Sviluppo veloce e scalabile' },
                { icon: Palette, text: 'Design moderno e accattivante' },
                { icon: Target, text: 'SEO e marketing integrato' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className='flex items-center space-x-3'
                >
                  <div className='w-8 h-8 bg-apty-primary/10 rounded-apty-md flex items-center justify-center'>
                    <feature.icon className='w-4 h-4 text-apty-primary' />
                  </div>
                  <span className='text-apty-text-secondary'>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-6 pt-8 border-t border-apty-border-default'>
              {[
                { number: '100+', label: 'Progetti Completati' },
                { number: '98%', label: 'Clienti Soddisfatti' },
                { number: '4.9', label: 'Valutazione' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className='text-center'
                >
                  <div className='text-2xl font-bold text-apty-text-primary'>{stat.number}</div>
                  <div className='text-sm text-apty-text-tertiary'>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Forms */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='w-full max-w-md mx-auto'
          >
            {/* Mobile Branding */}
            <a 
              href='/'
              className='lg:hidden flex items-center justify-center space-x-3 mb-8 group hover:scale-[1.02] apty-transition'
            >
              <img 
                src='/logo.png' 
                alt='Craftale Logo' 
                className='w-10 h-10'
              />
              <div className='flex flex-col'>
                <span className='text-xl font-bold apty-gradient-text'>
                  Craftale
                </span>
                <span className='text-xs text-apty-text-secondary font-medium'>Website Builders</span>
              </div>
            </a>

            <AnimatePresence mode='wait'>
              {mode === 'signin' ? (
                <motion.div
                  key='signin'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SignInForm
                    onSubmit={handleSignInSubmit}
                    onModeToggle={toggleMode}
                    onSocialAuth={handleSocialAuth}
                    onForgotPassword={handleForgotPassword}
                  />
                </motion.div>
              ) : mode === 'signup' ? (
                <motion.div
                  key='signup'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SignUpForm
                    onSubmit={handleSignUpSubmit}
                    onModeToggle={toggleMode}
                    onSocialAuth={handleSocialAuth}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key='forgot-password'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ForgotPasswordForm
                    onSubmit={handleForgotPasswordSubmit}
                    onBackToSignIn={handleBackToSignIn}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }
);

AuthContainer.displayName = 'AuthContainer';
