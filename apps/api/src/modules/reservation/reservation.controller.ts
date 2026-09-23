import type { NextFunction, Request, Response } from "express";
import type { ReservationStatus } from "@annisa/types";
import { sendSuccess } from "../../utils/response.util";
import { HTTP_STATUS } from "../../constants";
import {
  reservationService,
  type ReservationService,
} from "./reservation.service";

export class ReservationController {
  private service: ReservationService;

  constructor(service?: ReservationService) {
    this.service = service ?? reservationService;
  }

  getAllReservations = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { status, search, startDate, endDate, page, limit } =
        req.query as {
          status?: ReservationStatus;
          search?: string;
          startDate?: string;
          endDate?: string;
          page?: string;
          limit?: string;
        };

      const result = await this.service.getAllReservations({
        status,
        search,
        startDate,
        endDate,
        page: page ? Number.parseInt(page, 10) : 1,
        limit: limit ? Number.parseInt(limit, 10) : 10,
      });

      return sendSuccess(res, result, "Data reservasi berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  getReservationById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params as { id: string };
      const reservation = await this.service.getReservationById(id);
      return sendSuccess(res, reservation, "Detail reservasi berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  createOnlineBooking = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.service.createOnlineBooking(req.body);
      return sendSuccess(
        res,
        result,
        "Draft reservasi berhasil dibuat. Silakan lanjutkan pembayaran DP 50%.",
        HTTP_STATUS.CREATED,
      );
    } catch (error) {
      return next(error);
    }
  };

  createWalkInBooking = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.user?.id || "";
      const reservation = await this.service.createWalkInBooking(
        userId,
        req.body,
      );
      return sendSuccess(
        res,
        reservation,
        "Check-in tamu walk-in berhasil!",
        HTTP_STATUS.CREATED,
      );
    } catch (error) {
      return next(error);
    }
  };

  confirmDp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const updated = await this.service.confirmDp(id, req.body);
      return sendSuccess(
        res,
        updated,
        "Pembayaran DP 50% berhasil dikonfirmasi. Kamar terkunci!",
      );
    } catch (error) {
      return next(error);
    }
  };

  checkIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const updated = await this.service.checkIn(id, req.body);
      return sendSuccess(
        res,
        updated,
        "Check-in berhasil. Tamu resmi menginap!",
      );
    } catch (error) {
      return next(error);
    }
  };

  checkOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const updated = await this.service.checkOut(id, req.body);
      return sendSuccess(
        res,
        updated,
        "Check-out berhasil. Status kamar beralih ke 'dirty' untuk pembersihan.",
      );
    } catch (error) {
      return next(error);
    }
  };

  getReceipt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const receipt = await this.service.getReceipt(id);
      return sendSuccess(res, receipt, "Kuitansi digital berhasil digenerate.");
    } catch (error) {
      return next(error);
    }
  };
}

export const reservationController = new ReservationController();
