import type { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../constants";
import { sendSuccess } from "../../utils/response.util";
import { type SouvenirService, souvenirService } from "./souvenir.service";

export class SouvenirController {
  private service: SouvenirService;

  constructor(service?: SouvenirService) {
    this.service = service ?? souvenirService;
  }

  getAllSouvenirs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category, isAvailable, status, trash } = req.query as {
        category?: string;
        isAvailable?: string;
        status?: "active" | "trash" | "all";
        trash?: string;
      };

      const isTrash = status === "trash" || trash === "true";
      const resolvedStatus = isTrash ? "trash" : status;

      const items = await this.service.getAllSouvenirs({
        categorySlug: category,
        isAvailable: isAvailable !== undefined ? isAvailable === "true" : undefined,
        status: resolvedStatus,
        trash: isTrash,
      });

      return sendSuccess(res, items, "Katalog oleh-oleh berhasil diambil.");
    } catch (error) {
      return next(error);
    }
  };

  getCounts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const counts = await this.service.getCounts();
      return sendSuccess(res, counts, "Jumlah produk berhasil diambil.");
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

  getAllCategories = async (_req: Request, res: Response, next: NextFunction) => {
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
      const { permanent } = req.query as { permanent?: string };
      const result = await this.service.deleteSouvenir(id, permanent === "true");
      return sendSuccess(res, result, result.message);
    } catch (error) {
      return next(error);
    }
  };

  restoreSouvenir = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const result = await this.service.restoreSouvenir(id);
      return sendSuccess(res, result, result.message);
    } catch (error) {
      return next(error);
    }
  };

  forceDeleteSouvenir = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params as { id: string };
      const result = await this.service.forceDeleteSouvenir(id);
      return sendSuccess(res, result, result.message);
    } catch (error) {
      return next(error);
    }
  };

  processPosCheckout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const receipt = await this.service.processPosCheckout(req.body, req.user?.id);
      return sendSuccess(res, receipt, "Transaksi POS kasir berhasil.", HTTP_STATUS.CREATED);
    } catch (error) {
      return next(error);
    }
  };
}

export const souvenirController = new SouvenirController();
