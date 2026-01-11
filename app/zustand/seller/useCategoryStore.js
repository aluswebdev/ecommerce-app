import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../../api/axiosAPI";

export const useCategoryStore = create(
  devtools(
    persist(
      (set, get) => ({
        categories: [],
        loading: false,
        error: null,
        lastFetchedAt: null,

        fetchCategories: async ({ force = false, signal } = {}) => {
          const { lastFetchedAt, categories } = get();
          const cacheFresh =
            lastFetchedAt && Date.now() - lastFetchedAt < 5 * 60 * 1000; // 5 min
          if (!force && cacheFresh && categories.length) return;

          set({ loading: true, error: null });
          try {
            const res = await API.get("/categories", { signal });
            set({
              categories: res.data?.categories || [],
              loading: false,
              lastFetchedAt: Date.now(),
            });
          } catch (e) {
            const message =
              e?.response?.data?.message ||
              e?.message ||
              "Failed to fetch categories";
            set({ error: message, loading: false });
            throw e;
          }
        },
      }),
      {
        name: "category-cache",
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          categories: state.categories,
          lastFetchedAt: state.lastFetchedAt,
        }),
      }
    )
  )
);
