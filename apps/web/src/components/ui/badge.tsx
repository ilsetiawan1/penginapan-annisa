import type * as React from "react";
import { cn } from "../../lib/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "lilac" | "purple" | "emerald" | "amber" | "blue" | "slate" | "danger" | "rose";
}

export function Badge({ className, variant = "lilac", ...props }: BadgeProps) {
  const variants = {
    lilac: "bg-brand-50 text-brand-700 border-brand-200 shadow-xs",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
