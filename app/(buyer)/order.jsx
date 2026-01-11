// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { MaterialIcons, Ionicons } from "@expo/vector-icons";
// import { dummyOrders } from "../components/orderjson";

// import { router } from "expo-router";

// // Dummy backend data

// const statusColors = {
//   Pending: "#f59e0b",
//   Processing: "#3b82f6",
//   Shipped: "#8b5cf6",

//   Delivered: "#10b981",
// };

// const Tab = createMaterialTopTabNavigator();

// const OrdersList = ({ status }) => {
//   const [loading, setLoading] = useState(true);
//   const [orders, setOrders] = useState([]);

//   const orderDetails = dummyOrders.find((o) => o.status === status);
//   // console.log(orderDetails);

//   useEffect(() => {
//     setTimeout(() => {
//       const filtered = dummyOrders.filter((o) => o.status === status);
//       setOrders(filtered);
//       setLoading(false);
//     }, 700);
//   }, [status]);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-50">
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text className="text-gray-500 mt-2">Loading {status} orders...</Text>
//       </View>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-50 px-5">
//         <MaterialIcons name="inventory" size={50} color="#9ca3af" />
//         <Text className="text-gray-800 mt-3 font-semibold">
//           No {status.toLowerCase()} orders
//         </Text>
//         <Text className="text-gray-500 text-sm text-center mt-1">
//           Once you place orders, they’ll appear here.
//         </Text>
//       </View>
//     );
//   }

//   console.log(orders);

//   return (
//     <ScrollView className="flex-1 bg-gray-50 px-3 pt-3">
//       {orders.map((order) => (
//         <View
//           key={order._id}
//           className="bg-white rounded-2xl mb-4 p-4 shadow-sm border border-gray-100"
//         >
//           <View className="flex-row items-center justify-between mb-3">
//             <View>
//               <Text className="font-semibold text-gray-900">
//                 Order #{order._id}
//               </Text>
//               <Text className="text-xs text-gray-500 mt-1">{order.date}</Text>
//             </View>
//             <View
//               style={{ backgroundColor: statusColors[order.status] }}
//               className="px-3 py-1 rounded-full"
//             >
//               <Text className="text-white text-xs font-semibold">
//                 {order.status}
//               </Text>
//             </View>
//           </View>

//           {order.products.map((item) => (
//             <View
//               key={item.id}
//               className="flex-row items-center justify-between mb-2"
//             >
//               <View className="flex-row items-center">
//                 <Image
//                   source={{ uri: item.image }}
//                   className="h-12 w-12 rounded-lg mr-3"
//                 />
//                 <View>
//                   <Text className="text-sm font-semibold text-gray-800">
//                     {item.title}
//                   </Text>
//                   <Text className="text-xs text-gray-500">
//                     Qty: {item.quantity}
//                   </Text>
//                 </View>
//               </View>
//               <Text className="text-sm font-semibold text-gray-900">
//                 ${item.price}
//               </Text>
//             </View>
//           ))}

//           <View className="mt-3 border-t border-gray-200 pt-3 flex-row justify-between">
//             <Text className="text-gray-600 font-medium">Total</Text>
//             <Text className="text-gray-900 font-bold">
//               ${order.totalAmount}
//             </Text>
//           </View>

//           {order.status === "Shipped" && (
//             <TouchableOpacity
//               className="mt-3 bg-indigo-600 py-2.5 rounded-xl flex-row items-center justify-center"
//               onPress={
//                 () => router.push(`../orderTrack/${order._id}`) // <-- string path
//               }
//             >
//               <MaterialIcons name="local-shipping" size={18} color="white" />
//               <Text className="text-white font-medium ml-2">Track Order</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default function OrdersScreen() {
//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       {/* Header */}
//       <View className="px-5 py-4 bg-primary rounded-b-3xl shadow-md flex-row items-center justify-between mt-[-30]">
//         <Text className="text-white text-lg font-bold">My Orders</Text>
//         <Ionicons name="receipt" size={24} color="white" />
//       </View>

//       <Tab.Navigator
//         screenOptions={{
//           tabBarLabelStyle: { fontSize: 13, fontWeight: "600" },
//           tabBarIndicatorStyle: { backgroundColor: "#2563eb", height: 3 },
//           tabBarStyle: { backgroundColor: "white", elevation: 1 },
//           tabBarActiveTintColor: "#2563eb",
//           tabBarInactiveTintColor: "#9ca3af",
//         }}
//       >
//         <Tab.Screen name="Pending">
//           {() => <OrdersList status="Pending" />}
//         </Tab.Screen>
//         <Tab.Screen name="Processing">
//           {() => <OrdersList status="Processing" />}
//         </Tab.Screen>
//         <Tab.Screen name="Shipped">
//           {() => <OrdersList status="Shipped" />}
//         </Tab.Screen>
//         <Tab.Screen name="Delivered">
//           {() => <OrdersList status="Delivered" />}
//         </Tab.Screen>
//       </Tab.Navigator>
//     </SafeAreaView>
//   );
// }

// screens/BuyerOrdersScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Text } from "../reusableComponent/Text";
import {
  initSocket,
  getSocket,
  disconnectSocket,
} from "../services/socketClient";
import useAuthStore from "../zustand/authStore";
import { useRouter } from "expo-router";
import API from "../api/axiosAPI";

const BuyerOrdersScreen = () => {
  const { token, user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;
    fetchOrders();

    if (!user) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    const socket = initSocket(token);
    socket.on("orderCreated", (payload) => {
      // if new order for this buyer, prepend
      if (
        payload?.order?.buyer === user._id ||
        payload?.order?.buyer === undefined
      ) {
        setOrders((prev) => [payload.order, ...prev]);
      }
    });

    socket.on("orderUpdated", ({ orderId, status, order }) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: status } : o))
      );
    });

    return () => {
      socket.off("orderCreated");
      socket.off("orderUpdated");
      disconnectSocket();
    };
  }, [token, fetchOrders]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/orders/buyer`);
      setOrders(res.data);
    } catch (err) {
      console.warn("fetch buyer orders error", err);
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
                pathname: "/orderDetails",
                params: { orderId: item._id },
              })
            }
          >
            <Text style={styles.title}>Order: {item._id.slice(-6)}</Text>
            <Text>
              {item.items.length} items — SLE {item.totalPrice.toFixed(2)}
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

export default BuyerOrdersScreen;
