import { create } from "zustand";
import API from "../../api/axiosAPI";
import Toast from "react-native-toast-message";

const useBuyerStore = create((set) => ({
  buyer: null,
  addresses: [],
  loading: false,
  error: null,

  fetchBuyerProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await API.get("/buyer-profile/profile");
      set({ buyer: res.data, loading: false });
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  updateBuyerProfile: async (updates) => {
    set({ loading: true, error: null });
    try {
      const res = await API.put("/buyer-profile/update", updates);
      set({ buyer: res.data.user, loading: false });

      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2:
          res.data.message || "Your profile has been successfully updated.",
      });
      return res.data;
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: err?.response?.data?.message || err.message,
      });
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
      });
      throw err;
    }
  },

  updateAvatar: async (profilePhotoBase64) => {
    set({ loading: true, error: null });
    try {
      const res = await API.put("/buyer-profile/avatar", {
        profilePhoto: profilePhotoBase64,
      });
      set({ buyer: res.data.user, loading: false });
      return res.data;
    } catch (err) {
      set({
        error: err?.response?.data?.message || err.message,
        loading: false,
      });
      throw err;
    }
  },

  fetchAddresses: async () => {
    try {
      set({ loading: true });
      const res = await API.get("/buyer-profile/delivery-addresses");
      set({ addresses: res.data.addresses, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error(error);
    }
  },

  addAddress: async (data) => {
    try {
      set({ loading: true });
      const res = await API.post("/buyer-profile/delivery-addresses", data);
      set({ addresses: res.data.addresses, loading: false });
      Toast.show({ type: "success", text1: "Success", text2: "Address added" });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message || "Failed to add address",
      });
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      console.error(error);
    }
  },

  updateAddress: async (id, data) => {
    if (!id || !data) return;

    // Set loading state for this request
    set({ loading: true });

    try {
      const res = await API.put(
        `/buyer-profile/delivery-addresses/${id}`,
        data
      );

      // Update the addresses in the store
      set({ addresses: res.data.addresses, loading: false });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Address updated successfully",
      });
    } catch (error) {
      set({ loading: false });
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: error.response?.data?.message || "Failed to update address",
      });
      console.error("Update address error:", error);
    }
  },

  deleteAddress: async (id) => {
    try {
      set({ loading: true });

      const res = await API.delete(`/buyer-profile/delivery-addresses/${id}`);

      set({
        addresses: res.data.addresses,
        loading: false,
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Address deleted successfully",
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Delete failed",
      });

      Toast.show({
        type: "error",
        text1: "Delete Failed",
        text2: error.response?.data?.message || "Failed to delete address",
      });

      console.error("Delete address error:", error);
      throw error;
    }
  },

  setDefaultAddress: async (addressId) => {
    set({ loading: true });

    try {
      const res = await API.put(`/buyer-profile/addresses/${addressId}/default`);

      set({
        addresses: res.data.addresses,
        loading: false,
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Default Address Updated",
      });
    } catch (error) {
      set({ loading: false });
      Toast.show({
        type: "error",
        text1: "Failed to update default address",
        text2: error?.response?.data?.message,
      });
    }
  },

  clearBuyer: () => set({ buyer: null, loading: false, error: null }),
}));

export default useBuyerStore;
