"use client";

import { useState } from "react";
import type { ArticleItem } from "@/features/public/articles/components/article-card";
import { ArticleFilter } from "@/features/public/articles/components/article-filter";
import { ArticleGrid } from "@/features/public/articles/components/article-grid";
import { ArticleHero } from "@/features/public/articles/components/article-hero";

const CATEGORIES = [
  "Semua",
  "Wisata Pantai",
  "Kuliner Khas",
  "Tips Transit",
  "Oleh-oleh",
  "Budaya Maluku",
];

const ARTICLES_DATA: ArticleItem[] = [
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
    title:
      "Menikmati Gurih & Segarnya Rujak Natsepa Asli di Pinggir Pantai Ambon",
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
    title:
      "Eksplorasi Tebing Karang Ikonik Pintu Kota dengan Pemandangan Laut Lepas",
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
    title:
      "Tips Transit Nyaman dan Bebas Ketinggalan Pesawat di Bandara Pattimura",
    category: "Tips Transit",
    readTime: "3 Menit",
    date: "14 Agustus 2026",
    desc: "Solusi istirahat ideal untuk penerbangan pagi. Istirahat berkualitas hanya 750 meter (3 menit) dari gerbang bandara.",
    image: "/rooms/room-ac-101.jpg",
    author: "Penginapan Annisa",
  },
];

export default function ArtikelPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = ARTICLES_DATA.filter((art) => {
    const matchCategory =
      activeCategory === "Semua" || art.category === activeCategory;
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full">
      <ArticleHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ArticleFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ArticleGrid
        articles={filteredArticles}
        searchQuery={searchQuery}
        onReset={() => {
          setSearchQuery("");
          setActiveCategory("Semua");
        }}
      />
    </div>
  );
}
