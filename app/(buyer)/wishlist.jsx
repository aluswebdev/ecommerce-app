import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import { useWishlistStore } from "../zustand/wishlistStore";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../zustand/authStore";
import EmptyWishlistPrompt from "../components/emptyWishlist";
import { formatCurrency } from "../config/formatDate";
import { useCartStore } from "../zustand/cartStore";
import ProductCondition from "../reusableComponent/conditionCheck";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const horizontalPadding = 32; // same as px-4 (16 left + 16 right)
const cardSpacing = 8; // space between columns
const totalSpacing = cardSpacing * (numColumns - 1);

const cardWidth = (screenWidth - horizontalPadding - totalSpacing) / numColumns;

const WishlistScreen = () => {
  const { isAuthenticated, token } = useAuthStore();
  const { wishlist, fetchWishlist, isLoading, removeWishlist } =
    useWishlistStore();

    const {addToCart} = useCartStore()

  const router = useRouter();

  useEffect(() => {
    // if (!isAuthenticated && !token) return;

    fetchWishlist();
  }, [isAuthenticated, token, fetchWishlist]);

  // useFocusEffect(
  //   useCallback(() => {
  //     // if (!isAuthenticated && !token) return;
  //     if (wishlist.length === 0) {
  //       return;
  //     } else {
  //       fetchWishlist();
  //     }
  //   }, [isAuthenticated, token, fetchWishlist, wishlist])
  // );

  const handleRemoveWishlist = (id) => {
    fetchWishlist();
    removeWishlist(id);
  };

  const handleAddToCart = async(id, quantity) => {
    try {
     await addToCart(id, quantity)
     await removeWishlist(id)
    } catch (err) {
      console.log("Error adding to cart", err.message)
    }

  }

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        className="dark:bg-[#121212]"
      >
        <ActivityIndicator size="large" color="#0057b8" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <EmptyWishlistPrompt />;
  } else if (wishlist?.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Favorites Yet 💔</Text>
        <Text style={styles.subtitle}>
          Browse our marketplace and tap the heart icon to add items you love to
          your wishlist.
        </Text>

        <TouchableOpacity
          style={styles.browseBtn}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/home")}
        >
          <Text style={styles.browseText}>Browse Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="dark:bg-[#121212] flex-1">
      <View className="px-5 py-4 bg-primary rounded-b-3xl shadow-md flex-row items-center justify-between mt-[-5]">
        <Text className="text-white text-lg font-bold">My Wishlist</Text>
        <Ionicons name="bookmark" size={24} color="white" />
      </View>
      <FlatList
        key={numColumns}
        data={wishlist}
        numColumns={numColumns}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 12,
        }}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 64,
        }}
        renderItem={({ item }) => {
          if (!item) return null;

          const discountPrice =
            item.product.price -
            (item.product.price * item.product.discountPrice) / 100;

          const productLower = item.product.condition.toLowerCase();

          const imageUrl =
            item.product.images[0].url || "https://via.placeholder.com/300";

          return (
            <TouchableOpacity
              style={{ width: cardWidth }}
              className="bg-transparent rounded-xl overflow-hidden"
              onPress={() => router.push(`/utils/${item._id}`)}
            >
              <View className="relative">
                <Image
                  source={{ uri: imageUrl }}
                  className="w-full h-40"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-lg"
                  onPress={() => handleRemoveWishlist(item.product._id)}
                >
                  <Ionicons name="heart" size={24} color="#dc143c" />
                </TouchableOpacity>
              </View>

              <View className="p-2 bg-transparent">
                <Text className="text-gray-500">{item.product.category}</Text>
                <Text className="text-base font-semibold text-gray-900 dark:text-[#EDEDED]">
                  {item.product.title}
                </Text>

                {/* price and discount price */}
                <Text className="text-primary">
                  {formatCurrency(discountPrice)}
                </Text>
                <View className="flex-row gap-3">
                  <Text className="text-sm font-13 text-gray-500 line-through">
                    SLE {item.product.price.toFixed(2)}
                  </Text>
                  {item.product.discountPrice > 0 && (
                    <Text className="text-sm text-red-500">
                      -{item.product.discountPrice}%
                    </Text>
                  )}
                </View>

                {/* Condition */}
               <ProductCondition productLower={productLower}/>

                {/* in stock check */}
                <View className="flex-row justify-between items-center mt-2">
                  <View>
                    <Text
                      style={{
                        color: item.product.inStock ? "#16A34A" : "red",
                      }}
                      className="text-xs font-semibold"
                    >
                      {item.product.inStock ? "In Stock" : "Out of Stock"}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity className="bg-[#1e40af] p-3 text-white text-center" onPress={() => handleAddToCart(item.product._id, 1)}>
                <Text className="text-center text-white">Add To Cart</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
    opacity: 0.9,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  signInBtn: {
    backgroundColor: "#1E40AF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  signInText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  createBtn: {
    borderWidth: 1.5,
    borderColor: "#1E40AF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  createText: {
    color: "#1E40AF",
    fontSize: 14,
    fontWeight: "600",
  },
  browseBtn: {
    backgroundColor: "#1E40AF",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  browseText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
