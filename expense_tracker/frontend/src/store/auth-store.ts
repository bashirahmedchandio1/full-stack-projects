import { create } from "zustand";
import api from "../lib/api";

interface User {
  _id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: {
    name: string;
    email: string;
    password?: string;
  }) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start as loading to check auth
  error: null,

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/me");
      set({ user: res.data, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post("/auth/login", { email, password });
      set({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to login",
        isLoading: false,
      });
      throw err;
    }
  },

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post("/auth/signup", { email, password, name });
      set({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create account",
        isLoading: false,
      });
      throw err;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ user: null, isAuthenticated: false });
    } catch (err) {
      console.error("Logout failed", err);
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.put("/auth/profile", data);
      set({
        user: { _id: res.data._id, name: res.data.name, email: res.data.email },
        isLoading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update profile",
        isLoading: false,
      });
      throw err;
    }
  },

  setError: (error) => set({ error }),
}));
