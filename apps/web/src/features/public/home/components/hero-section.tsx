import Link from "next/link";
import { Bed, Clock, MapPin, Plane, ShieldCheck } from "lucide-react";
import { BookingWidget } from "./booking-widget";

export function HeroSection() {
  return (
    <section className="relative w-full pt-24 sm:pt-28 pb-10 sm:pb-14 xl:min-h-screen xl:h-screen xl:pt-16 xl:pb-0 flex flex-col justify-center px-4">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Headline & Value Proposition */}
        <div className="lg:col-span-7 text-left space-y-3 sm:space-y-4">
          {/* Top Pill Badge */}
          <a
            href="https://maps.app.goo.gl/PskXAUZuGD7NeMoL7"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-800 text-[11px] sm:text-xs font-bold shadow-2xs hover:bg-purple-100 transition"
          >
            <MapPin className="w-3.5 h-3.5 text-purple-700" />
            <span>Rute ke Bandara di Google Maps ➔</span>
          </a>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-tight sm:leading-[1.15]">
            Penginapan Transit Nyaman Dekat{" "}
            <span className="text-purple-700">Bandara Pattimura</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
            Solusi istirahat ideal untuk penerbangan subuh, transit dinas, dan wisata di Ambon. Bersih, tenang, dan bebas macet.
          </p>

          {/* 4 Quick Info Cards (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-2.5 pt-1 pb-1">
            <div className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-purple-100 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Plane className="w-4 h-4" />
              </div>
              <div>
                <p className="font-extrabold text-xs text-slate-900 leading-tight">3 Mnt Bandara</p>
                <p className="text-[10px] text-slate-500">750m ke terminal</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-purple-100 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Bed className="w-4 h-4" />
              </div>
              <div>
                <p className="font-extrabold text-xs text-slate-900 leading-tight">8 Unit Kamar</p>
                <p className="text-[10px] text-slate-500">4 AC &amp; 4 Kipas</p>
              </div>
            </div>

            <Link
              href="/kamar"
              className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white rounded-2xl shadow-md hover:shadow-lg hover:from-purple-800 hover:to-indigo-700 transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                <Bed className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-extrabold text-xs leading-tight flex items-center gap-1 text-white">
                  <span>Lihat Kamar</span>
                  <span className="group-hover:translate-x-1 transition-transform text-xs">➔</span>
                </p>
                <p className="text-[10px] text-purple-100 font-medium">8 Unit AC &amp; Kipas</p>
              </div>
            </Link>

            <div className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-purple-100 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-extrabold text-xs text-slate-900 leading-tight">06:00–22:00 WIT</p>
                <p className="text-[10px] text-slate-500">Buka Tiap Hari</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Booking Calculator Widget */}
        <div className="lg:col-span-5">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}
