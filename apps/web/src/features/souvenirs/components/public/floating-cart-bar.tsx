"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../hooks/use-cart";
import { CartDrawerModal } from "./cart-drawer-modal";

export function FloatingCartBar() {
  const { totalItemsCount, totalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Jangan tampilkan jika keranjang kosong
  if (totalItemsCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-7 sm:bottom-6 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 sm:w-full sm:max-w-md pointer-events-none pb-[env(safe-area-inset-bottom,0px)]">
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="w-full text-left bg-[#3c315b] text-white p-2 sm:p-2.5 pl-3.5 rounded-full border border-white/20 shadow-[0px_4px_20px_rgba(226,223,254,0.6)] flex items-center justify-between gap-2.5 pointer-events-auto cursor-pointer transition-all hover:bg-[#2d2445] active:scale-[0.98]"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 text-white flex items-center justify-center font-bold text-xs shrink-0">
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {totalItemsCount}
              </span>
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-semibold text-white block leading-tight truncate">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] sm:text-[11px] text-white/80 font-normal block truncate">
                {totalItemsCount} produk dipilih
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white text-[#3c315b] hover:bg-[#f4f2f4] px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium shadow-xs transition shrink-0">
            <span>Lihat Keranjang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      <CartDrawerModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
