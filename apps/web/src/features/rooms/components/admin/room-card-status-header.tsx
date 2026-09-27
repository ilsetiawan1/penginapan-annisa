"use client";

import { Calendar, Sparkles, Wrench } from "lucide-react";
import type { RoomItem } from "./room-card";

interface RoomCardStatusHeaderProps {
  room: RoomItem;
  onOpenDetail?: (room: RoomItem) => void;
}

export function RoomCardStatusHeader({ room, onOpenDetail }: RoomCardStatusHeaderProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";
  const isBooked = room.status === "booked";

  // Warna Strip Atas Status Sesuai TRD
  const getStatusHeaderStyle = () => {
    if (isReady) return "bg-emerald-500 text-white";
    if (isOccupied) return "bg-blue-600 text-white";
    if (isBooked) return "bg-purple-700 text-white";
    if (isDirty) return "bg-amber-500 text-white";
    if (isMaintenance) return "bg-rose-500 text-white";
    return "bg-slate-500 text-white";
  };

  return (
    <div
      onClick={() => onOpenDetail && onOpenDetail(room)}
      className={`px-3 py-1 text-[9px] font-black tracking-wider uppercase flex items-center gap-1.5 ${getStatusHeaderStyle()} ${
        onOpenDetail ? "cursor-pointer hover:brightness-95 transition" : ""
      }`}
      title="Klik untuk lihat rincian lengkap kamar"
    >
      {isReady && (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>TERSEDIA</span>
        </>
      )}

      {isOccupied && (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>TERISI</span>
          <span className="text-white/80 font-normal tracking-normal normal-case">
            • {room.totalNights || 1} Malam
          </span>
        </>
      )}

      {isBooked && (
        <>
          <Calendar className="w-2.5 h-2.5 text-purple-200" />
          <span>BOOKING WA</span>
          <span className="text-purple-200/90 font-normal tracking-normal normal-case">
            • DP 50%
          </span>
        </>
      )}

      {isDirty && (
        <>
          <Sparkles className="w-2.5 h-2.5" />
          <span>PERLU BERSIH</span>
        </>
      )}

      {isMaintenance && (
        <>
          <Wrench className="w-2.5 h-2.5" />
          <span>PERBAIKAN</span>
        </>
      )}
    </div>
  );
}
