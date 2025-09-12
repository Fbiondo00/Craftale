import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-apty-md text-sm font-medium apty-transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-apty-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-apty-primary text-apty-text-on-brand shadow-apty-md hover:bg-apty-primary-hover",
        destructive: "bg-apty-error text-apty-text-on-brand shadow-sm hover:bg-apty-error/90",
        outline:
          "border border-apty-border-default bg-apty-bg-base shadow-sm hover:bg-apty-bg-hover hover:text-apty-text-primary",
        secondary: "bg-apty-secondary text-apty-text-on-brand shadow-sm hover:bg-apty-secondary-hover",
        ghost: "hover:bg-apty-bg-hover hover:text-apty-text-primary",
        link: "text-apty-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
