"use client";

import { SlidersHorizontal } from "lucide-react";

interface RoomFilterBannerProps {
  buildingFilter: string;
  onBuildingFilterChange: (building: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

export function RoomFilterBanner({
  buildingFilter,
  onBuildingFilterChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
}: RoomFilterBannerProps) {
  return (
    <div className="bg-[#ecebed] rounded-3xl p-5 sm:p-6 space-y-4">
      {/* Teks Deskripsi Alur Operasional */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
          Pantau ketersediaan 8 unit kamar transit Penginapan Annisa secara langsung. Klik kartu
          kamar untuk proses <strong>Check-In Kilat</strong>,{" "}
          <strong>Pelunasan Kasir saat Check-Out</strong>, atau <strong>Kirim Nota WhatsApp</strong>
          .
        </p>
      </div>

      {/* Bilah Filter Putih Cepat (Tanpa Kotak Search, Bersih & Praktis) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xs border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 1. Filter Lokasi Bangunan */}
        <div className="space-y-0.5">
          <label
            htmlFor="filter-building"
            className="text-[10px] font-black text-slate-400 uppercase tracking-wider block px-1"
          >
            Lokasi Bangunan
          </label>
          <select
            id="filter-building"
            value={buildingFilter}
            onChange={(e) => onBuildingFilterChange(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-800 outline-none cursor-pointer py-1 px-1"
          >
            <option value="all">Semua Bangunan (8 Kamar)</option>
            <option value="A">Bangunan A (#A1 – #A4)</option>
            <option value="B">Bangunan B (#B1 – #B4)</option>
          </select>
        </div>

        {/* 2. Filter Tipe Kamar */}
        <div className="space-y-0.5 sm:border-l sm:border-slate-200/80 sm:pl-3">
          <label
            htmlFor="filter-type"
            className="text-[10px] font-black text-slate-400 uppercase tracking-wider block px-1"
          >
            Tipe Kamar
          </label>
          <select
            id="filter-type"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-800 outline-none cursor-pointer py-1 px-1"
          >
            <option value="all">Semua Tipe (AC &amp; Kipas)</option>
            <option value="ac">Tipe AC (Rp 275.000)</option>
            <option value="kipas">Tipe Kipas (Rp 200.000)</option>
          </select>
        </div>

        {/* 3. Filter Status Kamar (4 Warna TRD) */}
        <div className="space-y-0.5 sm:border-l sm:border-slate-200/80 sm:pl-3">
          <label
            htmlFor="filter-status"
            className="text-[10px] font-black text-slate-400 uppercase tracking-wider block px-1"
          >
            Status Kamar
          </label>
          <select
            id="filter-status"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-800 outline-none cursor-pointer py-1 px-1"
          >
            <option value="all">Semua Status Kamar</option>
            <option value="ready">🟢 Siap Pakai (Tersedia)</option>
            <option value="occupied">🔵 Terisi (Dihuni Tamu)</option>
            <option value="dirty">🟡 Perlu Bersih (Sprei Kotor)</option>
            <option value="maintenance">🔴 Dalam Perbaikan (Servis)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
