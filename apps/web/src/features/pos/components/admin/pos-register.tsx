"use client";

import { useState } from "react";
import { usePosRegister } from "../../hooks/use-pos-register";
import { ProductCatalogGrid } from "./catalog/product-catalog-grid";
import { PosCartPanel } from "./register/pos-cart-panel";
import { PosCheckoutModal } from "./register/pos-checkout-modal";
import { PosSalesHistory } from "./register/pos-sales-history";

export function PosRegister() {
  const pos = usePosRegister();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="w-full space-y-6 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Kasir Oleh-Oleh
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Catat penjualan oleh-oleh di meja resepsionis. Stok terpotong otomatis.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl border border-slate-200/80 bg-white text-right whitespace-nowrap shrink-0">
          <span className="block text-[10px] font-medium text-slate-500">Penjualan shift ini</span>
          <strong className="text-sm font-semibold text-slate-900 tabular-nums">
            Rp {pos.shiftTotal.toLocaleString("id-ID")}
          </strong>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full items-start">
        <div className="xl:col-span-8">
          <ProductCatalogGrid
            products={pos.filteredProducts}
            totalProducts={pos.products.length}
            isLoading={pos.isLoading}
            isRefreshing={pos.isRefreshing}
            onRefresh={pos.refresh}
            search={pos.search}
            onSearchChange={pos.setSearch}
            categories={pos.categories}
            selectedCategory={pos.selectedCategory}
            onCategoryChange={pos.setSelectedCategory}
            cart={pos.cart}
            onAdd={pos.addToCart}
            onRestock={pos.restockProduct}
          />
        </div>

        <aside className="xl:col-span-4 space-y-6 xl:sticky xl:top-6">
          <PosCartPanel
            lines={pos.cartLines}
            totalAmount={pos.totalAmount}
            totalItems={pos.totalItems}
            onQuantityChange={pos.setQuantity}
            onClear={pos.clearCart}
            onCheckout={() => setIsCheckoutOpen(true)}
          />
          <PosSalesHistory sales={pos.sales} />
        </aside>
      </div>

      <PosCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={pos.totalAmount}
        totalItems={pos.totalItems}
        isPending={pos.isCheckingOut}
        onConfirm={pos.checkout}
      />
    </div>
  );
}
