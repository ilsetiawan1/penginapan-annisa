"use client";

import { RotateCw, Trash2 } from "lucide-react";

interface RoomManagementHeaderProps {
  onClearAllDummyImages: () => void;
  onResetDefault: () => void;
  isLoading: boolean;
}

export function RoomManagementHeader({
  onClearAllDummyImages,
  onResetDefault,
  isLoading,
}: RoomManagementHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
      <div>
        <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Pengaturan Master Tarif, Foto &amp; Kamar
        </span>
        <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
          Kelola 8 Kamar &amp; Tarif Sewa
        </h2>
        <p className="text-xs text-slate-500">
          Klik tombol <strong>Edit</strong> pada kartu kamar untuk mengubah foto Cloudflare R2,
          judul, tarif sewa, serta fasilitas kamar.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClearAllDummyImages}
          title="Kosongkan semua foto dummy kamar"
          className="p-2 sm:px-3 rounded-2xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5 text-purple-700" />
          <span className="text-xs font-black">Hapus Foto Dummy</span>
        </button>

        <button
          type="button"
          onClick={onResetDefault}
          title="Reset ke Standar"
          className="p-2 sm:px-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer shadow-2xs flex items-center gap-1.5"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-purple-700" : ""}`} />
          <span className="text-xs font-black">Reset Standar</span>
        </button>
      </div>
    </div>
  );
}
