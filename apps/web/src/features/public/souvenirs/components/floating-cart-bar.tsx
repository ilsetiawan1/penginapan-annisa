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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 w-full max-w-md px-4 pointer-events-none">
        <div
          onClick={() => setIsCartOpen(true)}
          className="bg-slate-950/90 hover:bg-slate-900 text-white p-2.5 sm:p-3 rounded-full backdrop-blur-xl border border-purple-400/30 shadow-2xl shadow-purple-950/30 flex items-center justify-between gap-3 pointer-events-auto cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center gap-2.5 pl-2">
            <div className="relative w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {totalItemsCount}
              </span>
            </div>
            <div>
              <span className="text-xs font-black text-white block leading-tight">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] text-purple-200 font-medium">
                {totalItemsCount} produk dalam keranjang
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-purple-700 hover:bg-purple-600 text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-sm transition">
            <span>Lihat Keranjang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      <CartDrawerModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
