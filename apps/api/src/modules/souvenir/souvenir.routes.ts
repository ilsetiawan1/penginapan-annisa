import { Router } from "express";
import { z } from "zod";
import {
  createSouvenirInputSchema,
  posCheckoutInputSchema,
  updateSouvenirInputSchema,
} from "@annisa/types";
import { validateRequest } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { souvenirController } from "./souvenir.controller";
import "./souvenir.openapi"; // Register docs

const router = Router();

// Public: Catalog and Categories
router.get("/", souvenirController.getAllSouvenirs);
router.get("/categories", souvenirController.getAllCategories);
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

// Protected Owner Only: CRUD Products
router.post(
  "/",
  authMiddleware,
  requireRole("owner"),
  validateRequest({ body: createSouvenirInputSchema }),
  souvenirController.createSouvenir,
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

export const souvenirRouter = router;
