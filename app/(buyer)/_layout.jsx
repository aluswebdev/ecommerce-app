import { Tabs } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../src/constant/theme";
import { useColorScheme as useTailwindColorScheme } from "nativewind";
import { View } from "react-native";
import { Text } from "../reusableComponent/Text";
import { useCartStore } from "../zustand/cartStore";
import { useWishlistStore } from "../zustand/wishlistStore";

const getTabBarIcon = (size, color, iconName) => {
  return <Ionicons name={iconName} size={size} color={color} />;
};

export default function BuyerLayout() {
  const { colorScheme } = useTailwindColorScheme();
  const isDark = colorScheme === "dark";

  const { items } = useCartStore(); // get cart items
  const cartCount = items?.length || 0;

  const { wishlist } = useWishlistStore();
  const wishlistCount = wishlist?.length || 0;

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
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => {
            return getTabBarIcon(size, color, "home");
          },
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ size, color }) => {
            return (
              <View style={{ width: 28, height: 28 }}>
                <AntDesign name="heart" size={size} color={color} />

                {wishlistCount > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      right: -6,
                      top: -3,
                      backgroundColor: "red",
                      borderRadius: 10,
                      minWidth: 18,
                      height: 18,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 11,
                        fontWeight: "bold",
                      }}
                    >
                      {wishlistCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size, color }) => {
            return getTabBarIcon(size, color, "search");
          },
        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          tabBarIcon: ({ size, color }) => {
            return getTabBarIcon(size, color, "receipt");
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
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ size, color }) => {
            return (
              <View style={{ width: 28, height: 28 }}>
                <AntDesign
                  name="shop"
                  size={size}
                  color={color}
                />

                {cartCount > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      right: -6,
                      top: -3,
                      backgroundColor: "red",
                      borderRadius: 10,
                      minWidth: 18,
                      height: 18,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 11,
                        fontWeight: "bold",
                      }}
                    >
                      {cartCount}
                    </Text>
                  </View>
                )}
              </View>
            );
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
