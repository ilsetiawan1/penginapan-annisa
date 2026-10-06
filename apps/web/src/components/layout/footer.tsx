"use client";

import { useSettings } from "@/features/settings/hooks/use-settings";
import { Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const { data: settings } = useSettings();
  const lodgingName = settings?.lodging_name || "Penginapan Annisa";
  const waNumber = settings?.whatsapp_number || "6281240822240";
  const airportDistance = settings?.airport_distance || "Transit Dekat Bandara Pattimura";

  return (
    <footer className="relative w-full pt-8 sm:pt-12">
      {/* ====================================================
          FLOATING OVERLAPPING SOFTELLING BANNER CARD
          ==================================================== */}
      <div className="relative max-w-5xl mx-auto px-4 -mb-10 sm:-mb-14 z-20">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#3c315b] text-white p-6 sm:p-8 md:p-10 shadow-xl shadow-[#3c315b]/20 border border-[#e9e8ea]/15">
          {/* Frosted / Ambient Glow Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3c315b] via-[#2d2445] to-[#3c315b] pointer-events-none" />
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[#e2dffe]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#e2dffe]/15 blur-3xl pointer-events-none" />

          {/* Content inside Floating Softselling Card (Tanpa Tombol WhatsApp) */}
          <div className="relative z-10 max-w-xl mx-auto text-center space-y-2.5 sm:space-y-3">
            {/* Headline */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-normal text-white leading-tight tracking-[-0.025em]">
              Istirahat Nyaman Dekat Bandara Pattimura
            </h2>

            {/* Concise Subtitle */}
            <p className="text-xs sm:text-sm text-[#e2dffe]/90 font-normal leading-relaxed max-w-md mx-auto">
              Solusi penginapan transit bebas macet di Ambon dengan kamar bersih, tenang, dan
              fasilitas lengkap.
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================
          CLEAN WHITE FOOTER BODY (Compact 2-Col on Mobile / 3-Col on Desktop)
          ==================================================== */}
      <div className="w-full bg-white pt-20 sm:pt-28 pb-8 px-4 border-t border-slate-200/80 text-slate-700">
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-0 md:grid md:grid-cols-12 md:gap-10">
          {/* Kolom 1: Identitas & Slogan (md:col-span-5) */}
          <div className="md:col-span-5 space-y-2.5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-purple-100 p-0.5 border border-purple-200 shrink-0 shadow-2xs">
                <Image
                  src="/images/branding/logo.png"
                  alt={`Logo ${lodgingName}`}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-sm text-slate-900 leading-tight block group-hover:text-purple-700 transition">
                  {lodgingName}
                </span>
                <span className="text-[10px] text-purple-700 font-bold block leading-none">
                  {airportDistance}
                </span>
              </div>
            </Link>

            <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed max-w-sm">
              Pilihan akomodasi transit nyaman, bersih, dan terjangkau untuk kebutuhan istirahat
              setiba atau sebelum penerbangan Anda.
            </p>
          </div>

          {/* Container Kolom 2 & 3 (Mobile: 2 Kolom Sejajar Rapi / Desktop: Terpisah) */}
          <div className="grid grid-cols-2 gap-4 md:col-span-7 md:grid-cols-7 md:gap-8 pt-3 md:pt-0 border-t border-slate-100 md:border-t-0">
            {/* Kolom 2: Menu Navigasi (md:col-span-3) */}
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-black text-[11px] sm:text-xs uppercase tracking-wider text-slate-900">
                Menu Halaman
              </h3>
              <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
                <li>
                  <Link href="/" className="hover:text-purple-700 transition">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/rooms" className="hover:text-purple-700 transition">
                    Pilihan Kamar
                  </Link>
                </li>
                <li>
                  <Link href="/souvenirs" className="hover:text-purple-700 transition">
                    Oleh-oleh Khas
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="hover:text-purple-700 transition">
                    Artikel Wisata
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-purple-700 transition">
                    Kontak &amp; Peta
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Layanan & Kontak Resmi (md:col-span-4) */}
            <div className="md:col-span-4 space-y-2">
              <h3 className="font-black text-[11px] sm:text-xs uppercase tracking-wider text-slate-900">
                Info &amp; Lokasi
              </h3>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs leading-tight">
                    Buka: <strong>06:00 – 22:00 WIT</strong>
                  </span>
                </div>

                <div className="flex items-start gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] sm:text-xs font-bold text-slate-900 hover:text-purple-700 transition leading-tight"
                  >
                    {waNumber.startsWith("62") ? `0${waNumber.slice(2)}` : waNumber}
                  </a>
                </div>

                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs leading-tight text-slate-500">
                    Jl. Bandara Pattimura, Tawiri, Kota Ambon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="max-w-5xl mx-auto mt-7 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] sm:text-[11px] text-slate-600 font-medium text-center sm:text-left">
          <p>© 2026 {lodgingName}. Hak Cipta Dilindungi.</p>
          <p className="text-slate-600 font-medium">Tawiri, Ambon, Maluku</p>
        </div>
      </div>
    </footer>
  );
}
