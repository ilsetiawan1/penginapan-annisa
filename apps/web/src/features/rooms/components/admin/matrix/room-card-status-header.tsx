"use client";

import { ChevronRight } from "lucide-react";
import type { RoomItem } from "./room-card";

interface RoomCardStatusHeaderProps {
  room: RoomItem;
  onOpenDetail?: (room: RoomItem) => void;
}

export function RoomCardStatusHeader({ room, onOpenDetail }: RoomCardStatusHeaderProps) {
  const isReady = room.status === "ready";
  const isOccupied = room.status === "occupied";
  const isDirty = room.status === "dirty";
  const isMaintenance = room.status === "maintenance";
  const isBooked = room.status === "booked";

  const handleOpenDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenDetail) onOpenDetail(room);
  };

  return (
    <div>
      {/* Top Row: Room ID & Status Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <span className="text-xs font-bold text-slate-800 bg-slate-100/90 border border-slate-200/60 px-2 py-0.5 rounded-lg">
          #{room.code}
        </span>

        <div className="flex items-center gap-1.5">
          {isReady && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Tersedia
            </span>
          )}
          {isOccupied && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              Terisi
            </span>
          )}
          {isBooked && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Dipesan
            </span>
          )}
          {isDirty && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Perlu Bersih
            </span>
          )}
          {isMaintenance && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Perbaikan
            </span>
          )}
        </div>
      </div>

      {/* Room Title & Rate */}
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-slate-800 leading-snug">{room.typeName}</h4>
          <button
            type="button"
            onClick={handleOpenDetail}
            className="text-[11px] font-medium text-slate-400 hover:text-slate-700 flex items-center gap-0.5 cursor-pointer"
          >
            <span>Detail</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          <span className="font-medium text-slate-800">
            Rp {room.price.toLocaleString("id-ID")}
          </span>{" "}
          <span className="text-slate-400">/ malam</span>
        </p>
      </div>
    </div>
  );
}
