// screens/MyOrdersScreen.js
import { View, Text, FlatList } from "react-native";

const dummyOrders = [
  { id: "1", date: "2025-07-01", status: "Delivered", total: "$35.00" },
  { id: "2", date: "2025-06-28", status: "Shipped", total: "$120.99" },
];

export default function MyOrdersScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">My Orders</Text>
      <FlatList
        data={dummyOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-4 p-4 border border-gray-200 rounded-lg">
            <Text className="text-base font-semibold">Order #{item.id}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Total: {item.total}</Text>
          </View>
        )}
      />
    </View>
  );
}
