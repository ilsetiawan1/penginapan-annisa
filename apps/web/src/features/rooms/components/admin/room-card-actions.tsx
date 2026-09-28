"use client";

import { CheckCircle2, LogOut, Plus, Receipt, Sparkles, Wrench } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
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
    <div className="pt-0.5 w-full">
      {/* 1. STATUS TERSEDIA */}
      {isReady && (
        <button
          type="button"
          onClick={() => onOpenCheckIn(room)}
          className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Check-In Tamu</span>
        </button>
      )}

      {/* 2. STATUS TERBOOKING WA */}
      {isBooked && (
        <div className="grid grid-cols-12 gap-1.5 w-full">
          {room.paymentStatus === "paid" ? (
            // Sudah lunas 100% — langsung serahkan kunci, tanpa form pelunasan
            <button
              type="button"
              onClick={() => onOpenSettlement && onOpenSettlement(room)}
              className="col-span-9 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Serahkan Kunci</span>
            </button>
          ) : (
            // Masih ada sisa pembayaran — perlu pelunasan dulu
            <button
              type="button"
              onClick={() => onOpenSettlement && onOpenSettlement(room)}
              className="col-span-9 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-[11px] transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pelunasan &amp; Masuk</span>
            </button>
          )}
          {room.guestPhone ? (
            <a
              href={`https://wa.me/${room.guestPhone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="col-span-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition cursor-pointer shadow-2xs flex items-center justify-center"
              title="Chat WhatsApp Tamu"
            >
              <FaWhatsapp className="w-4 h-4" />
            </a>
          ) : (
            <div className="col-span-3" />
          )}
        </div>
      )}

      {/* 3. STATUS TERISI */}
      {isOccupied && (
        <div className="grid grid-cols-12 gap-1.5 w-full">
          <button
            type="button"
            onClick={() => onOpenCheckOut(room)}
            className="col-span-9 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] transition shadow-sm cursor-pointer flex items-center justify-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Check-Out</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenReceipt(room)}
            className="col-span-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition cursor-pointer shadow-2xs flex items-center justify-center"
            title="Kirim Kwitansi Nota WhatsApp"
          >
            <FaWhatsapp className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4. STATUS PERLU BERSIH */}
      {isDirty && (
        <button
          type="button"
          onClick={() => onMarkClean(room.code)}
          className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Selesai Bersih</span>
        </button>
      )}

      {/* 5. STATUS PERBAIKAN */}
      {isMaintenance && (
        <button
          type="button"
          onClick={() => onFinishMaintenance(room.code)}
          className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Selesai Perbaikan</span>
        </button>
      )}
    </div>
  );
}
