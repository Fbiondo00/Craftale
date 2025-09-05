/**
 * ThemeContext.tsx
 * 
 * Session-based theme management with browser preference detection and cross-tab sync.
 * 
 * Theme Priority System:
 * 1. Session theme (user toggle) - Temporary, syncs across tabs, expires after 24h
 * 2. Browser preference (OS setting) - Used when no session theme exists
 * 3. Fallback to light mode - Only if browser preference unavailable
 * 
 * Key Features:
 * - Session-only theme changes (not permanently stored)
 * - Browser preference auto-detection (prefers-color-scheme)
 * - Cross-tab synchronization during session
 * - OS theme change detection with automatic revert
 * - SSR/hydration safe with useRef guard
 * - Accessibility: Reduced motion preference support
 * 
 * How it Works:
 * 1. On load: Checks for session theme → browser preference → fallback
 * 2. User toggle: Saves to temporary session storage, syncs to other tabs
 * 3. OS theme change: Clears session theme, all tabs revert to new OS preference
 * 4. After 24 hours: Session theme expires, reverts to browser preference
 * 
 * Storage Keys:
 * - apty_session_theme: Temporary theme override (JSON with theme, timestamp, isSession flag)
 * - apty_theme: Legacy persistent storage (always cleared on load)
 */

'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { sanitizeThemeValue, SanitizedStorage } from '@/utils/sanitize';

/**
 * Checks if localStorage is available and writable.
 * Handles various browser restrictions (private mode, storage full, etc.)
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    // Check for window and localStorage availability
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Custom hook for theme storage management.
 * Provides sanitized access to localStorage with the 'apty_' prefix.
 * Used only for clearing legacy persistent storage on load.
 */
const useThemeStorage = () => {
  const [hasStorage] = useState(isLocalStorageAvailable());
  const storage = useMemo(() => new SanitizedStorage('apty_'), []);
  
  const getTheme = useCallback((): 'light' | 'dark' | null => {
    if (!hasStorage) return null;
    try {
      const value = storage.getItem('theme');
      return value ? sanitizeThemeValue(value) : null;
    } catch {
      return null;
    }
  }, [hasStorage, storage]);
  
  const setTheme = useCallback((theme: string): void => {
    if (!hasStorage) return;
    const sanitized = sanitizeThemeValue(theme);
    if (sanitized) {
      try {
        storage.setItem('theme', sanitized);
      } catch {
        console.warn('Unable to save theme preference');
      }
    }
  }, [hasStorage, storage]);
  
  const removeTheme = useCallback((): void => {
    if (!hasStorage) return;
    try {
      storage.removeItem('theme');
    } catch {
      console.warn('Unable to remove theme preference');
    }
  }, [hasStorage, storage]);
  
  return { getTheme, setTheme, removeTheme, hasStorage };
};

/**
 * Detects user's reduced motion preference for accessibility.
 * Returns true if user prefers reduced motion animations.
 */
const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Legacy browsers fallback
    else if ((mediaQuery as any).addListener) {
      (mediaQuery as any).addListener(handleChange);
      return () => (mediaQuery as any).removeListener(handleChange);
    }
  }, []);
  
  return prefersReducedMotion;
};

/**
 * Theme context interface providing theme state and controls.
 */
