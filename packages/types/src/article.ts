import { z } from "zod";
import { userSchema } from "./user";

// ==========================================
// 5. SKEMA ZOD & TIPE INFER CMS ARTIKEL WISATA
// ==========================================

export const articleCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  slug: z.string().min(2),
  createdAt: z.union([z.date(), z.string()]),
});
export type ArticleCategory = z.infer<typeof articleCategorySchema>;

export const articleSchema = z.object({
  id: z.string().uuid(),
  categoryId: z.string().uuid(),
  authorId: z.string().uuid(),
  title: z.string().min(5, "Judul artikel minimal 5 karakter"),
  slug: z.string().min(3),
  summary: z.string().min(10, "Ringkasan minimal 10 karakter"),
  content: z.string().min(20, "Konten artikel minimal 20 karakter"),
  coverImage: z.string().url("URL gambar tidak valid").nullable().optional(),
  isPublished: z.boolean().default(true),
  views: z.number().int().nonnegative().default(0),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  category: articleCategorySchema.optional(),
  author: userSchema.optional(),
});
export type Article = z.infer<typeof articleSchema>;

// DTOs Artikel
export const createArticleInputSchema = z.object({
  categoryId: z.string().uuid("Pilih kategori yang valid"),
  title: z.string().min(5, "Judul artikel wajib diisi"),
  summary: z.string().min(10, "Ringkasan wajib diisi"),
  content: z.string().min(20, "Konten wajib diisi"),
  coverImage: z.string().url("URL cover image tidak valid").optional(),
  isPublished: z.boolean().default(true),
});
export type CreateArticleInput = z.infer<typeof createArticleInputSchema>;

export const updateArticleInputSchema = z.object({
  categoryId: z.string().uuid().optional(),
  title: z.string().min(5).optional(),
  summary: z.string().min(10).optional(),
  content: z.string().min(20).optional(),
  coverImage: z.string().url().optional(),
  isPublished: z.boolean().optional(),
});
export type UpdateArticleInput = z.infer<typeof updateArticleInputSchema>;
