import {
  Car,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { Navbar } from "../../components/layout/navbar";
import { Button } from "../../components/ui/button";
import { ANNISA_WA_NUMBER } from "../../lib/whatsapp";

export default function ContactPage() {
  return (
    <div className="relative min-h-dvh max-h-dvh w-full bg-[#faf9fc] flex flex-col justify-between overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* Scenic Ambient Half-Hero Background */}
      <div className="absolute inset-x-0 top-0 h-[48%] sm:h-[52%] overflow-hidden z-0">
        <Image
          src="/contact/bg-gong-perdamaian-kota-ambon.webp"
          alt="Gong Perdamaian Nusantara Kota Ambon - Penginapan Annisa"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-[#faf9fc] via-[#faf9fc]/90 to-transparent pointer-events-none" />
      </div>

      {/* Floating Modern Navbar */}
      <Navbar />

      {/* Main Content Showcase */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-3.5 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-2 flex-1 flex flex-col justify-center min-h-0">
        {/* Header Section (Elegan dengan Font Serif Georgia) */}
        <div className="text-center text-white mb-3 sm:mb-5 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-1.5 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-purple-300" />
            <span>PENGINAPAN ANNISA AMBON</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight leading-tight drop-shadow-md">
            Lokasi &amp; Kontak Resmi
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 font-normal max-w-md mx-auto leading-tight drop-shadow-xs mt-1">
            Hanya 750 Meter dari Terminal Bandara Pattimura (2–3 Menit Perjalanan)
          </p>
        </div>

        {/* Modern Clean Glassmorphism Showcase Card */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-4.5 sm:p-6 lg:p-7 border border-purple-100 shadow-2xl shadow-purple-950/10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center text-left">
          {/* Left Column: Direct Info & Action */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3 sm:space-y-3.5">
            <div className="space-y-2 sm:space-y-2.5">
              {/* 1. Alamat Lengkap */}
              <div className="flex items-start gap-3 p-2.5 sm:p-3 rounded-2xl bg-purple-50/40 border border-purple-100/80 hover:bg-purple-50/70 transition-colors">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-300/50 mt-0.5">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <span className="text-[10px] font-black text-purple-800 uppercase tracking-wider block">
                    Alamat Penginapan
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    Jl. Bandara Pattimura, Tawiri, Ambon
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Hanya 750 meter dari gerbang terminal bandara.
                  </p>
                </div>
              </div>

              {/* 2. Jam Buka & Check-In */}
              <div className="flex items-start gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-colors">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-300/50 mt-0.5">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                    Jam Operasional &amp; Check-In
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    06:00 – 22:00 WIT <span className="text-slate-500 font-normal">(Setiap Hari)</span>
                  </p>
                  <p className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                    <span>✓</span> <span>Check-in fleksibel untuk penerbangan pagi/malam</span>
                  </p>
                </div>
              </div>

              {/* 3. Panduan Rute */}
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-purple-50/90 border border-purple-100 text-purple-900 text-xs font-bold">
                <Car className="w-4 h-4 text-purple-700 shrink-0" />
                <span className="truncate">2–3 Menit dari Terminal Bandara Pattimura (Bebas Macet)</span>
              </div>
            </div>

            {/* Direct WhatsApp Call-to-Action Button */}
            <Button
              asChild
              className="w-full rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm h-11 sm:h-12 gap-2 shadow-lg shadow-purple-900/25 hover:shadow-xl transition-all cursor-pointer"
            >
              <a
                href={`https://wa.me/${ANNISA_WA_NUMBER}?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20informasi%20kamar%20dan%20lokasi`}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp className="w-4.5 h-4.5" />
                <span>Chat Resepsionis (0812-4216-3116)</span>
              </a>
            </Button>
          </div>

          {/* Right Column: Google Maps Embed with Premium Rounded Frame */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-purple-700" />
                <span>Peta Lokasi Google Maps</span>
              </span>
              <a
                href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-1 hover:underline transition-colors"
              >
                <span>Buka Petunjuk Arah</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Maps Frame */}
            <div className="relative h-40 sm:h-48 lg:h-56 w-full rounded-2xl overflow-hidden border border-purple-100 shadow-md">
              <iframe
                title="Peta Lokasi Penginapan Annisa Ambon"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4629.6179207921805!2d128.08701762720418!3d-3.7074615396397355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6ce7a259d48e1b%3A0x304cec63773e589e!2sPenginapan%20Annisa!5e0!3m2!1sid!2sid!4v1787323500248!5m2!1sid!2sid"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Minimal Footer */}
      <footer className="relative z-10 py-2.5 text-center text-[10px] sm:text-[11px] text-slate-500 border-t border-slate-200/80 shrink-0 bg-white/50 backdrop-blur-xs">
        <p>© 2026 Penginapan Annisa • 750m dari Bandara Pattimura Ambon. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}
