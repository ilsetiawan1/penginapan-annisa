import {
  reportRepository,
  type ReportRepository,
} from "./report.repository";

export class ReportService {
  private repo: ReportRepository;

  constructor(repo?: ReportRepository) {
    this.repo = repo ?? reportRepository;
  }

  async getDashboardOverviewStats() {
    const roomCounts = await this.repo.getRoomStatusCounts();
    const todayStats = await this.repo.getTodayCheckInOutCount();
    const monthlyRev = await this.repo.getMonthlyRevenue();

    // Occupancy Rate: ((occupied + booked) / totalRooms) * 100
    const occupiedOrBooked = roomCounts.occupiedRooms + roomCounts.bookedRooms;
    const occupancyRate =
      roomCounts.totalRooms > 0
        ? Math.round((occupiedOrBooked / roomCounts.totalRooms) * 100)
        : 0;

    return {
      occupancy: {
        totalRooms: roomCounts.totalRooms,
        readyRooms: roomCounts.readyRooms,
        occupiedRooms: roomCounts.occupiedRooms,
        bookedRooms: roomCounts.bookedRooms,
        dirtyRooms: roomCounts.dirtyRooms,
        maintenanceRooms: roomCounts.maintenanceRooms,
        occupancyRate,
        todayCheckIns: todayStats.todayCheckIns,
        todayCheckOuts: todayStats.todayCheckOuts,
      },
      todayRevenue: monthlyRev.grandTotalRevenue,
      monthlyRevenue: monthlyRev.grandTotalRevenue,
      activeGuestsCount: todayStats.activeGuestsCount,
      pendingDpBookingsCount: todayStats.pendingDpBookingsCount,
    };
  }

  async getMonthlyRevenueReport(yearMonth?: string) {
    return this.repo.getMonthlyRevenue(yearMonth);
  }

  async exportReservationsCsv(startDate?: string, endDate?: string) {
    const reservations = await this.repo.getReservationsForExport(
      startDate,
      endDate,
    );

    const headers = [
      "Kode Booking",
      "Nama Tamu",
      "WhatsApp",
      "Nomor Kamar",
      "Tipe Kamar",
      "Check-In",
      "Check-Out",
      "Total Malam",
      "Grand Total (IDR)",
      "DP Terbayar (IDR)",
      "Sisa Tagihan (IDR)",
      "Status Booking",
      "Status Pembayaran",
    ];

    const rows = reservations.map((r) => [
      r.code,
      `"${r.guest.name}"`,
      r.guest.phone,
      r.room.roomNumber,
      r.room.roomType.name,
      new Date(r.checkInDate).toISOString().slice(0, 10),
      new Date(r.checkOutDate).toISOString().slice(0, 10),
      r.totalNights,
      r.grandTotal,
      r.dpAmount,
      r.remainingAmount,
      r.status,
      r.paymentStatus,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  }
}

export const reportService = new ReportService();
