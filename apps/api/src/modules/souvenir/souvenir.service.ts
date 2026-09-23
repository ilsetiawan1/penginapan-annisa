import { AppError } from "../../middlewares/error.middleware";
import { HTTP_STATUS } from "../../constants";
import type {
  CreateSouvenirInput,
  PosCheckoutInput,
  UpdateSouvenirInput,
} from "@annisa/types";
import {
  souvenirRepository,
  type SouvenirRepository,
} from "./souvenir.repository";

export class SouvenirService {
  private repo: SouvenirRepository;

  constructor(repo?: SouvenirRepository) {
    this.repo = repo ?? souvenirRepository;
  }

  async getAllSouvenirs(filter?: {
    categorySlug?: string;
    isAvailable?: boolean;
  }) {
    return this.repo.findAll(filter);
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

  async deleteSouvenir(id: string) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new AppError("Produk tidak ditemukan.", HTTP_STATUS.NOT_FOUND);
    }
    await this.repo.delete(id);
    return { success: true, message: `Produk '${existing.name}' berhasil dihapus.` };
  }

  async processPosCheckout(input: PosCheckoutInput) {
    if (!input.items || input.items.length === 0) {
      throw new AppError("Keranjang belanja kosong.", HTTP_STATUS.BAD_REQUEST);
    }

    const { detailedItems, grandTotal } = await this.repo.processCheckout(
      input.items,
    );

    let change = 0;
    if (input.cashReceived !== undefined) {
      if (input.cashReceived < grandTotal) {
        throw new AppError(
          `Uang tunai tidak cukup (Total: Rp ${grandTotal.toLocaleString("id-ID")}, Diterima: Rp ${input.cashReceived.toLocaleString("id-ID")}).`,
          HTTP_STATUS.BAD_REQUEST,
        );
      }
      change = input.cashReceived - grandTotal;
    }

    const receiptNumber = `POS-${Date.now().toString().slice(-6)}`;

    return {
      receiptNumber,
      transactionDate: new Date().toISOString(),
      items: detailedItems,
      grandTotal,
      paymentMethod: input.paymentMethod,
      cashReceived: input.cashReceived || grandTotal,
      change,
    };
  }
}

export const souvenirService = new SouvenirService();
