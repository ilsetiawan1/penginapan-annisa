"use client";

import { Button } from "@/components/ui/button";
import { FloatingCartBar } from "@/features/souvenirs/components/public/floating-cart-bar";
import { SouvenirOrderModal } from "@/features/souvenirs/components/public/souvenir-order-modal";
import { SOUVENIR_COLLECTION, type SouvenirProduct } from "@/features/souvenirs/data";
import { useSouvenirs } from "@/features/souvenirs/hooks/use-souvenirs";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function HomeSouvenirsPreview() {
  const { data: dbSouvenirs } = useSouvenirs();

  const baseSouvenirs: SouvenirProduct[] = useMemo(() => {
    if (dbSouvenirs && dbSouvenirs.length > 0) {
      return dbSouvenirs.slice(0, 5).map((s, idx) => ({
        id: idx + 1,
        name: s.name,
        category: (s.category?.name?.includes("Minyak")
          ? "Minyak & Herbal"
          : "Makanan & Camilan") as "Minyak & Herbal" | "Makanan & Camilan",
        categoryLabel: s.category?.name || "Khas Maluku",
        price: `Rp ${s.price.toLocaleString("id-ID")}`,
        priceNum: s.price,
        desc: s.description || "Oleh-oleh khas Maluku pilihan terbaik.",
        origin: "Ambon Manise",
        image: s.imageUrl || "",
      }));
    }
    return SOUVENIR_COLLECTION.slice(0, 5);
  }, [dbSouvenirs]);

  const count = baseSouvenirs.length || 1;
  const REPEAT_COUNT = 40;
  const loopTrack = Array.from({ length: REPEAT_COUNT }, () => baseSouvenirs).flat();
  const initialIndex = Math.floor(REPEAT_COUNT / 2) * count;
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [selectedItem, setSelectedItem] = useState<SouvenirProduct | null>(null);

  useEffect(() => {
    if (count > 0) {
      setCurrentIndex(Math.floor(REPEAT_COUNT / 2) * count);
    }
  }, [count]);

  const activeDotIndex = ((currentIndex % count) + count) % count;

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const CARD_WIDTH = 270; // px
  const CARD_GAP = 16; // px
  const TOTAL_CARD_UNIT = CARD_WIDTH + CARD_GAP; // 286px

  return (
    <div className="w-full relative overflow-hidden py-4 sm:py-6">
      {/* Header Elegan dengan Font Serif */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ede8f8] text-[#594791] border border-[#ddd3f3] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
          <span>OLEH-OLEH TRADISIONAL</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-900 leading-tight">
          Produk Unggulan &amp; Paling Dicari
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Tersedia langsung di etalase meja resepsionis. Anda bisa titip stok lebih awal dan ambil
          langsung saat transit di penginapan.
        </p>
      </div>

      {/* 3D Smooth Sliding Carousel Track */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-12">
        {/* Tombol Navigasi Kiri */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Produk Sebelumnya"
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-[#7a68b7] hover:border-[#7a68b7]/50 hover:scale-110 shadow-lg flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Tombol Navigasi Kanan */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Produk Berikutnya"
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-[#7a68b7] hover:border-[#7a68b7]/50 hover:scale-110 shadow-lg flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden py-4 sm:py-6">
          <div
            className="flex items-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            style={{
              transform: `translateX(calc(50% - ${
                currentIndex * TOTAL_CARD_UNIT + CARD_WIDTH / 2
              }px))`,
            }}
          >
            {loopTrack.map((item, index) => {
              const isCenter = index === currentIndex;
              const isAdjacent = Math.abs(index - currentIndex) === 1;

              return (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-[270px] shrink-0 mx-2 transition-all duration-500 cursor-pointer ${
                    isCenter
                      ? "scale-100 sm:scale-105 z-20 opacity-100"
                      : isAdjacent
                        ? "scale-95 z-10 opacity-80 sm:opacity-90"
                        : "scale-90 opacity-40"
                  }`}
                >
                  <div
                    className={`rounded-2xl sm:rounded-3xl bg-white overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                      isCenter
                        ? "border-2 border-[#7a68b7] shadow-xl shadow-[#7a68b7]/15"
                        : "border border-slate-200/80 shadow-sm"
                    }`}
                  >
                    {/* Image Thumbnail */}
                    <div className="relative h-36 sm:h-44 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized
                        priority={isCenter}
                        className="object-cover"
                      />
                    </div>

                    {/* Content Card Body */}
                    <div className="p-3 sm:p-4 text-left flex-1 flex flex-col justify-between space-y-1.5">
                      <div>
                        <div className="flex items-center gap-1 text-[#7a68b7] font-bold text-[10px] sm:text-[11px] mb-0.5">
                          <Tag className="w-3 h-3 text-[#7a68b7] shrink-0" />
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
                        <span className="text-base sm:text-lg font-black text-[#594791] leading-none">
                          {item.price}
                        </span>

                        {isCenter ? (
                          <Button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                            className="rounded-xl bg-[#7a68b7] hover:bg-[#6c59aa] text-white font-bold text-xs h-9 px-3.5 gap-1.5 shadow-md shadow-[#7a68b7]/25 border border-[#6c59aa]/40 cursor-pointer shrink-0"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Titip Ambil</span>
                          </Button>
                        ) : (
                          <div className="w-8 h-8 rounded-xl bg-[#ede8f8] border border-[#ddd3f3] flex items-center justify-center text-[#7a68b7] shrink-0">
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
          {baseSouvenirs.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                const diff = idx - activeDotIndex;
                setCurrentIndex((prev) => prev + diff);
              }}
              aria-label={`Lihat ${item.name}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === activeDotIndex
                  ? "w-6 h-2 bg-[#7a68b7] shadow-xs"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Link Buka Seluruh Etalase */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/souvenirs"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#7a68b7] hover:text-[#594791] hover:underline transition"
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

      {/* Floating Cart Bar Ringkasan */}
      <FloatingCartBar />
    </div>
  );
}
