"use client";

import { CreateButton } from "@/components/ui/create-button";
import { CalendarPlus, RotateCw, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface RoomMatrixHeaderProps {
  onOpenAdvanceBooking: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function RoomMatrixHeader({ onOpenAdvanceBooking }: RoomMatrixHeaderProps) {
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

      <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
        <CreateButton
          onClick={onOpenAdvanceBooking}
          icon={<CalendarPlus className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
        >
          Tambah Reservasi
        </CreateButton>
      </div>
    </div>
  );
}
