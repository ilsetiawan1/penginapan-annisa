"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";

export interface SouvenirProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

interface SouvenirItemCardProps {
  item: SouvenirProduct;
  onSell: (item: SouvenirProduct) => void;
  onAddStock: (id: string) => void;
}

export function SouvenirItemCard({ item, onSell, onAddStock }: SouvenirItemCardProps) {
  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-purple-300 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
      <div>
        {/* Product Thumbnail */}
        <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
          <div className="absolute top-2.5 left-2.5">
            <span className="bg-slate-950/80 text-white px-2 py-0.5 rounded-md text-[9px] font-bold">
              {item.category}
            </span>
          </div>
          <div className="absolute top-2.5 right-2.5">
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-black shadow-xs ${
                item.stock <= 5 ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
              }`}
            >
              Stok: {item.stock}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-1">
          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
            {item.name}
          </h3>
          <p className="text-sm font-black text-purple-700 pt-1">
            Rp {item.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 space-y-2">
        <Button
          type="button"
          onClick={() => onSell(item)}
          disabled={item.stock <= 0}
          className="w-full rounded-xl bg-purple-700 hover:bg-purple-800 disabled:bg-slate-200 text-white font-extrabold text-xs h-11 gap-1.5 shadow-xs cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Catat Terjual (1 Pcs)</span>
        </Button>

        <button
          type="button"
          onClick={() => onAddStock(item.id)}
          className="w-full text-center text-[10px] font-bold text-slate-500 hover:text-purple-700 py-1 transition cursor-pointer"
        >
          + Tambah Stok (+5 pcs)
        </button>
      </div>
    </div>
  );
}
