"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, LogOut, Plus, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { RoomItem } from "./room-card";

interface RoomDetailActionsProps {
  room: RoomItem;
  onClose: () => void;
  onOpenCheckIn: (room: RoomItem) => void;
  onOpenCheckOut: (room: RoomItem) => void;
  onOpenSettlement?: (room: RoomItem) => void;
  onOpenReceipt: (room: RoomItem) => void;
  onMarkClean: (roomCode: string) => void;
  onFinishMaintenance: (roomCode: string) => void;
}

export function RoomDetailActions({
  room,
  onClose,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenSettlement,
  onOpenReceipt,
  onMarkClean,
  onFinishMaintenance,
}: RoomDetailActionsProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";
  const isBooked = room.status === "booked";

  return (
    <div className="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between gap-2 shrink-0">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 h-11 px-5 text-sm font-medium cursor-pointer"
      >
        Tutup
      </Button>

      <div className="flex items-center gap-2">
        {isReady && (
          <Button
            type="button"
            onClick={() => {
              onClose();
              onOpenCheckIn(room);
            }}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold h-9 px-4 gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Check-In Tamu</span>
          </Button>
        )}

        {isBooked && (
          <Button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenSettlement) onOpenSettlement(room);
            }}
            className="bg-[#3c315b] hover:bg-[#2d2445] text-white font-medium rounded-full h-11 px-6 text-sm transition-all shadow-sm cursor-pointer gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Pelunasan &amp; Masuk</span>
          </Button>
        )}

        {isOccupied && (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onClose();
                onOpenReceipt(room);
              }}
              className="rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium h-9 px-3 gap-1 cursor-pointer"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
              <span>Kirim Nota WA</span>
            </Button>

            <Button
              type="button"
              onClick={() => {
                onClose();
                onOpenCheckOut(room);
              }}
              className="rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 text-xs font-semibold h-9 px-4 gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Check-Out</span>
            </Button>
          </>
        )}

        {isDirty && (
          <Button
            type="button"
            onClick={() => {
              onClose();
              onMarkClean(room.code);
            }}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold h-9 px-4 gap-1.5 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selesai Bersih</span>
          </Button>
        )}

        {isMaintenance && (
          <Button
            type="button"
            onClick={() => {
              onClose();
              onFinishMaintenance(room.code);
            }}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold h-9 px-4 gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Selesai Perbaikan</span>
          </Button>
        )}
      </div>
    </div>
  );
}
