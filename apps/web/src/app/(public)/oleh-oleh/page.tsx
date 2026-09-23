"use client";

import { useState } from "react";
import { SouvenirFilter } from "@/features/public/souvenirs/components/souvenir-filter";
import { SouvenirGrid } from "@/features/public/souvenirs/components/souvenir-grid";
import { SouvenirHero } from "@/features/public/souvenirs/components/souvenir-hero";
import { type SouvenirProduct, SOUVENIR_COLLECTION } from "@/features/public/souvenirs/data";
import { useSouvenirs, useSouvenirCategories } from "@/features/souvenirs/hooks/use-souvenirs";

export default function OlehOlehPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: dbSouvenirs, isLoading } = useSouvenirs();
  const { data: dbCategories } = useSouvenirCategories();

  const categories = [
    "Semua",
    ...(dbCategories?.map((c) => c.name) || [
      "Makanan & Camilan",
      "Minyak & Herbal",
    ]),
  ];

  // Map API data if available, otherwise use initial collection
  const items: SouvenirProduct[] =
    dbSouvenirs && dbSouvenirs.length > 0
      ? dbSouvenirs.map((s, idx) => ({
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
          image:
            s.imageUrl ||
            "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
        }))
      : SOUVENIR_COLLECTION;


  const filteredSouvenirs = items.filter((item) => {
    const matchCategory =
      activeCategory === "Semua" || item.category === activeCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full">
      <SouvenirHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SouvenirFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {isLoading ? (
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-80 bg-slate-200/80 rounded-3xl" />
          ))}
        </div>
      ) : (
        <SouvenirGrid
          items={filteredSouvenirs}
          searchQuery={searchQuery}
          onReset={() => {
            setSearchQuery("");
            setActiveCategory("Semua");
          }}
        />
      )}
    </div>
  );
}
