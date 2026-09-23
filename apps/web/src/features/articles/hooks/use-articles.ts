"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { articlesApi } from "@/lib/api/articles.api";
import type {
  ArticleQuery,
  CreateArticleInput,
  UpdateArticleInput,
} from "@annisa/types";
import { toast } from "sonner";

export const ARTICLES_QUERY_KEY = ["articles"] as const;
export const ARTICLE_CATEGORIES_QUERY_KEY = ["article-categories"] as const;

export function useArticles(query?: ArticleQuery) {
  return useQuery({
    queryKey: [...ARTICLES_QUERY_KEY, query],
    queryFn: () => articlesApi.getAllArticles(query),
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: [...ARTICLES_QUERY_KEY, "slug", slug],
    queryFn: () => articlesApi.getArticleBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useArticleCategories() {
  return useQuery({
    queryKey: ARTICLE_CATEGORIES_QUERY_KEY,
    queryFn: () => articlesApi.getAllCategories(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateArticleInput) => articlesApi.createArticle(input),
    onSuccess: () => {
      toast.success("Artikel berhasil dipublikasikan!");
      queryClient.invalidateQueries({ queryKey: ARTICLES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ARTICLE_CATEGORIES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal membuat artikel.";
      toast.error(msg);
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateArticleInput }) =>
      articlesApi.updateArticle(id, input),
    onSuccess: () => {
      toast.success("Artikel berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ARTICLES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal memperbarui artikel.";
      toast.error(msg);
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articlesApi.deleteArticle(id),
    onSuccess: () => {
      toast.success("Artikel berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ARTICLES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof Error ? err.message : "Gagal menghapus artikel.";
      toast.error(msg);
    },
  });
}
