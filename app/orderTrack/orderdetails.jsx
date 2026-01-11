// screens/OrderDetailsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import { Text } from "../reusableComponent/Text";
import { useLocalSearchParams } from "expo-router";
import { initSocket, disconnectSocket } from "../services/socketClient";
import useAuthStore from "../zustand/authStore";
import OrderTimeline from "../orderTimeline/orderTieline";

import API from "../api/axiosAPI";

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams();
  const { token, user } = useAuthStore();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetchOrder();

    const socket = initSocket(token);

    socket.on("orderUpdated", ({ orderId: id, status, order: fullOrder }) => {
      if (id === orderId) {
        setOrder((prev) => ({ ...prev, orderStatus: status, ...fullOrder }));
      }
    });

    return () => {
      socket.off("orderUpdated");
      disconnectSocket();
    };
  }, [token, fetchOrder]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/orders/${orderId}`);
      setOrder(res.data);
    } catch (err) {
      console.warn("fetch order detail error", err);
      Alert.alert("Error", "Could not fetch order details");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !order) return <ActivityIndicator style={{ marginTop: 40 }} />;

  const isSeller = user._id === order.seller?._id;

  return (
    <ScrollView style={{ padding: 12 }}>
      <Text style={styles.heading}>Order #{order._id}</Text>

      <View style={styles.card}>
        <Text>Seller: {order.seller?.storeName || order.seller?.fullName}</Text>
        <Text>Buyer: {order.buyer?.fullName}</Text>
        <Text>Status: {order.orderStatus}</Text>
      </View>

      <Text style={{ marginTop: 10, fontWeight: "700" }}>Items</Text>
      {order.items.map((it) => (
        <View key={it.product._id} style={styles.itemRow}>
          <Text>{it.product.title}</Text>
          <Text>Qty: {it.quantity}</Text>
          <Text>SLE {(it.price * it.quantity).toFixed(2)}</Text>
        </View>
      ))}

      <View style={{ marginTop: 12 }}>
        <Text style={{ fontWeight: "700", marginBottom: 6 }}>
          Order Timeline
        </Text>
        <OrderTimeline currentStatus={order.orderStatus} />
      </View>

      {/* If seller, show quick status update buttons */}
      {isSeller && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ marginBottom: 6, fontWeight: "700" }}>
            Update Status
          </Text>

          {["Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
            <TouchableOpacity
              key={s}
              style={[
                styles.statusBtn,
                order.orderStatus === s && styles.activeBtn,
              ]}
              onPress={async () => {
                try {
                  const res = await API.put(`/orders/status/${order._id}`);
                  if (!res.ok) throw new Error(res.data.message || "Error");
                  setOrder(res.data.order);
                } catch (err) {
                  Alert.alert("Error", err.message);
                }
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: { fontSize: 18, fontWeight: "800", marginBottom: 10 },
  card: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  itemRow: { padding: 8, borderBottomWidth: 1, borderColor: "#eee" },
  statusBtn: {
    backgroundColor: "#1e40af",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  activeBtn: { backgroundColor: "#0b66d0" },
});

export default OrderDetailsScreen;
