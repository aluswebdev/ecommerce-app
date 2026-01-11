import { create } from "zustand";
import API from "../../api/axiosAPI";

export const useSellerStore = create((set) => ({
  products: [],
  loading: false,
  // isLoading: false,
  message: null,
  setProducts: (products) => set({ products }),

  sellerProducts: async () => {
    try {
      set({ loading: true, message: null });
      const res = await API.get("/seller/products");
      set({ products: res.data.data, loading: false, message: null });
    } catch (err) {
      set({ message: err.response.data.message });
      console.log(err.response.data.message);
    }
  },
  // Update product
  updateProduct: async (productId, updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await API.put(`/seller/${productId}`, updatedData);
      // update local state
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? res.data.product : p
        ),
        loading: false,
      }));
      return res.data.product;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to update product",
        loading: false,
      });
      throw err;
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    set({ loading: true, error: null });
    try {
      await API.delete(`/seller/${productId}`);
      // remove from local state
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
        loading: false,
      }));
      console.log("product deleted");
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to delete product",
        loading: false,
      });
      throw err;
    }
  },

  // ✅ Fetch single product by ID
  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await API.get(`/seller/${id}`);
      set({ product: res.data.product, loading: false });
    } catch (error) {
      console.error("Error fetching product by id:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch product",
        loading: false,
      });
    }
  },

  // clearProduct: () => set({ product: null }),

  toggleProductStatus: async (productId) => {
    // mark this product as loading
    set((state) => ({
      products: state.products.map((p) =>
        p._id === productId ? { ...p, isLoading: true } : p
      ),
    }));

    try {
      const res = await API.patch(`/seller/${productId}/toggle-status`);
      const updatedProduct = res.data.product;
      console.log("Product status updated:", updatedProduct.status);

      // update product status and stop spinner
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId
            ? { ...p, status: updatedProduct.status, isLoading: false }
            : p
        ),
      }));

      return updatedProduct;
    } catch (err) {
      // stop spinner only for this product
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? { ...p, isLoading: false } : p
        ),
        message:
          err.response?.data?.message || "Failed to toggle product status",
      }));
      console.error("Error toggling product status", err);
    }
  },
}));
