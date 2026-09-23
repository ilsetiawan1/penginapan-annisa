import type { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../utils/response.util";
import { HTTP_STATUS } from "../../constants";
import { articleService, type ArticleService } from "./article.service";

export class ArticleController {
  private service: ArticleService;

  constructor(service?: ArticleService) {
    this.service = service ?? articleService;
  }

  getAllArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category, isPublished, search } = req.query as {
        category?: string;
        isPublished?: string;
        search?: string;
      };

      const articles = await this.service.getAllArticles({
        categorySlug: category,
        isPublished:
          isPublished !== undefined ? isPublished === "true" : undefined,
        search,
      });

      return sendSuccess(res, articles, "Daftar artikel berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  getArticleBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { slug } = req.params as { slug: string };
      const article = await this.service.getArticleBySlug(slug);
      return sendSuccess(res, article, "Detail artikel berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  getAllCategories = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const categories = await this.service.getAllCategories();
      return sendSuccess(res, categories, "Daftar kategori artikel berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  createArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorId = req.user!.id;
      const article = await this.service.createArticle(authorId, req.body);
      return sendSuccess(
        res,
        article,
        "Artikel berhasil dipublikasikan!",
        HTTP_STATUS.CREATED,
      );
    } catch (error) {
      return next(error);
    }
  };

  updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const updated = await this.service.updateArticle(id, req.body);
      return sendSuccess(res, updated, "Artikel berhasil diperbarui.");
    } catch (error) {
      return next(error);
    }
  };

  deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const result = await this.service.deleteArticle(id);
      return sendSuccess(res, result, "Artikel berhasil dihapus.");
    } catch (error) {
      return next(error);
    }
  };
}

export const articleController = new ArticleController();
