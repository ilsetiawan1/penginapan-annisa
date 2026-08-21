import { Clock, MapPin, Navigation } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { Navbar } from "../../components/layout/navbar";
import { Button } from "../../components/ui/button";
import { ANNISA_WA_NUMBER } from "../../lib/whatsapp";

export default function ContactPage() {
  return (
    <div className="relative h-dvh max-h-dvh w-full flex flex-col justify-between overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* Background Image Contact */}
      <Image
        src="/contact/bg-contact.png"
        alt="Lokasi Penginapan Annisa Ambon"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90" />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content (Strict 100vh Single-Screen Layout from Mobile to Desktop) */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-3 sm:px-4 pt-16 sm:pt-20 lg:pt-24 pb-1 sm:pb-2 flex-1 flex flex-col justify-center min-h-0">
        {/* Header Title */}
        <div className="text-center text-white mb-2.5 sm:mb-4 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-1 shadow-sm">
            <MapPin className="w-3 h-3 text-purple-300" />
            <span>LOKASI &amp; KONTAK RESMI</span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight drop-shadow-md">
            Hubungi &amp; Kunjungi Kami
          </h1>

          <p className="text-[11px] sm:text-xs text-slate-200 font-normal max-w-md mx-auto leading-tight drop-shadow-sm mt-0.5 hidden xs:block">
            Hanya 750 meter dari Bandara Pattimura Ambon. Resepsionis siap melayani Anda pukul 06:00 – 22:00 WIT.
          </p>
        </div>

        {/* 2-Column Info & Maps Glass Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-3.5 sm:p-5 lg:p-6 border border-white/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5 lg:gap-6 items-stretch text-left overflow-hidden">
          {/* Left Column: Direct Info & WhatsApp CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-2.5 sm:space-y-3">
            <div className="space-y-2 sm:space-y-2.5">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                    Alamat Penginapan
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-snug">
                    Jl. Bandara Pattimura, Tawiri, Ambon, Maluku (750m dari terminal bandara).
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                    Jam Operasional &amp; Check-In
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                    Resepsionis Buka: <strong>06:00 – 22:00 WIT</strong> (Setiap Hari)
                  </p>
                </div>
              </div>

              {/* Quick Route Guide */}
              <div className="bg-purple-50/80 rounded-2xl p-2.5 sm:p-3 border border-purple-100/90 text-slate-700 space-y-0.5">
                <div className="flex items-center gap-1.5 font-extrabold text-purple-950 text-[10px] sm:text-[11px]">
                  <Navigation className="w-3.5 h-3.5 text-purple-700" />
                  <span>Petunjuk Arah Cepat:</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-600 leading-relaxed">
                  Keluar gerbang bandara ➔ jalan 500m ke jalan utama ➔ belok kanan di Gapura Tawiri ➔ penginapan 250m di sebelah kiri.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-1">
              <Button
                asChild
                className="w-full rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm h-10 sm:h-11 gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <a
                  href={`https://wa.me/${ANNISA_WA_NUMBER}?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20informasi%20penginapan`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Chat WhatsApp Resmi (0812-4216-3116)</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Embedded Google Maps */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="font-extrabold text-[11px] sm:text-xs text-slate-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-purple-700" />
                <span>Peta Interaktif Google Maps</span>
              </span>
              <a
                href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] sm:text-[11px] font-bold text-purple-700 hover:text-purple-900 hover:underline"
              >
                Buka di Maps ➔
              </a>
            </div>

            {/* Exact Embedded Google Maps Iframe */}
            <div className="relative h-32 xs:h-36 sm:h-44 lg:h-56 w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner">
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

      {/* Bottom Compact Footer (1 Line) */}
      <footer className="relative z-10 py-2 sm:py-2.5 text-center text-[10px] sm:text-[11px] text-slate-300 border-t border-white/10 shrink-0">
        <p>© 2026 Penginapan Annisa • 750m dari Bandara Pattimura Ambon. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}
