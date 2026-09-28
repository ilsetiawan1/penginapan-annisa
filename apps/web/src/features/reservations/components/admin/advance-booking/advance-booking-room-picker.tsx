"use client";

import { AlertTriangle } from "lucide-react";
import { ROOM_OPTIONS, RoomOption } from "./advance-booking-types";

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
        <label
          htmlFor="adv-room"
          className="text-[10px] font-black text-slate-700 uppercase tracking-wider block"
        >
          Pilih Unit Kamar yang Dipesan
        </label>
        <span className="text-[10px] font-bold text-slate-500">
          {availableRoomsCount} dari 8 kamar tersedia
        </span>
      </div>

      {/* Dropdown Kamar dengan Kondisi Disabled Abu-Abu */}
      <select
        id="adv-room"
        value={selectedRoomCode}
        onChange={(e) => onSelectRoomCode(e.target.value)}
        className={`w-full border-2 rounded-xl px-3 py-1.5 text-xs font-bold outline-none cursor-pointer transition ${
          isSelectedRoomOccupied
            ? "border-rose-400 bg-rose-50/50 text-rose-800"
            : "border-slate-200 focus:border-purple-600 bg-slate-50 text-slate-900"
        }`}
      >
        {ROOM_OPTIONS.map((r: RoomOption) => {
          const occupied = isRoomOccupied(r.code);
          return (
            <option
              key={r.code}
              value={r.code}
              disabled={occupied}
              className={
                occupied
                  ? "text-slate-400 bg-slate-100 font-normal italic"
                  : "text-slate-900 font-bold"
              }
            >
              {occupied
                ? `[SUDAH DIBOOKING] Kamar ${r.code} (${r.building === "A" ? "Gedung A" : "Gedung B"} • ${r.code.startsWith("A1") || r.code.startsWith("A2") || r.code.startsWith("B1") || r.code.startsWith("B2") ? "AC" : "Kipas"})`
                : `✓ ${r.name} — Rp ${r.price.toLocaleString("id-ID")}/malam [Tersedia]`}
            </option>
          );
        })}
      </select>

      {/* Grid Visual Pills 8 Kamar untuk Quick Selection & Status */}
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
              className={`px-2 py-1 rounded-xl text-[10px] font-black border transition-all text-center flex flex-col items-center justify-center ${
                occupied
                  ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through opacity-60"
                  : isSelected
                    ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 cursor-pointer"
              }`}
              title={
                occupied
                  ? `Kamar #${r.code} sudah dibooking pada rentang tanggal ini`
                  : `Kamar #${r.code} tersedia untuk dibooking`
              }
            >
              <span>#{r.code}</span>
              <span className="text-[8px] font-bold">
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
            <strong className="font-black block">Kamar Terpilih Sudah Di-booking</strong>
            <p className="text-[11px] leading-tight text-rose-700 mt-0.5">
              Kamar #{selectedRoomCode} sudah memiliki reservasi aktif di tanggal ini.
              Silakan klik unit kamar bebas (berwarna hijau) di atas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
