import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import useOrderStore from "../zustand/public/orderStore";

const STATUS_COLORS = {
  PENDING: "#f0ad4e",
  CONFIRMED: "#5bc0de",
  PACKED: "#0275d8",
  SHIPPED: "#5cb85c",
  OUT_FOR_DELIVERY: "#f0ad4e",
  DELIVERED: "#5cb85c",
  CANCELLED: "#d9534f",
};

const STATUS_FLOW = [
  "PENDING",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export default function SellerOrderCard({ order, onPress }) {
  const { updateOrderStatus } = useOrderStore();

  const { _id, items, total, status, createdAt } = order;

  const formattedDate = new Date(createdAt).toLocaleString();

 const nextStatus = () => STATUS_FLOW[items.status] || null;

  const handleStatusUpdate = () => {
    const newStatus = nextStatus();
    if (!newStatus) {
      Alert.alert("Info", "Order already delivered or cancelled.");
      return;
    }
    updateOrderStatus(_id, newStatus);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(_id)}>
      <View style={styles.header}>
        <Text style={styles.id}>Order Id: {_id.slice(-6).toUpperCase()}</Text>
        <Text
          style={[styles.status, { color: STATUS_COLORS[status] || "#333" }]}
        >
          {status.replaceAll("_", " ")}
        </Text>
      </View>

      <View style={styles.items}>
        {items.slice(0, 3).map((item) => (
          <View key={item.productId._id} style={styles.itemRow}>
            {/* <Image
              source={{ uri: item.productId.images?.[0] }}
              style={styles.image}
              resizeMode="cover"
            /> */}
            <View style={styles.itemInfo}>
              <Text style={styles.title}>{item.productId.title}</Text>
              <Text style={styles.quantity}>Qty: {item.quantity}</Text>
              <Text style={styles.price}>Price: {item.price} SLE</Text>
            </View>
          </View>
        ))}
        {items.length > 3 && (
          <Text style={styles.moreItems}>+{items.length - 3} more items</Text>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>Total: {total} SLE</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: STATUS_COLORS[nextStatus()] || "#0275d8" },
        ]}
        onPress={handleStatusUpdate}
        disabled={!nextStatus()}
      >
        <Text style={styles.buttonText}>
          {nextStatus()
            ? `Mark as ${nextStatus().replaceAll("_", " ")}`
            : items.status === "CANCELLED"
              ? "Cancelled"
              : "Completed"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  id: { fontWeight: "bold", fontSize: 14 },
  status: { fontWeight: "bold", fontSize: 14 },
  items: { marginBottom: 8 },
  itemRow: { flexDirection: "row", marginBottom: 6, alignItems: "center" },
  image: { width: 50, height: 50, borderRadius: 6, marginRight: 8 },
  itemInfo: { flex: 1 },
  title: { fontWeight: "600", fontSize: 14 },
  quantity: { fontSize: 12, color: "#555" },
  price: { fontSize: 12, color: "#555" },
  moreItems: { fontSize: 12, color: "#999", marginLeft: 58 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  total: { fontWeight: "bold" },
  date: { fontSize: 12, color: "#777" },
  button: {
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
