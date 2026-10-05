import {
  createSouvenirInputSchema,
  posCheckoutInputSchema,
  updateSouvenirInputSchema,
} from "@annisa/types";
import { Router } from "express";
import { z } from "zod";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { souvenirController } from "./souvenir.controller";
import "./souvenir.openapi"; // Register docs

const router = Router();

// Public: Catalog, Categories, and Counts
router.get("/counts", souvenirController.getCounts);
router.get("/categories", souvenirController.getAllCategories);
router.get("/", souvenirController.getAllSouvenirs);
router.get(
  "/:id",
  validateRequest({ params: z.object({ id: z.string().uuid() }) }),
  souvenirController.getSouvenirById,
);

// Protected Staff & Owner: POS Checkout
router.post(
  "/pos/checkout",
  authMiddleware,
  validateRequest({ body: posCheckoutInputSchema }),
  souvenirController.processPosCheckout,
);

// Protected Owner Only: CRUD Products & Soft Delete / Restore
router.post(
  "/",
  authMiddleware,
  requireRole("owner"),
  validateRequest({ body: createSouvenirInputSchema }),
  souvenirController.createSouvenir,
);

router.post(
  "/:id/restore",
  authMiddleware,
  requireRole("owner"),
  validateRequest({ params: z.object({ id: z.string().uuid() }) }),
  souvenirController.restoreSouvenir,
);

router.delete(
  "/:id/force",
  authMiddleware,
  requireRole("owner"),
  validateRequest({ params: z.object({ id: z.string().uuid() }) }),
  souvenirController.forceDeleteSouvenir,
);

router.put(
  "/:id",
  authMiddleware,
  requireRole("owner"),
  validateRequest({
    params: z.object({ id: z.string().uuid() }),
    body: updateSouvenirInputSchema,
  }),
  souvenirController.updateSouvenir,
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("owner"),
  validateRequest({ params: z.object({ id: z.string().uuid() }) }),
  souvenirController.deleteSouvenir,
);

export const souvenirRoutes = router;
export const souvenirRouter = router;
