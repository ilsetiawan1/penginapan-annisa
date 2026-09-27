import { prisma } from "@annisa/db";
import { HTTP_STATUS } from "../../constants";
import { AppError } from "../../middlewares/error.middleware";

export class SouvenirRepository {
  async findAll(filter?: {
    categorySlug?: string;
    isAvailable?: boolean;
    status?: "active" | "trash";
  }) {
    // 1. Auto-Pruning: Hapus permanen produk yang sudah berada di sampah lebih dari 30 hari
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await prisma.souvenir
      .deleteMany({
        where: {
          deletedAt: {
            not: null,
            lt: thirtyDaysAgo,
          },
        },
      })
      .catch(() => {});

    // 2. Filter data
    const where: any = {};
    if (filter?.categorySlug) {
      where.category = { slug: filter.categorySlug };
    }
    if (filter?.isAvailable !== undefined) {
      where.isAvailable = filter.isAvailable;
    }

    if (filter?.status === "trash") {
      where.deletedAt = { not: null, gte: thirtyDaysAgo };
    } else {
      where.deletedAt = null;
    }

    return prisma.souvenir.findMany({
      where,
      orderBy: filter?.status === "trash" ? { deletedAt: "desc" } : { createdAt: "desc" },
      include: {
        category: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.souvenir.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async findAllCategories() {
    return prisma.souvenirCategory.findMany({
      orderBy: { name: "asc" },
      include: {
        items: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async create(data: {
    categoryId: string;
    name: string;
    price: number;
    stock: number;
    description?: string;
    imageUrl?: string;
    isAvailable?: boolean;
  }) {
    return prisma.souvenir.create({
      data,
      include: { category: true },
    });
  }

  async update(
    id: string,
    data: {
      categoryId?: string;
      name?: string;
      price?: number;
      stock?: number;
      description?: string;
      imageUrl?: string;
      isAvailable?: boolean;
    },
  ) {
    return prisma.souvenir.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async softDelete(id: string) {
    return prisma.souvenir.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return prisma.souvenir.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async forceDelete(id: string) {
    return prisma.souvenir.delete({
      where: { id },
    });
  }

  async delete(id: string) {
    return this.softDelete(id);
  }

  async processCheckout(items: { souvenirId: string; quantity: number }[]) {
    return prisma.$transaction(async (tx) => {
      const detailedItems = [];
      let grandTotal = 0;

      for (const item of items) {
        const product = await tx.souvenir.findUnique({
          where: { id: item.souvenirId },
          include: { category: true },
        });

        if (!product || product.deletedAt !== null) {
          throw new AppError(
            `Produk dengan ID ${item.souvenirId} tidak ditemukan atau sudah dihapus.`,
            HTTP_STATUS.NOT_FOUND,
          );
        }

        if (product.stock < item.quantity) {
          throw new AppError(
            `Stok untuk produk '${product.name}' tidak mencukupi (Tersisa: ${product.stock}, Diminta: ${item.quantity}).`,
            HTTP_STATUS.BAD_REQUEST,
          );
        }

        const subtotal = product.price * item.quantity;
        grandTotal += subtotal;

        await tx.souvenir.update({
          where: { id: product.id },
          data: { stock: { decrement: item.quantity } },
        });

        detailedItems.push({
          souvenirId: product.id,
          name: product.name,
          categoryName: product.category.name,
          price: product.price,
          quantity: item.quantity,
          subtotal,
        });
      }

      return { detailedItems, grandTotal };
    });
  }
}

export const souvenirRepository = new SouvenirRepository();
