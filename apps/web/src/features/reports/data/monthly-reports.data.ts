import type { TransactionRecord } from "../components/transaction-table";

export interface MonthReportData {
  id: string;
  month?: string;
  label: string;
  totalOmzet: number;
  roomRevenue: number;
  posSouvenirRevenue?: number;
  souvenirOmzet: number;
  souvenirItems: number;
  grandTotalRevenue?: number;
  totalGuests: number;
  totalReservations?: number;
  occupancyRate: number;
  transactions: TransactionRecord[];
}
