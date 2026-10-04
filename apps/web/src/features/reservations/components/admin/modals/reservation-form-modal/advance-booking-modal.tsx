"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdvanceBookingForm } from "@/features/reservations/hooks/use-advance-booking-form";
import { AdvanceBookingCalendar } from "./advance-booking-calendar";
import { AdvanceBookingGuestFields } from "./advance-booking-guest-fields";
import { AdvanceBookingPaymentSection } from "./advance-booking-payment-section";
import { AdvanceBookingRoomPicker } from "./advance-booking-room-picker";
import { AdvanceBookingTimePicker } from "./advance-booking-time-picker";
import {
  type AdvanceBookingData,
  type BookingChannel,
  ROOM_OPTIONS,
  addDays,
  calcDaysDiff,
  extractIsoString,
  formatIdDate,
  parseIsoDate,
  toIsoDate,
} from "./advance-booking-types";

// Re-export untuk kompatibilitas file lain
export {
  ROOM_OPTIONS,
  addDays,
  calcDaysDiff,
  extractIsoString,
  formatIdDate,
  parseIsoDate,
  toIsoDate,
};
export type { AdvanceBookingData, BookingChannel };

interface AdvanceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: AdvanceBookingData) => void;
  initialDate?: Date | string;
  existingBookings?: AdvanceBookingData[];
}

export function AdvanceBookingModal(props: AdvanceBookingModalProps) {
  const {
    todayIso,
    checkInDate,
    nights,
    checkOutDate,
    selectedRoomCode,
    channel,
    setChannel,
    guestName,
    setGuestName,
    guestPhone,
    setGuestPhone,
    paymentMethod,
    setPaymentMethod,
    dpPaid,
    setDpPaid,
    landingTime,
    setLandingTime,
    calendarMonth,
    setCalendarMonth,
    totalAmount,
    remainingAmount,
    availableRoomsCount,
    isSelectedRoomOccupied,
    isRoomOccupied,
    isPending,
    handleCalendarDayClick,
    handleSelectRoomCode,
    handleSubmit,
  } = useAdvanceBookingForm(props);

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="max-w-4xl w-[96vw] max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-slate-900">
        <DialogHeader className="text-left pb-2 border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-slate-200/80">
                Reservasi Tamu • Multi-Kanal
              </span>
            </div>
            <DialogTitle className="text-base sm:text-lg font-bold text-slate-900 leading-tight mt-1">
              Catat Reservasi Baru
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 mt-0.5">
              Pilih tanggal menginap, sumber pemesanan, dan unit kamar. Kamar otomatis terkunci di
              kalender.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Kolom Kiri: Kalender, Tanggal Check-In/Out, Durasi & Rincian Tagihan */}
            <AdvanceBookingCalendar
              calendarMonth={calendarMonth}
              setCalendarMonth={setCalendarMonth}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              nights={nights}
              todayIso={todayIso}
              totalAmount={totalAmount}
              remainingAmount={remainingAmount}
              onCalendarDayClick={handleCalendarDayClick}
            />

            {/* Kolom Kanan: Pemilihan Kamar, Sumber & Data Tamu, Estimasi Jam Tiba, Pembayaran */}
            <div className="lg:col-span-7 space-y-3">
              <AdvanceBookingRoomPicker
                selectedRoomCode={selectedRoomCode}
                onSelectRoomCode={handleSelectRoomCode}
                isRoomOccupied={isRoomOccupied}
                isSelectedRoomOccupied={isSelectedRoomOccupied}
                availableRoomsCount={availableRoomsCount}
              />

              <AdvanceBookingGuestFields
                guestName={guestName}
                setGuestName={setGuestName}
                guestPhone={guestPhone}
                setGuestPhone={setGuestPhone}
                channel={channel}
                setChannel={setChannel}
              />

              <AdvanceBookingTimePicker landingTime={landingTime} setLandingTime={setLandingTime} />

              <AdvanceBookingPaymentSection
                dpPaid={dpPaid}
                setDpPaid={setDpPaid}
                totalAmount={totalAmount}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                isPending={isPending}
                isSubmitDisabled={
                  isPending ||
                  isSelectedRoomOccupied ||
                  availableRoomsCount === 0 ||
                  !guestName.trim()
                }
                onClose={props.onClose}
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
