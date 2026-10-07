"use client";

import { ANNISA_WA_NUMBER, getContactFormWhatsAppUrl } from "@/lib/whatsapp";
import { Clock, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

export function ContactInfo() {
  // Tanggal hari ini format YYYY-MM-DD berbasis waktu lokal untuk batas minimum kalender
  const [todayStr, setTodayStr] = useState(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  useEffect(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    setTodayStr(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string)?.trim();
    const arrivalDate = (data.get("arrivalDate") as string)?.trim();
    const arrivalTime = (data.get("arrivalTime") as string)?.trim();
    const roomType = (data.get("roomType") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    // Validasi field wajib diisi
    if (!name || !arrivalDate || !arrivalTime || !message) {
      return;
    }

    // Format tanggal Indonesia jika diisi tamu
    let formattedDate = arrivalDate;
    try {
      const [year, month, day] = arrivalDate.split("-").map(Number);
      const d = new Date(year, month - 1, day);
      formattedDate = d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      formattedDate = arrivalDate;
    }

    const url = getContactFormWhatsAppUrl({
      name,
      arrivalDate: formattedDate,
      arrivalTime,
      roomType,
      message,
    });
    window.open(url, "_blank");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* ====================================================
          KOLOM KIRI: Heading Editorial & 3 Item Card Kontak
          ==================================================== */}
      <div className="md:col-span-5">
        {/* Headline Proporsional (Sama dengan 'Artikel Terbaru' - font-normal tracking-tight) */}
        <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#1c1c1c] leading-snug">
          Hubungi Resepsionis
        </h2>

        {/* Sub-teks Deskriptif */}
        <p className="text-xs sm:text-sm text-[#86848d] font-normal leading-relaxed mt-1.5">
          Butuh info transit atau konfirmasi ketersediaan kamar? Hubungi kami langsung atau isi
          pesan singkat di samping.
        </p>

        {/* 3 Item Card Kontak Kecil */}
        <div className="space-y-2.5 mt-4 sm:mt-5">
          {/* Card 1: Alamat */}
          <div className="rounded-2xl border border-[#e9e8ea] bg-white p-3 sm:p-3.5 shadow-2xs flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f4f2f4] text-[#3c315b] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-[#3c315b]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-medium text-[#86848d] uppercase tracking-wider block">
                Alamat Lengkap
              </span>
              <p className="text-xs sm:text-sm font-medium text-[#1c1c1c] leading-snug mt-0.5">
                Jl. Dr. J. Leimena, Laha, Teluk Ambon
              </p>
            </div>
          </div>

          {/* Card 2: Jam Operasional */}
          <div className="rounded-2xl border border-[#e9e8ea] bg-white p-3 sm:p-3.5 shadow-2xs flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f4f2f4] text-[#3c315b] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-4 h-4 text-[#3c315b]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-medium text-[#86848d] uppercase tracking-wider block">
                Jam Operasional
              </span>
              <p className="text-xs sm:text-sm font-medium text-[#1c1c1c] leading-snug mt-0.5">
                07.00 – 22.00 WIT
              </p>
            </div>
          </div>

          {/* Card 3: Telepon & WhatsApp */}
          <div className="rounded-2xl border border-[#e9e8ea] bg-white p-3 sm:p-3.5 shadow-2xs flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f4f2f4] text-[#3c315b] flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-4 h-4 text-[#3c315b]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-medium text-[#86848d] uppercase tracking-wider block">
                Telepon &amp; WhatsApp
              </span>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <a
                  href={`https://wa.me/${ANNISA_WA_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs sm:text-sm font-medium text-[#3c315b] hover:underline"
                >
                  0812-4216-3116
                </a>
                <span className="text-xs text-[#86848d]">•</span>
                <a
                  href="tel:081242163116"
                  className="text-xs text-[#86848d] hover:text-[#3c315b] transition-colors"
                >
                  Panggilan Seluler
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          KOLOM KANAN: Form Card WhatsApp Cepat (Uncontrolled FormData)
          ==================================================== */}
      <div className="md:col-span-7 rounded-3xl bg-white border border-[#e9e8ea] p-5 sm:p-6 shadow-[0px_8px_30px_rgba(226,223,254,0.55)]">
        {/* Header Form */}
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-medium text-[#1c1c1c] tracking-tight">
            Kirim pesan singkat
          </h3>
          <p className="text-[11px] text-[#86848d] mt-0.5 font-normal">Kami balas lewat WhatsApp</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Row 1: Nama Lengkap */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-[11px] font-medium text-[#1c1c1c] mb-1"
            >
              Nama Lengkap
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="Nama Anda"
              className="w-full rounded-xl bg-[#f4f2f4]/60 border border-[#e9e8ea] px-3.5 py-2 text-xs sm:text-sm text-[#1c1c1c] placeholder:text-[#86848d] focus:outline-none focus:border-[#3c315b] focus:bg-white transition-all"
            />
          </div>

          {/* Row 2: Grid 2 Kolom (Tanggal Tiba + Waktu Tiba) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="contact-arrival-date"
                className="block text-[11px] font-medium text-[#1c1c1c] mb-1"
              >
                Tanggal Tiba
              </label>
              <input
                id="contact-arrival-date"
                name="arrivalDate"
                type="date"
                required
                min={todayStr}
                className="w-full rounded-xl bg-[#f4f2f4]/60 border border-[#e9e8ea] px-3.5 py-2 text-xs sm:text-sm text-[#1c1c1c] focus:outline-none focus:border-[#3c315b] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="contact-arrival-time"
                className="block text-[11px] font-medium text-[#1c1c1c] mb-1"
              >
                Waktu Tiba
              </label>
              <input
                id="contact-arrival-time"
                name="arrivalTime"
                type="text"
                required
                placeholder="Contoh: Jam 07:00 WIT"
                className="w-full rounded-xl bg-[#f4f2f4]/60 border border-[#e9e8ea] px-3.5 py-2 text-xs sm:text-sm text-[#1c1c1c] placeholder:text-[#86848d] focus:outline-none focus:border-[#3c315b] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Row 3: Grid 2 Kolom (Tipe Kamar + Pesan) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="contact-room-type"
                className="block text-[11px] font-medium text-[#1c1c1c] mb-1"
              >
                Tipe Kamar
              </label>
              <select
                id="contact-room-type"
                name="roomType"
                required
                defaultValue="Belum tahu"
                className="w-full rounded-xl bg-[#f4f2f4]/60 border border-[#e9e8ea] px-3.5 py-2 text-xs sm:text-sm text-[#1c1c1c] focus:outline-none focus:border-[#3c315b] focus:bg-white transition-all cursor-pointer"
              >
                <option value="Belum tahu">Belum tahu</option>
                <option value="Tipe AC">Tipe AC</option>
                <option value="Tipe Kipas">Tipe Kipas</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-[11px] font-medium text-[#1c1c1c] mb-1"
              >
                Pesan
              </label>
              <input
                id="contact-message"
                name="message"
                type="text"
                required
                placeholder="Tuliskan pertanyaan atau kebutuhan Anda"
                className="w-full rounded-xl bg-[#f4f2f4]/60 border border-[#e9e8ea] px-3.5 py-2 text-xs sm:text-sm text-[#1c1c1c] placeholder:text-[#86848d] focus:outline-none focus:border-[#3c315b] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Tombol Submit CTA Bersih (Matching Google Maps button style: pill, light bg, border) */}
          <button
            type="submit"
            className="w-full h-10 rounded-full bg-[#f4f2f4] hover:bg-[#eae6f4] border border-[#e9e8ea] text-[#1c1c1c] text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs transition-all active:scale-95 mt-3 cursor-pointer"
          >
            <FaWhatsapp className="w-4 h-4 text-emerald-600" />
            <span>Kirim Pesan</span>
          </button>
        </form>
      </div>
    </div>
  );
}
