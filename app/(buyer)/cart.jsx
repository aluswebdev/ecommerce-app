import React, { useCallback, useEffect, useMemo } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useCartStore } from "../zustand/cartStore";
import useAuthStore from "../zustand/authStore";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import EmptyCartPrompt from "../components/emptyCartPrompt";
import { Text } from "../reusableComponent/Text";

const CartScreen = () => {
  const { token, isAuthenticated } = useAuthStore();
  const { items, fetchCart, updateQuantity, removeFromCart, loading } =
    useCartStore();
  const router = useRouter();

  // Fetch cart when screen loads
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart(token);
    }
  }, [isAuthenticated, token, fetchCart]);

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated && token) {
        fetchCart(token);
      }
    }, [isAuthenticated, token, fetchCart])
  );

  // Group items by seller
  const groupedBySeller = useMemo(() => {
    const groups = {};

    items?.forEach((item) => {
      if (!item?.product?.seller?._id) return;

      const sellerId = item.product.seller._id;
      const sellerName = item.product.seller.storeName || "Seller";

      if (!groups[sellerId]) {
        groups[sellerId] = {
          sellerId,
          sellerName,
          products: [],
          total: 0,
        };
      }

      groups[sellerId].products.push(item);
      groups[sellerId].total += item.product.price * item.quantity;
    });

    return Object.values(groups);
  }, [items]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#009688" />
      </View>
    );
  }

  if (!items?.length) return <EmptyCartPrompt />;

  const renderProduct = (item) => {
    return (
      <View style={styles.productCard}>
        <Image
          source={{ uri: item.product.images[0].url }}
          style={styles.productImage}
        />

        <View style={styles.productInfo}>
          <Text style={styles.title}>{item.product.title}</Text>
          <Text style={styles.price}>SLE {item.product.price.toFixed(2)}</Text>
          <Text className="text-sm text-gray-500">
            {item.product.condition}
          </Text>

          {/* Quantity row */}
          <View style={styles.quantityRow}>
            <TouchableOpacity
              onPress={() =>
                updateQuantity(
                  item.product._id,
                  Math.max(1, item.quantity - 1),
                  token
                )
              }
            >
              <AntDesign name="minuscircleo" size={22} color="#555" />
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={() =>
                updateQuantity(item.product._id, item.quantity + 1, token)
              }
            >
              <AntDesign name="pluscircleo" size={22} color="#1e40af" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => removeFromCart(item.product._id, token)}
        >
          <Feather name="trash-2" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSellerBlock = ({ item }) => {
    const sellerName =
      item.products[0]?.product?.seller?.fullName || "Unknown seller";

    return (
      <ScrollView>
        <View style={styles.sellerContainer}>
          {/* Seller Header */}
          <Text style={styles.sellerName}>
            Seller: <Text className="text-[#1e40af]">{sellerName}</Text>
          </Text>

          {/* Products for this seller */}
          {item.products.map((p) => (
            <View key={p.product._id}>{renderProduct(p)}</View>
          ))}

          {/* Subtotal */}
          <View style={styles.summaryRow}>
            <Text className="font-semibold">Subtotal</Text>
            <Text className="font-bold text-green-600">
              SLE {item.total.toFixed(2)}
            </Text>
          </View>

          {/* Proceed to checkout */}
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() =>
              router.push({
                pathname: "../checkout/checkoutScreen",
                params: {
                  sellerId: item.sellerId,
                },
              })
            }
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      {/* Header */}
      <View className="px-5 py-4 bg-primary rounded-b-3xl shadow-md flex-row items-center justify-between">
        <Text className="text-white text-lg font-bold">My Cart</Text>
        <Ionicons name="cart" size={24} color="white" />
      </View>

      {/* Seller groups */}
      <FlatList
        data={groupedBySeller}
        keyExtractor={(item) => item.sellerId}
        renderItem={renderSellerBlock}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  sellerContainer: {
    backgroundColor: "#f8f9fb",
    borderRadius: 16,
    padding: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  sellerName: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  productCard: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    elevation: 2,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  productInfo: { flex: 1 },
  title: { fontWeight: "600", marginBottom: 4 },
  price: { color: "#009688", fontWeight: "bold", marginBottom: 2 },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  removeBtn: { justifyContent: "center", paddingLeft: 12 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingVertical: 10,
  },
  checkoutBtn: {
    backgroundColor: "#1e40af",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  checkoutText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
