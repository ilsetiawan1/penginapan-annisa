import { Bed, Clock, MapPin, Phone, ShieldCheck, Sparkles, Utensils, Wifi } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Banner Notice */}
      <div className="bg-emerald-700 text-white px-4 py-2 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
        <MapPin className="w-4 h-4 text-emerald-200" />
        <span>Lokasi Strategis: Hanya 750 Meter (2-3 Menit) dari Bandara Pattimura Ambon</span>
      </div>

      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-emerald-600/20">
              A
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-slate-900">Penginapan Annisa</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Transit Homestay Pattimura
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://wa.me/6281242163116"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi WA</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>Check-in Fleksibel 24 Jam • Bebas Ketinggalan Pesawat</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
          Istirahat Nyaman & Tenang Dekat{" "}
          <span className="text-emerald-600">Bandara Pattimura</span> Ambon
        </h2>
        <p className="text-slate-600 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Pilihan terbaik untuk penumpang transit, penerbangan subuh/pagi, atau perjalanan dinas.
          Kamar bersih dengan AC / Kipas, kamar mandi dalam, dan WiFi kencang.
        </p>

        {/* 8 Rooms Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left max-w-4xl mx-auto">
          {/* Card AC */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
                  4 UNIT TERSEDIA
                </span>
                <h3 className="text-xl font-bold text-slate-900">Kamar AC Superior</h3>
                <p className="text-sm text-slate-500 mt-1">Kapasitas 2–3 Orang • 1 King Bed</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-emerald-600">Rp 275.000</p>
                <p className="text-xs text-slate-400">/ malam (DP 50%)</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600 pt-4 border-t border-slate-100">
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">✓ AC Dingin</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">✓ Kamar Mandi Dalam</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">✓ WiFi Gratis</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">✓ TV</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">✓ Handuk Bersih</span>
            </div>
          </div>

          {/* Card Kipas */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold mb-2">
                  4 UNIT TERSEDIA
                </span>
                <h3 className="text-xl font-bold text-slate-900">Kamar Kipas Standar</h3>
                <p className="text-sm text-slate-500 mt-1">Kapasitas 2–3 Orang • Ekonomis</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-slate-800">Rp 200.000</p>
                <p className="text-xs text-slate-400">/ malam (DP 50%)</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600 pt-4 border-t border-slate-100">
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">✓ Kipas Angin</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">✓ Kamar Mandi Dalam</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">✓ WiFi Gratis</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">✓ TV</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">✓ Handuk Bersih</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
