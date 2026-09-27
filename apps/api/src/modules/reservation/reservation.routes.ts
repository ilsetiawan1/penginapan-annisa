import {
  checkInInputSchema,
  checkOutInputSchema,
  confirmDpInputSchema,
  createAdvanceBookingInputSchema,
  createOnlineBookingInputSchema,
  createWalkInBookingInputSchema,
} from "@annisa/types";
import { Router } from "express";
import { z } from "zod";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { reservationController } from "./reservation.controller";
import "./reservation.openapi"; // Register docs

const router = Router();

// Public: Online Booking Draft from Guest Portal
router.post(
  "/booking",
  validateRequest({ body: createOnlineBookingInputSchema }),
  reservationController.createOnlineBooking,
);

// Protected PMS Staff / Owner Endpoints
router.get("/", authMiddleware, reservationController.getAllReservations);

router.post(
  "/walkin",
  authMiddleware,
  validateRequest({ body: createWalkInBookingInputSchema }),
  reservationController.createWalkInBooking,
);

router.post(
  "/advance",
  authMiddleware,
  validateRequest({ body: createAdvanceBookingInputSchema }),
  reservationController.createAdvanceBooking,
);

router.get(
  "/:id",
  authMiddleware,
  validateRequest({ params: z.object({ id: z.string().uuid() }) }),
  reservationController.getReservationById,
);

router.patch(
  "/:id/confirm-dp",
  authMiddleware,
  validateRequest({
    params: z.object({ id: z.string().uuid() }),
    body: confirmDpInputSchema,
  }),
  reservationController.confirmDp,
);

router.patch(
  "/:id/checkin",
  authMiddleware,
  validateRequest({
    params: z.object({ id: z.string().uuid() }),
    body: checkInInputSchema,
  }),
  reservationController.checkIn,
);

router.patch(
  "/:id/checkout",
  authMiddleware,
  validateRequest({
    params: z.object({ id: z.string().uuid() }),
    body: checkOutInputSchema,
  }),
  reservationController.checkOut,
);

router.get(
  "/:id/receipt",
  authMiddleware,
  validateRequest({ params: z.object({ id: z.string().uuid() }) }),
  reservationController.getReceipt,
);

export const reservationRouter = router;
