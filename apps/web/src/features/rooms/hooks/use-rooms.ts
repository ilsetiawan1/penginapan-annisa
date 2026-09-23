"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roomsApi } from "@/lib/api/rooms.api";
import type {
  RoomQuery,
  UpdateRoomRateInput,
  UpdateRoomStatusInput,
} from "@annisa/types";
import { toast } from "sonner";

export const ROOMS_QUERY_KEY = ["rooms"] as const;
export const ROOM_TYPES_QUERY_KEY = ["room-types"] as const;

export function useRooms(query?: RoomQuery) {
  return useQuery({
    queryKey: [...ROOMS_QUERY_KEY, query],
    queryFn: () => roomsApi.getAllRooms(query),
    staleTime: 1000 * 30, // 30 seconds
  });
}

export function useRoomTypes() {
  return useQuery({
    queryKey: ROOM_TYPES_QUERY_KEY,
    queryFn: () => roomsApi.getAllRoomTypes(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useRoomByNumber(roomNumber: string) {
  return useQuery({
    queryKey: [...ROOMS_QUERY_KEY, roomNumber],
    queryFn: () => roomsApi.getRoomByNumber(roomNumber),
    enabled: !!roomNumber,
  });
}

export function useUpdateRoomStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roomNumber,
      input,
    }: {
      roomNumber: string;
      input: UpdateRoomStatusInput;
    }) => roomsApi.updateRoomStatus(roomNumber, input),
    onSuccess: (_data, variables) => {
      toast.success(
        `Status kamar ${variables.roomNumber} berhasil diubah menjadi ${variables.input.status.toUpperCase()}!`,
      );
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal memperbarui status kamar.";
      toast.error(msg);
    },
  });
}

export function useUpdateRoomRate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateRoomRateInput;
    }) => roomsApi.updateRoomRate(id, input),
    onSuccess: () => {
      toast.success("Tarif dan fasilitas tipe kamar berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ROOM_TYPES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal memperbarui tarif kamar.";
      toast.error(msg);
    },
  });
}
