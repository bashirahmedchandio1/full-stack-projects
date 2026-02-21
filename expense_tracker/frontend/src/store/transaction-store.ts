import { create } from "zustand";
import api from "../lib/api";

export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
}

interface StatsSummary {
  balance: number;
  income: number;
  expense: number;
}

interface CategoryData {
  name: string;
  amount: number;
}

interface TrendData {
  date: string;
  income: number;
  expense: number;
}

export interface TransactionStats {
  summary: StatsSummary;
  categoryData: CategoryData[];
  trendData: TrendData[];
}

interface TransactionState {
  transactions: Transaction[];
  stats: TransactionStats | null;
  isLoading: boolean;
  error: string | null;

  fetchTransactions: () => Promise<void>;
  fetchStats: () => Promise<void>;
  addTransaction: (
    data: Omit<Transaction, "_id" | "date"> & { date?: string },
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  stats: null,
  isLoading: false,
  error: null,

  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/transactions");
      set({ transactions: res.data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch transactions",
        isLoading: false,
      });
    }
  },

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/transactions/stats");
      set({ stats: res.data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch stats",
        isLoading: false,
      });
    }
  },

  addTransaction: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post("/transactions", data);
      set((state) => ({
        transactions: [res.data, ...state.transactions],
        isLoading: false,
      }));
      // Refresh stats after adding
      get().fetchStats();
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to add transaction",
        isLoading: false,
      });
      throw err;
    }
  },

  deleteTransaction: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/transactions/${id}`);
      set((state) => ({
        transactions: state.transactions.filter((t) => t._id !== id),
        isLoading: false,
      }));
      // Refresh stats after deleting
      get().fetchStats();
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to delete transaction",
        isLoading: false,
      });
    }
  },
}));
