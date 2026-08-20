"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Phone, Sparkles } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { getRoomBookingWhatsAppUrl } from "../../../../lib/whatsapp";

interface RoomOption {
  id: string;
  name: string;
  price: number;
  dp: number;
  features: string;
  image: string;
}

const ROOM_OPTIONS: RoomOption[] = [
  {
    id: "ac",
    name: "Tipe AC",
    price: 275000,
    dp: 137500,
    features: "1 Kasur Besar (2–3 Org) • AC • KM Dalam • TV • WiFi",
    image: "/rooms/room-ac-101.jpg",
  },
  {
    id: "kipas",
    name: "Tipe Kipas",
    price: 200000,
    dp: 100000,
    features: "1 Kasur Besar (2–3 Org) • Kipas • KM Dalam • TV • WiFi",
    image: "/rooms/room-kipas-201.jpg",
  },
];

export function BookingWidget() {
  const [selectedRoom, setSelectedRoom] = useState<string>("ac");
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [nights, setNights] = useState<number>(1);

  const currentRoom = ROOM_OPTIONS.find((r) => r.id === selectedRoom) || ROOM_OPTIONS[0];
  const totalPrice = currentRoom.price * nights;
  const dpPrice = currentRoom.dp * nights;

  const handleBooking = () => {
    const url = getRoomBookingWhatsAppUrl({
      roomName: currentRoom.name,
      price: currentRoom.price.toLocaleString("id-ID"),
      checkInDate: checkInDate || "Segera",
      nights: nights,
      total: totalPrice.toLocaleString("id-ID"),
      dp: dpPrice.toLocaleString("id-ID"),
    });
    window.open(url, "_blank");
  };

  return (
    <Card className="p-4 sm:p-5 md:p-6 bg-white/95 backdrop-blur-xl border border-purple-200/90 shadow-xl rounded-3xl text-left relative overflow-hidden">
      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kalkulator Reservasi Mandiri</span>
        </div>
        <span className="text-[10px] bg-purple-100 text-purple-800 font-extrabold px-2 py-0.5 rounded-full">
          DP 50%
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight mb-3">
        Cek Ketersediaan &amp; Estimasi Biaya
      </h3>

      {/* Select Room Type Pills */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {ROOM_OPTIONS.map((room) => {
          const isSelected = selectedRoom === room.id;
          return (
            <button
              key={room.id}
              type="button"
              onClick={() => setSelectedRoom(room.id)}
              className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? "border-purple-600 bg-purple-50/70 shadow-xs"
                  : "border-slate-200 hover:border-purple-300 bg-white/80"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-xs text-slate-900">{room.name}</span>
                <span className="text-[10px] font-bold text-purple-700">
                  Rp {(room.price / 1000).toFixed(0)}k
                </span>
              </div>
              <p className="text-[9px] text-slate-500 line-clamp-1">{room.features}</p>
            </button>
          );
        })}
      </div>

      {/* Inputs: Check-in Date & Nights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
        <div>
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Tanggal Check-in
          </label>
          <div className="relative">
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-purple-500 focus:bg-white transition"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Durasi Menginap
          </label>
          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
            <button
              type="button"
              onClick={() => setNights((prev) => Math.max(1, prev - 1))}
              className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            >
              -
            </button>
            <span className="flex-1 text-center text-xs font-bold text-slate-900">
              {nights} Malam
            </span>
            <button
              type="button"
              onClick={() => setNights((prev) => prev + 1)}
              className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-purple-50/80 rounded-2xl p-3 border border-purple-100 mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-500 font-medium">Estimasi Biaya ({nights} Malam)</p>
          <p className="text-base sm:text-lg font-black text-purple-700">
            Rp {totalPrice.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 font-medium">Cukup Bayar DP 50%</p>
          <p className="text-xs sm:text-sm font-extrabold text-slate-900">
            Rp {dpPrice.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* WhatsApp CTA Button */}
      <Button
        type="button"
        onClick={handleBooking}
        className="w-full rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm h-11 shadow-md gap-2 cursor-pointer transition-all"
      >
        <Phone className="w-4 h-4" />
        <span>Kirim Reservasi via WhatsApp</span>
        <ArrowRight className="w-4 h-4 ml-auto" />
      </Button>

      <p className="text-[9px] text-slate-500 text-center mt-2 font-medium">
        Kamar otomatis terkunci setelah bukti transfer DP 50% dikonfirmasi staf.
      </p>
    </Card>
  );
}
