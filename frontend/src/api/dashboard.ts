import { apiClient } from "./client";
import type { DashboardStats } from "@/types";

export const dashboardApi = {
  get: () => apiClient.get<DashboardStats>("/admin/dashboard").then((res) => res.data),
};
