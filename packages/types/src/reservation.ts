import { z } from "zod";
import { roomSchema } from "./room";
import { userSchema } from "./user";

// ==========================================
// 3. SKEMA ZOD & TIPE INFER RESERVASI (PMS)
// ==========================================

export const reservationStatusSchema = z.enum([
  "pending_dp",
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
]);
export type ReservationStatus = z.infer<typeof reservationStatusSchema>;

export const paymentStatusSchema = z.enum(["unpaid", "dp_paid", "paid"]);
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;

export const paymentMethodSchema = z.enum(["cash", "transfer", "qris"]);
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

export const guestSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Nama tamu minimal 2 karakter"),
  phone: z.string().min(8, "Nomor WhatsApp tidak valid"),
  email: z.string().email().nullable().optional(),
  idCardNumber: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
});
export type Guest = z.infer<typeof guestSchema>;

export const reservationSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(5), // e.g. "ANNISA-202608-001"
  roomId: z.string().uuid(),
  guestId: z.string().uuid(),
  userId: z.string().uuid().nullable().optional(),
  checkInDate: z.union([z.date(), z.string()]),
  checkOutDate: z.union([z.date(), z.string()]),
  totalNights: z.number().int().positive().default(1),
  roomRatePerNight: z.number().int().nonnegative(),
  grandTotal: z.number().int().nonnegative(),
  dpAmount: z.number().int().nonnegative().default(0),
  remainingAmount: z.number().int().nonnegative().default(0),
  status: reservationStatusSchema,
  paymentStatus: paymentStatusSchema,
  paymentMethod: paymentMethodSchema,
  notes: z.string().nullable().optional(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  room: roomSchema.optional(),
  guest: guestSchema.optional(),
  user: userSchema.nullable().optional(),
});
export type Reservation = z.infer<typeof reservationSchema>;

// DTOs Reservasi
export const createOnlineBookingInputSchema = z.object({
  roomTypeId: z.string().uuid("Pilih tipe kamar yang valid"),
  guestName: z.string().min(2, "Nama wajib diisi"),
  guestPhone: z.string().min(8, "Nomor WhatsApp wajib diisi"),
  guestEmail: z.string().email("Format email salah").optional(),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal YYYY-MM-DD"),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal YYYY-MM-DD"),
  notes: z.string().optional(),
});
export type CreateOnlineBookingInput = z.infer<typeof createOnlineBookingInputSchema>;

export const createWalkInBookingInputSchema = z.object({
  roomId: z.string().uuid("Pilih kamar yang valid"),
  guestName: z.string().min(2, "Nama tamu wajib diisi"),
  guestPhone: z.string().min(8, "Nomor WhatsApp wajib diisi"),
  idCardNumber: z.string().optional(),
  totalNights: z.number().int().positive("Durasi minimal 1 malam").default(1),
  paymentMethod: paymentMethodSchema.default("cash"),
  dpAmount: z.number().int().nonnegative().optional(),
  isFullPayment: z.boolean().default(true),
  notes: z.string().optional(),
});
export type CreateWalkInBookingInput = z.infer<typeof createWalkInBookingInputSchema>;

export const confirmDpInputSchema = z.object({
  dpAmount: z.number().int().positive("Nominal DP harus lebih dari 0"),
  paymentMethod: paymentMethodSchema.optional(),
  notes: z.string().optional(),
});
export type ConfirmDpInput = z.infer<typeof confirmDpInputSchema>;

export const checkInInputSchema = z.object({
  paymentMethod: paymentMethodSchema.optional(),
  paidAmount: z.number().int().nonnegative().optional(),
  notes: z.string().optional(),
});
export type CheckInInput = z.infer<typeof checkInInputSchema>;

export const checkOutInputSchema = z.object({
  notes: z.string().optional(),
  markAsDirty: z.boolean().default(true),
});
export type CheckOutInput = z.infer<typeof checkOutInputSchema>;
