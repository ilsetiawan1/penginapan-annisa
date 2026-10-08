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
const onlineBookingMiddlewares = [
  validateRequest({ body: createOnlineBookingInputSchema }),
  reservationController.createOnlineBooking,
];
router.post("/booking", ...onlineBookingMiddlewares);
router.post("/online", ...onlineBookingMiddlewares);

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

const confirmDpMiddlewares = [
  authMiddleware,
  validateRequest({
    params: z.object({ id: z.string().uuid() }),
    body: confirmDpInputSchema,
  }),
  reservationController.confirmDp,
];
router.patch("/:id/confirm-dp", ...confirmDpMiddlewares);
router.post("/:id/confirm-dp", ...confirmDpMiddlewares);

const checkInMiddlewares = [
  authMiddleware,
  validateRequest({
    params: z.object({ id: z.string().uuid() }),
    body: checkInInputSchema,
  }),
  reservationController.checkIn,
];
router.patch("/:id/checkin", ...checkInMiddlewares);
router.patch("/:id/check-in", ...checkInMiddlewares);
router.post("/:id/checkin", ...checkInMiddlewares);
router.post("/:id/check-in", ...checkInMiddlewares);

const checkOutMiddlewares = [
  authMiddleware,
  validateRequest({
    params: z.object({ id: z.string().uuid() }),
    body: checkOutInputSchema,
  }),
  reservationController.checkOut,
];
router.patch("/:id/checkout", ...checkOutMiddlewares);
router.patch("/:id/check-out", ...checkOutMiddlewares);
router.post("/:id/checkout", ...checkOutMiddlewares);
router.post("/:id/check-out", ...checkOutMiddlewares);

router.get(
  "/:id/receipt",
  authMiddleware,
  validateRequest({ params: z.object({ id: z.string().uuid() }) }),
  reservationController.getReceipt,
);

export const reservationRouter = router;
