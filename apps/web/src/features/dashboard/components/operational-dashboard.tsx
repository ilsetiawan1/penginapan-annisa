"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard-stats";
import { useCheckIn, useCheckOut } from "@/features/reservations/hooks/use-reservations";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DashboardHeader } from "./dashboard-header";
import { DashboardStatsGrid } from "./dashboard-stats-grid";
import { LatestActivitiesFeed } from "./latest-activities-feed";
import { OccupancyVolumeChart } from "./occupancy-volume-chart";
import { RoomAvailabilityTable } from "./room-availability-table";

interface OperationalDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export function OperationalDashboard({ onNavigateTab }: OperationalDashboardProps) {
  const queryClient = useQueryClient();

  const { data: stats, isFetching: isStatsFetching } = useDashboardStats();
  const { data: dbRooms, isFetching: isRoomsFetching } = useRooms();

  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();

  const isRefreshing = isStatsFetching || isRoomsFetching;

  const handleRefresh = async () => {
    await queryClient.invalidateQueries();
    toast.success("Data dashboard operasional berhasil diperbarui!");
  };

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

  const handleCheckIn = (id: string, name: string, room: string) => {
    checkInMutation.mutate(
      { id, input: { notes: "Check-in cepat dashboard" } },
      {
        onSuccess: () => {
          toast.success(`Check-In berhasil untuk ${name} (${room})!`);
        },
      },
    );
  };

  const handleCheckOut = (id: string, name: string, room: string) => {
    checkOutMutation.mutate(
      { id, input: { markAsDirty: true, notes: "Check-out cepat dashboard" } },
      {
        onSuccess: () => {
          toast.success(`Check-Out selesai untuk ${name} (${room})! Status kamar diubah ke Perlu Bersih.`);
        },
      },
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 pb-6">
      <DashboardHeader
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onCheckInClick={() => onNavigateTab("matrix")}
      />

      <DashboardStatsGrid
        todayRevenue={todayRevenue}
        totalRooms={totalRooms}
        occupiedRooms={occupiedRooms}
        occupancyRate={occupancyRate}
        posSalesAmount={posSalesAmount}
        posItemsSold={posItemsSold}
        onNavigateTab={onNavigateTab}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <OccupancyVolumeChart
            occupiedRooms={occupiedRooms}
            totalRooms={totalRooms}
            todayRevenue={todayRevenue}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <LatestActivitiesFeed
            onNavigateTab={onNavigateTab}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        </div>
      </div>

      <RoomAvailabilityTable
        rooms={dbRooms || []}
        onNavigateTab={onNavigateTab}
      />
    </div>
  );
}
