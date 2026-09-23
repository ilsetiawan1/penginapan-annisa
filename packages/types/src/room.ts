import { z } from "zod";

// ==========================================
// 2. SKEMA ZOD & TIPE INFER KAMAR (8 UNIT A1-B4)
// ==========================================

export const roomStatusSchema = z.enum([
  "ready",
  "occupied",
  "booked",
  "dirty",
  "maintenance",
]);
export type RoomStatus = z.infer<typeof roomStatusSchema>;

export const buildingBlockSchema = z.enum(["A", "B"]);
export type BuildingBlock = z.infer<typeof buildingBlockSchema>;

export const roomImageSchema = z.object({
  id: z.string().uuid(),
  roomTypeId: z.string().uuid(),
  imageUrl: z.string().url("URL ImageKit tidak valid"),
  caption: z.string().nullable().optional(),
  isPrimary: z.boolean().default(false),
  createdAt: z.union([z.date(), z.string()]),
});
export type RoomImage = z.infer<typeof roomImageSchema>;

export const roomTypeSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().nullable().optional(),
  basePrice: z.number().int().positive("Tarif kamar harus lebih dari 0"),
  capacity: z.number().int().default(3),
  bedType: z.string(),
  facilities: z.array(z.string()),
  images: z.array(roomImageSchema).optional(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
});
export type RoomType = z.infer<typeof roomTypeSchema>;

export const roomSchema = z.object({
  id: z.string().uuid(),
  roomTypeId: z.string().uuid(),
  roomNumber: z.string().min(2), // "A1"..."B4"
  building: buildingBlockSchema,
  status: roomStatusSchema,
  notes: z.string().nullable().optional(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  roomType: roomTypeSchema.optional(),
});
export type Room = z.infer<typeof roomSchema>;

// DTOs Kamar
export const updateRoomStatusInputSchema = z.object({
  status: roomStatusSchema,
  notes: z.string().optional(),
});
export type UpdateRoomStatusInput = z.infer<typeof updateRoomStatusInputSchema>;

export const updateRoomRateInputSchema = z.object({
  basePrice: z.number().int().positive("Tarif harus angka positif"),
  facilities: z.array(z.string()).optional(),
  description: z.string().optional(),
});
export type UpdateRoomRateInput = z.infer<typeof updateRoomRateInputSchema>;

export const roomQuerySchema = z.object({
  building: buildingBlockSchema.optional(),
  status: roomStatusSchema.optional(),
});
export type RoomQuery = z.infer<typeof roomQuerySchema>;

