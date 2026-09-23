import { describe, expect, it } from "bun:test";
import { ReportService } from "../report.service";

describe("📊 Report Module Service Tests", () => {
  const reportService = new ReportService();

  it("should calculate dashboard overview stats correctly", async () => {
    const stats = await reportService.getDashboardOverviewStats();

    expect(stats).toBeDefined();
    expect(stats.occupancy).toBeDefined();
    expect(stats.occupancy.totalRooms).toBe(8);
    expect(stats.occupancy.occupancyRate).toBeGreaterThanOrEqual(0);
    expect(stats.occupancy.occupancyRate).toBeLessThanOrEqual(100);
  });

  it("should aggregate monthly revenue report", async () => {
    const report = await reportService.getMonthlyRevenueReport();

    expect(report).toBeDefined();
    expect(report.month).toMatch(/^\d{4}-\d{2}$/);
    expect(report.grandTotalRevenue).toBeGreaterThanOrEqual(0);
  });

  it("should export reservations to CSV string with headers", async () => {
    const csv = await reportService.exportReservationsCsv();

    expect(typeof csv).toBe("string");
    expect(csv).toContain("Kode Booking");
    expect(csv).toContain("Nama Tamu");
    expect(csv).toContain("Nomor Kamar");
  });
});
