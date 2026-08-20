import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, MapPin, Plane, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { BookingWidget } from "./booking-widget";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen lg:h-screen flex flex-col justify-center pt-24 sm:pt-28 lg:pt-16 pb-8 lg:pb-0 px-4">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Headline & Value Proposition */}
        <div className="lg:col-span-7 text-left space-y-3 sm:space-y-4">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-800 text-[11px] sm:text-xs font-bold shadow-2xs">
            <Plane className="w-3.5 h-3.5 text-purple-700" />
            <span>PENGINAPAN TRANSIT RESMI • 750M DARI BANDARA PATTIMURA</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 leading-tight sm:leading-[1.15]">
            Transit Nyaman, Bersih, &amp; Bebas Ketinggalan Pesawat di Ambon.
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
            Solusi istirahat ideal untuk penerbangan pagi atau jeda transit panjang. Hanya 2–3 menit ke terminal bandara, 100% kamar mandi dalam, kasur besar muat 2–3 orang, WiFi kencang, dan check-in fleksibel 24 jam.
          </p>

          {/* Value Checklist Pills */}
          <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 p-2 rounded-xl border border-purple-100 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
              <span>750m dari Bandara</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 p-2 rounded-xl border border-purple-100 shadow-2xs">
              <Clock className="w-4 h-4 text-purple-700 shrink-0" />
              <span>Check-in Fleksibel 24 Jam</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 p-2 rounded-xl border border-purple-100 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
              <span>100% Kamar Mandi Dalam</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/80 p-2 rounded-xl border border-purple-100 shadow-2xs">
              <Sparkles className="w-4 h-4 text-purple-700 shrink-0" />
              <span>Cukup DP 50%</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              asChild
              className="rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm px-6 h-11 shadow-md gap-2"
            >
              <Link href="/kamar">
                <span>Lihat 8 Unit Kamar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-2xl border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs sm:text-sm px-5 h-11 shadow-2xs"
            >
              <Link href="/oleh-oleh">
                <span>Etalase Oleh-oleh</span>
              </Link>
            </Button>
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
