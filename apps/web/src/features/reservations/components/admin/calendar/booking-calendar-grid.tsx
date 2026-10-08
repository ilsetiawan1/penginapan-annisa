"use client";

import { CreateButton } from "@/components/ui/create-button";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import type { AdvanceBookingData, BookingChannel } from "../modals";

interface BookingCalendarGridProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  getBookingsForDate: (dayNumber: number) => (AdvanceBookingData & {
    nightIndex: number;
    isFirstNight: boolean;
    isLastNight: boolean;
  })[];
  onOpenAddModal: () => void;
  onRefresh?: () => void;
}

const DAYS_OF_WEEK = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function ChannelBadgeTag({ channel }: { channel?: BookingChannel }) {
  if (channel === "walk_in") {
    return (
      <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
        Walk-in
      </span>
    );
  }
  if (channel === "phone") {
    return (
      <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-sky-50 text-sky-700 border border-sky-200">
        Telp
      </span>
    );
  }
  return (
    <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
      WA
    </span>
  );
}

export function BookingCalendarGrid({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  selectedDate,
  onSelectDate,
  getBookingsForDate,
  onOpenAddModal,
  onRefresh,
}: BookingCalendarGridProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5">
      {/* Header Kalender: Bulan, Navigasi, Refresh, & Tambah Reservasi */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 capitalize tracking-tight">
            {monthName}
          </h3>
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={onPrevMonth}
              aria-label="Bulan sebelumnya"
              className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onNextMonth}
              aria-label="Bulan berikutnya"
              className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              title="Perbarui Jadwal Kalender"
              className="p-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold hidden sm:inline">Refresh</span>
            </button>
          )}

          <CreateButton onClick={onOpenAddModal}>Reservasi Baru</CreateButton>
        </div>
      </div>

      {/* Header Nama Hari */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS_OF_WEEK.map((day, idx) => (
          <span
            key={day}
            className={`text-[11px] font-bold uppercase tracking-wider py-1 ${
              idx === 0 ? "text-rose-500" : "text-slate-400"
            }`}
          >
            {day}
          </span>
        ))}
      </div>

      {/* Grid Tanggal */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {/* Tanggal Bulan Sebelumnya */}
        {Array.from({ length: firstDayIndex }).map((_, i) => {
          const prevDay = daysInPrevMonth - firstDayIndex + i + 1;
          return (
            <div
              key={`prev-${prevDay}`}
              className="min-h-[64px] sm:min-h-[74px] p-1.5 rounded-xl bg-slate-50/50 text-slate-300 text-xs font-medium select-none"
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
              className={`w-full text-left min-h-[64px] sm:min-h-[74px] p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-50 border-slate-900 ring-2 ring-slate-900/10 shadow-xs"
                  : hasBookings
                    ? "bg-[#faf9fc] border-[#e2dcf2] hover:border-slate-300"
                    : "bg-white border-slate-200/70 hover:border-slate-300 hover:bg-slate-50/60"
              }`}
            >
              {/* Nomor Tanggal & Indikator Titik */}
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full ${
                    isSelected
                      ? "bg-slate-900 text-white"
                      : hasBookings
                        ? "text-slate-900 font-bold"
                        : "text-slate-700"
                  }`}
                >
                  {dayNum}
                </span>

                {hasBookings && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                    title={`${dayBookings.length} kamar terisi/dipesan`}
                  />
                )}
              </div>

              {/* Event Pill Badges */}
              <div className="space-y-1 overflow-hidden w-full mt-1">
                {dayBookings.slice(0, 2).map((bk) => (
                  <div
                    key={`${bk.id}-${bk.nightIndex}`}
                    className="text-[9px] font-normal px-1.5 py-0.5 rounded-md flex items-center justify-between gap-1 border leading-tight bg-white border-slate-200/90 text-slate-700 shadow-2xs"
                    title={`#${bk.roomCode} - ${bk.guestName} (${bk.nights} Malam)`}
                  >
                    <span className="font-normal truncate">#{bk.roomCode}</span>
                    <ChannelBadgeTag channel={bk.channel} />
                  </div>
                ))}
                {dayBookings.length > 2 && (
                  <span className="text-[8px] font-bold text-slate-500 block pl-0.5">
                    +{dayBookings.length - 2} lagi
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
