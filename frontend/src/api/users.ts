import { apiClient } from "./client";
import type { UserResponse } from "@/types";

export interface UpdateUserPayload {
  fullName: string;
  email: string;
  mobileNo?: string;
  address?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const usersApi = {
  me: () => apiClient.get<UserResponse>("/users/me").then((res) => res.data),

  update: (payload: UpdateUserPayload) =>
    apiClient.put<UserResponse>("/users/me", payload).then((res) => res.data),

  changePassword: (payload: ChangePasswordPayload) =>
    apiClient.put("/users/me/password", payload),
};
