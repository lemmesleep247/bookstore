import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import type { ApiError } from "@/types";

export const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  const requestUrl = config.url ?? "";
  const isPublicAuthRequest =
    requestUrl.startsWith("/auth/login") ||
    requestUrl.startsWith("/auth/register");

  if (token && !isPublicAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  },
);

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    const data = error.response?.data;

    if (data?.fieldErrors) {
      const first = Object.values(data.fieldErrors)[0];
      if (first) return first;
    }

    if (data?.message) return data.message;
  }

  return "Something went wrong. Please try again.";
}
