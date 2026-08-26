"use client";

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
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      {/* 1. Navbar Floating Konsisten */}
      <Navbar />

      {/* 2. Hero Section Standar Konsisten dengan /artikel, /oleh-oleh, dan /kamar */}
      <section className="relative w-full h-[380px] sm:h-[460px] lg:h-[490px] flex items-center justify-center overflow-hidden">
        <Image
          src="/contact/bg-gong-perdamaian-kota-ambon.webp"
          alt="Gong Perdamaian Nusantara Kota Ambon - Penginapan Annisa"
          fill
          className="object-cover"
          priority
        />
        {/* Top Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/45 to-transparent" />
        {/* Smooth Bottom White Fade Transition */}
        <div className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-[#faf9fc] via-[#faf9fc]/85 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-14 sm:pt-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-purple-300" />
            <span>PENGINAPAN ANNISA AMBON</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md">
            Hubungi Kami
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm mb-6 sm:mb-8">
            Hanya 750 meter atau 2–3 menit dari Bandara Pattimura. Resepsionis kami siap melayani
            reservasi dan pertanyaan Anda.
          </p>
        </div>
      </section>

      {/* 3. Main Showcase Section (Konsisten dengan Padding & Container /artikel dan /oleh-oleh) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20 pb-16 sm:pb-20">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 lg:p-8 border border-purple-100/90 shadow-2xl shadow-purple-950/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Kolom Kiri: Kartu Informasi Kontak Glassmorphism */}
          <div className="lg:col-span-5 bg-[#f8f5fd] backdrop-blur-md text-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-purple-100 shadow-sm">
            {/* Ornamen Glow Halus */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight leading-tight text-slate-900 mb-1.5">
                  Informasi Kontak
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Layanan resepsionis ramah, reservasi kamar transit, dan titip ambil oleh-oleh
                  khas Maluku.
                </p>
              </div>

              {/* Daftar Informasi Kontak */}
              <div className="space-y-4 pt-1">
                {/* 1. Telepon / WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                    <Phone className="w-4.5 h-4.5" />
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
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock className="w-4.5 h-4.5" />
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
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 border border-purple-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-4.5 h-4.5" />
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

            {/* Tombol Aksi WhatsApp */}
            <div className="relative z-10 pt-6 mt-4 border-t border-purple-100">
              <Button
                asChild
                className="w-full rounded-xl sm:rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm h-11 sm:h-12 gap-2 shadow-md shadow-purple-900/20 hover:shadow-lg transition-all cursor-pointer"
              >
                <a
                  href={`https://wa.me/${ANNISA_WA_NUMBER}?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20informasi%20kamar%20dan%20lokasi`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  <span>Chat WhatsApp Resmi</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Kolom Kanan: Frame Visual Google Maps */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3 p-1 sm:p-2">
            <div className="flex items-center justify-between px-1">
              <div>
                <span className="text-sm sm:text-base font-serif font-black text-slate-900 flex items-center gap-1.5">
                  <Navigation className="w-4 h-4 text-purple-700" />
                  <span>Peta Lokasi Google Maps</span>
                </span>
                <p className="text-xs text-slate-500 hidden sm:block mt-0.5">
                  Petunjuk rute langsung 750 meter dari terminal Bandara Pattimura.
                </p>
              </div>

              <a
                href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-1 hover:underline transition-colors shrink-0"
              >
                <span>Buka Petunjuk Arah</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Google Maps Frame */}
            <div className="relative h-72 sm:h-84 lg:h-full min-h-[280px] sm:min-h-[360px] w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner">
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
