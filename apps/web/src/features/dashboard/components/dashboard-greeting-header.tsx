"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { ChevronDown, RotateCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { LiveClockWIT } from "./live-clock-wit";

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
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const periods = [
    { id: "today", label: "Hari Ini" },
    { id: "this_week", label: "Minggu Ini" },
    { id: "this_month", label: "Bulan Ini" },
  ];

  const currentLabel =
    periods.find((p) => p.id === selectedPeriod)?.label || "Minggu Ini";

  return (
    <div className="space-y-2">
      {/* Breadcrumb Mini Header */}
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
        <span className="hover:text-slate-600 transition cursor-pointer">Operasional PMS</span>
        <span>/</span>
        <span className="text-purple-700 font-bold">Dashboard Ringkasan</span>
      </div>

      {/* Main Greeting & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Halo, {user?.name || "Ibu Annisa"}</span>
            <span className="inline-block animate-wave origin-bottom-right">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Berikut ringkasan performa hunian kamar, pendapatan harian, dan pantauan operasional transit bandara hari ini.
          </p>
        </div>

        {/* Right Controls: Period Filter + Live Clock WIT + Refresh */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Period Dropdown Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition cursor-pointer"
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

          {/* Real-time Clock WIT Capsule */}
          <LiveClockWIT />

          {/* Refresh Action Button */}
          <button
            type="button"
            onClick={onRefresh}
            title="Refresh Data Dashboard"
            className="w-9 h-9 rounded-xl border border-slate-200/90 bg-white hover:bg-purple-50 text-slate-600 hover:text-purple-700 flex items-center justify-center transition cursor-pointer shadow-2xs shrink-0"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-purple-700" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
