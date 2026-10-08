"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { MonthReportData } from "../data/monthly-reports.data";
import { useMonthlyReport } from "../hooks/use-monthly-report";
import { generateReportPdf } from "../utils/report-pdf-generator";
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
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  // Filter transaksi secara reaktif berdasarkan nama tamu pada bulan yang dipilih
  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return currentReport.transactions;
    const q = searchQuery.toLowerCase().trim();
    return currentReport.transactions.filter(
      (t) =>
        t.guest.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.room.toLowerCase().includes(q),
    );
  }, [currentReport.transactions, searchQuery]);

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
      const exportData = searchQuery.trim()
        ? { ...currentReport, transactions: filteredTransactions }
        : currentReport;
      const success = generateReportPdf(exportData);
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
      {/* 1. Header Standar Langsung di Kanvas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Laporan Pendapatan
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Rekapitulasi pendapatan sewa 8 unit kamar transit dan kasir oleh-oleh
          </p>
        </div>
      </div>

      {/* 2. Kartu Statistik Keuangan dengan Toolbar Aksi (Pencarian Nama Tamu, Bulan, PDF, Refresh) */}
      <RevenueStatsCards
        totalOmzet={currentReport.totalOmzet}
        roomRevenue={currentReport.roomRevenue}
        occupancyRate={currentReport.occupancyRate}
        totalGuests={currentReport.totalGuests}
        souvenirOmzet={currentReport.souvenirOmzet}
        souvenirItems={currentReport.souvenirItems}
        monthLabel={currentReport.label}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onExportPdf={handleExportPdf}
        isExporting={isExporting}
      />

      {/* 3. Tabel Riwayat Transaksi (Terfilter Nama Tamu) */}
      <TransactionTable transactions={filteredTransactions} searchQuery={searchQuery} />
    </div>
  );
}
