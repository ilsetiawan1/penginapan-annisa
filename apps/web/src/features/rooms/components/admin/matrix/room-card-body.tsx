"use client";

import type { RoomItem } from "./room-card";

interface RoomCardBodyProps {
  room: RoomItem;
  onOpenDetail?: (room: RoomItem) => void;
}

export function RoomCardBody({ room, onOpenDetail }: RoomCardBodyProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";
  const isBooked = room.status === "booked";

  return (
    <div className="mt-3 select-none">
      {/* 1. JIKA KAMAR TERSEDIA / KOSONG */}
      {isReady && (
        <div className="min-h-[76px] p-2.5 rounded-xl bg-slate-50/50 border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400">
          <span>Unit siap menerima tamu</span>
        </div>
      )}

      {/* 2. JIKA KAMAR TERISI TAMU */}
      {isOccupied && (
        <div className="min-h-[76px] p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                {room.guestName || "Tamu In-House"}
              </p>
              <p className="text-[10px] text-slate-400 leading-tight mt-0.5">Tamu Menginap</p>
            </div>
            <span className="text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs shrink-0">
              {room.totalNights || 1} Malam
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-200/60 mt-1">
            <span className="truncate">Checkout: 12.00 WIT</span>
            <span
              className={`font-semibold px-1.5 py-0.5 rounded border shrink-0 ${
                room.remainingAmount === 0
                  ? "text-emerald-700 bg-emerald-50 border-emerald-200/60"
                  : "text-amber-700 bg-amber-50 border-amber-200/60"
              }`}
            >
              {room.remainingAmount === 0
                ? "Lunas"
                : `Sisa Rp ${(room.remainingAmount || 0).toLocaleString("id-ID")}`}
            </span>
          </div>
        </div>
      )}

      {/* 3. JIKA KAMAR TERBOOKING WA */}
      {isBooked && (
        <div className="min-h-[76px] p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                {room.guestName || "Tamu Booking WA"}
              </p>
              <p className="text-[10px] text-amber-700 leading-tight mt-0.5 font-medium">
                DP Masuk 50%
              </p>
            </div>
            <span className="text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs shrink-0">
              {room.totalNights || 1} Malam
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-200/60 mt-1">
            <span className="truncate max-w-[120px]" title={room.notes || "Booking via WA"}>
              {room.notes || "Booking via WA"}
            </span>
            <span className="font-semibold text-slate-900 shrink-0">
              Sisa Rp {(room.remainingAmount || room.price * 0.5).toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      )}

      {/* 4. JIKA KAMAR PERLU BERSIH */}
      {isDirty && (
        <div className="min-h-[76px] p-2.5 rounded-xl bg-amber-50/40 border border-dashed border-amber-200/80 flex items-center justify-center text-xs text-amber-700 font-medium">
          <span>Menunggu pembersihan linen</span>
        </div>
      )}

      {/* 5. JIKA KAMAR PERBAIKAN */}
      {isMaintenance && (
        <div className="min-h-[76px] p-2.5 rounded-xl bg-rose-50/40 border border-dashed border-rose-200/80 flex items-center justify-center text-xs text-rose-700 font-medium">
          <span>Sedang dalam perbaikan teknisi</span>
        </div>
      )}
    </div>
  );
}
