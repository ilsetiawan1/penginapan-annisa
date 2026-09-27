"use client";

import { ChevronDown, RotateCw } from "lucide-react";
import { useState } from "react";

interface DashboardGreetingHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

export function DashboardGreetingHeader({
  onRefresh,
  isRefreshing,
  selectedPeriod,
  onPeriodChange,
}: DashboardGreetingHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const periods = [
    { id: "today", label: "Hari Ini" },
    { id: "this_week", label: "Minggu Ini" },
    { id: "this_month", label: "Bulan Ini" },
  ];

  const currentLabel =
    periods.find((p) => p.id === selectedPeriod)?.label || "Minggu Ini";

  return (
    <div className="flex items-center justify-between gap-3 shrink-0">
      {/* Left: Subtle Live Status Indicator */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-bold text-slate-600">
          Ringkasan Metrik &amp; Pantauan Operasional
        </span>
      </div>

      {/* Right Controls: Period Filter + Refresh */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Period Dropdown Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition cursor-pointer"
          >
            <span>{currentLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-30">
              {periods.map((period) => (
                <button
                  key={period.id}
                  type="button"
                  onClick={() => {
                    onPeriodChange(period.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    selectedPeriod === period.id
                      ? "bg-purple-50 text-purple-700 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh Action Button */}
        <button
          type="button"
          onClick={onRefresh}
          title="Refresh Data Dashboard"
          className="w-8 h-8 rounded-xl border border-slate-200/90 bg-white hover:bg-purple-50 text-slate-600 hover:text-purple-700 flex items-center justify-center transition cursor-pointer shadow-2xs shrink-0"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-purple-700" : ""}`} />
        </button>
      </div>
    </div>
  );
}

