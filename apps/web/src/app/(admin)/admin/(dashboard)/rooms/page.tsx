"use client";

import { RoomMatrix } from "@/features/admin/rooms/components/room-matrix";
import { RoomManagement } from "@/features/admin/rooms/components/room-management";
import { useAuth } from "@/features/auth/hooks/use-auth";

export default function AdminRoomsPage() {
  const { isOwner } = useAuth();

  return (
    <div className="space-y-6">
      {/* 8-Room Live Matrix PMS */}
      <RoomMatrix />

      {/* Owner-Only Room Rate & Facility Management */}
      {isOwner && (
        <div className="mt-8 pt-6 border-t border-purple-100/80">
          <RoomManagement />
        </div>
      )}
    </div>
  );
}
