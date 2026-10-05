import type { CreateSouvenirInput, PosCheckoutInput, UpdateSouvenirInput } from "@annisa/types";
import { HTTP_STATUS } from "../../constants";
import { AppError } from "../../middlewares/error.middleware";
import { type SouvenirRepository, souvenirRepository } from "./souvenir.repository";

export class SouvenirService {
  private repo: SouvenirRepository;

  constructor(repo?: SouvenirRepository) {
    this.repo = repo ?? souvenirRepository;
  }

  async getAllSouvenirs(filter?: {
    categorySlug?: string;
    isAvailable?: boolean;
    status?: "active" | "trash" | "all";
    trash?: boolean;
  }) {
    return this.repo.findAll(filter);
  }

  async getCounts() {
    return this.repo.getCounts();
  }

  async getSouvenirById(id: string) {
    const item = await this.repo.findById(id);
    if (!item) {
      throw new AppError("Produk oleh-oleh tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }
    return item;
  }

  async getAllCategories() {
    return this.repo.findAllCategories();
  }

  async createSouvenir(input: CreateSouvenirInput) {
    return this.repo.create(input);
  }

  async updateSouvenir(id: string, input: UpdateSouvenirInput) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError("Produk tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }
    return this.repo.update(id, input);
  }

  async deleteSouvenir(id: string, permanent?: boolean) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError("Produk tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    if (permanent) {
      await this.repo.forceDelete(id);
      return { success: true, message: `Produk '${existing.name}' berhasil dihapus permanen.` };
    }

    await this.repo.softDelete(id);
    return {
      success: true,
      message: `Produk '${existing.name}' dipindahkan ke sampah (dapat dipulihkan dalam 30 hari).`,
    };
  }

  async restoreSouvenir(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError("Produk tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    if (!existing.deletedAt) {
      return { success: true, message: `Produk '${existing.name}' sudah dalam status aktif.` };
    }

    // Periksa apakah sudah lewat dari 30 hari
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    if (new Date(existing.deletedAt) < thirtyDaysAgo) {
      await this.repo.forceDelete(id);
      throw new AppError(
        "Masa retensi 30 hari telah berakhir. Data produk ini sudah terhapus permanen dan tidak dapat dipulihkan.",
        HTTP_STATUS.GONE,
      );
    }

    await this.repo.restore(id);
    return { success: true, message: `Produk '${existing.name}' berhasil dipulihkan.` };
  }

  async forceDeleteSouvenir(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError("Produk tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }

    await this.repo.forceDelete(id);
    return { success: true, message: `Produk '${existing.name}' berhasil dihapus permanen.` };
  }

  async processPosCheckout(input: PosCheckoutInput, userId?: string) {
    if (!input.items || input.items.length === 0) {
      throw new AppError("Keranjang belanja kosong.", HTTP_STATUS.BAD_REQUEST);
    }

    return this.repo.processCheckout(input.items, input.paymentMethod, input.cashReceived, userId);
  }
}

export const souvenirService = new SouvenirService();
