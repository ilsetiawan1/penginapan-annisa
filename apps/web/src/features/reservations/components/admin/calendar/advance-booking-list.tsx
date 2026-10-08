"use client";

import { useReservationCalendar } from "@/features/reservations/hooks/use-reservation-calendar";
import dynamic from "next/dynamic";
import type { AdvanceBookingData } from "../modals";
import { BookingCalendarGrid } from "./booking-calendar-grid";
import { BookingDateDetailsPanel } from "./booking-date-details-panel";

const AdvanceBookingModal = dynamic(
  () => import("../modals/reservation-form-modal").then((m) => m.AdvanceBookingModal),
  { ssr: false },
);

interface AdvanceBookingListProps {
  onCheckInNow?: (booking: AdvanceBookingData) => void;
}

export function AdvanceBookingList({ onCheckInNow }: AdvanceBookingListProps) {
  const {
    currentMonth,
    selectedDate,
    setSelectedDate,
    bookings,
    selectedDateBookings,
    getBookingsForDate,
    handlePrevMonth,
    handleNextMonth,
    handleRefresh,
    handleAddBooking,
    isModalOpen,
    setIsModalOpen,
  } = useReservationCalendar();

  return (
    <div className="w-full space-y-6 pb-6">
      {/* 1. Header Standar Langsung di Kanvas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Kalender Reservasi
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Pantau ketersediaan jadwal menginap dan timeline reservasi kamar
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full items-stretch">
        {/* Kolom Kiri: Kalender Interaktif (Fluid Full-Width) */}
        <div className="xl:col-span-8">
          <BookingCalendarGrid
            currentMonth={currentMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            getBookingsForDate={getBookingsForDate}
            onOpenAddModal={() => setIsModalOpen(true)}
            onRefresh={handleRefresh}
          />
        </div>

        {/* Kolom Kanan: Detail Reservasi Tanggal (Fluid Full-Width) */}
        <div className="xl:col-span-4">
          <BookingDateDetailsPanel
            selectedDate={selectedDate}
            bookings={selectedDateBookings}
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
          initialDate={selectedDate}
          existingBookings={bookings}
        />
      )}
    </div>
  );
}
