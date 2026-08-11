import { apiClient } from "./client";
import type { AuthResponse, UserResponse } from "@/types";

export interface LoginPayload {
  userName: string;
  password: string;
}

export interface RegisterPayload {
  userName: string;
  password: string;
  fullName: string;
  email: string;
  mobileNo?: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>("/auth/login", payload).then((res) => res.data),

  register: (payload: RegisterPayload) =>
    apiClient.post<UserResponse>("/auth/register", payload).then((res) => res.data),
};
