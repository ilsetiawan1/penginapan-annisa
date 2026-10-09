"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formatCleanRoomName, parsePriceToNumber } from "@/lib/string";
import { getRoomAvailabilityInquiryUrl, getRoomBookingWhatsAppUrl } from "@/lib/whatsapp";
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  Clock,
  Fan,
  Minus,
  Plus,
  Tag,
  Tv,
  User,
  Wifi,
  Wind,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineShower, MdOutlineWash } from "react-icons/md";
import { toast } from "sonner";
import type { RoomItem } from "./room-card";

interface RoomDetailModalProps {
  room: RoomItem | null;
  isOpen: boolean;
  onClose: () => void;
  checkInDate?: string;
  nights?: number;
}

const getTodayStr = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getInitialCheckInStr = (propDate?: string) => {
  const today = getTodayStr();
  if (propDate) {
    const d = new Date(propDate);
    if (!Number.isNaN(d.getTime())) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const str = `${year}-${month}-${day}`;
      return str < today ? today : str;
    }
  }
  return today;
};

export function RoomDetailModal({
  room,
  isOpen,
  onClose,
  checkInDate,
  nights = 1,
}: RoomDetailModalProps) {
  const todayStr = getTodayStr();
  const [step, setStep] = useState<1 | 2>(1);
  const [imgError, setImgError] = useState(false);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState<string>(() =>
    getInitialCheckInStr(checkInDate),
  );
  const [durationNights, setDurationNights] = useState<number>(nights || 1);
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Reset form dan alur kembali ke Step 1 setiap kali modal dibuka kembali
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedCheckInDate(getInitialCheckInStr(checkInDate));
      setDurationNights(nights || 1);
      setGuestName("");
      setGuestPhone("");
      setHasSubmitted(false);
      setImgError(false);
    }
  }, [isOpen, checkInDate, nights]);

  if (!room) return null;

  const isAvailable = room.status === "tersedia";
  const numericPrice = parsePriceToNumber(room.price);
  const totalPrice = numericPrice * durationNights;
  const dpPrice = Math.round(totalPrice * 0.5);

  const cleanRoomTitle = room.number ? `Kamar #${room.number}` : formatCleanRoomName(room.name);

  // Kalkulasi tanggal Check-In & Check-Out otomatis secara reaktif
  const [ciYear, ciMonth, ciDay] = (selectedCheckInDate || todayStr).split("-").map(Number);
  const checkInObj = new Date(ciYear, ciMonth - 1, ciDay);
  const checkOutObj = new Date(ciYear, ciMonth - 1, ciDay + durationNights);

  const formattedCheckInStr = checkInObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedCheckOutStr = checkOutObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isFormValid = guestName.trim().length > 0 && guestPhone.trim().length >= 8;

  const waUrl = getRoomBookingWhatsAppUrl({
    roomNumber: room.number,
    roomName: cleanRoomTitle,
    price: room.price,
    checkInDate: formattedCheckInStr,
    checkOutDate: formattedCheckOutStr,
    nights: durationNights,
    total: totalPrice.toLocaleString("id-ID"),
    dp: dpPrice.toLocaleString("id-ID"),
    guestName,
    guestPhone,
  });

  const waInquiryUrl = getRoomAvailabilityInquiryUrl({
    roomName: cleanRoomTitle,
    dateStr: formattedCheckInStr,
    nights: durationNights,
  });

  const handleBookingClick = (e: React.MouseEvent) => {
    if (!isFormValid) {
      e.preventDefault();
      setHasSubmitted(true);
      toast.error("Silakan lengkapi nama dan nomor WhatsApp tamu.");
    }
  };

  const hasValidImage = Boolean(room.image && room.image.trim() !== "" && !imgError);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md sm:max-w-lg max-h-[92dvh] sm:max-h-[90vh] overflow-hidden p-0 rounded-3xl border border-[#e9e8ea] shadow-2xl bg-white flex flex-col">
        <DialogTitle className="sr-only">
          {step === 1 ? cleanRoomTitle : `Reservasi ${cleanRoomTitle}`}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Detail informasi fasilitas dan reservasi {cleanRoomTitle} Penginapan Annisa
        </DialogDescription>

        {/* ========================================================
            STEP 1: EKSPLORASI KAMAR (FOTO LEGA & FASILITAS BERSIH)
            ======================================================== */}
        {step === 1 ? (
          <>
            {/* Header Photo Banner (Tinggi proporsional & estetis) */}
            <div className="relative h-44 sm:h-56 w-full bg-[#1c1c1c] overflow-hidden shrink-0">
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
              <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between text-white">
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
                  <span className="text-[10px] sm:text-xs text-white/80 font-normal">
                    per malam
                  </span>
                </div>
              </div>
            </div>

            {/* Body Step 1 */}
            <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
              {/* Fasilitas Kamar */}
              <div>
                <div className="mb-2.5 px-0.5">
                  <h3 className="text-xs font-normal uppercase tracking-wider text-[#1c1c1c]">
                    Fasilitas Lengkap Kamar
                  </h3>
                </div>

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
                    <span className="text-[9px] text-[#86848d] hidden sm:block mt-0.5">
                      Terawat
                    </span>
                  </div>

                  {/* 4. TV */}
                  <div className="bg-[#f4f2f4]/60 p-2 sm:p-2.5 rounded-2xl border border-[#e9e8ea] flex flex-col items-center text-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#3c315b] flex items-center justify-center mb-1 shadow-2xs">
                      <Tv className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[11px] font-medium text-[#1c1c1c] leading-tight">TV</span>
                    <span className="text-[9px] text-[#86848d] hidden sm:block mt-0.5">
                      Hiburan
                    </span>
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
                    <span className="text-[9px] text-[#86848d] hidden sm:block mt-0.5">
                      Higienis
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Jam Check-In & Lokasi Bandara */}
              <div className="bg-[#f4f2f4]/80 p-3 rounded-2xl border border-[#e9e8ea] flex items-center justify-between text-xs text-[#1c1c1c]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#3c315b]" />
                  <span>Check-In: 14:00 WIT · Check-Out: 12:00 WIT</span>
                </div>
                <span className="text-[11px] text-[#86848d] hidden sm:inline">750m Bandara</span>
              </div>

              {/* Action Button Step 1 */}
              {isAvailable ? (
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white font-normal text-xs sm:text-sm h-11 gap-2 shadow-[0px_4px_16px_rgba(60,49,91,0.25)] transition-all cursor-pointer active:scale-[0.99]"
                >
                  <span>Lanjut Reservasi</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <div className="flex flex-col gap-2 shrink-0">
                  <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-2 rounded-xl text-center font-normal">
                    {room.status === "dipesan"
                      ? `Unit ${cleanRoomTitle} sudah dipesan untuk tanggal yang Anda pilih (${formattedCheckInStr}).`
                      : `Unit ${cleanRoomTitle} sedang terisi di tanggal yang Anda pilih (${formattedCheckInStr}).`}
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
          </>
        ) : (
          /* ========================================================
             STEP 2: KONFIRMASI DATA TAMU & HUBUNGI WHATSAPP
             ======================================================== */
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between overflow-y-auto space-y-3.5">
            {/* Header Visual Bar Bersih (Pola Header Souvenir) */}
            <div className="text-[#1c1c1c] pr-8 relative overflow-hidden shrink-0 pb-3 border-b border-zinc-100">
              {/* Baris navigasi: Tombol Kembali & Badge Langkah 2/2 */}
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-800 transition-colors py-0.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>

                <span className="bg-purple-50 text-purple-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-purple-100">
                  Langkah 2/2
                </span>
              </div>

              {/* Thumbnail Foto Kamar & Judul/Tarif */}
              <div className="relative z-10 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-200 shrink-0 bg-[#f4f2f4] shadow-2xs">
                  {hasValidImage ? (
                    <img
                      src={room.image}
                      alt={cleanRoomTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#2d2445] flex items-center justify-center text-white/80">
                      <Bed className="w-5 h-5 text-[#e2dffe]" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-zinc-400 text-[10px] font-medium uppercase tracking-wider mb-0.5">
                    <Tag className="w-2.5 h-2.5 text-zinc-400" />
                    <span>Unit Transit {room.type === "ac" ? "AC" : "Kipas"}</span>
                  </div>
                  <h2 className="text-sm sm:text-base font-semibold text-zinc-900 leading-tight line-clamp-1">
                    {cleanRoomTitle} ({room.type === "ac" ? "AC" : "Kipas"})
                  </h2>
                  <span className="text-xs sm:text-sm font-semibold text-[#3c315b] tracking-tight mt-0.5 block">
                    Rp {numericPrice.toLocaleString("id-ID")}{" "}
                    <span className="text-[10px] text-zinc-400 font-normal">/ malam</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 1. CARD JADWAL & DURASI MENGINAP */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm space-y-3">
              <h3 className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3c315b]" />
                <span>JADWAL TRANSIT &amp; DURASI</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 items-end">
                {/* Kolom 1: Input Tgl Check-In */}
                <div>
                  <label
                    htmlFor="step2-checkin-date"
                    className="text-[10px] font-normal text-zinc-500 block mb-1"
                  >
                    Tgl Check-In <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="step2-checkin-date"
                    type="date"
                    aria-label="Tanggal Check-In"
                    min={todayStr}
                    value={selectedCheckInDate}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && val < todayStr) {
                        setSelectedCheckInDate(todayStr);
                        toast.error("Tanggal check-in tidak boleh sebelum hari ini.");
                      } else {
                        setSelectedCheckInDate(val);
                      }
                    }}
                    className="w-full h-10 rounded-xl border border-zinc-200 py-2.5 px-3 text-xs font-medium text-zinc-700 bg-white shadow-2xs outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition cursor-pointer"
                  />
                </div>

                {/* Kolom 2: Stepper Durasi Malam */}
                <div>
                  <span className="text-[10px] font-normal text-zinc-500 block mb-1">
                    Durasi Malam <span className="text-rose-500">*</span>
                  </span>
                  <div className="flex items-center justify-between bg-zinc-50/50 backdrop-blur-xs border border-zinc-200 rounded-xl px-1.5 h-10 shadow-2xs">
                    <button
                      type="button"
                      aria-label="Kurangi durasi menginap"
                      onClick={() => setDurationNights((prev) => Math.max(1, prev - 1))}
                      disabled={durationNights <= 1}
                      className="w-7 h-7 rounded-lg bg-white/70 hover:bg-white text-zinc-600 flex items-center justify-center text-xs disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-2xs border border-zinc-200/80 backdrop-blur-md active:scale-95"
                    >
                      <Minus className="w-3 h-3 text-zinc-500" />
                    </button>

                    <span className="text-xs font-medium text-zinc-700 select-none px-1">
                      {durationNights} Malam
                    </span>

                    <button
                      type="button"
                      aria-label="Tambah durasi menginap"
                      onClick={() => setDurationNights((prev) => Math.min(14, prev + 1))}
                      disabled={durationNights >= 14}
                      className="w-7 h-7 rounded-lg bg-white/70 hover:bg-white text-zinc-800 flex items-center justify-center text-xs disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-2xs border border-zinc-200/80 backdrop-blur-md active:scale-95"
                    >
                      <Plus className="w-3 h-3 text-zinc-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Teks mikro badge/notifikasi abu-abu tipis */}
              <div className="bg-zinc-50/80 px-3 py-2 rounded-xl border border-zinc-200/70 flex items-start gap-2 text-left">
                <Clock className="w-3.5 h-3.5 text-[#3c315b] shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-500 font-normal leading-relaxed">
                  Check-out otomatis:{" "}
                  <strong className="text-zinc-800 font-semibold">{formattedCheckOutStr}</strong>
                  <br />
                  <span className="text-zinc-400 text-[10px]">(maks 12:00 WIT)</span>
                </p>
              </div>
            </div>

            {/* 2. CARD IDENTITAS TAMU MENGINAP */}
            <div className="bg-zinc-50/70 border border-zinc-200/80 rounded-2xl p-4 space-y-3">
              <h3 className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#3c315b]" />
                <span>IDENTITAS TAMU MENGINAP</span>
              </h3>

              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label
                    htmlFor="guest-name-step2"
                    className="text-[10px] font-normal text-zinc-500 block mb-1 truncate"
                  >
                    Nama Tamu <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="guest-name-step2"
                    type="text"
                    aria-label="Nama Tamu"
                    placeholder="Nama Pemesan"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className={`w-full h-10 bg-white border rounded-xl px-3 py-2 text-xs font-normal text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 ${
                      hasSubmitted && !guestName.trim()
                        ? "border-rose-400 ring-2 ring-rose-400/20"
                        : "border-zinc-200"
                    }`}
                  />
                  {hasSubmitted && !guestName.trim() && (
                    <span className="text-[10px] text-rose-500 mt-1 block">Wajib diisi</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="guest-phone-step2"
                    className="text-[10px] font-normal text-zinc-500 block mb-1 truncate"
                  >
                    No. WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="guest-phone-step2"
                    type="tel"
                    aria-label="Nomor WhatsApp Tamu"
                    placeholder="081234567890"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value.replace(/\D/g, ""))}
                    className={`w-full h-10 bg-white border rounded-xl px-3 py-2 text-xs font-normal text-zinc-800 placeholder:text-zinc-400 outline-none transition focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 ${
                      hasSubmitted && (!guestPhone.trim() || guestPhone.length < 8)
                        ? "border-rose-400 ring-2 ring-rose-400/20"
                        : "border-zinc-200"
                    }`}
                  />
                  {hasSubmitted && (!guestPhone.trim() || guestPhone.length < 8) && (
                    <span className="text-[10px] text-rose-500 mt-1 block">Min. 8 digit</span>
                  )}
                </div>
              </div>
            </div>

            {/* 3. RINCIAN TAGIHAN & AKSI CTA */}
            <div className="pt-1 space-y-3">
              <div className="flex items-center justify-between px-1 text-left">
                <div>
                  <span className="text-[11px] sm:text-xs text-zinc-500 font-normal block leading-tight">
                    Total Tagihan ({durationNights} malam)
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-zinc-900 tracking-tight">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] sm:text-xs text-zinc-500 font-normal block leading-tight">
                    DP 50% Transfer
                  </span>
                  <strong className="text-sm sm:text-base font-bold text-[#3c315b] tracking-tight">
                    Rp {dpPrice.toLocaleString("id-ID")}
                  </strong>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm text-xs sm:text-sm h-11 sm:h-12 transition-all active:scale-95 cursor-pointer"
              >
                <a href={waUrl} target="_blank" rel="noreferrer" onClick={handleBookingClick}>
                  <FaWhatsapp className="w-4 h-4 text-white shrink-0" />
                  <span>Hubungi via WhatsApp</span>
                </a>
              </Button>

              <p className="text-[11px] text-zinc-400 text-center leading-tight">
                Melanjutkan ke WhatsApp berarti menyetujui{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="underline hover:text-zinc-600 transition-colors"
                >
                  Syarat &amp; Ketentuan
                </Link>{" "}
                kami.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
