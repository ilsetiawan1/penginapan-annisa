"use client";

import { useState } from "react";
import type { ArticleItem } from "@/features/public/articles/components/article-card";
import { ArticleFilter } from "@/features/public/articles/components/article-filter";
import { ArticleGrid } from "@/features/public/articles/components/article-grid";
import { ArticleHero } from "@/features/public/articles/components/article-hero";
import { useArticles, useArticleCategories } from "@/features/articles/hooks/use-articles";

export default function ArtikelPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

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
  const mappedArticles: ArticleItem[] = (articlesData || []).map((art) => {
    const calculatedReadTime = Math.max(
      1,
      Math.ceil((art.content || "").split(/\s+/).length / 200),
    );
    return {
      id: art.id,
      slug: art.slug,
      title: art.title,
      category: art.category?.name || "Wisata Maluku",
      readTime: `${calculatedReadTime} Menit`,
      date: new Date(art.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      desc: art.summary || art.content.slice(0, 120) + "...",
      image: art.coverImage || "/artikel/bermain-perahu-di-pantai-liang.jpg",
      author: art.author?.name || "Penginapan Annisa",
    };
  });



  const filteredArticles = mappedArticles.filter((art) => {
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
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {isLoading ? (
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 bg-slate-200/80 rounded-3xl" />
          ))}
        </div>
      ) : (
        <ArticleGrid
          articles={filteredArticles}
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
