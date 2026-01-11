import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

import API from "../../api/axiosAPI.js";

const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  message: null,
  createProduct: async (productData) => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");
      if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const res = await API.post("/product/create", productData);
      console.log("Product created successfully:", res.data);
      set({ message: res.data.message, isLoading: false });
      return res.data;
    } catch (err) {
      console.error(
        "Product creation error:",
        err.response?.data || err.message
      );
      set({ message: err.response.data.message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProduct: async (productId, updatedData) => {
    set({ isLoading: true, message: null });
    try {
      const res = await API.put(`/seller/${productId}`, updatedData);
      // update local state
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? res.data.product : p
        ),
        isLoading: false,
      }));
      return res.data.product;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to update product",
        isLoading: false,
      });
      throw err;
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      await API.delete(`/seller/${productId}`);
      // remove from local state
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
        isLoading: false,
      }));
      console.log("product deleted");
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to delete product",
        isLoading: false,
      });
      throw err;
    }
  },

  // Toggle active/inactive status
  toggleProductStatus: async (productId) => {
    set({ isLoading: true });

    const { products } = get();

    // 🔹 Optimistic update (flip status immediately in store)
    set((state) => ({
      products: state.products.map((p) =>
        p._id === productId
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      ),
    }));
    try {
      const res = await API.patch(`/seller/${productId}/toggle-status`);
      const updatedProduct = res.data.product;
      console.log("Product status updated:", updatedProduct.status);

      // update state immediately
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? { ...p, status: updatedProduct.status } : p
        ),
        isLoading: false,
      }));

      return updatedProduct;
    } catch (err) {
      set((state) => ({
        products: products,
      }));
      set({ isLoading: false, message: err.response?.data?.message || "Failed to toggle product status" });
      console.error("Error toggling product status", err);
    }
  },
}));

export default useProductStore;
