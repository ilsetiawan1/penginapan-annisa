"use client";

import { useOperationalDashboard } from "../hooks/use-operational-dashboard";
import { DashboardHeader } from "./dashboard-header";
import { DashboardStatsGrid } from "./dashboard-stats-grid";
import { LatestActivitiesFeed } from "./latest-activities-feed";
import { OccupancyVolumeChart } from "./occupancy-volume-chart";
import { RoomAvailabilityTable } from "./room-availability-table";

interface OperationalDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export function OperationalDashboard({ onNavigateTab }: OperationalDashboardProps) {
  const { rooms, metrics, isRefreshing, handleRefresh, handleCheckIn, handleCheckOut } =
    useOperationalDashboard();

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 pb-6">
      <DashboardHeader
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onCheckInClick={() => onNavigateTab("matrix")}
      />

      <DashboardStatsGrid
        todayRevenue={metrics.todayRevenue}
        totalRooms={metrics.totalRooms}
        occupiedRooms={metrics.occupiedRooms}
        occupancyRate={metrics.occupancyRate}
        posSalesAmount={metrics.posSalesAmount}
        posItemsSold={metrics.posItemsSold}
        onNavigateTab={onNavigateTab}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <OccupancyVolumeChart
            occupiedRooms={metrics.occupiedRooms}
            totalRooms={metrics.totalRooms}
            todayRevenue={metrics.todayRevenue}
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

      <RoomAvailabilityTable rooms={rooms} onNavigateTab={onNavigateTab} />
    </div>
  );
}
