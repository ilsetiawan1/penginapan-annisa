"use client";

import {
  Calendar,
  CheckCircle2,
  ExternalLink,
  LogOut,
  Plus,
  Receipt,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export type RoomStatus =
  "ready" | "occupied" | "dirty" | "maintenance" | "booked";

export interface RoomItem {
  code: string; // "A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"
  building: "A" | "B";
  type: "ac" | "kipas";
  typeName: string; // "Kamar Tipe AC" | "Kamar Tipe Kipas"
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
  onOpenSettlement?: (room: RoomItem) => void;
  onOpenDetail?: (room: RoomItem) => void;
  onMarkClean: (roomCode: string) => void;
  onFinishMaintenance: (roomCode: string) => void;
}

export function RoomCard({
  room,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenReceipt,
  onOpenSettlement,
  onOpenDetail,
  onMarkClean,
  onFinishMaintenance,
}: RoomCardProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";
  const isBooked = room.status === "booked";

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-100/90 shadow-2xs hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex flex-col justify-between gap-3.5 group select-none">
      {/* 1. Header Kartu: Nomor Kamar, Nama Tipe & Status Pill Minimalis */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div
            onClick={() => onOpenDetail && onOpenDetail(room)}
            className="flex items-center gap-2.5 cursor-pointer group/title"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-950 border border-purple-200 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs group-hover/title:scale-105 transition-transform">
              #{room.code}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 leading-tight group-hover/title:text-purple-700 transition">
                {room.typeName}
              </h3>
              <span className="text-xs text-purple-700 font-bold">
                Rp {(room.price / 1000).toFixed(0)}.000{" "}
                <span className="text-[10px] text-slate-400 font-normal">
                  / malam
                </span>
              </span>
            </div>
          </div>

          {/* Status Badge Minimalis (Tri-Color dengan Micro Dot) */}
          <div className="shrink-0">
            {isReady && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-extrabold text-purple-900">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Tersedia
              </span>
            )}
            {isOccupied && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-extrabold text-purple-900">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Terisi
              </span>
            )}
            {isBooked && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-[10px] font-black text-purple-950">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
                Booking WA
              </span>
            )}
            {isDirty && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-extrabold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Perlu Bersih
              </span>
            )}
            {isMaintenance && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-extrabold text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Perbaikan
              </span>
            )}
          </div>
        </div>

        {/* 2. Body Lavender Bersih (Informasi Tamu / Kondisi Kamar) */}
        <div
          onClick={() => onOpenDetail && onOpenDetail(room)}
          className="bg-[#faf9fd] rounded-2xl p-3 border border-purple-50/80 cursor-pointer hover:bg-purple-50/40 transition text-xs"
        >
          {isReady && (
            <div className="py-1">
              <p className="font-bold text-slate-800 leading-tight">
                Kamar Bersih &amp; Siap Ditempati
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Kasur besar, kamar mandi dalam, TV &amp; WiFi aktif
              </p>
            </div>
          )}

          {isOccupied && (
            <div className="space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span className="truncate">{room.guestName}</span>
                <span className="text-[11px] text-purple-700">
                  {room.totalNights || 1} Malam
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Check-out maks 12.00 WIT</span>
                <span className="text-emerald-700 font-extrabold">
                  {room.remainingAmount === 0
                    ? "Lunas (Rp 0)"
                    : `Sisa Rp ${(room.remainingAmount || 0).toLocaleString("id-ID")}`}
                </span>
              </div>
            </div>
          )}

          {isBooked && (
            <div className="space-y-1">
              <div className="flex items-center justify-between font-black text-purple-950">
                <span className="truncate">{room.guestName}</span>
                <span className="text-[11px] bg-purple-200/80 px-2 py-0.5 rounded-full">
                  DP 50%
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Landing 14.30 WIT</span>
                <span className="text-purple-800 font-bold">
                  Sisa: Rp {(room.remainingAmount || 0).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          )}

          {isDirty && (
            <div className="py-1">
              <p className="font-bold text-slate-800 leading-tight flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                Menunggu Housekeeping
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Ganti sprei baru, handuk bersih &amp; cuci kamar mandi
              </p>
            </div>
          )}

          {isMaintenance && (
            <div className="py-1">
              <p className="font-bold text-rose-900 leading-tight flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-rose-600" />
                Perbaikan Fasilitas
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Pengecekan teknis AC / listrik kamar
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Action Buttons (Tri-Color Ungu & Lavender Bersih) */}
      <div className="pt-1">
        {isReady && (
          <button
            type="button"
            onClick={() => onOpenCheckIn(room)}
            className="w-full py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Check-In Tamu</span>
          </button>
        )}

        {isOccupied && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenCheckOut(room)}
              className="flex-1 py-2.5 rounded-2xl border border-purple-200 bg-white hover:bg-purple-50 text-purple-950 font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5 text-purple-700" />
              <span>Check-Out</span>
            </button>
            {room.guestPhone && (
              <a
                href={`https://wa.me/${room.guestPhone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                title={`Hubungi Tamu via WhatsApp (${room.guestPhone})`}
                className="w-10 h-10 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200/80 text-purple-800 flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={() => onOpenReceipt(room)}
              title="Cetak Kuitansi"
              className="w-10 h-10 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200/80 text-purple-800 flex items-center justify-center transition cursor-pointer shrink-0"
            >
              <Receipt className="w-4 h-4" />
            </button>
          </div>
        )}

        {isBooked && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenSettlement && onOpenSettlement(room)}
              className="flex-1 py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs transition shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pelunasan &amp; Check-In</span>
            </button>
            {room.guestPhone && (
              <a
                href={`https://wa.me/${room.guestPhone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                title={`Hubungi Tamu via WhatsApp (${room.guestPhone})`}
                className="w-10 h-10 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200/80 text-purple-800 flex items-center justify-center transition cursor-pointer shrink-0"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            )}
          </div>
        )}

        {isDirty && (
          <button
            type="button"
            onClick={() => onMarkClean(room.code)}
            className="w-full py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-purple-700" />
            <span>Selesai Dibersihkan (Siap)</span>
          </button>
        )}

        {isMaintenance && (
          <button
            type="button"
            onClick={() => onFinishMaintenance(room.code)}
            className="w-full py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-purple-700" />
            <span>Selesai Perbaikan (Siap)</span>
          </button>
        )}
      </div>
    </div>
  );
}
