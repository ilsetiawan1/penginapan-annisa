import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { ANNISA_WA_NUMBER } from "../../lib/whatsapp";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="relative w-full pt-10 sm:pt-16">
      {/* ====================================================
          FLOATING OVERLAPPING CTA CARD (Scenic Glassmorphism Effect)
          ==================================================== */}
      <div className="relative max-w-5xl mx-auto px-4 -mb-14 sm:-mb-20 z-20">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-purple-950/35 backdrop-blur-xl text-white p-6 sm:p-10 md:p-12 shadow-2xl shadow-purple-950/30 border border-white/30">
          {/* Frosted Glass Gradient Overlay with Ambient Glow Orbs */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/75 via-slate-950/60 to-purple-950/75 backdrop-blur-md pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-fuchsia-400/20 blur-3xl pointer-events-none" />

          {/* Content inside Floating Glass Card */}
          <div className="relative z-10 max-w-xl mx-auto text-center space-y-3 sm:space-y-4">
            {/* Headline */}
            <h2 className="text-xl sm:text-3xl font-black text-white leading-tight drop-shadow-md tracking-tight">
              Istirahat Nyaman Dekat Bandara Pattimura
            </h2>

            {/* Concise Subtitle */}
            <p className="text-xs sm:text-sm text-slate-100/90 font-normal leading-relaxed drop-shadow-xs max-w-md mx-auto">
              Solusi penginapan transit bebas macet di Ambon dengan kamar bersih, tenang, dan
              fasilitas lengkap.
            </p>

            {/* CTA Button */}
            <div className="pt-1.5 sm:pt-2">
              <Button
                asChild
                className="rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm h-11 sm:h-12 px-6 sm:px-8 gap-2 shadow-xl shadow-purple-950/40 transition-all hover:scale-105 border border-white/30 cursor-pointer"
              >
                <a
                  href={`https://wa.me/${ANNISA_WA_NUMBER}?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20ketersediaan%20kamar%20transit`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Pesan Kamar via WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>
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
                  src="/logo-penginapan-annisa.png"
                  alt="Logo Penginapan Annisa"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-sm text-slate-900 leading-tight block group-hover:text-purple-700 transition">
                  Penginapan Annisa
                </span>
                <span className="text-[10px] text-purple-700 font-bold block leading-none">
                  Transit Dekat Bandara Pattimura
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
                  <Link href="/kamar" className="hover:text-purple-700 transition">
                    Pilihan Kamar
                  </Link>
                </li>
                <li>
                  <Link href="/oleh-oleh" className="hover:text-purple-700 transition">
                    Oleh-oleh Khas
                  </Link>
                </li>
                <li>
                  <Link href="/artikel" className="hover:text-purple-700 transition">
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
                    href={`https://wa.me/${ANNISA_WA_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] sm:text-xs font-bold text-slate-900 hover:text-purple-700 transition leading-tight"
                  >
                    0812-4216-3116
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
        <div className="max-w-5xl mx-auto mt-7 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-medium text-center sm:text-left">
          <p>© 2026 Penginapan Annisa. Hak Cipta Dilindungi.</p>
          <p className="text-slate-500 font-medium">Tawiri, Ambon, Maluku</p>
        </div>
      </div>
    </footer>
  );
}
