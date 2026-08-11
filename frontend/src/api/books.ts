import { apiClient } from "./client";
import type { Book, PagedResponse } from "@/types";

export interface BookPayload {
  title: string;
  description?: string;
  authorIds: string[];
  copies: number;
  price: number;
  categoryId: number;
  publisherId: number;
}

export const booksApi = {
  list: (pageNo: number) =>
    apiClient.get<PagedResponse<Book>>("/books", { params: { pageNo } }).then((res) => res.data),

  get: (id: number) => apiClient.get<Book>(`/books/${id}`).then((res) => res.data),

  create: (payload: BookPayload) =>
    apiClient.post<Book>("/admin/books", payload).then((res) => res.data),

  update: (id: number, payload: BookPayload) =>
    apiClient.put<Book>(`/admin/books/${id}`, payload).then((res) => res.data),

  remove: (id: number) => apiClient.delete(`/admin/books/${id}`),
};
