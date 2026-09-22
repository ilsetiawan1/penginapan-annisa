"use client";

import { RotateCw, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SouvenirItemCard, type SouvenirProduct } from "./souvenir-item-card";
import {
  type SaleRecord,
  SouvenirSalesHistory,
} from "./souvenir-sales-history";

// PRODUK ETALASE OLEH-OLEH KHAS MALUKU (SESUAI PRD & TRD)
const INITIAL_SOUVENIRS: SouvenirProduct[] = [
  {
    id: "mkp",
    name: "Minyak Kayu Putih Asli Namlea",
    category: "Minyak & Herbal",
    price: 65000,
    stock: 24,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "cengkeh",
    name: "Minyak Cengkeh Asli Maluku",
    category: "Minyak & Herbal",
    price: 55000,
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "bagea",
    name: "Kue Sagu Bagea Kenari Ambon",
    category: "Makanan & Camilan",
    price: 35000,
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "roti",
    name: "Roti Kenari Khas Maluku",
    category: "Makanan & Camilan",
    price: 45000,
    stock: 12,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
  },
];

export function SouvenirPos() {
  const [products, setProducts] =
    useState<SouvenirProduct[]>(INITIAL_SOUVENIRS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSales, setRecentSales] = useState<SaleRecord[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleSell = (product: SouvenirProduct) => {
    if (product.stock <= 0) {
      toast.error(`Stok ${product.name} sudah habis!`);
      return;
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p)),
    );

    const now = new Date();
    const timeStr = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setRecentSales((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        name: product.name,
        qty: 1,
        total: product.price,
        time: timeStr,
      },
      ...prev.slice(0, 4),
    ]);

    toast.success(
      `Penjualan Berhasil: 1x ${product.name} (Rp ${product.price.toLocaleString("id-ID")})`,
    );
  };

  const handleAddStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock + 5 } : p)),
    );
    toast.success("Stok berhasil ditambah +5 unit!");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setProducts(INITIAL_SOUVENIRS);
    setRecentSales([]);
    toast.success("Katalog & stok oleh-oleh telah di-refresh!");
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const totalSalesToday = recentSales.reduce(
    (acc, curr) => acc + curr.total,
    0,
  );

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Banner Kasir & Ringkasan Penjualan */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Kasir Meja Resepsionis
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Penjualan Oleh-Oleh Khas di Meja Depan
          </h2>
          <p className="text-xs text-slate-500">
            Klik tombol &quot;Catat Terjual&quot; saat tamu membeli oleh-oleh
            langsung di lobi penginapan.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRefresh}
            title="Refresh Katalog Oleh-Oleh"
            className="p-2 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <RotateCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin text-purple-700" : ""}`}
            />
            <span className="text-xs font-black hidden sm:inline">Refresh</span>
          </button>

          <div className="bg-purple-50 border border-purple-200 px-4 py-2 rounded-2xl text-right">
            <span className="text-[10px] font-bold text-slate-500 block uppercase">
              Penjualan Shift Ini:
            </span>
            <strong className="text-base font-black text-purple-700">
              Rp {totalSalesToday.toLocaleString("id-ID")}
            </strong>
          </div>
        </div>
      </div>

      {/* Kotak Pencarian Produk Oleh-Oleh */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex items-center gap-2.5">
        <Search className="w-4 h-4 text-purple-700 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Cari produk oleh-oleh (contoh: minyak kayu putih, roti kenari, sagu bagea)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 outline-none placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-xs text-slate-400 hover:text-slate-700 px-2 font-bold cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      {/* 4 Kartu Produk Oleh-Oleh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((item) => (
          <SouvenirItemCard
            key={item.id}
            item={item}
            onSell={handleSell}
            onAddStock={handleAddStock}
          />
        ))}
      </div>

      {/* Sub-Komponen Riwayat Penjualan */}
      <SouvenirSalesHistory sales={recentSales} />
    </div>
  );
}
