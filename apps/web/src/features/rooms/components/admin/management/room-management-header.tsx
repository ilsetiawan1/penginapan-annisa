"use client";

import { RotateCcw } from "lucide-react";

interface RoomManagementHeaderProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function RoomManagementHeader({
  onRefresh,
  isRefreshing = false,
}: RoomManagementHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Kelola Kamar &amp; Tarif
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Atur foto Cloudflare R2, tarif sewa per malam, dan kelengkapan fasilitas 8 unit kamar.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={isRefreshing}
        title="Muat ulang data kamar"
        className="h-9 w-9 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors shadow-2xs shrink-0 cursor-pointer disabled:opacity-60"
      >
        <RotateCcw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-slate-900" : ""}`} />
      </button>
    </div>
  );
}
