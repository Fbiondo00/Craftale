import * as React from "react";
import { StatusIndicator } from "./StatusIndicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { UserAvatarProps } from "@/types/user";
import { User } from "lucide-react";

const avatarSizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
} as const;

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
} as const;

const statusPositions = {
  sm: "-bottom-0.5 -right-0.5",
  md: "-bottom-1 -right-1",
  lg: "-bottom-1 -right-1",
  xl: "-bottom-1 -right-1",
} as const;

const statusSizeMap = {
  sm: "sm" as const,
  md: "sm" as const,
  lg: "md" as const,
  xl: "lg" as const,
} as const;

export const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
  ({ user, size = "md", showStatus = false, status = "offline", className, onClick, ...props }, ref) => {
    const initials = user.fullName
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex",
          onClick &&
            "cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-tertiary/90 focus:ring-offset-2 rounded-full",
          className,
        )}
        onClick={onClick}
        {...props}
      >
        <Avatar className={cn(avatarSizes[size])}>
          <AvatarImage src={user.avatar} alt={user.fullName} className="object-cover" />
          <AvatarFallback
            className={cn(
              "bg-gradient-to-br from-brand-tertiary/20 to-violet-100 dark:from-brand-tertiary/50 dark:to-violet-800/50 text-brand-tertiary dark:text-brand-tertiary/20 font-semibold border border-brand-tertiary/30/50 dark:border-brand-tertiary/50",
            )}
          >
            {user.avatar ? (
              <span className={cn("text-xs font-semibold", size === "xl" ? "text-lg" : "text-xs")}>{initials}</span>
            ) : (
              <User className={iconSizes[size]} />
            )}
          </AvatarFallback>
        </Avatar>

        {showStatus && status && (
          <StatusIndicator
            status={status}
            size={statusSizeMap[size]}
            className={cn("absolute", statusPositions[size])}
          />
        )}
      </div>
    );
  },
);

UserAvatar.displayName = "UserAvatar";
