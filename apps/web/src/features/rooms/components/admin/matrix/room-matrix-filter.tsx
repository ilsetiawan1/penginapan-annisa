"use client";

import { ChevronDown } from "lucide-react";

interface RoomMatrixFilterProps {
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  counts: {
    ready: number;
    booked: number;
    occupied: number;
    dirty: number;
    total: number;
  };
}

export function RoomMatrixFilter({ filterStatus, setFilterStatus, counts }: RoomMatrixFilterProps) {
  const filterButtons = [
    {
      id: "all",
      label: "Semua",
      count: counts.total,
      dotColor: null,
    },
    {
      id: "ready",
      label: "Tersedia",
      count: counts.ready,
      dotColor: "bg-emerald-500",
    },
    {
      id: "occupied",
      label: "Terisi",
      count: counts.occupied,
      dotColor: "bg-blue-500",
    },
    {
      id: "booked",
      label: "Dipesan",
      count: counts.booked,
      dotColor: "bg-amber-500",
    },
    {
      id: "dirty",
      label: "Perlu Bersih",
      count: counts.dirty,
      dotColor: "bg-rose-400",
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md p-2.5 sm:p-2 rounded-2xl border border-slate-200/80 shadow-2xs w-full">
      {/* MOBILE & TABLET VIEW: Compact Clean Dropdown (< lg) */}
      <div className="block lg:hidden">
        <div className="relative">
          <select
            id="mobileStatusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter status kamar"
            className="w-full appearance-none bg-white border border-[#e9e8ea] rounded-2xl px-4 py-2.5 text-xs font-medium text-[#1c1c1c] shadow-sm focus:outline-hidden focus:border-[#3c315b] transition-all pr-10 cursor-pointer"
          >
            <option value="all">Semua ({counts.total} Unit)</option>
            <option value="ready">Tersedia ({counts.ready} Unit)</option>
            <option value="occupied">Terisi ({counts.occupied} Unit)</option>
            <option value="booked">Dipesan ({counts.booked} Unit)</option>
            <option value="dirty">Perlu Bersih ({counts.dirty} Unit)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW ONLY: Segmented Filter Pills (>= lg) */}
      <div className="hidden lg:flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {filterButtons.map((btn) => {
            const isActive = filterStatus === btn.id;

            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setFilterStatus(btn.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white font-semibold shadow-xs"
                    : "bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 font-medium border border-slate-200/60 hover:border-slate-300"
                }`}
              >
                {btn.dotColor && <span className={`w-2 h-2 rounded-full ${btn.dotColor}`} />}
                <span>{btn.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono leading-none ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {btn.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Legend indicator */}
        <div className="flex items-center gap-3 text-xs text-slate-400 px-3 font-medium shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Siap Huni</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Terisi</span>
          </span>
        </div>
      </div>
    </div>
  );
}
