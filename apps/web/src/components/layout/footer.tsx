"use client";

import { useSettings } from "@/features/settings/hooks/use-settings";
import { usePWAInstall } from "@/hooks/use-pwa-install";
import { Clock, Download, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const { data: settings } = useSettings();
  const { installPWA } = usePWAInstall();
  const lodgingName = settings?.lodging_name || "Penginapan Annisa";
  const waNumber = settings?.whatsapp_number || "6281240822240";
  const airportDistance = settings?.airport_distance || "Transit Dekat Bandara Pattimura";

  if (pathname === "/contact") {
    return null;
  }

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

          {/* Content inside Floating Softselling Card */}
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
      <div className="w-full bg-white pt-20 sm:pt-28 pb-8 px-4 border-t border-[#e9e8ea] text-[#1c1c1c]">
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-0 md:grid md:grid-cols-12 md:gap-10">
          {/* Kolom 1: Identitas & Slogan (md:col-span-5) */}
          <div className="md:col-span-5 space-y-2.5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#f4f2f4] p-0.5 border border-[#e9e8ea] shrink-0 shadow-2xs">
                <Image
                  src="/images/branding/logo.png"
                  alt={`Logo ${lodgingName}`}
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-signature font-normal text-sm sm:text-lg text-[#1c1c1c] tracking-normal block group-hover:text-[#3c315b] transition leading-none pt-0.5">
                  {lodgingName}
                </span>
                <span className="text-[11px] text-zinc-600 font-normal tracking-tight block leading-none mt-1">
                  {airportDistance}
                </span>
              </div>
            </Link>

            {/* Tombol Unduh Aplikasi PWA di bawah identitas logo */}
            <div className="pt-1.5">
              <button
                type="button"
                onClick={installPWA}
                className="inline-flex items-center gap-2 rounded-full border border-[#e9e8ea] bg-white px-3.5 py-1.5 text-xs font-normal text-[#3c315b] shadow-2xs transition-all duration-200 hover:bg-[#f4f2f4] active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#3c315b]" />
                <span>Unduh Aplikasi Penginapan Annisa</span>
              </button>
            </div>
          </div>

          {/* Container Kolom 2 & 3 (Mobile: 2 Kolom Sejajar Rapi / Desktop: Terpisah) */}
          <div className="grid grid-cols-2 gap-4 md:col-span-7 md:grid-cols-7 md:gap-8 pt-4 md:pt-0 border-t border-[#e9e8ea] md:border-t-0">
            {/* Kolom 2: Menu Navigasi (md:col-span-3) */}
            <div className="md:col-span-3 space-y-2">
              <h3 className="font-medium text-[11px] sm:text-xs uppercase tracking-wider text-[#1c1c1c]">
                Menu Halaman
              </h3>
              <ul className="space-y-0.5 text-xs font-normal text-zinc-600">
                <li>
                  <Link href="/" className="py-1.5 block hover:text-[#3c315b] transition">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/rooms" className="py-1.5 block hover:text-[#3c315b] transition">
                    Pilihan Kamar
                  </Link>
                </li>
                <li>
                  <Link href="/souvenirs" className="py-1.5 block hover:text-[#3c315b] transition">
                    Oleh-oleh Khas
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="py-1.5 block hover:text-[#3c315b] transition">
                    Artikel Wisata
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="py-1.5 block hover:text-[#3c315b] transition">
                    Kontak &amp; Peta
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Layanan & Kontak Resmi (md:col-span-4) */}
            <div className="md:col-span-4 space-y-2">
              <h3 className="font-medium text-[11px] sm:text-xs uppercase tracking-wider text-[#1c1c1c]">
                Info &amp; Lokasi
              </h3>
              <div className="space-y-2 text-xs text-zinc-600">
                <div className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#3c315b] shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs leading-tight text-zinc-600">
                    Buka: 06:00 – 22:00 WIT
                  </span>
                </div>

                <div className="flex items-start gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#3c315b] shrink-0 mt-0.5" />
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] sm:text-xs font-normal text-zinc-600 hover:text-[#3c315b] transition leading-tight py-1 block"
                  >
                    {waNumber.startsWith("62") ? `0${waNumber.slice(2)}` : waNumber}
                  </a>
                </div>

                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#3c315b] shrink-0 mt-0.5" />
                  <span className="text-[11px] sm:text-xs leading-tight text-zinc-600">
                    Jl. Bandara Pattimura, Tawiri, Kota Ambon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip (Tunggal & Terpusat) */}
        <div className="max-w-5xl mx-auto mt-7 pt-4 border-t border-[#e9e8ea] text-center text-[10px] sm:text-[11px] text-zinc-600 font-normal">
          <p>© 2026 {lodgingName}. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
