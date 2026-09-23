import { prisma } from "@annisa/db";
import type { PaymentMethod, PaymentStatus, ReservationStatus } from "@annisa/types";

export class ReservationRepository {
  async findReservations(params: {
    status?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.max(1, params.limit || 10);
    const skip = (page - 1) * limit;

    const where: any = {};

    if (params.status) {
      where.status = params.status;
    }

    if (params.startDate || params.endDate) {
      where.checkInDate = {};
      if (params.startDate) {
        where.checkInDate.gte = new Date(params.startDate);
      }
      if (params.endDate) {
        where.checkInDate.lte = new Date(params.endDate);
      }
    }

    if (params.search) {
      where.OR = [
        { code: { contains: params.search, mode: "insensitive" } },
        { guest: { name: { contains: params.search, mode: "insensitive" } } },
        { guest: { phone: { contains: params.search, mode: "insensitive" } } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.reservation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          room: {
            include: {
              roomType: true,
            },
          },
          guest: true,
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      }),
      prisma.reservation.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findReservationById(id: string) {
    return prisma.reservation.findUnique({
      where: { id },
      include: {
        room: {
          include: {
            roomType: true,
          },
        },
        guest: true,
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async findReservationByCode(code: string) {
    return prisma.reservation.findUnique({
      where: { code },
      include: {
        room: {
          include: {
            roomType: true,
          },
        },
        guest: true,
      },
    });
  }

  async findConflictingReservations(
    roomId: string,
    checkInDate: Date,
    checkOutDate: Date,
    excludeReservationId?: string,
  ) {
    return prisma.reservation.findMany({
      where: {
        roomId,
        id: excludeReservationId ? { not: excludeReservationId } : undefined,
        status: { in: ["confirmed", "checked_in"] },
        AND: [
          { checkInDate: { lt: checkOutDate } },
          { checkOutDate: { gt: checkInDate } },
        ],
      },
    });
  }

  async findAvailableRoomForType(
    roomTypeId: string,
    checkInDate: Date,
    checkOutDate: Date,
  ) {
    const rooms = await prisma.room.findMany({
      where: {
        roomTypeId,
        status: { not: "maintenance" },
      },
      include: {
        roomType: true,
      },
    });

    for (const room of rooms) {
      const conflicts = await this.findConflictingReservations(
        room.id,
        checkInDate,
        checkOutDate,
      );
      if (conflicts.length === 0) {
        return room;
      }
    }

    return null;
  }

  async findOrCreateGuest(data: {
    name: string;
    phone: string;
    email?: string;
    idCardNumber?: string;
    address?: string;
  }) {
    const cleanPhone = data.phone.trim();
    const existing = await prisma.guest.findFirst({
      where: { phone: cleanPhone },
    });

    if (existing) {
      return prisma.guest.update({
        where: { id: existing.id },
        data: {
          name: data.name,
          email: data.email || existing.email,
          idCardNumber: data.idCardNumber || existing.idCardNumber,
          address: data.address || existing.address,
        },
      });
    }

    return prisma.guest.create({
      data: {
        name: data.name,
        phone: cleanPhone,
        email: data.email,
        idCardNumber: data.idCardNumber,
        address: data.address,
      },
    });
  }

  async getNextReservationSequence(): Promise<number> {
    const today = new Date();
    const yearMonth = today.toISOString().slice(0, 7).replace("-", ""); // e.g. 202609
    const count = await prisma.reservation.count({
      where: {
        code: {
          startsWith: `ANNISA-${yearMonth}-`,
        },
      },
    });
    return count + 1;
  }

  async createReservation(data: {
    code: string;
    roomId: string;
    guestId: string;
    userId?: string;
    checkInDate: Date;
    checkOutDate: Date;
    totalNights: number;
    roomRatePerNight: number;
    grandTotal: number;
    dpAmount: number;
    remainingAmount: number;
    status: ReservationStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    notes?: string;
  }) {
    return prisma.reservation.create({
      data: {
        ...data,
        userId: data.userId ? data.userId : undefined,
      },
      include: {
        room: {
          include: {
            roomType: true,
          },
        },
        guest: true,
      },
    });
  }

  async updateReservation(
    id: string,
    data: {
      status?: ReservationStatus;
      paymentStatus?: PaymentStatus;
      paymentMethod?: PaymentMethod;
      dpAmount?: number;
      remainingAmount?: number;
      notes?: string;
    },
  ) {
    return prisma.reservation.update({
      where: { id },
      data,
      include: {
        room: {
          include: {
            roomType: true,
          },
        },
        guest: true,
      },
    });
  }

  async updateRoomStatusById(roomId: string, status: any, notes?: string) {
    return prisma.room.update({
      where: { id: roomId },
      data: {
        status,
        ...(notes !== undefined && { notes }),
      },
    });
  }
}

export const reservationRepository = new ReservationRepository();
