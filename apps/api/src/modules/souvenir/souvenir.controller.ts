import type { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../utils/response.util";
import { HTTP_STATUS } from "../../constants";
import { souvenirService, type SouvenirService } from "./souvenir.service";

export class SouvenirController {
  private service: SouvenirService;

  constructor(service?: SouvenirService) {
    this.service = service ?? souvenirService;
  }

  getAllSouvenirs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category, isAvailable } = req.query as {
        category?: string;
        isAvailable?: string;
      };

      const items = await this.service.getAllSouvenirs({
        categorySlug: category,
        isAvailable:
          isAvailable !== undefined ? isAvailable === "true" : undefined,
      });

      return sendSuccess(res, items, "Katalog oleh-oleh berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  getSouvenirById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const item = await this.service.getSouvenirById(id);
      return sendSuccess(res, item, "Detail produk berhasil diambil.");
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
      return sendSuccess(res, categories, "Daftar kategori berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  createSouvenir = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await this.service.createSouvenir(req.body);
      return sendSuccess(
        res,
        created,
        "Produk oleh-oleh baru berhasil ditambahkan.",
        HTTP_STATUS.CREATED,
      );
    } catch (error) {
      return next(error);
    }
  };

  updateSouvenir = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const updated = await this.service.updateSouvenir(id, req.body);
      return sendSuccess(res, updated, "Data produk berhasil diperbarui.");
    } catch (error) {
      return next(error);
    }
  };

  deleteSouvenir = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const result = await this.service.deleteSouvenir(id);
      return sendSuccess(res, result, "Produk berhasil dihapus.");
    } catch (error) {
      return next(error);
    }
  };

  processPosCheckout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const receipt = await this.service.processPosCheckout(req.body);
      return sendSuccess(
        res,
        receipt,
        "Transaksi kasir POS berhasil! Stok produk telah dipotong otomatis.",
        HTTP_STATUS.CREATED,
      );
    } catch (error) {
      return next(error);
    }
  };
}

export const souvenirController = new SouvenirController();
