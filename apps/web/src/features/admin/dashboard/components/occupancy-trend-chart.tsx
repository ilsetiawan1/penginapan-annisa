"use client";

import { TrendingUp } from "lucide-react";
import { useState } from "react";

interface DailyOccupancyData {
  day: string;
  date: string;
  occupiedRooms: number; // Dari 8 kamar
  ratePercent: number;
  walkIn: number;
  waBooking: number;
}

const WEEKLY_DATA: DailyOccupancyData[] = [
  { day: "Sen", date: "17 Agu", occupiedRooms: 5, ratePercent: 62.5, walkIn: 3, waBooking: 2 },
  { day: "Sel", date: "18 Agu", occupiedRooms: 6, ratePercent: 75.0, walkIn: 2, waBooking: 4 },
  { day: "Rab", date: "19 Agu", occupiedRooms: 7, ratePercent: 87.5, walkIn: 3, waBooking: 4 },
  { day: "Kam", date: "20 Agu", occupiedRooms: 5, ratePercent: 62.5, walkIn: 2, waBooking: 3 },
  { day: "Jum", date: "21 Agu", occupiedRooms: 8, ratePercent: 100.0, walkIn: 4, waBooking: 4 },
  { day: "Sab", date: "22 Agu", occupiedRooms: 6, ratePercent: 75.0, walkIn: 3, waBooking: 3 },
  { day: "Min", date: "23 Agu", occupiedRooms: 5, ratePercent: 62.5, walkIn: 2, waBooking: 3 },
];

export function OccupancyTrendChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(5); // Default Sab (Hari Ini)

  const avgOccupancy = (
    WEEKLY_DATA.reduce((acc, curr) => acc + curr.ratePercent, 0) / WEEKLY_DATA.length
  ).toFixed(1);

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
      {/* Header Grafik */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider block">
            PRODUKTIVITAS OKUPANSI
          </span>
          <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
            Tingkat Keterisian 8 Kamar
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Rata-rata 7 hari terakhir: <strong className="text-emerald-600">{avgOccupancy}%</strong> (Puncak di akhir pekan)
          </p>
        </div>

        <div className="flex items-center gap-1 bg-purple-50 text-purple-900 border border-purple-200 px-2.5 py-1 rounded-xl text-xs font-black shadow-2xs">
          <TrendingUp className="w-3.5 h-3.5 text-purple-700" />
          <span>7 Hari Terakhir</span>
        </div>
      </div>

      {/* Bar Chart Visual Interaktif (Tailwind CSS Bar) */}
      <div className="space-y-2 pt-2">
        <div className="h-44 sm:h-48 w-full flex items-end justify-between gap-2 sm:gap-3 px-1 pt-4 pb-1 border-b border-dashed border-slate-200">
          {WEEKLY_DATA.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const isToday = idx === 5; // Sabtu

            return (
              <div
                key={item.day}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
              >
                {/* Tooltip Nilai Mengambang */}
                <div
                  className={`text-[10px] font-black px-1.5 py-0.5 rounded-md transition-all ${
                    isHovered
                      ? "bg-purple-950 text-white shadow-md -translate-y-1"
                      : "text-slate-400 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {item.occupiedRooms}/8 Kamar
                </div>

                {/* Batang Grafik Bertumpuk (Walk-in vs WA) */}
                <div className="w-full max-w-[36px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-32 relative">
                  <div
                    style={{ height: `${item.ratePercent}%` }}
                    className={`w-full rounded-t-xl transition-all duration-300 flex flex-col justify-end ${
                      isToday
                        ? "bg-gradient-to-t from-purple-700 to-indigo-600 shadow-sm"
                        : isHovered
                          ? "bg-purple-600"
                          : "bg-purple-400/90 hover:bg-purple-500"
                    }`}
                  >
                    {/* Pembagi proporsi kecil di dalam bar */}
                    <div className="w-full h-1 bg-white/30" />
                  </div>
                </div>

                {/* Label Hari */}
                <div className="text-center">
                  <span
                    className={`text-[11px] font-black block leading-none ${
                      isToday ? "text-purple-900 font-extrabold" : "text-slate-600"
                    }`}
                  >
                    {item.day}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium block mt-0.5">
                    {item.date.split(" ")[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend Informasi */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-purple-700" />
              <span>Hari Ini (Aktif)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-purple-400" />
              <span>Hari Sebelumnya</span>
            </span>
          </div>

          {hoveredIdx !== null && (
            <span className="font-extrabold text-purple-950 text-xs">
              {WEEKLY_DATA[hoveredIdx].day} ({WEEKLY_DATA[hoveredIdx].date}):{" "}
              <strong className="text-emerald-700 font-black">
                {WEEKLY_DATA[hoveredIdx].ratePercent}% Okupansi
              </strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
