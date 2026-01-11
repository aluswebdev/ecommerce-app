// src/store/useSellerStore.js
import { create } from "zustand";

import API from "../api/axiosAPI";

export const useSellerStore = create((set) => ({
  sellerProducts: [],
  seller: null,
  loading: false,
  error: null,

  fetchSellerDetails: async (sellerId) => {
    set({ loading: true, error: null });
    try {
      const res = await API.get(`/product${sellerId}`);
      set({ seller: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch seller:", err);
      set({ error: "Could not load seller details", loading: false });
    }
  },

  fetchSellerProducts: async (seller) => {
    set({ loading: true, error: null });
    try {
      const res = await API.get(`/product/sellerproduct?seller=${seller}`);
      set({ sellerProducts: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch seller products:", err);
      set({ error: "Could not load seller products", loading: false });
    }
  },
}));
