"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import type { MonthReportData } from "../data/monthly-reports.data";
import { useMonthlyReport } from "../hooks/use-monthly-report";
import { generateReportPdf } from "../utils/report-pdf-generator";
import { ReportHeaderBanner } from "./report-header-banner";
import { RevenueStatsCards } from "./revenue-stats-cards";
import { TransactionTable } from "./transaction-table";

const MONTH_LABELS: Record<string, string> = {
  "2026-10": "Oktober 2026",
  "2026-09": "September 2026",
  "2026-08": "Agustus 2026",
  "2026-07": "Juli 2026",
};

export function FinancialReports() {
  const [selectedMonth, setSelectedMonth] = useState<string>("2026-10");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: reportData, refetch } = useMonthlyReport(selectedMonth);

  const fallbackLabel = MONTH_LABELS[selectedMonth] ?? selectedMonth;

  const currentReport: MonthReportData = reportData || {
    id: selectedMonth,
    label: fallbackLabel,
    totalOmzet: 0,
    roomRevenue: 0,
    occupancyRate: 0,
    totalGuests: 0,
    souvenirOmzet: 0,
    souvenirItems: 0,
    transactions: [],
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    await queryClient.invalidateQueries({ queryKey: ["monthly-report", selectedMonth] });
    toast.success("Laporan pendapatan & okupansi telah diperbarui dari database!");
    setIsRefreshing(false);
  };

  const handleExportPdf = () => {
    setIsExporting(true);
    try {
      const success = generateReportPdf(currentReport);
      if (success) {
        toast.success(
          `Jendela cetak / ekspor PDF untuk ${currentReport.label} berhasil dibuka! 📄`,
        );
      } else {
        toast.error("Gagal membuka jendela cetak. Pastikan izin pop-up browser aktif.");
      }
    } catch {
      toast.error("Gagal mengekspor laporan PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-6">
      {/* 1. Header Banner, Filter Bulan & Aksi Ekspor PDF */}
      <ReportHeaderBanner
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onExportPdf={handleExportPdf}
        isExporting={isExporting}
      />

      {/* 2. Empat Bento Cards Statistik Keuangan */}
      <RevenueStatsCards
        totalOmzet={currentReport.totalOmzet}
        roomRevenue={currentReport.roomRevenue}
        occupancyRate={currentReport.occupancyRate}
        totalGuests={currentReport.totalGuests}
        souvenirOmzet={currentReport.souvenirOmzet}
        souvenirItems={currentReport.souvenirItems}
        monthLabel={currentReport.label}
      />

      {/* 3. Tabel Riwayat Transaksi */}
      <TransactionTable transactions={currentReport.transactions} />
    </div>
  );
}
