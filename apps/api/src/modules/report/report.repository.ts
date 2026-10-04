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

    const [reservations, posTransactions] = await Promise.all([
      prisma.reservation.findMany({
        where: {
          createdAt: { gte: startOfMonth, lte: endOfMonth },
          status: { in: ["confirmed", "checked_in", "checked_out"] },
        },
        include: {
          guest: true,
          room: {
            include: { roomType: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.posTransaction.findMany({
        where: {
          createdAt: { gte: startOfMonth, lte: endOfMonth },
        },
        include: {
          items: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    let roomRevenue = 0;
    let totalNightsBooked = 0;
    for (const r of reservations) {
      roomRevenue += r.dpAmount;
      if (r.paymentStatus === "paid") {
        roomRevenue += r.remainingAmount;
      }
      totalNightsBooked += r.totalNights;
    }

    let posSouvenirRevenue = 0;
    let souvenirItems = 0;
    for (const pt of posTransactions) {
      posSouvenirRevenue += pt.totalAmount;
      for (const item of pt.items) {
        souvenirItems += item.quantity;
      }
    }

    const grandTotalRevenue = roomRevenue + posSouvenirRevenue;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalCapacity = 8 * daysInMonth;
    const occupancyRate =
      totalCapacity > 0
        ? Math.min(100, Math.round((totalNightsBooked / totalCapacity) * 1000) / 10)
        : 0;

    const monthFormatted = `${year}-${String(month + 1).padStart(2, "0")}`;
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const monthLabel = `${monthNames[month]} ${year}`;

    const transactions = reservations.map((r) => {
      const dateStr = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(r.createdAt));

      const isLunas = r.paymentStatus === "paid";

      return {
        id: r.code,
        date: dateStr,
        room: `#${r.room?.roomNumber || "-"} (${r.room?.roomType?.name || "Kamar"})`,
        guest: r.guest?.name || "Tamu",
        nights: r.totalNights,
        amount: r.grandTotal,
        status: isLunas ? ("Lunas" as const) : ("DP 50%" as const),
      };
    });

    return {
      id: monthFormatted,
      month: monthFormatted,
      label: monthLabel,
      totalOmzet: grandTotalRevenue,
      roomRevenue,
      posSouvenirRevenue,
      souvenirOmzet: posSouvenirRevenue,
      souvenirItems,
      grandTotalRevenue,
      totalGuests: reservations.length,
      totalReservations: reservations.length,
      occupancyRate,
      transactions,
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
