"use client";

import { Calendar, Moon } from "lucide-react";
import { useRef } from "react";

interface RoomFilterProps {
  checkInDate: string;
  onCheckInDateChange: (date: string) => void;
  nights: number;
  onNightsChange: (nights: number) => void;
}

export function RoomFilter({
  checkInDate,
  onCheckInDateChange,
  nights,
  onNightsChange,
}: RoomFilterProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const nightsSelectRef = useRef<HTMLSelectElement>(null);

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const formattedDate = checkInDate
    ? new Date(checkInDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Pilih Tanggal";

  return (
    <section className="max-w-xl mx-auto px-4 mt-3 sm:mt-4 relative z-20">
      <div className="bg-white rounded-3xl border border-[#e9e8ea] p-3 sm:p-4 shadow-[0px_6px_25px_rgba(226,223,254,0.4)]">
        {/* Input Check-in & Durasi */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 items-center">
          {/* Card Input Check-in (Seluruh area card dapat diklik untuk membuka calendar picker) */}
          <label
            htmlFor="kamar-checkin-date"
            className="relative bg-[#f4f2f4]/60 hover:bg-[#f4f2f4] border border-[#e9e8ea] hover:border-[#3c315b]/40 rounded-2xl py-2.5 px-3.5 sm:py-3 sm:px-4 transition flex items-center justify-between cursor-pointer focus-within:border-[#3c315b]"
          >
            <div className="pointer-events-none select-none">
              <span className="text-[10px] font-normal text-[#86848d] uppercase tracking-wider block">
                TGL CHECK-IN
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#1c1c1c] block leading-tight mt-0.5">
                {formattedDate}
              </span>
            </div>
            <Calendar className="w-4 h-4 text-[#3c315b] shrink-0 pointer-events-none" />
            <input
              ref={dateInputRef}
              id="kamar-checkin-date"
              aria-label="Tanggal Check-In"
              type="date"
              min={todayStr}
              value={checkInDate}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  try {
                    e.currentTarget.showPicker();
                  } catch {
                    // ignore
                  }
                }
              }}
              onClick={(e) => {
                try {
                  e.currentTarget.showPicker();
                } catch {
                  // ignore
                }
              }}
              onChange={(e) => onCheckInDateChange(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
            />
          </label>

          {/* Card Input Lama Menginap (Seluruh area card dapat diklik untuk membuka dropdown) */}
          <label
            htmlFor="kamar-nights"
            className="relative bg-[#f4f2f4]/60 hover:bg-[#f4f2f4] border border-[#e9e8ea] hover:border-[#3c315b]/40 rounded-2xl py-2.5 px-3.5 sm:py-3 sm:px-4 transition flex items-center justify-between cursor-pointer focus-within:border-[#3c315b]"
          >
            <div className="pointer-events-none select-none">
              <span className="text-[10px] font-normal text-[#86848d] uppercase tracking-wider block">
                LAMA MENGINAP
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#1c1c1c] block leading-tight mt-0.5">
                {nights} Malam {nights === 1 ? "Transit" : ""}
              </span>
            </div>
            <Moon className="w-4 h-4 text-[#3c315b] shrink-0 pointer-events-none" />
            <select
              ref={nightsSelectRef}
              id="kamar-nights"
              aria-label="Lama Menginap"
              value={nights}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  try {
                    e.currentTarget.showPicker();
                  } catch {
                    // ignore
                  }
                }
              }}
              onClick={(e) => {
                try {
                  e.currentTarget.showPicker();
                } catch {
                  // ignore
                }
              }}
              onChange={(e) => onNightsChange(Number(e.target.value))}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
            >
              <option value={1}>1 Malam Transit</option>
              <option value={2}>2 Malam</option>
              <option value={3}>3 Malam</option>
              <option value={4}>4 Malam</option>
              <option value={5}>5 Malam</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}
