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
      (b.checkInDate.startsWith(`${dayNum} `) && b.checkInDate.endsWith(`${year}`)),
  );

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3.5 flex flex-col justify-between h-full">
      <div className="space-y-3">
        {/* Banner Header Tanggal Terpilih (Inspirasi Header Card Pink/Purple di Referensi) */}
        <div className="bg-purple-700 text-white rounded-2xl p-3.5 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-purple-200 block uppercase tracking-wider">
              Detail Reservasi Tanggal:
            </span>
            <h4 className="text-sm sm:text-base font-black leading-tight mt-0.5">
              {formattedDateHeader}
            </h4>
          </div>
          <span className="bg-white/20 text-white text-xs font-black px-2.5 py-1 rounded-xl">
            {selectedDateBookings.length} Tamu
          </span>
        </div>

        {/* Daftar Booking pada Tanggal Terpilih */}
        {selectedDateBookings.length > 0 ? (
          <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-0.5">
            {selectedDateBookings.map((b) => (
              <div
                key={b.id}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 space-y-2 hover:border-purple-300 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-950 flex items-center justify-center font-black text-xs shrink-0">
                      #{b.roomCode}
                    </div>
                    <div>
                      <strong className="text-xs font-black text-slate-900 block leading-tight">
                        {b.guestName}
                      </strong>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Kamar {b.roomTypeName} • {b.nights} Malam
                      </span>
                    </div>
                  </div>

                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-md">
                    DP Lunas
                  </span>
                </div>

                {/* Rincian Finansial & Kontak */}
                <div className="bg-white rounded-xl p-2 border border-slate-200/70 space-y-0.5 text-[11px]">
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
                  <div className="flex items-center justify-between pt-0.5 border-t border-slate-100">
                    <span className="text-slate-500">Sisa Pelunasan:</span>
                    <strong className="text-purple-950 font-black">
                      Rp {b.remainingAmount.toLocaleString("id-ID")}
                    </strong>
                  </div>
                </div>

                {/* Tombol Aksi Chat WA & Check-In */}
                <div className="flex items-center justify-between gap-1.5 pt-1">
                  <a
                    href={`https://wa.me/${b.guestPhone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-[11px] font-extrabold hover:bg-emerald-100 transition"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Chat WA</span>
                  </a>

                  {onCheckInNow && (
                    <button
                      type="button"
                      onClick={() => onCheckInNow(b)}
                      className="px-3 py-1 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-[11px] font-black shadow-xs transition cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Masuk Kamar</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200/80 space-y-1.5 my-2">
            <Calendar className="w-7 h-7 text-slate-300 mx-auto" />
            <p className="text-xs font-extrabold text-slate-700">
              Belum ada booking di tanggal ini
            </p>
            <p className="text-[10px] text-slate-400">
              Seluruh 8 unit kamar bebas untuk menerima reservasi atau tamu walk-in.
            </p>
          </div>
        )}
      </div>

      {/* Tombol Tambah Reservasi Khusus Tanggal Ini */}
      <button
        type="button"
        onClick={onOpenAddModal}
        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>+ Catat Booking di Tanggal Ini</span>
      </button>
    </div>
  );
}
