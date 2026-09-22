import { Router } from "express";
import { z } from "zod";
import {
  updateRoomRateInputSchema,
  updateRoomStatusInputSchema,
} from "@annisa/types";
import { validateRequest } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { roomController } from "./room.controller";
import "./room.openapi"; // Register docs

const router = Router();

// Public / PMS: Get all rooms (with optional filters)
router.get("/", roomController.getAllRooms);

// Public: Get all room types & rates
router.get("/types", roomController.getAllRoomTypes);

// Public / PMS: Get single room type by id
router.get("/types/:id", roomController.getRoomTypeById);

// PMS Owner only: Update room rate / facilities
router.put(
  "/types/:id",
  authMiddleware,
  requireRole("owner"),
  validateRequest({
    params: z.object({ id: z.string().uuid() }),
    body: updateRoomRateInputSchema,
  }),
  roomController.updateRoomRate,
);

// PMS: Get single room by roomNumber
router.get("/:roomNumber", roomController.getRoomByNumber);

// PMS Staff / Owner: Update room status (Housekeeping / Matriks)
router.patch(
  "/:roomNumber/status",
  authMiddleware,
  validateRequest({
    params: z.object({ roomNumber: z.string().min(2) }),
    body: updateRoomStatusInputSchema,
  }),
  roomController.updateRoomStatus,
);

export const roomRouter = router;
