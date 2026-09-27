"use client";

import { Button } from "@/components/ui/button";
import { Calendar, RotateCw } from "lucide-react";

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
    <div className="flex items-center gap-2 shrink-0">
      <Button
        onClick={onOpenAdvanceBooking}
        className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs h-8 px-3 gap-1.5 shadow-2xs cursor-pointer shrink-0"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>+ Catat Booking WA</span>
      </Button>

      <button
        type="button"
        onClick={onRefresh}
        title="Refresh Data Kamar"
        className="w-8 h-8 rounded-xl border border-slate-200/90 bg-white hover:bg-purple-50 text-slate-600 hover:text-purple-700 flex items-center justify-center transition cursor-pointer shadow-2xs shrink-0"
      >
        <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-purple-700" : ""}`} />
      </button>
    </div>
  );
}
