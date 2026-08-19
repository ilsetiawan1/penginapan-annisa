import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "../../lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "emerald" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", asChild = false, type = "button", ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 active:scale-98 rounded-xl cursor-pointer";

    const variants = {
      primary:
        "bg-brand-600 text-white shadow-md shadow-brand-600/25 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30",
      secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
      emerald:
        "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-700 hover:shadow-lg",
      outline:
        "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-xs",
      ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/20",
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
