import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/analytics"; // 🔧 Update for your server

const useAnalyticsStore = create((set) => ({
  topSelling: [],
  mostViewed: [],
  categorySales: [],
  orderSummary: [],
  loading: false,
  error: null,

  fetchAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      const [topRes, viewRes, catRes, orderRes] = await Promise.all([
        axios.get(`${API_URL}/top-selling`),
        axios.get(`${API_URL}/most-viewed`),
        axios.get(`${API_URL}/category-sales`),
        axios.get(`${API_URL}/orders-summary`),
      ]);

      set({
        topSelling: topRes.data.products,
        mostViewed: viewRes.data.products,
        categorySales: catRes.data.categoryStats,
        orderSummary: orderRes.data.summary,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useAnalyticsStore;
