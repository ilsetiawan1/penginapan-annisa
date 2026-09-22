import type { NextFunction, Request, Response } from "express";
import { type AnyZodObject, ZodError } from "zod";
import { HTTP_STATUS } from "../constants";

export function validateRequest(schemas: {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      if (schemas.query) {
        req.query = (await schemas.query.parseAsync(req.query)) as any;
      }
      if (schemas.params) {
        req.params = (await schemas.params.parseAsync(req.params)) as any;
      }
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(
          (err) => `${err.path.join(".")}: ${err.message}`,
        );
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          error: "Validasi data gagal",
          details: errorMessages,
        });
      }
      return next(error);
    }
  };
}
