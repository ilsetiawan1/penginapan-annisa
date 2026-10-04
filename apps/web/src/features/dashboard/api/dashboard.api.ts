import { apiClient } from "@/lib/api/client";
import type { DashboardOverviewStats } from "@annisa/types";

export const dashboardApi = {
  getOverviewStats: async (): Promise<DashboardOverviewStats> => {
    return apiClient.get<DashboardOverviewStats>("/reports/dashboard-stats");
  },
};
