import { config } from "../../config";
import { AppError } from "../../middlewares/error.middleware";
import { HTTP_STATUS } from "../../constants";
import type {
  CheckInInput,
  CheckOutInput,
  ConfirmDpInput,
  CreateOnlineBookingInput,
  CreateWalkInBookingInput,
  PaymentMethod,
  ReservationQuery,
} from "@annisa/types";
import {
  reservationRepository,
  type ReservationRepository,
} from "./reservation.repository";

export class ReservationService {
  private repo: ReservationRepository;

  constructor(repo?: ReservationRepository) {
    this.repo = repo ?? reservationRepository;
  }

  private calculateNights(checkInStr: string, checkOutStr: string): number {
    const checkIn = new Date(checkInStr);
    const checkOut = new Date(checkOutStr);

    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      throw new AppError(
        "Tanggal Check-out harus setelah tanggal Check-in (minimal 1 malam).",
        HTTP_STATUS.BAD_REQUEST,
      );
    }
    return diffDays;
  }

  async getAllReservations(params: ReservationQuery) {
    return this.repo.findReservations(params);
  }

  async getReservationById(id: string) {
    const reservation = await this.repo.findReservationById(id);
    if (!reservation) {
      throw new AppError("Data reservasi tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }
    return reservation;
  }

  async createOnlineBooking(input: CreateOnlineBookingInput) {
    const checkInDate = new Date(input.checkInDate);
    const checkOutDate = new Date(input.checkOutDate);
    const totalNights = this.calculateNights(input.checkInDate, input.checkOutDate);

    // 1. Anti-Double Booking: Cari kamar yang benar-benar kosong di rentang tanggal ini
    const availableRoom = await this.repo.findAvailableRoomForType(
      input.roomTypeId,
      checkInDate,
      checkOutDate,
    );

    if (!availableRoom) {
      throw new AppError(
        "Maaf, seluruh kamar pada tipe ini sudah penuh untuk tanggal yang dipilih. Silakan pilih tanggal lain atau tipe kamar lainnya.",
        HTTP_STATUS.CONFLICT,
      );
    }

    // 2. Hitung Grand Total & DP 50%
    const roomRatePerNight = availableRoom.roomType.basePrice;
    const grandTotal = roomRatePerNight * totalNights;
    const dpAmount = Math.ceil(grandTotal * 0.5); // DP 50%
    const remainingAmount = grandTotal - dpAmount;

    // 3. Cari atau daftarkan profil Tamu
    const guest = await this.repo.findOrCreateGuest({
      name: input.guestName,
      phone: input.guestPhone,
      email: input.guestEmail,
    });

    // 4. Generate Reservation Code (e.g. ANNISA-202609-001)
    const seq = await this.repo.getNextReservationSequence();
    const yearMonth = new Date().toISOString().slice(0, 7).replace("-", "");
    const code = `ANNISA-${yearMonth}-${String(seq).padStart(3, "0")}`;

    // 5. Simpan Reservasi status pending_dp
    const reservation = await this.repo.createReservation({
      code,
      roomId: availableRoom.id,
      guestId: guest.id,
      checkInDate,
      checkOutDate,
      totalNights,
      roomRatePerNight,
      grandTotal,
      dpAmount,
      remainingAmount,
      status: "pending_dp",
      paymentStatus: "unpaid",
      paymentMethod: "transfer",
      notes: input.notes,
    });

    // 6. Buat format pesan konfirmasi WhatsApp
    const waMessage = `Halo ${guest.name}, terima kasih telah memesan kamar di Penginapan Annisa (750m Bandara Pattimura Ambon).%0A%0A*Detail Booking:*%0AKode: ${code}%0AKamar: ${availableRoom.roomType.name} (${availableRoom.roomNumber})%0ACheck-in: ${input.checkInDate}%0ACheck-out: ${input.checkOutDate} (${totalNights} Malam)%0ATotal: Rp ${grandTotal.toLocaleString("id-ID")}%0A*DP 50%: Rp ${dpAmount.toLocaleString("id-ID")}*%0A%0ASilakan transfer DP ke:%0A${config.bank.name} a/n ${config.bank.holder}%0ARekening: ${config.bank.account}%0A%0ASetelah transfer, mohon kirim bukti transfer ke nomor ini. Terima kasih!`;

    const waLink = `https://wa.me/${config.whatsapp.officialNumber}?text=${waMessage}`;

    return {
      reservation,
      paymentInfo: {
        bankName: config.bank.name,
        bankAccount: config.bank.account,
        bankHolder: config.bank.holder,
        dpRequired: dpAmount,
      },
      whatsAppUrl: waLink,
    };
  }

  async createWalkInBooking(userId: string, input: CreateWalkInBookingInput) {
    const today = new Date();
    const checkInDate = new Date(today.setHours(14, 0, 0, 0));
    const checkOutDate = new Date(
      today.getTime() + input.totalNights * 24 * 60 * 60 * 1000,
    );
    checkOutDate.setHours(12, 0, 0, 0);

    const room = await this.repo.findReservationById(input.roomId);
    const roomRecord = await this.repo.findAvailableRoomForType(
      input.roomId,
      checkInDate,
      checkOutDate,
    );

    // Ambil data kamar
    const targetRoom = await (await import("@annisa/db")).prisma.room.findUnique({
      where: { id: input.roomId },
      include: { roomType: true },
    });

    if (!targetRoom) {
      throw new AppError("Kamar tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    if (targetRoom.status !== "ready") {
      throw new AppError(
        `Kamar ${targetRoom.roomNumber} saat ini berstatus '${targetRoom.status}' dan belum siap untuk check-in.`,
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const roomRatePerNight = targetRoom.roomType.basePrice;
    const grandTotal = roomRatePerNight * input.totalNights;
    const dpAmount = input.isFullPayment
      ? grandTotal
      : input.dpAmount || Math.ceil(grandTotal * 0.5);
    const remainingAmount = grandTotal - dpAmount;

    // 1. Guest
    const guest = await this.repo.findOrCreateGuest({
      name: input.guestName,
      phone: input.guestPhone,
      idCardNumber: input.idCardNumber,
    });

    // 2. Reservation Code
    const seq = await this.repo.getNextReservationSequence();
    const yearMonth = new Date().toISOString().slice(0, 7).replace("-", "");
    const code = `ANNISA-${yearMonth}-${String(seq).padStart(3, "0")}`;

    // 3. Create Reservation
    const reservation = await this.repo.createReservation({
      code,
      roomId: targetRoom.id,
      guestId: guest.id,
      userId,
      checkInDate,
      checkOutDate,
      totalNights: input.totalNights,
      roomRatePerNight,
      grandTotal,
      dpAmount,
      remainingAmount,
      status: "checked_in",
      paymentStatus: remainingAmount === 0 ? "paid" : "dp_paid",
      paymentMethod: input.paymentMethod,
      notes: input.notes,
    });

    // 4. Update room status to occupied
    await this.repo.updateRoomStatusById(
      targetRoom.id,
      "occupied",
      `Tamu Walk-In: ${guest.name} (${code})`,
    );

    return reservation;
  }

  async confirmDp(id: string, input: ConfirmDpInput) {
    const resv = await this.repo.findReservationById(id);
    if (!resv) {
      throw new AppError("Data reservasi tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    if (resv.status !== "pending_dp") {
      throw new AppError(
        `Reservasi saat ini berstatus '${resv.status}'. Hanya status 'pending_dp' yang dapat dikonfirmasi DP.`,
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const remainingAmount = Math.max(0, resv.grandTotal - input.dpAmount);
    const paymentStatus = remainingAmount === 0 ? "paid" : "dp_paid";

    const updated = await this.repo.updateReservation(id, {
      status: "confirmed",
      paymentStatus,
      dpAmount: input.dpAmount,
      remainingAmount,
      paymentMethod: (input.paymentMethod || resv.paymentMethod) as PaymentMethod,
      notes: input.notes || resv.notes || undefined,
    });

    // Kunci kamar menjadi booked
    await this.repo.updateRoomStatusById(
      resv.roomId,
      "booked",
      `Booked oleh ${resv.guest.name} (${resv.code})`,
    );

    return updated;
  }

  async checkIn(id: string, input: CheckInInput) {
    const resv = await this.repo.findReservationById(id);
    if (!resv) {
      throw new AppError("Data reservasi tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    if (resv.status === "checked_in") {
      throw new AppError("Tamu sudah dalam status check-in.", HTTP_STATUS.BAD_REQUEST);
    }

    if (resv.status === "checked_out" || resv.status === "cancelled") {
      throw new AppError(
        `Tidak dapat check-in reservasi dengan status '${resv.status}'.`,
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const updated = await this.repo.updateReservation(id, {
      status: "checked_in",
      paymentStatus: "paid",
      remainingAmount: 0,
      paymentMethod: (input.paymentMethod || resv.paymentMethod) as PaymentMethod,
      notes: input.notes || resv.notes || undefined,
    });

    // Update status kamar ke occupied
    await this.repo.updateRoomStatusById(
      resv.roomId,
      "occupied",
      `Tamu Menginap: ${resv.guest.name} (${resv.code})`,
    );

    return updated;
  }

  async checkOut(id: string, input: CheckOutInput) {
    const resv = await this.repo.findReservationById(id);
    if (!resv) {
      throw new AppError("Data reservasi tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    if (resv.status !== "checked_in") {
      throw new AppError(
        `Hanya reservasi berstatus 'checked_in' yang dapat di-checkout (status saat ini: '${resv.status}').`,
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const updated = await this.repo.updateReservation(id, {
      status: "checked_out",
      notes: input.notes || resv.notes || undefined,
    });

    // Otomatis ubah status kamar ke dirty untuk tim housekeeping
    if (input.markAsDirty !== false) {
      await this.repo.updateRoomStatusById(
        resv.roomId,
        "dirty",
        `Tamu ${resv.guest.name} telah check-out. Perlu pembersihan kamar.`,
      );
    }

    return updated;
  }

  async getReceipt(id: string) {
    const resv = await this.repo.findReservationById(id);
    if (!resv) {
      throw new AppError("Data reservasi tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    return {
      receiptNumber: `REC-${resv.code}`,
      hotelName: "Penginapan Annisa",
      location: "Laha, Teluk Ambon (750m dari Bandara Pattimura)",
      guest: {
        name: resv.guest.name,
        phone: resv.guest.phone,
        email: resv.guest.email,
      },
      room: {
        number: resv.room.roomNumber,
        building: resv.room.building,
        type: resv.room.roomType.name,
      },
      stay: {
        checkInDate: resv.checkInDate,
        checkOutDate: resv.checkOutDate,
        totalNights: resv.totalNights,
        ratePerNight: resv.roomRatePerNight,
      },
      payment: {
        grandTotal: resv.grandTotal,
        dpPaid: resv.dpAmount,
        remaining: resv.remainingAmount,
        status: resv.paymentStatus,
        method: resv.paymentMethod,
      },
      issuedAt: new Date().toISOString(),
    };
  }
}

export const reservationService = new ReservationService();
