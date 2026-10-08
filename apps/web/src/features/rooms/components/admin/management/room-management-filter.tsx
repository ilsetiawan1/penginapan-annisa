"use client";

import { ChevronDown } from "lucide-react";

interface RoomManagementFilterProps {
  filterBuilding: "all" | "A" | "B";
  setFilterBuilding: (val: "all" | "A" | "B") => void;
}

export function RoomManagementFilter({
  filterBuilding,
  setFilterBuilding,
}: RoomManagementFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <select
          value={filterBuilding}
          onChange={(e) => setFilterBuilding(e.target.value as "all" | "A" | "B")}
          aria-label="Filter kategori bangunan"
          className="h-9 pl-3.5 pr-8 rounded-xl border border-slate-200/80 bg-white text-xs font-medium text-slate-700 hover:border-slate-300 focus:border-[#3c315b] outline-none shadow-2xs cursor-pointer appearance-none transition-colors"
        >
          <option value="all">Semua Kategori</option>
          <option value="A">Bangunan A</option>
          <option value="B">Bangunan B</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
