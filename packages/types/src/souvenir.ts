import { z } from "zod";
import { paymentMethodSchema } from "./reservation";

// ==========================================
// 4. SKEMA ZOD & TIPE INFER OLEH-OLEH (KASIR POS)
// ==========================================

export const souvenirCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  slug: z.string().min(2),
  createdAt: z.union([z.date(), z.string()]),
});
export type SouvenirCategory = z.infer<typeof souvenirCategorySchema>;

export const souvenirSchema = z.object({
  id: z.string().uuid(),
  categoryId: z.string().uuid(),
  name: z.string().min(2, "Nama produk minimal 2 karakter"),
  price: z.number().int().positive("Harga jual harus angka positif"),
  stock: z.number().int().nonnegative("Stok tidak boleh negatif").default(0),
  description: z.string().nullable().optional(),
  imageUrl: z.string().url("URL gambar tidak valid").nullable().optional(),
  isAvailable: z.boolean().default(true),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  category: souvenirCategorySchema.optional(),
});
export type Souvenir = z.infer<typeof souvenirSchema>;

// DTOs Oleh-oleh & Kasir POS
export const createSouvenirInputSchema = z.object({
  categoryId: z.string().uuid("Pilih kategori yang valid"),
  name: z.string().min(2, "Nama produk wajib diisi"),
  price: z.number().int().positive("Harga wajib diisi"),
  stock: z.number().int().nonnegative().default(10),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  isAvailable: z.boolean().default(true),
});
export type CreateSouvenirInput = z.infer<typeof createSouvenirInputSchema>;

export const updateSouvenirInputSchema = z.object({
  categoryId: z.string().uuid().optional(),
  name: z.string().min(2).optional(),
  price: z.number().int().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  isAvailable: z.boolean().optional(),
});
export type UpdateSouvenirInput = z.infer<typeof updateSouvenirInputSchema>;

export const posCartItemSchema = z.object({
  souvenirId: z.string().uuid(),
  name: z.string(),
  price: z.number().int().positive(),
  quantity: z.number().int().positive(),
  subtotal: z.number().int().nonnegative(),
});
export type PosCartItem = z.infer<typeof posCartItemSchema>;

export const posCheckoutInputSchema = z.object({
  items: z
    .array(
      z.object({
        souvenirId: z.string().uuid(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "Keranjang belanja tidak boleh kosong"),
  paymentMethod: paymentMethodSchema,
  guestId: z.string().uuid().optional(),
  cashReceived: z.number().int().nonnegative().optional(),
});
export type PosCheckoutInput = z.infer<typeof posCheckoutInputSchema>;
