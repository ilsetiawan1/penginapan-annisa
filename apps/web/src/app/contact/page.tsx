import {
  Clock,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { Navbar } from "../../components/layout/navbar";
import { Button } from "../../components/ui/button";
import { ANNISA_WA_NUMBER } from "../../lib/whatsapp";

export default function ContactPage() {
  return (
    <div className="relative min-h-dvh w-full bg-[#faf9fc] flex flex-col justify-between overflow-x-hidden selection:bg-purple-200 selection:text-purple-900 pb-8 sm:pb-12">
      {/* Scenic Ambient Half-Hero Background (Konsisten dengan Halaman Lain) */}
      <div className="absolute inset-x-0 top-0 h-[52%] sm:h-[58%] overflow-hidden z-0">
        <Image
          src="/contact/bg-gong-perdamaian-kota-ambon.webp"
          alt="Gong Perdamaian Nusantara Kota Ambon - Penginapan Annisa"
          fill
          className="object-cover object-center scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-[#faf9fc] via-[#faf9fc]/90 to-transparent pointer-events-none" />
      </div>

      {/* Floating Modern Navbar */}
      <Navbar />

      {/* Main Content Showcase */}
      <main className="relative z-10 max-w-6xl mx-auto w-full px-3.5 sm:px-6 pt-16 sm:pt-20 lg:pt-24 flex-1 flex flex-col justify-center min-h-0">
        {/* Header Section (Font Serif Georgia Mewah) */}
        <div className="text-center text-white mb-5 sm:mb-8 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-2 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-purple-300" />
            <span>PENGINAPAN ANNISA AMBON</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight drop-shadow-md">
            Hubungi Kami
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-lg mx-auto leading-relaxed drop-shadow-xs mt-1.5">
            Hanya 750 meter atau 2–3 menit dari Bandara Pattimura. Resepsionis kami siap melayani
            reservasi dan pertanyaan Anda.
          </p>
        </div>

        {/* Showcase Box dengan Efek Glassmorphism Mewah (Backdrop Blur Transparan) */}
        <div className="bg-white/80 backdrop-blur-3xl rounded-3xl p-3.5 sm:p-6 lg:p-7 border border-white/90 shadow-2xl shadow-purple-950/15 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Kolom Kiri: Kartu Informasi Kontak Glassmorphism White Blur */}
          <div className="lg:col-span-5 bg-white/70 backdrop-blur-2xl text-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-purple-100/90 shadow-md shadow-purple-900/5">
            {/* Ornamen Glow Halus di Sudut Kartu */}
            <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-purple-300/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-36 h-36 bg-purple-200/20 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight leading-tight text-slate-900 mb-1.5">
                  Informasi Kontak
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Layanan resepsionis ramah, reservasi kamar transit, dan titip ambil oleh-oleh
                  khas Maluku.
                </p>
              </div>

              {/* Daftar Informasi Kontak */}
              <div className="space-y-4 pt-1">
                {/* 1. Telepon / WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-purple-800 uppercase tracking-wider block">
                      Telepon / WhatsApp
                    </span>
                    <a
                      href={`https://wa.me/${ANNISA_WA_NUMBER}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm font-extrabold text-slate-900 hover:text-purple-700 transition-colors"
                    >
                      0812-4216-3116
                    </a>
                  </div>
                </div>

                {/* 2. Jam Operasional */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-purple-800 uppercase tracking-wider block">
                      Jam Resepsionis
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                      06:00 – 22:00 WIT
                    </p>
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      Check-in fleksibel penerbangan
                    </span>
                  </div>
                </div>

                {/* 3. Alamat Lengkap */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-purple-800 uppercase tracking-wider block">
                      Alamat Penginapan
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                      Jl. Bandara Pattimura, Tawiri, Ambon
                    </p>
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      750 meter dari gerbang bandara
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Aksi WhatsApp Bergradasi Mewah */}
            <div className="relative z-10 pt-6 mt-4 border-t border-purple-100/90">
              <Button
                asChild
                className="w-full rounded-xl sm:rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm h-11 gap-2 shadow-md shadow-purple-900/20 hover:shadow-lg transition-all cursor-pointer"
              >
                <a
                  href={`https://wa.me/${ANNISA_WA_NUMBER}?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20informasi%20kamar%20dan%20lokasi`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Chat WhatsApp Resmi</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Kolom Kanan: Frame Visual Google Maps */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3 p-1 sm:p-2">
            <div className="flex items-center justify-between px-1">
              <div>
                <span className="text-xs sm:text-sm font-serif font-black text-slate-900 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-purple-700" />
                  <span>Peta Lokasi Google Maps</span>
                </span>
                <p className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                  Petunjuk rute langsung 750 meter dari terminal Bandara Pattimura.
                </p>
              </div>

              <a
                href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-1 hover:underline transition-colors shrink-0"
              >
                <span>Buka Petunjuk Arah</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Maps Frame */}
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[260px] sm:min-h-[340px] w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner">
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
    </div>
  );
}
