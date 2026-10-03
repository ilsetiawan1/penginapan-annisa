"use client";

import { Clock, Search, Sparkles, UserCheck } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { useRooms } from "@/features/rooms/hooks/use-rooms";

interface LatestActivitiesFeedProps {
  onNavigateTab: (tab: string) => void;
  onCheckIn: (id: string, name: string, room: string) => void;
  onCheckOut: (id: string, name: string, room: string) => void;
}

export function LatestActivitiesFeed({ onNavigateTab }: LatestActivitiesFeedProps) {
  const [activeTab, setActiveTab] = useState<"today" | "yesterday" | "this_week">("today");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: dbRooms } = useRooms();

  const allActivities = (dbRooms || [])
    .filter((r) => r.status !== "ready")
    .map((room) => {
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
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs flex flex-col h-full min-h-0 justify-between">
      <div className="flex flex-col min-h-0 h-full">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
          <h3 className="text-sm font-bold text-slate-900">
            Aktivitas &amp; Agenda
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Real-time</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl mb-2.5">
          {(["today", "yesterday", "this_week"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab === "today" ? "Hari Ini" : tab === "yesterday" ? "Kemarin" : "Minggu Ini"}
            </button>
          ))}
        </div>

        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari aktivitas atau nomor kamar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-[#faf9fc] border border-[#e2dcf2] rounded-xl text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-[#7a68b7] transition-colors"
          />
        </div>

        <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
          {filteredActivities.length} agenda &amp; aktivitas aktif
        </div>

        <div className="space-y-2 flex-1 min-h-0 overflow-y-auto pr-1 max-h-[190px] sm:max-h-[220px] lg:max-h-[260px]">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400 flex flex-col items-center justify-center">
              <Clock className="w-5 h-5 text-slate-300 mb-1.5" />
              <p className="font-semibold text-slate-600">Belum ada aktivitas operasional</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Pergerakan kamar dan reservasi akan muncul di sini</p>
            </div>
          ) : (
            filteredActivities.map((act) => {
              const IconComp = act.icon;
              return (
                <div
                  key={act.id}
                  className="flex items-start justify-between gap-2.5 p-2 rounded-xl hover:bg-[#faf9fc] transition-colors border border-transparent hover:border-[#e2dcf2]"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center mt-0.5 ${act.iconColor}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-800 truncate">{act.title}</div>
                      <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{act.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] font-semibold text-slate-400">{act.time}</span>
                    <button
                      type="button"
                      onClick={act.action}
                      className="text-[10px] font-bold text-[#594791] bg-[#ede8f8] hover:bg-[#ddd3f3] px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      {act.actionLabel}
                    </button>
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
