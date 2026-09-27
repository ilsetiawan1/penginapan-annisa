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

  return (
    <div
      onClick={() => onOpenDetail && onOpenDetail(room)}
      className="space-y-2 cursor-pointer group/header select-none"
      title="Klik untuk melihat detail kamar"
    >
      {/* ====================================================
          BARIS 1: BADGE NOMOR KAMAR (KIRI) & STATUS KAMAR (KANAN)
          Flex items-center justify-between mencegah teks tertekan
          ==================================================== */}
      <div className="flex items-center justify-between gap-2">
        {/* Badge Nomor Kamar */}
        <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-950 border border-purple-200 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs group-hover/header:scale-105 group-hover/header:border-purple-400 transition-all">
          #{room.code}
        </div>

        {/* Status Badge Minimalis */}
        <div className="shrink-0">
          {isReady && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-extrabold text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Tersedia
            </span>
          )}
          {isOccupied && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-extrabold text-blue-900">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Terisi
            </span>
          )}
          {isBooked && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100/90 border border-purple-200 text-[10px] font-black text-purple-950">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
              Booking WA
            </span>
          )}
          {isDirty && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-extrabold text-amber-900">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Perlu Bersih
            </span>
          )}
          {isMaintenance && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[10px] font-extrabold text-rose-800">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Perbaikan
            </span>
          )}
        </div>
      </div>

      {/* ====================================================
          BARIS 2: NAMA TIPE KAMAR & TARIF (LEBAR PENUH)
          Memanfaatkan ruang horizontal penuh sehingga tidak wrap di tablet
          ==================================================== */}
      <div>
        <h3 className="font-extrabold text-sm text-slate-900 leading-snug group-hover/header:text-purple-700 transition">
          {room.typeName}
        </h3>
        <p className="text-xs text-purple-700 font-bold mt-0.5">
          Rp {room.price.toLocaleString("id-ID")}{" "}
          <span className="text-[10px] text-slate-400 font-normal">/ malam</span>
        </p>
      </div>
    </div>
  );
}
