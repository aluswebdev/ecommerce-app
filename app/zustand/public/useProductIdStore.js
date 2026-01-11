// stores/productStore.js
import { create } from "zustand";
import API from "../../api/axiosAPI";

export const useProductIdStore = create((set) => ({
  product: null,
  isLoading: false,
  error: null,

  // ✅ Fetch single product by ID
  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const res = await API.get(`/public/${id}`);
      
      set({ product: res.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching product by id:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch product",
        isLoading: false,
      });
    }
  },

  clearProduct: () => set({ product: null }),
}));
