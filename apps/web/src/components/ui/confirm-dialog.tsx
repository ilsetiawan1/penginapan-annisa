"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AlertTriangle, Info, Loader2, Trash2 } from "lucide-react";
import type * as React from "react";
import { cn } from "../../lib/cn";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "default";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText = "Batal",
  variant = "danger",
  isLoading = false,
  icon,
}: ConfirmDialogProps) {
  // Styling berdasarkan variant
  const variantConfig = {
    danger: {
      iconBg: "bg-red-50 text-red-600 border-red-100/80",
      defaultIcon: <Trash2 className="w-5 h-5 stroke-[2]" />,
      defaultButtonText: "Hapus",
      buttonBg: "bg-red-600 hover:bg-red-700 text-white shadow-xs",
    },
    warning: {
      iconBg: "bg-amber-50 text-amber-600 border-amber-100/80",
      defaultIcon: <AlertTriangle className="w-5 h-5 stroke-[2]" />,
      defaultButtonText: "Lanjutkan",
      buttonBg: "bg-amber-600 hover:bg-amber-700 text-white shadow-xs",
    },
    default: {
      iconBg: "bg-slate-100 text-slate-700 border-slate-200/80",
      defaultIcon: <Info className="w-5 h-5 stroke-[2]" />,
      defaultButtonText: "Konfirmasi",
      buttonBg: "bg-slate-900 hover:bg-slate-800 text-white shadow-xs",
    },
  };

  const config = variantConfig[variant];
  const finalConfirmText = confirmText ?? config.defaultButtonText;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        {/* Backdrop Overlay terpusat */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[9998] bg-slate-950/50 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Modal Container */}
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[9999] w-[calc(100vw-2rem)] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xl duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 space-y-4 outline-none">
          {/* Header: Icon & Judul Inline */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center border shrink-0",
                config.iconBg,
              )}
            >
              {icon ?? config.defaultIcon}
            </div>
            <DialogPrimitive.Title className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {title}
            </DialogPrimitive.Title>
          </div>

          {/* Deskripsi */}
          <DialogPrimitive.Description className="text-xs text-slate-600 leading-relaxed">
            {description}
          </DialogPrimitive.Description>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="border border-slate-200/80 hover:bg-slate-50 text-slate-700 rounded-xl px-4 h-9 text-sm font-medium transition cursor-pointer disabled:opacity-60"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                "rounded-xl px-4 h-9 text-sm font-medium transition cursor-pointer disabled:opacity-60 flex items-center gap-1.5",
                config.buttonBg,
              )}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Memproses..." : finalConfirmText}
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
