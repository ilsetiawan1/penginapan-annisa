import { apiClient } from "./client";
import type {
  CheckInInput,
  CheckOutInput,
  ConfirmDpInput,
  CreateOnlineBookingInput,
  CreateWalkInBookingInput,
  PaginatedResponse,
  Reservation,
  ReservationQuery,
} from "@annisa/types";

export interface OnlineBookingResponse {
  reservation: Reservation;
  paymentInfo: {
    bankName: string;
    bankAccount: string;
    bankHolder: string;
    dpRequired: number;
  };
  whatsAppUrl: string;
}

export interface DigitalReceipt {
  reservationCode: string;
  guestName: string;
  guestPhone: string;
  roomNumber: string;
  roomTypeName: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  roomRatePerNight: number;
  grandTotal: number;
  dpAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  generatedAt: string;
  propertyName: string;
  propertyAddress: string;
}

export const reservationsApi = {
  getAllReservations: async (
    query?: ReservationQuery,
  ): Promise<PaginatedResponse<Reservation>> => {
    return apiClient.get<PaginatedResponse<Reservation>>(
      "/reservations",
      query as Record<string, string | number | boolean | undefined>,
    );
  },

  getReservationById: async (id: string): Promise<Reservation> => {
    return apiClient.get<Reservation>(`/reservations/${id}`);
  },

  createOnlineBooking: async (
    input: CreateOnlineBookingInput,
  ): Promise<OnlineBookingResponse> => {
    return apiClient.post<OnlineBookingResponse>(
      "/reservations/online",
      input,
    );
  },

  createWalkInBooking: async (
    input: CreateWalkInBookingInput,
  ): Promise<Reservation> => {
    return apiClient.post<Reservation>("/reservations/walk-in", input);
  },

  confirmDp: async (
    id: string,
    input: ConfirmDpInput,
  ): Promise<Reservation> => {
    return apiClient.post<Reservation>(`/reservations/${id}/confirm-dp`, input);
  },

  checkIn: async (id: string, input: CheckInInput): Promise<Reservation> => {
    return apiClient.post<Reservation>(`/reservations/${id}/check-in`, input);
  },

  checkOut: async (id: string, input: CheckOutInput): Promise<Reservation> => {
    return apiClient.post<Reservation>(`/reservations/${id}/check-out`, input);
  },

  getReceipt: async (id: string): Promise<DigitalReceipt> => {
    return apiClient.get<DigitalReceipt>(`/reservations/${id}/receipt`);
  },
};
