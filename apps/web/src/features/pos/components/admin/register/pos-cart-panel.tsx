"use client";

import type { Souvenir } from "@annisa/types";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import type { CartLine } from "../../../hooks/use-pos-register";

interface PosCartPanelProps {
  lines: CartLine[];
  totalAmount: number;
  totalItems: number;
  onQuantityChange: (product: Souvenir, quantity: number) => void;
  onClear: () => void;
  onCheckout: () => void;
}

export function PosCartPanel({
  lines,
  totalAmount,
  totalItems,
  onQuantityChange,
  onClear,
  onCheckout,
}: PosCartPanelProps) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 flex flex-col">
      <header className="px-4 sm:px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Keranjang</h3>
          <p className="text-xs text-slate-500 mt-0.5 tabular-nums">{totalItems} item</p>
        </div>
        {lines.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
          >
            Kosongkan
          </button>
        )}
      </header>

      {lines.length === 0 ? (
        <div className="px-5 py-12 flex flex-col items-center text-center gap-2">
          <ShoppingBag className="w-7 h-7 text-slate-300" strokeWidth={1.5} />
          <p className="text-xs text-slate-500 max-w-[14rem]">
            Klik <span className="font-semibold text-slate-700">Tambah</span> pada produk untuk
            mulai mencatat penjualan.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 max-h-[22rem] overflow-y-auto">
          {lines.map(({ product, quantity }) => (
            <li key={product.id} className="px-4 sm:px-5 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate">{product.name}</p>
                <p className="text-[11px] text-slate-500 tabular-nums">
                  Rp {product.price.toLocaleString("id-ID")} × {quantity}
                </p>
              </div>
              <div className="flex items-center rounded-lg border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => onQuantityChange(product, quantity - 1)}
                  aria-label={`Kurangi ${product.name}`}
                  className="p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  {quantity === 1 ? (
                    <Trash2 className="w-3.5 h-3.5" />
                  ) : (
                    <Minus className="w-3.5 h-3.5" />
                  )}
                </button>
                <span className="w-7 text-center text-xs font-semibold text-slate-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onQuantityChange(product, quantity + 1)}
                  disabled={quantity >= product.stock}
                  aria-label={`Tambah ${product.name}`}
                  className="p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer disabled:text-slate-300 disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-auto px-4 sm:px-5 py-4 border-t border-slate-100 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-500">Total</span>
          <strong className="text-lg font-semibold text-slate-900 tabular-nums">
            Rp {totalAmount.toLocaleString("id-ID")}
          </strong>
        </div>
        <button
          type="button"
          onClick={onCheckout}
          disabled={lines.length === 0}
          className="w-full h-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          Bayar
        </button>
      </footer>
    </section>
  );
}
