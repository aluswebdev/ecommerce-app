// zustand/sellerStore.js
import { create } from "zustand";
import API from "../../api/axiosAPI";
import Toast from "react-native-toast-message";

const useSellerStore = create((set) => ({
  profile: null,
  loading: false,
  isFollowing: false,
  followersCount: 0,

  initFollowState: (sellerProfile) => {
    const userId = sellerProfile?.currentUserId; // optional helper
    const followers = sellerProfile?.followers || [];

    set({
      isFollowing: followers.includes(userId),
      followersCount: followers.length,
    });
  },

  fetchSellerProfile: async () => {
    set({ loading: true });
    try {
      const res = await API.get("/seller-profile/profile");
      set({ profile: res.data, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  updateSellerProfile: async (data) => {
    const res = await API.put("/seller-profile/update", data);
    set({ profile: res.data.sellerProfile });
  },

  toggleFollow: async (sellerId) => {
    try {
      set({ loading: true });

      const res = await API.post(`/seller-profile/${sellerId}/follow`);

      set({
        isFollowing: res.data.following,
        followersCount: res.data.followersCount,
        loading: false,
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.response?.data?.message || "Follow action failed",
      });
      set({ loading: false });
    }
  },

  resetFollow: () => {
    set({ isFollowing: false, followersCount: 0 });
  },
}));

export default useSellerStore;
