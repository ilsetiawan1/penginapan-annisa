"use client";

import type { Souvenir } from "@annisa/types";
import { Package, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardItemProps {
  product: Souvenir;
  inCart: number;
  onAdd: (product: Souvenir) => void;
  onRestock: (product: Souvenir) => void;
}

function stockTone(stock: number) {
  if (stock <= 0) return "bg-rose-50 text-rose-700 border-rose-200/80";
  if (stock <= 5) return "bg-amber-50 text-amber-700 border-amber-200/80";
  return "bg-slate-50 text-slate-600 border-slate-200/80";
}

export function ProductCardItem({ product, inCart, onAdd, onRestock }: ProductCardItemProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(product.imageUrl) && !imageFailed;
  const soldOut = product.stock <= 0;
  const maxedOut = inCart >= product.stock;

  return (
    <article
      className={`group bg-white rounded-2xl border overflow-hidden flex flex-col transition-colors ${
        inCart > 0 ? "border-slate-900" : "border-slate-200/80 hover:border-slate-300"
      }`}
    >
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        {showImage ? (
          <Image
            src={product.imageUrl as string}
            alt={product.name}
            fill
            sizes="(min-width: 1536px) 18vw, (min-width: 768px) 25vw, 50vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[repeating-linear-gradient(135deg,theme(colors.slate.100)_0_10px,theme(colors.slate.50)_10px_20px)]">
            <Package className="w-7 h-7 text-slate-300" strokeWidth={1.5} />
            <span className="text-[10px] font-medium text-slate-400">Belum ada foto</span>
          </div>
        )}
        {inCart > 0 && (
          <span className="absolute top-2 right-2 min-w-6 h-6 px-1.5 rounded-full bg-slate-900 text-white text-[11px] font-semibold flex items-center justify-center tabular-nums">
            {inCart}
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[10px] font-medium text-slate-500 truncate">
            {product.category?.name ?? "Oleh-oleh"}
          </span>
          <span
            className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-md border tabular-nums ${stockTone(product.stock)}`}
          >
            {soldOut ? "Habis" : `Stok ${product.stock}`}
          </span>
        </div>
        <h3 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-slate-900 tabular-nums mt-auto">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        <button
          type="button"
          onClick={() => onAdd(product)}
          disabled={soldOut || maxedOut}
          className="w-full h-9 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-900 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200/60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          <Plus className="w-3.5 h-3.5" />
          {soldOut ? "Stok habis" : maxedOut ? "Stok maksimal" : "Tambah"}
        </button>
        <button
          type="button"
          onClick={() => onRestock(product)}
          className="text-xs text-slate-400 hover:text-slate-600 py-0.5 transition-colors cursor-pointer text-center"
        >
          Isi ulang +5 stok
        </button>
      </div>
    </article>
  );
}
