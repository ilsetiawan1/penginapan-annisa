import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../constants";
import { logger } from "../utils/logger.util";

export class AppError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode: number = HTTP_STATUS.BAD_REQUEST, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      details: err.details,
    });
  }

  if (err instanceof ZodError) {
    const errorMessages = err.errors.map(
      (e) => `${e.path.join(".")}: ${e.message}`,
    );
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: "Validasi data gagal",
      details: errorMessages,
    });
  }

  // Prisma unique constraint or foreign key violation
  if (err?.code === "P2002") {
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      error: "Data dengan nilai tersebut sudah terdaftar di sistem.",
    });
  }

  if (err?.code === "P2025") {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: "Data yang diminta tidak ditemukan di database.",
    });
  }

  // General Error
  logger.error(err, "Unhandled Server Error");
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: "Terjadi kesalahan internal pada server.",
  });
}
