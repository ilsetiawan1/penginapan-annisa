import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  desc: string;
  image: string;
  author: string;
}

interface ArticleCardProps {
  article: ArticleItem;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-purple-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Article Thumbnail */}
        <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-purple-700 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              {article.category}
            </span>
          </div>
        </div>

        {/* Article Info */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-400 font-medium mb-2">
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3 h-3" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-purple-700 font-semibold">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h3 className="font-serif font-black text-sm sm:text-base text-slate-900 group-hover:text-purple-700 transition leading-snug line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{article.desc}</p>
        </div>
      </div>

      {/* Bottom Read More Action */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:text-purple-800">
          <span className="text-[11px] text-slate-500 font-normal">{article.author}</span>
          <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer">
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </article>
  );
}
