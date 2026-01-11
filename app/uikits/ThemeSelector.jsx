import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Appearance } from "react-native";
import { RadioButton } from "react-native-paper";
import useThemeStore from "../zustand/useThemeStore"; // adjust the path

const ThemeSelector = () => {
  const { themeMode, setThemeMode, updateSystemTheme } = useThemeStore();

  // Listen to system theme change if mode is "system"
  useEffect(() => {
    const subscription = Appearance.addChangeListener(() => {
      updateSystemTheme();
    });
    return () => subscription.remove();
  }, [themeMode, updateSystemTheme]);

  return (
    <View className="p-4">
      <Text className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
        Theme Settings
      </Text>

      <TouchableOpacity
        onPress={() => setThemeMode("system")}
        className="mb-2 flex-row items-center"
      >
        <RadioButton
          value="system"
          status={themeMode === "system" ? "checked" : "unchecked"}
          onPress={() => setThemeMode("system")}
        />
        <Text className="ml-2 text-gray-800 dark:text-white">
          Use System Theme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setThemeMode("light")}
        className="mb-2 flex-row items-center"
      >
        <RadioButton
          value="light"
          status={themeMode === "light" ? "checked" : "unchecked"}
          onPress={() => setThemeMode("light")}
        />
        <Text className="ml-2 text-gray-800 dark:text-white">Light Mode</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setThemeMode("dark")}
        className="flex-row items-center"
      >
        <RadioButton
          value="dark"
          status={themeMode === "dark" ? "checked" : "unchecked"}
          onPress={() => setThemeMode("dark")}
        />
        <Text className="ml-2 text-gray-800 dark:text-white">Dark Mode</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemeSelector;
