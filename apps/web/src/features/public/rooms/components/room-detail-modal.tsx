"use client";

import {
  Bed,
  Car,
  Check,
  Clock,
  Fan,
  Navigation,
  Tv,
  Wifi,
  Wind,
} from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineShower, MdOutlineWash } from "react-icons/md";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
} from "../../../../components/ui/dialog";
import { ANNISA_WA_NUMBER } from "../../../../lib/whatsapp";
import type { RoomItem } from "./room-card";

interface RoomDetailModalProps {
  room: RoomItem | null;
  isOpen: boolean;
  onClose: () => void;
  checkInDate?: string;
  nights?: number;
}

export function RoomDetailModal({
  room,
  isOpen,
  onClose,
  checkInDate,
  nights = 1,
}: RoomDetailModalProps) {
  if (!room) return null;

  const isAvailable = room.status === "tersedia";
  const numericPrice = Number(room.price.replace(/\./g, ""));
  const totalPrice = numericPrice * nights;
  const dpPrice = Math.round(totalPrice * 0.5);

  const formattedDateStr = checkInDate
    ? new Date(checkInDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Hari Ini";

  const waMessage = `*Halo Penginapan Annisa, saya ingin reservasi kamar:*
• Tipe: *${room.name}*
• Tgl Check-In: *${formattedDateStr}*
• Durasi: *${nights} Malam*
• Estimasi Total: *Rp ${totalPrice.toLocaleString("id-ID")}*
• DP 50%: *Rp ${dpPrice.toLocaleString("id-ID")}*

Apakah kamar ini tersedia di tanggal tersebut? Terima kasih! 🙏`;

  const waUrl = `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[96dvh] sm:max-h-[90vh] overflow-hidden p-0 rounded-3xl border-0 shadow-2xl bg-[#faf9fc] flex flex-col justify-between">
        {/* Header Photo Banner (Compact & Crisp) */}
        <div className="relative h-36 sm:h-52 w-full bg-slate-900 overflow-hidden shrink-0">
          <Image src={room.image} alt={room.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

          {/* Badges Status & Tipe di Foto */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="bg-white/95 backdrop-blur-md text-purple-900 border border-purple-200/80 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm">
              {room.type === "ac" ? "Tipe AC" : "Tipe Kipas"}
            </span>

            {isAvailable ? (
              <span className="bg-emerald-600/95 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-sm flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Tersedia</span>
              </span>
            ) : (
              <span className="bg-slate-700/95 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Terisi</span>
              </span>
            )}
          </div>

          {/* Judul & Harga di Bawah Foto */}
          <div className="absolute bottom-2.5 sm:bottom-3.5 left-3 sm:left-4 right-3 sm:right-4 flex items-end justify-between text-white">
            <div>
              <span className="text-[9px] sm:text-[10px] text-purple-200 font-bold uppercase tracking-wider block leading-none mb-0.5">
                UNIT KAMAR TRANSIT
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-black leading-tight drop-shadow-md">
                {room.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-base sm:text-xl font-black text-purple-300 block leading-tight">
                Rp {numericPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium">
                per malam
              </span>
            </div>
          </div>
        </div>

        {/* Content Body (Strict Non-Scroll Layout on Mobile) */}
        <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3.5">
          {/* Section 1: Fasilitas Kamar (Visual 4-Col Grid Ala Luxury Hotel) */}
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2 px-0.5">
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-800">
                Fasilitas Lengkap Kamar
              </h3>
              <span className="text-[10px] sm:text-[11px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                100% Sesuai Foto
              </span>
            </div>

            {/* 4 Kolom x 2 Baris yang Sangat Padat & Proporsional */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {/* 1. Kasur Besar */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
                  <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                  Kasur Besar
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">
                  Muat 2–3 Tamu
                </span>
              </div>

              {/* 2. Kamar Mandi Dalam */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
                  <MdOutlineShower className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                  KM Dalam
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">
                  Toilet Pribadi
                </span>
              </div>

              {/* 3. Pendingin Ruangan (AC / Kipas) */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
                  {room.type === "ac" ? (
                    <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <Fan className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                  {room.type === "ac" ? "AC Dingin" : "Kipas Sejuk"}
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">
                  Terawat
                </span>
              </div>

              {/* 4. TV Layar Datar */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
                  <Tv className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                  TV Layar Datar
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">
                  Hiburan
                </span>
              </div>

              {/* 5. WiFi Gratis */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
                  <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                  WiFi Kencang
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">
                  Akses Gratis
                </span>
              </div>

              {/* 6. Handuk Bersih */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
                  <MdOutlineWash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                  Handuk Bersih
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">
                  Higienis
                </span>
              </div>

              {/* 7. Parkir */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
                  <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                  Area Parkir
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">
                  Mobil &amp; Motor
                </span>
              </div>

              {/* 8. Jarak Bandara */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                  750m Bandara
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">
                  2–3 Menit
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Ringkasan Ramping Biaya & DP 50% */}
          <div className="bg-purple-50/80 p-2.5 sm:p-3.5 rounded-2xl border border-purple-100 flex items-center justify-between text-left">
            <div>
              <span className="text-[9px] sm:text-[10px] font-black text-purple-800 uppercase tracking-wider block leading-none mb-0.5">
                ESTIMASI BIAYA ({nights} MALAM)
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                Total: Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase block leading-none mb-0.5">
                DP 50% TRANSFER
              </span>
              <strong className="text-xs sm:text-sm md:text-base font-black text-purple-700">
                Rp {dpPrice.toLocaleString("id-ID")}
              </strong>
            </div>
          </div>

          {/* Action Button: Chat WhatsApp Langsung (Sangat Nyaman Tanpa Scroll) */}
          <Button
            asChild
            className="w-full rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm h-10 sm:h-11 gap-2 shadow-md shadow-purple-900/20 hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            <a href={waUrl} target="_blank" rel="noreferrer">
              <FaWhatsapp className="w-4 h-4" />
              <span>Reservasi {room.name} via WhatsApp</span>
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
