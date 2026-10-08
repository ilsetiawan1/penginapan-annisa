"use client";

import { cleanImageUrl } from "@/lib/string";
import type { Souvenir } from "@annisa/types";
import { AlertTriangle, Edit2, Package, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";

export { cleanImageUrl };

function SouvenirPhotoThumbnail({ imageUrl, name }: { imageUrl?: string | null; name: string }) {
  const [hasError, setHasError] = useState(false);
  const cleanUrl = cleanImageUrl(imageUrl);

  if (!cleanUrl || hasError) {
    return (
      <div
        className="w-11 h-11 rounded-lg border border-slate-200/80 shrink-0 mx-auto flex items-center justify-center select-none bg-[repeating-linear-gradient(135deg,theme(colors.slate.100)_0_10px,theme(colors.slate.50)_10px_20px)]"
        title={name}
      >
        <Package className="w-5 h-5 text-slate-400 stroke-[1.5]" />
      </div>
    );
  }

  return (
    <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-slate-200/80 bg-slate-50 relative mx-auto flex items-center justify-center">
      <img
        src={cleanUrl}
        alt={name}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

// Hitung sisa hari retensi 30 hari untuk item sampah
export const getRemainingDays = (deletedAtStr: string | Date | null | undefined): number => {
  if (!deletedAtStr) return 30;
  const deletedDate = new Date(deletedAtStr);
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  const expiryDate = new Date(deletedDate.getTime() + thirtyDaysInMs);
  const remainingMs = expiryDate.getTime() - Date.now();
  return Math.max(0, Math.ceil(remainingMs / (1000 * 60 * 60 * 24)));
};

interface SouvenirTableProps {
  items: Souvenir[];
  isLoading: boolean;
  activeTab: "active" | "trash";
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (item: Souvenir) => void;
  onSoftDelete: (item: Souvenir) => void;
  onRestore: (item: Souvenir) => void;
  onForceDelete: (item: Souvenir) => void;
}

export function SouvenirTable({
  items,
  isLoading,
  activeTab,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onSoftDelete,
  onRestore,
  onForceDelete,
}: SouvenirTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-2xs space-y-2">
        <div className="w-7 h-7 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-medium text-slate-600">Memuat data produk oleh-oleh...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-slate-300 space-y-2">
        <Package className="w-10 h-10 text-slate-300 mx-auto" />
        <h3 className="text-sm font-semibold text-slate-800">
          {activeTab === "active" ? "Tidak ada produk aktif" : "Kotak sampah kosong"}
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {activeTab === "active"
            ? "Belum ada produk oleh-oleh yang terdaftar di database."
            : "Tidak ada produk yang sedang dalam masa retensi 30 hari."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <th className="px-5 py-3 w-16 text-center">Foto</th>
              <th className="px-5 py-3 min-w-[200px]">Produk &amp; Deskripsi</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Harga</th>
              <th className="px-5 py-3 text-center">Stok POS</th>
              {activeTab === "trash" && <th className="px-5 py-3">Sisa Waktu Retensi</th>}
              <th className="px-5 py-3 text-right w-28">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const remainingDays = getRemainingDays(item.deletedAt);

              return (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                  {/* Thumbnail Foto */}
                  <td className="px-5 py-3.5 text-center">
                    <SouvenirPhotoThumbnail imageUrl={item.imageUrl} name={item.name} />
                  </td>

                  {/* Nama Produk & Deskripsi */}
                  <td className="px-5 py-3.5">
                    <strong className="font-semibold text-slate-900 block leading-tight text-xs sm:text-sm">
                      {item.name}
                    </strong>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {item.description || "Tidak ada deskripsi"}
                    </p>
                  </td>

                  {/* Kategori Badge */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/70">
                      {item.category?.name || "Kategori"}
                    </span>
                  </td>

                  {/* Harga Produk */}
                  <td className="px-5 py-3.5 whitespace-nowrap font-semibold text-slate-900 text-xs">
                    Rp {item.price.toLocaleString("id-ID")}
                  </td>

                  {/* Stok Fisik POS Kasir */}
                  <td className="px-5 py-3.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.stock > 10
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : item.stock > 0
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-rose-50 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {item.stock} pcs
                    </span>
                  </td>

                  {/* Sisa Waktu Retensi (Hanya di Tab Sampah) */}
                  {activeTab === "trash" && (
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{remainingDays} hari tersisa</span>
                        </span>
                        <p className="text-[9px] text-slate-400">
                          Dihapus:{" "}
                          {item.deletedAt
                            ? new Date(item.deletedAt).toLocaleDateString("id-ID")
                            : "-"}
                        </p>
                      </div>
                    </td>
                  )}

                  {/* Tombol Aksi */}
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    {activeTab === "active" ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          title="Edit Produk"
                          className="h-8 w-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onSoftDelete(item)}
                          title="Pindahkan ke Sampah"
                          className="h-8 w-8 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onRestore(item)}
                          title="Pulihkan Produk ke Aktif"
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Pulihkan</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onForceDelete(item)}
                          title="Hapus Permanen"
                          className="h-8 w-8 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/50">
          <span className="text-xs text-slate-500 font-medium">
            Halaman <span className="font-semibold text-slate-800">{currentPage}</span> dari{" "}
            <span className="font-semibold text-slate-800">{totalPages}</span>
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 px-3 text-xs font-medium rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-8 px-3 text-xs font-medium rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
