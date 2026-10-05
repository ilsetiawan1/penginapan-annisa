"use client";

import type { Article } from "@annisa/types";
import { AlertTriangle, Edit2, FileText, Newspaper, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";

interface ArticleTableProps {
  articles: Article[];
  isLoading: boolean;
  activeTab: "active" | "trash";
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (article: Article) => void;
  onSoftDelete: (article: Article) => void;
  onRestore: (article: Article) => void;
  onForceDelete: (article: Article) => void;
}

// Komponen Cover Image dengan Fallback Pola Diagonal
function ArticleCoverImage({
  src,
  alt,
}: {
  src?: string | null;
  alt: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className="w-12 h-12 rounded-lg shrink-0 border border-slate-200/80 bg-slate-50 flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 6px, #ffffff 6px, #ffffff 12px)",
        }}
        title="Tidak ada cover"
      >
        <FileText className="w-4 h-4 text-slate-400" />
      </div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-lg shrink-0 border border-slate-200/80 bg-slate-50 overflow-hidden flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export function ArticleTable({
  articles,
  isLoading,
  activeTab,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onSoftDelete,
  onRestore,
  onForceDelete,
}: ArticleTableProps) {
  // Hitung sisa hari retensi 30 hari untuk item sampah
  const getRemainingDays = (deletedAtStr: string | Date | null | undefined): number => {
    if (!deletedAtStr) return 30;
    const deletedDate = new Date(deletedAtStr);
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date(deletedDate.getTime() + thirtyDaysInMs);
    const remainingMs = expiryDate.getTime() - Date.now();
    return Math.max(0, Math.ceil(remainingMs / (1000 * 60 * 60 * 24)));
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200/70 flex items-center justify-center mb-3">
          {activeTab === "trash" ? (
            <Trash2 className="w-6 h-6 text-slate-400" />
          ) : (
            <Newspaper className="w-6 h-6 text-slate-400" />
          )}
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          {activeTab === "trash" ? "Kotak sampah kosong" : "Belum ada artikel"}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          {activeTab === "trash"
            ? "Tidak ada artikel yang sedang dalam masa retensi 30 hari."
            : "Mulai tambahkan artikel wisata untuk menarik pengunjung dari Google."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200/80 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-5 py-3 w-16">Foto</th>
              <th className="px-5 py-3">Judul &amp; Ringkasan</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3 text-center">Views</th>
              {activeTab === "trash" && <th className="px-5 py-3 text-center">Sisa Retensi</th>}
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.map((item) => {
              const remainingDays = getRemainingDays(item.deletedAt);

              return (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                  {/* Foto Cover */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <ArticleCoverImage src={item.coverImage} alt={item.title} />
                  </td>

                  {/* Judul & Ringkasan */}
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-900 line-clamp-1">{item.title}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-1">
                      {item.summary || "Tidak ada ringkasan"}
                    </p>
                  </td>

                  {/* Kategori Badge Netral */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200/70">
                      {item.category?.name || "Umum"}
                    </span>
                  </td>

                  {/* Views */}
                  <td className="px-5 py-3.5 whitespace-nowrap text-center">
                    <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                      {item.views ?? 0}
                    </span>
                  </td>

                  {/* Sisa Retensi (Khusus Sampah) */}
                  {activeTab === "trash" && (
                    <td className="px-5 py-3.5 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                          remainingDays <= 3
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : remainingDays <= 7
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>{remainingDays} hari tersisa</span>
                      </span>
                    </td>
                  )}

                  {/* Tombol Aksi */}
                  <td className="px-5 py-3.5 whitespace-nowrap text-right">
                    {activeTab === "active" ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          title="Edit Artikel"
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
                          title="Pulihkan Artikel ke Aktif"
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
