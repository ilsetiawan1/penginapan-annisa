import { prisma } from "@annisa/db";
import type { RoomStatus } from "@annisa/types";

export class RoomRepository {
  async findAllRooms(filter?: { building?: string; status?: string }) {
    const where: any = {};
    if (filter?.building) {
      where.building = filter.building;
    }
    if (filter?.status) {
      where.status = filter.status;
    }

    return prisma.room.findMany({
      where,
      orderBy: [{ building: "asc" }, { roomNumber: "asc" }],
      include: {
        roomType: {
          include: {
            images: {
              orderBy: { isPrimary: "desc" },
            },
          },
        },
      },
    });
  }

  async findByRoomNumber(roomNumber: string) {
    return prisma.room.findUnique({
      where: { roomNumber: roomNumber.toUpperCase() },
      include: {
        roomType: {
          include: {
            images: true,
          },
        },
      },
    });
  }

  async updateRoomStatus(roomNumber: string, status: RoomStatus, notes?: string) {
    return prisma.room.update({
      where: { roomNumber: roomNumber.toUpperCase() },
      data: {
        status,
        ...(notes !== undefined && { notes }),
      },
      include: {
        roomType: true,
      },
    });
  }

  async findAllRoomTypes() {
    return prisma.roomType.findMany({
      orderBy: { basePrice: "desc" },
      include: {
        images: true,
        rooms: {
          orderBy: { roomNumber: "asc" },
        },
      },
    });
  }

  async findRoomTypeById(id: string) {
    return prisma.roomType.findUnique({
      where: { id },
      include: {
        images: true,
        rooms: true,
      },
    });
  }

  async updateRoomType(
    id: string,
    data: {
      basePrice?: number;
      facilities?: string[];
      description?: string;
    },
  ) {
    const updateData: any = {};
    if (data.basePrice !== undefined) updateData.basePrice = data.basePrice;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.facilities !== undefined) {
      updateData.facilities = JSON.stringify(data.facilities);
    }

    return prisma.roomType.update({
      where: { id },
      data: updateData,
      include: {
        images: true,
      },
    });
  }
}

export const roomRepository = new RoomRepository();
