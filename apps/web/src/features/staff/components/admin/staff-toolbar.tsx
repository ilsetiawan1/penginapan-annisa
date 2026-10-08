"use client";

import { CreateButton } from "@/components/ui/create-button";
import { Plus, RotateCw, Search, X } from "lucide-react";

interface StaffToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onAddStaff: () => void;
}

export function StaffToolbar({
  searchQuery,
  onSearchChange,
  onRefresh,
  isRefreshing,
  onAddStaff,
}: StaffToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
      {/* Input Pencarian Username / Nama Staf */}
      <div className="relative flex-1 max-w-full sm:max-w-xs md:max-w-sm">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari username atau nama staf..."
          aria-label="Cari username staf"
          className="w-full h-9 pl-9 pr-8 bg-white hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#3c315b] transition shadow-2xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Hapus pencarian"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Aksi Toolbar: Refresh & Tambah Pengguna */}
      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Segarkan data staf"
          aria-label="Segarkan data staf"
          className="h-9 w-9 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition shadow-2xs cursor-pointer disabled:opacity-60"
        >
          <RotateCw
            className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-slate-900" : ""}`}
          />
        </button>

        <CreateButton
          onClick={onAddStaff}
          icon={<Plus className="w-3.5 h-3.5 text-slate-300 shrink-0 stroke-[2.5]" />}
        >
          Tambah Pengguna
        </CreateButton>
      </div>
    </div>
  );
}
