"use client";

import { Calendar, CheckCircle2, Clock, Phone, Plus, User } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import { AdvanceBookingData, AdvanceBookingModal } from "./advance-booking-modal";

const INITIAL_BOOKINGS: AdvanceBookingData[] = [
  {
    id: "BK-1082",
    roomCode: "A1",
    roomTypeName: "Tipe AC",
    guestName: "Hendra Pratama",
    guestPhone: "081399881122",
    checkInDate: "5 Sep 2026",
    checkOutDate: "6 Sep 2026",
    nights: 1,
    totalAmount: 275000,
    dpPaid: 137500,
    remainingAmount: 137500,
    paymentMethod: "transfer",
    status: "confirmed",
  },
  {
    id: "BK-1083",
    roomCode: "B2",
    roomTypeName: "Tipe AC",
    guestName: "dr. Amelia Siregar",
    guestPhone: "081255443322",
    checkInDate: "7 Sep 2026",
    checkOutDate: "9 Sep 2026",
    nights: 2,
    totalAmount: 550000,
    dpPaid: 275000,
    remainingAmount: 275000,
    paymentMethod: "qris",
    status: "confirmed",
  },
  {
    id: "BK-1084",
    roomCode: "A4",
    roomTypeName: "Tipe Kipas",
    guestName: "Rahmat Hidayat",
    guestPhone: "085211223344",
    checkInDate: "12 Sep 2026",
    checkOutDate: "13 Sep 2026",
    nights: 1,
    totalAmount: 200000,
    dpPaid: 100000,
    remainingAmount: 100000,
    paymentMethod: "transfer",
    status: "confirmed",
  },
];

interface AdvanceBookingListProps {
  onCheckInNow?: (booking: AdvanceBookingData) => void;
}

export function AdvanceBookingList({ onCheckInNow }: AdvanceBookingListProps) {
  const [bookings, setBookings] = useState<AdvanceBookingData[]>(INITIAL_BOOKINGS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddBooking = (newBooking: AdvanceBookingData) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Banner Atas: Header & Tombol Tambah Booking */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Agenda Reservasi Mendatang
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
            Daftar Tamu Booking WhatsApp (Hari H Mendatang)
          </h2>
          <p className="text-xs text-slate-500">
            Daftar tamu yang sudah membayar DP transfer via WhatsApp untuk tanggal masa depan.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm h-10 px-5 gap-1.5 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Catat Booking WA Baru</span>
        </Button>
      </div>

      {/* Tabel / Card List Reservasi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition space-y-3"
          >
            {/* Header Card Booking */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 flex items-center justify-center font-black text-sm">
                  #{b.roomCode}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-tight">{b.guestName}</h4>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    Kamar {b.roomTypeName} • {b.nights} Malam
                  </span>
                </div>
              </div>

              <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded-md">
                DP Lunas
              </span>
            </div>

            {/* Detail Tanggal & Pembayaran */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-2.5 space-y-1 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-700" />
                  <span>Jadwal Check-In:</span>
                </span>
                <strong className="text-purple-950 font-black">{b.checkInDate}</strong>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">DP Ditransfer:</span>
                <strong className="text-emerald-700 font-bold">
                  Rp {b.dpPaid.toLocaleString("id-ID")} ({b.paymentMethod.toUpperCase()})
                </strong>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200">
                <span className="text-slate-500">Sisa Pelunasan di Lokasi:</span>
                <strong className="text-slate-900 font-black">
                  Rp {b.remainingAmount.toLocaleString("id-ID")}
                </strong>
              </div>
            </div>

            {/* Aksi WhatsApp & Konfirmasi Masuk */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <a
                href={`https://wa.me/${b.guestPhone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-extrabold hover:bg-emerald-100 transition"
              >
                <FaWhatsapp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chat WA</span>
              </a>

              {onCheckInNow && (
                <button
                  type="button"
                  onClick={() => onCheckInNow(b)}
                  className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black shadow-xs transition cursor-pointer flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Masuk Kamar</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <AdvanceBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleAddBooking}
        />
      )}
    </div>
  );
}
