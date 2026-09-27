"use client";

import { BarChart3, ChevronDown, TrendingUp } from "lucide-react";
import { useState } from "react";

interface DailyData {
  day: string;
  fullDay: string;
  rooms: number;
  occupancyPercent: number;
  revenue: number;
  isToday?: boolean;
}

const WEEKLY_DATA: DailyData[] = [
  { day: "Min", fullDay: "Minggu", rooms: 5, occupancyPercent: 62.5, revenue: 1100000 },
  { day: "Sen", fullDay: "Senin", rooms: 6, occupancyPercent: 75.0, revenue: 1250000 },
  { day: "Sel", fullDay: "Selasa", rooms: 6, occupancyPercent: 75.0, revenue: 1275000, isToday: true },
  { day: "Rab", fullDay: "Rabu", rooms: 7, occupancyPercent: 87.5, revenue: 1450000 },
  { day: "Kam", fullDay: "Kamis", rooms: 5, occupancyPercent: 62.5, revenue: 1050000 },
  { day: "Jum", fullDay: "Jumat", rooms: 8, occupancyPercent: 100.0, revenue: 1700000 },
  { day: "Sab", fullDay: "Sabtu", rooms: 7, occupancyPercent: 87.5, revenue: 1500000 },
];

export function OccupancyVolumeChart() {
  const [selectedIdx, setSelectedIdx] = useState<number>(2); // Default Selasa (Hari Ini)
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  const activeItem = WEEKLY_DATA[selectedIdx] || WEEKLY_DATA[2];
  const maxRooms = 8;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col justify-between h-full">
      {/* Chart Header */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-700">
              Tren Okupansi &amp; Volume Hunian
            </h3>
          </div>

          {/* Period Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/70 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setPeriod("weekly")}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                period === "weekly"
                  ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Mingguan
            </button>
            <button
              type="button"
              onClick={() => setPeriod("monthly")}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                period === "monthly"
                  ? "bg-white text-slate-900 shadow-2xs font-extrabold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Bulanan
            </button>
          </div>
        </div>

        {/* Big Highlighted Metric */}
        <div className="mt-4 flex flex-wrap items-baseline gap-2.5">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
            {activeItem.rooms} / {maxRooms} Kamar Terisi
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            <TrendingUp className="w-3 h-3" />
            +{activeItem.occupancyPercent}% Okupansi
          </span>
          <span className="text-xs text-slate-400 font-medium">
            ({activeItem.fullDay} • Rp {activeItem.revenue.toLocaleString("id-ID")})
          </span>
        </div>
      </div>

      {/* Main Bar Chart Container */}
      <div className="mt-8 relative pt-6">
        {/* Horizontal Dotted Target Line (e.g. Target 75% / 6 Kamar) */}
        <div
          className="absolute left-0 right-10 border-b border-dashed border-slate-300 pointer-events-none z-0"
          style={{ bottom: "68px" }}
        >
          <span className="absolute -top-4 left-1 text-[10px] font-bold text-slate-400 bg-white/90 px-1 rounded">
            Target Okupansi 75% (6 Kamar)
          </span>
        </div>

        {/* Chart Bars and Right Y-Axis */}
        <div className="flex items-end justify-between gap-2 sm:gap-4 h-48 sm:h-52 relative z-10">
          {/* 7 Daily Bars */}
          <div className="flex-1 flex items-end justify-between gap-1.5 sm:gap-3 h-full pb-6">
            {WEEKLY_DATA.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              const barHeightPercent = (item.rooms / maxRooms) * 100;

              return (
                <div
                  key={item.day}
                  onClick={() => setSelectedIdx(idx)}
                  className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer relative"
                >
                  {/* Floating Dark Tooltip Badge on Active/Hovered */}
                  {isSelected && (
                    <div className="absolute -top-7 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-black tracking-wide shadow-md whitespace-nowrap z-20 flex items-center gap-1 animate-fadeIn">
                      <span>{item.day} : {item.rooms} Kamar</span>
                    </div>
                  )}

                  {/* Vertical Bar Cylinder */}
                  <div className="w-full max-w-[36px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-full relative p-0.5 group-hover:bg-slate-200/70 transition-colors">
                    <div
                      style={{ height: `${barHeightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isSelected
                          ? "bg-slate-900 shadow-md shadow-slate-950/20"
                          : item.isToday
                          ? "bg-purple-600 group-hover:bg-purple-700"
                          : "bg-slate-200 group-hover:bg-purple-300"
                      }`}
                    />
                  </div>

                  {/* Day Label */}
                  <span
                    className={`text-[11px] font-bold mt-2 leading-none transition-colors ${
                      isSelected
                        ? "text-slate-900 font-black"
                        : item.isToday
                        ? "text-purple-700 font-extrabold"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Y-Axis Scale */}
          <div className="w-8 flex flex-col justify-between items-end h-full pb-6 text-[10px] font-bold text-slate-400 select-none shrink-0">
            <span>8</span>
            <span>6</span>
            <span>4</span>
            <span>2</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
