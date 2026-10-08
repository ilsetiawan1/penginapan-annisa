"use client";

import { AlertTriangle } from "lucide-react";
import { ROOM_OPTIONS, type RoomOption } from "./advance-booking-types";

interface AdvanceBookingRoomPickerProps {
  selectedRoomCode: string;
  onSelectRoomCode: (code: string) => void;
  isRoomOccupied: (roomCode: string) => boolean;
  isSelectedRoomOccupied: boolean;
  availableRoomsCount: number;
}

export function AdvanceBookingRoomPicker({
  selectedRoomCode,
  onSelectRoomCode,
  isRoomOccupied,
  isSelectedRoomOccupied,
  availableRoomsCount,
}: AdvanceBookingRoomPickerProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-800 block">Pilih Unit Kamar</span>
        <span className="text-[10px] font-semibold text-slate-500">
          {availableRoomsCount} dari 8 kamar tersedia
        </span>
      </div>

      {/* Grid Visual Pills 8 Kamar untuk Quick Selection & Status (Netral Slate) */}
      <div className="grid grid-cols-4 gap-1.5 pt-0.5">
        {ROOM_OPTIONS.map((r: RoomOption) => {
          const occupied = isRoomOccupied(r.code);
          const isSelected = selectedRoomCode === r.code;
          return (
            <button
              key={r.code}
              type="button"
              disabled={occupied}
              onClick={() => onSelectRoomCode(r.code)}
              className={`px-2 py-1.5 rounded-xl text-[10px] font-bold border transition-all text-center flex flex-col items-center justify-center ${
                occupied
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through opacity-60"
                  : isSelected
                    ? "bg-[#3c315b] text-white border-[#3c315b] shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
              }`}
              title={
                occupied
                  ? `Kamar #${r.code} sudah dibooking pada rentang tanggal ini`
                  : `Kamar #${r.code} (${r.building === "A" ? "Gedung A" : "Gedung B"}) — Rp ${r.price.toLocaleString("id-ID")}/malam`
              }
            >
              <span>#{r.code}</span>
              <span className="text-[8px] font-medium">
                {occupied ? "Penuh" : isSelected ? "Dipilih" : "Bebas"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Banner Peringatan jika Kamar yang Dipilih Bentrok */}
      {isSelectedRoomOccupied && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <strong className="font-bold block">Kamar Terpilih Sudah Di-booking</strong>
            <p className="text-[11px] leading-tight text-rose-700 mt-0.5">
              Kamar #{selectedRoomCode} sudah memiliki reservasi aktif di tanggal ini. Silakan klik
              unit kamar bebas di atas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
