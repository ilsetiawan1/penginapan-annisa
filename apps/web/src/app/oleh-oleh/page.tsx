"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  Lightbulb,
  PackageCheck,
  Phone,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Navbar } from "../../components/layout/navbar";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export default function OlehOlehPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Semua",
    "Herbal & Minyak",
    "Camilan Sagu",
    "Kopi & Rempah",
    "Sambal & Bumbu",
  ];

  const souvenirs = [
    {
      name: "Minyak Kayu Putih Asli Namlea (100ml)",
      category: "Herbal & Minyak",
      price: "Rp 65.000",
      desc: "Penyulingan murni 100% asli Pulau Buru Namlea. Hangat alami, aroma menenangkan, dan membantu meredakan masuk angin.",
      image:
        "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
      origin: "Namlea, Pulau Buru",
    },
    {
      name: "Kue Sagu Bagea Kenari Ambon",
      category: "Camilan Sagu",
      price: "Rp 35.000",
      desc: "Kue sagu renyah gurih berpadu dengan cacahan biji kenari melimpah khas kepulauan Maluku.",
      image:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
      origin: "Ambon Manise",
    },
    {
      name: "Roti Kenari Khas Maluku (1 Kotak)",
      category: "Camilan Sagu",
      price: "Rp 45.000",
      desc: "Roti panggang kering renyah dengan taburan gula manis dan kenari gurih harum berlimpah.",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
      origin: "Khas Kepulauan Ambon",
    },
    {
      name: "Kopi Rarobang Rempah Ambon",
      category: "Kopi & Rempah",
      price: "Rp 40.000",
      desc: "Kopi khas Ambon dengan racikan jahe merah, cengkeh, kayu manis, dan taburan kenari sangrai.",
      image:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
      origin: "Racikan Rempah Tradisional",
    },
    {
      name: "Halua Kenari Gula Aren Maluku",
      category: "Camilan Sagu",
      price: "Rp 38.000",
      desc: "Biji kenari pilihan disangrai dan dibalut karamel gula aren murni khas Saparua Maluku.",
      image:
        "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600&auto=format&fit=crop",
      origin: "Saparua, Maluku",
    },
    {
      name: "Sambal Roa Khas Kepulauan Ambon",
      category: "Sambal & Bumbu",
      price: "Rp 50.000",
      desc: "Sambal ikan asap pedas gurih, pas untuk lauk pelengkap santapan maupun buah tangan praktis.",
      image:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=600&auto=format&fit=crop",
      origin: "Pesisir Maluku",
    },
  ];

  const filteredSouvenirs = souvenirs.filter((item) => {
    const matchCategory =
      activeCategory === "Semua" || item.category === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase());
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
          src="/oleh-oleh/hero-oleh-oleh.jpg"
          alt="Oleh-oleh Khas Ambon Maluku"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-black/35" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white pt-14 sm:pt-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 shadow-sm">
            <Gift className="w-3.5 h-3.5 text-purple-300" />
            <span>ETALASE RESEPSIONIS ANNISA</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md">
            Oleh-oleh Khas Ambon &amp; Maluku
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm mb-6 sm:mb-8">
            Dapatkan produk cinderamata, minyak kayu putih Namlea murni, dan camilan khas otentik langsung di resepsionis Penginapan Annisa.
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
              placeholder="Cari oleh-oleh (misal: Minyak Kayu Putih, Bagea)..."
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
          3. DUAL HIGHLIGHT & SHOPPING GUIDE CARD
          ==================================================== */}
      <section className="max-w-5xl mx-auto px-4 pt-10 sm:pt-14 pb-8">
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-purple-100 shadow-sm p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Left Column: Jaminan Keaslian */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-950 leading-tight">
                  Jaminan Produk Otentik Khas Maluku
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Semua produk etalase kami dikurasi langsung dari pengrajin dan produsen terpercaya di Maluku. Mulai dari <strong className="text-slate-900 font-bold">Minyak Kayu Putih Namlea asli Pulau Buru</strong> tanpa campuran, camilan renyah <strong className="text-slate-900 font-bold">Bagea &amp; Roti Kenari</strong>, hingga racikan kopi rempah khas pesisir Ambon.
              </p>
            </div>

            {/* Right Column: Kemudahan Belanja di Penginapan */}
            <div className="lg:col-span-6 lg:border-l lg:border-purple-100 lg:pl-8">
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-purple-800 block mb-3">
                KEMUDAHAN BELANJA DI RESEPSIONIS
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold mt-0.5">✓</span>
                  <span>
                    <strong className="text-slate-900">Praktis &amp; Hemat Waktu:</strong> Tersedia langsung di meja resepsionis tanpa perlu keliling pasar kota.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold mt-0.5">✓</span>
                  <span>
                    <strong className="text-slate-900">Kemasan Aman Bagasi:</strong> Botol dan kotak makanan dikemas rapi &amp; aman untuk penerbangan.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold mt-0.5">✓</span>
                  <span>
                    <strong className="text-slate-900">Pesan Awal via WA:</strong> Bisa titip stok sebelum check-out agar siap saat Anda berangkat ke bandara.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. SOUVENIR PRODUCTS GRID
          ==================================================== */}
      <section className="max-w-6xl mx-auto px-4 pt-2 pb-16 sm:pb-20">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight">
            Daftar Produk Oleh-oleh ({filteredSouvenirs.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Tersedia langsung di Resepsionis Annisa
          </span>
        </div>

        {filteredSouvenirs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-500 text-sm font-medium">
              Tidak ditemukan produk oleh-oleh dengan kata kunci &quot;{searchQuery}&quot;.
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
              Reset Filter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredSouvenirs.map((item) => (
              <Card
                key={item.name}
                className="overflow-hidden p-0 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-slate-900/90 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
                      📍 {item.origin}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1 leading-snug group-hover:text-purple-700 transition">
                      {item.name}
                    </h3>
                    <p className="text-base sm:text-lg font-black text-purple-700 mb-2">
                      {item.price}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    className="w-full justify-center gap-2 rounded-xl font-bold text-xs bg-purple-700 hover:bg-purple-800 text-white shadow-xs h-10"
                  >
                    <a
                      href={`https://wa.me/6281242163116?text=Halo%20Penginapan%20Annisa,%20saya%20tertarik%20membeli%20oleh-oleh%20${encodeURIComponent(
                        item.name,
                      )}%20(${item.price}).%20Apakah%20stok%20tersedia?`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Pesan / Tanya Stok via WA</span>
                    </a>
                  </Button>
                </div>
              </Card>
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
            <Link href="/oleh-oleh" className="text-purple-700 font-bold transition">
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
