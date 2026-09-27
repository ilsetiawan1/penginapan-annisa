"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard-stats";
import {
  useCheckIn,
  useCheckOut,
} from "@/features/reservations/hooks/use-reservations";
import { useRooms } from "@/features/rooms/hooks/use-rooms";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardGreetingHeader } from "./dashboard-greeting-header";
import { DashboardKpiCards } from "./dashboard-kpi-cards";
import { LatestActivitiesFeed } from "./latest-activities-feed";
import { OccupancyVolumeChart } from "./occupancy-volume-chart";

interface OperationalDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export function OperationalDashboard({ onNavigateTab }: OperationalDashboardProps) {
  const queryClient = useQueryClient();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("this_week");

  // Live queries
  const { data: stats, isFetching: isStatsFetching } = useDashboardStats();
  const { data: dbRooms, isFetching: isRoomsFetching } = useRooms();

  // Mutations
  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();

  const isRefreshing = isStatsFetching || isRoomsFetching;

  const handleRefresh = async () => {
    await queryClient.invalidateQueries();
    toast.success("Data dashboard operasional berhasil diperbarui!");
  };

  // Summary Metrics
  const totalRooms = stats?.occupancy?.totalRooms ?? 8;
  const occupiedRooms =
    stats?.occupancy?.occupiedRooms ??
    (dbRooms && Array.isArray(dbRooms) ? dbRooms.filter((r) => r.status === "occupied").length : 0);
  const occupancyRate =
    stats?.occupancy?.occupancyRate ??
    (totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0);
  const todayRevenue = stats?.todayRevenue ?? 1275000;
  const posSalesAmount = 285000;
  const posItemsSold = 5;

  // Actions
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
    <div className="w-full space-y-4 sm:space-y-5 pb-6">
      {/* 1. TOP SECTION: Greeting, Breadcrumbs & Period Actions (No extra clock) */}
      <DashboardGreetingHeader
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      {/* 2. TOP METRICS ROW: 3 Modern Metric Cards with Inline Sparklines */}
      <DashboardKpiCards
        todayRevenue={todayRevenue}
        totalRooms={totalRooms}
        occupiedRooms={occupiedRooms}
        occupancyRate={occupancyRate}
        posSalesAmount={posSalesAmount}
        posItemsSold={posItemsSold}
        onNavigateTab={onNavigateTab}
      />

      {/* 3. MIDDLE SECTION: 12-Column Grid (Volume Trend Bar Chart + Latest Updates) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* Left Column (8 cols): Bar Chart */}
        <div className="lg:col-span-8">
          <OccupancyVolumeChart />
        </div>

        {/* Right Column (4 cols): Latest Updates Activity Feed */}
        <div className="lg:col-span-4">
          <LatestActivitiesFeed
            onNavigateTab={onNavigateTab}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        </div>
      </div>
    </div>
  );
}
