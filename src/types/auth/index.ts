// Authentication form data interfaces
export interface BaseFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignInFormData extends BaseFormData {
  rememberMe: boolean;
}

export interface SignUpFormData extends BaseFormData {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

// Form validation error types
export interface BaseFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface SignInFormErrors extends BaseFormErrors {
  rememberMe?: string;
}

export interface SignUpFormErrors extends BaseFormErrors {
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
}

// Form submission states
export type FormSubmissionState = "idle" | "loading" | "success" | "error";

// Forgot password form data
export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordFormErrors {
  email?: string;
  general?: string;
}

// Authentication mode
export type AuthMode = "signin" | "signup" | "forgot-password";

// Form validation result
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// API response types
export interface AuthApiResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

// Component prop types
export interface AuthFormProps {
  onSubmit: (data: SignInFormData | SignUpFormData) => Promise<void>;
  onModeToggle: () => void;
  isLoading: boolean;
  errors: SignInFormErrors | SignUpFormErrors;
  mode: AuthMode;
}

export interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export interface SocialAuthProps {
  onGoogleAuth: () => void;
  onFacebookAuth: () => void;
  isLoading: boolean;
}
