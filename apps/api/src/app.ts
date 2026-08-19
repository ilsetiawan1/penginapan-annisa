import express, { type Request, type Response } from "express";
import cors from "cors";
import { apiReference } from "@scalar/express-api-reference";
import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: { colorize: true },
        }
      : undefined,
});

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

// OpenAPI Spec Placeholder for Scalar API Reference (Expanded in Phase 4)
const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Penginapan Annisa PMS & Reservation API",
    version: "1.0.0",
    description:
      "Dokumentasi REST API resmi untuk Sistem Informasi Manajemen Kamar, Reservasi & Katalog Penginapan Annisa (Ambon, Maluku).",
  },
  servers: [{ url: "http://localhost:4000", description: "Development Server" }],
  paths: {
    "/health": {
      get: {
        summary: "Health Check Server",
        responses: {
          200: {
            description: "Server berjalan normal",
          },
        },
      },
    },
  },
};

// Interactive Scalar API Docs UI
app.use(
  "/docs",
  apiReference({
    spec: {
      content: openApiSpec,
    },
    theme: "purple",
    pageTitle: "Penginapan Annisa — API Reference",
  })
);
