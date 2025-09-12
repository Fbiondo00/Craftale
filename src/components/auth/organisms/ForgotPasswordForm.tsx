import * as React from "react";
import { ErrorMessage } from "../atoms";
import { TextInputField } from "../molecules";
import { AptyPrimaryButton } from "@/components/apty/AptyButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthForm } from "@/hooks/auth/useAuthForm";
import { cn } from "@/lib/utils";
import { ForgotPasswordFormData, ForgotPasswordFormErrors } from "@/types/auth";
import { Mail } from "lucide-react";

export interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  onBackToSignIn: () => void;
  className?: string;
}

export const ForgotPasswordForm = React.forwardRef<HTMLFormElement, ForgotPasswordFormProps>(
  ({ onSubmit, onBackToSignIn, className, ...props }, ref) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const { formData, errors, isLoading, updateField, markFieldTouched, submitForm, clearGeneralError } =
      useAuthForm("forgot-password");

    const handleSubmit = React.useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        await submitForm(async data => {
          await onSubmit(data as ForgotPasswordFormData);
          setIsSuccess(true);
        });
      },
      [submitForm, onSubmit],
    );

    const handleFieldChange = React.useCallback(
      (field: keyof ForgotPasswordFormData) => (value: string) => {
        updateField(field, value);
        if (errors.general) {
          clearGeneralError();
        }
      },
      [updateField, errors.general, clearGeneralError],
    );

    const handleFieldBlur = React.useCallback(
      (field: string) => () => {
        markFieldTouched(field);
      },
      [markFieldTouched],
    );

    const forgotPasswordFormData = formData as ForgotPasswordFormData;
    const forgotPasswordErrors = errors as ForgotPasswordFormErrors;

    if (isSuccess) {
      return (
        <Card className={cn("w-full max-w-md mx-auto", className)}>
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-apty-bg-elevated rounded-full flex items-center justify-center mx-auto mb-4 border border-apty-border-subtle">
              <Mail className="w-8 h-8 text-apty-accent" />
            </div>
            <CardTitle className="text-2xl font-semibold font-apty-heading text-apty-text-primary">
              Check your email
            </CardTitle>
            <CardDescription className="text-apty-text-secondary mt-2">
              We&apos;ve sent a password reset link to{" "}
              <strong className="text-apty-text-primary">{forgotPasswordFormData.email}</strong>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-sm text-apty-text-secondary text-center">
              <p>Didn&apos;t receive the email? Check your spam folder or</p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="text-apty-primary hover:text-apty-primary-hover font-medium mt-1 apty-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apty-primary focus-visible:ring-offset-2"
              >
                try another email address
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={onBackToSignIn}
                className="text-sm text-apty-primary hover:text-apty-primary-hover font-medium apty-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apty-primary focus-visible:ring-offset-2"
              >
                Back to Sign In
              </button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className={cn("w-full max-w-md mx-auto", className)}>
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-semibold font-apty-heading text-apty-text-primary">
            Forgot Password?
          </CardTitle>
          <CardDescription className="text-apty-text-secondary">
            No worries! Enter your email and we&apos;ll send you reset instructions.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form ref={ref} onSubmit={handleSubmit} className="space-y-4" {...props}>
            <TextInputField
              id="forgot-password-email"
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={forgotPasswordFormData.email}
              onChange={handleFieldChange("email")}
              onBlur={handleFieldBlur("email")}
              error={forgotPasswordErrors.email}
              icon={Mail}
              required
            />

            {forgotPasswordErrors.general && <ErrorMessage>{forgotPasswordErrors.general}</ErrorMessage>}

            <AptyPrimaryButton type="submit" className="w-full justify-center" size="lg" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-apty-text-on-brand/30 border-t-apty-text-on-brand rounded-full animate-spin" />
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </AptyPrimaryButton>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-apty-border-subtle" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-apty-bg-base px-2 text-apty-text-tertiary">Or</span>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onBackToSignIn}
              className="text-sm text-apty-primary hover:text-apty-primary-hover font-medium apty-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apty-primary focus-visible:ring-offset-2"
            >
              Back to Sign In
            </button>
          </div>
        </CardContent>
      </Card>
    );
  },
);

ForgotPasswordForm.displayName = "ForgotPasswordForm";