interface ThemeContextType {
  isDarkMode: boolean;              // Current theme state
  toggleTheme: () => void;          // Toggle between light/dark (session-only)
  setTheme: (dark: boolean) => void; // Set specific theme (session-only)
  systemPreference: boolean;         // Current OS theme preference
  hasStorageSupport: boolean;        // Whether localStorage is available
  prefersReducedMotion: boolean;     // Accessibility: reduced motion preference
  isInitialized: boolean;            // Always true after mount
  mounted: boolean;                  // Hydration guard flag
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Determines the initial theme on page load.
 * Priority: Session theme (if < 24h old) → Browser preference → Light mode
 * Also clears any legacy persistent theme storage.
 */
const getInitialTheme = (storage: ReturnType<typeof useThemeStorage>): boolean => {
  try {
    // Step 1: Clear legacy persistent storage (apty_theme)
    const storedTheme = storage.getTheme();
    if (storedTheme) {
      storage.removeTheme();
    }
    
    // Step 2: Check for active session theme
    if (typeof window !== 'undefined') {
      try {
        const sessionData = localStorage.getItem('apty_session_theme');
        if (sessionData) {
          const parsed = JSON.parse(sessionData);
          // Validate session theme (must be recent - within 24 hours)
          if (parsed.isSession && parsed.timestamp && (Date.now() - parsed.timestamp < 86400000)) {
            if (parsed.theme === 'dark') return true;
            if (parsed.theme === 'light') return false;
          } else {
            // Expired session theme - clean up
            localStorage.removeItem('apty_session_theme');
          }
        }
      } catch {
        // Invalid session data - ignore and continue
      }
      
      // Step 3: No valid session theme, use browser preference
      if (window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    
    return false; // Fallback to light mode
  } catch {
    // Error fallback: try browser preference or default to light
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }
};

/**
 * Gets the current browser/OS theme preference.
 * Used to track system preference independently of the active theme.
 */
const getInitialSystemPreference = (): boolean => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

/**
 * Theme Provider Component
 * Manages theme state, browser preference detection, and cross-tab synchronization.
 */
export const ThemeProvider: React.FC<{ 
  children: React.ReactNode;
}> = ({ children }) => {
  const storage = useThemeStorage();
  const prefersReducedMotion = useReducedMotion();
  const hasInitialized = useRef(false); // Prevents double initialization in StrictMode
  
  // Theme state - initialized to false, corrected on mount
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [systemPreference, setSystemPreference] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false); // Hydration guard
  
  /**
   * Initialize theme on mount.
   * Uses useRef to ensure this only runs once, even with React StrictMode.
   */
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    const actualTheme = getInitialTheme(storage);
    const actualSystemPref = getInitialSystemPreference();
    
    setIsDarkMode(actualTheme);
    setSystemPreference(actualSystemPref);
    
    // Apply theme to DOM
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', actualTheme);
    }
    
    // Mark as mounted after theme is set
    setMounted(true);
  }, [storage]);
  
  /**
   * Listen for OS/browser theme preference changes.
   * When OS theme changes, clears session theme so all tabs revert to new preference.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches);
      
      // Clear session theme - this triggers storage event for other tabs
      try {
        localStorage.removeItem('apty_session_theme');
      } catch {
        // Ignore storage errors
      }
      
      // Apply the new system preference to this tab
      const shouldBeDark = e.matches;
      setIsDarkMode(shouldBeDark);
      
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Legacy browsers
    else if ((mediaQuery as any).addListener) {
      (mediaQuery as any).addListener(handleChange);
      return () => (mediaQuery as any).removeListener(handleChange);
    }
  }, [storage]);
  
  /**
   * Cross-tab synchronization via storage events.
   * Listens for theme changes from other tabs and OS preference changes.
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'apty_session_theme') {
        if (e.newValue !== null) {
          // Another tab toggled theme - sync to this tab
          try {
            const sessionData = JSON.parse(e.newValue);
            if (sessionData.isSession && sessionData.theme) {
              const sanitized = sanitizeThemeValue(sessionData.theme);
              if (sanitized) {
                const shouldBeDark = sanitized === 'dark';
                setIsDarkMode(shouldBeDark);
                
                // Update DOM
                if (shouldBeDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              }
            }
          } catch {
            // Invalid data - ignore
          }
        } else {
          // Session theme cleared (OS preference changed) - revert to browser preference
          if (typeof window !== 'undefined' && window.matchMedia) {
            const systemPrefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(systemPrefers);
            setSystemPreference(systemPrefers);
            
            // Update DOM
            if (systemPrefers) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  /**
   * Toggle theme between light and dark.
   * Saves to session storage for cross-tab sync (expires after 24h).
   */
  const toggleTheme = useCallback(() => {
    const newDarkMode = !isDarkMode;
    
    // Update local state
    setIsDarkMode(newDarkMode);
    
    // Update DOM for this tab
    if (typeof window !== 'undefined') {
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save session theme (triggers storage event for other tabs)
      try {
        const sessionData = {
          theme: newDarkMode ? 'dark' : 'light',
          timestamp: Date.now(),
          isSession: true // Marks this as temporary session storage
        };
        localStorage.setItem('apty_session_theme', JSON.stringify(sessionData));
      } catch {
        // Storage unavailable - theme change is local only
      }
    }
  }, [isDarkMode]);
  
  /**
   * Set theme to specific value (light or dark).
   * Saves to session storage for cross-tab sync (expires after 24h).
   */
  const setTheme = useCallback((dark: boolean) => {
    // Update local state
    setIsDarkMode(dark);
    
    // Update DOM for this tab
    if (typeof window !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Save session theme (triggers storage event for other tabs)
      try {
        const sessionData = {
          theme: dark ? 'dark' : 'light',
          timestamp: Date.now(),
          isSession: true // Marks this as temporary session storage
        };
        localStorage.setItem('apty_session_theme', JSON.stringify(sessionData));
      } catch {
        // Storage unavailable - theme change is local only
      }
    }
  }, []);
  
  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isDarkMode,
      toggleTheme,
      setTheme,
      systemPreference,
      hasStorageSupport: storage.hasStorage,
      prefersReducedMotion,
      isInitialized: true, // Always initialized now with synchronous initialization
      mounted,
    }),
    [isDarkMode, toggleTheme, setTheme, systemPreference, storage.hasStorage, prefersReducedMotion, mounted]
  );
  
  return (
    <ThemeContext.Provider value={value}>
      {/* Render children only after mount to prevent hydration mismatch */}
      {!mounted ? null : children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context.
 * Must be used within a ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};