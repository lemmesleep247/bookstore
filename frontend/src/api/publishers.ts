import { apiClient } from "./client";
import type { BookPublisher } from "@/types";

export interface BookPublisherPayload {
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

export const publishersApi = {
  listAdmin: () => apiClient.get<BookPublisher[]>("/admin/publishers").then((res) => res.data),

  get: (id: number) => apiClient.get<BookPublisher>(`/publishers/${id}`).then((res) => res.data),

  create: (payload: BookPublisherPayload) =>
    apiClient.post<BookPublisher>("/admin/publishers", payload).then((res) => res.data),

  update: (id: number, payload: BookPublisherPayload) =>
    apiClient.put<BookPublisher>(`/admin/publishers/${id}`, payload).then((res) => res.data),

  remove: (id: number) => apiClient.delete(`/admin/publishers/${id}`),
};
