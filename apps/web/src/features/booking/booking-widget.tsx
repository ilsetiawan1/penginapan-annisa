"use client";

import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";

interface BookingWidgetProps {
  onSelectRoomType?: (slug: string) => void;
}

export function BookingWidget({ onSelectRoomType }: BookingWidgetProps) {
  // Today and Tomorrow formatted as YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [roomType, setRoomType] = useState<"ac" | "kipas">("ac");
  const [guestCount, setGuestCount] = useState("2");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Calculation
  const pricePerNight = roomType === "ac" ? 275000 : 200000;
  const d1 = new Date(checkInDate);
  const d2 = new Date(checkOutDate);
  const diffTime = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
  const totalNights = Number.isNaN(diffTime) || diffTime < 1 ? 1 : diffTime;

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
        ? "Kamar AC Superior (Rp 275.000/mlm)"
        : "Kamar Kipas Standar (Rp 200.000/mlm)";

    const noteText = notes ? `📝 *Catatan Tambahan:* ${notes}%0A` : "";

    const message = `Halo Penginapan Annisa, saya ingin reservasi kamar transit:%0A🏨 *Tipe Kamar:* ${roomName}%0A👤 *Nama Tamu:* ${
      guestName || "Calon Tamu"
    }%0A📱 *No. WhatsApp:* ${
      guestPhone || "-"
    }%0A📅 *Check-In:* ${checkInDate} (Fleksibel 24 Jam)%0A📅 *Check-Out:* ${checkOutDate} (Maks 12:00 WIT)%0A🌙 *Durasi:* ${totalNights} Malam (${guestCount} Orang)%0A💰 *Total Biaya:* ${formatRupiah(
      totalAmount,
    )}%0A💳 *DP 50% (Transfer):* ${formatRupiah(
      dpAmount,
    )}%0A💵 *Sisa Pelunasan di Lokasi:* ${formatRupiah(
      remainingAmount,
    )}%0A${noteText}%0AApakah unit kamar masih tersedia? Mohon info rekening untuk transfer DP 50%. Terima kasih!`;

    window.open(`https://wa.me/6281242163116?text=${message}`, "_blank");
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-purple-100 shadow-xl shadow-purple-900/5 p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-5 border-b border-purple-50 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>Kalkulator &amp; Cek Ketersediaan Cepat</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Pesan Kamar Transit Mandiri
          </h3>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-xs text-slate-500 font-medium block">Lokasi Dekat Bandara</span>
          <span className="text-sm font-bold text-purple-700">750m dari Pattimura</span>
        </div>
      </div>

      <form onSubmit={handleSendWhatsapp} className="space-y-6">
        {/* Row 1: Pilih Tipe Kamar */}
        <div>
          <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. Pilih Tipe Kamar
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Opsi AC */}
            <button
              type="button"
              onClick={() => {
                setRoomType("ac");
                onSelectRoomType?.("kamar-ac");
              }}
              className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                roomType === "ac"
                  ? "border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20 shadow-xs"
                  : "border-slate-200 hover:border-purple-200 bg-white"
              }`}
            >
              <div>
                <span className="font-bold text-slate-900 text-sm block">Kamar AC Superior</span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  AC Dingin, Kamar Mandi Dalam, WiFi
                </span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-purple-700 text-base block">Rp 275.000</span>
                <span className="text-[10px] text-slate-400">/ malam</span>
              </div>
            </button>

            {/* Opsi Kipas */}
            <button
              type="button"
              onClick={() => {
                setRoomType("kipas");
                onSelectRoomType?.("kamar-kipas");
              }}
              className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                roomType === "kipas"
                  ? "border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20 shadow-xs"
                  : "border-slate-200 hover:border-purple-200 bg-white"
              }`}
            >
              <div>
                <span className="font-bold text-slate-900 text-sm block">Kamar Kipas Standar</span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Kipas Angin, Kamar Mandi Dalam, WiFi
                </span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-slate-800 text-base block">Rp 200.000</span>
                <span className="text-[10px] text-slate-400">/ malam</span>
              </div>
            </button>
          </div>
        </div>

        {/* Row 2: Tanggal & Jumlah Tamu */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="checkInDate"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Check-In (Fleksibel)
            </label>
            <input
              id="checkInDate"
              type="date"
              value={checkInDate}
              min={today}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="checkOutDate"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Check-Out (Maks 12:00)
            </label>
            <input
              id="checkOutDate"
              type="date"
              value={checkOutDate}
              min={checkInDate || today}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="guestCount"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Jumlah Tamu
            </label>
            <select
              id="guestCount"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="1">1 Orang Dewasa</option>
              <option value="2">2 Orang Dewasa</option>
              <option value="3">3 Orang (Family/Group)</option>
            </select>
          </div>
        </div>

        {/* Row 3: Nama & No WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label
              htmlFor="guestName"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Nama Pemesan
            </label>
            <input
              id="guestName"
              type="text"
              placeholder="Contoh: Budi Santoso"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="guestPhone"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
            >
              Nomor WhatsApp Tamu
            </label>
            <input
              id="guestPhone"
              type="tel"
              placeholder="Contoh: 081234567890"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        {/* Breakdown Biaya & DP 50% */}
        <div className="bg-purple-50/40 rounded-2xl p-4 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium block">
              Perhitungan {totalNights} Malam ({guestCount} Orang):
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                {formatRupiah(totalAmount)}
              </span>
              <span className="text-xs font-bold text-purple-800 bg-purple-100 border border-purple-200 px-2.5 py-0.5 rounded-full">
                DP 50%: {formatRupiah(dpAmount)}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              *Sisa {formatRupiah(remainingAmount)} dibayar saat tiba di lokasi penginapan.
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-8 gap-2 shadow-purple-600/30 text-sm sm:text-base font-bold bg-purple-600 hover:bg-purple-700"
          >
            <Phone className="w-4 h-4" />
            <span>Kirim Booking via WA</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
