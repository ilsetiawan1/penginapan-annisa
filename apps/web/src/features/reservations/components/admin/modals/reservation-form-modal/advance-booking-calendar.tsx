"use client";

import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { CALENDAR_DAYS_HEADER, formatIdDate, parseIsoDate } from "./advance-booking-types";

function formatStayDates(checkIn: string, checkOut: string): string {
  if (!checkIn || !checkOut) return "";
  const dIn =
    typeof checkIn === "string" && !checkIn.includes("T")
      ? parseIsoDate(checkIn)
      : new Date(checkIn);
  const dOut =
    typeof checkOut === "string" && !checkOut.includes("T")
      ? parseIsoDate(checkOut)
      : new Date(checkOut);
  if (Number.isNaN(dIn.getTime()) || Number.isNaN(dOut.getTime())) {
    return `${formatIdDate(checkIn)} – ${formatIdDate(checkOut)}`;
  }
  const inDay = dIn.getDate();
  const inMonth = dIn.toLocaleDateString("id-ID", { month: "short" });
  const inYear = dIn.getFullYear();
  const outDay = dOut.getDate();
  const outMonth = dOut.toLocaleDateString("id-ID", { month: "short" });
  const outYear = dOut.getFullYear();

  if (inYear === outYear) {
    return `${inDay} ${inMonth} – ${outDay} ${outMonth} ${outYear}`;
  }
  return `${inDay} ${inMonth} ${inYear} – ${outDay} ${outMonth} ${outYear}`;
}

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
    <div className="md:col-span-5 bg-slate-50/70 rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-2xs space-y-2.5">
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
          } else if (isCheckIn && isCheckOut) {
            dayClass += "bg-[#3c315b] text-white font-bold rounded-xl z-10 shadow-sm ";
          } else if (isCheckIn) {
            dayClass += "bg-[#3c315b] text-white font-bold rounded-l-xl z-10 shadow-sm ";
          } else if (isCheckOut) {
            dayClass += "bg-[#3c315b] text-white font-bold rounded-r-xl z-10 shadow-sm ";
          } else if (isInStayRange) {
            dayClass += "bg-[#ede8f5] text-[#3c315b] font-semibold rounded-none ";
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

      {/* Box Ringkas: Rentang Menginap & Total Tagihan */}
      <div className="pt-2 border-t border-slate-200/80">
        <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs shadow-2xs space-y-1">
          <div className="text-slate-800 text-[11px] sm:text-xs font-medium leading-relaxed">
            <span className="font-semibold text-slate-900">
              {formatStayDates(checkInDate, checkOutDate)}
            </span>
            <span className="text-slate-600"> ({nights} Malam)</span>
            <span className="text-slate-400 mx-1.5">•</span>
            <span>
              Total:{" "}
              <strong className="font-bold text-slate-900">
                Rp {totalAmount.toLocaleString("id-ID")}
              </strong>
            </span>
            <span className="text-slate-500">
              {" "}
              (Sisa:{" "}
              <strong
                className={
                  remainingAmount > 0
                    ? "font-semibold text-amber-700"
                    : "font-semibold text-emerald-700"
                }
              >
                Rp {remainingAmount.toLocaleString("id-ID")}
              </strong>
              )
            </span>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>Check-in 14:00 WIT</span>
            <span>•</span>
            <span>Check-out 12:00 WIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
