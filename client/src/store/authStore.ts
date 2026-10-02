import { create } from "zustand";
import type { AuthUser } from "../types/auth";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  login: (user) => {
    localStorage.setItem("stockflow_user", JSON.stringify(user));

    set({
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("stockflow_user");

    set({
      user: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: () => {
    const storedUser = localStorage.getItem("stockflow_user");

    if (storedUser) {
      const user = JSON.parse(storedUser) as AuthUser;

      set({
        user,
        isAuthenticated: true,
        isInitialized: true,
      });

      return;
    }

    set({
      isInitialized: true,
    });
  },
}));
