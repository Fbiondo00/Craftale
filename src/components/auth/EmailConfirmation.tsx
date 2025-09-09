'use client';

import React from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AptyPrimaryButton } from '@/components/apty/AptyButton';

interface EmailConfirmationProps {
  email: string;
  onResendEmail?: () => Promise<void>;
  onBackToSignIn?: () => void;
}

export const EmailConfirmation: React.FC<EmailConfirmationProps> = ({
  email,
  onResendEmail,
  onBackToSignIn,
}) => {
  const [isResending, setIsResending] = React.useState(false);
  const [resendSuccess, setResendSuccess] = React.useState(false);

  const handleResendEmail = async () => {
    if (!onResendEmail) return;

    setIsResending(true);
    setResendSuccess(false);

    try {
      await onResendEmail();
      setResendSuccess(true);
      // Reset success message after 3 seconds
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to resend confirmation email:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <Card className='w-full max-w-md shadow-apty-brand-lg border border-apty-border-default'>
        <CardHeader className='text-center pb-4'>
        <div className='mx-auto w-16 h-16 bg-apty-bg-elevated rounded-full flex items-center justify-center mb-4 border border-apty-border-subtle'>
          <Mail className='w-8 h-8 text-apty-primary' />
        </div>
        <CardTitle className='text-2xl font-semibold font-apty-heading text-apty-text-primary'>Controlla la tua email</CardTitle>
        <CardDescription className='text-apty-text-secondary'>
          Ti abbiamo inviato un link di conferma a:
        </CardDescription>
        <p className='font-medium text-apty-text-primary mt-2'>{email}</p>
      </CardHeader>

      <CardContent className='space-y-6'>
        <div className='bg-apty-bg-subtle border border-apty-border-subtle rounded-lg p-4'>
          <h3 className='font-medium text-apty-text-primary mb-2 flex items-center gap-2'>
            <CheckCircle className='w-5 h-5 text-apty-accent' />
            Ci sei quasi!
          </h3>
          <p className='text-sm text-apty-text-secondary'>
            Controlla la tua email e clicca sul link di conferma per attivare il tuo account. Il
            link scade tra 24 ore.
          </p>
        </div>

        <div className='space-y-4'>
          {resendSuccess ? (
            <div className='text-center text-apty-accent font-medium'>
              Email di conferma inviata di nuovo con successo!
            </div>
          ) : (
            <>
              <p className='text-sm text-apty-text-secondary text-center'>
                Non hai ricevuto l'email? Controlla la cartella spam oppure
              </p>
              {onResendEmail && (
                <AptyPrimaryButton
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className='w-full justify-center'
                  size='lg'
                >
                  {isResending ? (
                    <div className='flex items-center space-x-2'>
                      <div className='w-4 h-4 border-2 border-apty-text-on-brand/30 border-t-apty-text-on-brand rounded-full animate-spin' />
                      <span>Invio in corso...</span>
                    </div>
                  ) : (
                    'Invia di nuovo l\'email di conferma'
                  )}
                </AptyPrimaryButton>
              )}
            </>
          )}

          {onBackToSignIn && (
            <div className='text-center'>
              <button
                type='button'
                onClick={onBackToSignIn}
                className='text-sm text-apty-primary hover:text-apty-primary-hover font-medium apty-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apty-primary focus-visible:ring-offset-2'
              >
        Torna all'accesso
              </button>
            </div>
          )}
        </div>

        <div className='border-t border-apty-border-subtle pt-4'>
          <p className='text-xs text-center text-apty-text-tertiary'>
      Se continui ad avere problemi, contatta il nostro team di supporto.
          </p>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};
