import { describe, expect, it } from "bun:test";
import { RoomService } from "../room.service";

describe("🏨 Room Module Service Tests", () => {
  const roomService = new RoomService();

  it("should fetch all 8 official rooms with roomType details", async () => {
    const rooms = await roomService.getAllRooms();

    expect(rooms).toBeDefined();
    expect(rooms.length).toBe(8);

    // Verify room numbers A1..A4 and B1..B4 exist
    const roomNumbers = rooms.map((r) => r.roomNumber);
    expect(roomNumbers).toContain("A1");
    expect(roomNumbers).toContain("A4");
    expect(roomNumbers).toContain("B1");
    expect(roomNumbers).toContain("B4");

    // Check facilities is parsed as an Array
    expect(Array.isArray(rooms[0].roomType?.facilities)).toBe(true);
  });

  it("should fetch single room by room number", async () => {
    const room = await roomService.getRoomByNumber("A1");

    expect(room).toBeDefined();
    expect(room.roomNumber).toBe("A1");
    expect(room.building).toBe("A");
    expect(room.roomType).toBeDefined();
  });

  it("should fetch all room types with pricing", async () => {
    const types = await roomService.getAllRoomTypes();

    expect(types.length).toBeGreaterThanOrEqual(2);
    const ac = types.find((t) => t.slug === "kamar-ac");
    const kipas = types.find((t) => t.slug === "kamar-kipas");

    expect(ac).toBeDefined();
    expect(ac?.basePrice).toBe(275000);

    expect(kipas).toBeDefined();
    expect(kipas?.basePrice).toBe(200000);
  });

  it("should update room status cleanly", async () => {
    const updated = await roomService.updateRoomStatus("A1", {
      status: "ready",
      notes: "Selesai dibersihkan staf",
    });

    expect(updated.status).toBe("ready");
    expect(updated.notes).toBe("Selesai dibersihkan staf");
  });

  it("should throw error for non-existent room number", async () => {
    expect(roomService.getRoomByNumber("Z99")).rejects.toThrow(
      "Kamar dengan nomor Z99 tidak ditemukan.",
    );
  });
});
