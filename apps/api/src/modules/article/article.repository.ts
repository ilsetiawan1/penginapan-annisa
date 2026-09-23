import { prisma } from "@annisa/db";

export class ArticleRepository {
  async findAll(filter?: {
    categorySlug?: string;
    isPublished?: boolean;
    search?: string;
  }) {
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

    return prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        author: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.article.findUnique({
      where: { slug },
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
          where: { isPublished: true },
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

  async delete(id: string) {
    return prisma.article.delete({
      where: { id },
    });
  }
}

export const articleRepository = new ArticleRepository();
