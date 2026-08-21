"use client";

import { Bed, CheckCircle2, LogOut, Plus, RotateCw, Sparkles, Wind, Wrench } from "lucide-react";
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

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between select-none">
      <div>
        {/* Header Kartu: Badge Nomor Kamar & Status Kamar TRD */}
        <div className="flex items-start justify-between gap-2">
          {/* Avatar / Nomor Kamar (Sesuai PRD/TRD: #A1, #A2, #B1, dst) */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 flex items-center justify-center font-black text-base shrink-0 shadow-2xs">
              #{room.code}
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                Kamar {room.typeName}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Bangunan {room.building} • Kapasitas 2–3 Orang
              </p>
            </div>
          </div>

          {/* Badge Status Resmi TRD (4 Warna: Hijau, Biru, Kuning, Merah) */}
          {isReady && (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Siap Pakai</span>
            </span>
          )}

          {isOccupied && (
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shrink-0">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Terisi</span>
            </span>
          )}

          {isDirty && (
            <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Perlu Bersih</span>
            </span>
          )}

          {isMaintenance && (
            <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shrink-0">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Perbaikan</span>
            </span>
          )}
        </div>

        {/* Informasi Isi / Fasilitas Kamar */}
        <div className="my-4">
          {isReady && (
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-slate-100/90 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                KM Dalam Pribadi
              </span>
              <span className="bg-slate-100/90 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                {room.type === "ac" ? "AC Dingin" : "Kipas Angin"}
              </span>
              <span className="bg-slate-100/90 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                WiFi Kencang
              </span>
            </div>
          )}

          {isOccupied && (
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-3 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 font-extrabold truncate">{room.guestName}</strong>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded-md">
                  {room.totalNights} Malam
                </span>
              </div>
              {room.guestPhone && (
                <p className="text-[11px] text-slate-600">
                  WA: <strong className="text-slate-800">{room.guestPhone}</strong>
                </p>
              )}
              <div className="flex items-center justify-between pt-1 border-t border-blue-100 text-[11px]">
                <span className="text-slate-500">Sisa Pelunasan:</span>
                <strong className="text-blue-900 font-black">
                  Rp {room.remainingAmount?.toLocaleString("id-ID") || 0}
                </strong>
              </div>
            </div>
          )}

          {isDirty && (
            <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-3 text-center space-y-0.5">
              <p className="text-xs font-bold text-slate-900">Tamu Baru Saja Keluar</p>
              <p className="text-[10px] text-slate-500">
                Menunggu housekeeping mengganti sprei &amp; membersihkan kamar mandi
              </p>
            </div>
          )}

          {isMaintenance && (
            <div className="bg-rose-50/60 border border-rose-200/70 rounded-2xl p-3 text-center space-y-0.5">
              <p className="text-xs font-bold text-slate-900">Sedang Dalam Perbaikan</p>
              <p className="text-[10px] text-slate-500">Perbaikan AC / Pipa / Kelistrikan</p>
            </div>
          )}
        </div>
      </div>

      {/* Bagian Bawah: Tarif Sewa di Kiri & Tombol Aksi di Kanan */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-sm sm:text-base font-black text-slate-900 block">
            Rp {(room.price / 1000).toFixed(0)}rb
          </span>
          <span className="text-[10px] text-slate-400 font-medium block">per malam</span>
        </div>

        {/* Tombol Aksi Pill */}
        <div>
          {isReady && (
            <button
              type="button"
              onClick={() => onOpenCheckIn(room)}
              className="px-5 py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Check-In Tamu</span>
            </button>
          )}

          {isOccupied && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onOpenCheckOut(room)}
                className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-xs transition cursor-pointer"
              >
                Check-Out
              </button>
              <button
                type="button"
                onClick={() => onOpenReceipt(room)}
                className="p-2 rounded-2xl border border-purple-200 hover:bg-purple-50 text-purple-700 transition cursor-pointer"
                title="Kirim Nota WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </button>
            </div>
          )}

          {isDirty && (
            <button
              type="button"
              onClick={() => onMarkClean(room.code)}
              className="px-4 py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tandai Bersih</span>
            </button>
          )}

          {isMaintenance && (
            <button
              type="button"
              onClick={() => onFinishMaintenance(room.code)}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Selesai Servis</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
