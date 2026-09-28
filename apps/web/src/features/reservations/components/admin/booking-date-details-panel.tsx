"use client";

import { useState } from "react";
import { Calendar, CheckCircle2, ChevronDown, Moon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  type AdvanceBookingData,
  extractIsoString,
  formatIdDate,
  parseIsoDate,
  toIsoDate,
} from "./advance-booking-modal";

interface BookingDateDetailsPanelProps {
  selectedDate: Date;
  bookings: AdvanceBookingData[];
  onOpenAddModal?: () => void;
  onCheckInNow?: (booking: AdvanceBookingData) => void;
}

function formatStayRange(inDateStr: string, outDateStr: string): string {
  try {
    const dIn = new Date(inDateStr);
    const dOut = new Date(outDateStr);
    if (isNaN(dIn.getTime()) || isNaN(dOut.getTime())) {
      return `${formatIdDate(inDateStr)} – ${formatIdDate(outDateStr)}`;
    }
    const dayIn = dIn.getDate();
    const monthIn = dIn.toLocaleDateString("id-ID", { month: "short" });
    const yearIn = dIn.getFullYear();
    const dayOut = dOut.getDate();
    const monthOut = dOut.toLocaleDateString("id-ID", { month: "short" });
    const yearOut = dOut.getFullYear();

    if (yearIn === yearOut) {
      if (monthIn === monthOut) {
        return `${dayIn}–${dayOut} ${monthIn} ${yearIn}`;
      }
      return `${dayIn} ${monthIn} – ${dayOut} ${monthOut} ${yearIn}`;
    }
    return `${dayIn} ${monthIn} ${yearIn} – ${dayOut} ${monthOut} ${yearOut}`;
  } catch {
    return `${formatIdDate(inDateStr)} – ${formatIdDate(outDateStr)}`;
  }
}

