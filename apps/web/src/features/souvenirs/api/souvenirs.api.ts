import { apiClient } from "@/lib/api/client";
import type {
  CreateSouvenirInput,
  PosCheckoutInput,
  Souvenir,
  SouvenirCategory,
  SouvenirQuery,
  UpdateSouvenirInput,
} from "@annisa/types";

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

export const souvenirsApi = {
  getAllSouvenirs: async (query?: SouvenirQuery): Promise<Souvenir[]> => {
    return apiClient.get<Souvenir[]>(
      "/souvenirs",
      query as Record<string, string | number | boolean | undefined>,
    );
  },

  getSouvenirById: async (id: string): Promise<Souvenir> => {
    return apiClient.get<Souvenir>(`/souvenirs/${id}`);
  },

  getAllCategories: async (): Promise<SouvenirCategory[]> => {
    return apiClient.get<SouvenirCategory[]>("/souvenirs/categories");
  },

  createSouvenir: async (input: CreateSouvenirInput): Promise<Souvenir> => {
    return apiClient.post<Souvenir>("/souvenirs", input);
  },

  updateSouvenir: async (id: string, input: UpdateSouvenirInput): Promise<Souvenir> => {
    return apiClient.put<Souvenir>(`/souvenirs/${id}`, input);
  },

  deleteSouvenir: async (id: string, permanent?: boolean): Promise<{ success: boolean; message: string }> => {
    const url = permanent ? `/souvenirs/${id}/force` : `/souvenirs/${id}`;
    return apiClient.delete<{ success: boolean; message: string }>(url);
  },

  restoreSouvenir: async (id: string): Promise<{ success: boolean; message: string }> => {
    return apiClient.post<{ success: boolean; message: string }>(`/souvenirs/${id}/restore`, {});
  },

  forceDeleteSouvenir: async (id: string): Promise<{ success: boolean; message: string }> => {
    return apiClient.delete<{ success: boolean; message: string }>(`/souvenirs/${id}/force`);
  },

  processPosCheckout: async (input: PosCheckoutInput): Promise<PosReceipt> => {
    return apiClient.post<PosReceipt>("/souvenirs/pos/checkout", input);
  },
};
