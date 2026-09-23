import { apiClient } from "./client";
import type {
  Room,
  RoomQuery,
  RoomType,
  UpdateRoomRateInput,
  UpdateRoomStatusInput,
} from "@annisa/types";

export const roomsApi = {
  getAllRooms: async (query?: RoomQuery): Promise<Room[]> => {
    return apiClient.get<Room[]>("/rooms", query as Record<string, string | number | boolean | undefined>);
  },

  getRoomByNumber: async (roomNumber: string): Promise<Room> => {
    return apiClient.get<Room>(`/rooms/${roomNumber}`);
  },

  updateRoomStatus: async (
    roomNumber: string,
    input: UpdateRoomStatusInput,
  ): Promise<Room> => {
    return apiClient.patch<Room>(`/rooms/${roomNumber}/status`, input);
  },

  getAllRoomTypes: async (): Promise<RoomType[]> => {
    return apiClient.get<RoomType[]>("/rooms/types");
  },

  getRoomTypeById: async (id: string): Promise<RoomType> => {
    return apiClient.get<RoomType>(`/rooms/types/${id}`);
  },

  updateRoomRate: async (
    id: string,
    input: UpdateRoomRateInput,
  ): Promise<RoomType> => {
    return apiClient.put<RoomType>(`/rooms/types/${id}`, input);
  },
};
