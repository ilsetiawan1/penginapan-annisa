"use client";

import { CalendarPlus, RotateCw, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { CreateButton } from "@/components/ui/create-button";

interface RoomMatrixHeaderProps {
  onOpenAdvanceBooking: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function RoomMatrixHeader({
  onOpenAdvanceBooking,
  onRefresh,
  isRefreshing,
}: RoomMatrixHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Status Kamar
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Pantau okupansi harian, kesiapan kamar, dan proses reservasi 8 unit secara terpusat.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <Link
          href="/admin/master-rooms"
          className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200/90 bg-white/80 hover:bg-white text-slate-700 shadow-2xs hover:shadow-xs transition-all whitespace-nowrap"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <span>Atur Tarif</span>
        </Link>

        <CreateButton
          onClick={onOpenAdvanceBooking}
          icon={<CalendarPlus className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
        >
          Tambah Reservasi
        </CreateButton>

        <button
          type="button"
          onClick={onRefresh}
          title="Muat Ulang Data"
          className="p-2 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 text-slate-600 transition-colors shadow-2xs cursor-pointer shrink-0"
        >
          <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-slate-900" : ""}`} />
        </button>
      </div>
    </div>
  );
}
