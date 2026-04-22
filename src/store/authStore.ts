import { create } from "zustand";

const MOCK_ACCESS_TOKEN = "mock-admin-token";
const AUTH_STORAGE_KEY = "celly-admin-auth";

type AuthUser = {
  email: string;
  name: string;
  role: "ADMIN";
};

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  loginAsAdmin: () => void;
  logout: () => void;
};

const readStoredAuth = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as Pick<AuthState, "accessToken" | "user">;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

const persistAuth = (accessToken: string | null, user: AuthUser | null) => {
  if (typeof window === "undefined") {
    return;
  }

  if (!accessToken || !user) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      accessToken,
      user,
    }),
  );
};

const storedAuth = readStoredAuth();

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(storedAuth?.accessToken),
  accessToken: storedAuth?.accessToken ?? null,
  user: storedAuth?.user ?? null,
  login: (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const isValidMockUser =
      normalizedEmail === "admin@church.com" && password === "admin1234";

    if (!isValidMockUser) {
      return false;
    }

    const user = {
      email: normalizedEmail,
      name: "김목사",
      role: "ADMIN" as const,
    };

    persistAuth(MOCK_ACCESS_TOKEN, user);
    set({
      isAuthenticated: true,
      accessToken: MOCK_ACCESS_TOKEN,
      user,
    });

    return true;
  },
  loginAsAdmin: () =>
    set(() => {
      const user = {
        email: "admin@church.com",
        name: "김목사",
        role: "ADMIN" as const,
      };

      persistAuth(MOCK_ACCESS_TOKEN, user);

      return {
        isAuthenticated: true,
        accessToken: MOCK_ACCESS_TOKEN,
        user,
      };
    }),
  logout: () =>
    set(() => {
      persistAuth(null, null);

      return {
        isAuthenticated: false,
        accessToken: null,
        user: null,
      };
    }),
}));
