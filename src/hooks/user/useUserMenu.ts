import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  User, 
  UserMenuState, 
  UserProfile, 
  UserPreferences 
} from '@/types/user';

// Initial user menu state
const initialState: UserMenuState = {
  isOpen: false,
  user: null,
  isLoading: false,
  error: null,
};

export const useUserMenu = (initialUser?: User | null) => {
  // State management
  const [state, setState] = useState<UserMenuState>({
    ...initialState,
    user: initialUser || null,
  });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Menu toggle handlers
  const openMenu = useCallback(() => {
    setIsDropdownOpen(true);
    setState(prev => ({ ...prev, isOpen: true }));
  }, []);

  const closeMenu = useCallback(() => {
    setIsDropdownOpen(false);
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const toggleMenu = useCallback(() => {
    if (isDropdownOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isDropdownOpen, openMenu, closeMenu]);

  // User actions
  const updateUser = useCallback((user: User | null) => {
    setState(prev => ({ ...prev, user, error: null }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  // Profile update with optimistic updates
  const updateProfile = useCallback(async (
    updates: Partial<UserProfile>,
    apiCall: (updates: Partial<UserProfile>) => Promise<User>
  ) => {
    if (!state.user) return;

    // Optimistic update
    const updatedUser = { ...state.user, ...updates };
    updateUser(updatedUser);
    setLoading(true);

    try {
      const result = await apiCall(updates);
      updateUser(result);
    } catch (error) {
      // Revert optimistic update
      updateUser(state.user);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [state.user, updateUser, setLoading, setError]);

  // Preferences update
  const updatePreferences = useCallback(async (
    updates: Partial<UserPreferences>,
    apiCall: (updates: Partial<UserPreferences>) => Promise<User>
  ) => {
    if (!state.user) return;

    setLoading(true);
    
    try {
      const result = await apiCall(updates);
      updateUser(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update preferences';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [state.user, updateUser, setLoading, setError]);

  // Logout with cleanup
  const logout = useCallback(async (
    apiCall: () => Promise<void>
  ) => {
    setLoading(true);
    
    try {
      await apiCall();
      // Clear user state
      setState(initialState);
      closeMenu();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to logout';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [closeMenu, setLoading, setError]);

  // Auto-close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) {
        closeMenu();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen, closeMenu]);

  // Auto-close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        closeMenu();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isDropdownOpen, closeMenu]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Clear error after timeout
  useEffect(() => {
    if (state.error) {
      timeoutRef.current = setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [state.error, setError]);

  return {
    // State
    user: state.user,
    isOpen: isDropdownOpen,
    isLoading: state.isLoading,
    error: state.error,
    
    // Menu controls
    openMenu,
    closeMenu,
    toggleMenu,
    
    // User management
    updateUser,
    updateProfile,
    updatePreferences,
    logout,
    
    // Utility
    setLoading,
    setError,
    clearError: () => setError(null),
    
    // Computed values
    isLoggedIn: Boolean(state.user),
    userInitials: state.user 
      ? `${state.user.firstName[0]}${state.user.lastName[0]}`.toUpperCase()
      : '',
    displayName: state.user?.fullName || state.user?.email || 'User',
  };
};

// Hook for user session management
export const useUserSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from localStorage/cookies
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Check for stored session
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to initialize user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, []);

  const login = useCallback((userData: User, token: string) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}; 