"use client";

import { CheckCircle2, Plus, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export type RoomStatus = "ready" | "occupied" | "dirty" | "maintenance";

export interface RoomItem {
  code: string; // "A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"
  building: "A" | "B";
  type: "ac" | "kipas";
  typeName: string; // "Tipe AC" | "Tipe Kipas"
  price: number;
  status: RoomStatus;
  guestName?: string;
  guestPhone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  totalNights?: number;
  totalAmount?: number;
  dpPaid?: number;
  remainingAmount?: number;
}

interface RoomCardProps {
  room: RoomItem;
  onOpenCheckIn: (room: RoomItem) => void;
  onOpenCheckOut: (room: RoomItem) => void;
  onOpenReceipt: (room: RoomItem) => void;
  onMarkClean: (roomCode: string) => void;
  onFinishMaintenance: (roomCode: string) => void;
}

export function RoomCard({
  room,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenReceipt,
  onMarkClean,
  onFinishMaintenance,
}: RoomCardProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";

  // Warna Background & Border Menandakan Status Sesuai TRD
  const getCardStyle = () => {
    if (isReady) return "bg-emerald-50/60 border-emerald-200/90 hover:border-emerald-400";
    if (isOccupied) return "bg-blue-50/60 border-blue-200/90 hover:border-blue-400";
    if (isDirty) return "bg-amber-50/60 border-amber-200/90 hover:border-amber-400";
    if (isMaintenance) return "bg-rose-50/60 border-rose-200/90 hover:border-rose-400";
    return "bg-white border-slate-200/90";
  };

  // Warna Kotak Badge Nomor Kamar
  const getNumberBadgeStyle = () => {
    if (isReady) return "bg-emerald-100/90 text-emerald-950 border-emerald-200";
    if (isOccupied) return "bg-blue-100/90 text-blue-950 border-blue-200";
    if (isDirty) return "bg-amber-100/90 text-amber-950 border-amber-200";
    if (isMaintenance) return "bg-rose-100/90 text-rose-950 border-rose-200";
    return "bg-purple-50 text-purple-950 border-purple-200";
  };

  return (
    <div
      className={`rounded-2xl p-3.5 sm:p-4 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between select-none ${getCardStyle()}`}
    >
      <div>
        {/* Header Kartu: Badge Nomor Kamar & Status Kamar TRD */}
        <div className="flex items-center justify-between gap-1.5 mb-2">
          {/* Avatar / Nomor Kamar (#A1, #A2, #B1, dst) */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center font-black text-xs sm:text-sm shrink-0 shadow-2xs ${getNumberBadgeStyle()}`}
            >
              #{room.code}
            </div>
            <div>
              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                {room.typeName}
              </h3>
              <p className="text-[10px] text-slate-500 font-semibold">Bangunan {room.building}</p>
            </div>
          </div>

          {/* Badge Status Resmi TRD (4 Warna: Hijau, Biru, Kuning, Merah) */}
          {isReady && (
            <span className="bg-white text-emerald-800 border border-emerald-300 text-[9px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 shrink-0 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Siap Pakai</span>
            </span>
          )}

          {isOccupied && (
            <span className="bg-white text-blue-800 border border-blue-300 text-[9px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 shrink-0 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>Terisi</span>
            </span>
          )}

          {isDirty && (
            <span className="bg-white text-amber-900 border border-amber-300 text-[9px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 shrink-0 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Perlu Bersih</span>
            </span>
          )}

          {isMaintenance && (
            <span className="bg-white text-rose-800 border border-rose-300 text-[9px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 shrink-0 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Perbaikan</span>
            </span>
          )}
        </div>

        {/* Informasi Isi / Status Dinamis */}
        <div className="my-2 min-h-[58px] flex flex-col justify-center">
          {isReady && (
            <div className="flex flex-wrap gap-1">
              <span className="bg-white/90 border border-emerald-200/80 text-emerald-900 text-[9px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                KM Dalam
              </span>
              <span className="bg-white/90 border border-emerald-200/80 text-emerald-900 text-[9px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                {room.type === "ac" ? "AC Dingin" : "Kipas Angin"}
              </span>
              <span className="bg-white/90 border border-emerald-200/80 text-emerald-900 text-[9px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                WiFi Kencang
              </span>
            </div>
          )}

          {isOccupied && (
            <div className="bg-white/90 border border-blue-200 rounded-xl p-2 space-y-0.5 text-[11px] shadow-2xs">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 font-extrabold truncate text-xs">
                  {room.guestName}
                </strong>
                <span className="text-[9px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.2 rounded">
                  {room.totalNights} Malam
                </span>
              </div>
              <div className="flex items-center justify-between pt-0.5 border-t border-blue-100 text-[10px]">
                <span className="text-slate-500">Sisa Bayar:</span>
                <strong className="text-blue-900 font-black">
                  Rp {room.remainingAmount?.toLocaleString("id-ID") || 0}
                </strong>
              </div>
            </div>
          )}

          {isDirty && (
            <div className="bg-white/90 border border-amber-200 rounded-xl p-2 text-center shadow-2xs">
              <p className="text-[11px] font-extrabold text-slate-900 leading-tight">
                Menunggu Housekeeping
              </p>
              <p className="text-[9px] text-slate-600">Ganti sprei &amp; bersih KM</p>
            </div>
          )}

          {isMaintenance && (
            <div className="bg-white/90 border border-rose-200 rounded-xl p-2 text-center shadow-2xs">
              <p className="text-[11px] font-extrabold text-slate-900 leading-tight">
                Sedang Perbaikan
              </p>
              <p className="text-[9px] text-slate-600">Teknisi AC/Kelistrikan</p>
            </div>
          )}
        </div>
      </div>

      {/* Bagian Bawah: Tarif Sewa di Kiri & Tombol Aksi di Kanan */}
      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-1.5">
        <div>
          <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
            Rp {(room.price / 1000).toFixed(0)}rb
          </span>
          <span className="text-[9px] text-slate-500 font-medium block">/ malam</span>
        </div>

        {/* Tombol Aksi Pill */}
        <div>
          {isReady && (
            <button
              type="button"
              onClick={() => onOpenCheckIn(room)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-[11px] transition-all shadow-xs cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Check-In</span>
            </button>
          )}

          {isOccupied && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onOpenCheckOut(room)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-[10px] transition cursor-pointer"
              >
                Check-Out
              </button>
              <button
                type="button"
                onClick={() => onOpenReceipt(room)}
                className="p-1.5 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-blue-700 transition cursor-pointer shadow-2xs"
                title="Kirim Nota WhatsApp"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {isDirty && (
            <button
              type="button"
              onClick={() => onMarkClean(room.code)}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[11px] transition-all shadow-xs cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Bersih</span>
            </button>
          )}

          {isMaintenance && (
            <button
              type="button"
              onClick={() => onFinishMaintenance(room.code)}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] transition-all shadow-xs cursor-pointer flex items-center gap-1"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Selesai</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
