"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import { ANNISA_WA_NUMBER } from "../../../../lib/whatsapp";

interface SouvenirProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  priceNum: number;
  desc: string;
  image: string;
}

const SOUVENIR_COLLECTION: SouvenirProduct[] = [
  {
    id: 1,
    name: "Minyak Cengkeh Asli",
    category: "Minyak & Herbal Alami",
    price: "Rp 55.000",
    priceNum: 55000,
    desc: "Ekstraksi murni bunga cengkeh pilihan tanah Maluku, hangat & berkhasiat.",
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Minyak Kayu Putih Namlea",
    category: "Minyak & Herbal Alami",
    price: "Rp 65.000",
    priceNum: 65000,
    desc: "Penyulingan murni tradisional kualitas nomor satu, aroma khas menenangkan.",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Kue Sagu Bagea Kenari",
    category: "Camilan Khas Maluku",
    price: "Rp 35.000",
    priceNum: 35000,
    desc: "Kue sagu renyah bertabur kenari gurih, teman kopi & teh saat transit.",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Kacang Botol Gurih Ambon",
    category: "Camilan Khas Maluku",
    price: "Rp 45.000",
    priceNum: 45000,
    desc: "Kacang renyah bumbu rempah khas Ambon Manise dalam botol praktis.",
    image:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Abon Ikan Cakalang Asap",
    category: "Olahan Ikan Laut",
    price: "Rp 50.000",
    priceNum: 50000,
    desc: "Abon cakalang asap gurih rempah asli Maluku, siap santap & tahan lama.",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop",
  },
];

export function HomeSouvenirsPreview() {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default Tengah

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SOUVENIR_COLLECTION.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SOUVENIR_COLLECTION.length - 1 ? 0 : prev + 1));
  };

  const getItemWaUrl = (item: SouvenirProduct) => {
    const text = `Halo Resepsionis Penginapan Annisa, saya ingin pesan/titip oleh-oleh:
• Produk: *${item.name}*
• Kategori: *${item.category}*
• Harga: *${item.price}*
• Pengambilan: *Self Pick-Up di Resepsionis Annisa (750m Bandara Pattimura)*

Apakah stoknya tersedia untuk saya ambil saat transit? Terima kasih! 🙏`;
    return `https://wa.me/${ANNISA_WA_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full relative overflow-hidden py-4 sm:py-6">
      {/* Header Elegan dengan Font Serif */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-4">
        <span className="text-[11px] font-black uppercase tracking-widest text-purple-700 block mb-1.5">
          OLEH-OLEH KHAS RESEPSIONIS
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-900 leading-tight">
          Produk Unggulan &amp; Paling Dicari
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Tersedia langsung di etalase meja resepsionis. Anda bisa titip stok lebih awal via WhatsApp
          dan ambil langsung saat transit di penginapan.
        </p>
      </div>

      {/* 3D Smooth Sliding Carousel Track */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-12">
        {/* Tombol Navigasi Kiri */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Produk Sebelumnya"
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-purple-700 hover:scale-110 shadow-lg flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Tombol Navigasi Kanan */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Produk Berikutnya"
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-purple-700 hover:scale-110 shadow-lg flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Viewport Track (Translasi Berbasis Lebar Tetap = Nol Glitch) */}
        <div className="overflow-hidden w-full py-6">
          <div
            className="flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            style={{
              transform: `translateX(calc(${(2 - activeIndex) * 316}px))`,
            }}
          >
            {SOUVENIR_COLLECTION.map((item, idx) => {
              const isCenter = idx === activeIndex;
              const distance = Math.abs(idx - activeIndex);

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className="w-[280px] sm:w-[300px] shrink-0 mx-2 select-none cursor-pointer"
                >
                  <div
                    className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isCenter
                        ? "bg-white border-2 border-purple-400 shadow-2xl shadow-purple-900/20 scale-100 sm:scale-105 opacity-100 ring-4 ring-purple-100/50"
                        : distance === 1
                          ? "bg-white/95 border border-slate-200/90 shadow-md scale-95 opacity-75 hover:opacity-95"
                          : "bg-white/80 border border-slate-200/60 shadow-xs scale-90 opacity-40 hover:opacity-70"
                    }`}
                  >
                    {/* Image Box */}
                    <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          isCenter ? "scale-105" : "scale-100"
                        }`}
                      />
                    </div>

                    {/* Body Info */}
                    <div className="p-4 sm:p-5 text-left flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        {/* Kategori Oleh-Oleh (Menggantikan Rating Bintang) */}
                        <div className="flex items-center gap-1.5 text-purple-700 font-bold text-[11px] mb-1">
                          <Tag className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="truncate">{item.category}</span>
                        </div>

                        {/* Nama Produk (Font Poppins Sesuai Request) */}
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug line-clamp-1">
                          {item.name}
                        </h3>

                        <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>

                      {/* Price & Pick-Up Action */}
                      <div className="pt-2.5 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">
                            HARGA DI RESEPSIONIS
                          </span>
                          <span className="text-base sm:text-lg font-black text-purple-700 leading-tight block mt-0.5">
                            {item.price}
                          </span>
                        </div>

                        {isCenter ? (
                          <Button
                            asChild
                            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-9 px-3 gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer shrink-0"
                          >
                            <a href={getItemWaUrl(item)} target="_blank" rel="noreferrer">
                              <FaWhatsapp className="w-4 h-4" />
                              <span>Titip Ambil</span>
                            </a>
                          </Button>
                        ) : (
                          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                            <ShoppingBag className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots Slider Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-2 sm:mt-3">
          {SOUVENIR_COLLECTION.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Lihat ${item.name}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeIndex
                  ? "w-6 h-2 bg-purple-700 shadow-xs"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Link Buka Seluruh Etalase */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/oleh-oleh"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-purple-700 hover:text-purple-900 hover:underline transition"
        >
          <span>Lihat Seluruh Produk Oleh-oleh Khas di Etalase Lengkap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
