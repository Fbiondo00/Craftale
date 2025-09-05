import { useState, useCallback } from 'react';
import {
  AuthMode,
  SignInFormData,
  SignUpFormData,
  ForgotPasswordFormData,
  SignInFormErrors,
  SignUpFormErrors,
  ForgotPasswordFormErrors,
  FormSubmissionState,
} from '@/types/auth';
import {
  validateSignInForm,
  validateSignUpForm,
  validateForgotPasswordForm,
} from '@/lib/validations/auth';

// Initial form data
const initialSignInData: SignInFormData = {
  email: '',
  password: '',
  rememberMe: false,
};

const initialSignUpData: SignUpFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const initialForgotPasswordData: ForgotPasswordFormData = {
  email: '',
};

// Initial errors
const initialSignInErrors: SignInFormErrors = {};
const initialSignUpErrors: SignUpFormErrors = {};
const initialForgotPasswordErrors: ForgotPasswordFormErrors = {};

export const useAuthForm = (mode: AuthMode) => {
  // Form data state
  const [signInData, setSignInData] = useState<SignInFormData>(initialSignInData);
  const [signUpData, setSignUpData] = useState<SignUpFormData>(initialSignUpData);
  const [forgotPasswordData, setForgotPasswordData] =
    useState<ForgotPasswordFormData>(initialForgotPasswordData);

  // Errors state
  const [signInErrors, setSignInErrors] = useState<SignInFormErrors>(initialSignInErrors);
  const [signUpErrors, setSignUpErrors] = useState<SignUpFormErrors>(initialSignUpErrors);
  const [forgotPasswordErrors, setForgotPasswordErrors] = useState<ForgotPasswordFormErrors>(
    initialForgotPasswordErrors
  );

  // Form state
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>('idle');
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Get current form data and errors based on mode
  const currentData =
    mode === 'signin' ? signInData : mode === 'signup' ? signUpData : forgotPasswordData;
  const currentErrors =
    mode === 'signin' ? signInErrors : mode === 'signup' ? signUpErrors : forgotPasswordErrors;

  // Update field value
  const updateField = useCallback(
    (field: string, value: string | boolean) => {
      if (mode === 'signin') {
        setSignInData((prev) => ({ ...prev, [field]: value }));
        // Clear field error when user starts typing
        if (signInErrors[field as keyof SignInFormErrors]) {
          setSignInErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      } else if (mode === 'signup') {
        setSignUpData((prev) => ({ ...prev, [field]: value }));
        // Clear field error when user starts typing
        if (signUpErrors[field as keyof SignUpFormErrors]) {
          setSignUpErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      } else {
        setForgotPasswordData((prev) => ({ ...prev, [field]: value }));
        // Clear field error when user starts typing
        if (forgotPasswordErrors[field as keyof ForgotPasswordFormErrors]) {
          setForgotPasswordErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      }
    },
    [mode, signInErrors, signUpErrors, forgotPasswordErrors]
  );

  // Mark field as touched
  const markFieldTouched = useCallback((field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field));
  }, []);

  // Validate current form
  const validateForm = useCallback(() => {
    if (mode === 'signin') {
      const result = validateSignInForm(signInData);
      setSignInErrors(result.errors as SignInFormErrors);
      return result.isValid;
    } else if (mode === 'signup') {
      const result = validateSignUpForm(signUpData);
      setSignUpErrors(result.errors as SignUpFormErrors);
      return result.isValid;
    } else {
      const result = validateForgotPasswordForm(forgotPasswordData);
      setForgotPasswordErrors(result.errors as ForgotPasswordFormErrors);
      return result.isValid;
    }
  }, [mode, signInData, signUpData, forgotPasswordData]);

  // Submit form
  const submitForm = useCallback(
    async (
      onSubmit: (data: SignInFormData | SignUpFormData | ForgotPasswordFormData) => Promise<void>
    ) => {
      // Mark all fields as touched
      const allFields =
        mode === 'signin'
          ? Object.keys(signInData)
          : mode === 'signup'
            ? Object.keys(signUpData)
            : Object.keys(forgotPasswordData);
      setTouchedFields(new Set(allFields));

      // Validate form
      const isValid = validateForm();
      if (!isValid) {
        return;
      }

      // Set loading state
      setSubmissionState('loading');

      try {
        await onSubmit(currentData);
        setSubmissionState('success');

        // Reset form on successful submission
        if (mode === 'signin') {
          setSignInData(initialSignInData);
          setSignInErrors(initialSignInErrors);
        } else if (mode === 'signup') {
          setSignUpData(initialSignUpData);
          setSignUpErrors(initialSignUpErrors);
        } else {
          setForgotPasswordData(initialForgotPasswordData);
          setForgotPasswordErrors(initialForgotPasswordErrors);
        }
        setTouchedFields(new Set());
      } catch (error) {
        setSubmissionState('error');

        // Set general error
        const generalError =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred. Please try again.';

        if (mode === 'signin') {
          setSignInErrors((prev) => ({ ...prev, general: generalError }));
        } else if (mode === 'signup') {
          setSignUpErrors((prev) => ({ ...prev, general: generalError }));
        } else {
          setForgotPasswordErrors((prev) => ({ ...prev, general: generalError }));
        }
      }
    },
    [mode, signInData, signUpData, forgotPasswordData, currentData, validateForm]
  );

  // Reset form state
  const resetForm = useCallback(() => {
    if (mode === 'signin') {
      setSignInData(initialSignInData);
      setSignInErrors(initialSignInErrors);
    } else if (mode === 'signup') {
      setSignUpData(initialSignUpData);
      setSignUpErrors(initialSignUpErrors);
    } else {
      setForgotPasswordData(initialForgotPasswordData);
      setForgotPasswordErrors(initialForgotPasswordErrors);
    }
    setTouchedFields(new Set());
    setSubmissionState('idle');
  }, [mode]);

  // Clear general error
  const clearGeneralError = useCallback(() => {
    if (mode === 'signin') {
      setSignInErrors((prev) => ({ ...prev, general: undefined }));
    } else if (mode === 'signup') {
      setSignUpErrors((prev) => ({ ...prev, general: undefined }));
    } else {
      setForgotPasswordErrors((prev) => ({ ...prev, general: undefined }));
    }
  }, [mode]);

  return {
    // Form data
    formData: currentData,
    errors: currentErrors,

    // Form state
    isLoading: submissionState === 'loading',
    isSuccess: submissionState === 'success',
    isError: submissionState === 'error',
    touchedFields,

    // Actions
    updateField,
    markFieldTouched,
    submitForm,
    resetForm,
    clearGeneralError,
    validateForm,
  };
};
