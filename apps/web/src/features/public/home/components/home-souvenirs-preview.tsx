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
import { Button } from "../../../../components/ui/button";
import {
  SOUVENIR_COLLECTION,
  type SouvenirProduct,
} from "../../souvenirs/data";
import { SouvenirOrderModal } from "../../souvenirs/components/souvenir-order-modal";

export function HomeSouvenirsPreview() {
  const featuredSouvenirs = SOUVENIR_COLLECTION.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default Tengah
  const [selectedItem, setSelectedItem] = useState<SouvenirProduct | null>(null);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? featuredSouvenirs.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === featuredSouvenirs.length - 1 ? 0 : prev + 1,
    );
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
          Tersedia langsung di etalase meja resepsionis. Anda bisa titip stok
          lebih awal dan ambil langsung saat transit di penginapan.
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

        {/* Carousel Container */}
        <div className="overflow-hidden py-4 sm:py-6">
          <div
            className="flex items-center transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(50% - ${activeIndex * 280 + 140}px))`,
            }}
          >
            {featuredSouvenirs.map((item, index) => {
              const isCenter = index === activeIndex;
              const isAdjacent =
                Math.abs(index - activeIndex) === 1 ||
                (activeIndex === 0 && index === featuredSouvenirs.length - 1) ||
                (activeIndex === featuredSouvenirs.length - 1 && index === 0);

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-[260px] sm:w-[280px] shrink-0 px-2.5 sm:px-3 transition-all duration-500 cursor-pointer ${
                    isCenter
                      ? "scale-105 sm:scale-110 z-20 opacity-100"
                      : isAdjacent
                        ? "scale-95 sm:scale-100 z-10 opacity-75 blur-[0.5px]"
                        : "scale-90 opacity-40 blur-[1px]"
                  }`}
                >
                  <div
                    className={`rounded-2xl sm:rounded-3xl bg-white overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                      isCenter
                        ? "border-2 border-purple-400/90 shadow-xl shadow-purple-950/10"
                        : "border border-slate-200/80 shadow-sm"
                    }`}
                  >
                    {/* Image Thumbnail */}
                    <div className="relative h-36 sm:h-44 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content Card Body */}
                    <div className="p-3 sm:p-4 text-left flex-1 flex flex-col justify-between space-y-1.5">
                      <div>
                        <div className="flex items-center gap-1 text-purple-700 font-bold text-[10px] sm:text-[11px] mb-0.5">
                          <Tag className="w-3 h-3 text-purple-600 shrink-0" />
                          <span className="truncate">{item.categoryLabel}</span>
                        </div>

                        <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2 min-h-[32px] sm:min-h-[38px]">
                          {item.name}
                        </h3>

                        <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>

                      {/* Price & Pick-Up Action */}
                      <div className="pt-2.5 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                        <span className="text-base sm:text-lg font-black text-purple-700 leading-none">
                          {item.price}
                        </span>

                        {isCenter ? (
                          <Button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                            className="rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs h-9 px-3.5 gap-1.5 shadow-md shadow-purple-900/20 cursor-pointer shrink-0"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Titip Ambil</span>
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
          {featuredSouvenirs.map((item, idx) => (
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

      {/* Modal Interaktif Pemesanan Titip Ambil */}
      <SouvenirOrderModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
