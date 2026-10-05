import { apiClient } from "@/lib/api/client";
import type { CreateUserInput, UpdateUserInput, User } from "@annisa/types";

export const staffApi = {
  getStaffList: async (): Promise<User[]> => {
    return apiClient.get<User[]>("/users");
  },

  getStaffById: async (id: string): Promise<User> => {
    return apiClient.get<User>(`/users/${id}`);
  },

  createStaff: async (input: CreateUserInput): Promise<User> => {
    return apiClient.post<User>("/users", input);
  },

  updateStaff: async (id: string, input: UpdateUserInput): Promise<User> => {
    return apiClient.put<User>(`/users/${id}`, input);
  },

  deleteStaff: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/users/${id}`);
  },
};
