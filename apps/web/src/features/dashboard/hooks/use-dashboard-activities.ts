"use client";

import { useRooms } from "@/features/rooms/hooks/use-rooms";
import { Sparkles, UserCheck } from "lucide-react";
import type React from "react";
import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

export type ActivityTab = "today" | "yesterday" | "this_week";

export interface ActivityItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
  dateType: "today" | "yesterday";
  actionLabel: string;
  action: () => void;
}

interface UseDashboardActivitiesProps {
  onNavigateTab: (tab: string) => void;
}

export function useDashboardActivities({ onNavigateTab }: UseDashboardActivitiesProps) {
  const [activeTab, setActiveTab] = useState<ActivityTab>("today");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: dbRooms, isLoading: isLoadingRooms } = useRooms();

  const allActivities = useMemo(() => {
    return (dbRooms || [])
      .filter((r) => r.status !== "ready")
      .map((room): ActivityItem | null => {
        if (room.status === "occupied") {
          return {
            id: `room-${room.id}`,
            icon: UserCheck,
            iconColor: "text-blue-600 bg-blue-50",
            title: `Kamar #${room.roomNumber} Sedang Terisi`,
            subtitle: "Tamu aktif menginap • Siap layani keperluan transit",
            time: "Aktif",
            dateType: "today",
            actionLabel: "Lihat Kamar",
            action: () => onNavigateTab("matrix"),
          };
        }
        if (room.status === "booked") {
          return {
            id: `room-${room.id}`,
            icon: FaWhatsapp,
            iconColor: "text-emerald-600 bg-emerald-50",
            title: `Booking WA Masuk #${room.roomNumber}`,
            subtitle: "Menunggu kedatangan tamu transit di lobi",
            time: "Hari Ini",
            dateType: "today",
            actionLabel: "Check-In",
            action: () => onNavigateTab("matrix"),
          };
        }
        if (room.status === "dirty") {
          return {
            id: `room-${room.id}`,
            icon: Sparkles,
            iconColor: "text-amber-600 bg-amber-50",
            title: `Perlu Housekeeping #${room.roomNumber}`,
            subtitle: "Kamar selesai check-out • Menunggu pembersihan",
            time: "Hari Ini",
            dateType: "today",
            actionLabel: "Bersihkan",
            action: () => onNavigateTab("matrix"),
          };
        }
        return null;
      })
      .filter((item): item is ActivityItem => item !== null);
  }, [dbRooms, onNavigateTab]);

  const filteredActivities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allActivities.filter((item) => {
      const matchTab =
        activeTab === "this_week"
          ? true
          : activeTab === "yesterday"
            ? item.dateType === "yesterday"
            : item.dateType === "today";
      const matchSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query);
      return matchTab && matchSearch;
    });
  }, [allActivities, activeTab, searchQuery]);

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredActivities,
    isLoading: isLoadingRooms,
  };
}
