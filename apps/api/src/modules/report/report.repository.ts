import { prisma } from "@annisa/db";

export class ReportRepository {
  async getRoomStatusCounts() {
    const rooms = await prisma.room.findMany();
    const totalRooms = rooms.length;

    let readyRooms = 0;
    let occupiedRooms = 0;
    let bookedRooms = 0;
    let dirtyRooms = 0;
    let maintenanceRooms = 0;

    for (const room of rooms) {
      switch (room.status) {
        case "ready":
          readyRooms++;
          break;
        case "occupied":
          occupiedRooms++;
          break;
        case "booked":
          bookedRooms++;
          break;
        case "dirty":
          dirtyRooms++;
          break;
        case "maintenance":
          maintenanceRooms++;
          break;
      }
    }

    return {
      totalRooms,
      readyRooms,
      occupiedRooms,
      bookedRooms,
      dirtyRooms,
      maintenanceRooms,
    };
  }

  async getTodayCheckInOutCount() {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const [todayCheckIns, todayCheckOuts, activeGuestsCount, pendingDpBookingsCount] =
      await Promise.all([
        prisma.reservation.count({
          where: {
            checkInDate: { gte: startOfToday, lte: endOfToday },
            status: { in: ["confirmed", "checked_in"] },
          },
        }),
        prisma.reservation.count({
          where: {
            checkOutDate: { gte: startOfToday, lte: endOfToday },
          },
        }),
        prisma.reservation.count({
          where: {
            status: "checked_in",
          },
        }),
        prisma.reservation.count({
          where: {
            status: "pending_dp",
          },
        }),
      ]);

    return {
      todayCheckIns,
      todayCheckOuts,
      activeGuestsCount,
      pendingDpBookingsCount,
    };
  }

  async getMonthlyRevenue(yearMonthStr?: string) {
    const now = new Date();
    const target = yearMonthStr ? new Date(`${yearMonthStr}-01`) : now;
    const year = target.getFullYear();
    const month = target.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const reservations = await prisma.reservation.findMany({
      where: {
        createdAt: { gte: startOfMonth, lte: endOfMonth },
        status: { in: ["confirmed", "checked_in", "checked_out"] },
      },
    });

    let roomRevenue = 0;
    for (const r of reservations) {
      roomRevenue += r.dpAmount;
      if (r.paymentStatus === "paid") {
        roomRevenue += r.remainingAmount;
      }
    }

    const monthFormatted = `${year}-${String(month + 1).padStart(2, "0")}`;

    return {
      month: monthFormatted,
      totalReservations: reservations.length,
      roomRevenue,
      posSouvenirRevenue: 0, // In base model, souvenir transactions can be combined
      grandTotalRevenue: roomRevenue,
    };
  }

  async getReservationsForExport(startDate?: string, endDate?: string) {
    const where: any = {};
    if (startDate || endDate) {
      where.checkInDate = {};
      if (startDate) where.checkInDate.gte = new Date(startDate);
      if (endDate) where.checkInDate.lte = new Date(endDate);
    }

    return prisma.reservation.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        guest: true,
        room: {
          include: { roomType: true },
        },
      },
    });
  }
}

export const reportRepository = new ReportRepository();
