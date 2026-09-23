import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { reportController } from "./report.controller";
import "./report.openapi"; // Register docs

const router = Router();

// Staff & Owner: Dashboard daily overview
router.get("/dashboard-stats", authMiddleware, reportController.getDashboardStats);

// Owner Only: Monthly revenue report & CSV Export
router.get(
  "/monthly-revenue",
  authMiddleware,
  requireRole("owner"),
  reportController.getMonthlyRevenue,
);

router.get(
  "/export",
  authMiddleware,
  requireRole("owner"),
  reportController.exportReservationsCsv,
);

export const reportRouter = router;
