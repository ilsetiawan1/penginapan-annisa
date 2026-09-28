"use client";

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  CALENDAR_DAYS_HEADER,
  addDays,
  formatIdDate,
} from "./advance-booking-types";

interface AdvanceBookingCalendarProps {
  calendarMonth: Date;
  setCalendarMonth: React.Dispatch<React.SetStateAction<Date>>;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  todayIso: string;
  totalAmount: number;
  remainingAmount: number;
  onCalendarDayClick: (isoDate: string) => void;
  onCheckInChange: (isoDate: string) => void;
  onCheckOutChange: (isoDate: string) => void;
  onNightsChange: (nights: number) => void;
}

export function AdvanceBookingCalendar({
  calendarMonth,
  setCalendarMonth,
  checkInDate,
  checkOutDate,
  nights,
  todayIso,
  totalAmount,
  remainingAmount,
  onCalendarDayClick,
  onCheckInChange,
  onCheckOutChange,
  onNightsChange,
}: AdvanceBookingCalendarProps) {
  const calYear = calendarMonth.getFullYear();
  const calMonth = calendarMonth.getMonth();
  const calMonthName = calendarMonth.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
  const daysInCalMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
  const prevMonthDays = new Date(calYear, calMonth, 0).getDate();

  return (
    <div className="lg:col-span-5 bg-[#faf8fe] rounded-2xl p-3 sm:p-3.5 border border-purple-100/90 shadow-2xs space-y-2.5">
      {/* Header Mini Calendar */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs sm:text-sm font-black text-slate-900 capitalize tracking-tight flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-purple-700" />
          <span>{calMonthName}</span>
        </h4>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() =>
              setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
            }
            className="p-1 rounded-lg hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() =>
              setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
            }
            className="p-1 rounded-lg hover:bg-purple-50 text-slate-600 hover:text-purple-700 transition cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hari dalam Minggu */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {CALENDAR_DAYS_HEADER.map((d, idx) => (
          <span
            key={d}
            className={`text-[10px] font-black uppercase ${
              idx === 0 ? "text-rose-500" : "text-slate-400"
            }`}
          >
            {d}
          </span>
        ))}
      </div>

      {/* Grid Hari Kalender */}
      <div className="grid grid-cols-7 gap-1">
        {/* Hari padding bulan sebelumnya */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => {
          const pDay = prevMonthDays - firstDayOfWeek + i + 1;
          return (
            <div
              key={`p-${pDay}`}
              className="h-7 sm:h-7.5 flex items-center justify-center text-[10px] text-slate-300 select-none"
            >
              {pDay}
            </div>
          );
        })}

        {/* Hari bulan berjalan */}
        {Array.from({ length: daysInCalMonth }).map((_, i) => {
          const dayNum = i + 1;
          const thisIso = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
          const isPast = thisIso < todayIso;
          const isCheckIn = thisIso === checkInDate;
          const isCheckOut = thisIso === checkOutDate;
          const isInStayRange = thisIso >= checkInDate && thisIso < checkOutDate;

          let dayClass =
            "h-7 sm:h-7.5 text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer ";

          if (isPast) {
            dayClass += "text-slate-300 cursor-not-allowed ";
          } else if (isCheckIn) {
            dayClass +=
              "bg-purple-700 text-white font-black rounded-l-xl z-10 shadow-xs ";
          } else if (isCheckOut) {
            dayClass +=
              "bg-purple-900 text-white font-black rounded-r-xl z-10 shadow-xs ";
          } else if (isInStayRange) {
            dayClass += "bg-purple-200/80 text-purple-950 font-black rounded-none ";
          } else {
            dayClass += "text-slate-700 hover:bg-purple-100 hover:text-purple-900 rounded-lg ";
          }

          return (
            <button
              key={`d-${dayNum}`}
              type="button"
              disabled={isPast}
              onClick={() => onCalendarDayClick(thisIso)}
              className={dayClass}
              title={`Klik untuk memilih tanggal ${dayNum} ${calMonthName}`}
            >
              <span>{dayNum}</span>
            </button>
          );
        })}
      </div>

      {/* Input Tanggal Langsung & Durasi Menginap */}
      <div className="pt-2 border-t border-purple-100/90 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5">
            <label
              htmlFor="adv-in"
              className="text-[9px] font-black text-slate-700 uppercase tracking-wider block"
            >
              Tgl Check-In
            </label>
            <input
              id="adv-in"
              type="date"
              required
              min={todayIso}
              value={checkInDate}
              onChange={(e) => onCheckInChange(e.target.value)}
              className="w-full bg-white border border-purple-200 focus:border-purple-600 rounded-lg px-2 py-1 text-xs font-black text-slate-900 outline-none"
            />
          </div>

          <div className="space-y-0.5">
            <label
              htmlFor="adv-out"
              className="text-[9px] font-black text-slate-700 uppercase tracking-wider block"
            >
              Tgl Check-Out
            </label>
            <input
              id="adv-out"
              type="date"
              required
              min={addDays(checkInDate, 1)}
              value={checkOutDate}
              onChange={(e) => onCheckOutChange(e.target.value)}
              className="w-full bg-white border border-purple-200 focus:border-purple-600 rounded-lg px-2 py-1 text-xs font-black text-slate-900 outline-none"
            />
          </div>
        </div>

        {/* Selector Durasi Malam */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="adv-dur"
              className="text-[9px] font-black text-slate-700 uppercase tracking-wider block"
            >
              Durasi Menginap
            </label>
            <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">
              {nights} Malam
            </span>
          </div>
          <select
            id="adv-dur"
            value={nights}
            onChange={(e) => onNightsChange(Number(e.target.value))}
            className="w-full bg-white border border-purple-200 focus:border-purple-600 rounded-lg px-2 py-1 text-xs font-bold text-slate-900 outline-none cursor-pointer"
          >
            <option value={1}>1 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 1))})</option>
            <option value={2}>2 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 2))})</option>
            <option value={3}>3 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 3))})</option>
            <option value={4}>4 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 4))})</option>
            <option value={5}>5 Malam ({formatIdDate(checkInDate)} – {formatIdDate(addDays(checkInDate, 5))})</option>
            <option value={7}>7 Malam (1 Minggu)</option>
            <option value={14}>14 Malam (2 Minggu)</option>
          </select>
        </div>
      </div>

      {/* Rangkuman Biaya & Waktu Check-In/Out */}
      <div className="bg-white p-2.5 rounded-xl border border-purple-200/90 text-xs shadow-2xs space-y-1.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">
              Total Tagihan • {nights} Malam
            </span>
            <strong className="text-xs sm:text-sm font-black text-purple-950">
              Rp {totalAmount.toLocaleString("id-ID")}
            </strong>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">
              Sisa di Lokasi
            </span>
            <strong className="text-xs sm:text-sm font-black text-amber-700">
              Rp {remainingAmount.toLocaleString("id-ID")}
            </strong>
          </div>
        </div>
        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
          <span>Check-in 14:00 WIT</span>
          <span>•</span>
          <span>Check-out 12:00 WIT</span>
        </div>
      </div>
    </div>
  );
}
