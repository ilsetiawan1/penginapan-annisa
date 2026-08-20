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
      name: "Tipe AC",
      price: 275000,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
      badge: "Paling Populer",
      features: "1 Kasur Besar (2–3 Org) • AC Dingin • KM Dalam • TV • WiFi",
    },
    kipas: {
      name: "Tipe Kipas",
      price: 200000,
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
      badge: "Hemat & Nyaman",
      features: "1 Kasur Besar (2–3 Org) • Kipas Angin • KM Dalam • TV • WiFi",
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
        ? "Tipe AC (Rp 275.000/malam)"
        : "Tipe Kipas (Rp 200.000/malam)";

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
      {/* Clean Minimalist Booking Card */}
      <form
        onSubmit={handleSendWhatsapp}
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md overflow-hidden transition-all duration-200"
      >
        {/* Crisp Visual Room Photo Header */}
        <div className="relative h-44 sm:h-52 w-full bg-slate-100 overflow-hidden">
          <Image
            src={selectedRoomInfo.image}
            alt={selectedRoomInfo.name}
            fill
            className="object-cover"
            priority
          />
          {/* Subtle Top & Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

          <div className="absolute top-3 left-3">
            <span className="bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
              {selectedRoomInfo.badge}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="bg-white text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
              {formatRupiah(selectedRoomInfo.price)}
              <span className="text-[10px] font-normal text-slate-500"> / mlm</span>
            </span>
          </div>

          {/* Photo Caption */}
          <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
            <h3 className="font-bold text-base sm:text-lg leading-tight">
              {selectedRoomInfo.name}
            </h3>
            <p className="text-[11px] text-slate-200 mt-0.5">{selectedRoomInfo.features}</p>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          {/* Clean Segmented Room Selector */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4">
            {/* Tipe AC */}
            <button
              type="button"
              onClick={() => {
                setRoomType("ac");
                onSelectRoomType?.("kamar-ac");
              }}
              className={`p-2.5 rounded-lg text-left transition-all relative flex items-center justify-between cursor-pointer ${
                roomType === "ac"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <div>
                <span className="text-xs font-bold block leading-tight">Tipe AC</span>
                <span className="text-[10px] text-purple-700 font-semibold block mt-0.5">
                  Rp 275rb/mlm
                </span>
              </div>
              {roomType === "ac" && (
                <span className="w-4 h-4 rounded-full bg-purple-700 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
              )}
            </button>

            {/* Tipe Kipas */}
            <button
              type="button"
              onClick={() => {
                setRoomType("kipas");
                onSelectRoomType?.("kamar-kipas");
              }}
              className={`p-2.5 rounded-lg text-left transition-all relative flex items-center justify-between cursor-pointer ${
                roomType === "kipas"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200/80"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <div>
                <span className="text-xs font-bold block leading-tight">Tipe Kipas</span>
                <span className="text-[10px] text-purple-700 font-semibold block mt-0.5">
                  Rp 200rb/mlm
                </span>
              </div>
              {roomType === "kipas" && (
                <span className="w-4 h-4 rounded-full bg-purple-700 text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
              )}
            </button>
          </div>

          {/* Form Input Fields (Clean Hairline Borders) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3.5">
            {/* Check-In Date */}
            <div className="bg-slate-50 hover:bg-slate-100/80 p-2.5 rounded-xl border border-slate-200/80 transition">
              <label
                htmlFor="checkInDate"
                className="text-[10px] uppercase font-bold text-slate-500 block mb-1 flex items-center gap-1"
              >
                <Calendar className="w-3 h-3 text-purple-700" />
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
            <div className="bg-slate-50 hover:bg-slate-100/80 p-2.5 rounded-xl border border-slate-200/80 transition">
              <label
                htmlFor="durasiMalam"
                className="text-[10px] uppercase font-bold text-slate-500 block mb-1 flex items-center gap-1"
              >
                <Moon className="w-3 h-3 text-purple-700" />
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
            <div className="bg-slate-50 hover:bg-slate-100/80 p-2.5 rounded-xl border border-slate-200/80 transition">
              <label
                htmlFor="guestName"
                className="text-[10px] uppercase font-bold text-slate-500 block mb-1 flex items-center gap-1"
              >
                <Users className="w-3 h-3 text-purple-700" />
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
            <div className="bg-slate-50 hover:bg-slate-100/80 p-2.5 rounded-xl border border-slate-200/80 transition">
              <label
                htmlFor="guestPhone"
                className="text-[10px] uppercase font-bold text-slate-500 block mb-1 flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-purple-700" />
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[10px] text-slate-500 font-medium">
                  Total ({totalNights} Malam):
                </span>
                <span className="text-sm font-black text-slate-950">
                  {formatRupiah(totalAmount)}
                </span>
              </div>
              <div className="text-[11px] font-bold text-slate-700 mt-0.5">
                DP 50% Transfer:{" "}
                <span className="text-purple-700 font-black">{formatRupiah(dpAmount)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm gap-2 bg-purple-700 hover:bg-purple-800 text-white shadow-xs"
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
