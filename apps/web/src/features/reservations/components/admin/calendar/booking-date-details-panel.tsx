"use client";

import { formatCleanRoomType } from "@/lib/string";
import { getDirectWhatsAppUrl } from "@/lib/whatsapp";
import { Calendar, CheckCircle2, ChevronDown, Moon } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import type { AdvanceBookingData } from "../modals";

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

function parseBookingNotes(notes?: string | null): {
  estimatedArrival: string | null;
  otherNotes: string | null;
} {
  if (!notes) return { estimatedArrival: null, otherNotes: null };

  const parts = notes.split("•").map((p) => p.trim());
  let arrival: string | null = null;
  const otherParts: string[] = [];

  for (const part of parts) {
    const lower = part.toLowerCase();
    if (
      lower.startsWith("[channel:") ||
      lower.includes("channel:") ||
      lower.includes("sumber pesan")
    ) {
      continue;
    }
    if (
      lower.includes("wit") ||
      lower.startsWith("landing") ||
      lower.includes("jam ") ||
      lower.includes("tiba") ||
      lower.includes(":") ||
      lower.includes(".")
    ) {
      let timeStr = part;
      if (timeStr.toLowerCase().startsWith("landing ")) {
        timeStr = timeStr.slice(8).trim();
      }
      arrival = timeStr;
    } else {
      otherParts.push(part);
    }
  }

  return {
    estimatedArrival: arrival,
    otherNotes: otherParts.length > 0 ? otherParts.join(" • ") : null,
  };
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
        {/* Banner Header Tanggal Terpilih: Card Slate-50 Lembut */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 mb-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 block uppercase tracking-wider">
              Detail Reservasi Tanggal
            </span>
            <h4 className="text-sm sm:text-base font-bold leading-tight mt-0.5 text-slate-900">
              {formattedDateHeader}
            </h4>
          </div>
          <span className="bg-white text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-xl border border-slate-200/80 shadow-2xs">
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
              const { estimatedArrival, otherNotes } = parseBookingNotes(b.notes);

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
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/80 font-normal text-xs flex items-center justify-center shrink-0">
                        #{b.roomCode}
                      </div>
                      <div className="min-w-0 flex-1">
                        <strong className="text-xs sm:text-sm font-bold text-slate-900 block truncate">
                          {b.guestName}
                        </strong>
                        <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                          {formatCleanRoomType(b.roomTypeName)} • {b.nights} Malam
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
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
                        {estimatedArrival && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 text-[11px]">Estimasi tiba:</span>
                            <strong className="text-slate-800 font-semibold text-[11px]">
                              {estimatedArrival}
                            </strong>
                          </div>
                        )}
                        {otherNotes && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 text-[11px]">Catatan:</span>
                            <strong className="text-slate-800 font-semibold text-[11px]">
                              {otherNotes}
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

                      {/* Footer: Keterangan Sumber Pemesanan & Tombol Aksi */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                          <span>Dipesan melalui:</span>
                          <span className="font-semibold text-slate-800">
                            {b.channel === "walk_in"
                              ? "Tatap Muka"
                              : b.channel === "phone"
                                ? "Telepon"
                                : "WhatsApp"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 ml-auto">
                          {b.guestPhone && b.guestPhone !== "-" && (
                            <a
                              href={getDirectWhatsAppUrl(b.guestPhone)}
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
