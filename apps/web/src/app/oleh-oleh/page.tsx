"use client";

import { useState } from "react";
import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { SouvenirHero } from "../../features/public/souvenirs/components/souvenir-hero";
import { SouvenirFilter } from "../../features/public/souvenirs/components/souvenir-filter";
import { SouvenirGuideCard } from "../../features/public/souvenirs/components/souvenir-guide-card";
import { SouvenirGrid } from "../../features/public/souvenirs/components/souvenir-grid";
import type { SouvenirItem } from "../../features/public/souvenirs/components/souvenir-card";

const CATEGORIES = [
  "Semua",
  "Herbal & Minyak",
  "Camilan Sagu",
  "Kopi & Rempah",
  "Sambal & Bumbu",
];

const SOUVENIRS_DATA: SouvenirItem[] = [
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

export default function OlehOlehPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSouvenirs = SOUVENIRS_DATA.filter((item) => {
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
      <SouvenirHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <SouvenirFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <SouvenirGuideCard />
      <SouvenirGrid
        items={filteredSouvenirs}
        searchQuery={searchQuery}
        onReset={() => {
          setSearchQuery("");
          setActiveCategory("Semua");
        }}
      />
      <Footer />
    </div>
  );
}
