import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "../../lib/cn";

export interface CreateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const CreateButton = React.forwardRef<HTMLButtonElement, CreateButtonProps>(
  (
    {
      children,
      className,
      icon = <Plus className="w-3.5 h-3.5 text-slate-300 shrink-0" />,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white",
          "bg-gradient-to-b from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800",
          "border border-slate-700/50 shadow-xs active:scale-95 transition-all duration-150",
          "cursor-pointer disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
          className,
        )}
        {...props}
      >
        {icon}
        {typeof children === "string" ? <span>{children}</span> : children}
      </button>
    );
  },
);

CreateButton.displayName = "CreateButton";
