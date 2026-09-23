import { describe, expect, it } from "bun:test";
import { ReservationService } from "../reservation.service";
import { RoomService } from "../../room/room.service";

describe("📅 Reservation Module Service Tests", () => {
  const reservationService = new ReservationService();
  const roomService = new RoomService();

  it("should create online booking draft with 50% DP calculation", async () => {
    const types = await roomService.getAllRoomTypes();
    const acType = types.find((t) => t.slug === "kamar-ac")!;

    const result = await reservationService.createOnlineBooking({
      roomTypeId: acType.id,
      guestName: "Unit Test Guest",
      guestPhone: "089988776655",
      checkInDate: "2026-10-10",
      checkOutDate: "2026-10-12", // 2 nights
    });

    expect(result.reservation).toBeDefined();
    expect(result.reservation.totalNights).toBe(2);
    expect(result.reservation.grandTotal).toBe(275000 * 2); // 550.000
    expect(result.reservation.dpAmount).toBe(275000); // 50% DP
    expect(result.reservation.remainingAmount).toBe(275000);
    expect(result.paymentInfo.dpRequired).toBe(275000);
    expect(result.whatsAppUrl).toContain("https://wa.me/");
  });

  it("should enforce check-out date to be after check-in date", async () => {
    const types = await roomService.getAllRoomTypes();
    const acType = types.find((t) => t.slug === "kamar-ac")!;

    expect(
      reservationService.createOnlineBooking({
        roomTypeId: acType.id,
        guestName: "Invalid Dates",
        guestPhone: "0811111111",
        checkInDate: "2026-10-15",
        checkOutDate: "2026-10-15", // 0 nights
      }),
    ).rejects.toThrow("Tanggal Check-out harus setelah tanggal Check-in");
  });

  it("should complete check-in, check-out, and transition room to dirty", async () => {
    const rooms = await roomService.getAllRooms();
    const readyRoom = rooms.find((r) => r.status === "ready")!;

    // 1. Walk-in check in
    const walkIn = await reservationService.createWalkInBooking("", {
      roomId: readyRoom.id,
      guestName: "Walkin Test Tamu",
      guestPhone: "081299998888",
      totalNights: 1,
      paymentMethod: "cash",
      isFullPayment: true,
    });

    expect(walkIn.status).toBe("checked_in");

    // 2. Verify receipt
    const receipt = await reservationService.getReceipt(walkIn.id);
    expect(receipt.receiptNumber).toContain("REC-");
    expect(receipt.guest.name).toBe("Walkin Test Tamu");

    // 3. Check out
    const checkedOut = await reservationService.checkOut(walkIn.id, {
      markAsDirty: true,
      notes: "Tamu test selesai checkout",
    });

    expect(checkedOut.status).toBe("checked_out");

    // 4. Verify room is now dirty
    const roomAfter = await roomService.getRoomByNumber(readyRoom.roomNumber);
    expect(roomAfter.status).toBe("dirty");
  });
});
