import { apiClient } from "./client";
import type {
  Article,
  ArticleCategory,
  ArticleQuery,
  CreateArticleInput,
  UpdateArticleInput,
} from "@annisa/types";

export const articlesApi = {
  getAllArticles: async (query?: ArticleQuery): Promise<Article[]> => {
    return apiClient.get<Article[]>(
      "/articles",
      query as Record<string, string | number | boolean | undefined>,
    );
  },

  getArticleBySlug: async (slug: string): Promise<Article> => {
    return apiClient.get<Article>(`/articles/${slug}`);
  },

  getAllCategories: async (): Promise<ArticleCategory[]> => {
    return apiClient.get<ArticleCategory[]>("/articles/categories");
  },

  createArticle: async (input: CreateArticleInput): Promise<Article> => {
    return apiClient.post<Article>("/articles", input);
  },

  updateArticle: async (
    id: string,
    input: UpdateArticleInput,
  ): Promise<Article> => {
    return apiClient.put<Article>(`/articles/${id}`, input);
  },

  deleteArticle: async (
    id: string,
  ): Promise<{ success: boolean; message: string }> => {
    return apiClient.delete<{ success: boolean; message: string }>(
      `/articles/${id}`,
    );
  },
};
