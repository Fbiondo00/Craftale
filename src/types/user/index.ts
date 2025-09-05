import * as React from 'react';

// User data interfaces
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  preferences: UserPreferences;
  createdAt: string;
  lastLoginAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  company?: string;
  role: UserRole;
  status: UserStatus;
}

// User role and status types
export type UserRole = 'admin' | 'user' | 'moderator' | 'guest';
export type UserStatus = 'online' | 'offline' | 'away' | 'busy';

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  privacy: PrivacyPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  marketing: boolean;
  updates: boolean;
}

export interface PrivacyPreferences {
  profileVisibility: 'public' | 'private' | 'contacts';
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
}

// Component prop types
export interface UserAvatarProps {
  user: Pick<User, 'fullName' | 'avatar'>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  status?: UserStatus;
  className?: string;
  onClick?: () => void;
}

export interface StatusIndicatorProps {
  status: UserStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface UserMenuTriggerProps {
  user: Pick<User, 'fullName' | 'avatar' | 'status'>;
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface UserMenuItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description?: string;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  className?: string;
  children?: React.ReactNode;
}

export interface UserMenuProps {
  user: Pick<User, 'fullName' | 'email' | 'avatar' | 'status'>;
  onAccountClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  className?: string;
}

export interface UserMenuContentProps {
  user: Pick<User, 'fullName' | 'email' | 'avatar'>;
  menuItems: UserMenuItem[];
  className?: string;
}

// Menu item configuration
export interface UserMenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description?: string;
  onClick?: () => void;
  variant?: 'default' | 'danger';
  href?: string;
  separator?: boolean;
}

// User menu state
export interface UserMenuState {
  isOpen: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// User actions
export interface UserActions {
  openAccountSettings: () => void;
  openUserSettings: () => void;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<void>;
}

// API response types
export interface UserApiResponse {
  success: boolean;
  user?: User;
  message?: string;
  error?: string;
}

export interface UserUpdateResponse {
  success: boolean;
  user?: User;
  message?: string;
  errors?: Record<string, string>;
}

// User session data
export interface UserSession {
  user: User;
  token: string;
  refreshToken?: string;
  expiresAt: string;
  permissions: string[];
}

// Component event handlers
export interface UserMenuEventHandlers {
  onMenuOpen: () => void;
  onMenuClose: () => void;
  onAccountClick: () => void;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
  onProfileUpdate: (updates: Partial<UserProfile>) => void;
} 