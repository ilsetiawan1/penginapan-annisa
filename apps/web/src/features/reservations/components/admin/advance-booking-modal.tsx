"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useCreateAdvanceBooking,
  useReservations,
} from "@/features/reservations/hooks/use-reservations";
import { useEffect, useMemo, useState } from "react";
import { AdvanceBookingCalendar } from "./advance-booking/advance-booking-calendar";
import { AdvanceBookingGuestFields } from "./advance-booking/advance-booking-guest-fields";
import { AdvanceBookingPaymentSection } from "./advance-booking/advance-booking-payment-section";
import { AdvanceBookingRoomPicker } from "./advance-booking/advance-booking-room-picker";
import { AdvanceBookingTimePicker } from "./advance-booking/advance-booking-time-picker";
import {
  AdvanceBookingData,
  ROOM_OPTIONS,
  addDays,
  calcDaysDiff,
  extractIsoString,
  formatIdDate,
  parseIsoDate,
  toIsoDate,
} from "./advance-booking/advance-booking-types";

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
export type { AdvanceBookingData };

interface AdvanceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: AdvanceBookingData) => void;
  initialDate?: Date | string;
  existingBookings?: AdvanceBookingData[];
}

export function AdvanceBookingModal({
  isOpen,
  onClose,
  onConfirm,
  initialDate,
  existingBookings,
}: AdvanceBookingModalProps) {
  const createAdvanceMutation = useCreateAdvanceBooking();
  const { data: dbReservations } = useReservations();

  const todayIso = toIsoDate(new Date());

  // Form State
  const [checkInDate, setCheckInDate] = useState<string>(() =>
    initialDate ? extractIsoString(initialDate) || todayIso : todayIso,
  );
  const [nights, setNights] = useState<number>(1);
  const [checkOutDate, setCheckOutDate] = useState<string>(() => addDays(todayIso, 1));
  const [selectedRoomCode, setSelectedRoomCode] = useState<string>("A1");
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "qris" | "cash">("transfer");
  const [dpPaid, setDpPaid] = useState<number>(137500);
  const [landingTime, setLandingTime] = useState<string>("14:30");

  // Mini Calendar Navigation State
  const [calendarMonth, setCalendarMonth] = useState<Date>(() =>
    initialDate ? (typeof initialDate === "string" ? parseIsoDate(initialDate) : initialDate) : new Date(),
  );

  // Sync saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      const initIso = initialDate ? extractIsoString(initialDate) || todayIso : todayIso;
      setCheckInDate(initIso);
      setNights(1);
      setCheckOutDate(addDays(initIso, 1));
      setCalendarMonth(parseIsoDate(initIso));
      setGuestName("");
      setGuestPhone("");
      setLandingTime("14:30");
    }
  }, [isOpen, initialDate, todayIso]);

  // Gabungkan daftar reservasi aktif (DB + passed props) untuk deteksi bentrok jadwal
  const activeReservations = useMemo(() => {
    const list: { roomCode: string; inIso: string; outIso: string; status: string }[] = [];

    // Dari database
    if (dbReservations?.items && Array.isArray(dbReservations.items)) {
      for (const r of dbReservations.items) {
        if (r.status !== "cancelled") {
          list.push({
            roomCode: r.room?.roomNumber || "",
            inIso: toIsoDate(new Date(r.checkInDate)),
            outIso: toIsoDate(new Date(r.checkOutDate)),
            status: r.status,
          });
        }
      }
    }

    // Dari props fallback
    if (existingBookings && Array.isArray(existingBookings)) {
      for (const b of existingBookings) {
        if (b.status !== "cancelled") {
          const inIso = b.checkInIso || extractIsoString(b.checkInDate);
          const outIso = b.checkOutIso || extractIsoString(b.checkOutDate);
          if (inIso && outIso && !list.some((item) => item.roomCode === b.roomCode && item.inIso === inIso)) {
            list.push({
              roomCode: b.roomCode,
              inIso,
              outIso,
              status: b.status,
            });
          }
        }
      }
    }

    return list;
  }, [dbReservations, existingBookings]);

  // Pengecekan ketersediaan kamar pada rentang [checkInDate, checkOutDate)
  const isRoomOccupied = (roomCode: string): boolean => {
    return activeReservations.some((r) => {
      if (r.roomCode !== roomCode) return false;
      return r.inIso < checkOutDate && r.outIso > checkInDate;
    });
  };

  // Kamar terpilih & kalkulasi tagihan
  const selectedRoom = ROOM_OPTIONS.find((r) => r.code === selectedRoomCode) || ROOM_OPTIONS[0];
  const isSelectedRoomOccupied = isRoomOccupied(selectedRoomCode);
  const totalAmount = selectedRoom.price * nights;
  const remainingAmount = Math.max(0, totalAmount - dpPaid);

  // Auto-switch ke kamar pertama yang tersedia jika kamar saat ini bentrok
  useEffect(() => {
    if (isSelectedRoomOccupied) {
      const firstAvailable = ROOM_OPTIONS.find((r) => !isRoomOccupied(r.code));
      if (firstAvailable) {
        setSelectedRoomCode(firstAvailable.code);
        setDpPaid(Math.round(firstAvailable.price * nights * 0.5));
      }
    }
  }, [checkInDate, checkOutDate, isSelectedRoomOccupied, nights]);

  // Handler pergantian Check-In
  const handleCheckInChange = (newInIso: string) => {
    if (!newInIso) return;
    setCheckInDate(newInIso);
    setCheckOutDate(addDays(newInIso, nights));
  };

  // Handler pergantian Check-Out
  const handleCheckOutChange = (newOutIso: string) => {
    if (!newOutIso) return;
    if (newOutIso <= checkInDate) {
      const fixedOut = addDays(checkInDate, 1);
      setCheckOutDate(fixedOut);
      setNights(1);
      return;
    }
    setCheckOutDate(newOutIso);
    const diff = calcDaysDiff(checkInDate, newOutIso);
    setNights(diff);
  };

  // Handler pergantian Durasi Malam
  const handleNightsChange = (newNights: number) => {
    setNights(newNights);
    setCheckOutDate(addDays(checkInDate, newNights));
    setDpPaid(Math.round(selectedRoom.price * newNights * 0.5));
  };

  // Handler klik tanggal di Mini Calendar
  const handleCalendarDayClick = (clickedIso: string) => {
    if (clickedIso < todayIso) return;

    if (clickedIso < checkInDate || clickedIso === checkOutDate) {
      setCheckInDate(clickedIso);
      setCheckOutDate(addDays(clickedIso, 1));
      setNights(1);
      return;
    }

    if (clickedIso === checkInDate) {
      setCheckOutDate(addDays(clickedIso, 1));
      setNights(1);
      return;
    }

    if (clickedIso > checkInDate) {
      setCheckOutDate(clickedIso);
      const diff = calcDaysDiff(checkInDate, clickedIso);
      setNights(diff);
    }
  };

  const handleSelectRoomCode = (code: string) => {
    setSelectedRoomCode(code);
    const room = ROOM_OPTIONS.find((r) => r.code === code);
    if (room) setDpPaid(Math.round(room.price * nights * 0.5));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    if (isSelectedRoomOccupied) return;

    try {
      const computedNotes = landingTime.trim()
        ? `Landing ${landingTime.trim().replace(":", ".")} WIT`
        : undefined;

      const res = await createAdvanceMutation.mutateAsync({
        roomCode: selectedRoom.code,
        guestName: guestName.trim(),
        guestPhone: guestPhone.trim(),
        checkInDate,
        nights,
        dpPaid,
        paymentMethod,
        notes: computedNotes,
      });

      onConfirm({
        id: (res as any)?.code || `BK-${Date.now().toString().slice(-4)}`,
        roomCode: selectedRoom.code,
        roomTypeName:
          selectedRoom.code.startsWith("A1") ||
          selectedRoom.code.startsWith("A2") ||
          selectedRoom.code.startsWith("B1") ||
          selectedRoom.code.startsWith("B2")
            ? "Tipe AC"
            : "Tipe Kipas",
        guestName: guestName.trim(),
        guestPhone: guestPhone.trim(),
        checkInDate: formatIdDate(checkInDate),
        checkOutDate: formatIdDate(checkOutDate),
        checkInIso: checkInDate,
        checkOutIso: checkOutDate,
        nights,
        totalAmount,
        dpPaid,
        remainingAmount,
        paymentMethod,
        notes: computedNotes,
        status: "confirmed",
      });

      setGuestName("");
      setGuestPhone("");
      setLandingTime("14:30");
      onClose();
    } catch {
      // Error ditangani hook toast
    }
  };

  const availableRoomsCount = ROOM_OPTIONS.filter((r) => !isRoomOccupied(r.code)).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[96vw] max-h-[94vh] overflow-y-auto bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-slate-900">
        <DialogHeader className="text-left pb-2 border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Booking Mendatang WhatsApp
              </span>
              <span className="text-[11px] font-bold text-slate-500 hidden sm:inline">
                • 750m dari Bandara Pattimura
              </span>
            </div>
            <DialogTitle className="text-base sm:text-lg font-black text-slate-900 leading-tight mt-1">
              Catat Reservasi WhatsApp
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 mt-0.5">
              Pilih tanggal menginap & unit kamar. Kamar yang sudah dipesan otomatis terkunci.
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          {/* 2 Kolom Seimbang: Kiri (Kalender & Rentang Tanggal) • Kanan (Unit Kamar, Tamu & Pembayaran) */}
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
              onCheckInChange={handleCheckInChange}
              onCheckOutChange={handleCheckOutChange}
              onNightsChange={handleNightsChange}
            />

            {/* Kolom Kanan: Pemilihan Kamar, Data Tamu, Estimasi Jam Tiba, Pembayaran & Tombol Aksi */}
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
              />

              <AdvanceBookingTimePicker
                landingTime={landingTime}
                setLandingTime={setLandingTime}
              />

              <AdvanceBookingPaymentSection
                dpPaid={dpPaid}
                setDpPaid={setDpPaid}
                totalAmount={totalAmount}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                isPending={createAdvanceMutation.isPending}
                isSubmitDisabled={
                  createAdvanceMutation.isPending ||
                  isSelectedRoomOccupied ||
                  availableRoomsCount === 0 ||
                  !guestName.trim()
                }
                onClose={onClose}
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
