"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reservationsApi } from "@/lib/api/reservations.api";
import type {
  CheckInInput,
  CheckOutInput,
  ConfirmDpInput,
  CreateOnlineBookingInput,
  CreateWalkInBookingInput,
  ReservationQuery,
} from "@annisa/types";
import { toast } from "sonner";
import { ROOMS_QUERY_KEY } from "@/features/rooms/hooks/use-rooms";

export const RESERVATIONS_QUERY_KEY = ["reservations"] as const;

export function useReservations(query?: ReservationQuery) {
  return useQuery({
    queryKey: [...RESERVATIONS_QUERY_KEY, query],
    queryFn: () => reservationsApi.getAllReservations(query),
    staleTime: 1000 * 15, // 15 seconds
  });
}

export function useReservationById(id: string) {
  return useQuery({
    queryKey: [...RESERVATIONS_QUERY_KEY, id],
    queryFn: () => reservationsApi.getReservationById(id),
    enabled: !!id,
  });
}

export function useReceipt(id: string) {
  return useQuery({
    queryKey: ["receipt", id],
    queryFn: () => reservationsApi.getReceipt(id),
    enabled: !!id,
  });
}

export function useCreateOnlineBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateOnlineBookingInput) =>
      reservationsApi.createOnlineBooking(input),
    onSuccess: (data) => {
      toast.success(
        `Draft booking ${data.reservation.code} berhasil dibuat! Mengalihkan ke WhatsApp...`,
      );
      queryClient.invalidateQueries({ queryKey: RESERVATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal membuat draft reservasi.";
      toast.error(msg);
    },
  });
}

export function useCreateWalkInBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateWalkInBookingInput) =>
      reservationsApi.createWalkInBooking(input),
    onSuccess: (data) => {
      toast.success(`Check-in tamu walk-in ${data.code} berhasil!`);
      queryClient.invalidateQueries({ queryKey: RESERVATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal memproses check-in walk-in.";
      toast.error(msg);
    },
  });
}

export function useConfirmDp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ConfirmDpInput }) =>
      reservationsApi.confirmDp(id, input),
    onSuccess: (data) => {
      toast.success(`Pembayaran DP untuk ${data.code} berhasil dikonfirmasi!`);
      queryClient.invalidateQueries({ queryKey: RESERVATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal mengonfirmasi pembayaran DP.";
      toast.error(msg);
    },
  });
}

export function useCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CheckInInput }) =>
      reservationsApi.checkIn(id, input),
    onSuccess: (data) => {
      toast.success(`Check-in tamu ${data.code} berhasil! Kamar telah terisi.`);
      queryClient.invalidateQueries({ queryKey: RESERVATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Gagal melakukan check-in.";
      toast.error(msg);
    },
  });
}

export function useCheckOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CheckOutInput }) =>
      reservationsApi.checkOut(id, input),
    onSuccess: (data) => {
      toast.success(
        `Check-out ${data.code} selesai! Status kamar beralih ke 'DIRTY' untuk pembersihan.`,
      );
      queryClient.invalidateQueries({ queryKey: RESERVATIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Gagal melakukan check-out.";
      toast.error(msg);
    },
  });
}
