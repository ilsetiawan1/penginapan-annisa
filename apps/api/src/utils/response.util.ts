import type { Response } from "express";
import type { ApiResponse } from "@annisa/types";
import { HTTP_STATUS } from "../constants";

export function sendSuccess<T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode: number = HTTP_STATUS.OK,
): Response<ApiResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(
  res: Response,
  error: string,
  statusCode: number = HTTP_STATUS.BAD_REQUEST,
  data?: any,
): Response<ApiResponse> {
  return res.status(statusCode).json({
    success: false,
    error,
    data,
  });
}
