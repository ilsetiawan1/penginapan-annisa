"use client";

import { CheckCircle2, Sparkles, Wrench } from "lucide-react";
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
    <div
      onClick={() => onOpenDetail && onOpenDetail(room)}
      className="bg-[#faf9fd] rounded-2xl p-2.5 sm:p-3 border border-purple-50/80 cursor-pointer hover:bg-purple-50/50 transition text-xs select-none"
      title="Klik untuk melihat rincian lengkap"
    >
      {/* JIKA KAMAR TERSEDIA (BERSIH & SIAP DITEMPATI - TANPA FASILITAS PANJANG) */}
      {isReady && (
        <div className="py-0.5">
          <p className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Kamar Bersih &amp; Siap Ditempati</span>
          </p>
        </div>
      )}

      {/* JIKA KAMAR TERISI TAMU */}
      {isOccupied && (
        <div className="space-y-1">
          <div className="flex items-center justify-between font-bold text-slate-900">
            <span className="truncate max-w-[120px]">{room.guestName || "Tamu Terisi"}</span>
            <span className="text-[10px] text-purple-700 bg-purple-100/70 px-1.5 py-0.5 rounded">
              {room.totalNights || 1} Malam
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5 border-t border-purple-100/60">
            <span>Check-out 12.00 WIT</span>
            <span className="text-emerald-700 font-extrabold">
              {room.remainingAmount === 0
                ? "Lunas (Rp 0)"
                : `Sisa Rp ${(room.remainingAmount || 0).toLocaleString("id-ID")}`}
            </span>
          </div>
        </div>
      )}

      {/* JIKA KAMAR TERBOOKING WA */}
      {isBooked && (
        <div className="space-y-1">
          <div className="flex items-center justify-between font-black text-purple-950">
            <span className="truncate max-w-[120px]">{room.guestName || "Tamu Booking"}</span>
            <span className="text-[9px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
              DP Masuk
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5 border-t border-purple-100/60">
            <span className="truncate max-w-[130px]" title={room.notes || "Landing 14.30 WIT"}>
              {room.notes || "Landing 14.30 WIT"}
            </span>
            <span className="text-purple-800 font-bold">
              Sisa Rp {(room.remainingAmount || room.price * 0.5).toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      )}

      {/* JIKA KAMAR PERLU BERSIH */}
      {isDirty && (
        <div className="py-0.5">
          <p className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Menunggu Housekeeping</span>
          </p>
        </div>
      )}

      {/* JIKA KAMAR PERBAIKAN */}
      {isMaintenance && (
        <div className="py-0.5">
          <p className="font-bold text-rose-900 text-xs flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>Perbaikan Fasilitas Kamar</span>
          </p>
        </div>
      )}
    </div>
  );
}
