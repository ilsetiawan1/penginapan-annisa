"use client";

import {
  type AdvanceBookingData,
  AdvanceBookingModal,
  BookingSettlementModal,
  type CheckInFormData,
  CheckInModal,
  CheckOutModal,
  ReceiptModal,
} from "@/features/reservations/components/admin/modals";
import type { RoomItem } from "./room-card";
import { RoomDetailModal } from "./room-detail-modal";

interface RoomMatrixModalsProps {
  checkInModalData: RoomItem | null;
  setCheckInModalData: (val: RoomItem | null) => void;
  checkOutModalData: RoomItem | null;
  setCheckOutModalData: (val: RoomItem | null) => void;
  receiptModalData: RoomItem | null;
  setReceiptModalData: (val: RoomItem | null) => void;
  settlementModalData: RoomItem | null;
  setSettlementModalData: (val: RoomItem | null) => void;
  detailModalData: RoomItem | null;
  setDetailModalData: (val: RoomItem | null) => void;
  isAdvanceBookingOpen: boolean;
  setIsAdvanceBookingOpen: (val: boolean) => void;
  onConfirmCheckIn: (data: CheckInFormData) => void;
  onConfirmSettlement: (roomCode: string, paymentMethod: string) => void;
  onConfirmCheckOut: (paymentMethod?: "cash" | "qris" | "transfer") => void;
  onMarkClean: (roomCode: string) => void;
  onFinishMaintenance: (roomCode: string) => void;
  onConfirmAdvanceBooking: (data: AdvanceBookingData) => void;
}

export function RoomMatrixModals({
  checkInModalData,
  setCheckInModalData,
  checkOutModalData,
  setCheckOutModalData,
  receiptModalData,
  setReceiptModalData,
  settlementModalData,
  setSettlementModalData,
  detailModalData,
  setDetailModalData,
  isAdvanceBookingOpen,
  setIsAdvanceBookingOpen,
  onConfirmCheckIn,
  onConfirmSettlement,
  onConfirmCheckOut,
  onMarkClean,
  onFinishMaintenance,
  onConfirmAdvanceBooking,
}: RoomMatrixModalsProps) {
  return (
    <>
      {/* Modal Check-In Walk-In */}
      {checkInModalData && (
        <CheckInModal
          isOpen={Boolean(checkInModalData)}
          onClose={() => setCheckInModalData(null)}
          roomId={checkInModalData.id}
          roomNumber={checkInModalData.code}
          roomPrice={checkInModalData.price}
          roomTypeName={checkInModalData.typeName}
          onConfirm={onConfirmCheckIn}
        />
      )}

      {/* Modal Check-Out */}
      {checkOutModalData && (
        <CheckOutModal
          isOpen={Boolean(checkOutModalData)}
          onClose={() => setCheckOutModalData(null)}
          roomNumber={checkOutModalData.code}
          roomTypeName={checkOutModalData.typeName}
          guestName={checkOutModalData.guestName || "Tamu"}
          guestPhone={checkOutModalData.guestPhone}
          totalNights={checkOutModalData.totalNights || 1}
          totalAmount={checkOutModalData.totalAmount || checkOutModalData.price}
          dpPaid={checkOutModalData.dpPaid || 0}
          remainingAmount={checkOutModalData.remainingAmount || 0}
          onConfirmCheckOut={(pm) => onConfirmCheckOut(pm)}
        />
      )}

      {/* Modal Kwitansi */}
      {receiptModalData && (
        <ReceiptModal
          isOpen={Boolean(receiptModalData)}
          onClose={() => setReceiptModalData(null)}
          roomNumber={receiptModalData.code}
          roomTypeName={receiptModalData.typeName}
          guestName={receiptModalData.guestName || "Tamu"}
          guestPhone={receiptModalData.guestPhone || "-"}
          checkInDate={receiptModalData.checkInDate || "-"}
          checkOutDate={receiptModalData.checkOutDate || "-"}
          totalNights={receiptModalData.totalNights || 1}
          totalAmount={receiptModalData.totalAmount || receiptModalData.price}
          dpPaid={receiptModalData.dpPaid || 0}
          remainingAmount={receiptModalData.remainingAmount || 0}
        />
      )}

      {/* Modal Pelunasan & Check-In Booking WA */}
      {settlementModalData && (
        <BookingSettlementModal
          isOpen={Boolean(settlementModalData)}
          room={settlementModalData}
          onClose={() => setSettlementModalData(null)}
          onConfirmSettlement={onConfirmSettlement}
        />
      )}

      {/* Modal Detail & Aksi Lengkap Kamar */}
      {detailModalData && (
        <RoomDetailModal
          isOpen={Boolean(detailModalData)}
          room={detailModalData}
          onClose={() => setDetailModalData(null)}
          onOpenCheckIn={(room: RoomItem) => {
            setDetailModalData(null);
            setCheckInModalData(room);
          }}
          onOpenCheckOut={(room: RoomItem) => {
            setDetailModalData(null);
            setCheckOutModalData(room);
          }}
          onOpenReceipt={(room: RoomItem) => {
            setDetailModalData(null);
            setReceiptModalData(room);
          }}
          onOpenSettlement={(room: RoomItem) => {
            setDetailModalData(null);
            setSettlementModalData(room);
          }}
          onMarkClean={(roomCode: string) => {
            setDetailModalData(null);
            onMarkClean(roomCode);
          }}
          onFinishMaintenance={(roomCode: string) => {
            setDetailModalData(null);
            onFinishMaintenance(roomCode);
          }}
        />
      )}

      {/* Modal Catat Booking WA */}
      {isAdvanceBookingOpen && (
        <AdvanceBookingModal
          isOpen={isAdvanceBookingOpen}
          onClose={() => setIsAdvanceBookingOpen(false)}
          onConfirm={onConfirmAdvanceBooking}
        />
      )}
    </>
  );
}
