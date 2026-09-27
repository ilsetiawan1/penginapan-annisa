"use client";

import { Calendar, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-slate-900 tracking-tight leading-tight">
          Status 8 Kamar Transit
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Matriks ketersediaan kamar Bangunan A (Kiri) &amp; Bangunan B (Kanan).
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          onClick={onOpenAdvanceBooking}
          className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs h-10 px-4 gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer shrink-0"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>+ Catat Booking WA</span>
        </Button>

        <button
          type="button"
          onClick={onRefresh}
          title="Refresh Data Kamar"
          className="w-10 h-10 rounded-full border border-purple-100 bg-white hover:bg-purple-50 text-purple-700 flex items-center justify-center transition cursor-pointer shadow-2xs shrink-0"
        >
          <RotateCw
            className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
