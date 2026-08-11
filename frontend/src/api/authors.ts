import { apiClient } from "./client";
import type { BookAuthor } from "@/types";

export interface BookAuthorPayload {
  name: string;
  age: number;
  email: string;
}

export const authorsApi = {
  list: () => apiClient.get<BookAuthor[]>("/admin/authors").then((res) => res.data),

  get: (id: number) => apiClient.get<BookAuthor>(`/admin/authors/${id}`).then((res) => res.data),

  create: (payload: BookAuthorPayload) =>
    apiClient.post<BookAuthor>("/admin/authors", payload).then((res) => res.data),

  update: (id: number, payload: BookAuthorPayload) =>
    apiClient.put<BookAuthor>(`/admin/authors/${id}`, payload).then((res) => res.data),

  remove: (id: number) => apiClient.delete(`/admin/authors/${id}`),
};
