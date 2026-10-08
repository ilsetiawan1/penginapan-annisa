"use client";

import { ChevronDown, RotateCw, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

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
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function RoomMatrixFilter({
  filterStatus,
  setFilterStatus,
  counts,
  onRefresh,
  isRefreshing = false,
}: RoomMatrixFilterProps) {
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
        <div className="flex items-center justify-between gap-2">
          <div className="relative w-40 sm:w-44 md:w-48 shrink-0">
            <select
              id="mobileStatusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter status kamar"
              className="w-full h-9 appearance-none bg-white border border-slate-200/80 hover:border-slate-300 focus:border-[#3c315b] rounded-xl pl-3.5 pr-8 text-xs font-medium text-slate-800 shadow-2xs focus:outline-hidden transition-all cursor-pointer"
            >
              {filterButtons.map((btn) => (
                <option key={btn.id} value={btn.id}>
                  {btn.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/admin/master-rooms"
              className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Atur Tarif</span>
            </Link>

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                title="Muat Ulang Data"
                aria-label="Muat Ulang Data"
                className="h-9 w-9 shrink-0 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-slate-900" : ""}`}
                />
              </button>
            )}
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

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/admin/master-rooms"
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Atur Tarif</span>
          </Link>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              title="Muat Ulang Data"
              aria-label="Muat Ulang Data"
              className="h-9 w-9 shrink-0 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin text-slate-900" : ""}`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
