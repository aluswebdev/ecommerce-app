import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../src/constant/theme";
import { useColorScheme as useTailwindColorScheme } from "nativewind";

const getTabBarIcon = (size, color, iconName) => {
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function BuyerLayout() {
  const { colorScheme } = useTailwindColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: isDark ? "#121212" : "#fff",
          borderTopWidth: 3,
          borderColor: "#0057b8",
          paddingBottom: 8,
          // height: 100,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
        },
      }}
      className="font-body"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Products",
          tabBarIcon: ({ size, color }) => {
            return getTabBarIcon(size, color, "pricetags-outline");
          },
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ size, color }) => {
            return getTabBarIcon(size, color, "receipt-outline");
          },
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ size, color }) => {
            return getTabBarIcon(size, color, "bar-chart-outline");
          },
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ size, color }) => {
            return getTabBarIcon(size, color, "wallet-outline");
          },
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chats",
          tabBarIcon: ({ size, color }) => {
            return getTabBarIcon(size, color, "chatbubbles-outline");
          },
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }) => {
            return getTabBarIcon(size, color, "settings-outline");
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => {
            return getTabBarIcon(size, color, "person-circle-outline");
          },
        }}
      />
    </Tabs>
  );
}
