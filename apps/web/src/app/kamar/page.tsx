"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bed,
  Check,
  CheckCircle2,
  Clock,
  Lightbulb,
  MapPin,
  Moon,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Tv,
  Wifi,
} from "lucide-react";
import { Navbar } from "../../components/layout/navbar";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export default function KamarPage() {
  const [filter, setFilter] = useState<"all" | "ac" | "kipas" | "tersedia">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const rooms = [
    {
      number: "A1",
      name: "Kamar A1 — Tipe AC",
      type: "ac",
      status: "tersedia",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
      capacity: "2–3 Tamu",
      facilities: [
        "AC Dingin Nyaman",
        "Kamar Mandi Dalam Pribadi",
        "TV Layar Datar",
        "WiFi Gratis Kencang",
        "Handuk Bersih & Air Mineral",
      ],
      image: "/rooms/room-ac-101.jpg",
    },
    {
      number: "A2",
      name: "Kamar A2 — Tipe AC",
      type: "ac",
      status: "terisi",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
      capacity: "2–3 Tamu",
      facilities: [
        "AC Dingin Nyaman",
        "Kamar Mandi Dalam Pribadi",
        "TV Layar Datar",
        "WiFi Gratis Kencang",
        "Handuk Bersih & Air Mineral",
      ],
      image: "/rooms/room-ac-102.jpg",
    },
    {
      number: "A3",
      name: "Kamar A3 — Tipe Kipas",
      type: "kipas",
      status: "tersedia",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
      capacity: "2–3 Tamu",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam Pribadi",
        "TV Layar Datar",
        "WiFi Gratis Kencang",
        "Handuk Bersih & Air Mineral",
      ],
      image: "/rooms/room-kipas-201.jpg",
    },
    {
      number: "A4",
      name: "Kamar A4 — Tipe Kipas",
      type: "kipas",
      status: "tersedia",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
      capacity: "2–3 Tamu",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam Pribadi",
        "TV Layar Datar",
        "WiFi Gratis Kencang",
        "Handuk Bersih & Air Mineral",
      ],
      image: "/rooms/room-kipas-202.jpg",
    },
    {
      number: "B1",
      name: "Kamar B1 — Tipe AC",
      type: "ac",
      status: "tersedia",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
      capacity: "2–3 Tamu",
      facilities: [
        "AC Dingin Nyaman",
        "Kamar Mandi Dalam Pribadi",
        "TV Layar Datar",
        "WiFi Gratis Kencang",
        "Handuk Bersih & Air Mineral",
      ],
      image: "/rooms/room-ac-101.jpg",
    },
    {
      number: "B2",
      name: "Kamar B2 — Tipe AC",
      type: "ac",
      status: "tersedia",
      price: "275.000",
      dp: "137.500",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
      capacity: "2–3 Tamu",
      facilities: [
        "AC Dingin Nyaman",
        "Kamar Mandi Dalam Pribadi",
        "TV Layar Datar",
        "WiFi Gratis Kencang",
        "Handuk Bersih & Air Mineral",
      ],
      image: "/rooms/room-ac-102.jpg",
    },
    {
      number: "B3",
      name: "Kamar B3 — Tipe Kipas",
      type: "kipas",
      status: "terisi",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
      capacity: "2–3 Tamu",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam Pribadi",
        "TV Layar Datar",
        "WiFi Gratis Kencang",
        "Handuk Bersih & Air Mineral",
      ],
      image: "/rooms/room-kipas-201.jpg",
    },
    {
      number: "B4",
      name: "Kamar B4 — Tipe Kipas",
      type: "kipas",
      status: "tersedia",
      price: "200.000",
      dp: "100.000",
      bed: "1 Kasur Besar (Muat 2–3 Tamu)",
      capacity: "2–3 Tamu",
      facilities: [
        "Kipas Angin Dinding",
        "Kamar Mandi Dalam Pribadi",
        "TV Layar Datar",
        "WiFi Gratis Kencang",
        "Handuk Bersih & Air Mineral",
      ],
      image: "/rooms/room-kipas-202.jpg",
    },
  ];

  const filtered = rooms.filter((r) => {
    const matchCategory =
      filter === "all"
        ? true
        : filter === "tersedia"
        ? r.status === "tersedia"
        : r.type === filter;

    const matchSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bed.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      <Navbar />

      {/* ====================================================
          1. HERO BANNER WITH BACKGROUND IMAGE & SEARCH
          ==================================================== */}
      <section className="relative w-full h-[380px] sm:h-[460px] lg:h-[490px] flex items-center justify-center overflow-hidden">
        <Image
          src="/rooms/hero-kamar.jpg"
          alt="Penginapan Annisa Ambon"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-black/35" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-14 sm:pt-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 shadow-sm">
            <Bed className="w-3.5 h-3.5 text-purple-300" />
            <span>KATALOG 8 UNIT KAMAR TRANSIT</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md">
            Pilihan Kamar Transit Nyaman
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm mb-6 sm:mb-8">
            Hanya 750m (2–3 menit) dari Bandara Pattimura. 100% kamar mandi dalam, kasur besar muat 2–3 orang, TV, dan WiFi kencang.
          </p>

          {/* Floating Search Bar */}
          <div className="max-w-xl mx-auto bg-white rounded-full p-1.5 sm:p-2 shadow-2xl flex items-center gap-2 border border-white/80">
            <div className="pl-3.5 sm:pl-4 text-slate-400">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kode kamar (misal: A1, AC, Kipas)..."
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium outline-none py-1"
            />
            <Button
              type="button"
              className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2 h-9 sm:h-10 shrink-0 shadow-md transition-all cursor-pointer"
            >
              Cari
            </Button>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. FILTER PILLS (FLOATING)
          ==================================================== */}
      <section className="relative z-20 -mt-5 sm:-mt-6 max-w-3xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-1.5 sm:p-2 shadow-lg border border-slate-200/90 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-purple-700 text-white shadow-xs"
                : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
            }`}
          >
            Semua Kamar (8)
          </button>
          <button
            type="button"
            onClick={() => setFilter("ac")}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "ac"
                ? "bg-purple-700 text-white shadow-xs"
                : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
            }`}
          >
            Tipe AC (4)
          </button>
          <button
            type="button"
            onClick={() => setFilter("kipas")}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "kipas"
                ? "bg-purple-700 text-white shadow-xs"
                : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
            }`}
          >
            Tipe Kipas (4)
          </button>
          <button
            type="button"
            onClick={() => setFilter("tersedia")}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filter === "tersedia"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            🟢 Tersedia Saja
          </button>
        </div>
      </section>

      {/* ====================================================
          3. DUAL HIGHLIGHT & BOOKING GUIDE CARD
          ==================================================== */}
      <section className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 pb-8">
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-purple-100 shadow-sm p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Left Column: Standar Fasilitas */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-950 leading-tight">
                  Standar Kenyamanan Penginapan Annisa
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Seluruh 8 unit kamar kami dirancang khusus untuk kenyamanan istirahat transit Anda. Dilengkapi <strong className="text-slate-900 font-bold">1 kasur besar (muat 2–3 orang)</strong>, <strong className="text-slate-900 font-bold">100% kamar mandi dalam pribadi</strong>, TV layar datar, WiFi kencang, handuk bersih, dan air mineral. Pembedanya hanya pada pendingin ruangan (Tipe AC &amp; Tipe Kipas).
              </p>
            </div>

            {/* Right Column: Panduan Booking & Check-In */}
            <div className="lg:col-span-6 lg:border-l lg:border-purple-100 lg:pl-8">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-purple-800 block mb-3">
                PANDUAN BOOKING &amp; CHECK-IN
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold mt-0.5">✓</span>
                  <span>
                    <strong className="text-slate-900">Jarak Kilat 750m</strong> dari pintu gerbang terminal Bandara Pattimura (bebas macet).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold mt-0.5">✓</span>
                  <span>
                    <strong className="text-slate-900">Check-In Fleksibel 07:00–21:00 WIT</strong>, bisa langsung masuk jika unit telah siap.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold mt-0.5">✓</span>
                  <span>
                    Kunci jadwal kamar dengan <strong className="text-slate-900">Transfer DP 50% via WhatsApp</strong>, pelunasan saat tiba di lokasi.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. 8 ROOMS GRID CATALOG
          ==================================================== */}
      <section className="max-w-6xl mx-auto px-4 pt-2 pb-16 sm:pb-20">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
            Daftar Kamar Transit ({filtered.length} Unit)
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Harga transparan &bull; Tanpa biaya tersembunyi
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-500 text-sm font-medium">
              Tidak ditemukan unit kamar dengan kata kunci &quot;{searchQuery}&quot;.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setFilter("all");
              }}
              className="mt-3 rounded-full text-xs font-bold"
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filtered.map((room) => {
              const isAvailable = room.status === "tersedia";

              return (
                <Card
                  key={room.number}
                  className="overflow-hidden p-0 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className={`object-cover transition duration-300 ${
                          isAvailable ? "hover:scale-105" : "grayscale-[20%] opacity-90"
                        }`}
                      />
                      {/* 2 Status Badge: 🟢 Tersedia / 🔵 Terisi */}
                      <div className="absolute top-3 left-3">
                        {isAvailable ? (
                          <span className="bg-emerald-600/95 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Tersedia</span>
                          </span>
                        ) : (
                          <span className="bg-blue-600/95 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Terisi</span>
                          </span>
                        )}
                      </div>
                      {/* Room Number Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-purple-700 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                          #{room.number}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-1 mb-2">
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                            {room.name}
                          </h3>
                          <p className="text-xs text-purple-700 font-semibold mt-0.5">{room.bed}</p>
                        </div>
                      </div>

                      <div className="my-3 flex items-baseline justify-between border-y border-slate-100 py-2">
                        <div>
                          <span className="text-lg font-black text-purple-700">Rp {room.price}</span>
                          <span className="text-[10px] text-slate-500 font-medium"> / malam</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                          DP: <span className="text-purple-700">Rp {room.dp}</span>
                        </span>
                      </div>

                      {/* Facilities list */}
                      <ul className="space-y-1.5 mb-4">
                        {room.facilities.map((fac) => (
                          <li key={fac} className="flex items-center text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 mr-2 shrink-0" />
                            <span>{fac}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom WhatsApp Booking CTA */}
                  <div className="p-4 sm:p-5 pt-0">
                    {isAvailable ? (
                      <Button
                        asChild
                        variant="primary"
                        className="w-full rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold gap-2 text-xs h-10 shadow-xs"
                      >
                        <a
                          href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20tertarik%20reservasi%20Kamar%20${room.number}%20${encodeURIComponent(
                            room.name,
                          )}%20(Rp%20${room.price}/mlm).%20Apakah%20unit%20tersedia?`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Pesan via WhatsApp</span>
                        </a>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full rounded-xl border-slate-300 text-slate-700 hover:bg-slate-50 font-bold gap-2 text-xs h-10 shadow-2xs"
                      >
                        <a
                          href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20ingin%20tanya%20kapan%20Kamar%20${room.number}%20${encodeURIComponent(
                            room.name,
                          )}%20bisa%20dipesan%20kembali?`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Tanya Jadwal Kosong</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* ====================================================
          5. UNIFIED FOOTER SECTION
          ==================================================== */}
      <footer className="relative w-full bg-[#f8f6fc] text-slate-600 py-6 px-4 border-t border-purple-100/80 text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-purple-50 p-0.5 border border-purple-200">
              <Image src="/logo-penginapan-annisa.png" alt="Logo" fill className="object-contain" />
            </div>
            <p className="font-bold text-slate-900 text-xs">Penginapan Annisa Ambon</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] font-medium">
            <Link href="/" className="text-slate-600 hover:text-purple-700 transition">
              Beranda
            </Link>
            <Link href="/kamar" className="text-purple-700 font-bold transition">
              Tipe Kamar
            </Link>
            <Link href="/oleh-oleh" className="text-slate-600 hover:text-purple-700 transition">
              Oleh-oleh
            </Link>
            <Link href="/artikel" className="text-slate-600 hover:text-purple-700 transition">
              Artikel
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-purple-700 transition">
              Kontak
            </Link>
          </div>

          <p className="text-[10px] text-slate-500 text-center sm:text-right">
            © 2026 Penginapan Annisa • 750m Bandara Pattimura
          </p>
        </div>
      </footer>
    </div>
  );
}
