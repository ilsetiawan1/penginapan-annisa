"use client";

import { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import { CartDrawerModal } from "./cart-drawer-modal";

export function FloatingCartBar() {
  const { totalItemsCount, totalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (totalItemsCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-7 sm:bottom-6 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 sm:w-full sm:max-w-md pointer-events-none pb-[env(safe-area-inset-bottom,0px)]">
        <div
          onClick={() => setIsCartOpen(true)}
          className="bg-white/95 hover:bg-white text-slate-900 p-2 sm:p-2.5 pl-3 rounded-full backdrop-blur-xl border border-purple-200 shadow-xl shadow-purple-950/15 flex items-center justify-between gap-2.5 pointer-events-auto cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.98]"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-100 text-purple-800 border border-purple-200/80 flex items-center justify-center font-bold text-xs shrink-0">
              <ShoppingBag className="w-4 h-4 text-purple-700" />
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-purple-700 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                {totalItemsCount}
              </span>
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight truncate">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate">
                {totalItemsCount} produk dipilih
              </span>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold shadow-xs transition shrink-0 cursor-pointer"
          >
            <span>Lihat Keranjang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <CartDrawerModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
