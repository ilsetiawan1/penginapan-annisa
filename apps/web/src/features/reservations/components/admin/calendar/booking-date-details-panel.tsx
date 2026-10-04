"use client";

import { Calendar, CheckCircle2, ChevronDown, Moon } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import type { AdvanceBookingData, BookingChannel } from "../modals";

interface BookingDateDetailsPanelProps {
  selectedDate: Date;
  bookings: (AdvanceBookingData & {
    nightIndex: number;
    isFirstNight: boolean;
    isLastNight: boolean;
  })[];
  onOpenAddModal?: () => void;
  onCheckInNow?: (booking: AdvanceBookingData) => void;
}

function ChannelBadge({ channel }: { channel?: BookingChannel }) {
  if (channel === "walk_in") {
    return (
      <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
        Walk-in
      </span>
    );
  }
  if (channel === "phone") {
    return (
      <span className="bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
        Telepon
      </span>
    );
  }
  return (
    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
      <FaWhatsapp className="w-2.5 h-2.5" />
      <span>WA</span>
    </span>
  );
}

export function BookingDateDetailsPanel({
  selectedDate,
  bookings,
  onCheckInNow,
}: BookingDateDetailsPanelProps) {
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

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3.5 flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Banner Header Tanggal Terpilih: Card Slate-900 Modern */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
              Detail Reservasi Tanggal
            </span>
            <h4 className="text-sm sm:text-base font-bold leading-tight mt-0.5 text-white">
              {formattedDateHeader}
            </h4>
          </div>
          <span className="bg-white/10 text-white text-xs font-semibold px-2.5 py-1 rounded-xl border border-white/15 shadow-2xs">
            {bookings.length} Tamu
          </span>
        </div>

        {/* Daftar Booking pada Tanggal Terpilih */}
        {bookings.length > 0 ? (
          <div className="space-y-2 overflow-y-auto max-h-[420px] pr-0.5">
            {bookings.map((b) => {
              const cardKey = `${b.id}-${b.nightIndex}`;
              const isExpanded = !!expandedCardKeys[cardKey];
              const isLunas = b.dpPaid >= b.totalAmount;

              return (
                <div
                  key={cardKey}
                  className={`bg-white border transition-all duration-200 rounded-xl p-3.5 shadow-2xs ${
                    isExpanded
                      ? "border-slate-900 ring-1 ring-slate-900/10 shadow-xs"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {/* Header Card Booking */}
                  <button
                    type="button"
                    onClick={() => toggleCard(cardKey)}
                    className="w-full text-left flex items-center justify-between gap-2 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/80 font-bold text-xs flex items-center justify-center shrink-0">
                        #{b.roomCode}
                      </div>
                      <div className="min-w-0 flex-1">
                        <strong className="text-xs sm:text-sm font-bold text-slate-900 block truncate">
                          {b.guestName}
                        </strong>
                        <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                          {b.roomTypeName.replace(/^(Kamar|Tipe)\s+/gi, "")} • {b.nights} Malam
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <ChannelBadge channel={b.channel} />
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          isLunas
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {isLunas ? "Lunas" : "DP Masuk"}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Konten Rincian Pesanan (Accordion Body) */}
                  {isExpanded && (
                    <div className="pt-3 mt-3 border-t border-slate-100 space-y-2 text-xs">
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-[11px]">Rentang Tgl:</span>
                          <strong className="text-slate-900 font-semibold text-[11px]">
                            {b.checkInDate} – {b.checkOutDate}
                          </strong>
                        </div>
                        {b.nights > 1 && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 text-[11px]">Malam Inap:</span>
                            <span className="bg-slate-200/70 text-slate-800 text-[10px] font-semibold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                              <Moon className="w-2.5 h-2.5" />
                              <span>
                                Malam ke-{b.nightIndex} dari {b.nights}
                              </span>
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-[11px]">Kontak:</span>
                          <strong className="text-slate-900 font-semibold text-[11px]">
                            {b.guestPhone}
                          </strong>
                        </div>
                        {b.notes && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 text-[11px]">Catatan / Jam:</span>
                            <strong className="text-slate-800 font-semibold text-[11px]">
                              {b.notes}
                            </strong>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                          <span className="text-slate-500 text-[11px]">DP Terbayar:</span>
                          <strong className="text-emerald-700 font-bold text-[11px]">
                            Rp {b.dpPaid.toLocaleString("id-ID")}
                          </strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-[11px]">Sisa Pelunasan:</span>
                          <strong className="text-slate-900 font-bold text-xs">
                            Rp {b.remainingAmount.toLocaleString("id-ID")}
                          </strong>
                        </div>
                      </div>

                      {/* Tombol Aksi */}
                      <div className="flex items-center justify-end gap-2 pt-1">
                        {b.guestPhone && b.guestPhone !== "-" && (
                          <a
                            href={`https://wa.me/${b.guestPhone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-[11px] font-semibold hover:bg-emerald-100 transition-colors"
                          >
                            <FaWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Chat WA</span>
                          </a>
                        )}

                        {onCheckInNow && b.status !== "checked_in" && (
                          <button
                            type="button"
                            onClick={() => onCheckInNow(b)}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Check-in Tamu</span>
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
          <div className="bg-slate-50/60 rounded-2xl p-6 text-center border border-dashed border-slate-200 space-y-1.5 my-2">
            <Calendar className="w-7 h-7 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-700">Belum ada booking di tanggal ini</p>
            <p className="text-[10px] text-slate-400">
              Seluruh 8 unit kamar bebas untuk menerima reservasi atau tamu walk-in.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
