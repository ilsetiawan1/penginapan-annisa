import { prisma } from "@annisa/db";
import { AppError } from "../../middlewares/error.middleware";
import { HTTP_STATUS } from "../../constants";

export class SouvenirRepository {
  async findAll(filter?: { categorySlug?: string; isAvailable?: boolean }) {
    const where: any = {};
    if (filter?.categorySlug) {
      where.category = { slug: filter.categorySlug };
    }
    if (filter?.isAvailable !== undefined) {
      where.isAvailable = filter.isAvailable;
    }

    return prisma.souvenir.findMany({
      where,
      orderBy: { createdAt: "desc" },
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
        souvenirs: true,
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

  async delete(id: string) {
    return prisma.souvenir.delete({
      where: { id },
    });
  }

  async processCheckout(
    items: { souvenirId: string; quantity: number }[],
  ) {
    return prisma.$transaction(async (tx) => {
      const detailedItems = [];
      let grandTotal = 0;

      for (const item of items) {
        const product = await tx.souvenir.findUnique({
          where: { id: item.souvenirId },
          include: { category: true },
        });

        if (!product) {
          throw new AppError(
            `Produk dengan ID ${item.souvenirId} tidak ditemukan.`,
            HTTP_STATUS.NOT_FOUND,
          );
        }

        if (product.stock < item.quantity) {
          throw new AppError(
            `Stok untuk '${product.name}' tidak mencukupi (Tersedia: ${product.stock}, Diminta: ${item.quantity}).`,
            HTTP_STATUS.BAD_REQUEST,
          );
        }

        // Potong stok produk
        const updated = await tx.souvenir.update({
          where: { id: product.id },
          data: {
            stock: product.stock - item.quantity,
          },
        });

        const subtotal = product.price * item.quantity;
        grandTotal += subtotal;

        detailedItems.push({
          souvenirId: product.id,
          name: product.name,
          category: product.category.name,
          price: product.price,
          quantity: item.quantity,
          subtotal,
          remainingStock: updated.stock,
        });
      }

      return {
        detailedItems,
        grandTotal,
      };
    });
  }
}

export const souvenirRepository = new SouvenirRepository();
