import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export function GuestRoute() {
  const { token, role } = useAuthStore();

  if (token) {
    return <Navigate to={role === "ADMIN" ? "/admin" : "/"} replace />;
  }

  return <Outlet />;
}
