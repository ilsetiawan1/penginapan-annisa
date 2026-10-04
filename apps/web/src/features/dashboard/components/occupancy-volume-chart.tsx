"use client";

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

const DAYS_MAP = [
  { day: "Min", fullDay: "Minggu" },
  { day: "Sen", fullDay: "Senin" },
  { day: "Sel", fullDay: "Selasa" },
  { day: "Rab", fullDay: "Rabu" },
  { day: "Kam", fullDay: "Kamis" },
  { day: "Jum", fullDay: "Jumat" },
  { day: "Sab", fullDay: "Sabtu" },
];

export function OccupancyVolumeChart({
  occupiedRooms = 0,
  totalRooms = 8,
  todayRevenue = 0,
}: OccupancyVolumeChartProps) {
  const currentDayIndex = new Date().getDay();
  const [selectedIdx, setSelectedIdx] = useState<number>(currentDayIndex);
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");

  const maxRooms = totalRooms > 0 ? totalRooms : 8;

  const weeklyData: DailyData[] = DAYS_MAP.map((d, index) => {
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

  const activeItem = weeklyData[selectedIdx] || weeklyData[currentDayIndex];

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-gray-100 gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Tren Okupansi &amp; Volume Hunian</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Pemantauan ketersediaan kamar harian selama seminggu
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center text-[10px] font-bold text-[#594791] bg-[#ede8f8] border border-[#ddd3f3] px-2 py-1 rounded-lg">
              Target: 6 Kamar (75%)
            </span>

            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setPeriod("weekly")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  period === "weekly"
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Mingguan
              </button>
              <button
                type="button"
                onClick={() => setPeriod("monthly")}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  period === "monthly"
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Bulanan
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-baseline gap-3">
          <span className="text-xl sm:text-2xl font-medium text-gray-800 tracking-tight leading-none">
            <span className="font-bold text-slate-900">
              {activeItem.rooms} / {maxRooms}
            </span>{" "}
            Kamar Terisi
          </span>
          <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
            +{activeItem.occupancyPercent}% Okupansi
          </span>
          <span className="text-xs text-slate-400 font-medium">
            ({activeItem.fullDay} • Rp {activeItem.revenue.toLocaleString("id-ID")})
          </span>
        </div>
      </div>

      <div className="mt-3 relative pt-4 flex-1 min-h-0 flex flex-col justify-end">
        <div className="flex items-end justify-between gap-2 sm:gap-4 h-36 sm:h-44 lg:h-48 relative z-10">
          <div className="flex-1 flex items-end justify-between gap-1.5 sm:gap-3 h-full pb-6">
            {weeklyData.map((item, idx) => {
              const isSelected = selectedIdx === idx;
              const barHeightPercent = (item.rooms / maxRooms) * 100;

              return (
                <button
                  type="button"
                  key={item.day}
                  onClick={() => setSelectedIdx(idx)}
                  className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer relative bg-transparent border-0 p-0 text-left"
                >
                  {isSelected && (
                    <div className="absolute -top-7 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold tracking-wide shadow-md whitespace-nowrap z-20 flex items-center">
                      <span>
                        {item.day}: {item.rooms} Kamar
                      </span>
                    </div>
                  )}

                  <div className="w-full max-w-[36px] bg-slate-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-full relative p-0.5 group-hover:bg-slate-200/70 transition-colors">
                    <div
                      style={{ height: `${barHeightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        isSelected
                          ? "bg-slate-900 shadow-md shadow-slate-950/20"
                          : item.isToday
                            ? "bg-[#7a68b7] group-hover:bg-[#594791]"
                            : "bg-slate-200 group-hover:bg-[#ede8f8]"
                      }`}
                    />
                  </div>

                  <span
                    className={`text-[11px] font-semibold mt-2 leading-none transition-colors ${
                      isSelected
                        ? "text-slate-900 font-bold"
                        : item.isToday
                          ? "text-[#594791] font-bold"
                          : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {item.day}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-8 flex flex-col justify-between items-end h-full pb-6 text-[10px] font-semibold text-slate-400 select-none shrink-0">
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
