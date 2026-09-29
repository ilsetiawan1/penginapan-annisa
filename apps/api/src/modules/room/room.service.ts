import { prisma } from "@annisa/db";
import type { RoomStatus, UpdateRoomRateInput, UpdateRoomStatusInput } from "@annisa/types";
import { HTTP_STATUS } from "../../constants";
import { AppError } from "../../middlewares/error.middleware";
import { type RoomRepository, roomRepository } from "./room.repository";

export class RoomService {
  private repo: RoomRepository;

  constructor(repo?: RoomRepository) {
    this.repo = repo ?? roomRepository;
  }

  private parseFacilities(roomType: any) {
    if (!roomType) return roomType;
    let facilities = roomType.facilities;
    if (typeof facilities === "string") {
      try {
        facilities = JSON.parse(facilities);
      } catch {
        facilities = [];
      }
    }
    return {
      ...roomType,
      facilities: Array.isArray(facilities) ? facilities : [],
    };
  }

  private computeRoomAvailabilityAndStatus(
    room: any,
    targetInStr?: string,
    targetOutStr?: string,
  ) {
    const todayWitStr = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jayapura",
    }).format(new Date());

    const queryInStr = targetInStr || todayWitStr;
    let queryOutStr = targetOutStr;
    if (!queryOutStr) {
      const [y, m, d] = queryInStr.split("-").map(Number);
      const nextDay = new Date(y, m - 1, d + 1);
      queryOutStr = `${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, "0")}-${String(nextDay.getDate()).padStart(2, "0")}`;
    }

    const activeResvs = room.reservations || [];

    // 1. Cek reservasi aktif untuk HARI INI (untuk status operasional real-time PMS)
    const todayResv = activeResvs.find((res: any) => {
      const resIn = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jayapura" }).format(
        new Date(res.checkInDate),
      );
      const resOut = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jayapura" }).format(
        new Date(res.checkOutDate),
      );
      if (res.status === "checked_in") {
        return todayWitStr >= resIn;
      }
      return todayWitStr >= resIn && todayWitStr < resOut;
    });

    // 2. Cek reservasi yang bentrok dengan rentang tanggal yang diminta [queryInStr, queryOutStr)
    const conflictingResv = activeResvs.find((res: any) => {
      const resIn = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jayapura" }).format(
        new Date(res.checkInDate),
      );
      const resOut = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jayapura" }).format(
        new Date(res.checkOutDate),
      );
      // Kondisi overlap jadwal: resIn < queryOut && resOut > queryIn
      return resIn < queryOutStr && resOut > queryInStr;
    });

    // Tentukan status operasional hari ini
    let effectiveStatus = room.status;
    let guestInfo: any = {};

    if (room.status !== "maintenance" && room.status !== "dirty") {
      if (todayResv) {
        const todayResvInStr = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Jayapura",
        }).format(new Date(todayResv.checkInDate));
        const isPastCheckInDate = todayWitStr > todayResvInStr;
        const isFullyPaid = todayResv.paymentStatus === "paid" || todayResv.remainingAmount === 0;

        if (todayResv.status === "checked_in" || isFullyPaid || isPastCheckInDate) {
          effectiveStatus = "occupied";
        } else {
          effectiveStatus = "booked";
        }
        guestInfo = {
          guestName: todayResv.guest?.name,
          guestPhone: todayResv.guest?.phone,
          checkInDate: todayResv.checkInDate,
          checkOutDate: todayResv.checkOutDate,
          totalNights: todayResv.totalNights,
          totalAmount: todayResv.grandTotal,
          dpPaid: todayResv.dpAmount,
          remainingAmount: todayResv.remainingAmount,
          paymentStatus: todayResv.paymentStatus,
          reservationCode: todayResv.code,
          reservationId: todayResv.id,
          notes: todayResv.notes,
        };

        // Sinkronkan status kamar di DB jika berbeda
        if (room.status !== effectiveStatus) {
          prisma.room
            .update({
              where: { id: room.id },
              data: { status: effectiveStatus },
            })
            .catch(() => {});
        }
      } else {
        // Tidak ada reservasi aktif hari ini.
        // Cek apakah ada reservasi confirmed yang sudah MELEWATI tanggal checkout (tamu no-show / tidak datang)
        const expiredResv = activeResvs.find((res: any) => {
          const resOut = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jayapura" }).format(
            new Date(res.checkOutDate),
          );
          // Reservasi confirmed (belum check-in) yang checkout date-nya sudah lewat hari ini
          return res.status === "confirmed" && resOut <= todayWitStr;
        });

        if (expiredResv) {
          // Reservasi WA yang tanggalnya sudah lewat: auto-release kamar & cancel reservasi
          effectiveStatus = "ready";
          prisma.room
            .update({ where: { id: room.id }, data: { status: "ready" } })
            .catch(() => {});
          prisma.reservation
            .update({ where: { id: expiredResv.id }, data: { status: "cancelled" } })
            .catch(() => {});
        } else if (room.status === "booked" || room.status === "occupied") {
          // Tidak ada reservasi aktif hari ini, kembalikan ke ready di DB
          effectiveStatus = "ready";
          prisma.room
            .update({
              where: { id: room.id },
              data: { status: "ready" },
            })
            .catch(() => {});
        }
      }
    } else if (todayResv) {
      guestInfo = {
        guestName: todayResv.guest?.name,
        guestPhone: todayResv.guest?.phone,
        checkInDate: todayResv.checkInDate,
        checkOutDate: todayResv.checkOutDate,
        totalNights: todayResv.totalNights,
        totalAmount: todayResv.grandTotal,
        dpPaid: todayResv.dpAmount,
        remainingAmount: todayResv.remainingAmount,
        paymentStatus: todayResv.paymentStatus,
        reservationCode: todayResv.code,
        reservationId: todayResv.id,
        notes: todayResv.notes,
      };
    }

    const isTargetToday = queryInStr === todayWitStr;
    const isAvailable =
      room.status !== "maintenance" &&
      (!isTargetToday || room.status !== "dirty") &&
      !conflictingResv;

    const roomImage =
      room.roomType?.images?.find(
        (img: any) => img.caption?.toUpperCase() === room.roomNumber.toUpperCase(),
      )?.imageUrl || "";

    return {
      id: room.id,
      roomTypeId: room.roomTypeId,
      roomNumber: room.roomNumber,
      building: room.building,
      status: effectiveStatus,
      notes: room.notes,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
      imageUrl: roomImage,
      roomType: room.roomType ? this.parseFacilities(room.roomType) : null,
      isAvailable,
      hasConflict: Boolean(conflictingResv),
      conflictReservation: conflictingResv
        ? {
            code: conflictingResv.code,
            guestName: conflictingResv.guest?.name,
            checkInDate: conflictingResv.checkInDate,
            checkOutDate: conflictingResv.checkOutDate,
          }
        : null,
      ...guestInfo,
    };
  }

  async getAllRooms(filter?: {
    building?: string;
    status?: string;
    checkInDate?: string;
    checkOutDate?: string;
  }) {
    const rooms = await this.repo.findAllRooms(filter);
    return rooms.map((room) =>
      this.computeRoomAvailabilityAndStatus(room, filter?.checkInDate, filter?.checkOutDate),
    );
  }

  async getRoomByNumber(
    roomNumber: string,
    queryDates?: { checkInDate?: string; checkOutDate?: string },
  ) {
    const room = await this.repo.findByRoomNumber(roomNumber);
    if (!room) {
      throw new AppError(
        `Kamar dengan nomor ${roomNumber} tidak ditemukan.`,
        HTTP_STATUS.NOT_FOUND,
      );
    }
    return this.computeRoomAvailabilityAndStatus(
      room,
      queryDates?.checkInDate,
      queryDates?.checkOutDate,
    );
  }

  async updateRoomImage(roomNumber: string, imageUrl: string) {
    const room = await this.repo.findByRoomNumber(roomNumber);
    if (!room) {
      throw new AppError(`Kamar ${roomNumber} tidak ditemukan.`, HTTP_STATUS.NOT_FOUND);
    }

    // Hapus foto lama untuk kamar ini di RoomImage
    await prisma.roomImage.deleteMany({
      where: {
        roomTypeId: room.roomTypeId,
        caption: roomNumber.toUpperCase(),
      },
    });

    const cleanUrl = imageUrl?.trim() || "";
    // Simpan foto baru jika valid (bukan dummy dan bukan string kosong)
    if (cleanUrl && !cleanUrl.includes("/rooms/room-") && !cleanUrl.startsWith("/images/")) {
      await prisma.roomImage.create({
        data: {
          roomTypeId: room.roomTypeId,
          caption: roomNumber.toUpperCase(),
          imageUrl: cleanUrl,
          isPrimary: false,
        },
      });
    }

    return this.getRoomByNumber(roomNumber);
  }

  async updateRoomStatus(roomNumber: string, input: UpdateRoomStatusInput) {
    const existing = await this.repo.findByRoomNumber(roomNumber);
    if (!existing) {
      throw new AppError(`Kamar ${roomNumber} tidak ditemukan.`, HTTP_STATUS.NOT_FOUND);
    }

    const updated = await this.repo.updateRoomStatus(
      roomNumber,
      input.status as RoomStatus,
      input.notes,
    );

    return {
      ...updated,
      roomType: updated.roomType ? this.parseFacilities(updated.roomType) : null,
    };
  }

  async getAllRoomTypes() {
    const types = await this.repo.findAllRoomTypes();
    return types.map((t) => this.parseFacilities(t));
  }

  async getRoomTypeById(id: string) {
    const roomType = await this.repo.findRoomTypeById(id);
    if (!roomType) {
      throw new AppError("Tipe kamar tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }
    return this.parseFacilities(roomType);
  }

  async updateRoomRate(id: string, input: UpdateRoomRateInput) {
    const existing = await this.repo.findRoomTypeById(id);
    if (!existing) {
      throw new AppError("Tipe kamar tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    const updated = await this.repo.updateRoomType(id, input);
    return this.parseFacilities(updated);
  }
}

export const roomService = new RoomService();
