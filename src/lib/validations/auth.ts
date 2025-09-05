import {
  ValidationResult,
  SignInFormData,
  SignUpFormData,
  ForgotPasswordFormData,
} from '@/types/auth';

// Email validation utility
export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return 'Email is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return undefined;
};

// Password validation utility
export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  // Check for at least one uppercase letter, one lowercase letter, and one number
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasUppercase || !hasLowercase || !hasNumber) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }

  return undefined;
};

// Confirm password validation utility
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return undefined;
};

// Name validation utility
export const validateName = (name: string, fieldName: string): string | undefined => {
  if (!name.trim()) {
    return `${fieldName} is required`;
  }

  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }

  // Check for valid name characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }

  return undefined;
};

// Sign in form validation
export const validateSignInForm = (data: SignInFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate email
  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.email = emailError;
  }

  // Validate password
  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Sign up form validation
export const validateSignUpForm = (data: SignUpFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate first name
  const firstNameError = validateName(data.firstName, 'First name');
  if (firstNameError) {
    errors.firstName = firstNameError;
  }

  // Validate last name
  const lastNameError = validateName(data.lastName, 'Last name');
  if (lastNameError) {
    errors.lastName = lastNameError;
  }

  // Validate email
  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.email = emailError;
  }

  // Validate password
  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  // Validate confirm password
  const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword);
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Forgot password form validation
export const validateForgotPasswordForm = (data: ForgotPasswordFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate email
  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.email = emailError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Utility to check if form field should show error
export const shouldShowError = (error: string | undefined, touched: boolean): boolean => {
  return Boolean(error && touched);
};
