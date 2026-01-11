import { create } from "zustand";
import { Appearance } from "react-native";

const getSystemTheme = () => Appearance.getColorScheme() || "light";

const useThemeStore = create((set) => ({
  themeMode: "system", // 'light' | 'dark' | 'system'
  setThemeMode: (mode) => set({ themeMode: mode }),
  currentTheme: getSystemTheme(),
  updateSystemTheme: () =>
    set({ currentTheme: Appearance.getColorScheme() || "light" }),
}));

export default useThemeStore;
