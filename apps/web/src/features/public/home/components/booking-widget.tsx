"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { getRoomBookingWhatsAppUrl } from "../../../../lib/whatsapp";

interface RoomOption {
  id: "ac" | "kipas";
  name: string;
  price: number;
  dp: number;
  image: string;
  features: string;
}

const ROOM_OPTIONS: RoomOption[] = [
  {
    id: "ac",
    name: "Tipe AC",
    price: 275000,
    dp: 137500,
    image: "/rooms/room-ac-101.jpg",
    features: "1 Kasur Besar (2–3 Org) • AC Dingin • KM Dalam • TV • WiFi",
  },
  {
    id: "kipas",
    name: "Tipe Kipas",
    price: 200000,
    dp: 100000,
    image: "/rooms/room-kipas-201.jpg",
    features: "1 Kasur Besar (2–3 Org) • Kipas Angin • KM Dalam • TV • WiFi",
  },
];

export function BookingWidget() {
  const [selectedRoom, setSelectedRoom] = useState<"ac" | "kipas">("ac");
  const [checkInDate, setCheckInDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
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
    <Card className="overflow-hidden p-0 bg-white/90 backdrop-blur-xl border border-white/80 shadow-2xl shadow-purple-950/20 rounded-3xl text-left transition-all">
      {/* Top Room Photo Banner */}
      <div className="relative h-36 sm:h-44 w-full bg-slate-900 overflow-hidden">
        <Image
          src={currentRoom.image}
          alt={currentRoom.name}
          fill
          className="object-cover opacity-90 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3">
          <span className="bg-purple-950/85 text-purple-200 border border-purple-400/40 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider shadow-xs">
            {selectedRoom === "ac" ? "Paling Populer" : "Paling Hemat"}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-white text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-xs">
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
        {/* High-Contrast Segmented Room Type Switch */}
        <div className="bg-slate-200/80 p-1 rounded-2xl border border-slate-300/80 grid grid-cols-2 gap-1">
          {ROOM_OPTIONS.map((room) => {
            const isSelected = selectedRoom === room.id;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => setSelectedRoom(room.id)}
                className={`py-2 px-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-left ${
                  isSelected
                    ? "bg-purple-700 text-white shadow-md border border-purple-400/50"
                    : "bg-white/80 text-slate-800 hover:bg-white border border-slate-200/70"
                }`}
              >
                <div>
                  <p
                    className={`font-extrabold text-xs leading-tight ${
                      isSelected ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {room.name}
                  </p>
                  <p
                    className={`text-[10px] font-bold ${
                      isSelected ? "text-purple-200" : "text-purple-700"
                    }`}
                  >
                    Rp {(room.price / 1000).toFixed(0)}rb/mlm
                  </p>
                </div>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-white text-purple-900 flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* High-Contrast Date & Nights Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white border-2 border-slate-300/90 focus-within:border-purple-600 shadow-2xs rounded-xl p-2 sm:p-2.5 transition-all">
            <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider block mb-0.5">
              TGL CHECK-IN
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-black text-slate-950 outline-none cursor-pointer"
            />
          </div>

          <div className="bg-white border-2 border-slate-300/90 focus-within:border-purple-600 shadow-2xs rounded-xl p-2 sm:p-2.5 transition-all">
            <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider block mb-0.5">
              LAMA MENGINAP
            </label>
            <select
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full bg-transparent text-xs sm:text-sm font-black text-slate-950 outline-none cursor-pointer"
            >
              <option value={1}>1 Malam (Transit)</option>
              <option value={2}>2 Malam</option>
              <option value={3}>3 Malam</option>
              <option value={4}>4 Malam</option>
              <option value={5}>5+ Malam</option>
            </select>
          </div>
        </div>

        {/* High-Contrast Guest Name & WhatsApp Inputs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white border-2 border-slate-300/90 focus-within:border-purple-600 shadow-2xs rounded-xl p-2 sm:p-2.5 transition-all">
            <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider block mb-0.5">
              NAMA PEMESAN
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Contoh: Budi"
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-950 placeholder:text-slate-400 outline-none"
            />
          </div>

          <div className="bg-white border-2 border-slate-300/90 focus-within:border-purple-600 shadow-2xs rounded-xl p-2 sm:p-2.5 transition-all">
            <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider block mb-0.5">
              NO. WHATSAPP
            </label>
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="0812xxxx"
              className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-950 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Bottom Price Summary & CTA Button */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-200/90">
          <div>
            <p className="text-[11px] text-slate-600 font-bold">
              Total ({nights} Malam):{" "}
              <strong className="text-slate-950 font-black">
                Rp {totalPrice.toLocaleString("id-ID")}
              </strong>
            </p>
            <p className="text-[10px] font-extrabold text-purple-950 bg-purple-200/90 px-2 py-0.5 rounded-md inline-block mt-0.5 shadow-2xs">
              DP 50% Transfer: Rp {dpPrice.toLocaleString("id-ID")}
            </p>
          </div>

          <Button
            type="button"
            onClick={handleBooking}
            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm h-10 px-4 sm:px-5 gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            <span>Pesan via WhatsApp</span>
            <span className="text-xs">➔</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
