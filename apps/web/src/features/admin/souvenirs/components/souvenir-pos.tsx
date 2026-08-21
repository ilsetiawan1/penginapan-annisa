"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { SouvenirItemCard, type SouvenirProduct } from "./souvenir-item-card";
import { type SaleRecord, SouvenirSalesHistory } from "./souvenir-sales-history";

const INITIAL_SOUVENIRS: SouvenirProduct[] = [
  {
    id: "mkp",
    name: "Minyak Kayu Putih Namlea",
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
    name: "Kue Sagu Bagea Kenari",
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
  const [products, setProducts] = useState<SouvenirProduct[]>(INITIAL_SOUVENIRS);
  const [recentSales, setRecentSales] = useState<SaleRecord[]>([]);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleSell = (product: SouvenirProduct) => {
    if (product.stock <= 0) return;

    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p)),
    );

    const now = new Date();
    const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
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

    setSuccessMsg(
      `Berhasil mencatat penjualan: 1x ${product.name} (Rp ${product.price.toLocaleString("id-ID")})`,
    );
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAddStock = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: p.stock + 5 } : p)));
  };

  const totalSalesToday = recentSales.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Kasir Resepsionis &amp; Stok
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Penjualan Oleh-oleh Khas di Meja Resepsionis
          </h2>
          <p className="text-xs text-slate-500">
            Klik tombol &quot;Catat Terjual&quot; saat tamu membeli oleh-oleh langsung di lobi
            penginapan.
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 px-4 py-2 rounded-2xl text-right">
          <span className="text-[10px] font-bold text-slate-500 block uppercase">
            Penjualan Shift Ini:
          </span>
          <strong className="text-base font-black text-purple-700">
            Rp {totalSalesToday.toLocaleString("id-ID")}
          </strong>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-3.5 rounded-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 4 Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((item) => (
          <SouvenirItemCard
            key={item.id}
            item={item}
            onSell={handleSell}
            onAddStock={handleAddStock}
          />
        ))}
      </div>

      {/* Recent Sales History Sub-Component */}
      <SouvenirSalesHistory sales={recentSales} />
    </div>
  );
}
