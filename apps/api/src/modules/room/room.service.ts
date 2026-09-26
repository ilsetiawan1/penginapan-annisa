import { prisma } from "@annisa/db";
import type { RoomStatus, UpdateRoomRateInput, UpdateRoomStatusInput } from "@annisa/types";
import { AppError } from "../../middlewares/error.middleware";
import { HTTP_STATUS } from "../../constants";
import { roomRepository, type RoomRepository } from "./room.repository";

export class RoomService {
  private repo: RoomRepository;

  constructor(repo?: RoomRepository) {
    this.repo = repo ?? roomRepository;
  }

  private parseFacilities(roomType: any) {
    if (!roomType) return roomType;
    let facilities = roomType.facilities;
    if (typeof facilities === "string") {
      try {
        facilities = JSON.parse(facilities);
      } catch {
        facilities = [];
      }
    }
    return {
      ...roomType,
      facilities: Array.isArray(facilities) ? facilities : [],
    };
  }

  async getAllRooms(filter?: { building?: string; status?: string }) {
    const rooms = await this.repo.findAllRooms(filter);
    return rooms.map((room) => {
      const roomImage =
        room.roomType?.images?.find(
          (img: any) =>
            img.caption?.toUpperCase() === room.roomNumber.toUpperCase(),
        )?.imageUrl || "";

      return {
        ...room,
        imageUrl: roomImage,
        roomType: room.roomType ? this.parseFacilities(room.roomType) : null,
      };
    });
  }

  async getRoomByNumber(roomNumber: string) {
    const room = await this.repo.findByRoomNumber(roomNumber);
    if (!room) {
      throw new AppError(
        `Kamar dengan nomor ${roomNumber} tidak ditemukan.`,
        HTTP_STATUS.NOT_FOUND,
      );
    }
    const roomImage =
      room.roomType?.images?.find(
        (img: any) =>
          img.caption?.toUpperCase() === room.roomNumber.toUpperCase(),
      )?.imageUrl || "";

    return {
      ...room,
      imageUrl: roomImage,
      roomType: room.roomType ? this.parseFacilities(room.roomType) : null,
    };
  }

  async updateRoomImage(roomNumber: string, imageUrl: string) {
    const room = await this.repo.findByRoomNumber(roomNumber);
    if (!room) {
      throw new AppError(
        `Kamar ${roomNumber} tidak ditemukan.`,
        HTTP_STATUS.NOT_FOUND,
      );
    }

    // Hapus foto lama untuk kamar ini di RoomImage
    await prisma.roomImage.deleteMany({
      where: {
        roomTypeId: room.roomTypeId,
        caption: roomNumber.toUpperCase(),
      },
    });

    const cleanUrl = imageUrl?.trim() || "";
    // Simpan foto baru jika valid (bukan dummy dan bukan string kosong)
    if (
      cleanUrl &&
      !cleanUrl.includes("/rooms/room-") &&
      !cleanUrl.startsWith("/images/")
    ) {
      await prisma.roomImage.create({
        data: {
          roomTypeId: room.roomTypeId,
          caption: roomNumber.toUpperCase(),
          imageUrl: cleanUrl,
          isPrimary: false,
        },
      });
    }

    return this.getRoomByNumber(roomNumber);
  }


  async updateRoomStatus(roomNumber: string, input: UpdateRoomStatusInput) {
    const existing = await this.repo.findByRoomNumber(roomNumber);
    if (!existing) {
      throw new AppError(
        `Kamar ${roomNumber} tidak ditemukan.`,
        HTTP_STATUS.NOT_FOUND,
      );
    }

    const updated = await this.repo.updateRoomStatus(
      roomNumber,
      input.status as RoomStatus,
      input.notes,
    );

    return {
      ...updated,
      roomType: updated.roomType ? this.parseFacilities(updated.roomType) : null,
    };
  }

  async getAllRoomTypes() {
    const types = await this.repo.findAllRoomTypes();
    return types.map((t) => this.parseFacilities(t));
  }

  async getRoomTypeById(id: string) {
    const roomType = await this.repo.findRoomTypeById(id);
    if (!roomType) {
      throw new AppError("Tipe kamar tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }
    return this.parseFacilities(roomType);
  }

  async updateRoomRate(id: string, input: UpdateRoomRateInput) {
    const existing = await this.repo.findRoomTypeById(id);
    if (!existing) {
      throw new AppError("Tipe kamar tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    const updated = await this.repo.updateRoomType(id, input);
    return this.parseFacilities(updated);
  }
}

export const roomService = new RoomService();
