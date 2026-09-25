import type { NextFunction, Request, Response } from "express";
import * as cheerio from "cheerio";
import { sendSuccess } from "../../utils/response.util";
import { HTTP_STATUS } from "../../constants";
import { articleService, type ArticleService } from "./article.service";
import { s3Client } from "../../utils/r2.util";
import { config } from "../../config";
import { PutObjectCommand } from "@aws-sdk/client-s3";

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

  scrapeArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { url } = req.body as { url?: string };
      if (!url || !url.startsWith("http")) {
        return res.status(400).json({ success: false, message: "URL tidak valid." });
      }

      // Fetch the HTML content
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Gagal mengambil data dari URL.");
      }
      const html = await response.text();

      // Parse with Cheerio
      const $ = cheerio.load(html);

      // Extract metadata (Kompas structure)
      const title = $('h1.read__title').text().trim() || $('meta[property="og:title"]').attr('content') || '';
      const coverImage = $('meta[property="og:image"]').attr('content') || '';
      
      // Extract first paragraph for summary
      let summary = '';
      const firstParagraph = $('.read__content p').first().text().trim();
      if (firstParagraph) {
        summary = firstParagraph.substring(0, 200) + (firstParagraph.length > 200 ? '...' : '');
      }

      // Extract all paragraphs for content (converting to a simple markdown-like or HTML format)
      let content = '';
      $('.read__content p').each((_, el) => {
        const text = $(el).text().trim();
        // Skip empty paragraphs or ads (Kompas often has "Baca juga" links inside p tags which we might want to keep or filter, but we keep it simple)
        if (text && !text.includes("Baca juga:")) {
          content += text + '\n\n';
        }
      });

      if (!title && !content) {
        return res.status(400).json({ success: false, message: "Tidak dapat mengekstrak konten dari URL ini." });
      }

      let r2ImageUrl = coverImage;
      
      // Auto-upload the scraped image to Cloudflare R2
      if (coverImage) {
        try {
          const imgRes = await fetch(coverImage);
          if (imgRes.ok) {
            const buffer = await imgRes.arrayBuffer();
            const fileName = `articles/scrape-${Date.now()}.jpg`;
            
            await s3Client.send(
              new PutObjectCommand({
                Bucket: config.r2.bucketName,
                Key: fileName,
                Body: Buffer.from(buffer),
                ContentType: imgRes.headers.get("content-type") || "image/jpeg",
              })
            );
            // Replace coverImage with the R2 URL
            r2ImageUrl = `${config.r2.publicUrl}/${fileName}`;
          }
        } catch (err) {
          console.error("Failed to auto-upload scraped image to R2:", err);
        }
      }

      const scrapedData = {
        title,
        coverImage: r2ImageUrl,
        summary,
        content: content.trim(),
      };

      return sendSuccess(res, scrapedData, "Artikel berhasil diekstrak.");
    } catch (error: any) {
      console.error("Scraping error:", error);
      return res.status(500).json({ success: false, message: "Terjadi kesalahan saat scraping: " + error.message });
    }
  };
}

export const articleController = new ArticleController();
