"use client";

import {
  ArrowRight,
  Bed,
  Calendar,
  CreditCard,
  Moon,
  Phone,
  Search,
  Sparkles,
  Users,
  Wind,
} from "lucide-react";
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

  const pricePerNight = roomType === "ac" ? 275000 : 200000;
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
    }%0A- Check-In: ${checkInDate} (Fleksibel 24 Jam)%0A- Durasi: ${totalNights} Malam%0A- Total Biaya: ${formatRupiah(
      totalAmount,
    )}%0A- DP 50% (Transfer): ${formatRupiah(
      dpAmount,
    )}%0A- Sisa Pelunasan di Lokasi: ${formatRupiah(
      remainingAmount,
    )}%0A%0AApakah unit kamar masih tersedia? Mohon info rekening untuk transfer DP 50%. Terima kasih!`;

    window.open(`https://wa.me/6281242163116?text=${message}`, "_blank");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Mobile-First Booking Capsule */}
      <form
        onSubmit={handleSendWhatsapp}
        className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-purple-100/90 shadow-xl shadow-purple-950/5 p-3.5 sm:p-5 transition-all"
      >
        {/* Segmented Room Selector on Top (Ultra Compact High-Contrast) */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-purple-50/80 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 border border-purple-100">
          {/* AC Superior */}
          <button
            type="button"
            onClick={() => {
              setRoomType("ac");
              onSelectRoomType?.("kamar-ac");
            }}
            className={`p-2.5 rounded-lg sm:rounded-xl text-left transition-all relative flex flex-col justify-between cursor-pointer ${
              roomType === "ac"
                ? "bg-purple-700 text-white shadow-md shadow-purple-950/20 ring-2 ring-purple-600"
                : "bg-white text-slate-700 hover:bg-purple-50/70 border border-purple-100"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  roomType === "ac" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-700"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              {roomType === "ac" ? (
                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-white/25 text-white px-2 py-0.5 rounded-full">
                  Dipilih ✓
                </span>
              ) : (
                <span className="text-[9px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-full">
                  Pilih
                </span>
              )}
            </div>
            <div>
              <span
                className={`text-xs sm:text-sm font-black block leading-tight ${roomType === "ac" ? "text-white" : "text-slate-900"}`}
              >
                AC Superior
              </span>
              <span
                className={`text-[11px] font-bold block leading-none mt-0.5 ${roomType === "ac" ? "text-purple-200" : "text-purple-700"}`}
              >
                Rp 275.000 / mlm
              </span>
            </div>
          </button>

          {/* Kipas Standar */}
          <button
            type="button"
            onClick={() => {
              setRoomType("kipas");
              onSelectRoomType?.("kamar-kipas");
            }}
            className={`p-2.5 rounded-lg sm:rounded-xl text-left transition-all relative flex flex-col justify-between cursor-pointer ${
              roomType === "kipas"
                ? "bg-purple-700 text-white shadow-md shadow-purple-950/20 ring-2 ring-purple-600"
                : "bg-white text-slate-700 hover:bg-purple-50/70 border border-purple-100"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  roomType === "kipas" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-700"
                }`}
              >
                <Wind className="w-3.5 h-3.5" />
              </span>
              {roomType === "kipas" ? (
                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-white/25 text-white px-2 py-0.5 rounded-full">
                  Dipilih ✓
                </span>
              ) : (
                <span className="text-[9px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-full">
                  Pilih
                </span>
              )}
            </div>
            <div>
              <span
                className={`text-xs sm:text-sm font-black block leading-tight ${roomType === "kipas" ? "text-white" : "text-slate-900"}`}
              >
                Kipas Standar
              </span>
              <span
                className={`text-[11px] font-bold block leading-none mt-0.5 ${roomType === "kipas" ? "text-purple-200" : "text-purple-700"}`}
              >
                Rp 200.000 / mlm
              </span>
            </div>
          </button>
        </div>

        {/* Input Fields Row (Horizontal on Desktop, Clean Stack on Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3">
          {/* Check-In Date */}
          <div className="bg-purple-50/40 hover:bg-purple-50/70 p-2.5 rounded-xl border border-purple-100 transition">
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
          <div className="bg-purple-50/40 hover:bg-purple-50/70 p-2.5 rounded-xl border border-purple-100 transition">
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
          <div className="bg-purple-50/40 hover:bg-purple-50/70 p-2.5 rounded-xl border border-purple-100 transition">
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
          <div className="bg-purple-50/40 hover:bg-purple-50/70 p-2.5 rounded-xl border border-purple-100 transition">
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-purple-50">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div>
              <span className="text-[10px] text-slate-500 font-medium block leading-none">
                Total {totalNights} Malam:
              </span>
              <span className="text-sm sm:text-base font-black text-slate-950">
                {formatRupiah(totalAmount)}
              </span>
            </div>
            <span className="text-[11px] font-bold text-purple-900 bg-purple-100 border border-purple-200 px-2.5 py-0.5 rounded-full">
              DP 50%: {formatRupiah(dpAmount)}
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm gap-2 bg-purple-600 hover:bg-purple-700 shadow-purple-600/25"
          >
            <Phone className="w-4 h-4" />
            <span>Pesan via WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
