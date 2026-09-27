"use client";

import {
  usePosCheckout,
  useSouvenirs,
  useUpdateSouvenir,
} from "@/features/souvenirs/hooks/use-souvenirs";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, PackageOpen, RotateCw, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SouvenirItemCard, type SouvenirProduct } from "./souvenir-item-card";
import { type SaleRecord, SouvenirSalesHistory } from "./souvenir-sales-history";

export function SouvenirPos() {
  const { data: dbProducts, isLoading, refetch } = useSouvenirs();
  const updateMutation = useUpdateSouvenir();
  const posCheckoutMutation = usePosCheckout();
  const queryClient = useQueryClient();

  const [products, setProducts] = useState<SouvenirProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSales, setRecentSales] = useState<SaleRecord[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Sinkronisasi dengan database PostgreSQL riil
  useEffect(() => {
    if (dbProducts && Array.isArray(dbProducts)) {
      const mapped: SouvenirProduct[] = dbProducts
        .filter((item) => !item.deletedAt && item.isAvailable !== false)
        .map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category?.name || "Oleh-Oleh Khas Ambon",
          price: item.price,
          stock: item.stock,
          image: item.imageUrl || "/souvenirs/default.jpg",
        }));
      setProducts(mapped);
    }
  }, [dbProducts]);

  const handleSell = async (product: SouvenirProduct) => {
    if (product.stock <= 0) {
      toast.error(`Stok ${product.name} sudah habis!`);
      return;
    }

    try {
      // Catat transaksi POS kasir riil ke API & kurangi stok fisik
      await posCheckoutMutation.mutateAsync({
        paymentMethod: "cash",
        cashReceived: product.price,
        items: [
          {
            souvenirId: product.id,
            quantity: 1,
          },
        ],
      });

      // Optimistic state update
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, stock: Math.max(0, p.stock - 1) } : p)),
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
    } catch {
      // Error ditangani hook
    }
  };

  const handleAddStock = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;

    const newStock = target.stock + 5;
    try {
      await updateMutation.mutateAsync({
        id,
        input: { stock: newStock },
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: newStock } : p)),
      );
      toast.success(`Stok ${target.name} berhasil ditambah +5 pcs!`);
    } catch {
      // Error ditangani hook
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    toast.success("Katalog & stok oleh-oleh riil telah di-refresh!");
    setIsRefreshing(false);
  };

  const totalSalesToday = recentSales.reduce((acc, curr) => acc + curr.total, 0);

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
            Terhubung langsung ke database stok fisik. Klik &quot;Catat Terjual&quot; saat tamu membeli oleh-oleh di lobi.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRefresh}
            title="Refresh Katalog Oleh-Oleh"
            className="p-2 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-purple-700" : ""}`} />
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

      {/* Grid Produk Oleh-Oleh dari Database Riil */}
      {isLoading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-2">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-600">Memuat stok produk dari database...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
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
      ) : (
        <div className="bg-white rounded-3xl p-10 text-center border border-dashed border-purple-200 space-y-3">
          <PackageOpen className="w-10 h-10 text-purple-400 mx-auto" />
          <h3 className="text-sm font-black text-slate-800">Belum Ada Produk Oleh-Oleh</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Produk oleh-oleh di database belum ditambahkan atau sedang kosong.
          </p>
          <Link
            href="/admin/master-souvenirs"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black shadow-xs transition"
          >
            + Kelola Produk di Master Oleh-Oleh
          </Link>
        </div>
      )}

      {/* Sub-Komponen Riwayat Penjualan */}
      <SouvenirSalesHistory sales={recentSales} />
    </div>
  );
}
