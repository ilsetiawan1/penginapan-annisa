"use client";

import {
  Bath,
  Bed,
  Calendar,
  CheckCircle2,
  Coffee,
  Sparkles,
  Tv,
  Wifi,
  Wind,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { RoomItem } from "./room-card";
import { RoomDetailActions } from "./room-detail-actions";
import { RoomDetailGuestSection } from "./room-detail-guest-section";
import { RoomDetailPaymentSection } from "./room-detail-payment-section";

function getFacilityIcon(name: string) {
  const lower = name.toLowerCase();
  if (
    lower.includes("ac") ||
    lower.includes("angin") ||
    lower.includes("kipas") ||
    lower.includes("sejuk")
  ) {
    return Wind;
  }
  if (lower.includes("mandi") || lower.includes("shower") || lower.includes("km")) {
    return Bath;
  }
  if (lower.includes("wifi") || lower.includes("internet")) {
    return Wifi;
  }
  if (lower.includes("tv")) {
    return Tv;
  }
  if (lower.includes("kasur") || lower.includes("bed") || lower.includes("ranjang")) {
    return Bed;
  }
  if (lower.includes("handuk") || lower.includes("sabun") || lower.includes("toiletries")) {
    return Sparkles;
  }
  if (
    lower.includes("air") ||
    lower.includes("mineral") ||
    lower.includes("teh") ||
    lower.includes("kopi")
  ) {
    return Coffee;
  }
  return CheckCircle2;
}

interface RoomDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: RoomItem | null;
  onOpenCheckIn: (room: RoomItem) => void;
  onOpenCheckOut: (room: RoomItem) => void;
  onOpenSettlement?: (room: RoomItem) => void;
  onOpenReceipt: (room: RoomItem) => void;
  onMarkClean: (roomCode: string) => void;
  onFinishMaintenance: (roomCode: string) => void;
}

export function RoomDetailModal({
  isOpen,
  onClose,
  room,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenSettlement,
  onOpenReceipt,
  onMarkClean,
  onFinishMaintenance,
}: RoomDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !room || !mounted) return null;

  const isOccupied = room.status === "occupied";
  const isBooked = room.status === "booked";

  const facilities = room.facilities ?? [];

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Tutup modal"
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-150 cursor-default"
      />

      {/* Modal Dialog */}
      {/* biome-ignore lint/a11y/useSemanticElements: custom portal modal container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-room-title"
        className="relative z-10 bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col justify-between max-h-[90vh]"
      >
        {/* Header Modal - Clean White Background */}
        <div className="bg-white border-b border-slate-100 p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-900 border border-slate-200/80 flex items-center justify-center font-bold text-sm shrink-0">
              #{room.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  Bangunan {room.building}
                </span>
                <span className="text-xs text-slate-500">
                  Rp {room.price.toLocaleString("id-ID")} / malam
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-tight mt-0.5">
                {room.typeName}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-5 space-y-4 text-left overflow-y-auto">
          {/* Status Badge Strip */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <span className="font-medium text-slate-500">Status Operasional:</span>
            {room.status === "ready" && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Tersedia (Siap Huni)</span>
              </span>
            )}
            {isOccupied && (
              <span className="bg-slate-100 text-slate-800 border border-slate-200 font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span>Terisi ({room.totalNights || 1} Malam)</span>
              </span>
            )}
            {isBooked && (
              <span className="bg-amber-50 text-amber-800 border border-amber-200/80 font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Booking WA (DP Masuk)</span>
              </span>
            )}
            {room.status === "dirty" && (
              <span className="bg-amber-50 text-amber-800 border border-amber-200/80 font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Perlu Pembersihan</span>
              </span>
            )}
            {room.status === "maintenance" && (
              <span className="bg-rose-50 text-rose-800 border border-rose-200/80 font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-rose-600" />
                <span>Dalam Perbaikan</span>
              </span>
            )}
          </div>

          {/* Rincian Tamu (Modular) */}
          {(isOccupied || isBooked) && <RoomDetailGuestSection room={room} />}

          {/* Rincian Finansial & Pembayaran (Modular) */}
          <RoomDetailPaymentSection room={room} />

          {/* Fasilitas Kamar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                Fasilitas Kamar
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {room.bedType || (room.type === "ac" ? "1 Queen Bed" : "1 Double Bed")} • Kapasitas{" "}
                {room.capacity || 3} Orang
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {facilities.map((fac) => {
                const Icon = getFacilityIcon(fac);
                return (
                  <span
                    key={fac}
                    className="bg-slate-100 text-slate-700 text-xs font-normal px-2.5 py-1 rounded-lg border border-slate-200/60 flex items-center gap-1.5"
                  >
                    <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{fac}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Tombol Aksi (Modular) */}
        <RoomDetailActions
          room={room}
          onClose={onClose}
          onOpenCheckIn={onOpenCheckIn}
          onOpenCheckOut={onOpenCheckOut}
          onOpenSettlement={onOpenSettlement}
          onOpenReceipt={onOpenReceipt}
          onMarkClean={onMarkClean}
          onFinishMaintenance={onFinishMaintenance}
        />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
