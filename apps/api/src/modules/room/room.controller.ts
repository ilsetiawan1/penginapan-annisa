import type { NextFunction, Request, Response } from "express";
import type { BuildingBlock, RoomStatus } from "@annisa/types";
import { sendSuccess } from "../../utils/response.util";
import { roomService, type RoomService } from "./room.service";

export class RoomController {
  private service: RoomService;

  constructor(service?: RoomService) {
    this.service = service ?? roomService;
  }

  getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { building, status } = req.query as {
        building?: BuildingBlock;
        status?: RoomStatus;
      };
      const rooms = await this.service.getAllRooms({ building, status });
      return sendSuccess(res, rooms, "Daftar kamar berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  getRoomByNumber = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { roomNumber } = req.params as { roomNumber: string };
      const room = await this.service.getRoomByNumber(roomNumber);
      return sendSuccess(res, room, `Data kamar ${roomNumber} berhasil diambil.`);
    } catch (error) {
      return next(error);
    }
  };

  updateRoomStatus = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { roomNumber } = req.params as { roomNumber: string };
      const updated = await this.service.updateRoomStatus(
        roomNumber,
        req.body,
      );
      return sendSuccess(
        res,
        updated,
        `Status kamar ${roomNumber} berhasil diubah menjadi ${req.body.status}.`,
      );
    } catch (error) {
      return next(error);
    }
  };

  getAllRoomTypes = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const types = await this.service.getAllRoomTypes();
      return sendSuccess(res, types, "Daftar tipe kamar berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  getRoomTypeById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params as { id: string };
      const type = await this.service.getRoomTypeById(id);
      return sendSuccess(res, type, "Data tipe kamar berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  updateRoomRate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const updated = await this.service.updateRoomRate(id, req.body);
      return sendSuccess(
        res,
        updated,
        "Tarif dan fasilitas tipe kamar berhasil diperbarui.",
      );
    } catch (error) {
      return next(error);
    }
  };

  updateRoomImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roomNumber } = req.params as { roomNumber: string };
      const { imageUrl } = req.body;
      const updated = await this.service.updateRoomImage(roomNumber, imageUrl);
      return sendSuccess(
        res,
        updated,
        `Foto kamar #${roomNumber} berhasil diperbarui di database.`,
      );
    } catch (error) {
      return next(error);
    }
  };
}

export const roomController = new RoomController();

