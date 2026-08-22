"use client";

import { RoomCardActions } from "./room-card-actions";
import { RoomCardBody } from "./room-card-body";
import { RoomCardStatusHeader } from "./room-card-status-header";

export type RoomStatus = "ready" | "occupied" | "dirty" | "maintenance" | "booked";

export interface RoomItem {
  code: string; // "A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"
  building: "A" | "B";
  type: "ac" | "kipas";
  typeName: string; // "Kamar Tipe AC" | "Kamar Tipe Kipas"
  price: number;
  status: RoomStatus;
  guestName?: string;
  guestPhone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  totalNights?: number;
  totalAmount?: number;
  dpPaid?: number;
  remainingAmount?: number;
}

interface RoomCardProps {
  room: RoomItem;
  onOpenCheckIn: (room: RoomItem) => void;
  onOpenCheckOut: (room: RoomItem) => void;
  onOpenReceipt: (room: RoomItem) => void;
  onOpenSettlement?: (room: RoomItem) => void;
  onOpenDetail?: (room: RoomItem) => void;
  onMarkClean: (roomCode: string) => void;
  onFinishMaintenance: (roomCode: string) => void;
}

export function RoomCard({
  room,
  onOpenCheckIn,
  onOpenCheckOut,
  onOpenReceipt,
  onOpenSettlement,
  onOpenDetail,
  onMarkClean,
  onFinishMaintenance,
}: RoomCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all duration-200 flex flex-col justify-between overflow-hidden select-none group">
      <div>
        {/* 1. Sub-Komponen Strip Header Status (Klik untuk Detail) */}
        <RoomCardStatusHeader room={room} onOpenDetail={onOpenDetail} />

        {/* 2. Sub-Komponen Body Konten Kamar (Klik untuk Detail) */}
        <RoomCardBody room={room} onOpenDetail={onOpenDetail} />
      </div>

      {/* 3. Sub-Komponen Tombol Aksi Full Width */}
      <RoomCardActions
        room={room}
        onOpenCheckIn={onOpenCheckIn}
        onOpenCheckOut={onOpenCheckOut}
        onOpenReceipt={onOpenReceipt}
        onOpenSettlement={onOpenSettlement}
        onMarkClean={onMarkClean}
        onFinishMaintenance={onFinishMaintenance}
      />
    </div>
  );
}
