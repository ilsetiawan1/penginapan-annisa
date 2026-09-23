"use client";

import { useState } from "react";
import { SouvenirFilter } from "@/features/public/souvenirs/components/souvenir-filter";
import { SouvenirGrid } from "@/features/public/souvenirs/components/souvenir-grid";
import { SouvenirHero } from "@/features/public/souvenirs/components/souvenir-hero";
import { SOUVENIR_COLLECTION } from "@/features/public/souvenirs/data";

const CATEGORIES = ["Semua", "Makanan & Camilan", "Minyak & Herbal"];

export default function OlehOlehPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSouvenirs = SOUVENIR_COLLECTION.filter((item) => {
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
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <SouvenirGrid
        items={filteredSouvenirs}
        searchQuery={searchQuery}
        onReset={() => {
          setSearchQuery("");
          setActiveCategory("Semua");
        }}
      />
    </div>
  );
}
