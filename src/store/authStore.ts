import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  loginAsAdmin: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  loginAsAdmin: () =>
    set({
      isAuthenticated: true,
      accessToken: "mock-admin-token",
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      accessToken: null,
    }),
}));
