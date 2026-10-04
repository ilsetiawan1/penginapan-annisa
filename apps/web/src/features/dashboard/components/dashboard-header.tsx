"use client";

import { RotateCw } from "lucide-react";
import { CreateButton } from "@/components/ui/create-button";

interface DashboardHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  onCheckInClick?: () => void;
}

export function DashboardHeader({ onRefresh, isRefreshing, onCheckInClick }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Dashboard Operasional
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Pantau reservasi, okupansi kamar, dan transaksi kasir harian dalam satu layar.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
        <div className="flex items-center gap-1.5 bg-white border border-gray-200/90 rounded-xl px-3 py-2 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-slate-600">Sistem Aktif (Online)</span>
        </div>

        {onCheckInClick && (
          <CreateButton onClick={onCheckInClick}>
            Check-in Baru
          </CreateButton>
        )}

        <button
          type="button"
          onClick={onRefresh}
          title="Perbarui Data Dashboard"
          aria-label="Refresh Data"
          className="p-2 border border-gray-200/90 rounded-xl bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shadow-2xs shrink-0"
        >
          <RotateCw
            className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-slate-800" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
