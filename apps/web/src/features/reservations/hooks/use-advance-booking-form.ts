"use client";

import {
  useCreateAdvanceBooking,
  useReservations,
} from "@/features/reservations/hooks/use-reservations";
import { whatsAppPhoneSchema } from "@annisa/types";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
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
} from "../components/admin/modals/reservation-form-modal/advance-booking-types";

interface UseAdvanceBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: AdvanceBookingData) => void;
  initialDate?: Date | string;
  existingBookings?: AdvanceBookingData[];
}

export function useAdvanceBookingForm({
  isOpen,
  onClose,
  onConfirm,
  initialDate,
  existingBookings,
}: UseAdvanceBookingFormProps) {
  const createAdvanceMutation = useCreateAdvanceBooking();
  const { data: dbReservations } = useReservations();

  const todayIso = toIsoDate(new Date());

  const [checkInDate, setCheckInDate] = useState<string>(() =>
    initialDate ? extractIsoString(initialDate) || todayIso : todayIso,
  );
  const [nights, setNights] = useState<number>(1);
  const [checkOutDate, setCheckOutDate] = useState<string>(() => addDays(todayIso, 1));
  const [selectedRoomCode, setSelectedRoomCode] = useState<string>("A1");
  const [channel, setChannel] = useState<BookingChannel>("whatsapp");
  const [guestName, setGuestName] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "qris" | "cash">("transfer");
  const [dpPaid, setDpPaid] = useState<number>(() => {
    const defaultRoom = ROOM_OPTIONS.find((r) => r.code === "A1") || ROOM_OPTIONS[0];
    return Math.round(defaultRoom.price * 0.5);
  });
  const [landingTime, setLandingTime] = useState<string>("14:30");

  const [calendarMonth, setCalendarMonth] = useState<Date>(() =>
    initialDate
      ? typeof initialDate === "string"
        ? parseIsoDate(initialDate)
        : initialDate
      : new Date(),
  );

  useEffect(() => {
    if (isOpen) {
      const initIso = initialDate ? extractIsoString(initialDate) || todayIso : todayIso;
      setCheckInDate(initIso);
      setNights(1);
      setCheckOutDate(addDays(initIso, 1));
      setCalendarMonth(parseIsoDate(initIso));
      setChannel("whatsapp");
      setGuestName("");
      setGuestPhone("");
      setLandingTime("14:30");
      const currentRoom = ROOM_OPTIONS.find((r) => r.code === selectedRoomCode) || ROOM_OPTIONS[0];
      setDpPaid(Math.round(currentRoom.price * 1 * 0.5));
    }
  }, [isOpen, initialDate, todayIso, selectedRoomCode]);

  const activeReservations = useMemo(() => {
    const list: { roomCode: string; inIso: string; outIso: string; status: string }[] = [];

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

    if (existingBookings && Array.isArray(existingBookings)) {
      for (const b of existingBookings) {
        if (b.status !== "cancelled") {
          const inIso = b.checkInIso || extractIsoString(b.checkInDate);
          const outIso = b.checkOutIso || extractIsoString(b.checkOutDate);
          if (
            inIso &&
            outIso &&
            !list.some((item) => item.roomCode === b.roomCode && item.inIso === inIso)
          ) {
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

  const isRoomOccupied = useCallback(
    (roomCode: string): boolean => {
      return activeReservations.some((r) => {
        if (r.roomCode !== roomCode) return false;
        return r.inIso < checkOutDate && r.outIso > checkInDate;
      });
    },
    [activeReservations, checkInDate, checkOutDate],
  );

  const selectedRoom = ROOM_OPTIONS.find((r) => r.code === selectedRoomCode) || ROOM_OPTIONS[0];
  const isSelectedRoomOccupied = isRoomOccupied(selectedRoomCode);
  const totalAmount = selectedRoom.price * nights;
  const remainingAmount = Math.max(0, totalAmount - dpPaid);

  useEffect(() => {
    if (isSelectedRoomOccupied) {
      const firstAvailable = ROOM_OPTIONS.find((r) => !isRoomOccupied(r.code));
      if (firstAvailable) {
        setSelectedRoomCode(firstAvailable.code);
        setDpPaid(Math.round(firstAvailable.price * nights * 0.5));
      }
    }
  }, [isSelectedRoomOccupied, isRoomOccupied, nights]);

  const handleCheckInChange = (newInIso: string) => {
    if (!newInIso) return;
    setCheckInDate(newInIso);
    setCheckOutDate(addDays(newInIso, nights));
    setDpPaid(Math.round(selectedRoom.price * nights * 0.5));
  };

  const handleCheckOutChange = (newOutIso: string) => {
    if (!newOutIso) return;
    if (newOutIso <= checkInDate) {
      const fixedOut = addDays(checkInDate, 1);
      setCheckOutDate(fixedOut);
      setNights(1);
      setDpPaid(Math.round(selectedRoom.price * 1 * 0.5));
      return;
    }
    setCheckOutDate(newOutIso);
    const diff = calcDaysDiff(checkInDate, newOutIso);
    setNights(diff);
    setDpPaid(Math.round(selectedRoom.price * diff * 0.5));
  };

  const handleNightsChange = (newNights: number) => {
    setNights(newNights);
    setCheckOutDate(addDays(checkInDate, newNights));
    setDpPaid(Math.round(selectedRoom.price * newNights * 0.5));
  };

  const handleCalendarDayClick = (clickedIso: string) => {
    if (clickedIso < todayIso) return;

    if (clickedIso < checkInDate || clickedIso === checkOutDate) {
      setCheckInDate(clickedIso);
      setCheckOutDate(addDays(clickedIso, 1));
      setNights(1);
      setDpPaid(Math.round(selectedRoom.price * 1 * 0.5));
      return;
    }

    if (clickedIso === checkInDate) {
      setCheckOutDate(addDays(clickedIso, 1));
      setNights(1);
      setDpPaid(Math.round(selectedRoom.price * 1 * 0.5));
      return;
    }

    if (clickedIso > checkInDate) {
      setCheckOutDate(clickedIso);
      const diff = calcDaysDiff(checkInDate, clickedIso);
      setNights(diff);
      setDpPaid(Math.round(selectedRoom.price * diff * 0.5));
    }
  };

  const handleSelectRoomCode = (code: string) => {
    setSelectedRoomCode(code);
    const room = ROOM_OPTIONS.find((r) => r.code === code);
    if (room) setDpPaid(Math.round(room.price * nights * 0.5));
  };

  const availableRoomsCount = ROOM_OPTIONS.filter((r) => !isRoomOccupied(r.code)).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    if (isSelectedRoomOccupied) return;

    if (channel === "whatsapp" || guestPhone.trim()) {
      const phoneValidation = whatsAppPhoneSchema.safeParse(guestPhone.trim());
      if (!phoneValidation.success) {
        toast.error(
          phoneValidation.error.issues[0]?.message ||
            "Nomor WhatsApp hanya boleh berisi angka (9–15 digit)",
        );
        return;
      }
    }

    try {
      const channelLabel =
        channel === "walk_in"
          ? "[Channel: Tatap Muka]"
          : channel === "phone"
            ? "[Channel: Telepon]"
            : "[Channel: WhatsApp]";

      const computedNotes = [
        channelLabel,
        landingTime.trim() ? `Landing ${landingTime.trim().replace(":", ".")} WIT` : null,
      ]
        .filter(Boolean)
        .join(" • ");

      const res = await createAdvanceMutation.mutateAsync({
        roomCode: selectedRoom.code,
        guestName: guestName.trim(),
        guestPhone: guestPhone.trim() || (channel === "walk_in" ? "081200000000" : "-"),
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
        guestPhone: guestPhone.trim() || "-",
        checkInDate: formatIdDate(checkInDate),
        checkOutDate: formatIdDate(checkOutDate),
        checkInIso: checkInDate,
        checkOutIso: checkOutDate,
        nights,
        totalAmount,
        dpPaid,
        remainingAmount,
        paymentMethod,
        channel,
        notes: computedNotes,
        status: "confirmed",
      });

      onClose();
    } catch {
      // Error handled by react-query mutation
    }
  };

  return {
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
    isPending: createAdvanceMutation.isPending,
    handleCheckInChange,
    handleCheckOutChange,
    handleNightsChange,
    handleCalendarDayClick,
    handleSelectRoomCode,
    handleSubmit,
  };
}
