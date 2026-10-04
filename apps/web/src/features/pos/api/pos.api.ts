import { apiClient } from "@/lib/api/client";
import type { PosCheckoutInput, Souvenir } from "@annisa/types";

export interface PosReceipt {
  receiptNumber: string;
  transactionDate: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  grandTotal: number;
  paymentMethod: string;
  cashReceived: number;
  change: number;
}

export const posApi = {
  getProducts: (): Promise<Souvenir[]> => apiClient.get<Souvenir[]>("/souvenirs"),

  checkout: (input: PosCheckoutInput): Promise<PosReceipt> =>
    apiClient.post<PosReceipt>("/souvenirs/pos/checkout", input),
};
