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

interface OccupancyVolumeChartProps {
  occupiedRooms?: number;
  totalRooms?: number;
  todayRevenue?: number;
}

export function OccupancyVolumeChart({
  occupiedRooms = 0,
  totalRooms = 8,
  todayRevenue = 0,
}: OccupancyVolumeChartProps) {
  const daysMap = [
    { day: "Min", fullDay: "Minggu" },
    { day: "Sen", fullDay: "Senin" },
    { day: "Sel", fullDay: "Selasa" },
    { day: "Rab", fullDay: "Rabu" },
    { day: "Kam", fullDay: "Kamis" },
    { day: "Jum", fullDay: "Jumat" },
    { day: "Sab", fullDay: "Sabtu" },
  ];

  const currentDayIndex = new Date().getDay(); // 0 to 6

  const weeklyData: DailyData[] = daysMap.map((d, index) => {
    const isToday = index === currentDayIndex;
    const rooms = isToday ? occupiedRooms : 0;
    const occupancyPercent = totalRooms > 0 ? Math.round((rooms / totalRooms) * 100) : 0;
    const revenue = isToday ? todayRevenue : 0;

    return {
      day: d.day,
      fullDay: d.fullDay,
      rooms,
      occupancyPercent,
      revenue,
      isToday,
    };
  });

  const [selectedIdx, setSelectedIdx] = useState<number>(currentDayIndex);
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  const activeItem = weeklyData[selectedIdx] || weeklyData[currentDayIndex];
  const maxRooms = totalRooms > 0 ? totalRooms : 8;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between h-full">
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

          {/* Target Indicator & Period Toggle */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center text-[10px] font-bold text-slate-500 bg-purple-50/70 border border-purple-100 px-2 py-1 rounded-lg">
              Target: 6 Kamar (75%)
            </span>

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
        </div>

        {/* Big Highlighted Metric */}
        <div className="mt-2.5 sm:mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-none">
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
      <div className="mt-3 relative pt-4 flex-1 min-h-0 flex flex-col justify-end">
        {/* Chart Bars and Right Y-Axis */}
        <div className="flex items-end justify-between gap-2 sm:gap-4 h-36 sm:h-44 lg:h-48 relative z-10">
          {/* 7 Daily Bars */}
          <div className="flex-1 flex items-end justify-between gap-1.5 sm:gap-3 h-full pb-6">
            {weeklyData.map((item, idx) => {
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
