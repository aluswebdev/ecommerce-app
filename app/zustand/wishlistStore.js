import { create } from "zustand";
import API from "../api/axiosAPI";
import Toast from "react-native-toast-message";


export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  isLoading: false,
  message: null,

  fetchWishlist: async () => {
    try {
      set({ isLoading: true });
      const res = await API.get("/wishlists/wishlistproduct");
 
      set({ wishlist: res.data, isLoading: false });
    } catch (error) {
      set({
        message: error.response.data.message || "Fail to fetch user wishlist",
        isLoading: false,
      });
      console.log("Error in zustand fetch user wishlist", error.message);
    }
  },

  
  addWishlist: async (product) => {
    try {
      const data = await API.post(`/wishlists/wishlist`, {product});
      set((state) => ({
        wishlist: [...state.wishlist, data.data.data],
      }));
       Toast.show({
              type: "success",
              text1: "Success",
              text2: data.data.message || "Product added to wishlist successfully ✅",
              position: "top",
            });
      
    } catch (err) {
      console.error("❌ Error adding to wishlist:", err.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.response?.data?.message || "Something went wrong ❌",
        position: "top",
      });
    }
  },


  removeWishlist: async (productId) => {
    try {
      
      await API.delete(`/wishlists/${productId}`)
      set((state) => ({
        wishlist: state.wishlist.filter((item) => item.product._id !== productId)
      }));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Product removed from wishlist successfully ✅",
        position: "top",
      });
    } catch (error) {
      console.error("❌ Error removing wishlist:", error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Something went wrong ❌",
        position: "top",
      });
    }
  },

  isInWishlist: async (productId) => {
    try {
      const res = await API.get(`/wishlists/check/${productId}`);
      return res.data.inWishlist;
    } catch (error) {
      console.error("❌ Error checking wishlist:", error.message);
      return false;
    }
  }
}));

