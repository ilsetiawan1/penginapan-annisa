import { updateSettingsInputSchema } from "@annisa/types";
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { settingController } from "./setting.controller";
import "./setting.openapi";

const router = Router();

// GET /api/v1/settings -> Publik (digunakan untuk tombol WhatsApp publik & admin)
router.get("/", settingController.getAllSettings);

// PUT /api/v1/settings -> Khusus Owner
router.put(
  "/",
  authMiddleware,
  requireRole("owner"),
  validateRequest({ body: updateSettingsInputSchema }),
  settingController.updateSettings,
);

export const settingRouter = router;
