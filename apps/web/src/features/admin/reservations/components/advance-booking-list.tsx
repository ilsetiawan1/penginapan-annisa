"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  type AdvanceBookingData,
  AdvanceBookingModal,
} from "./advance-booking-modal";
import { BookingCalendarGrid } from "./booking-calendar-grid";
import { BookingDateDetailsPanel } from "./booking-date-details-panel";
import { useReservations, useCreateWalkInBooking } from "@/features/reservations/hooks/use-reservations";
import { useQueryClient } from "@tanstack/react-query";

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
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 8, 1)); // September 2026
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 8, 5)); // 5 September 2026 (ada booking Pak Hendra)
  const [bookings, setBookings] =
    useState<AdvanceBookingData[]>(INITIAL_BOOKINGS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const createBookingMutation = useCreateWalkInBooking();

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries();
    toast.success("Jadwal reservasi booking WA telah di-refresh!");
  };

  const handleAddBooking = (newBooking: AdvanceBookingData) => {
    setBookings((prev) => [newBooking, ...prev]);
    toast.success(
      `Booking baru #${newBooking.roomCode} (${newBooking.guestName}) berhasil dicatat!`,
    );
  };


  return (
    <div className="space-y-3.5 max-w-7xl mx-auto">
      {/* Tata Letak 2 Kolom Kalender (Kiri: Kalender Grid • Kanan: Detail Reservasi Tanggal) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        {/* ====================================================
            KIRI (8/12): KALENDER INTERAKTIF 1 BULAN
            ==================================================== */}
        <div className="lg:col-span-8">
          <BookingCalendarGrid
            currentMonth={currentMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            bookings={bookings}
            onOpenAddModal={() => setIsModalOpen(true)}
            onRefresh={handleRefresh}
          />
        </div>

        {/* ====================================================
            KANAN (4/12): PANEL DETAIL RESERVASI TANGGAL TERPILIH
            ==================================================== */}
        <div className="lg:col-span-4">
          <BookingDateDetailsPanel
            selectedDate={selectedDate}
            bookings={bookings}
            onOpenAddModal={() => setIsModalOpen(true)}
            onCheckInNow={onCheckInNow}
          />
        </div>
      </div>

      {/* Modal Dialog Tambah Booking */}
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
