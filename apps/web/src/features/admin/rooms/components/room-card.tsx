"use client";

import { Calendar, CheckCircle2, Plus, Sparkles, Wrench } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export type RoomStatus = "ready" | "occupied" | "dirty" | "maintenance" | "booked";

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
  onMarkClean: (roomCode: string) => void;
  onFinishMaintenance: (roomCode: string) => void;
}

export function RoomCard({
  room,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenReceipt,
  onOpenSettlement,
  onMarkClean,
  onFinishMaintenance,
}: RoomCardProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";
  const isBooked = room.status === "booked";

  // Warna Strip Atas Status
  const getStatusHeaderStyle = () => {
    if (isReady) return "bg-emerald-500 text-white";
    if (isOccupied) return "bg-blue-600 text-white";
    if (isBooked) return "bg-purple-700 text-white";
    if (isDirty) return "bg-amber-500 text-white";
    if (isMaintenance) return "bg-rose-500 text-white";
    return "bg-slate-500 text-white";
  };

  const getStatusLabel = () => {
    if (isReady) return "TERSEDIA";
    if (isOccupied) return `TERISI (${room.totalNights || 1} MALAM)`;
    if (isBooked) return "BOOKING WA (DP 50%)";
    if (isDirty) return "PERLU BERSIH";
    if (isMaintenance) return "PERBAIKAN";
    return "STATUS";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none group">
      <div>
        {/* 1. Top Colored Status Header Strip (Tanpa Teks Redundan) */}
        <div
          className={`px-3 py-1 text-[9px] font-black tracking-wider uppercase flex items-center justify-between ${getStatusHeaderStyle()}`}
        >
          <span className="flex items-center gap-1.5">
            {isReady && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            {isOccupied && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            {isBooked && <Calendar className="w-2.5 h-2.5 text-purple-200" />}
            {isDirty && <Sparkles className="w-2.5 h-2.5" />}
            {isMaintenance && <Wrench className="w-2.5 h-2.5" />}
            <span>{getStatusLabel()}</span>
          </span>

          <span className="font-bold text-[9px] opacity-90">
            {isReady ? "SIAP PAKAI" : isOccupied ? "AKTIF" : isBooked ? "RESERVASI" : ""}
          </span>
        </div>

        {/* 2. Isi Kartu Clean */}
        <div className="p-3 sm:p-3.5 space-y-2">
          {/* Baris Nomor Kamar, Nama Tipe, & Tarif */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-950 border border-purple-200 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                #{room.code}
              </div>
              <div>
                <h3 className="font-extrabold text-xs text-slate-900 leading-tight">
                  {room.typeName}
                </h3>
                <span className="text-[10px] text-slate-500 font-semibold">
                  Rp {(room.price / 1000).toFixed(0)}rb / malam
                </span>
              </div>
            </div>
          </div>

          {/* Garis Pemisah Halus (Dashed Line) */}
          <div className="border-t border-dashed border-slate-200 my-1" />

          {/* Rincian Operasional Kamar (Jelas & Bebas Redundan) */}
          <div className="min-h-[48px] flex flex-col justify-center">
            {/* JIKA KAMAR TERSEDIA (KOSONG & BERSIH) */}
            {isReady && (
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2 text-center">
                <p className="text-[11px] font-black text-emerald-950 leading-tight">
                  Kamar Bersih &amp; Siap Ditempati
                </p>
                <p className="text-[9px] text-emerald-700 font-semibold mt-0.5">
                  Klik tombol Check-In saat tamu tiba
                </p>
              </div>
            )}

            {/* JIKA KAMAR TERISI */}
            {isOccupied && (
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 space-y-0.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[10px]">Tamu:</span>
                  <strong className="text-slate-900 font-black truncate max-w-[120px]">
                    {room.guestName}
                  </strong>
                </div>
                <div className="flex items-center justify-between pt-0.5 border-t border-slate-200/70 text-[10px]">
                  <span className="text-slate-500">Tagihan:</span>
                  <strong className="text-blue-900 font-black">
                    {room.remainingAmount && room.remainingAmount > 0
                      ? `Sisa Rp ${room.remainingAmount.toLocaleString("id-ID")}`
                      : "Lunas 100% (Rp 0)"}
                  </strong>
                </div>
              </div>
            )}

            {/* JIKA KAMAR TERBOOKING WA */}
            {isBooked && (
              <div className="bg-purple-50/80 border border-purple-200/80 rounded-xl p-2 space-y-0.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-purple-900 font-extrabold text-[11px] truncate">
                    {room.guestName}
                  </span>
                  <span className="text-[9px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                    DP Masuk
                  </span>
                </div>
                <div className="flex items-center justify-between pt-0.5 border-t border-purple-200/60 text-[10px]">
                  <span className="text-slate-500">Sisa Pelunasan:</span>
                  <strong className="text-purple-950 font-black">
                    Rp {room.remainingAmount?.toLocaleString("id-ID") || (room.price / 2).toLocaleString("id-ID")}
                  </strong>
                </div>
              </div>
            )}

            {/* JIKA KAMAR PERLU BERSIH */}
            {isDirty && (
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2 text-center">
                <p className="text-[10px] font-extrabold text-amber-950 leading-tight">
                  Menunggu Housekeeping
                </p>
                <p className="text-[9px] text-amber-800/80 mt-0.5">Ganti sprei &amp; cuci kamar mandi</p>
              </div>
            )}

            {/* JIKA KAMAR SEDANG PERBAIKAN */}
            {isMaintenance && (
              <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-2 text-center">
                <p className="text-[10px] font-extrabold text-rose-950 leading-tight">
                  Sedang Diperbaiki Teknisi
                </p>
                <p className="text-[9px] text-rose-800/80 mt-0.5">Pengecekan fasilitas / servis</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Tombol Aksi Bawah */}
      <div className="p-2.5 sm:p-3 pt-0 border-t border-slate-100 flex items-center justify-between gap-1.5">
        <span className="text-[10px] font-bold text-slate-400">Aksi Staf:</span>

        <div>
          {isReady && (
            <button
              type="button"
              onClick={() => onOpenCheckIn(room)}
              className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] transition-all shadow-2xs cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Check-In</span>
            </button>
          )}

          {isBooked && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onOpenSettlement && onOpenSettlement(room)}
                className="px-3 py-1 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-[11px] transition-all shadow-2xs cursor-pointer flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Pelunasan &amp; Check-In</span>
              </button>
              {room.guestPhone && (
                <a
                  href={`https://wa.me/${room.guestPhone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-emerald-600 transition cursor-pointer shadow-2xs"
                  title="Chat WhatsApp Tamu"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {isOccupied && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onOpenCheckOut(room)}
                className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-[10px] transition cursor-pointer"
              >
                Check-Out
              </button>
              <button
                type="button"
                onClick={() => onOpenReceipt(room)}
                className="p-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-emerald-600 transition cursor-pointer shadow-2xs"
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
              className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[11px] transition-all shadow-2xs cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Bersih</span>
            </button>
          )}

          {isMaintenance && (
            <button
              type="button"
              onClick={() => onFinishMaintenance(room.code)}
              className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] transition-all shadow-2xs cursor-pointer flex items-center gap-1"
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
