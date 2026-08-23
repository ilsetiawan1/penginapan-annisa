"use client";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import { getSouvenirOrderWhatsAppUrl } from "../../../../lib/whatsapp";

interface SouvenirProduct {
  id: number;
  name: string;
  category: string;
  tag: string;
  tagColor: string;
  price: string;
  priceNum: number;
  desc: string;
  rating: number;
  reviews: number;
  image: string;
}

const SOUVENIR_COLLECTION: SouvenirProduct[] = [
  {
    id: 1,
    name: "Minyak Cengkeh Asli",
    category: "Minyak & Herbal",
    tag: "TRENDING",
    tagColor: "bg-amber-100 text-amber-900 border-amber-200",
    price: "Rp 55.000",
    priceNum: 55000,
    desc: "Ekstraksi murni bunga cengkeh pilihan tanah Maluku.",
    rating: 4.8,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Minyak Kayu Putih Namlea",
    category: "Minyak & Herbal",
    tag: "BEST SELLER",
    tagColor: "bg-purple-100 text-purple-900 border-purple-200",
    price: "Rp 65.000",
    priceNum: 65000,
    desc: "Penyulingan murni Pulau Buru kualitas nomor satu.",
    rating: 4.9,
    reviews: 142,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Kue Sagu Bagea Kenari",
    category: "Camilan Khas",
    tag: "POPULAR",
    tagColor: "bg-amber-100 text-amber-900 border-amber-200",
    price: "Rp 35.000",
    priceNum: 35000,
    desc: "Kue sagu renyah bertabur kenari gurih oleh-oleh favorit.",
    rating: 4.9,
    reviews: 120,
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Kacang Botol Gurih Ambon",
    category: "Camilan Khas",
    tag: "FAVORIT",
    tagColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
    price: "Rp 45.000",
    priceNum: 45000,
    desc: "Kacang renyah bumbu rempah khas Ambon Manise.",
    rating: 4.7,
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Abon Ikan Cakalang Asap",
    category: "Olahan Ikan",
    tag: "NEW",
    tagColor: "bg-rose-100 text-rose-900 border-rose-200",
    price: "Rp 50.000",
    priceNum: 50000,
    desc: "Abon cakalang asap gurih rempah asli laut Banda.",
    rating: 4.8,
    reviews: 75,
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop",
  },
];

export function HomeSouvenirsPreview() {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default Bagea / Tengah
  const [likedIds, setLikedIds] = useState<number[]>([2]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SOUVENIR_COLLECTION.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SOUVENIR_COLLECTION.length - 1 ? 0 : prev + 1));
  };

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full relative overflow-hidden py-4 sm:py-6">
      {/* Header Elegan dengan Font Serif */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10 px-4">
        <span className="text-[11px] font-black uppercase tracking-widest text-purple-700 block mb-1.5">
          OLEH-OLEH KHAS RESEPSIONIS
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-900 leading-tight">
          Produk Unggulan &amp; Paling Dicari
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Minyak kayu putih Namlea murni, minyak cengkeh, dan camilan khas Maluku tersedia langsung
          di etalase meja resepsionis.
        </p>
      </div>

      {/* 3D Smooth Sliding Carousel Track */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-14">
        {/* Tombol Navigasi Kiri */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Produk Sebelumnya"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-purple-700 hover:scale-110 shadow-xl flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Tombol Navigasi Kanan */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Produk Berikutnya"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-purple-700 hover:scale-110 shadow-xl flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Viewport & Sliding Track Container */}
        <div ref={containerRef} className="overflow-hidden w-full py-6 sm:py-8">
          <div
            className="flex items-center justify-center transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(calc(${(2 - activeIndex) * 280}px))`,
            }}
          >
            {SOUVENIR_COLLECTION.map((item, idx) => {
              const isCenter = idx === activeIndex;
              const distance = Math.abs(idx - activeIndex);

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`shrink-0 mx-2 sm:mx-3 transition-all duration-500 ease-out cursor-pointer rounded-3xl overflow-hidden flex flex-col justify-between select-none ${
                    isCenter
                      ? "w-[270px] sm:w-[310px] lg:w-[325px] scale-100 sm:scale-105 z-20 bg-white border-2 border-purple-400 shadow-2xl shadow-purple-900/20 opacity-100"
                      : distance === 1
                        ? "w-[240px] sm:w-[270px] scale-95 z-10 bg-white/95 border border-slate-200/90 shadow-lg opacity-75 hover:opacity-95"
                        : "w-[220px] sm:w-[250px] scale-90 z-0 bg-white/80 border border-slate-200/60 shadow-md opacity-40 hover:opacity-75"
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative h-44 sm:h-52 lg:h-56 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        isCenter ? "scale-105" : "scale-100"
                      }`}
                    />

                    {/* Gradient Shadow Top */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/30 pointer-events-none" />

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-xs ${item.tagColor}`}
                      >
                        {item.tag}
                      </span>
                    </div>

                    {/* Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleLike(item.id, e)}
                      aria-label="Sukai produk"
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-rose-500 transition-all shadow-xs"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedIds.includes(item.id)
                            ? "fill-rose-500 text-rose-500"
                            : "text-slate-600"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content Body */}
                  <div className="p-4 sm:p-5 space-y-2 text-left flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-extrabold text-slate-800 text-[11px]">
                          {item.rating}
                        </span>
                        <span className="text-slate-400 text-[10px]">({item.reviews})</span>
                      </div>

                      <h3
                        className={`font-extrabold text-slate-900 leading-snug line-clamp-1 ${
                          isCenter ? "text-base sm:text-lg" : "text-sm sm:text-base"
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-2.5 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">
                          HARGA
                        </span>
                        <span
                          className={`font-black text-purple-700 ${
                            isCenter ? "text-base sm:text-lg" : "text-sm sm:text-base"
                          }`}
                        >
                          {item.price}
                        </span>
                      </div>

                      {isCenter ? (
                        <Button
                          asChild
                          className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-9 px-3.5 gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer"
                        >
                          <a
                            href={getSouvenirOrderWhatsAppUrl(item.name, item.price)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FaWhatsapp className="w-4 h-4" />
                            <span>Pesan via WA</span>
                          </a>
                        </Button>
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots Slider Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-2 sm:mt-4">
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
