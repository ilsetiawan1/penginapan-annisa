"use client";

import { useReservationCalendar } from "@/features/reservations/hooks/use-reservation-calendar";
import { type AdvanceBookingData, AdvanceBookingModal } from "../modals";
import { BookingCalendarGrid } from "./booking-calendar-grid";
import { BookingDateDetailsPanel } from "./booking-date-details-panel";

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
