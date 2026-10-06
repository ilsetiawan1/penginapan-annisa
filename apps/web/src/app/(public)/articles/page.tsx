"use client";

import type { ArticleItem } from "@/features/articles/components/public/article-card";
import { ArticleGrid } from "@/features/articles/components/public/article-grid";
import { ArticleHero } from "@/features/articles/components/public/article-hero";
import { useArticleCategories, useArticles } from "@/features/articles/hooks/use-articles";
import { useState } from "react";

export default function ArtikelPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const { data: articlesData, isLoading } = useArticles();
  const { data: categoriesData } = useArticleCategories();

  const categories = [
    "Semua",
    ...(categoriesData?.map((c) => c.name) || [
      "Wisata Pantai",
      "Kuliner Khas",
      "Tips Transit",
      "Oleh-oleh",
      "Budaya Maluku",
    ]),
  ];

  // Map API items to UI format
  const mappedArticles: (ArticleItem & { rawDate: number })[] = (articlesData || []).map((art) => {
    const wordCount = (art.content || "").trim().split(" ").filter(Boolean).length;
    const calculatedReadTime = Math.max(1, Math.ceil(wordCount / 200));
    const createdDate = new Date(art.createdAt);

    return {
      id: art.id,
      slug: art.slug,
      title: art.title,
      category: art.category?.name || "Wisata Maluku",
      readTime: `${calculatedReadTime} Menit`,
      date: createdDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      rawDate: createdDate.getTime(),
      desc: art.summary || `${(art.content || "").slice(0, 120)}...`,
      image: art.coverImage || "/images/articles/default-cover.jpg",
      author: (art as { author?: { name?: string } }).author?.name || "Penginapan Annisa",
    };
  });

  const filteredArticles = mappedArticles
    .filter((art) => {
      const matchCategory = activeCategory === "Semua" || art.category === activeCategory;
      const matchSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "oldest") {
        return a.rawDate - b.rawDate;
      }
      return b.rawDate - a.rawDate;
    });

  return (
    <div className="w-full bg-[#fdfcfe] min-h-screen">
      <ArticleHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {isLoading ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 sm:h-80 bg-[#f4f2f4] border border-[#e9e8ea] rounded-2xl sm:rounded-3xl"
            />
          ))}
        </div>
      ) : (
        <ArticleGrid
          articles={filteredArticles}
          searchQuery={searchQuery}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onReset={() => {
            setSearchQuery("");
            setActiveCategory("Semua");
          }}
        />
      )}
    </div>
  );
}