export function BookingDateDetailsPanel({
  selectedDate,
  bookings,
  onOpenAddModal,
  onCheckInNow,
}: BookingDateDetailsPanelProps) {
  // State untuk melacak card mana saja yang sedang di-expand (default: semua tertutup/collapsed)
  const [expandedCardKeys, setExpandedCardKeys] = useState<Record<string, boolean>>({});

  const toggleCard = (cardKey: string) => {
    setExpandedCardKeys((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));
  };

  const formattedDateHeader = selectedDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const selectedDateIso = toIsoDate(selectedDate);

  // Filter booking aktif di tanggal terpilih (Mendukung Multi-Malam menginap)
  const selectedDateBookings = bookings
    .filter((b) => {
      if (b.status === "cancelled") return false;
      const inIso = b.checkInIso || extractIsoString(b.checkInDate);
      const outIso = b.checkOutIso || extractIsoString(b.checkOutDate);
      if (!inIso || !outIso) return false;
      return selectedDateIso >= inIso && selectedDateIso < outIso;
    })
    .map((b) => {
      const inIso = b.checkInIso || extractIsoString(b.checkInDate);
      let nightIndex = 1;
      try {
        const dTarget = parseIsoDate(selectedDateIso);
        const dIn = parseIsoDate(inIso);
        const diffDays = Math.round(
          (dTarget.getTime() - dIn.getTime()) / (1000 * 60 * 60 * 24),
        );
        nightIndex = diffDays + 1;
      } catch {
        nightIndex = 1;
      }

      return {
        ...b,
        nightIndex,
        isFirstNight: inIso === selectedDateIso,
        isLastNight: nightIndex === b.nights,
      };
    });

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-white/60 shadow-xl shadow-purple-500/5 space-y-3.5 flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Banner Header Tanggal Terpilih: Frosted Glass Gradient */}
        <div className="bg-gradient-to-r from-purple-700/95 via-purple-800/90 to-purple-950/95 text-white backdrop-blur-md border border-white/20 rounded-2xl p-3.5 shadow-lg shadow-purple-900/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-purple-200/90 block uppercase tracking-wider">
              Detail Reservasi Tanggal:
            </span>
            <h4 className="text-sm sm:text-base font-black leading-tight mt-0.5 drop-shadow-xs">
              {formattedDateHeader}
            </h4>
          </div>
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-xl border border-white/30 shadow-xs">
            {selectedDateBookings.length} Tamu
          </span>
        </div>

        {/* Daftar Booking pada Tanggal Terpilih: Accordion Glassmorphism Cards */}
        {selectedDateBookings.length > 0 ? (
          <div className="space-y-2 overflow-y-auto max-h-[420px] pr-0.5">
            {selectedDateBookings.map((b) => {
              const cardKey = `${b.id}-${b.nightIndex}`;
              const isExpanded = !!expandedCardKeys[cardKey];

              return (
                <div
                  key={cardKey}
                  className={`bg-white/70 hover:bg-white/95 backdrop-blur-md border transition-all duration-200 rounded-2xl p-3 shadow-xs hover:shadow-md ${
                    isExpanded
                      ? "border-purple-300 ring-1 ring-purple-200/60 bg-white/95"
                      : "border-purple-100/90 hover:border-purple-200"
                  }`}
                >
                  {/* Header Card Booking (Clickable Accordion Trigger) */}
                  <button
                    type="button"
                    onClick={() => toggleCard(cardKey)}
                    className="w-full text-left flex items-center justify-between gap-2 cursor-pointer select-none group focus:outline-hidden"
                    title={isExpanded ? "Tutup rincian pesanan" : "Buka rincian pesanan"}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-purple-100/80 backdrop-blur-xs text-purple-950 border border-purple-200 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        #{b.roomCode}
                      </div>
                      <div className="min-w-0 flex-1">
                        <strong className="text-xs sm:text-sm font-black text-slate-900 block leading-snug break-words">
                          {b.guestName}
                        </strong>
                        <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                          {b.roomTypeName.replace(/^(Kamar|Tipe)\s+/gi, "")} • {b.nights} Malam
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-center">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-black px-2 py-0.5 rounded-lg shadow-2xs">
                        {b.dpPaid >= b.totalAmount ? "Lunas" : "DP Lunas"}
                      </span>

                      {/* Dropdown Chevron Indicator */}
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          isExpanded
                            ? "bg-purple-600 text-white shadow-2xs"
                            : "bg-purple-50 text-purple-600 group-hover:bg-purple-100"
                        }`}
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Konten Rincian Pesanan (Dropdown/Accordion Body) */}
                  {isExpanded && (
                    <div className="pt-2.5 mt-2.5 border-t border-purple-100/80 space-y-2.5 animate-in fade-in-50 duration-200">
                      {/* Kotak Rincian Glass Translucent */}
                      <div className="bg-purple-50/60 backdrop-blur-xs rounded-xl p-2.5 border border-purple-100/70 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-slate-500 text-[11px] shrink-0">Rentang Tgl:</span>
                          <strong className="text-slate-900 font-bold text-[11px] text-right">
                            {formatStayRange(b.checkInDate, b.checkOutDate)}
                          </strong>
                        </div>
                        {b.nights > 1 && (
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-500 text-[11px] shrink-0">Status Hari Ini:</span>
                            <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                              <Moon className="w-2.5 h-2.5" />
                              <span>Malam ke-{b.nightIndex} dari {b.nights}</span>
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-slate-500 text-[11px] shrink-0">No. WhatsApp:</span>
                          <strong className="text-slate-900 font-bold text-[11px] text-right">
                            {b.guestPhone}
                          </strong>
                        </div>
                        {b.notes && (
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-500 text-[11px] shrink-0">Jam Tiba:</span>
                            <strong className="text-purple-800 font-bold text-[11px] text-right">
                              {b.notes}
                            </strong>
                          </div>
                        )}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-slate-500 text-[11px] shrink-0">DP Ditransfer:</span>
                          <strong className="text-emerald-700 font-black text-[11px] text-right">
                            Rp {b.dpPaid.toLocaleString("id-ID")}
                          </strong>
                        </div>
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-purple-100/80">
                          <span className="text-slate-500 text-[11px] shrink-0">Sisa Pelunasan:</span>
                          <strong className="text-purple-950 font-black text-xs text-right">
                            Rp {b.remainingAmount.toLocaleString("id-ID")}
                          </strong>
                        </div>
                      </div>

                      {/* Tombol Aksi Glass */}
                      <div className="flex items-center justify-between gap-1.5 pt-0.5">
                        <a
                          href={`https://wa.me/${b.guestPhone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300/80 bg-emerald-50/80 backdrop-blur-xs text-emerald-800 text-[11px] font-extrabold hover:bg-emerald-100 transition shadow-2xs"
                        >
                          <FaWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Chat WA</span>
                        </a>

                        {onCheckInNow && (
                          <button
                            type="button"
                            onClick={() => onCheckInNow(b)}
                            className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-[11px] font-black shadow-xs hover:shadow-md transition cursor-pointer flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Masuk Kamar</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 text-center border border-dashed border-purple-200/80 space-y-1.5 my-2 shadow-2xs">
            <Calendar className="w-8 h-8 text-purple-300 mx-auto" />
            <p className="text-xs font-extrabold text-slate-700">
              Belum ada booking di tanggal ini
            </p>
            <p className="text-[10px] text-slate-500">
              Seluruh 8 unit kamar bebas untuk menerima reservasi atau tamu walk-in.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
