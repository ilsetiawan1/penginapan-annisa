import { z } from "zod";
import {
  articleSchema,
  articleCategorySchema,
  createArticleInputSchema,
  updateArticleInputSchema,
} from "@annisa/types";
import { registry } from "../../docs/openapi";

// Register Reusable Schemas
registry.register("Article", articleSchema);
registry.register("ArticleCategory", articleCategorySchema);
registry.register("CreateArticleInput", createArticleInputSchema);
registry.register("UpdateArticleInput", updateArticleInputSchema);

// Endpoint 1: GET /api/v1/articles
registry.registerPath({
  method: "get",
  path: "/api/v1/articles",
  summary: "Ambil Daftar Artikel Wisata & Panduan Transit",
  description:
    "Mengambil daftar artikel CMS blog (Tips Transit Bandara Pattimura, Kuliner Khas Ambon, Pantai Natsepa, dsb).",
  tags: ["5. CMS Artikel Wisata"],
  request: {
    query: z.object({
      category: z
        .string()
        .optional()
        .openapi({ example: "tips-transit-bandara" }),
      isPublished: z.enum(["true", "false"]).optional().openapi({ example: "true" }),
      search: z.string().optional().openapi({ example: "Pattimura" }),
    }),
  },
  responses: {
    200: {
      description: "Daftar artikel berhasil diambil",
    },
  },
});

// Endpoint 2: GET /api/v1/articles/categories
registry.registerPath({
  method: "get",
  path: "/api/v1/articles/categories",
  summary: "Ambil Daftar Kategori Artikel",
  description: "Mengambil kategori artikel seperti Tips Transit & Wisata Ambon.",
  tags: ["5. CMS Artikel Wisata"],
  responses: {
    200: {
      description: "Daftar kategori artikel berhasil diambil",
    },
  },
});

// Endpoint 3: GET /api/v1/articles/{slug}
registry.registerPath({
  method: "get",
  path: "/api/v1/articles/{slug}",
  summary: "Baca Isi Lengkap 1 Artikel berdasarkan Slug",
  description:
    "Mengambil konten lengkap artikel Markdown dan otomatis menambah view counter sebanyak +1.",
  tags: ["5. CMS Artikel Wisata"],
  request: {
    params: z.object({
      slug: z.string().openapi({
        example: "panduan-transit-praktis-bandara-pattimura",
      }),
    }),
  },
  responses: {
    200: {
      description: "Isi artikel berhasil diambil",
    },
    404: {
      description: "Artikel tidak ditemukan",
    },
  },
});

// Endpoint 4: POST /api/v1/articles
registry.registerPath({
  method: "post",
  path: "/api/v1/articles",
  summary: "Publikasikan Artikel Baru (Khusus Owner)",
  description: "Menulis dan mempublikasikan artikel panduan wisata baru ke blog portal.",
  tags: ["5. CMS Artikel Wisata"],
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createArticleInputSchema,
          example: {
            categoryId: "550e8400-e29b-41d4-a716-446655440002",
            title: "Pesona Pantai Liang dan Pasir Putih Eksotis Ambon",
            summary: "Keindahan salah satu pantai terindah di Indonesia yang berjarak 40 menit dari Penginapan Annisa.",
            content: "Pantai Liang dinobatkan oleh PBB sebagai salah satu pantai terindah di Indonesia karena gradasi air lautnya yang memukau...",
            coverImage: "https://ik.imagekit.io/penginapanannisa/articles/pantai-liang.webp",
            isPublished: true,
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Artikel berhasil dibuat",
    },
    403: {
      description: "Forbidden",
    },
  },
});

// Endpoint 5: PUT /api/v1/articles/{id}
registry.registerPath({
  method: "put",
  path: "/api/v1/articles/{id}",
  summary: "Edit Konten Artikel (Khusus Owner)",
  description: "Memperbarui judul, ringkasan, isi markdown, atau cover foto artikel.",
  tags: ["5. CMS Artikel Wisata"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: updateArticleInputSchema,
          example: {
            title: "Panduan Transit Praktis 750m dari Bandara Pattimura Ambon (Update 2026)",
            isPublished: true,
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Artikel berhasil diperbarui",
    },
  },
});

// Endpoint 6: DELETE /api/v1/articles/{id}
registry.registerPath({
  method: "delete",
  path: "/api/v1/articles/{id}",
  summary: "Hapus Artikel (Khusus Owner)",
  description: "Menghapus artikel dari database CMS blog.",
  tags: ["5. CMS Artikel Wisata"],
  security: [{ BearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "Artikel berhasil dihapus",
    },
  },
});
