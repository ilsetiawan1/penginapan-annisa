"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getRoomAvailabilityInquiryUrl, getRoomBookingWhatsAppUrl } from "@/lib/whatsapp";
import { Bed, Check, Clock, Fan, Tag, Tv, Wifi, Wind } from "lucide-react";
import { useState } from "react";
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
  const [imgError, setImgError] = useState(false);

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
    roomName: cleanRoomTitle,
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

  const hasValidImage = Boolean(room.image && room.image.trim() !== "" && !imgError);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[96dvh] sm:max-h-[90vh] overflow-hidden p-0 rounded-3xl border border-[#e9e8ea] shadow-[0px_10px_40px_rgba(226,223,254,0.45)] bg-white flex flex-col justify-between">
        <DialogTitle className="sr-only">{cleanRoomTitle}</DialogTitle>
        <DialogDescription className="sr-only">
          Detail informasi fasilitas dan reservasi {cleanRoomTitle} Penginapan Annisa
        </DialogDescription>

        {/* Header Photo Banner */}
        <div className="relative h-40 sm:h-52 w-full bg-[#1c1c1c] overflow-hidden shrink-0">
          {hasValidImage ? (
            <img
              src={room.image}
              alt={cleanRoomTitle}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#2d2445] flex flex-col items-center justify-center gap-2 text-white/80 p-4">
              <Bed className="w-8 h-8 stroke-[1.5] text-[#e2dffe]" />
              <span className="text-xs font-normal uppercase tracking-wider text-white/70">
                {cleanRoomTitle}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c]/90 via-[#1c1c1c]/40 to-transparent" />

          {/* Badges Status & Tipe di Foto */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 text-[#3c315b] text-xs font-medium border border-[#e9e8ea]">
              <Tag className="w-3 h-3 text-[#3c315b] shrink-0" />
              <span>{room.type === "ac" ? "Tipe AC" : "Tipe Kipas"}</span>
            </div>

            {room.status === "tersedia" && (
              <span className="bg-emerald-50/95 backdrop-blur-md text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-medium shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                <span>Tersedia</span>
              </span>
            )}
            {room.status === "dipesan" && (
              <span className="bg-amber-50/95 backdrop-blur-md text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-medium shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                <span>Dipesan</span>
              </span>
            )}
            {room.status === "terisi" && (
              <span className="bg-rose-50/95 backdrop-blur-md text-rose-600 border border-rose-200 px-3 py-1 rounded-full text-xs font-medium shadow-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Terisi</span>
              </span>
            )}
          </div>

          {/* Judul & Harga di Bawah Foto */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <span className="text-[10px] sm:text-xs text-white/80 font-normal uppercase tracking-wider block mb-0.5">
                UNIT KAMAR TRANSIT
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white leading-tight">
                {cleanRoomTitle}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-lg sm:text-2xl font-normal text-white block leading-tight">
                Rp {numericPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] sm:text-xs text-white/80 font-normal">per malam</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
          {/* Section 1: Fasilitas Kamar */}
          <div>
            <div className="mb-2 px-0.5">
              <h3 className="text-xs font-normal uppercase tracking-wider text-[#1c1c1c]">
                Fasilitas Lengkap Kamar
              </h3>
            </div>

            {/* 6 Kolom Fasilitas */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {/* 1. Kasur Besar */}
              <div className="bg-[#f4f2f4]/60 p-2 sm:p-2.5 rounded-2xl border border-[#e9e8ea] flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#3c315b] flex items-center justify-center mb-1 shadow-2xs">
                  <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] font-medium text-[#1c1c1c] leading-tight">
                  Kasur Besar
                </span>
                <span className="text-[9px] text-[#86848d] hidden sm:block mt-0.5">
                  Muat 2–3 Tamu
                </span>
              </div>

              {/* 2. Kamar Mandi Dalam */}
              <div className="bg-[#f4f2f4]/60 p-2 sm:p-2.5 rounded-2xl border border-[#e9e8ea] flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#3c315b] flex items-center justify-center mb-1 shadow-2xs">
                  <MdOutlineShower className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] font-medium text-[#1c1c1c] leading-tight">
                  KM Dalam
                </span>
                <span className="text-[9px] text-[#86848d] hidden sm:block mt-0.5">
                  Toilet Pribadi
                </span>
              </div>

              {/* 3. Pendingin Ruangan */}
              <div className="bg-[#f4f2f4]/60 p-2 sm:p-2.5 rounded-2xl border border-[#e9e8ea] flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#3c315b] flex items-center justify-center mb-1 shadow-2xs">
                  {room.type === "ac" ? (
                    <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <Fan className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </div>
                <span className="text-[11px] font-medium text-[#1c1c1c] leading-tight">
                  {room.type === "ac" ? "AC Dingin" : "Kipas Sejuk"}
                </span>
                <span className="text-[9px] text-[#86848d] hidden sm:block mt-0.5">Terawat</span>
              </div>

              {/* 4. TV */}
              <div className="bg-[#f4f2f4]/60 p-2 sm:p-2.5 rounded-2xl border border-[#e9e8ea] flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#3c315b] flex items-center justify-center mb-1 shadow-2xs">
                  <Tv className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] font-medium text-[#1c1c1c] leading-tight">TV</span>
                <span className="text-[9px] text-[#86848d] hidden sm:block mt-0.5">Hiburan</span>
              </div>

              {/* 5. WiFi Kencang */}
              <div className="bg-[#f4f2f4]/60 p-2 sm:p-2.5 rounded-2xl border border-[#e9e8ea] flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#3c315b] flex items-center justify-center mb-1 shadow-2xs">
                  <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] font-medium text-[#1c1c1c] leading-tight">
                  WiFi Kencang
                </span>
                <span className="text-[9px] text-[#86848d] hidden sm:block mt-0.5">
                  Akses Gratis
                </span>
              </div>

              {/* 6. Handuk Bersih */}
              <div className="bg-[#f4f2f4]/60 p-2 sm:p-2.5 rounded-2xl border border-[#e9e8ea] flex flex-col items-center text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#3c315b] flex items-center justify-center mb-1 shadow-2xs">
                  <MdOutlineWash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="text-[11px] font-medium text-[#1c1c1c] leading-tight">
                  Handuk Bersih
                </span>
                <span className="text-[9px] text-[#86848d] hidden sm:block mt-0.5">Higienis</span>
              </div>
            </div>
          </div>

          {/* Section 2: Ringkasan Estimasi Biaya & DP 50% */}
          <div className="bg-[#f4f2f4] p-3 sm:p-3.5 rounded-2xl border border-[#e9e8ea] flex items-center justify-between text-left">
            <div>
              <span className="text-[10px] font-normal text-[#86848d] uppercase tracking-wider block leading-none mb-1">
                ESTIMASI BIAYA ({nights} MALAM)
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#1c1c1c]">
                Total: Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-normal text-[#86848d] uppercase tracking-wider block leading-none mb-1">
                DP 50% TRANSFER
              </span>
              <strong className="text-xs sm:text-sm md:text-base font-medium text-[#3c315b]">
                Rp {dpPrice.toLocaleString("id-ID")}
              </strong>
            </div>
          </div>

          {/* Action Button: WhatsApp */}
          {isAvailable ? (
            <Button
              asChild
              className="w-full rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white font-normal text-xs sm:text-sm h-11 gap-2 shadow-[0px_4px_16px_rgba(60,49,91,0.25)] transition-all cursor-pointer shrink-0 active:scale-[0.99]"
            >
              <a href={waUrl} target="_blank" rel="noreferrer">
                <FaWhatsapp className="w-4 h-4 text-emerald-400" />
                <span>Mulai Reservasi</span>
              </a>
            </Button>
          ) : (
            <div className="flex flex-col gap-2 shrink-0">
              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-2 rounded-xl text-center font-normal">
                {room.status === "dipesan"
                  ? `Unit ${cleanRoomTitle} sudah dipesan untuk tanggal yang Anda pilih (${formattedDateStr}).`
                  : `Unit ${cleanRoomTitle} sedang terisi di tanggal yang Anda pilih (${formattedDateStr}).`}
              </div>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-[#e9e8ea] bg-[#f4f2f4] text-[#3c315b] hover:bg-[#e9e8ea] font-normal text-xs sm:text-sm h-11 gap-2 cursor-pointer"
              >
                <a href={waInquiryUrl} target="_blank" rel="noreferrer">
                  <FaWhatsapp className="w-4 h-4 text-emerald-600" />
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
