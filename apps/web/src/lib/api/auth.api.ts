import { apiClient } from "./client";
import type { AuthResponse, LoginInput, User } from "@annisa/types";

export const authApi = {
  login: async (input: LoginInput): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/login", input);
  },

  getMe: async (): Promise<User> => {
    return apiClient.get<User>("/auth/me");
  },
};
