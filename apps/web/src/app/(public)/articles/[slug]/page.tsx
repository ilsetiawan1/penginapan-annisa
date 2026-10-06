"use client";

import { ArticleCard } from "@/features/articles/components/public/article-card";
import { useArticleBySlug, useArticles } from "@/features/articles/hooks/use-articles";
import {
  ArrowLeft,
  ArrowUp,
  BedDouble,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Newspaper,
  Share2,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = use(params);
  const { data: article, isLoading, isError } = useArticleBySlug(slug);
  const { data: allArticles } = useArticles();
  const [coverError, setCoverError] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const ctaBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ctaBannerRef.current) {
        const rect = ctaBannerRef.current.getBoundingClientRect();
        setShowScrollUp(rect.top <= window.innerHeight);
      } else {
        setShowScrollUp(window.scrollY > 800);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link artikel berhasil disalin ke clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] max-w-4xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-6 w-32 bg-[#f4f2f4] border border-[#e9e8ea] rounded-full mb-6" />
        <div className="h-10 w-3/4 bg-[#f4f2f4] border border-[#e9e8ea] rounded-2xl mb-4" />
        <div className="h-4 w-1/2 bg-[#f4f2f4] border border-[#e9e8ea] rounded mb-8" />
        <div className="aspect-[16/9] w-full bg-[#f4f2f4] border border-[#e9e8ea] rounded-3xl mb-8" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-[#f4f2f4] rounded" />
          <div className="h-4 w-5/6 bg-[#f4f2f4] rounded" />
          <div className="h-4 w-4/6 bg-[#f4f2f4] rounded" />
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-[60vh] max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#f4f2f4] border border-[#e9e8ea] text-[#3c315b] flex items-center justify-center mx-auto mb-4 font-medium text-lg">
          !
        </div>
        <h1 className="text-xl font-normal text-[#1c1c1c] tracking-tight mb-2">
          Artikel Tidak Ditemukan
        </h1>
        <p className="text-xs text-[#86848d] mb-6">
          Artikel yang Anda cari mungkin telah dipindahkan atau dihapus.
        </p>
        <Link href="/articles">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#3c315b] hover:bg-[#2d2445] text-white text-xs font-normal transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Semua Artikel</span>
          </button>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
        desc: a.summary || `${a.content.slice(0, 120)}...`,
        image: a.coverImage || "/images/articles/default-cover.jpg",
        author: (a as { author?: { name?: string } }).author?.name || "Tim Redaksi Annisa",
      })) || [];

  return (
    <div className="w-full bg-[#fdfcfe] min-h-screen">
      {/* Top Bar & Metadata */}
      <div className="max-w-4xl mx-auto px-4 pt-24 sm:pt-28 md:pt-32 pb-4">
        <div className="mb-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 font-normal text-xs text-[#3c315b] hover:text-[#2d2445] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Panduan &amp; Artikel</span>
          </Link>
        </div>

        {/* Category Badge di atas judul */}
        <div className="mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-[#f4f2f4] border border-[#e9e8ea] text-[#3c315b] text-[11px] font-medium inline-flex items-center gap-1">
            <Tag className="w-3 h-3 text-[#3c315b]" />
            <span>{article.category?.name || "Wisata Maluku"}</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-normal tracking-[-0.025em] text-[#1c1c1c] leading-tight mb-4">
          {article.title}
        </h1>

        {/* Tanggal Terbit sejajar dengan Tombol Bagikan di bawah judul */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-[#e9e8ea]">
          <div className="flex items-center gap-1.5 text-xs text-[#86848d]">
            <Calendar className="w-3.5 h-3.5 text-[#86848d]" />
            <span>{formattedDate}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#e9e8ea] bg-white hover:bg-[#f4f2f4] text-[#1c1c1c] text-xs font-normal transition cursor-pointer shadow-2xs active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5 text-[#86848d]" />
            <span>Bagikan</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        {/* Cover Image with Fallback */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-sm border border-[#e9e8ea] mb-8 bg-[#f4f2f4]">
          {!article.coverImage || coverError ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#86848d] p-6 text-center select-none bg-[#f4f2f4]">
              <Newspaper className="w-10 h-10 text-[#86848d]/60 mb-2 stroke-[1.5]" />
              <span className="text-sm font-normal text-[#86848d]">Panduan Wisata Maluku</span>
            </div>
          ) : (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              onError={() => setCoverError(true)}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        {/* Article Body */}
        <article className="prose prose-neutral max-w-none text-[#1c1c1c] leading-relaxed space-y-5">
          {/* Lead Quote Card with Rounded Indicator Bar */}
          {article.summary && (
            <div className="flex items-stretch gap-3.5 sm:gap-4 bg-[#f4f2f4] p-4 sm:p-5 rounded-2xl sm:rounded-3xl text-sm sm:text-base text-[#1c1c1c] leading-relaxed mb-6 font-normal">
              <div className="w-1.5 bg-[#3c315b] rounded-full shrink-0 my-0.5" />
              <p className="flex-1 text-sm sm:text-base text-[#1c1c1c] leading-relaxed">
                {article.summary}
              </p>
            </div>
          )}

          {/* Render formatted content blocks */}
          {article.content.split("\n\n").map((paragraph, index) => {
            const blockKey = `para-${index}-${paragraph.slice(0, 15)}`;
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={blockKey}
                  className="text-xl sm:text-2xl font-normal tracking-tight text-[#1c1c1c] mt-8 mb-3"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- ")) {
              const listItems = paragraph.split("\n").filter((l) => l.startsWith("- "));
              return (
                <ul key={blockKey} className="space-y-2.5 my-4 list-none pl-0">
                  {listItems.map((item, i) => (
                    <li
                      key={`item-${i}-${item.slice(0, 15)}`}
                      className="flex items-start gap-2.5 text-[#1c1c1c] text-sm sm:text-base"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#3c315b] shrink-0 mt-0.5" />
                      <span>{item.replace("- ", "")}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={blockKey} className="text-sm sm:text-base text-[#1c1c1c] leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* In-Article CTA Banner */}
        <div
          ref={ctaBannerRef}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#3c315b] text-white shadow-[0px_8px_30px_rgba(60,49,91,0.25)] relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white mb-2">
                Butuh Istirahat Dekat Bandara Pattimura?
              </h3>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                Penginapan Annisa hanya 750 meter dari bandara. Fasilitas AC dingin, kamar mandi
                dalam, dan kasur empuk.
              </p>
            </div>
            <Link href="/rooms" className="shrink-0 w-full md:w-auto">
              <button
                type="button"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f4f2f4] text-[#3c315b] rounded-full px-5 py-2.5 text-xs font-medium shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <BedDouble className="w-4 h-4 text-[#3c315b]" />
                <span>Pesan Kamar Sekarang</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#e9e8ea]">
            <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
              <h3 className="text-lg sm:text-2xl font-normal tracking-tight text-[#1c1c1c]">
                Artikel Rekomendasi Lainnya
              </h3>
              <Link
                href="/articles"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#3c315b] hover:text-[#2d2445] transition-colors shrink-0 whitespace-nowrap"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              {relatedArticles.map((art, index) => (
                <div
                  key={art.id}
                  className={index === 2 ? "hidden md:flex flex-col" : "flex flex-col"}
                >
                  <ArticleCard article={art} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating Scroll Up Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll kembali ke atas"
        className={`fixed bottom-20 right-5 sm:bottom-24 sm:right-6 z-40 p-3 rounded-full bg-[#3c315b] hover:bg-[#2d2445] text-white shadow-[0px_6px_20px_rgba(60,49,91,0.4)] border border-white/20 transition-all duration-300 cursor-pointer active:scale-95 ${
          showScrollUp
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
    </div>
  );
}
