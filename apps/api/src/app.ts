import { apiReference } from "@scalar/express-api-reference";
import cors from "cors";
import express, { type Request, type Response } from "express";
import pino from "pino";
import pinoHttp from "pino-http";

import { generateOpenApiSpec } from "./docs/openapi";
import { errorHandler } from "./middlewares/error.middleware";
import { authRouter } from "./modules/auth/auth.routes";
import { roomRouter } from "./modules/room/room.routes";
import { reservationRouter } from "./modules/reservation/reservation.routes";
import { souvenirRouter } from "./modules/souvenir/souvenir.routes";
import { articleRouter } from "./modules/article/article.routes";
import { reportRouter } from "./modules/report/report.routes";

import { logger } from "./utils/logger.util";
export { logger };

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pinoHttp({ logger }));

// Base Health Check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "Penginapan Annisa API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// JSON Raw OpenAPI Spec
app.get("/docs.json", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(generateOpenApiSpec());
});

app.use(
  "/docs",
  apiReference({
    spec: {
      url: "/docs.json",
    },
    theme: "purple",
    pageTitle: "Penginapan Annisa — API Reference",
  }),
);

// Mount API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/souvenirs", souvenirRouter);
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/reports", reportRouter);

// Centralized Error Handling
app.use(errorHandler);
