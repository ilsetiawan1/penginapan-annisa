"use client";

import { RoomMatrix } from "@/features/rooms/components/admin/room-matrix";

export default function AdminRoomsPage() {
  return (
    <div className="h-full flex flex-col min-h-0">
      {/* 8-Room Live Matrix PMS */}
      <RoomMatrix />
    </div>
  );
}
