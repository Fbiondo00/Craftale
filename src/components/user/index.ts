// Main user components exports
// Organisms (complete components)
export { UserMenu } from "./organisms";

// Molecules (combinations)
export { UserMenuTrigger, UserMenuItem, UserProfile } from "./molecules";

// Atoms (basic elements)
export { StatusIndicator, UserAvatar } from "./atoms";

// Types
export type {
  User,
  UserProfile as UserProfileType,
  UserStatus,
  UserRole,
  UserPreferences,
  UserMenuProps,
  UserAvatarProps,
  StatusIndicatorProps,
  UserMenuTriggerProps,
  UserMenuItemProps,
  UserMenuItem as UserMenuItemType,
  UserMenuState,
  UserActions,
  UserSession,
} from "@/types/user";

// Hooks
export { useUserMenu, useUserSession } from "@/hooks/user/useUserMenu";
