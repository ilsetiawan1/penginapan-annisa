"use client";

import { useReservations } from "@/features/reservations/hooks/use-reservations";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  type AdvanceBookingData,
  type BookingChannel,
  extractIsoString,
  parseIsoDate,
  toIsoDate,
} from "../components/admin/modals/reservation-form-modal/advance-booking-types";

function parseChannelFromNotes(notes?: string | null): BookingChannel {
  if (!notes) return "whatsapp";
  const lower = notes.toLowerCase();
  if (lower.includes("walk-in") || lower.includes("tatap muka")) return "walk_in";
  if (lower.includes("telepon") || lower.includes("phone")) return "phone";
  return "whatsapp";
}

export function useReservationCalendar() {
  const queryClient = useQueryClient();
  const { data: dbReservations, isFetching } = useReservations();

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [localBookings, setLocalBookings] = useState<AdvanceBookingData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Parse DB reservations into typed AdvanceBookingData
  const dbMappedBookings = useMemo<AdvanceBookingData[]>(() => {
    const list = dbReservations?.items;
    if (!list || !Array.isArray(list)) return [];

    return list.map((r) => {
      const inDate = new Date(r.checkInDate);
      const outDate = new Date(r.checkOutDate);
      const inIso = toIsoDate(inDate);
      const outIso = toIsoDate(outDate);

      return {
        id: r.code,
        roomCode: r.room?.roomNumber || "A1",
        roomTypeName: r.room?.roomType?.name || "Tipe Kamar",
        guestName: r.guest?.name || "Tamu",
        guestPhone: r.guest?.phone || "-",
        checkInDate: inDate.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        checkOutDate: outDate.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        checkInIso: inIso,
        checkOutIso: outIso,
        nights: r.totalNights,
        totalAmount: r.grandTotal,
        dpPaid: r.dpAmount,
        remainingAmount: r.remainingAmount,
        paymentMethod: (["transfer", "qris", "cash"].includes(r.paymentMethod?.toLowerCase() || "")
          ? r.paymentMethod?.toLowerCase()
          : "transfer") as "transfer" | "qris" | "cash",
        channel: parseChannelFromNotes(r.notes),
        notes: r.notes || undefined,
        status: (r.status === "checked_in"
          ? "checked_in"
          : r.status === "cancelled"
            ? "cancelled"
            : "confirmed") as "confirmed" | "checked_in" | "cancelled",
      };
    });
  }, [dbReservations]);

  // Combine DB bookings with optimistic local bookings
  const bookings = useMemo<AdvanceBookingData[]>(() => {
    const combined = [...localBookings];
    for (const dbItem of dbMappedBookings) {
      if (!combined.some((item) => item.id === dbItem.id)) {
        combined.push(dbItem);
      }
    }
    return combined;
  }, [dbMappedBookings, localBookings]);

  // Month navigation handlers
  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["reservations"] });
    toast.success("Data kalender reservasi berhasil diperbarui!");
  }, [queryClient]);

  // Add booking handler
  const handleAddBooking = useCallback((newBooking: AdvanceBookingData) => {
    setLocalBookings((prev) => [newBooking, ...prev]);
    toast.success(`Reservasi #${newBooking.roomCode} (${newBooking.guestName}) berhasil disimpan!`);
  }, []);

  // Filter bookings for the selected date
  const selectedDateIso = toIsoDate(selectedDate);
  const selectedDateBookings = useMemo(() => {
    return bookings
      .filter((b) => {
        if (b.status === "cancelled") return false;
        const inIso = b.checkInIso || extractIsoString(b.checkInDate);
        const outIso = b.checkOutIso || extractIsoString(b.checkOutDate);
        if (!inIso || !outIso) return false;
        return selectedDateIso >= inIso && selectedDateIso < outIso;
      })
      .map((b) => {
        const inIso = b.checkInIso || extractIsoString(b.checkInDate);
        let nightIndex = 1;
        try {
          const dTarget = parseIsoDate(selectedDateIso);
          const dIn = parseIsoDate(inIso);
          const diffDays = Math.round((dTarget.getTime() - dIn.getTime()) / (1000 * 60 * 60 * 24));
          nightIndex = diffDays + 1;
        } catch {
          nightIndex = 1;
        }

        return {
          ...b,
          nightIndex,
          isFirstNight: inIso === selectedDateIso,
          isLastNight: nightIndex === b.nights,
        };
      });
  }, [bookings, selectedDateIso]);

  // Helper to fetch active bookings for any specific day in the month
  const getBookingsForDate = useCallback(
    (dayNumber: number) => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      const targetIso = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;

      return bookings
        .filter((b) => {
          if (b.status === "cancelled") return false;
          const inIso = b.checkInIso || extractIsoString(b.checkInDate);
          const outIso = b.checkOutIso || extractIsoString(b.checkOutDate);
          if (!inIso || !outIso) return false;
          return targetIso >= inIso && targetIso < outIso;
        })
        .map((b) => {
          const inIso = b.checkInIso || extractIsoString(b.checkInDate);
          let nightIndex = 1;
          try {
            const dTarget = parseIsoDate(targetIso);
            const dIn = parseIsoDate(inIso);
            const diffDays = Math.round(
              (dTarget.getTime() - dIn.getTime()) / (1000 * 60 * 60 * 24),
            );
            nightIndex = diffDays + 1;
          } catch {
            nightIndex = 1;
          }

          return {
            ...b,
            nightIndex,
            isFirstNight: inIso === targetIso,
            isLastNight: nightIndex === b.nights,
          };
        });
    },
    [bookings, currentMonth],
  );

  return {
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
    isFetching,
  };
}
