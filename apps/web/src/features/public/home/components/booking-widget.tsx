"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Check, Clock, Phone, Sparkles, User } from "lucide-react";
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
    features: "1 Kasur Besar (2–3 Org) • AC Dingin • KM Dalam • TV • WiFi",
    image: "/rooms/room-ac-101.jpg",
  },
  {
    id: "kipas",
    name: "Tipe Kipas",
    price: 200000,
    dp: 100000,
    features: "1 Kasur Besar (2–3 Org) • Kipas Angin • KM Dalam • TV • WiFi",
    image: "/rooms/room-kipas-201.jpg",
  },
];

export function BookingWidget() {
  const [selectedRoom, setSelectedRoom] = useState<string>("ac");
  const [checkInDate, setCheckInDate] = useState<string>("2026-08-20");
  const [nights, setNights] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");

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
    <Card className="overflow-hidden p-0 bg-white border border-slate-200/90 shadow-xl rounded-3xl text-left">
      {/* Top Room Photo Banner */}
      <div className="relative h-36 sm:h-44 w-full bg-slate-900 overflow-hidden">
        <Image
          src={currentRoom.image}
          alt={currentRoom.name}
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3">
          <span className="bg-purple-950/80 text-purple-200 border border-purple-400/30 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider">
            PALING POPULER
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white/95 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-xs">
            Rp {(currentRoom.price).toLocaleString("id-ID")}{" "}
            <span className="text-[9px] font-medium text-slate-500">/ mlm</span>
          </span>
        </div>

        {/* Bottom Overlay Text */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="text-sm sm:text-base font-black leading-tight drop-shadow-xs">
            {currentRoom.name}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-slate-200 line-clamp-1 mt-0.5 drop-shadow-xs">
            {currentRoom.features}
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        {/* Room Type Selector Radio Pills */}
        <div className="grid grid-cols-2 gap-2">
          {ROOM_OPTIONS.map((room) => {
            const isSelected = selectedRoom === room.id;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => setSelectedRoom(room.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "border-purple-600 bg-purple-50/70 shadow-2xs"
                    : "border-slate-200 hover:border-purple-300 bg-slate-50/50"
                }`}
              >
                <div>
                  <p className="font-extrabold text-xs text-slate-900 leading-tight">
                    {room.name}
                  </p>
                  <p className="text-[10px] font-bold text-purple-700">
                    Rp {(room.price / 1000).toFixed(0)}rb/mlm
                  </p>
                </div>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-purple-700 text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Date & Nights Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
              TGL CHECK-IN
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
              LAMA MENGINAP
            </label>
            <select
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer"
            >
              <option value={1}>1 Malam (Transit)</option>
              <option value={2}>2 Malam</option>
              <option value={3}>3 Malam</option>
              <option value={4}>4 Malam</option>
              <option value={5}>5+ Malam</option>
            </select>
          </div>
        </div>

        {/* Guest Name & WhatsApp Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
              NAMA PEMESAN
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Contoh: Budi"
              className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
              NO. WHATSAPP
            </label>
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="0812xxxx"
              className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Bottom Price Summary & CTA Button */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
          <div>
            <p className="text-[10px] text-slate-500 font-medium">
              Total ({nights} Malam):{" "}
              <strong className="text-slate-950 font-black">
                Rp {totalPrice.toLocaleString("id-ID")}
              </strong>
            </p>
            <p className="text-[10px] font-bold text-purple-700">
              DP 50% Transfer: Rp {dpPrice.toLocaleString("id-ID")}
            </p>
          </div>

          <Button
            type="button"
            onClick={handleBooking}
            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs h-10 px-4 shadow-sm gap-1.5 cursor-pointer shrink-0 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Pesan via WhatsApp ➔</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
