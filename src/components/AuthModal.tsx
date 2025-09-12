"use client";

import React, { useState } from "react";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { EmailConfirmation } from "@/components/auth/EmailConfirmation";
import { Dialog } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { ForgotPasswordFormData, SignInFormData, SignUpFormData } from "@/types/auth";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

export const AuthModal: React.FC = () => {
  const {
    showAuthModal,
    closeAuthModal,
    authMode,
    signIn,
    signUp,
    resetPassword,
    resendConfirmationEmail,
    pendingEmail,
    clearPendingEmail,
    openAuthModal,
  } = useAuth();

  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const handleSignInSuccess = async (data: SignInFormData) => {
    await signIn(data.email, data.password, data.rememberMe);
  };

  const handleSignUpSuccess = async (data: SignUpFormData) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    const result = await signUp(data.email, data.password, fullName);

    console.log("SignUp result:", result); // Debug log

    if (result && result.needsEmailConfirmation) {
      console.log("Setting email confirmation view for:", data.email);
      setConfirmationEmail(data.email);
      setShowEmailConfirmation(true);
      // Keep modal open to show EmailConfirmation component
    }
  };

  const handleSocialAuth = (provider: "google" | "facebook") => {
    // Mock social auth - in real app would redirect to OAuth flow
    console.log(`Social auth with ${provider}`);
  };

  const handleForgotPasswordSuccess = async (data: ForgotPasswordFormData) => {
    await resetPassword(data.email);
  };

  const handleResendEmail = async () => {
    if (confirmationEmail) {
      await resendConfirmationEmail(confirmationEmail);
    }
  };

  const handleBackToSignIn = () => {
    setShowEmailConfirmation(false);
    setConfirmationEmail("");
    clearPendingEmail();
    openAuthModal("signin");
  };

  const handleModalClose = () => {
    if (showEmailConfirmation) {
      // If closing while showing email confirmation, reset everything
      setShowEmailConfirmation(false);
      setConfirmationEmail("");
      clearPendingEmail();
    }
    closeAuthModal();
  };

  // Show email confirmation if pending
  React.useEffect(() => {
    if (pendingEmail) {
      setConfirmationEmail(pendingEmail);
      setShowEmailConfirmation(true);
    }
  }, [pendingEmail]);

  return (
    <Dialog open={showAuthModal || showEmailConfirmation} onOpenChange={handleModalClose}>
      <AnimatePresence>
        {(showAuthModal || showEmailConfirmation) && (
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <DialogPrimitive.Content
              className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%]",
                "max-w-none p-0 h-screen max-h-screen overflow-auto",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              )}
              aria-describedby="auth-modal-description"
            >
              {/* Visually hidden title for accessibility */}
              <DialogPrimitive.Title className="sr-only">
                {showEmailConfirmation
                  ? "Email Confirmation"
                  : authMode === "signin"
                    ? "Sign In"
                    : authMode === "signup"
                      ? "Sign Up"
                      : "Reset Password"}
              </DialogPrimitive.Title>

              {/* Visually hidden description for accessibility */}
              <DialogPrimitive.Description id="auth-modal-description" className="sr-only">
                {showEmailConfirmation
                  ? "Please check your email to confirm your account"
                  : authMode === "signin"
                    ? "Sign in to your account to continue"
                    : authMode === "signup"
                      ? "Create a new account to get started"
                      : "Reset your password"}
              </DialogPrimitive.Description>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {showEmailConfirmation && confirmationEmail ? (
                  <EmailConfirmation
                    email={confirmationEmail}
                    onResendEmail={handleResendEmail}
                    onBackToSignIn={handleBackToSignIn}
                  />
                ) : (
                  <AuthContainer
                    initialMode={authMode}
                    onSignInSuccess={handleSignInSuccess}
                    onSignUpSuccess={handleSignUpSuccess}
                    onForgotPasswordSuccess={handleForgotPasswordSuccess}
                    onSocialAuth={handleSocialAuth}
                  />
                )}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </Dialog>
  );
};
