"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  User,
  Share2,
  CheckCircle2,
  BedDouble,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useArticleBySlug, useArticles } from "@/features/articles/hooks/use-articles";
import { ArticleCard } from "@/features/public/articles/components/article-card";
import { toast } from "sonner";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = use(params);
  const { data: article, isLoading, isError } = useArticleBySlug(slug);
  const { data: allArticles } = useArticles();

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link artikel berhasil disalin ke clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] max-w-4xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-6 w-32 bg-slate-200 rounded-full mb-6" />
        <div className="h-10 w-3/4 bg-slate-200 rounded-xl mb-4" />
        <div className="h-4 w-1/2 bg-slate-200 rounded mb-8" />
        <div className="h-80 w-full bg-slate-200 rounded-3xl mb-8" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-slate-200 rounded" />
          <div className="h-4 w-5/6 bg-slate-200 rounded" />
          <div className="h-4 w-4/6 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-[60vh] max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          !
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Artikel Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Artikel yang Anda cari mungkin telah dipindahkan atau dihapus.
        </p>
        <Link href="/artikel">
          <Button className="rounded-full cursor-pointer bg-purple-700 hover:bg-purple-800 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Semua Artikel
          </Button>
        </Link>
      </div>
    );
  }

  // Related articles (exclude current)
  const relatedArticles =
    allArticles
      ?.filter((a) => a.slug !== slug)
      .slice(0, 3)
      .map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        category: a.category?.name || "Wisata Maluku",
        date: new Date(a.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        desc: a.summary || a.content.slice(0, 120) + "...",
        image: a.coverImage || "/artikel/bermain-perahu-di-pantai-liang.jpg",
        author: a.author?.name || "Tim Redaksi Annisa",
      })) || [];

  return (
    <div className="w-full bg-gradient-to-b from-purple-50/40 via-white to-slate-50">
      {/* Breadcrumb & Top Bar */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-1.5 font-semibold text-purple-700 hover:text-purple-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Panduan &amp; Artikel
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            Bagikan
          </button>
        </div>

        {/* Category & Read Time */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
            <Tag className="w-3.5 h-3.5 text-purple-600" />
            {article.category?.name || "Wisata & Budaya"}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {Math.max(1, Math.ceil((article.content || "").split(/\s+/).length / 200))} Menit Baca
          </span>
        </div>


        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-serif font-black text-slate-950 tracking-tight leading-snug sm:leading-tight mb-4">
          {article.title}
        </h1>

        {/* Author & Date */}
        <div className="flex items-center gap-4 text-xs text-slate-500 pb-6 border-b border-slate-200">
          <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
            <User className="w-3.5 h-3.5 text-purple-600" />
            {article.author?.name || "Tim Redaksi Annisa"}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {new Date(article.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 pb-16">
        {/* Cover Image */}
        <div className="relative h-64 sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 mb-8 bg-slate-100">
          <Image
            src={
              article.coverImage ||
              "/artikel/bermain-perahu-di-pantai-liang.jpg"
            }
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-5">
          {article.summary && (
            <p className="font-semibold text-slate-900 text-lg sm:text-xl leading-relaxed bg-purple-50/60 p-5 rounded-2xl border-l-4 border-purple-600">
              {article.summary}
            </p>
          )}


          {/* Render formatted content blocks */}
          {article.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={index}
                  className="text-xl sm:text-2xl font-bold text-slate-950 mt-8 mb-3"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- ")) {
              const listItems = paragraph.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={index} className="space-y-2 my-4 list-none pl-0">
                  {listItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{item.replace("- ", "")}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* CTA Transit Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-700/80 text-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
                Transit Nyaman di Ambon
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Butuh Istirahat Dekat Bandara Pattimura?
              </h3>
              <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                Penginapan Annisa hanya 750 meter dari gerbang bandara. Fasilitas
                AC dingin, kamar mandi dalam, kasur empuk, dan layanan antar jemput kilat.
              </p>
            </div>
            <Link href="/kamar" className="shrink-0 w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-7 cursor-pointer shadow-lg"
              >
                <BedDouble className="w-4 h-4 mr-2" />
                Pesan Kamar Sekarang
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-950">
                  Artikel Rekomendasi Lainnya
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Jelajahi panduan wisata dan info menarik seputar Ambon Manise.
                </p>
              </div>
              <Link
                href="/artikel"
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-800"
              >
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
