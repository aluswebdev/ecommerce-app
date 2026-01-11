import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";
import Toast from "react-native-toast-message";

import API from "../api/axiosAPI";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      fetchCart: async (token) => {
        try {
          set({ loading: true });
          const res = await API.get("/cart");

          //  fallback if res.data or res.data.items is undefined /null
          const rawItems = res?.data?.items || [];

          const validItems = rawItems.filter(
            (item) => item?.product && typeof item?.product === "object"
          );
          set({
            items: validItems,
            loading: false,
          });
        } catch (error) {
          console.error("Fetch Cart Error:", error.message);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.response?.data?.message || "Something went wrong ❌",
            position: "top",
          });
          set({ loading: false });
        }
      },

      addToCart: async (productId, quantity) => {
        try {
          const res = await API.post("/cart/add", { productId, quantity });

          // toast message
          Toast.show({
            type: "success",
            text1: "Success",
            text2: res.data.message || "Product added successfully ✅",
            position: "top",
          });

          set({ items: res.data.items });
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.response?.data?.message || "Something went wrong ❌",
            position: "top",
          });
          console.error("Add to Cart Error:", error.message);
        }
      },
      updateQuantity: async (productId, quantity) => {
        try {
          const res = await API.patch("/cart/update", { productId, quantity });

          set({ items: res.data.items });
        } catch (error) {
          console.error("Update Quantity Error:", error.message);
        }
      },

      removeFromCart: async (productId) => {
        console.log("Removing Product:", productId);

        try {
          const res = await API.delete("/cart/remove", {
            data: { productId },
          });

          // toast message
          Toast.show({
            type: "success",
            text1: "Success",
            text2: res.data.message || "Product created successfully ✅",
            position: "top",
          });

          set((state) => ({
            items: state.items.filter(
              (item) => item.product && item.product._id !== productId
            ),
          }));
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: error?.response?.data?.message || "Something went wrong ❌",
            position: "top",
          });
          console.error("Remove Item Error:", error.message);
        }
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
