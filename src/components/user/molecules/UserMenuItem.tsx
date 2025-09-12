import * as React from "react";
import { cn } from "@/lib/utils";
import { UserMenuItemProps } from "@/types/user";
import { ChevronDown } from "lucide-react";

const variantStyles = {
  default: {
    container:
      "hover:bg-gradient-to-r hover:from-brand-tertiary/10 hover:to-violet-50 dark:hover:from-purple-950/50 dark:hover:to-violet-950/50",
    iconBg: "bg-gradient-to-br from-brand-tertiary/20 to-violet-100 dark:from-brand-tertiary/50 dark:to-violet-800/50",
    icon: "text-brand-tertiary dark:text-brand-tertiary/60",
    chevron: "group-hover:text-brand-tertiary dark:group-hover:text-brand-tertiary/60",
  },
  danger: {
    container:
      "hover:bg-gradient-to-r hover:from-red-50 hover:to-brand-accent/10 dark:hover:from-red-950/50 dark:hover:to-pink-950/50",
    iconBg: "bg-gradient-to-br from-red-100 to-brand-accent/20 dark:from-red-800/50 dark:to-pink-800/50",
    icon: "text-color-state-error-strong dark:text-red-400",
    chevron: "group-hover:text-color-state-error-strong dark:group-hover:text-red-400",
  },
} as const;

export const UserMenuItem = React.forwardRef<HTMLButtonElement, UserMenuItemProps>(
  ({ icon: Icon, label, description, onClick, variant = "default", className, children, ...props }, ref) => {
    const styles = variantStyles[variant];

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "flex items-center w-full px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group text-left",
          styles.container,
          className,
        )}
        {...props}
      >
        {/* Icon container */}
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-200",
            styles.iconBg,
          )}
        >
          <Icon className={cn("w-5 h-5", styles.icon)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground">{label}</div>
          {description && <div className="text-xs text-muted-foreground truncate">{description}</div>}
          {children}
        </div>

        {/* Chevron arrow */}
        <ChevronDown
          className={cn("w-4 h-4 text-muted-foreground -rotate-90 transition-colors duration-200", styles.chevron)}
        />
      </button>
    );
  },
);

UserMenuItem.displayName = "UserMenuItem";
