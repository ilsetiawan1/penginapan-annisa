import { AppError } from "../../middlewares/error.middleware";
import { HTTP_STATUS } from "../../constants";
import type { CreateArticleInput, UpdateArticleInput } from "@annisa/types";
import {
  articleRepository,
  type ArticleRepository,
} from "./article.repository";

export class ArticleService {
  private repo: ArticleRepository;

  constructor(repo?: ArticleRepository) {
    this.repo = repo ?? articleRepository;
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async getAllArticles(filter?: {
    categorySlug?: string;
    isPublished?: boolean;
    search?: string;
  }) {
    return this.repo.findAll(filter);
  }

  async getArticleBySlug(slug: string) {
    const article = await this.repo.findBySlug(slug);
    if (!article) {
      throw new AppError("Artikel tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    // Auto increment view counter in background
    this.repo.incrementViews(article.id).catch(() => {});

    return article;
  }

  async getAllCategories() {
    return this.repo.findAllCategories();
  }

  async createArticle(authorId: string, input: CreateArticleInput) {
    let slug = this.slugify(input.title);

    const existing = await this.repo.findBySlug(slug);
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    return this.repo.create({
      categoryId: input.categoryId,
      authorId,
      title: input.title,
      slug,
      summary: input.summary,
      content: input.content,
      coverImage: input.coverImage,
      isPublished: input.isPublished !== undefined ? input.isPublished : true,
    });
  }

  async updateArticle(id: string, input: UpdateArticleInput) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError("Artikel tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    let slug = existing.slug;
    if (input.title && input.title !== existing.title) {
      slug = this.slugify(input.title);
      const conflict = await this.repo.findBySlug(slug);
      if (conflict && conflict.id !== id) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    return this.repo.update(id, {
      ...input,
      slug,
    });
  }

  async deleteArticle(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError("Artikel tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    await this.repo.delete(id);
    return { success: true, message: `Artikel '${existing.title}' berhasil dihapus.` };
  }
}

export const articleService = new ArticleService();
