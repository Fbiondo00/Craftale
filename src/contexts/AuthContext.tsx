'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { 
  signInAction, 
  signUpAction, 
  signOutAction, 
  resetPasswordAction,
  resendConfirmationAction 
} from '@/app/actions/auth';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showAuthModal: boolean;
  authMode: 'signin' | 'signup';
  pendingEmail: string | null;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ needsEmailConfirmation: boolean }>;
  signOut: () => void;
  resetPassword: (email: string) => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<void>;
  clearPendingEmail: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialUser }) => {
  // Simple state: user is either User or null, with separate loading state
  const [user, setUser] = useState<User | null>(initialUser ?? null);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const supabase = createClient();
  const lastUserRef = useRef<User | null>(null);

  // Helper function to convert Supabase user to our User interface
  const convertSupabaseUser = (supabaseUser: SupabaseUser | null): User | null => {
    if (!supabaseUser) return null;

    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
      avatar:
        supabaseUser.user_metadata?.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`,
      phone: (supabaseUser.user_metadata as any)?.phone || undefined,
    };
  };

  // Check for existing session on mount (only if no initialUser from server)
  useEffect(() => {
    const checkUser = async () => {
      // Skip if we already have user from server
      if (initialUser) {
        lastUserRef.current = initialUser;
        setIsLoading(false);
        return;
      }
      
      try {
        // Get initial session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const newUser = convertSupabaseUser(session.user);
          setUser(newUser);
          lastUserRef.current = newUser;
        } else {
          setUser(null);
          lastUserRef.current = null;
        }
      } catch (error) {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Error checking auth session:', error);
        }
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Log significant events, use debug level for TOKEN_REFRESHED
      if (event !== 'TOKEN_REFRESHED') {
        console.log('Auth state changed:', event);
      } else if (process.env.NODE_ENV === 'development') {
        console.debug('Auth state changed: TOKEN_REFRESHED');
      }

      if (event === 'SIGNED_OUT') {
        setUser(null);
        lastUserRef.current = null;
        setPendingEmail(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (session?.user) {
          const newUser = convertSupabaseUser(session.user);
          
          // Check if user data has actually changed
          if (newUser) {
            const hasUserChanged = !lastUserRef.current || 
              lastUserRef.current.id !== newUser.id ||
              lastUserRef.current.email !== newUser.email ||
              lastUserRef.current.name !== newUser.name ||
              lastUserRef.current.avatar !== newUser.avatar;
            
            if (hasUserChanged) {
              console.log('🔄 AUTH: User data updated', {
                event,
                previousId: lastUserRef.current?.id,
                newId: newUser.id,
                emailChanged: lastUserRef.current?.email !== newUser.email,
                nameChanged: lastUserRef.current?.name !== newUser.name
              });
              setUser(newUser);
              lastUserRef.current = newUser;
              setPendingEmail(null);
            }
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [initialUser]);

  const openAuthModal = useCallback((mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  const signIn = useCallback(
    async (email: string, password: string, rememberMe: boolean = false) => {
      setIsLoading(true);
      try {
        // Use Server Action for authentication
        const result = await signInAction(email, password, rememberMe);

        if (!result.success) {
          // Only log detailed errors in development
          if (process.env.NODE_ENV === 'development') {
            console.error('Sign in error details:', result.error);
          }
          
          // SECURITY: Always return generic error to prevent user enumeration
          // Special case: Email confirmation might be helpful for UX
          if (result.error?.includes('Email not confirmed')) {
            throw new Error('Please confirm your email before signing in. Check your inbox for the confirmation link.');
          }
          
          // All other errors get a generic message
          throw new Error('Invalid email or password. Please try again.');
        }

        if (result.user) {
          // Update local state with the authenticated user
          // Server Action returns minimal user data, convert to our User type
          setUser({
            id: result.user.id,
            email: result.user.email || '',
            name: result.user.user_metadata?.name || result.user.email?.split('@')[0] || 'User',
            avatar: result.user.user_metadata?.avatar || 
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${result.user.email}`,
            phone: (result.user.user_metadata as any)?.phone || undefined,
          });
          closeAuthModal();
          // No need for router.refresh() - Server Action handles revalidation
        }
      } catch (error) {
        // Only log in development, never in production
        if (process.env.NODE_ENV === 'development') {
          console.error('Sign in error:', error);
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [closeAuthModal]
  );

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      setIsLoading(true);
      try {
        // Use Server Action for sign up
        const result = await signUpAction(email, password, name);

        if (!result.success) {
          // Only log detailed errors in development
          if (process.env.NODE_ENV === 'development') {
            console.error('Sign up error details:', result.error);
          }
          
          // For sign up, we can be slightly more helpful while still being secure
          let errorMessage = 'Unable to create account. Please try again.';
          
          // Password requirements are okay to show (not a security risk)
          if (result.error?.includes('Password should be')) {
            errorMessage = result.error;
          } 
          // Email validation is also safe to show
          else if (result.error?.includes('Invalid email') || 
                   result.error?.includes('valid email')) {
            errorMessage = 'Please enter a valid email address.';
          }
          // For duplicate accounts, suggest sign in without confirming existence
          else if (result.error?.includes('already registered') || 
                   result.error?.includes('User already registered')) {
            errorMessage = 'Unable to create account. If you already have an account, please sign in instead.';
          }
          
          throw new Error(errorMessage);
        }

        // Check if email confirmation is required
        if (result.needsEmailConfirmation) {
          console.log('Email confirmation required for:', email);
          setPendingEmail(email);
          // Don't close modal - let AuthModal show EmailConfirmation component
          return { needsEmailConfirmation: true };
        } else if (result.user) {
          // User is automatically confirmed
          console.log('User auto-confirmed:', email);
          // Server Action returns minimal user data, convert to our User type
          setUser({
            id: result.user.id,
            email: result.user.email || '',
            name: result.user.user_metadata?.name || result.user.email?.split('@')[0] || 'User',
            avatar: result.user.user_metadata?.avatar || 
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${result.user.email}`,
            phone: (result.user.user_metadata as any)?.phone || undefined,
          });
          closeAuthModal();
          // No need for router.refresh() - Server Action handles revalidation
          return { needsEmailConfirmation: false };
        }

        return { needsEmailConfirmation: false };
      } catch (error) {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Sign up error:', error);
        }
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [closeAuthModal]
  );

  const signOut = useCallback(async () => {
    try {
      // Use Server Action for sign out
      const result = await signOutAction();
      
      if (result.success) {
        setUser(null);
        // No need for router.refresh() - Server Action handles revalidation
      }
    } catch (error) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Sign out error:', error);
      }
    }
  }, []);

  const resetPassword = useCallback(
    async (email: string) => {
      setIsLoading(true);
      try {
        // Use Server Action for password reset
        await resetPasswordAction(email);
        
        // Always indicate success to prevent user enumeration
        // The email will only be sent if the account exists
      } catch (error) {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Password reset error:', error);
        }
        // Don't throw - always show success to prevent enumeration
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resendConfirmationEmail = useCallback(
    async (email: string) => {
      try {
        // Use Server Action for resending confirmation
        await resendConfirmationAction(email);
        
        // Always indicate success to prevent enumeration
      } catch (error) {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Resend confirmation email error:', error);
        }
        // Don't throw - always indicate success
      }
    },
    []
  );

  const clearPendingEmail = useCallback(() => {
    setPendingEmail(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        showAuthModal,
        authMode,
        pendingEmail,
        openAuthModal,
        closeAuthModal,
        signIn,
        signUp,
        signOut,
        resetPassword,
        resendConfirmationEmail,
        clearPendingEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
