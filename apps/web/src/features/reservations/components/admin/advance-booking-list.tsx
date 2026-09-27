"use client";

import {
  useCreateWalkInBooking,
  useReservations,
} from "@/features/reservations/hooks/use-reservations";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type AdvanceBookingData, AdvanceBookingModal } from "./advance-booking-modal";
import { BookingCalendarGrid } from "./booking-calendar-grid";
import { BookingDateDetailsPanel } from "./booking-date-details-panel";

const INITIAL_BOOKINGS: AdvanceBookingData[] = [];

interface AdvanceBookingListProps {
  onCheckInNow?: (booking: AdvanceBookingData) => void;
}

export function AdvanceBookingList({ onCheckInNow }: AdvanceBookingListProps) {
  const { data: dbReservations } = useReservations();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookings, setBookings] = useState<AdvanceBookingData[]>(INITIAL_BOOKINGS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const createBookingMutation = useCreateWalkInBooking();

  // Sinkronisasi data reservasi riil dari database (jika ada)
  useEffect(() => {
    const list = dbReservations?.items;
    if (list && Array.isArray(list)) {
      const mapped: AdvanceBookingData[] = list.map((r) => ({
        id: r.code,
        roomCode: r.room?.roomNumber || "A1",
        roomTypeName: r.room?.roomType?.name || "Tipe Kamar",
        guestName: r.guest?.name || "Tamu",
        guestPhone: r.guest?.phone || "-",
        checkInDate: new Date(r.checkInDate).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        checkOutDate: new Date(r.checkOutDate).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        nights: r.totalNights,
        totalAmount: r.grandTotal,
        dpPaid: r.dpAmount,
        remainingAmount: r.remainingAmount,
        paymentMethod: (["transfer", "qris", "cash"].includes(r.paymentMethod?.toLowerCase() || "")
          ? r.paymentMethod?.toLowerCase()
          : "transfer") as "transfer" | "qris" | "cash",
        status: (r.status === "checked_in"
          ? "checked_in"
          : r.status === "cancelled"
            ? "cancelled"
            : "confirmed") as "confirmed" | "checked_in" | "cancelled",
      }));
      setBookings(mapped);
    }
  }, [dbReservations]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
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
