"use client";

import { CardScatter, type CardScatterItem } from "@/components/ui/card-scatter";
import { FloatingCartBar } from "@/features/souvenirs/components/public/floating-cart-bar";
import { SOUVENIR_COLLECTION } from "@/features/souvenirs/data";
import { useSouvenirs } from "@/features/souvenirs/hooks/use-souvenirs";
import type { Souvenir } from "@annisa/types";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface FeaturedSouvenir extends CardScatterItem {
  categoryLabel?: string;
  stock?: number;
}

export function HomeSouvenirsPreview() {
  const { data: dbSouvenirs } = useSouvenirs();

  // Filter khusus kategori Minyak Kayu Putih Asli, urutkan stok terbanyak, maksimal 10 produk
  const souvenirs: FeaturedSouvenir[] = useMemo(() => {
    if (dbSouvenirs && dbSouvenirs.length > 0) {
      // 1. Filter kategori Minyak Kayu Putih Asli yang memiliki stok (> 0)
      const mkpItems = dbSouvenirs.filter((s: Souvenir) => {
        const catName = s.category?.name?.toLowerCase() || "";
        const catSlug = s.category?.slug?.toLowerCase() || "";
        const prodName = s.name.toLowerCase();

        const isMkp =
          catSlug.includes("minyak-kayu-putih") ||
          catSlug.includes("minyak") ||
          catName.includes("minyak kayu putih") ||
          catName.includes("minyak") ||
          prodName.includes("mkp") ||
          prodName.includes("minyak kayu putih");

        const hasStock = typeof s.stock === "number" ? s.stock > 0 : true;
        const available = s.isAvailable !== false;

        return isMkp && hasStock && available;
      });

      // 2. Urutkan berdasarkan stok terbanyak (descending)
      mkpItems.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));

      // 3. Batasi maksimal 10 kartu. Jika produk < 5 (misal 3), hanya tampilkan 3 tanpa card kosong
      const limited = mkpItems.slice(0, 10);

      if (limited.length > 0) {
        return limited.map((s) => ({
          id: s.id,
          title: s.name,
          categoryLabel: s.category?.name || "Minyak Kayu Putih Asli",
          stock: s.stock,
          image: s.imageUrl || "",
        }));
      }
    }

    // Fallback: SOUVENIR_COLLECTION produk Minyak Kayu Putih (maksimal 10)
    const fallbackMkp = SOUVENIR_COLLECTION.filter(
      (s) =>
        s.category === "Minyak & Herbal" ||
        s.categoryLabel.toLowerCase().includes("minyak") ||
        s.name.toLowerCase().includes("mkp"),
    ).slice(0, 10);

    return fallbackMkp.map((s) => ({
      id: s.id,
      title: s.name,
      categoryLabel: s.categoryLabel,
      image: s.image,
    }));
  }, [dbSouvenirs]);

  return (
    <div className="w-full relative overflow-hidden py-4 sm:py-6 bg-[#fdfcfe]">
      {/* Header Elegan Light Phantom */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2f4] text-[#3c315b] border border-[#e9e8ea] text-[11px] font-medium tracking-wide mb-2.5">
          <span>MINYAK KAYU PUTIH ASLI MALUKU</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1c1c1c] tracking-[-0.025em] leading-tight">
          Produk Unggulan &amp; Paling Dicari
        </h2>
        <p className="text-xs sm:text-sm text-[#86848d] mt-2 max-w-md mx-auto leading-relaxed font-normal">
          Pilihan minyak kayu putih autentik berkhasiat hangat alami langsung dari penyulingan
          terbaik Ambon &amp; Namlea.
        </p>
      </div>

      {/* Card Scatter Showcase (Preview murni tanpa modal pesanan) */}
      <div className="relative max-w-6xl mx-auto px-4">
        {souvenirs.length > 0 ? (
          <CardScatter<FeaturedSouvenir>
            items={souvenirs}
            cardWidth={200}
            aspect={1.3}
            rowGap={75}
            activeScale={1.08}
            autoPlay={3500}
            pauseOnHover={true}
            renderCard={(item) => (
              <div className="flex h-full flex-col p-2.5 bg-white text-left select-none">
                {/* Foto Produk */}
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-[#f4f2f4]">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#faf8fd] via-[#ede8f8]/60 to-[#f4f2f4] flex flex-col items-center justify-center gap-1.5 text-[#3c315b]/60 p-4">
                      <Sparkles className="w-7 h-7 stroke-[1.5]" />
                      <span className="text-[10px] font-medium uppercase tracking-wider text-[#86848d]">
                        Khas Maluku
                      </span>
                    </div>
                  )}

                  {/* Badge Kategori */}
                  {item.categoryLabel && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e9e8ea] text-[#3c315b] text-[9px] font-medium shadow-xs">
                      {item.categoryLabel}
                    </div>
                  )}
                </div>

                {/* Title Card Bersih */}
                <div className="px-1 pt-2.5 pb-0.5 text-center">
                  <p className="truncate text-xs sm:text-sm font-medium text-[#1c1c1c] leading-snug">
                    {item.title}
                  </p>
                </div>
              </div>
            )}
          />
        ) : (
          <div className="py-12 text-center text-[#86848d] text-sm">
            Stok minyak kayu putih asli sedang dipersiapkan.
          </div>
        )}
      </div>

      {/* Link ke Katalog Lengkap */}
      <div className="text-center mt-6 sm:mt-8">
        <Link
          href="/souvenirs"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#3c315b] hover:text-[#2d2445] hover:underline transition"
        >
          <span>Lihat Semua Oleh-Oleh Khas Maluku</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Floating Cart Bar jika ada item di keranjang */}
      <FloatingCartBar />
    </div>
  );
}
