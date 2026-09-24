"use client";

import { RoomMatrix } from "@/features/admin/rooms/components/room-matrix";

export default function AdminRoomsPage() {
  return (
    <div className="space-y-6">
      {/* 8-Room Live Matrix PMS */}
      <RoomMatrix />
    </div>
  );
}
