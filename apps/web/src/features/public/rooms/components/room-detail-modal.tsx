"use client";

import {
  Bed,
  Car,
  Check,
  Clock,
  Fan,
  Navigation,
  Sparkles,
  Tag,
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
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="max-w-xl max-h-[92vh] overflow-y-auto p-0 rounded-3xl border-0 shadow-2xl bg-[#faf9fc] no-scrollbar">
        {/* Header Photo Banner */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
          <Image src={room.image} alt={room.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Badges Status & Tipe di Foto */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-white/95 backdrop-blur-md text-purple-900 border border-purple-200/80 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
              {room.type === "ac" ? "Tipe AC" : "Tipe Kipas"}
            </span>

            {isAvailable ? (
              <span className="bg-emerald-600/95 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tersedia</span>
              </span>
            ) : (
              <span className="bg-slate-700/95 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Terisi</span>
              </span>
            )}
          </div>

          {/* Judul & Harga di Atas Foto */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <span className="text-[11px] text-purple-200 font-bold uppercase tracking-wider block">
                UNIT KAMAR TRANSIT
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black leading-tight drop-shadow-md">
                {room.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-black text-purple-300 block leading-tight">
                Rp {numericPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] text-slate-300 font-medium">per malam</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Section 1: Fasilitas Kamar (Visual Icons Ala Luxury Hotel) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Fasilitas Lengkap Kamar
              </h3>
              <span className="text-[11px] text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                100% Sesuai Foto
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* 1. Kasur Besar */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Bed className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                  Kasur Besar
                </span>
                <span className="text-[9px] text-slate-500">Muat 2–3 Tamu</span>
              </div>

              {/* 2. Kamar Mandi Dalam */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <MdOutlineShower className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                  Kamar Mandi Dalam
                </span>
                <span className="text-[9px] text-slate-500">Toilet &amp; Shower Pribadi</span>
              </div>

              {/* 3. Pendingin Ruangan (AC / Kipas) */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  {room.type === "ac" ? <Wind className="w-4 h-4" /> : <Fan className="w-4 h-4" />}
                </div>
                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                  {room.type === "ac" ? "AC Dingin" : "Kipas Dinding"}
                </span>
                <span className="text-[9px] text-slate-500">Sejuk &amp; Terawat</span>
              </div>

              {/* 4. TV Layar Datar */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Tv className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                  TV Layar Datar
                </span>
                <span className="text-[9px] text-slate-500">Siaran Hiburan</span>
              </div>

              {/* 5. WiFi Gratis */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Wifi className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                  WiFi Kencang
                </span>
                <span className="text-[9px] text-slate-500">Akses Gratis</span>
              </div>

              {/* 6. Handuk Bersih */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <MdOutlineWash className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                  Handuk Bersih
                </span>
                <span className="text-[9px] text-slate-500">Higienis &amp; Dicuci</span>
              </div>

              {/* 7. Parkir */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Car className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                  Area Parkir
                </span>
                <span className="text-[9px] text-slate-500">Mobil &amp; Motor</span>
              </div>

              {/* 8. Jarak Bandara */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Navigation className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-900 leading-tight">
                  750m Bandara
                </span>
                <span className="text-[9px] text-slate-500">2–3 Menit Tempuh</span>
              </div>
            </div>
          </div>

          {/* Section 2: Ringkasan Booking & Skema DP 50% */}
          <div className="bg-white p-4 rounded-2xl border border-purple-100 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Tanggal Check-In:</span>
              <span className="font-bold text-slate-900">{formattedDateStr}</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Durasi Menginap:</span>
              <span className="font-bold text-slate-900">{nights} Malam</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Total Biaya Kamar:</span>
              <span className="font-extrabold text-slate-900">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs bg-purple-50 p-2.5 rounded-xl border border-purple-100">
              <div>
                <span className="text-[10px] font-black text-purple-800 uppercase tracking-wider block">
                  DP 50% (KUNCI KAMAR)
                </span>
                <span className="text-[10px] text-slate-500">Pelunasan 50% saat tiba di lokasi</span>
              </div>
              <strong className="text-sm sm:text-base font-black text-purple-700">
                Rp {dpPrice.toLocaleString("id-ID")}
              </strong>
            </div>
          </div>

          {/* Action Button: Chat WhatsApp Langsung */}
          <Button
            asChild
            className="w-full rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm h-12 gap-2 shadow-lg shadow-purple-900/20 hover:shadow-xl transition-all cursor-pointer"
          >
            <a href={waUrl} target="_blank" rel="noreferrer">
              <FaWhatsapp className="w-4.5 h-4.5" />
              <span>Reservasi {room.name} via WhatsApp</span>
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
