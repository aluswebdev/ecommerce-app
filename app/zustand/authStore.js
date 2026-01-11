import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeJWT } from "../api/decodeJWT"; // ✅ updated

import API, { attachAuthToken } from "../api/axiosAPI";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const useAuthStore = create((set, get) => ({
  user: null,
  role: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  message: null,

  api: API,

  // 🔹 Load auth on app start
  loadAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");

      if (token && user) {
        attachAuthToken(token);
        set({
          token,
          user: JSON.parse(user),
          role: JSON.parse(user).role,
          isAuthenticated: true,
        });
      }
    } catch {
      set({ token: null, user: null, isAuthenticated: false });
    }
  },

  // 🔹 LOGIN
  login: async (form) => {
    try {
      set({ loading: true });
      const res = await API.post("/auth/login", form);
      const { token, user } = res.data;

      await AsyncStorage.multiSet([
        ["token", token],
        ["user", JSON.stringify(user)],
      ]);

      attachAuthToken(token);

      set({
        token,
        user,
        role: user.role,
        isAuthenticated: true,
        loading: false,
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: res.data.message || "Login successful ✅",
      });

      router.replace(user.role === "seller" ? "../(seller)/" : "../(buyer)/");
    } catch (err) {
      set({ loading: false });
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: err?.response?.data?.message,
      });
      throw err;
    }
  },

  // 🔹 REGISTER (FIXED)
  register: async (form) => {
    try {
      set({ loading: true });
      const res = await API.post("/auth/signup", form);
      const { token, user } = res.data; // ✅ USE REAL USER

      await AsyncStorage.multiSet([
        ["token", token],
        ["user", JSON.stringify(user)],
      ]);

      attachAuthToken(token);

      set({
        token,
        user,
        role: user.role,
        isAuthenticated: true,
        loading: false,
      });

      Toast.show({
        type: "success",
        text1: "Account created 🎉",
        text2: res.data.message || "Welcome!",
      });

      router.replace(user.role === "seller" ? "../(seller)/" : "../(buyer)/");
    } catch (err) {
      set({ loading: false });
      Toast.show({
        type: "error",
        text1: "Signup failed",
        text2: err?.response?.data?.message,
      });
      throw err;
    }
  },

  // 🔹 LOGOUT
  logout: async () => {
    await AsyncStorage.multiRemove(["token", "user"]);
    attachAuthToken(null);
    set({ token: null, user: null, role: null, isAuthenticated: false });
    router.replace("/login");
  },

  loadUser: async () => {
    const token = await AsyncStorage.getItem("token");
    const userData = await AsyncStorage.getItem("user");
    if (token && userData) {
      set({ token, user: JSON.parse(userData) });
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    console.log("changePassword called with:", currentPassword, newPassword);

    try {
      set({ loading: true });
      const res = await API.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      Toast.show({
        type: "success",
        text1: "Success",
        text2: res.data.message || "Password changed successfully ✅",
        position: "top",
      });
      set({ loading: false });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: `${currentPassword === newPassword ? "Same Password" : "Password too weak"}`,
        text2: err?.response?.data?.message || "Something went wrong ❌",
        text2NumberOfLines: 5,
        position: "top",
      });
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
