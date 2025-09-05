import * as React from 'react';
import { UserAvatar } from '../atoms';
import { cn } from '@/lib/utils';
import type { User } from '@/types/user';

interface UserProfileProps {
  user: Pick<User, 'fullName' | 'email' | 'avatar' | 'status'>;
  className?: string;
}

export const UserProfile = React.forwardRef<HTMLDivElement, UserProfileProps>(
  ({ user, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-4 py-3 bg-gradient-to-br from-brand-tertiary/10/50 to-violet-50/50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-brand-tertiary/20/20 dark:border-brand-tertiary/20',
          className
        )}
        {...props}
      >
        <div className="flex items-center space-x-3">
          <UserAvatar
            user={user}
            size="lg"
            showStatus={true}
            status={user.status}
            className="ring-2 ring-brand-tertiary/30/50 dark:ring-brand-tertiary/50"
          />
          
          <div className="flex-1 min-w-0">
            <div className="text-base font-semibold text-foreground truncate">
              {user.fullName}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

UserProfile.displayName = 'UserProfile'; 