"use client";

import { Clock, ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { ANNISA_WA_NUMBER } from "@/lib/whatsapp";

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section Standar Konsisten dengan /artikel, /oleh-oleh, dan /kamar */}
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
            Hanya 750 meter atau 2–3 menit dari Bandara Pattimura. Resepsionis
            kami siap melayani reservasi dan pertanyaan Anda.
          </p>
        </div>
      </section>

      {/* 2. Main Showcase Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20 pb-16 sm:pb-20">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 lg:p-8 border border-purple-100/90 shadow-2xl shadow-purple-950/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Kolom Kiri: Kartu Informasi Kontak Glassmorphism */}
          <div className="lg:col-span-5 bg-[#f8f5fd] backdrop-blur-md text-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-purple-100 shadow-sm">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight leading-tight text-slate-900 mb-1.5">
                  Informasi Kontak
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Kenyamanan transit Anda adalah prioritas kami.
                </p>
              </div>

              {/* Rincian Alamat */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Alamat Lengkap</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Jl. Dr. J. Leimena, Laha, Kec. Teluk Ambon, Kota Ambon, Maluku (750m dari Bandara Pattimura)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Jam Layanan</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Resepsionis 24 Jam (Check-in Fleksibel & Antar-Jemput)
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${ANNISA_WA_NUMBER}?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20bertanya%20informasi%20kamar.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-sm transition group"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-700 group-hover:text-white transition">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition">
                      WhatsApp &amp; Telepon
                    </h3>
                    <p className="text-xs text-purple-700 font-bold mt-0.5">
                      +{ANNISA_WA_NUMBER} ➔
                    </p>
                  </div>
                </a>
              </div>

              <Button
                asChild
                className="w-full bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-950/15 h-11"
              >
                <a
                  href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Buka Rute di Google Maps (750m)</span>
                </a>
              </Button>
            </div>
          </div>


          {/* Kolom Kanan: Frame Visual Google Maps */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3 p-1 sm:p-2">
            <div className="flex items-center justify-between gap-2 px-1">
              <div>
                <span className="text-xs sm:text-base font-serif font-black text-slate-900 flex items-center gap-1.5 whitespace-nowrap">
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-700 shrink-0" />
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
                className="text-[11px] sm:text-xs font-extrabold text-purple-700 hover:text-purple-900 flex items-center gap-1 hover:underline transition-colors shrink-0 whitespace-nowrap"
              >
                <span>Petunjuk Arah</span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
            </div>

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
