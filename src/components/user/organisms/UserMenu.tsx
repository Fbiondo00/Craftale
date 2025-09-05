import * as React from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuTrigger, UserMenuItem, UserProfile } from '../molecules';
import { useUserMenu } from '@/hooks/user/useUserMenu';
import { cn } from '@/lib/utils';
import { UserMenuProps, UserMenuItem as UserMenuItemType } from '@/types/user';

// Default menu items configuration
const defaultMenuItems: UserMenuItemType[] = [
  {
    id: 'account',
    icon: User,
    label: 'My Account',
    description: 'Manage your profile and preferences',
    variant: 'default',
  },
  {
    id: 'settings',
    icon: Settings,
    label: 'Settings',
    description: 'Configure your experience',
    variant: 'default',
  },
  {
    id: 'separator',
    icon: () => null,
    label: '',
    separator: true,
  },
  {
    id: 'logout',
    icon: LogOut,
    label: 'Sign Out',
    description: 'Sign out of your account',
    variant: 'danger',
  },
];

export const UserMenu = React.forwardRef<HTMLDivElement, UserMenuProps>(
  ({ 
    user, 
    onAccountClick,
    onSettingsClick,
    onLogoutClick,
    className,
    ...props 
  }, ref) => {
    const {
      isOpen,
      openMenu,
      closeMenu,
      toggleMenu,
    } = useUserMenu();

    const handleMenuItemClick = (itemId: string) => {
      switch (itemId) {
        case 'account':
          onAccountClick?.();
          break;
        case 'settings':
          onSettingsClick?.();
          break;
        case 'logout':
          onLogoutClick?.();
          break;
        default:
          break;
      }
      closeMenu();
    };

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <DropdownMenu open={isOpen} onOpenChange={(open: boolean) => open ? openMenu() : closeMenu()}>
          <DropdownMenuTrigger asChild>
            <div>
              <UserMenuTrigger
                user={user}
                isOpen={isOpen}
                onClick={toggleMenu}
              />
            </div>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent
            className="w-72 p-2 bg-background/95 backdrop-blur-xl border border-brand-tertiary/30/20 shadow-2xl shadow-brand-tertiary/90/10 rounded-2xl"
            align="end"
            sideOffset={8}
          >
            {/* User Profile Header */}
            <div className="mb-2">
              <UserProfile user={user} />
            </div>

            <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-brand-tertiary/30/30 to-transparent dark:via-brand-tertiary/30 my-2" />

            {/* Menu Items */}
            <div className="space-y-1">
              {defaultMenuItems.map((item) => {
                if (item.separator) {
                  return (
                    <DropdownMenuSeparator 
                      key={item.id}
                      className="bg-gradient-to-r from-transparent via-brand-tertiary/30/30 to-transparent dark:via-brand-tertiary/30 my-2" 
                    />
                  );
                }

                return (
                  <UserMenuItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    description={item.description}
                    variant={item.variant}
                    onClick={() => handleMenuItemClick(item.id)}
                  />
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

UserMenu.displayName = 'UserMenu'; 