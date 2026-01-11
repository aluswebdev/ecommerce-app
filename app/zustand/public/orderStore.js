// stores/orderStore.js
import { create } from "zustand";
import API from "../../api/axiosAPI";
import { connectSocket } from "../../services/socketClient";

const useOrderStore = create((set, get) => ({
  buyerOrders: [],
  sellerOrders: [],
  loading: false,
  error: null,

  // --- Initialize Socket.IO for real-time updates ---
  initSocket: (token, userId, role) => {
    const socket = connectSocket(token);

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);

      // Join rooms based on role
      if (role === "buyer") socket.emit("joinUser", userId);
      if (role === "seller") socket.emit("joinUser", userId);
    });

    // New order created (buyer or seller)
    socket.on("order:created", (order) => {
      console.log("📦 New order:", order);
      if (role === "buyer" && order.buyerId === userId) {
        set((state) => ({ buyerOrders: [order, ...state.buyerOrders] }));
      }
      if (role === "seller" && order.sellerId === userId) {
        set((state) => ({ sellerOrders: [order, ...state.sellerOrders] }));
      }
    });

    // Order status update
    socket.on("order:status", ({ orderId, status }) => {
      console.log(`🔄 Order ${orderId} status updated: ${status}`);
      if (role === "buyer") {
        set((state) => ({
          buyerOrders: state.buyerOrders.map((o) =>
            o._id === orderId ? { ...o, status } : o
          ),
        }));
      }
      if (role === "seller") {
        set((state) => ({
          sellerOrders: state.sellerOrders.map((o) =>
            o._id === orderId ? { ...o, status } : o
          ),
        }));
      }
    });

    socket.on("disconnect", () => console.log("❌ Socket disconnected"));
  },

  // --- Fetch buyer orders ---
  fetchBuyerOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await API.get("/orders/my");
      set({ buyerOrders: res.data, loading: false });
    } catch (err) {
      console.error("FetchBuyerOrders error:", err);
      set({ error: err.response?.data?.error || err.message, loading: false });
    }
  },

  // --- Fetch seller orders ---
  fetchSellerOrders: async () => {
    set({ loading: true, error: null });
    try {
      const res = await API.get("/orders/my");
      set({ sellerOrders: res.data, loading: false });
    } catch (err) {
      console.error("FetchSellerOrders error:", err);
      set({ error: err.response?.data?.error || err.message, loading: false });
    }
  },

  // --- Update order status (seller only) ---
  updateOrderStatus: async (orderId, status) => {
    try {
      const res = await API.patch(`/orders/${orderId}/status`, { status });
      set((state) => ({
        sellerOrders: state.sellerOrders.map((o) =>
          o._id === orderId ? { ...o, status: res.data.status } : o
        ),
      }));
    } catch (err) {
      console.error("UpdateOrderStatus error:", err);
    }
  },

  // --- Clear orders (logout) ---
  clearOrders: () =>
    set({ buyerOrders: [], sellerOrders: [], loading: false, error: null }),
}));

export default useOrderStore;
