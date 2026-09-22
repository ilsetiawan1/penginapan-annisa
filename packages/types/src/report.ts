import { z } from "zod";

// ==========================================
// 6. SKEMA ZOD & TIPE INFER METRIK & LAPORAN
// ==========================================

export const occupancyStatsSchema = z.object({
  totalRooms: z.number().int().nonnegative().default(8),
  readyRooms: z.number().int().nonnegative(),
  occupiedRooms: z.number().int().nonnegative(),
  bookedRooms: z.number().int().nonnegative(),
  dirtyRooms: z.number().int().nonnegative(),
  maintenanceRooms: z.number().int().nonnegative(),
  occupancyRate: z.number().nonnegative(), // Persentase % (0 - 100)
  todayCheckIns: z.number().int().nonnegative(),
  todayCheckOuts: z.number().int().nonnegative(),
});
export type OccupancyStats = z.infer<typeof occupancyStatsSchema>;

export const dashboardOverviewStatsSchema = z.object({
  occupancy: occupancyStatsSchema,
  todayRevenue: z.number().int().nonnegative(),
  monthlyRevenue: z.number().int().nonnegative(),
  activeGuestsCount: z.number().int().nonnegative(),
  pendingDpBookingsCount: z.number().int().nonnegative(),
});
export type DashboardOverviewStats = z.infer<typeof dashboardOverviewStatsSchema>;

export const monthlyRevenueReportSchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/, "Format bulan YYYY-MM"),
  totalReservations: z.number().int().nonnegative(),
  roomRevenue: z.number().int().nonnegative(),
  posSouvenirRevenue: z.number().int().nonnegative(),
  grandTotalRevenue: z.number().int().nonnegative(),
});
export type MonthlyRevenueReport = z.infer<typeof monthlyRevenueReportSchema>;
