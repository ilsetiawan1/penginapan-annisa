import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    "primary" | "secondary" | "lavender" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50 active:scale-98 rounded-xl cursor-pointer";

    const variants = {
      primary:
        "bg-purple-600 text-white shadow-md shadow-purple-600/25 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/30",
      secondary: "bg-purple-950 text-white hover:bg-purple-900 shadow-sm",
      lavender:
        "bg-purple-100 text-purple-900 hover:bg-purple-200 border border-purple-200/80 shadow-2xs",
      outline:
        "border border-purple-200/80 bg-white text-purple-900 hover:bg-purple-50/70 hover:border-purple-300 shadow-2xs",
      ghost: "text-purple-900 hover:bg-purple-100/60 hover:text-purple-950",
      danger:
        "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/20",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
      md: "h-10 px-4 text-sm gap-2 rounded-xl",
      lg: "h-12 px-6 text-base gap-2.5 rounded-2xl font-semibold",
      icon: "h-9 w-9 p-0 shrink-0 rounded-xl",
    };

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
