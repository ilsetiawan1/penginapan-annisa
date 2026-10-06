"use client";

import { ArrowRight, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime?: string;
  date: string;
  desc: string;
  image: string;
  author: string;
}

interface ArticleCardProps {
  article: ArticleItem;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group rounded-2xl sm:rounded-3xl bg-white border border-[#e9e8ea] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#e2dffe] hover:shadow-[0px_8px_30px_rgba(226,223,254,0.55)] flex flex-col justify-between h-full"
    >
      <div>
        {/* Thumbnail Media dengan Fallback Error & Anti-Meluber */}
        <div className="relative aspect-[16/10] w-full bg-[#f4f2f4] overflow-hidden">
          {!article.image || imgError ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#86848d] p-3 sm:p-4 text-center select-none bg-[#f4f2f4]">
              <Newspaper className="w-6 h-6 sm:w-8 sm:h-8 text-[#86848d]/60 mb-1 sm:mb-2 stroke-[1.5]" />
              <span className="text-[10px] sm:text-xs font-normal text-[#86848d]">
                Panduan Wisata Maluku
              </span>
            </div>
          ) : (
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImgError(true)}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>

        {/* Konten Teks */}
        <div className="p-3 sm:p-5">
          <h3 className="text-xs sm:text-base font-medium text-[#1c1c1c] group-hover:text-[#3c315b] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          <p className="text-[11px] sm:text-xs text-[#86848d] leading-relaxed line-clamp-2 mt-1 sm:mt-1.5 hidden sm:block">
            {article.desc}
          </p>
        </div>
      </div>

      {/* Footer Card */}
      <div className="p-3 pt-0 sm:p-5 sm:pt-0">
        <div className="flex items-center justify-between gap-1 sm:gap-2 pt-2 sm:pt-3 border-t border-[#e9e8ea]">
          <span className="text-[10px] sm:text-[11px] text-[#86848d]">{article.date}</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[#3c315b] font-medium text-xs group-hover:translate-x-1 transition-transform">
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
