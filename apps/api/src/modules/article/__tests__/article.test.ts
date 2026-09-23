import { describe, expect, it } from "bun:test";
import { ArticleService } from "../article.service";

describe("📰 Article Module Service Tests", () => {
  const articleService = new ArticleService();

  it("should fetch all seeded articles with category and author", async () => {
    const articles = await articleService.getAllArticles();

    expect(articles).toBeDefined();
    expect(articles.length).toBeGreaterThanOrEqual(2);

    const transitArticle = articles.find((a) =>
      a.slug.includes("panduan-transit"),
    );
    expect(transitArticle).toBeDefined();
    expect(transitArticle?.category).toBeDefined();
  });

  it("should fetch article by slug and increment views", async () => {
    const slug = "panduan-transit-praktis-bandara-pattimura";
    const article = await articleService.getArticleBySlug(slug);

    expect(article).toBeDefined();
    expect(article.slug).toBe(slug);
    expect(article.content).toContain("Bandara Pattimura");
  });

  it("should throw not found error for non-existent slug", async () => {
    expect(
      articleService.getArticleBySlug("non-existent-article-slug-1234"),
    ).rejects.toThrow("Artikel tidak ditemukan.");
  });
});
