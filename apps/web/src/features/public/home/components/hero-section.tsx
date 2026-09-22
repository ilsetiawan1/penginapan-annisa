import { Bed, Clock, MapPin, Plane, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BookingWidget } from "./booking-widget";

export function HeroSection() {
  return (
    <section className="relative w-full pt-24 sm:pt-28 pb-10 sm:pb-14 xl:min-h-screen xl:h-screen xl:pt-16 xl:pb-0 flex flex-col justify-center px-4 overflow-hidden">
      {/* Background Image Pattimura */}
      <Image
        src="/home/bg-pattimura-airport.jpg"
        alt="Bandara Internasional Pattimura Ambon"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Top and Center Dark Overlay for Maximum Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/55 to-slate-950/30" />

      {/* Smooth Bottom White Fade Transition before next section */}
      <div className="absolute inset-x-0 bottom-0 h-36 sm:h-52 bg-gradient-to-t from-[#faf9fc] via-[#faf9fc]/85 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Headline & Value Proposition */}
        <div className="lg:col-span-7 text-left space-y-3 sm:space-y-4">
          {/* Top Pill Badge */}
          <a
            href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] sm:text-xs font-bold shadow-sm hover:bg-white/30 transition"
          >
            <MapPin className="w-3.5 h-3.5 text-purple-300" />
            <span>Rute ke Bandara di Google Maps ➔</span>
          </a>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight sm:leading-[1.15] drop-shadow-md">
            Penginapan Transit Nyaman Dekat{" "}
            <span className="text-purple-300">Bandara Pattimura</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal leading-relaxed max-w-xl drop-shadow-sm">
            Solusi istirahat ideal untuk penerbangan subuh, transit dinas, dan
            wisata di Ambon. Bersih, tenang, dan bebas macet.
          </p>

          {/* 4 Quick Info Cards (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-2.5 pt-1 pb-1">
            <div className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-white/20 text-purple-300 flex items-center justify-center shrink-0">
                <Plane className="w-4 h-4" />
              </div>
              <div>
                <p className="font-extrabold text-xs text-white leading-tight">
                  3 Mnt Bandara
                </p>
                <p className="text-[10px] text-slate-200">750m ke terminal</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-white/20 text-purple-300 flex items-center justify-center shrink-0">
                <Bed className="w-4 h-4" />
              </div>
              <div>
                <p className="font-extrabold text-xs text-white leading-tight">
                  8 Unit Kamar
                </p>
                <p className="text-[10px] text-slate-200">4 AC &amp; 4 Kipas</p>
              </div>
            </div>

            <Link
              href="/kamar"
              className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl hover:from-purple-800 hover:to-indigo-700 transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                <Bed className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-extrabold text-xs leading-tight flex items-center gap-1 text-white">
                  <span>Lihat Kamar</span>
                  <span className="group-hover:translate-x-1 transition-transform text-xs">
                    ➔
                  </span>
                </p>
                <p className="text-[10px] text-purple-100 font-medium">
                  8 Unit AC &amp; Kipas
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/25 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-white/20 text-purple-300 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-extrabold text-xs text-white leading-tight">
                  06:00–22:00 WIT
                </p>
                <p className="text-[10px] text-slate-200">Buka Tiap Hari</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Booking Form Widget */}
        <div className="lg:col-span-5 relative z-10">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}
