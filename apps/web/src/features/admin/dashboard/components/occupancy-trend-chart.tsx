"use client";

import { TrendingUp } from "lucide-react";
import { useState } from "react";

interface DailyOccupancyData {
  day: string;
  date: string;
  occupiedRooms: number; // Dari 8 kamar
  ratePercent: number;
}

const WEEKLY_DATA: DailyOccupancyData[] = [
  { day: "Sen", date: "17 Agu", occupiedRooms: 5, ratePercent: 62.5 },
  { day: "Sel", date: "18 Agu", occupiedRooms: 6, ratePercent: 75.0 },
  { day: "Rab", date: "19 Agu", occupiedRooms: 7, ratePercent: 87.5 },
  { day: "Kam", date: "20 Agu", occupiedRooms: 5, ratePercent: 62.5 },
  { day: "Jum", date: "21 Agu", occupiedRooms: 8, ratePercent: 100.0 },
  { day: "Sab", date: "22 Agu", occupiedRooms: 6, ratePercent: 75.0 },
  { day: "Min", date: "23 Agu", occupiedRooms: 5, ratePercent: 62.5 },
];

export function OccupancyTrendChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(5); // Default Sab (Hari Ini)

  const avgOccupancy = (
    WEEKLY_DATA.reduce((acc, curr) => acc + curr.ratePercent, 0) /
    WEEKLY_DATA.length
  ).toFixed(1);

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
      {/* Header Grafik */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
            Trend Okupansi 7 Hari
          </h3>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Rata-rata:{" "}
            <strong className="text-emerald-700 font-extrabold">
              {avgOccupancy}%
            </strong>{" "}
            (8 Kamar Total)
          </p>
        </div>

        <div className="flex items-center gap-1 bg-purple-50 text-purple-900 border border-purple-200 px-2 py-0.5 rounded-lg text-[10px] font-black">
          <TrendingUp className="w-3 h-3 text-purple-700" />
          <span>Minggu Ini</span>
        </div>
      </div>

      {/* Bar Chart Visual Interaktif Ringkas */}
      <div className="space-y-1.5 pt-1">
        <div className="h-32 sm:h-36 w-full flex items-end justify-between gap-1.5 sm:gap-2 px-1 pb-1 border-b border-dashed border-slate-200">
          {WEEKLY_DATA.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const isToday = idx === 5; // Sabtu

            return (
              <div
                key={item.day}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
              >
                {/* Tooltip Nilai Mengambang */}
                <div
                  className={`text-[9px] font-black px-1 py-0.2 rounded transition-all leading-none ${
                    isHovered
                      ? "bg-purple-950 text-white shadow-xs -translate-y-0.5"
                      : "text-slate-400 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {item.occupiedRooms}/8
                </div>

                {/* Batang Grafik */}
                <div className="w-full max-w-[28px] bg-slate-100 rounded-t-lg overflow-hidden flex flex-col justify-end h-24 relative">
                  <div
                    style={{ height: `${item.ratePercent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isToday
                        ? "bg-gradient-to-t from-purple-700 to-indigo-600 shadow-2xs"
                        : isHovered
                          ? "bg-purple-600"
                          : "bg-purple-300 hover:bg-purple-400"
                    }`}
                  />
                </div>

                {/* Label Hari */}
                <div className="text-center">
                  <span
                    className={`text-[10px] font-black block leading-none ${
                      isToday
                        ? "text-purple-900 font-extrabold"
                        : "text-slate-600"
                    }`}
                  >
                    {item.day}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend Informasi */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5 px-0.5">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-xs bg-purple-700" />
            <span>Hari Ini</span>
          </span>

          {hoveredIdx !== null && (
            <span className="font-extrabold text-purple-950 text-[10px]">
              {WEEKLY_DATA[hoveredIdx].day} ({WEEKLY_DATA[hoveredIdx].date}):{" "}
              <strong className="text-emerald-700 font-black">
                {WEEKLY_DATA[hoveredIdx].ratePercent}%
              </strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
