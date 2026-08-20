"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronDown,
  Clock,
  Compass,
  Lightbulb,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { Navbar } from "../../components/layout/navbar";
import { Button } from "../../components/ui/button";

export default function ArtikelPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Semua",
    "Wisata Pantai",
    "Kuliner Khas",
    "Tips Transit",
    "Oleh-oleh",
    "Budaya Maluku",
  ];

  const articles = [
    {
      id: "1",
      slug: "bermain-perahu-di-pantai-liang",
      title: "Pesona Air Jernih dan Sensasi Bermain Perahu di Pantai Liang Ambon",
      category: "Wisata Pantai",
      readTime: "4 Menit",
      date: "19 Agustus 2026",
      desc: "Pantai Liang dinobatkan sebagai salah satu pantai terindah di Indonesia dengan gradasi air biru toska dan pasir putih yang memukau.",
      image: "/artikel/bermain-perahu-di-pantai-liang.jpg",
      author: "Tim Redaksi Annisa",
    },
    {
      id: "2",
      slug: "kenikmatan-rujak-natsepa-tepi-pantai",
      title: "Menikmati Gurih & Segarnya Rujak Natsepa Asli di Pinggir Pantai Ambon",
      category: "Kuliner Khas",
      readTime: "3 Menit",
      date: "18 Agustus 2026",
      desc: "Kombinasi buah-buahan tropis segar berlumur bumbu kacang gula aren khas Maluku yang wajib dicicipi saat mendarat di Ambon.",
      image: "/artikel/rujak-natsepa-ambon.jpg",
      author: "Wisata Kuliner",
    },
    {
      id: "3",
      slug: "menjelajah-tebing-eksotis-pintu-kota-ambon",
      title: "Eksplorasi Tebing Karang Ikonik Pintu Kota dengan Pemandangan Laut Lepas",
      category: "Wisata Pantai",
      readTime: "4 Menit",
      date: "16 Agustus 2026",
      desc: "Monumen alam berupa tebing berlubang menembus laut lepas yang menjadi spot foto paling populer bagi wisatawan di Ambon.",
      image: "/artikel/pintu-kota-ambon.jpg",
      author: "Pemandu Lokal",
    },
    {
      id: "4",
      slug: "tips-transit-nyaman-bandara-pattimura",
      title: "Tips Transit Nyaman dan Bebas Ketinggalan Pesawat di Bandara Pattimura",
      category: "Tips Transit",
      readTime: "3 Menit",
      date: "14 Agustus 2026",
      desc: "Solusi istirahat ideal untuk penerbangan pagi. Istirahat berkualitas hanya 750 meter (3 menit) dari gerbang bandara.",
      image: "/rooms/room-ac-101.jpg",
      author: "Penginapan Annisa",
    },
  ];

  const filteredArticles = articles.filter((art) => {
    const matchCategory =
      activeCategory === "Semua" || art.category === activeCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9fc] text-slate-900 font-sans selection:bg-purple-200 selection:text-purple-900">
      <Navbar />

      {/* ====================================================
          1. HERO BANNER WITH BACKGROUND IMAGE & SEARCH
          ==================================================== */}
      <section className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] flex items-center justify-center overflow-hidden">
        {/* Background Image: bermain-perahu-di-pantai-liang.jpg */}
        <Image
          src="/artikel/bermain-perahu-di-pantai-liang.jpg"
          alt="Pantai Liang Ambon"
          fill
          className="object-cover"
          priority
        />

        {/* Ambient Dark Gradient Wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-black/35" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-14 sm:pt-16">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-purple-300" />
            <span>BLOG PENGINAPAN ANNISA</span>
          </div>

          {/* Bold Punchy Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md">
            Inspirasi Liburan &amp; Tips Wisata
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm mb-6 sm:mb-8">
            Temukan panduan wisata pantai eksotis, rekomendasi kuliner khas Maluku, dan tips transit nyaman di Ambon...
          </p>

          {/* Floating Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-full p-1.5 sm:p-2 shadow-2xl flex items-center gap-2 border border-white/80">
            <div className="pl-3.5 sm:pl-4 text-slate-400">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel atau destinasi..."
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium outline-none py-1"
            />
            <Button
              type="button"
              className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm px-5 sm:px-7 py-2 h-9 sm:h-10 shrink-0 shadow-md transition-all cursor-pointer"
            >
              Cari
            </Button>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. CATEGORY PILLS FILTER BAR
          ==================================================== */}
      <section className="relative z-20 -mt-5 sm:-mt-6 max-w-4xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-1.5 sm:p-2 shadow-lg border border-slate-200/90 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-purple-700 text-white shadow-xs"
                    : "text-slate-600 hover:text-purple-700 hover:bg-purple-50/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* ====================================================
          3. FEATURED HIGHLIGHT / EXPLORATION CARD
          ==================================================== */}
      <section className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 pb-8">
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-purple-100 shadow-sm p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Left Column: Eksplorasi Seputar Kota Ambon & Pantai Liang */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-950 leading-tight">
                  Eksplorasi Seputar Kota Ambon &amp; Pantai Liang
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ambon Manise selalu menawarkan pengalaman liburan dan transit yang tak terlupakan. Mulai dari keindahan wisata <strong className="text-slate-900 font-bold">pantai pasir putih Liang</strong>, pesona tebing karang <strong className="text-slate-900 font-bold">Pintu Kota</strong>, hingga aneka <strong className="text-slate-900 font-bold">kuliner khas</strong> seperti Rujak Natsepa dan ikan bakar segar. Dapatkan semua informasi menarik dan rekomendasi liburan terbaiknya hanya di Blog Penginapan Annisa.
              </p>
            </div>

            {/* Right Column: Panduan Liburan & Transit */}
            <div className="lg:col-span-6 lg:border-l lg:border-purple-100 lg:pl-8">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-purple-800 block mb-3">
                PANDUAN LIBURAN &amp; TRANSIT
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold mt-0.5">✓</span>
                  <span>
                    Pilih penginapan transit <strong className="text-slate-900">750m dari Bandara Pattimura</strong> untuk kemudahan mobilitas tanpa risiko macet.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold mt-0.5">✓</span>
                  <span>
                    Cicipi <strong className="text-slate-900">Rujak Natsepa &amp; Ikan Bakar</strong> khas pesisir pantai di sore hari saat matahari terbenam.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold mt-0.5">✓</span>
                  <span>
                    Sediakan waktu 45–60 menit dari penginapan menuju <strong className="text-slate-900">Pantai Liang</strong> untuk sewa perahu &amp; snorkeling.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. ARTIKEL TERBARU SECTION
          ==================================================== */}
      <section className="max-w-5xl mx-auto px-4 pt-2 pb-16 sm:pb-20">
        {/* Section Header with Sort Option */}
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
            Artikel Terbaru
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold cursor-pointer hover:text-purple-700 transition">
            <span>URUTKAN:</span>
            <span className="text-purple-700 font-bold flex items-center gap-0.5">
              Terbaru <ChevronDown className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-500 text-sm font-medium">
              Tidak ditemukan artikel dengan kata kunci &quot;{searchQuery}&quot;.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Semua");
              }}
              className="mt-3 rounded-full text-xs font-bold"
            >
              Reset Pencarian
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-purple-700 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        {art.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Info */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-400 font-medium mb-2">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {art.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-purple-700 font-semibold">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-purple-700 transition leading-snug line-clamp-2 mb-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {art.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Read More Action */}
                <div className="p-4 sm:p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:text-purple-800">
                    <span className="text-[11px] text-slate-500 font-normal">{art.author}</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
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
            <Link href="/kamar" className="text-slate-600 hover:text-purple-700 transition">
              Tipe Kamar
            </Link>
            <Link href="/oleh-oleh" className="text-slate-600 hover:text-purple-700 transition">
              Oleh-oleh
            </Link>
            <Link href="/artikel" className="text-purple-700 font-bold transition">
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
