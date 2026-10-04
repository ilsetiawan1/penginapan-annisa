import { apiClient } from "@/lib/api/client";
import type {
  DashboardOverviewStats,
  ExportReservationsQuery,
  MonthlyRevenueQuery,
  MonthlyRevenueReport,
} from "@annisa/types";

export const reportsApi = {
  getDashboardStats: async (): Promise<DashboardOverviewStats> => {
    return apiClient.get<DashboardOverviewStats>("/reports/dashboard-stats");
  },

  getMonthlyRevenue: async (query?: { month?: string }): Promise<any> => {
    return apiClient.get<any>(
      "/reports/monthly-revenue",
      query as Record<string, string | number | boolean | undefined>,
    );
  },

  exportReservationsCsv: async (query?: {
    startDate?: string;
    endDate?: string;
  }): Promise<Blob> => {
    return apiClient.getBlob(
      "/reports/export",
      query as Record<string, string | number | boolean | undefined>,
    );
  },
};
