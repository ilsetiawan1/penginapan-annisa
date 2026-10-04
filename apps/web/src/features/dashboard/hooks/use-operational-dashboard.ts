"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard-stats";
import { useCheckIn, useCheckOut } from "@/features/reservations/hooks/use-reservations";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

export interface DashboardMetrics {
  totalRooms: number;
  occupiedRooms: number;
  occupancyRate: number;
  todayRevenue: number;
  posSalesAmount: number;
  posItemsSold: number;
}

export function useOperationalDashboard() {
  const queryClient = useQueryClient();

  const { data: stats, isFetching: isStatsFetching } = useDashboardStats();
  const { data: dbRooms, isFetching: isRoomsFetching } = useRooms();

  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();

  const isRefreshing = isStatsFetching || isRoomsFetching;

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries();
    toast.success("Data dashboard operasional berhasil diperbarui!");
  }, [queryClient]);

  const totalRooms = stats?.occupancy?.totalRooms ?? 8;
  const occupiedRooms =
    stats?.occupancy?.occupiedRooms ??
    (dbRooms && Array.isArray(dbRooms) ? dbRooms.filter((r) => r.status === "occupied").length : 0);
  const occupancyRate =
    stats?.occupancy?.occupancyRate ??
    (totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0);
  const todayRevenue = stats?.todayRevenue ?? 0;
  const posSalesAmount = 0;
  const posItemsSold = 0;

  const handleCheckIn = useCallback(
    (id: string, name: string, room: string) => {
      checkInMutation.mutate(
        { id, input: { notes: "Check-in cepat dashboard" } },
        {
          onSuccess: () => {
            toast.success(`Check-In berhasil untuk ${name} (${room})!`);
          },
        },
      );
    },
    [checkInMutation],
  );

  const handleCheckOut = useCallback(
    (id: string, name: string, room: string) => {
      checkOutMutation.mutate(
        { id, input: { markAsDirty: true, notes: "Check-out cepat dashboard" } },
        {
          onSuccess: () => {
            toast.success(
              `Check-Out selesai untuk ${name} (${room})! Status kamar diubah ke Perlu Bersih.`,
            );
          },
        },
      );
    },
    [checkOutMutation],
  );

  return {
    rooms: dbRooms || [],
    metrics: {
      totalRooms,
      occupiedRooms,
      occupancyRate,
      todayRevenue,
      posSalesAmount,
      posItemsSold,
    },
    isRefreshing,
    handleRefresh,
    handleCheckIn,
    handleCheckOut,
  };
}
