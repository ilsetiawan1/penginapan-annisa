"use client";

import {
  ArrowRight,
  Bed,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Moon,
  Phone,
  Search,
  Sparkles,
  Users,
  Wifi,
  Wind,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../../components/ui/button";

interface BookingWidgetProps {
  onSelectRoomType?: (slug: string) => void;
}

export function BookingWidget({ onSelectRoomType }: BookingWidgetProps) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

  const [checkInDate, setCheckInDate] = useState(today);
  const [roomType, setRoomType] = useState<"ac" | "kipas">("ac");
  const [totalNights, setTotalNights] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const roomDetails = {
    ac: {
      name: "Kamar AC Superior",
      price: 275000,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
      badge: "Paling Populer",
      features: "1 King Bed • AC Dingin • Kamar Mandi Dalam • WiFi",
    },
    kipas: {
      name: "Kamar Kipas Standar",
      price: 200000,
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
      badge: "Paling Hemat",
      features: "1 Double/2 Single • Kipas Angin • Kamar Mandi Dalam • WiFi",
    },
  };

  const selectedRoomInfo = roomDetails[roomType];
  const pricePerNight = selectedRoomInfo.price;
  const totalAmount = pricePerNight * totalNights;
  const dpAmount = totalAmount * 0.5;
  const remainingAmount = totalAmount - dpAmount;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSendWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const roomName =
      roomType === "ac"
        ? "Kamar AC Superior (Rp 275.000/malam)"
        : "Kamar Kipas Standar (Rp 200.000/malam)";

    const message = `Halo Penginapan Annisa, saya ingin reservasi kamar transit:%0A- Tipe Kamar: ${roomName}%0A- Nama Tamu: ${
      guestName || "Calon Tamu"
    }%0A- No. WhatsApp: ${
      guestPhone || "-"
    }%0A- Check-In: ${checkInDate} (Fleksibel 07:00 - 21:00 WIT)%0A- Durasi: ${totalNights} Malam%0A- Total Biaya: ${formatRupiah(
      totalAmount,
    )}%0A- DP 50% (Transfer): ${formatRupiah(
      dpAmount,
    )}%0A- Sisa Pelunasan di Lokasi: ${formatRupiah(
      remainingAmount,
    )}%0A%0AApakah unit kamar masih tersedia? Mohon info rekening untuk transfer DP 50%. Terima kasih!`;

    window.open(`https://wa.me/6281242163116?text=${message}`, "_blank");
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Clean Glassmorphic Booking Card with Dynamic Room Photo */}
      <form
        onSubmit={handleSendWhatsapp}
        className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/90 shadow-2xl shadow-purple-950/10 overflow-hidden transition-all duration-300"
      >
        {/* Dynamic Visual Room Photo Header */}
        <div className="relative h-44 sm:h-52 w-full bg-purple-100 overflow-hidden group">
          <Image
            src={selectedRoomInfo.image}
            alt={selectedRoomInfo.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          {/* Top Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="bg-purple-950/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
              {selectedRoomInfo.badge}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur-md text-purple-950 text-xs font-black px-3 py-1 rounded-full shadow-xs">
              {formatRupiah(selectedRoomInfo.price)}
              <span className="text-[10px] font-semibold text-slate-600"> / mlm</span>
            </span>
          </div>

          {/* Bottom Photo Caption */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                  {selectedRoomInfo.name}
                </h3>
                <p className="text-[11px] text-purple-200 font-medium mt-0.5 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-purple-300 shrink-0" />
                  <span>{selectedRoomInfo.features}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          {/* Segmented Room Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-purple-50/70 rounded-2xl mb-4 border border-purple-100/80">
            {/* AC Superior */}
            <button
              type="button"
              onClick={() => {
                setRoomType("ac");
                onSelectRoomType?.("kamar-ac");
              }}
              className={`p-2 sm:p-2.5 rounded-xl text-left transition-all relative flex items-center justify-between cursor-pointer ${
                roomType === "ac"
                  ? "bg-purple-700 text-white shadow-md shadow-purple-950/20"
                  : "bg-white/80 text-slate-700 hover:bg-white hover:text-purple-950"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    roomType === "ac" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-700"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <div>
                  <span
                    className={`text-xs font-black block leading-tight ${
                      roomType === "ac" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    AC Superior
                  </span>
                  <span
                    className={`text-[10px] font-bold block leading-none mt-0.5 ${
                      roomType === "ac" ? "text-purple-200" : "text-purple-700"
                    }`}
                  >
                    Rp 275rb/mlm
                  </span>
                </div>
              </div>
              {roomType === "ac" && (
                <span className="text-[9px] font-extrabold bg-white/25 text-white px-1.5 py-0.5 rounded-md">
                  ✓
                </span>
              )}
            </button>

            {/* Kipas Standar */}
            <button
              type="button"
              onClick={() => {
                setRoomType("kipas");
                onSelectRoomType?.("kamar-kipas");
              }}
              className={`p-2 sm:p-2.5 rounded-xl text-left transition-all relative flex items-center justify-between cursor-pointer ${
                roomType === "kipas"
                  ? "bg-purple-700 text-white shadow-md shadow-purple-950/20"
                  : "bg-white/80 text-slate-700 hover:bg-white hover:text-purple-950"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    roomType === "kipas"
                      ? "bg-white/20 text-white"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  <Wind className="w-3.5 h-3.5" />
                </span>
                <div>
                  <span
                    className={`text-xs font-black block leading-tight ${
                      roomType === "kipas" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Kipas Standar
                  </span>
                  <span
                    className={`text-[10px] font-bold block leading-none mt-0.5 ${
                      roomType === "kipas" ? "text-purple-200" : "text-purple-700"
                    }`}
                  >
                    Rp 200rb/mlm
                  </span>
                </div>
              </div>
              {roomType === "kipas" && (
                <span className="text-[9px] font-extrabold bg-white/25 text-white px-1.5 py-0.5 rounded-md">
                  ✓
                </span>
              )}
            </button>
          </div>

          {/* Form Input Fields */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3.5">
            {/* Check-In Date */}
            <div className="bg-purple-50/40 hover:bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/80 transition">
              <label
                htmlFor="checkInDate"
                className="text-[10px] uppercase font-bold text-slate-500 block mb-1 flex items-center gap-1"
              >
                <Calendar className="w-3 h-3 text-purple-600" />
                <span>Tgl Check-In</span>
              </label>
              <input
                id="checkInDate"
                type="date"
                value={checkInDate}
                min={today}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
                required
              />
            </div>

            {/* Durasi Menginap */}
            <div className="bg-purple-50/40 hover:bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/80 transition">
              <label
                htmlFor="durasiMalam"
                className="text-[10px] uppercase font-bold text-slate-500 block mb-1 flex items-center gap-1"
              >
                <Moon className="w-3 h-3 text-purple-600" />
                <span>Lama Menginap</span>
              </label>
              <select
                id="durasiMalam"
                value={totalNights}
                onChange={(e) => setTotalNights(Number(e.target.value))}
                className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none"
              >
                <option value={1}>1 Malam (Transit)</option>
                <option value={2}>2 Malam</option>
                <option value={3}>3 Malam</option>
                <option value={4}>4 Malam</option>
              </select>
            </div>

            {/* Nama Tamu */}
            <div className="bg-purple-50/40 hover:bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/80 transition">
              <label
                htmlFor="guestName"
                className="text-[10px] uppercase font-bold text-slate-500 block mb-1 flex items-center gap-1"
              >
                <Users className="w-3 h-3 text-purple-600" />
                <span>Nama Pemesan</span>
              </label>
              <input
                id="guestName"
                type="text"
                placeholder="Contoh: Budi"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                required
              />
            </div>

            {/* No. WhatsApp */}
            <div className="bg-purple-50/40 hover:bg-purple-50/70 p-2.5 rounded-xl border border-purple-100/80 transition">
              <label
                htmlFor="guestPhone"
                className="text-[10px] uppercase font-bold text-slate-500 block mb-1 flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-purple-600" />
                <span>No. WhatsApp</span>
              </label>
              <input
                id="guestPhone"
                type="tel"
                placeholder="0812xxxx"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Bottom Bar: DP 50% Price Summary + WhatsApp CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-purple-100">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[10px] text-slate-500 font-medium">
                  Total ({totalNights} Malam):
                </span>
                <span className="text-sm font-black text-slate-950">
                  {formatRupiah(totalAmount)}
                </span>
              </div>
              <div className="text-[11px] font-extrabold text-purple-900 mt-0.5">
                DP 50% Transfer: <span className="text-purple-700">{formatRupiah(dpAmount)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm gap-2 bg-purple-600 hover:bg-purple-700 shadow-purple-600/30"
            >
              <Phone className="w-4 h-4" />
              <span>Pesan via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
