"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface RoomFilterBannerProps {
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  floorFilter: string;
  onFloorFilterChange: (floor: string) => void;
  onSearchClick: () => void;
}

export function RoomFilterBanner({
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  floorFilter,
  onFloorFilterChange,
  onSearchClick,
}: RoomFilterBannerProps) {
  return (
    <div className="bg-[#ecebed] rounded-3xl p-5 sm:p-7 space-y-4">
      {/* Description Text (Matching Reference Banner) */}
      <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
        Pantau ketersediaan 8 unit kamar transit Penginapan Annisa secara real-time. Klik kartu
        kamar untuk proses check-in cepat, pelunasan kasir saat check-out, atau kirim nota digital
        WhatsApp.
      </p>

      {/* Floating White Filter Bar (Matching Reference) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
          {/* 1. Tipe Kamar */}
          <div className="space-y-0.5">
            <label
              htmlFor="filter-room-type"
              className="text-[10px] font-black text-slate-400 uppercase tracking-wider block px-1"
            >
              Tipe Kamar
            </label>
            <select
              id="filter-room-type"
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-800 outline-none cursor-pointer py-1 px-1"
            >
              <option value="all">Semua Tipe (AC &amp; Kipas)</option>
              <option value="ac">Tipe AC (Lantai 1)</option>
              <option value="kipas">Tipe Kipas (Lantai 2)</option>
            </select>
          </div>

          {/* 2. Lantai */}
          <div className="space-y-0.5 sm:border-l sm:border-slate-200/80 sm:pl-3">
            <label
              htmlFor="filter-room-floor"
              className="text-[10px] font-black text-slate-400 uppercase tracking-wider block px-1"
            >
              Posisi Lantai
            </label>
            <select
              id="filter-room-floor"
              value={floorFilter}
              onChange={(e) => onFloorFilterChange(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-800 outline-none cursor-pointer py-1 px-1"
            >
              <option value="all">Semua Lantai (1 &amp; 2)</option>
              <option value="1">Lantai 1 (#101–#104)</option>
              <option value="2">Lantai 2 (#201–#204)</option>
            </select>
          </div>

          {/* 3. Status Kamar (TRD 4 Colors) */}
          <div className="space-y-0.5 sm:border-l sm:border-slate-200/80 sm:pl-3">
            <label
              htmlFor="filter-room-status"
              className="text-[10px] font-black text-slate-400 uppercase tracking-wider block px-1"
            >
              Status Kamar
            </label>
            <select
              id="filter-room-status"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-extrabold text-slate-800 outline-none cursor-pointer py-1 px-1"
            >
              <option value="all">Semua Status (8 Kamar)</option>
              <option value="ready">🟢 Siap Pakai (Tersedia)</option>
              <option value="occupied">🔵 Terisi (Menginap)</option>
              <option value="dirty">🟡 Perlu Bersih</option>
              <option value="maintenance">🔴 Perbaikan</option>
            </select>
          </div>
        </div>

        {/* Search / Apply Button (Matching Reference Pill Icon Button) */}
        <button
          type="button"
          onClick={onSearchClick}
          aria-label="Filter Kamar"
          className="w-full md:w-14 h-12 md:h-14 rounded-2xl bg-purple-100/80 hover:bg-purple-700 text-purple-900 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
