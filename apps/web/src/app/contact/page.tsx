import { Clock, ExternalLink, MapPin, Navigation } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { Navbar } from "../../components/layout/navbar";
import { Button } from "../../components/ui/button";
import { ANNISA_WA_NUMBER } from "../../lib/whatsapp";

export default function ContactPage() {
  return (
    <div className="relative h-dvh max-h-dvh w-full bg-[#faf9fc] flex flex-col justify-between overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* Half-Hero Background with Smooth Fade */}
      <div className="absolute inset-x-0 top-0 h-[45%] sm:h-[50%] overflow-hidden z-0">
        <Image
          src="/contact/bg-gong-perdamaian-kota-ambon.webp"
          alt="Gong Perdamaian Nusantara Kota Ambon - Penginapan Annisa"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#faf9fc] via-[#faf9fc]/85 to-transparent pointer-events-none" />
      </div>

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content (Strict 100vh Layout) */}
      <main className="relative z-10 max-w-4xl mx-auto w-full px-3.5 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-1 sm:pb-2 flex-1 flex flex-col justify-center min-h-0">
        {/* Header Title (Clean & Punchy) */}
        <div className="text-center text-white mb-2.5 sm:mb-4 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-black mb-1.5 shadow-xs">
            <MapPin className="w-3 h-3 text-purple-300" />
            <span>PENGINAPAN ANNISA AMBON</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-black tracking-tight leading-tight drop-shadow-md">
            Lokasi &amp; Kontak Resmi
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-md mx-auto leading-tight drop-shadow-xs mt-0.5">
            750 Meter dari Bandara Pattimura (3 Menit Perjalanan)
          </p>
        </div>

        {/* Ultra-Clean Modern 2-Column Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-white/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center text-left">
          {/* Left Column: Essential Info & WhatsApp CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            {/* 3 Clean Info Pills */}
            <div className="space-y-2">
              {/* 1. Alamat */}
              <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    Alamat
                  </span>
                  <p className="text-xs font-bold text-slate-900 truncate">
                    Jl. Bandara Pattimura, Tawiri, Ambon
                  </p>
                </div>
              </div>

              {/* 2. Jam Buka & Check-In */}
              <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    Resepsionis &amp; Check-In
                  </span>
                  <p className="text-xs font-bold text-slate-900">
                    Buka 06:00 – 22:00 WIT <span className="text-slate-400 font-normal">• Check-in Fleksibel</span>
                  </p>
                </div>
              </div>

              {/* 3. Arah dari Bandara */}
              <div className="flex items-center gap-3 p-2 rounded-2xl bg-purple-50/70 border border-purple-100/80">
                <div className="w-8 h-8 rounded-xl bg-purple-200 text-purple-900 flex items-center justify-center shrink-0 shadow-2xs">
                  <Navigation className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider block">
                    Petunjuk Cepat
                  </span>
                  <p className="text-xs font-bold text-purple-950 truncate">
                    750m via Gapura Tawiri (250m kiri jalan)
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <Button
              asChild
              className="w-full rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm h-11 gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <a
                href={`https://wa.me/${ANNISA_WA_NUMBER}?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20informasi%20kamar`}
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Chat WhatsApp (0812-4216-3116)</span>
              </a>
            </Button>
          </div>

          {/* Right Column: Google Maps */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-black text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-700" />
                <span>Peta Google Maps</span>
              </span>
              <a
                href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-extrabold text-purple-700 hover:text-purple-950 flex items-center gap-1 hover:underline"
              >
                <span>Buka Rute Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Maps Frame */}
            <div className="relative h-36 sm:h-44 lg:h-52 w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner">
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

      {/* Bottom Compact Footer */}
      <footer className="relative z-10 py-2 text-center text-[10px] sm:text-[11px] text-slate-500 border-t border-slate-200/80 shrink-0">
        <p>© 2026 Penginapan Annisa • 750m dari Bandara Pattimura Ambon. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}
