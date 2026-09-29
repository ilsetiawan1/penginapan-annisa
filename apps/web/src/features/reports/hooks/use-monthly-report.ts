import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "../api/reports.api";
import type { MonthReportData } from "../data/monthly-reports.data";

export function useMonthlyReport(selectedMonth: string) {
  return useQuery<MonthReportData>({
    queryKey: ["monthly-report", selectedMonth],
    queryFn: async () => {
      const data = await reportsApi.getMonthlyRevenue({ month: selectedMonth });
      return data;
    },
    staleTime: 1000 * 60 * 2, // 2 menit
  });
}
