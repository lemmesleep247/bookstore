import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthResponse, Role } from "@/types";

interface AuthState {
  token: string | null;
  userId: number | null;
  userName: string | null;
  fullName: string | null;
  role: Role | null;
  setAuth: (auth: AuthResponse) => void;
  updateFullName: (fullName: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      userName: null,
      fullName: null,
      role: null,
      setAuth: (auth) =>
        set({
          token: auth.token,
          userId: auth.userId,
          userName: auth.userName,
          fullName: auth.fullName,
          role: auth.role,
        }),
      updateFullName: (fullName) => set({ fullName }),
      logout: () =>
        set({ token: null, userId: null, userName: null, fullName: null, role: null }),
    }),
    { name: "bookstore-auth" }
  )
);
