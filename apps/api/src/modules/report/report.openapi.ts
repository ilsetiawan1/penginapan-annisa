import { z } from "zod";
import {
  dashboardOverviewStatsSchema,
  monthlyRevenueReportSchema,
  occupancyStatsSchema,
} from "@annisa/types";
import { registry } from "../../docs/openapi";

// Register Reusable Schemas
registry.register("OccupancyStats", occupancyStatsSchema);
registry.register("DashboardOverviewStats", dashboardOverviewStatsSchema);
registry.register("MonthlyRevenueReport", monthlyRevenueReportSchema);

// Endpoint 1: GET /api/v1/reports/dashboard-stats
registry.registerPath({
  method: "get",
  path: "/api/v1/reports/dashboard-stats",
  summary: "Ringkasan Metrik Okupansi & Dashboard Harian",
  description:
    "Mengambil statistik real-time 8 kamar (Ready, Occupied, Dirty, Maintenance), persentase okupansi %, jumlah check-in & check-out hari ini.",
  tags: ["6. Laporan & Dashboard"],
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "Statistik dashboard berhasil diambil",
    },
    401: {
      description: "Unauthorized",
    },
  },
});

// Endpoint 2: GET /api/v1/reports/monthly-revenue
registry.registerPath({
  method: "get",
  path: "/api/v1/reports/monthly-revenue",
  summary: "Rekapitulasi Omzet Bulanan (Khusus Owner)",
  description:
    "Menghitung total pendapatan sewa kamar dan kasir oleh-oleh per bulan kalender.",
  tags: ["6. Laporan & Dashboard"],
  security: [{ BearerAuth: [] }],
  request: {
    query: z.object({
      month: z.string().optional().openapi({ example: "2026-09" }),
    }),
  },
  responses: {
    200: {
      description: "Laporan omzet berhasil diambil",
    },
    403: {
      description: "Forbidden — Khusus Owner",
    },
  },
});

// Endpoint 3: GET /api/v1/reports/export
registry.registerPath({
  method: "get",
  path: "/api/v1/reports/export",
  summary: "Ekspor Rekapitulasi Reservasi ke File CSV (Khusus Owner)",
  description:
    "Mengunduh file format .CSV data tamu, kode booking, durasi malam, dan status pembayaran untuk pelaporan pembukuan.",
  tags: ["6. Laporan & Dashboard"],
  security: [{ BearerAuth: [] }],
  request: {
    query: z.object({
      startDate: z.string().optional().openapi({ example: "2026-09-01" }),
      endDate: z.string().optional().openapi({ example: "2026-09-30" }),
    }),
  },
  responses: {
    200: {
      description: "File CSV berhasil diunduh",
    },
  },
});
