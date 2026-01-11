// store/useSellerAnalyticsStore.js
import { create } from "zustand";
import API from "../../api/axiosAPI";

const useSellerAnalyticsStore = create((set) => ({
  // ================= STATE =================
  loading: false,
  error: null,

  stats: {
    revenue: 0,
    orders: 0,
    customers: 0,
    conversion: 0,
  },

  sales: {
    weekly: [],
    monthly: [],
  },

  orderStatus: [],
  topProducts: [],

  // ================= ACTIONS =================
  fetchAnalytics: async () => {
    set({ loading: true, error: null });

    try {
      const data = await API.get("/seller/analytics");

      set({
        stats: {
          revenue: data.data.revenue,
          orders: data.data.orders,
          customers: data.data.customers,
          conversion: data.data.conversion,
        },

        sales: {
          weekly: data.data.weeklySales || [], // directly use the array
          monthly: data.data.monthlySales || [],
        },

        orderStatus: data.data.orderStatus.map((item) => ({
          name: item.name,
          count: item.count,
        })),

        topProducts: data.data.topProducts,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useSellerAnalyticsStore;
