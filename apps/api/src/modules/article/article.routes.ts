import { Router } from "express";
import { z } from "zod";
import {
  createArticleInputSchema,
  updateArticleInputSchema,
} from "@annisa/types";
import { validateRequest } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { requireRole } from "../../middlewares/role.middleware";
import { articleController } from "./article.controller";
import "./article.openapi"; // Register docs

const router = Router();

// Public: List articles, categories, and read by slug
router.get("/", articleController.getAllArticles);
router.get("/categories", articleController.getAllCategories);
router.get("/:slug", articleController.getArticleBySlug);

// Protected Owner Only: Create, Update, Delete
router.post(
  "/",
  authMiddleware,
  requireRole("owner"),
  validateRequest({ body: createArticleInputSchema }),
  articleController.createArticle,
);

router.put(
  "/:id",
  authMiddleware,
  requireRole("owner"),
  validateRequest({
    params: z.object({ id: z.string().uuid() }),
    body: updateArticleInputSchema,
  }),
  articleController.updateArticle,
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("owner"),
  validateRequest({ params: z.object({ id: z.string().uuid() }) }),
  articleController.deleteArticle,
);

export const articleRouter = router;
