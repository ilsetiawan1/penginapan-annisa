"use client";

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { CALENDAR_DAYS_HEADER, formatIdDate } from "./advance-booking-types";

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
    <div className="lg:col-span-5 bg-slate-50/70 rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs space-y-2.5">
      {/* Header Mini Calendar */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900 capitalize tracking-tight flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-700" />
          <span>{calMonthName}</span>
        </h4>
        <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() =>
              setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
            }
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() =>
              setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
            }
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer"
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
            className={`text-[10px] font-bold uppercase ${
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
            "h-7 sm:h-7.5 text-xs font-semibold transition-all relative flex items-center justify-center cursor-pointer ";

          if (isPast) {
            dayClass += "text-slate-300 cursor-not-allowed ";
          } else if (isCheckIn) {
            dayClass += "bg-slate-900 text-white font-bold rounded-l-xl z-10 shadow-xs ";
          } else if (isCheckOut) {
            dayClass += "bg-slate-800 text-white font-bold rounded-r-xl z-10 shadow-xs ";
          } else if (isInStayRange) {
            dayClass += "bg-slate-200 text-slate-900 font-semibold rounded-none ";
          } else {
            dayClass += "text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-lg ";
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

      {/* Box Ringkasan Statis Rentang Tanggal */}
      <div className="pt-2 border-t border-slate-200/80">
        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs shadow-2xs">
          <div>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
              Rentang Menginap
            </span>
            <span className="font-semibold text-slate-800 text-xs">
              {formatIdDate(checkInDate)} → {formatIdDate(checkOutDate)}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-lg">
            {nights} Malam
          </span>
        </div>
      </div>

      {/* Rangkuman Biaya & Waktu Check-In/Out */}
      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs shadow-2xs space-y-1.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">
              Total Tagihan
            </span>
            <strong className="text-xs sm:text-sm font-bold text-slate-900">
              Rp {totalAmount.toLocaleString("id-ID")}
            </strong>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">
              Sisa di Lokasi
            </span>
            <strong className="text-xs sm:text-sm font-bold text-amber-700">
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
