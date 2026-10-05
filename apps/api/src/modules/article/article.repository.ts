import { prisma } from "@annisa/db";

export class ArticleRepository {
  async findAll(filter?: {
    categorySlug?: string;
    isPublished?: boolean;
    search?: string;
    status?: "active" | "trash" | "all";
    trash?: boolean;
  }) {
    // 1. Auto-Pruning: Hapus permanen artikel yang berada di sampah lebih dari 30 hari
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await prisma.article
      .deleteMany({
        where: {
          deletedAt: {
            not: null,
            lt: thirtyDaysAgo,
          },
        },
      })
      .catch(() => {});

    // 2. Filter query
    const where: any = {};

    if (filter?.categorySlug) {
      where.category = { slug: filter.categorySlug };
    }

    if (filter?.isPublished !== undefined) {
      where.isPublished = filter.isPublished;
    }

    if (filter?.search) {
      where.OR = [
        { title: { contains: filter.search, mode: "insensitive" } },
        { summary: { contains: filter.search, mode: "insensitive" } },
      ];
    }

    const isTrash = filter?.status === "trash" || filter?.trash === true;

    if (isTrash) {
      where.deletedAt = { not: null };
    } else if (filter?.status === "all") {
      // Tampilkan semua (baik aktif maupun sampah)
    } else {
      where.deletedAt = null;
    }

    return prisma.article.findMany({
      where,
      orderBy: isTrash ? { deletedAt: "desc" } : { createdAt: "desc" },
      include: {
        category: true,
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async getCounts() {
    const [active, trash] = await Promise.all([
      prisma.article.count({ where: { deletedAt: null } }),
      prisma.article.count({ where: { deletedAt: { not: null } } }),
    ]);
    return { active, trash, total: active + trash };
  }

  async findBySlug(slug: string) {
    return prisma.article.findFirst({
      where: { slug, deletedAt: null },
      include: {
        category: true,
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.article.findUnique({
      where: { id },
      include: {
        category: true,
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async incrementViews(id: string) {
    return prisma.article.update({
      where: { id },
      data: {
        views: { increment: 1 },
      },
    });
  }

  async findAllCategories() {
    return prisma.articleCategory.findMany({
      orderBy: { name: "asc" },
      include: {
        articles: {
          where: { isPublished: true, deletedAt: null },
        },
      },
    });
  }

  async create(data: {
    categoryId: string;
    authorId: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    coverImage?: string;
    isPublished?: boolean;
  }) {
    return prisma.article.create({
      data,
      include: {
        category: true,
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async update(
    id: string,
    data: {
      categoryId?: string;
      title?: string;
      slug?: string;
      summary?: string;
      content?: string;
      coverImage?: string;
      isPublished?: boolean;
    },
  ) {
    return prisma.article.update({
      where: { id },
      data,
      include: {
        category: true,
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async softDelete(id: string) {
    return prisma.article.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return prisma.article.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async forceDelete(id: string) {
    return prisma.article.delete({
      where: { id },
    });
  }

  async delete(id: string) {
    return this.softDelete(id);
  }
}

export const articleRepository = new ArticleRepository();
