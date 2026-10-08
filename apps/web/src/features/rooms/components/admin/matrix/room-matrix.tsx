"use client";

import { useRoomMatrixActions } from "@/features/rooms/hooks/use-room-matrix-actions";
import { RoomCard } from "./room-card";
import { RoomMatrixFilter } from "./room-matrix-filter";
import { RoomMatrixHeader } from "./room-matrix-header";
import { RoomMatrixModals } from "./room-matrix-modals";
import { RoomMatrixSkeleton } from "./room-matrix-skeleton";

export function RoomMatrix() {
  const {
    filteredRooms,
    roomsA,
    roomsB,
    isLoading,
    filterStatus,
    setFilterStatus,
    counts,
    modals,
    handlers,
  } = useRoomMatrixActions();

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 pb-6">
      {/* 1. PAGE HEADER & ACTION CONTROLS */}
      <RoomMatrixHeader onOpenAdvanceBooking={() => modals.setIsAdvanceBookingOpen(true)} />

      {/* 2. FILTER BAR: DUAL VIEWPORT ARCHITECTURE & TOOLBAR */}
      <RoomMatrixFilter
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        counts={counts}
        onRefresh={handlers.handleResetRooms}
        isRefreshing={modals.isRefreshing}
      />

      {/* 3. TWO COLUMN LAYOUT: BANGUNAN A & BANGUNAN B */}
      {isLoading ? (
        <RoomMatrixSkeleton />
      ) : filteredRooms.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-2xs space-y-3">
          <p className="text-xs text-slate-500 font-medium">
            Tidak ada unit kamar dengan filter status yang dipilih.
          </p>
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className="text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl transition cursor-pointer"
          >
            Tampilkan Semua Unit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* BANGUNAN A */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-900" />
                <h3 className="text-sm font-bold text-slate-900">Bangunan A</h3>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-white/80 border border-slate-200/80 px-2.5 py-0.5 rounded-lg shadow-2xs">
                2 AC • 2 Kipas
              </span>
            </div>

            {roomsA.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-white/50 border border-dashed border-slate-200 text-xs text-slate-400">
                Tidak ada kamar sesuai filter di Bangunan A
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                {roomsA.map((room) => (
                  <RoomCard
                    key={room.code}
                    room={room}
                    onOpenCheckIn={modals.setCheckInModalData}
                    onOpenCheckOut={modals.setCheckOutModalData}
                    onOpenReceipt={modals.setReceiptModalData}
                    onOpenSettlement={modals.setSettlementModalData}
                    onOpenDetail={modals.setDetailModalData}
                    onMarkClean={handlers.handleMarkClean}
                    onFinishMaintenance={handlers.handleFinishMaintenance}
                  />
                ))}
              </div>
            )}
          </div>

          {/* BANGUNAN B */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-900" />
                <h3 className="text-sm font-bold text-slate-900">Bangunan B</h3>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-white/80 border border-slate-200/80 px-2.5 py-0.5 rounded-lg shadow-2xs">
                2 AC • 2 Kipas
              </span>
            </div>

            {roomsB.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-white/50 border border-dashed border-slate-200 text-xs text-slate-400">
                Tidak ada kamar sesuai filter di Bangunan B
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
                {roomsB.map((room) => (
                  <RoomCard
                    key={room.code}
                    room={room}
                    onOpenCheckIn={modals.setCheckInModalData}
                    onOpenCheckOut={modals.setCheckOutModalData}
                    onOpenReceipt={modals.setReceiptModalData}
                    onOpenSettlement={modals.setSettlementModalData}
                    onOpenDetail={modals.setDetailModalData}
                    onMarkClean={handlers.handleMarkClean}
                    onFinishMaintenance={handlers.handleFinishMaintenance}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. MODALS & DIALOGS */}
      <RoomMatrixModals
        checkInModalData={modals.checkInModalData}
        setCheckInModalData={modals.setCheckInModalData}
        checkOutModalData={modals.checkOutModalData}
        setCheckOutModalData={modals.setCheckOutModalData}
        receiptModalData={modals.receiptModalData}
        setReceiptModalData={modals.setReceiptModalData}
        settlementModalData={modals.settlementModalData}
        setSettlementModalData={modals.setSettlementModalData}
        detailModalData={modals.detailModalData}
        setDetailModalData={modals.setDetailModalData}
        isAdvanceBookingOpen={modals.isAdvanceBookingOpen}
        setIsAdvanceBookingOpen={modals.setIsAdvanceBookingOpen}
        onConfirmCheckIn={handlers.handleConfirmCheckIn}
        onConfirmSettlement={handlers.handleConfirmSettlement}
        onConfirmCheckOut={handlers.handleConfirmCheckOut}
        onMarkClean={handlers.handleMarkClean}
        onFinishMaintenance={handlers.handleFinishMaintenance}
        onConfirmAdvanceBooking={handlers.handleConfirmAdvanceBooking}
      />
    </div>
  );
}
