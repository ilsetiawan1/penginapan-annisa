"use client";

import { Bed, Check, Clock, Wind } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { ANNISA_WA_NUMBER } from "../../../../lib/whatsapp";
import { useRooms } from "@/features/rooms/hooks/use-rooms";

type RoomType = "ac" | "kipas";

export function BookingWidget() {
  const [selectedType, setSelectedType] = useState<RoomType>("ac");
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [nights, setNights] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");

  const { data: dbRooms } = useRooms();

  // Harga per malam
  const pricePerNight = selectedType === "ac" ? 275000 : 200000;
  const totalPrice = pricePerNight * nights;
  const dpPrice = Math.round(totalPrice * 0.5);

  const handleBooking = () => {
    const formattedDate = new Date(checkInDate).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const typeName =
      selectedType === "ac" ? "Kamar Tipe AC" : "Kamar Tipe Kipas";

    const waMessage = `*Halo Penginapan Annisa, saya ingin reservasi kamar:*
• Tipe: *${typeName}*
• Tgl Check-In: *${formattedDate}*
• Durasi: *${nights} Malam*
• Nama Pemesan: *${guestName || "-"}*
• No. WhatsApp: *${guestPhone || "-"}*
• Estimasi Total: *Rp ${totalPrice.toLocaleString("id-ID")}*
• DP 50%: *Rp ${dpPrice.toLocaleString("id-ID")}*

Apakah kamar ini tersedia di tanggal tersebut? Terima kasih! 🙏`;

    window.open(
      `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`,
      "_blank",
    );
  };

  // Cek foto kamar dari database backend atau localStorage jika ada foto asli yang diunggah
  const [roomImage, setRoomImage] = useState<string>("");

  useEffect(() => {
    // 1. Cek dari database server jika ada
    if (dbRooms && dbRooms.length > 0) {
      const matchDb = dbRooms.find((r: any) => {
        const isAc =
          r.roomType?.name?.toLowerCase().includes("ac") ||
          r.roomNumber?.startsWith("A");
        const matchesType = selectedType === "ac" ? isAc : !isAc;
        return matchesType && r.imageUrl;
      });

      if (matchDb && (matchDb as any).imageUrl) {
        const dbImg = (matchDb as any).imageUrl;
        if (
          dbImg &&
          !dbImg.includes("/rooms/room-") &&
          !dbImg.startsWith("/images/")
        ) {
          setRoomImage(dbImg);
          return;
        }
      }
    }

    // 2. Cek dari localStorage
    try {
      const saved = localStorage.getItem("annisa_master_rooms_v3");
      if (saved) {
        const masterRooms = JSON.parse(saved);
        if (Array.isArray(masterRooms)) {
          const match = masterRooms.find(
            (r: any) =>
              r.type === selectedType &&
              r.imageUrl &&
              !r.imageUrl.includes("/rooms/room-") &&
              !r.imageUrl.startsWith("/images/"),
          );
          if (match && match.imageUrl) {
            setRoomImage(match.imageUrl);
            return;
          }
        }
      }
      setRoomImage("");
    } catch {
      setRoomImage("");
    }
  }, [selectedType, dbRooms]);


  return (
    <Card className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-xl border border-white/90 shadow-2xl rounded-3xl overflow-hidden p-0">
      {/* 1. Room Image Preview Banner */}
      <div className="relative h-44 sm:h-52 w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 overflow-hidden flex items-center justify-center">
        {roomImage ? (
          <img
            src={roomImage}
            alt="Preview Kamar Penginapan Annisa"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-white/80 p-6 text-center">
            {selectedType === "ac" ? (
              <Wind className="w-10 h-10 stroke-[1.5] text-purple-300" />
            ) : (
              <Bed className="w-10 h-10 stroke-[1.5] text-purple-300" />
            )}
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200/80">
              {selectedType === "ac" ? "Kamar Tipe AC" : "Kamar Tipe Kipas"}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

        {/* Badge Info */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="bg-purple-700 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
            {selectedType === "ac" ? "Paling Populer" : "Paling Hemat"}
          </span>
        </div>


        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-slate-900 text-xs font-black shadow-xs">
          Rp {pricePerNight.toLocaleString("id-ID")}{" "}
          <span className="text-[10px] font-normal text-slate-500">/ mlm</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-black text-base sm:text-lg leading-tight drop-shadow-sm">
            {selectedType === "ac" ? "Kamar Tipe AC" : "Kamar Tipe Kipas"}
          </h3>
          <p className="text-[11px] text-slate-200 font-medium drop-shadow-xs">
            {selectedType === "ac"
              ? "1 Kasur Besar (2–3 Org) • AC Dingin • KM Dalam • TV • WiFi"
              : "1 Kasur Besar (2–3 Org) • Kipas Dinding • KM Dalam • TV • WiFi"}
          </p>
        </div>
      </div>

      {/* 2. Interactive Form Inputs */}
      <div className="p-3.5 sm:p-5 space-y-3">
        {/* Room Type Selector */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSelectedType("ac")}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              selectedType === "ac"
                ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-200"
            }`}
          >
            <div>
              <p className="font-extrabold text-xs">Tipe AC</p>
              <p
                className={`text-[10px] ${selectedType === "ac" ? "text-purple-200" : "text-purple-700 font-bold"}`}
              >
                Rp 275rb/mlm
              </p>
            </div>
            {selectedType === "ac" && (
              <div className="w-5 h-5 rounded-full bg-white text-purple-700 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSelectedType("kipas")}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
              selectedType === "kipas"
                ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-900 border-slate-200"
            }`}
          >
            <div>
              <p className="font-extrabold text-xs">Tipe Kipas</p>
              <p
                className={`text-[10px] ${selectedType === "kipas" ? "text-purple-200" : "text-purple-700 font-bold"}`}
              >
                Rp 200rb/mlm
              </p>
            </div>
            {selectedType === "kipas" && (
              <div className="w-5 h-5 rounded-full bg-white text-purple-700 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </button>
        </div>

        {/* Date & Nights Selector */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 border border-slate-200/90 focus-within:border-purple-600 rounded-2xl p-2 sm:p-2.5 transition">
            <label
              htmlFor="booking-checkin-date"
              className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-0.5"
            >
              TGL CHECK-IN
            </label>
            <input
              id="booking-checkin-date"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-950 outline-none cursor-pointer"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200/90 focus-within:border-purple-600 rounded-2xl p-2 sm:p-2.5 transition">
            <label
              htmlFor="booking-nights-select"
              className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-0.5"
            >
              LAMA MENGINAP
            </label>
            <select
              id="booking-nights-select"
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-950 outline-none cursor-pointer"
            >
              <option value={1}>1 Malam Transit</option>
              <option value={2}>2 Malam</option>
              <option value={3}>3 Malam</option>
              <option value={4}>4 Malam</option>
              <option value={5}>5 Malam</option>
            </select>
          </div>
        </div>

        {/* Guest Name & Phone */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 border border-slate-200/90 focus-within:border-purple-600 rounded-2xl p-2 sm:p-2.5 transition">
            <label
              htmlFor="booking-guest-name"
              className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-0.5"
            >
              NAMA PEMESAN
            </label>
            <input
              id="booking-guest-name"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Contoh: Budi"
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-950 placeholder:text-slate-400 outline-none"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200/90 focus-within:border-purple-600 rounded-2xl p-2 sm:p-2.5 transition">
            <label
              htmlFor="booking-guest-phone"
              className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-0.5"
            >
              NO. WHATSAPP
            </label>
            <input
              id="booking-guest-phone"
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="0812xxxx"
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-950 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* 3. Bottom Price Summary & CTA Button (Flex-Aligned, Zero Cramping) */}
        <div className="pt-2 space-y-2 border-t border-slate-100">
          {/* Baris Rincian Harga & DP (Flex Horizontal Sejajar) */}
          <div className="flex items-center justify-between bg-purple-50/80 border border-purple-100/90 rounded-2xl px-3 py-1.5 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600 font-medium text-[11px]">
                Total ({nights} Malam):
              </span>
              <strong className="text-slate-950 font-black text-xs sm:text-sm">
                Rp {totalPrice.toLocaleString("id-ID")}
              </strong>
            </div>

            <div className="flex items-center gap-1 bg-white/95 border border-purple-200/80 px-2 py-0.5 rounded-lg shadow-2xs">
              <span className="text-purple-700 font-bold text-[10px]">
                DP 50%:
              </span>
              <strong className="text-purple-950 font-black text-[11px]">
                Rp {dpPrice.toLocaleString("id-ID")}
              </strong>
            </div>
          </div>

          {/* Tombol Reservasi Lebar Penuh */}
          <Button
            type="button"
            onClick={handleBooking}
            className="w-full rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm h-11 gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center"
          >
            <span>Lanjut Reservasi (DP 50%)</span>
            <span className="text-xs">➔</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

