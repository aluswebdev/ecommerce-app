import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "../reusableComponent/Text";
import useAuthStore from "../zustand/authStore";
import { useCartStore } from "../zustand/cartStore";
import { Ionicons } from "@expo/vector-icons";
// import BottomSheet from "@gorhom/bottom-sheet";
import API from "../api/axiosAPI";

const CheckoutScreen = () => {
  const router = useRouter();
  const { sellerId } = useLocalSearchParams();

  const { token, user } = useAuthStore();
  const { items, fetchCart } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(
    user?.address || "Freetown, Sierra Leone"
  );
  const deliveryFee = 20_000; // fixed delivery fee for now
  

  useEffect(() => {
    if (token) fetchCart(token);
  }, [token, fetchCart]);

  // Filter items by seller
  const sellerItems = useMemo(() => {
    return items.filter((i) => i.product?.seller?._id === sellerId);
  }, [items, sellerId]);

  const sellerName = sellerItems[0].product.seller.fullName || "Unknown Seller";

  const subtotal = sellerItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalCost = subtotal + deliveryFee;

  const placeOrder = async () => {
    if (!address) {
      Alert.alert("Missing Address", "Please enter your delivery address.");
      return;
    }

    try {
      setLoading(true);

      // Axios automatically includes Authorization header from attachAuthToken()
      const res = await API.post("/orders/place", {
        sellerId,
        deliveryAddress: address,
        paymentMethod: "COD",
        items: sellerItems.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      });

      Alert.alert("Success 🎉", "Your order has been placed!", [
        {
          text: "View Order",
          onPress: () =>
            router.push({
              pathname: "/orderDetails",
              params: { orderId: res.data.order._id },
            }),
        },
      ]);
    } catch (err) {
      console.log("Place order error:", err.response?.data);

      Alert.alert(
        "Order Error",
        err?.response?.data?.message || "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <View className="px-5 py-4 bg-primary rounded-b-3xl shadow-md flex-row items-center justify-between">
        <Text className="text-white text-lg font-bold">Checkout</Text>
        <Ionicons name="wallet" size={23} color="white" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 18 }}>
        {/* Seller Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seller</Text>
          <Text className="text-base font-semibold">
            {" "}
            <Text className="text-[#1e40af]">{sellerName}</Text>
          </Text>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>

          {sellerItems.map((item) => (
            <View key={item.product._id} style={styles.itemCard}>
              <Text style={styles.itemTitle}>{item.product.title}</Text>
              <Text style={styles.itemInfo}>
                Qty: {item.quantity} × SLE {item.product.price.toFixed(2)}
              </Text>
              <Text style={styles.itemPrice}>
                SLE {(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>

          <View style={styles.addressBox}>
            <Text className="text-base">{address}</Text>
          </View>
        </View>

        {/* Payment method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentBox}>
            <Ionicons name="cash-outline" size={20} color="green" />
            <TouchableOpacity
              className="ml-2 text-base font-semibold"
              onPress={() => router.push("./paymentmethod")}
            >
              <Text>Choose Payment Method (CPM)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>SLE {subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>Delivery Fee</Text>
            <Text>SLE {deliveryFee.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text className="font-bold">Total</Text>
            <Text className="font-bold text-green-700">
              SLE {totalCost.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={placeOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.placeOrderText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  section: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  itemCard: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemTitle: { fontWeight: "600", marginBottom: 2 },
  itemInfo: { fontSize: 13, color: "#555" },
  itemPrice: { fontWeight: "700", marginTop: 3 },
  addressBox: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 10,
    marginTop: 6,
  },
  paymentBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef8ee",
    padding: 12,
    borderRadius: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  placeOrderBtn: {
    backgroundColor: "#1e40af",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
