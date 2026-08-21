"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import type { AdvanceBookingData } from "./advance-booking-modal";

interface BookingCalendarGridProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  bookings: AdvanceBookingData[];
  onOpenAddModal: () => void;
}

const DAYS_OF_WEEK = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export function BookingCalendarGrid({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  selectedDate,
  onSelectDate,
  bookings,
  onOpenAddModal,
}: BookingCalendarGridProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  // Hitung jumlah hari dalam bulan & hari pertama dalam minggu
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Hari dari bulan sebelumnya untuk padding grid
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Ambil booking untuk tanggal tertentu
  const getBookingsForDate = (dayNumber: number) => {
    const targetDateStr = `${dayNumber} ${currentMonth.toLocaleDateString("id-ID", { month: "short" })} ${year}`;
    return bookings.filter(
      (b) =>
        b.checkInDate.toLowerCase().includes(targetDateStr.toLowerCase()) ||
        // Cek format tanggal alternatif
        (b.checkInDate.startsWith(`${dayNumber} `) && b.checkInDate.endsWith(`${year}`)),
    );
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3.5">
      {/* Header Kalender: Bulan & Navigasi Panah + Tombol Tambah Booking */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <h3 className="text-base sm:text-lg font-black text-slate-900 capitalize tracking-tight">
            {monthName}
          </h3>
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={onPrevMonth}
              aria-label="Bulan sebelumnya"
              className="p-1 rounded-lg hover:bg-white text-slate-700 hover:text-purple-700 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNextMonth}
              aria-label="Bulan berikutnya"
              className="p-1 rounded-lg hover:bg-white text-slate-700 hover:text-purple-700 transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black shadow-xs flex items-center gap-1.5 cursor-pointer transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Catat Booking WA</span>
        </button>
      </div>

      {/* Header Nama Hari: Min, Sen, Sel, Rab, Kam, Jum, Sab */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS_OF_WEEK.map((day, idx) => (
          <span
            key={day}
            className={`text-[11px] font-black uppercase tracking-wider py-1 ${
              idx === 0 ? "text-rose-500" : "text-slate-500"
            }`}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Grid Seluruh Tanggal dalam Bulan (7 Kolom) */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {/* Tanggal dari bulan sebelumnya (Abu-abu) */}
        {Array.from({ length: firstDayIndex }).map((_, i) => {
          const prevDay = daysInPrevMonth - firstDayIndex + i + 1;
          return (
            <div
              key={`prev-${prevDay}`}
              className="min-h-[58px] sm:min-h-[70px] p-1 rounded-xl bg-slate-50/50 text-slate-300 text-xs font-semibold select-none"
            >
              <span className="text-[10px] block">{prevDay}</span>
            </div>
          );
        })}

        {/* Tanggal Bulan Berjalan */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const thisDate = new Date(year, month, dayNum);
          const isSelected = isSameDay(thisDate, selectedDate);
          const dayBookings = getBookingsForDate(dayNum);
          const hasBookings = dayBookings.length > 0;

          return (
            <button
              type="button"
              key={`day-${dayNum}`}
              onClick={() => onSelectDate(thisDate)}
              className={`w-full text-left min-h-[58px] sm:min-h-[70px] p-1 sm:p-1.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-purple-50/90 border-purple-600 ring-2 ring-purple-400/50 shadow-xs"
                  : hasBookings
                  ? "bg-purple-50/40 border-purple-200 hover:border-purple-300"
                  : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              {/* Nomor Tanggal & Indikator Titik */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full ${
                    isSelected
                      ? "bg-purple-700 text-white"
                      : hasBookings
                        ? "text-purple-950"
                        : "text-slate-700"
                  }`}
                >
                  {dayNum}
                </span>

                {hasBookings && <span className="w-1.5 h-1.5 rounded-full bg-purple-700" />}
              </div>

              {/* Event Pill Badges (Highlight Warna Booking) */}
              <div className="space-y-0.5 overflow-hidden">
                {dayBookings.slice(0, 2).map((bk) => (
                  <div
                    key={bk.id}
                    className="truncate text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-200/80 text-purple-950 border border-purple-300/80 leading-tight"
                    title={`#${bk.roomCode}: ${bk.guestName}`}
                  >
                    #{bk.roomCode} {bk.guestName.split(" ")[0]}
                  </div>
                ))}
                {dayBookings.length > 2 && (
                  <span className="text-[8px] font-extrabold text-purple-700 block pl-0.5">
                    +{dayBookings.length - 2} lagi
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
