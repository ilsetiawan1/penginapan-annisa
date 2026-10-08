"use client";

import { getDirectWhatsAppUrl } from "@/lib/whatsapp";
import { CheckCircle2, LogOut, MessageCircle, Plus, Sparkles, Wrench } from "lucide-react";
import type { RoomItem } from "./room-card";

interface RoomCardActionsProps {
  room: RoomItem;
  onOpenCheckIn: (room: RoomItem) => void;
  onOpenCheckOut: (room: RoomItem) => void;
  onOpenReceipt: (room: RoomItem) => void;
  onOpenSettlement?: (room: RoomItem) => void;
  onMarkClean: (roomCode: string) => void;
  onFinishMaintenance: (roomCode: string) => void;
}

export function RoomCardActions({
  room,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenReceipt,
  onOpenSettlement,
  onMarkClean,
  onFinishMaintenance,
}: RoomCardActionsProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";
  const isBooked = room.status === "booked";

  return (
    <div className="mt-4 pt-3 border-t border-slate-100 w-full">
      {/* 1. STATUS TERSEDIA */}
      {isReady && (
        <button
          type="button"
          onClick={() => onOpenCheckIn(room)}
          className="w-full h-9 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200/90 font-medium text-xs transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-slate-500" />
          <span>Check-In Tamu</span>
        </button>
      )}

      {/* 2. STATUS TERBOOKING WA */}
      {isBooked && (
        <div className="flex items-center gap-2 w-full">
          <button
            type="button"
            onClick={() => onOpenSettlement?.(room)}
            className="flex-1 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{room.paymentStatus === "paid" ? "Serahkan Kunci" : "Pelunasan & Masuk"}</span>
          </button>
          {room.guestPhone && (
            <a
              href={getDirectWhatsAppUrl(room.guestPhone)}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl border border-slate-200 bg-white/80 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer shadow-2xs flex items-center justify-center shrink-0"
              title="Hubungi WhatsApp Tamu"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </a>
          )}
        </div>
      )}

      {/* 3. STATUS TERISI */}
      {isOccupied && (
        <div className="flex items-center gap-2 w-full">
          <button
            type="button"
            onClick={() => onOpenCheckOut(room)}
            className="flex-1 h-9 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Check-Out</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenReceipt(room)}
            className="w-9 h-9 rounded-xl border border-slate-200 bg-white/80 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer shadow-2xs flex items-center justify-center shrink-0"
            title="Kirim Kwitansi Nota WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      )}

      {/* 4. STATUS PERLU BERSIH */}
      {isDirty && (
        <button
          type="button"
          onClick={() => onMarkClean(room.code)}
          className="w-full h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Selesai Bersih</span>
        </button>
      )}

      {/* 5. STATUS PERBAIKAN */}
      {isMaintenance && (
        <button
          type="button"
          onClick={() => onFinishMaintenance(room.code)}
          className="w-full h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <Wrench className="w-3.5 h-3.5 text-rose-600" />
          <span>Selesai Perbaikan</span>
        </button>
      )}
    </div>
  );
}
