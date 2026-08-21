"use client";

import { Calendar, CheckCircle2, Phone, Plus, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { AdvanceBookingData } from "./advance-booking-modal";

interface BookingDateDetailsPanelProps {
  selectedDate: Date;
  bookings: AdvanceBookingData[];
  onOpenAddModal: () => void;
  onCheckInNow?: (booking: AdvanceBookingData) => void;
}

export function BookingDateDetailsPanel({
  selectedDate,
  bookings,
  onOpenAddModal,
  onCheckInNow,
}: BookingDateDetailsPanelProps) {
  const formattedDateHeader = selectedDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const dayNum = selectedDate.getDate();
  const year = selectedDate.getFullYear();
  const monthShort = selectedDate.toLocaleDateString("id-ID", { month: "short" });
  const targetDateStr = `${dayNum} ${monthShort} ${year}`;

  const selectedDateBookings = bookings.filter(
    (b) =>
      b.checkInDate.toLowerCase().includes(targetDateStr.toLowerCase()) ||
      (b.checkInDate.startsWith(`${dayNum} `) && b.checkInDate.endsWith(`${year}`))
  );

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

        {/* Daftar Booking pada Tanggal Terpilih: Glassmorphism Cards */}
        {selectedDateBookings.length > 0 ? (
          <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-0.5">
            {selectedDateBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white/70 hover:bg-white/95 backdrop-blur-md border border-purple-100/90 hover:border-purple-300 rounded-2xl p-3.5 space-y-2.5 shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Header Card Booking */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-100/80 backdrop-blur-xs text-purple-950 border border-purple-200 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                      #{b.roomCode}
                    </div>
                    <div>
                      <strong className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">
                        {b.guestName}
                      </strong>
                      <span className="text-[10px] text-slate-500 font-semibold">
                        Kamar {b.roomTypeName} • {b.nights} Malam
                      </span>
                    </div>
                  </div>

                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-black px-2 py-0.5 rounded-lg shadow-2xs">
                    DP Lunas
                  </span>
                </div>

                {/* Kotak Rincian Glass Translucent */}
                <div className="bg-purple-50/50 backdrop-blur-xs rounded-xl p-2.5 border border-purple-100/60 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">No. WhatsApp:</span>
                    <strong className="text-slate-800 font-bold">{b.guestPhone}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">DP Ditransfer:</span>
                    <strong className="text-emerald-700 font-black">
                      Rp {b.dpPaid.toLocaleString("id-ID")}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-purple-100/80">
                    <span className="text-slate-500">Sisa Pelunasan di Lokasi:</span>
                    <strong className="text-purple-950 font-black">
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
            ))}
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

      {/* Tombol Tambah Reservasi Khusus Tanggal Ini */}
      <button
        type="button"
        onClick={onOpenAddModal}
        className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-slate-900 to-purple-950 hover:from-purple-900 hover:to-slate-900 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer transition-all duration-200"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>+ Catat Booking di Tanggal Ini</span>
      </button>
    </div>
  );
}
