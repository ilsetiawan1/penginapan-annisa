import { apiClient } from "./client";
import type {
  DashboardOverviewStats,
  ExportReservationsQuery,
  MonthlyRevenueQuery,
  MonthlyRevenueReport,
} from "@annisa/types";

export const reportsApi = {
  getDashboardStats: async (): Promise<DashboardOverviewStats> => {
    return apiClient.get<DashboardOverviewStats>("/reports/dashboard");
  },

  getMonthlyRevenue: async (
    query?: MonthlyRevenueQuery,
  ): Promise<MonthlyRevenueReport> => {
    return apiClient.get<MonthlyRevenueReport>(
      "/reports/revenue/monthly",
      query as Record<string, string | number | boolean | undefined>,
    );
  },

  exportReservationsCsv: async (
    query?: ExportReservationsQuery,
  ): Promise<Blob> => {
    return apiClient.getBlob(
      "/reports/reservations/export",
      query as Record<string, string | number | boolean | undefined>,
    );
  },
};
