"use client";

import { useDashboardStats } from "@/features/dashboard/hooks/use-dashboard-stats";
import {
  useCheckIn,
  useCheckOut,
  useReservations,
} from "@/features/reservations/hooks/use-reservations";
import type { RoomItem } from "@/features/rooms/components/admin/room-card";
import { useRooms, useUpdateRoomStatus } from "@/features/rooms/hooks/use-rooms";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DashboardGreetingHeader } from "./dashboard-greeting-header";
import { DashboardKpiCards } from "./dashboard-kpi-cards";
import { LatestActivitiesFeed } from "./latest-activities-feed";
import { LiveRoomMonitoringTable } from "./live-room-monitoring-table";
import { OccupancyVolumeChart } from "./occupancy-volume-chart";

// Default fallback data 8 kamar resmi Penginapan Annisa
const DEFAULT_ROOMS: RoomItem[] = [
  {
    code: "A1",
    building: "A",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    status: "occupied",
    guestName: "Ibu Maya Susanti",
    guestPhone: "081234567890",
    checkInDate: "27 Sep - 29 Sep 2026",
    totalNights: 2,
    totalAmount: 550000,
    dpPaid: 550000,
    remainingAmount: 0,
  },
  {
    code: "A2",
    building: "A",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    status: "occupied",
    guestName: "Budi Santoso",
    guestPhone: "082198765432",
    checkInDate: "26 Sep - 27 Sep 2026",
    totalNights: 1,
    totalAmount: 275000,
    dpPaid: 275000,
    remainingAmount: 0,
  },
  {
    code: "A3",
    building: "A",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    status: "dirty",
    guestName: "Transit Siang (Selesai)",
    checkInDate: "27 Sep 2026",
    totalNights: 1,
    totalAmount: 200000,
  },
  {
    code: "A4",
    building: "A",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    status: "ready",
  },
  {
    code: "B1",
    building: "B",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    status: "booked",
    guestName: "Hendra Pratama",
    guestPhone: "085211223344",
    checkInDate: "27 Sep - 28 Sep 2026",
    totalNights: 1,
    totalAmount: 275000,
    dpPaid: 150000,
    remainingAmount: 125000,
  },
  {
    code: "B2",
    building: "B",
    type: "ac",
    typeName: "Kamar Tipe AC",
    price: 275000,
    status: "occupied",
    guestName: "Fajar Nugraha",
    guestPhone: "081399887766",
    checkInDate: "27 Sep - 28 Sep 2026",
    totalNights: 1,
    totalAmount: 275000,
    dpPaid: 275000,
    remainingAmount: 0,
  },
  {
    code: "B3",
    building: "B",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    status: "occupied",
    guestName: "Rudi Hartono",
    guestPhone: "082344556677",
    checkInDate: "27 Sep - 28 Sep 2026",
    totalNights: 1,
    totalAmount: 200000,
    dpPaid: 200000,
    remainingAmount: 0,
  },
  {
    code: "B4",
    building: "B",
    type: "kipas",
    typeName: "Kamar Tipe Kipas",
    price: 200000,
    status: "ready",
  },
];

interface OperationalDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export function OperationalDashboard({ onNavigateTab }: OperationalDashboardProps) {
  const queryClient = useQueryClient();
  const [selectedPeriod, setSelectedPeriod] = useState<string>("this_week");

  // Live queries
  const { data: stats, isFetching: isStatsFetching } = useDashboardStats();
  const { data: dbRooms, isFetching: isRoomsFetching } = useRooms();
  const { data: reservations } = useReservations();

  // Mutations
  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();
  const updateRoomStatusMutation = useUpdateRoomStatus();

  const isRefreshing = isStatsFetching || isRoomsFetching;

  const handleRefresh = async () => {
    await queryClient.invalidateQueries();
    toast.success("Data dashboard operasional berhasil diperbarui!");
  };

  // Map real-time rooms
  const roomsData: RoomItem[] = useMemo(() => {
    if (!dbRooms || !Array.isArray(dbRooms) || dbRooms.length === 0) {
      return DEFAULT_ROOMS;
    }

    return dbRooms.map((r) => {
      const code = r.roomNumber;
      const building = code.startsWith("B") ? "B" : "A";
      const isAc = r.roomType?.name?.toLowerCase().includes("ac") || code.endsWith("1") || code.endsWith("2");
      const type = isAc ? "ac" : "kipas";
      const typeName = r.roomType?.name || (isAc ? "Kamar Tipe AC" : "Kamar Tipe Kipas");
      const price = r.roomType?.basePrice || (isAc ? 275000 : 200000);
      const isRoomReady = (r.status as RoomItem["status"]) === "ready";

      // Find matching default guest or reservation
      const defaultMatch = DEFAULT_ROOMS.find((def) => def.code === code);

      return {
        code,
        building,
        type,
        typeName,
        price,
        status: (r.status as RoomItem["status"]) || "ready",
        guestName: isRoomReady ? undefined : defaultMatch?.guestName,
        guestPhone: isRoomReady ? undefined : defaultMatch?.guestPhone,
        checkInDate: isRoomReady ? undefined : defaultMatch?.checkInDate,
        checkOutDate: isRoomReady ? undefined : defaultMatch?.checkOutDate,
        totalNights: isRoomReady ? undefined : defaultMatch?.totalNights,
        totalAmount: isRoomReady ? undefined : defaultMatch?.totalAmount,
        dpPaid: isRoomReady ? undefined : defaultMatch?.dpPaid,
        remainingAmount: isRoomReady ? undefined : defaultMatch?.remainingAmount,
      };
    });
  }, [dbRooms]);

  // Summary Metrics
  const totalRooms = stats?.occupancy?.totalRooms ?? 8;
  const occupiedRooms = roomsData.filter((r) => r.status === "occupied").length;
  const readyRooms = roomsData.filter((r) => r.status === "ready").length;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
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

  const handleMarkClean = (roomCode: string) => {
    updateRoomStatusMutation.mutate(
      { roomNumber: roomCode, input: { status: "ready", notes: "Selesai dibersihkan housekeeping" } },
      {
        onSuccess: () => {
          toast.success(`Kamar #${roomCode} kini berstatus Siap Huni!`);
        },
      },
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. TOP SECTION: Greeting, Breadcrumbs, Date Capsule & Actions */}
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
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

      {/* 4. BOTTOM SECTION: Full-Width Room Matrix Monitoring Table */}
      <LiveRoomMonitoringTable
        rooms={roomsData}
        onNavigateTab={onNavigateTab}
        onCheckInAction={(room) => handleCheckIn(room.code, room.guestName || "Tamu", `#${room.code}`)}
        onCheckOutAction={(room) => handleCheckOut(room.code, room.guestName || "Tamu", `#${room.code}`)}
        onMarkCleanAction={handleMarkClean}
      />
    </div>
  );
}
