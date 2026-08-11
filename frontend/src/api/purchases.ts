import { apiClient } from "./client";
import type { PagedResponse, UserTransaction } from "@/types";

export interface PurchasePayload {
  bookId: number;
  quantity: number;
}

export interface PurchaseResult {
  orderId: string;
  bookId: number;
  bookTitle: string;
  quantity: number;
  totalPrice: number;
}

export const purchasesApi = {
  purchase: (payload: PurchasePayload) =>
    apiClient.post<PurchaseResult>("/purchases", payload).then((res) => res.data),

  list: (pageNo: number) =>
    apiClient
      .get<PagedResponse<UserTransaction>>("/purchases", { params: { pageNo } })
      .then((res) => res.data),
};
