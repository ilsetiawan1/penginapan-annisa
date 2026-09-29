"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getRoomAvailabilityInquiryUrl, getRoomBookingWhatsAppUrl } from "@/lib/whatsapp";
import { Bed, Check, Clock, Fan, Tag, Tv, Wifi, Wind } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineShower, MdOutlineWash } from "react-icons/md";
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

  const cleanRoomTitle = room.number
    ? `Kamar #${room.number}`
    : room.name.replace(/\s*\([^)]*\)/, "");

  const formattedDateStr = checkInDate
    ? new Date(checkInDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Hari Ini";

  const waUrl = getRoomBookingWhatsAppUrl({
    roomNumber: room.number,
    roomName: room.name,
    price: room.price,
    checkInDate: formattedDateStr,
    nights,
    total: totalPrice.toLocaleString("id-ID"),
    dp: dpPrice.toLocaleString("id-ID"),
  });

  const waInquiryUrl = getRoomAvailabilityInquiryUrl({
    roomName: cleanRoomTitle,
    dateStr: formattedDateStr,
    nights,
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[96dvh] sm:max-h-[90vh] overflow-hidden p-0 rounded-3xl border-0 shadow-2xl bg-[#faf9fc] flex flex-col justify-between">
        {/* Header Photo Banner (Compact & Crisp) */}
        <div className="relative h-36 sm:h-52 w-full bg-slate-900 overflow-hidden shrink-0">
          {room.image ? (
            <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-slate-950 flex flex-col items-center justify-center gap-2 text-purple-300/80 p-4">
              <Bed className="w-8 h-8 stroke-[1.5]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {cleanRoomTitle}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

          {/* Badges Status & Tipe di Foto (Konsisten dengan Image 2: Icon Tag & Text Tipe AC/Kipas Ungu) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 text-purple-700 text-[10px] sm:text-xs font-bold border border-purple-100">
              <Tag className="w-3 h-3 text-purple-600 shrink-0" />
              <span>{room.type === "ac" ? "Tipe AC" : "Tipe Kipas"}</span>
            </div>

            {isAvailable ? (
              <span className="bg-emerald-600/95 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Tersedia</span>
              </span>
            ) : (
              <span className="bg-slate-700/95 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Terisi</span>
              </span>
            )}
          </div>

          {/* Judul & Harga di Bawah Foto (Tanpa duplikasi teks tipe kamar) */}
          <div className="absolute bottom-2.5 sm:bottom-3.5 left-3 sm:left-4 right-3 sm:right-4 flex items-end justify-between text-white">
            <div>
              <span className="text-[9px] sm:text-[10px] text-purple-200 font-bold uppercase tracking-wider block leading-none mb-0.5">
                UNIT KAMAR TRANSIT
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-black leading-tight drop-shadow-md">
                {cleanRoomTitle}
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
          {/* Section 1: Fasilitas Kamar (6 Fasilitas Esensial Bersih & Proporsional) */}
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2 px-0.5">
              <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-800">
                Fasilitas Lengkap Kamar
              </h3>
              <span className="text-[10px] sm:text-[11px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                100% Sesuai Foto
              </span>
            </div>

            {/* 6 Kolom yang Bersih & Seimbang (3 Kolom di Mobile, 6 Kolom di Layar Lebih Lebar) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
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
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">Terawat</span>
              </div>

              {/* 4. TV */}
              <div className="bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-1">
                  <Tv className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 leading-tight">
                  TV
                </span>
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">Hiburan</span>
              </div>

              {/* 5. WiFi Kencang */}
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
                <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">Higienis</span>
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

          {/* Action Button: Chat WhatsApp Langsung (Tanpa Teks Duplicate) */}
          {isAvailable ? (
            <Button
              asChild
              className="w-full rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm h-10 sm:h-11 gap-2 shadow-md shadow-purple-900/20 hover:shadow-lg transition-all cursor-pointer shrink-0"
            >
              <a href={waUrl} target="_blank" rel="noreferrer">
                <FaWhatsapp className="w-4 h-4" />
                <span>Reservasi {cleanRoomTitle} via WhatsApp</span>
              </a>
            </Button>
          ) : (
            <div className="flex flex-col gap-2 shrink-0">
              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-2 rounded-xl text-center font-bold">
                Unit {cleanRoomTitle} sedang terisi di tanggal yang Anda pilih ({formattedDateStr}).
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-2xl border-purple-300 text-purple-700 hover:bg-purple-50 font-bold text-xs sm:text-sm h-10 gap-2 cursor-pointer"
              >
                <a href={waInquiryUrl} target="_blank" rel="noreferrer">
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Tanya Kamar Kosong via WhatsApp</span>
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
