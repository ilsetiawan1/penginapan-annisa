import type * as React from "react";
import { cn } from "../../lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "lilac" | "purple" | "lavender" | "amber" | "blue" | "slate" | "danger";
}

export function Badge({ className, variant = "purple", ...props }: BadgeProps) {
  const variants = {
    lilac: "bg-purple-50 text-purple-700 border-purple-200 shadow-2xs",
    purple: "bg-purple-100/90 text-purple-800 border-purple-200 shadow-2xs font-semibold",
    lavender: "bg-purple-50 text-purple-800 border-purple-200/80 font-medium",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    blue: "bg-blue-50 text-blue-800 border-blue-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    danger: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs tracking-wide transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
