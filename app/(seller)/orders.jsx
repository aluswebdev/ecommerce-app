// screens/SellerOrdersScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Text } from "../reusableComponent/Text";
import { initSocket, disconnectSocket } from "../services/socketClient";
import useAuthStore from "../zustand/authStore";
import { useRouter } from "expo-router";
import API from "../api/axiosAPI";

const SellerOrdersScreen = () => {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    fetchOrders();

    const socket = initSocket(token);
    socket.on("orderCreated", (payload) => {
      if (payload?.order?.seller) {
        // new order for seller
        setOrders((prev) => [payload.order, ...prev]);
      }
    });

    socket.on("orderUpdated", ({ orderId, status }) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: status } : o))
      );
    });

    return () => {
      socket.off("orderCreated");
      socket.off("orderUpdated");
      disconnectSocket();
    };
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/orders/seller`);
      // const data = await res.json();
      setOrders(res.data);
    } catch (err) {
      console.warn("fetch seller orders error", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={orders}
        keyExtractor={(o) => o._id}
        renderItem={({ item }) => (
          
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "../orderTrack/orderdetails",
                params: { orderId: item._id },
              })
            }
          >
            <Text style={styles.title}>Order: {item._id.slice(-6)}</Text>
            <Text>Buyer: {item.buyer?.fullName || item.buyer?.email}</Text>
            <Text>
              Items: {item.items.length} — Total SLE{" "}
              {item.totalPrice.toFixed(2)}
            </Text>
            <Text>Status: {item.orderStatus}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  title: { fontWeight: "700", marginBottom: 6 },
});

export default SellerOrdersScreen;

