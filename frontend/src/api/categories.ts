import { apiClient } from "./client";
import type { BookCategory } from "@/types";

export interface BookCategoryPayload {
  name: string;
  description?: string;
}

export const categoriesApi = {
  listAdmin: () => apiClient.get<BookCategory[]>("/admin/categories").then((res) => res.data),

  get: (id: number) => apiClient.get<BookCategory>(`/categories/${id}`).then((res) => res.data),

  create: (payload: BookCategoryPayload) =>
    apiClient.post<BookCategory>("/admin/categories", payload).then((res) => res.data),

  update: (id: number, payload: BookCategoryPayload) =>
    apiClient.put<BookCategory>(`/admin/categories/${id}`, payload).then((res) => res.data),

  remove: (id: number) => apiClient.delete(`/admin/categories/${id}`),
};
