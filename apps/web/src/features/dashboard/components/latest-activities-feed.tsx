"use client";

import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  Clock,
  LogOut,
  Search,
  ShoppingBag,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

import { useRooms } from "@/features/rooms/hooks/use-rooms";

interface LatestActivitiesFeedProps {
  onNavigateTab: (tab: string) => void;
  onCheckIn: (id: string, name: string, room: string) => void;
  onCheckOut: (id: string, name: string, room: string) => void;
}

export function LatestActivitiesFeed({
  onNavigateTab,
  onCheckIn,
  onCheckOut,
}: LatestActivitiesFeedProps) {
  const [activeTab, setActiveTab] = useState<"today" | "yesterday" | "this_week">("today");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: dbRooms } = useRooms();

  // Derive real active items from live rooms (NO dummy items)
  const allActivities = (dbRooms || [])
    .filter((r) => r.status !== "ready")
    .map((room) => {
      if (room.status === "occupied") {
        return {
          id: `room-${room.id}`,
          category: "occupied",
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
          category: "booking",
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
          category: "housekeeping",
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
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const filteredActivities = allActivities.filter((item) => {
    const matchTab =
      activeTab === "this_week"
        ? true
        : activeTab === "yesterday"
        ? item.dateType === "yesterday"
        : item.dateType === "today";
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col h-full min-h-0 justify-between">
      <div className="flex flex-col min-h-0 h-full">
        {/* Header Title & Clock Icon */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-700">
              Aktivitas &amp; Agenda Terkini
            </h3>
          </div>
        </div>

        {/* Tab Filter Pills (Today, Yesterday, This Week) */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl mb-2.5">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`py-1 text-[11px] font-black rounded-lg transition cursor-pointer ${
              activeTab === "today"
                ? "bg-slate-900 text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Hari Ini
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("yesterday")}
            className={`py-1 text-[11px] font-black rounded-lg transition cursor-pointer ${
              activeTab === "yesterday"
                ? "bg-slate-900 text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Kemarin
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("this_week")}
            className={`py-1 text-[11px] font-black rounded-lg transition cursor-pointer ${
              activeTab === "this_week"
                ? "bg-slate-900 text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Minggu Ini
          </button>
        </div>

        {/* Search Activities Input */}
        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari aktivitas atau nama tamu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 outline-none focus:bg-white focus:ring-1 focus:ring-purple-200 transition"
          />
        </div>

        {/* Counter Header */}
        <div className="text-[11px] font-bold text-slate-400 mb-1.5">
          {filteredActivities.length} agenda &amp; aktivitas tercatat
        </div>

        {/* Activity Items List */}
        <div className="space-y-2 flex-1 min-h-0 overflow-y-auto pr-1 no-scrollbar max-h-[190px] sm:max-h-[220px] lg:max-h-[260px]">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400 flex flex-col items-center justify-center">
              <Clock className="w-5 h-5 text-slate-300 mb-1.5" />
              <p className="font-bold text-slate-600">Belum ada aktivitas operasional</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Semua pergerakan check-in, check-out, &amp; booking akan muncul di sini</p>
            </div>
          ) : (
            filteredActivities.map((act) => {
              const IconComp = act.icon;

              return (
                <div
                  key={act.id}
                  className="flex items-start justify-between gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center mt-0.5 ${act.iconColor}`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {act.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                        {act.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Right side: Time and Action Button */}
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] font-bold text-slate-400">
                      {act.time}
                    </span>
                    {act.actionLabel && act.action && (
                      <button
                        type="button"
                        onClick={act.action}
                        className="text-[10px] font-black text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-2 py-0.5 rounded-md transition cursor-pointer"
                      >
                        {act.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
