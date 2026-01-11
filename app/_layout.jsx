import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import i18n, { initLanguage } from "./language/i18n";
import { initSocket } from "./services/socketClient";
import useAuthStore from "./zustand/authStore";

import { useEffect, useState } from "react";
import {
  Platform,
  StatusBar,
  Appearance,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "./config/tostConfig";

import useThemeStore from "./zustand/useThemeStore";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";

export default function RootLayout() {
  const { theme, updateSystemTheme } = useThemeStore();
  const { token } = useAuthStore();
  const [ready, setReady] = useState(false);

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    (async () => {
      if (token) {
        initSocket(token);
      }
      await initLanguage(); // load saved or device language
      setReady(true);
    })();
  }, [token]);
  

  useEffect(() => {
    // fetchWishlist();
    if (loaded) {
      SplashScreen.hideAsync();
    }

    const listener = Appearance.addChangeListener(() => {
      updateSystemTheme(); // update on system change
    });

    return () => listener.remove();
  }, [loaded, updateSystemTheme]);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1E40AF" />
      </View>
    );
  }

  //  const systemScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1 bg-primary dark:bg-primary"
        edges={["top"]}
      >
        {Platform.OS === "android" && (
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={theme === "dark" ? "light-content" : "light-content"}
          />
        )}
        <Stack screenOptions={{ headerShown: false }} />
        <Toast config={toastConfig} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
