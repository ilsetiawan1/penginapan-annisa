"use client";

import { useRoomManagementActions } from "@/features/rooms/hooks/use-room-management-actions";
import { RoomEditModal } from "./room-edit-modal";
import { RoomManagementFilter } from "./room-management-filter";
import { RoomManagementHeader } from "./room-management-header";
import { RoomManagementSkeleton } from "./room-management-skeleton";
import { type MasterRoomItem, RoomMasterCard, cleanImageUrl } from "./room-master-card";

export { cleanImageUrl, type MasterRoomItem };

export function RoomManagement() {
  const {
    filteredRooms,
    roomsA,
    roomsB,
    isLoading,
    filterBuilding,
    setFilterBuilding,
    editingRoom,
    setEditingRoom,
    newFacilityInput,
    setNewFacilityInput,
    r2Gallery,
    isLoadingR2,
    fetchR2Gallery,
    handlers,
  } = useRoomManagementActions();

  return (
    <div className="space-y-6">
      {/* 1. Header Info & Aksi Global */}
      <RoomManagementHeader
        onClearAllDummyImages={handlers.handleClearAllDummyImages}
        onResetDefault={handlers.handleResetDefault}
        isLoading={isLoading}
      />

      {/* 2. Filter Bangunan Pill Bar */}
      <RoomManagementFilter filterBuilding={filterBuilding} setFilterBuilding={setFilterBuilding} />

      {/* 3. Grid 8 Kamar Terbagi 2 Bangunan */}
      {isLoading ? (
        <RoomManagementSkeleton />
      ) : filteredRooms.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-2xs space-y-3">
          <p className="text-xs text-slate-500 font-medium">
            Tidak ada unit kamar dengan filter bangunan yang dipilih.
          </p>
          <button
            type="button"
            onClick={() => setFilterBuilding("all")}
            className="text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl transition cursor-pointer"
          >
            Tampilkan Semua Bangunan
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {(filterBuilding === "all" || filterBuilding === "A") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                    Bangunan A (Sisi Kiri)
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-400">2 Kamar AC • 2 Kamar Kipas</span>
              </div>

              {roomsA.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-white/50 border border-dashed border-slate-200 text-xs text-slate-400">
                  Tidak ada kamar di Bangunan A
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {roomsA.map((room) => (
                    <RoomMasterCard
                      key={room.code}
                      room={room}
                      onEdit={() => handlers.handleOpenEdit(room)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {(filterBuilding === "all" || filterBuilding === "B") && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-700" />
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                    Bangunan B (Sisi Kanan)
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-400">2 Kamar AC • 2 Kamar Kipas</span>
              </div>

              {roomsB.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-white/50 border border-dashed border-slate-200 text-xs text-slate-400">
                  Tidak ada kamar di Bangunan B
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {roomsB.map((room) => (
                    <RoomMasterCard
                      key={room.code}
                      room={room}
                      onEdit={() => handlers.handleOpenEdit(room)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. Modal Edit Spesifikasi, Foto & Tarif Kamar */}
      <RoomEditModal
        editingRoom={editingRoom}
        setEditingRoom={setEditingRoom}
        r2Gallery={r2Gallery}
        isLoadingR2={isLoadingR2}
        fetchR2Gallery={fetchR2Gallery}
        newFacilityInput={newFacilityInput}
        setNewFacilityInput={setNewFacilityInput}
        handleAddFacility={handlers.handleAddFacility}
        handleRemoveFacility={handlers.handleRemoveFacility}
        handleSaveEdit={handlers.handleSaveEdit}
      />
    </div>
  );
}
