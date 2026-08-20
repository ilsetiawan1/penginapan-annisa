import Image from "next/image";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Navbar } from "../../components/layout/navbar";
import { Button } from "../../components/ui/button";
import { ANNISA_WA_NUMBER } from "../../lib/whatsapp";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen xl:h-screen w-full flex flex-col justify-between overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* Background Image Contact */}
      <Image
        src="/contact/bg-contact.png"
        alt="Lokasi Penginapan Annisa Ambon"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/65 to-slate-950/85" />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content (Centered 1-Screen on Desktop) */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-4 pt-24 sm:pt-28 pb-8 flex-1 flex flex-col justify-center">
        {/* Header Title */}
        <div className="text-center text-white mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-2.5 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-purple-300" />
            <span>LOKASI &amp; KONTAK RESMI</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-1.5 drop-shadow-md">
            Hubungi &amp; Kunjungi Kami
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 font-normal max-w-lg mx-auto leading-relaxed drop-shadow-sm">
            Hanya 750 meter dari gerbang Bandara Pattimura Ambon. Resepsionis siap melayani Anda pukul 06:00 – 22:00 WIT.
          </p>
        </div>

        {/* 2-Column Info & Maps Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-7 border border-white/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch text-left">
          {/* Left Column: Direct Info & WhatsApp CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3.5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                    Alamat Penginapan
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Jl. Bandara Pattimura, Tawiri, Ambon, Maluku (750m dari terminal bandara).
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                    Jam Operasional &amp; Check-In
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Resepsionis Buka: <strong>06:00 – 22:00 WIT</strong> (Setiap Hari)
                  </p>
                </div>
              </div>

              {/* Quick Route Guide */}
              <div className="bg-purple-50/80 rounded-2xl p-3 sm:p-3.5 border border-purple-100/90 text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 font-extrabold text-purple-950 text-[11px]">
                  <Navigation className="w-3.5 h-3.5 text-purple-700" />
                  <span>Petunjuk Arah Cepat:</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Keluar gerbang bandara ➔ jalan 500m ke arah jalan utama ➔ belok kanan di Gapura Tawiri ➔ penginapan berada 250m di sebelah kiri.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-2">
              <Button
                asChild
                className="w-full rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm h-11 gap-2 shadow-md hover:shadow-lg transition-all"
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
          <div className="lg:col-span-6 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-700" />
                <span>Peta Interaktif Google Maps</span>
              </span>
              <a
                href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-purple-700 hover:text-purple-900 hover:underline"
              >
                Buka di Maps ➔
              </a>
            </div>

            <div className="relative h-48 sm:h-56 lg:h-64 w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-inner">
              <iframe
                title="Peta Lokasi Penginapan Annisa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.654877797746!2d128.0901237758778!3d-3.700344443422477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6ce845b58309df%3A0xe5a3c032a13f7076!2sBandar%20Udara%20Internasional%20Pattimura!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Compact Footer (1 Line) */}
      <footer className="relative z-10 py-3 text-center text-[11px] text-slate-300 border-t border-white/10">
        <p>© 2026 Penginapan Annisa • 750m dari Bandara Pattimura Ambon. Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}
