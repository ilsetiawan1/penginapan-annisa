"use client";

import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "@/lib/api/reports.api";

export const DASHBOARD_STATS_QUERY_KEY = ["dashboard-stats"] as const;

export function useDashboardStats() {
  return useQuery({
    queryKey: DASHBOARD_STATS_QUERY_KEY,
    queryFn: () => reportsApi.getDashboardStats(),
    refetchInterval: 1000 * 30, // 30s auto-refresh
    staleTime: 1000 * 15,
  });
}
