import type { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../utils/response.util";
import { reportService, type ReportService } from "./report.service";

export class ReportController {
  private service: ReportService;

  constructor(service?: ReportService) {
    this.service = service ?? reportService;
  }

  getDashboardStats = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const stats = await this.service.getDashboardOverviewStats();
      return sendSuccess(res, stats, "Statistik dashboard berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  getMonthlyRevenue = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { month } = req.query as { month?: string };
      const report = await this.service.getMonthlyRevenueReport(month);
      return sendSuccess(res, report, "Laporan omzet bulanan berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  exportReservationsCsv = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { startDate, endDate } = req.query as {
        startDate?: string;
        endDate?: string;
      };

      const csv = await this.service.exportReservationsCsv(startDate, endDate);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=reservasi-penginapan-annisa-${Date.now()}.csv`,
      );
      return res.status(200).send(csv);
    } catch (error) {
      return next(error);
    }
  };
}

export const reportController = new ReportController();
