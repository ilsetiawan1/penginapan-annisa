"use client";

import { SouvenirGrid } from "@/features/souvenirs/components/public/souvenir-grid";
import { SouvenirHero } from "@/features/souvenirs/components/public/souvenir-hero";
import { useSouvenirCategories, useSouvenirs } from "@/features/souvenirs/hooks/use-souvenirs";
import type { Souvenir } from "@annisa/types";
import { useState } from "react";

export default function OlehOlehPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: dbSouvenirs = [], isLoading } = useSouvenirs();
  const { data: dbCategories } = useSouvenirCategories();

  const categories = [
    "Semua",
    ...(dbCategories?.map((c) => c.name) || [
      "Minyak Kayu Putih Asli",
      "Kue & Makanan Khas Maluku",
      "Kopi & Minuman Rempah",
    ]),
  ];

  const items: Souvenir[] = dbSouvenirs;

  const filteredSouvenirs = items.filter((item) => {
    const categoryName = item.category?.name || "";
    const matchCategory =
      activeCategory === "Semua" ||
      categoryName === activeCategory ||
      categoryName.toLowerCase().includes(activeCategory.toLowerCase()) ||
      activeCategory.toLowerCase().includes(categoryName.toLowerCase());
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Boolean(item.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full bg-[#fdfcfe]">
      <SouvenirHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      {isLoading ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-72 bg-[#f4f2f4] rounded-3xl border border-[#e9e8ea]" />
          ))}
        </div>
      ) : (
        <SouvenirGrid
          items={filteredSouvenirs}
          searchQuery={searchQuery}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onReset={() => {
            setSearchQuery("");
            setActiveCategory("Semua");
          }}
        />
      )}
    </div>
  );
}
