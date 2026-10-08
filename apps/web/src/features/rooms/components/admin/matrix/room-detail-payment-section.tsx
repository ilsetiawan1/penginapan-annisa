"use client";

import { CreditCard } from "lucide-react";
import type { RoomItem } from "./room-card";

interface RoomDetailPaymentSectionProps {
  room: RoomItem;
}

export function RoomDetailPaymentSection({ room }: RoomDetailPaymentSectionProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isBooked = room.status === "booked";

  const total = room.totalAmount || room.price;
  const nights = room.totalNights || 1;
  const roomPrice = room.price || Math.round(total / nights);
  const dp =
    room.dpPaid !== undefined
      ? room.dpPaid
      : isBooked
        ? Math.round(total * 0.5)
        : isOccupied
          ? total
          : 0;
  const remaining =
    room.remainingAmount !== undefined
      ? room.remainingAmount
      : isBooked
        ? Math.max(0, total - dp)
        : 0;

  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2.5 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-slate-400" />
          <span>Rincian Pembayaran</span>
        </span>
      </div>

      <div className="flex items-center justify-between text-slate-600">
        <span>
          Rp {roomPrice.toLocaleString("id-ID")} × {nights} Malam
        </span>
        <span className="font-semibold text-slate-900">Rp {total.toLocaleString("id-ID")}</span>
      </div>

      {isBooked && (
        <>
          <div className="flex items-center justify-between text-slate-600">
            <span>DP Booking WA (50%)</span>
            <span className="font-medium text-emerald-700">- Rp {dp.toLocaleString("id-ID")}</span>
          </div>
          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between font-semibold text-slate-900">
            <span>Sisa Wajib Saat Tiba</span>
            <span className="text-sm font-bold text-slate-900">
              Rp {remaining.toLocaleString("id-ID")}
            </span>
          </div>
        </>
      )}

      {isOccupied && (
        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between font-semibold">
          <span className="text-slate-600">Status Pembayaran</span>
          <span className={remaining > 0 ? "text-amber-700" : "text-emerald-700 font-bold"}>
            {remaining > 0 ? `Sisa Rp ${remaining.toLocaleString("id-ID")}` : "Lunas (Rp 0)"}
          </span>
        </div>
      )}

      {isReady && (
        <div className="pt-1 text-slate-500 text-[11px]">
          <span>
            Tarif Resmi:{" "}
            <strong className="text-slate-700 font-semibold">
              Rp {room.price.toLocaleString("id-ID")} / malam
            </strong>{" "}
            (DP 50% = Rp {(room.price * 0.5).toLocaleString("id-ID")})
          </span>
        </div>
      )}
    </div>
  );
}
