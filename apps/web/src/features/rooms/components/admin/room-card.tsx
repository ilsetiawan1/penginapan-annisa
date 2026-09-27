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
    <div className="bg-white rounded-3xl p-3.5 sm:p-4 border border-purple-100/90 shadow-2xs hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex flex-col justify-between gap-3 group select-none">
      {/* 1. Header: Nomor Kamar, Status Badge, Nama Tipe & Tarif */}
      <RoomCardStatusHeader room={room} onOpenDetail={onOpenDetail} />

      {/* 2. Body: Kondisi Kamar / Rincian Tamu (Kompak Tanpa Fasilitas) */}
      <RoomCardBody room={room} onOpenDetail={onOpenDetail} />

      {/* 3. Action Buttons: Check-In, Check-Out, Pelunasan, Bersihkan */}
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
