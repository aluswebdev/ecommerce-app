import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../src/constant/theme";
import { useColorScheme as useTailwindColorScheme } from "nativewind";
import { Platform } from "react-native";

const getTabBarIcon = (size, color, iconName) => {
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function AdminLayout() {
  const { colorScheme } = useTailwindColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        // tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 11, // smaller so it doesn’t cut off
          marginBottom: Platform.OS === "android" ? 2 : 4,
        },
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: isDark ? "#121212" : "#fff",
          borderTopWidth: 3,
          borderColor: "#0057b8",
        //   height: tabBarHeight,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dash",
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(size, color, "speedometer"),
        }}
      />
      <Tabs.Screen
        name="categorychart"
        options={{
          title: "Cats",
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(size, color, "pie-chart"),
        }}
      />
      <Tabs.Screen
        name="mostview"
        options={{
          title: "Views",
          tabBarIcon: ({ color, size }) => getTabBarIcon(size, color, "eye"),
        }}
      />
      <Tabs.Screen
        name="topselling"
        options={{
          title: "Sales",
          tabBarIcon: ({ color, size }) => getTabBarIcon(size, color, "flame"),
        }}
      />
      <Tabs.Screen
        name="ordersummery"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) =>
            getTabBarIcon(size, color, "receipt-outline"),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => getTabBarIcon(size, color, "people"),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Prods",
          tabBarIcon: ({ color, size }) => getTabBarIcon(size, color, "cube"),
        }}
      />
    </Tabs>
  );
}
