// import { ShoppingCart, Bell } from "lucide-react-native";
// import { useEffect, useState } from "react";
// import { Image, TouchableOpacity, View, Text } from "react-native";
// import { useCartStore } from "../zustand/cartStore";
// import useAuthStore from "../zustand/authStore";
// import { useRouter } from "expo-router";
// import ProfileAvatar from "../buyerComponentUI/profilevatar";

// // ✅ components/Header.js
// export const Header = ({ username, onProfilePress, onCartPress }) => {
//   const { items, fetchCart } = useCartStore();
//   const { user, loadUser, isAuthenticated } = useAuthStore();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) return;
//     loadUser();
//     fetchCart();
//   }, [fetchCart, loadUser, isAuthenticated]);

//   const [notificationCount, setNotificationCount] = useState(1);
//   // const [cartCount, setCartCount] = useState(1);

//   return (
//     <View className="bg-primary flex-row items-center justify-between rounded-b-3xl shadow-md">
//       {/* <View className="ml-5 mt-2"> */}
//       <Image
//         source={require("../../assets/images/ECOMM1.png")} // 🧠 Replace with your actual logo path
//         className="h-24 w-24 ml-2 "
//         resizeMode="contain"
//       />
//       {/* </View> */}
//       <View className="flex-row items-center gap-7 mr-5">
//         {/* 🔔 Notification Icon with Count */}
//         <TouchableOpacity onPress={() => console.log("Notifications")}>
//           <View className="relative">
//             <Bell color="white" size={24} />
//             {notificationCount > 0 && (
//               <View className="absolute -top-1 -right-1 bg-red-500 h-4 w-4 rounded-full items-center justify-center">
//                 <Text className="text-white text-[10px] font-bold">
//                   {notificationCount}
//                 </Text>
//               </View>
//             )}
//           </View>
//         </TouchableOpacity>

//         {/* 🛒 Cart Icon with Count */}
//         <TouchableOpacity onPress={() => router.push("../(buyer)/cart")}>
//           <View className="relative">
//             <ShoppingCart color="white" size={24} />
//             {items.length > 0 && (
//               <View className="absolute -top-1 -right-1 bg-red-500 h-4 w-4 rounded-full items-center justify-center">
//                 <Text className="text-white text-[10px] font-bold">
//                   {items.length}
//                 </Text>
//               </View>
//             )}
//           </View>
//         </TouchableOpacity>

//         {/* 👤 User Profile */}
//         <TouchableOpacity onPress={() => router.push("../(buyer)/profile")}>
//           {user && <ProfileAvatar user={user} size={36} />}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// Header.js
import { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View, Text, Animated } from "react-native";
import { ShoppingCart, Bell } from "lucide-react-native";
import { BlurView } from "expo-blur";
import { useCartStore } from "../zustand/cartStore";
import useAuthStore from "../zustand/authStore";
import useBuyerStore from "../zustand/buyerStore/buyerStore";
import { useRouter } from "expo-router";
import { io } from "socket.io-client";
import ProfileAvatar from "../buyerComponentUI/profilevatar";
// import Glow from "../skia/glow";

// ---- Skia Glow ----
import {
  Canvas,
  Rect,
  Blur,
  useLoop,
  interpolate,
} from "@shopify/react-native-skia";

const Glow = () => {
  const loop = useLoop({ duration: 2000 });
  const opacity = interpolate(loop, [0, 1], [0.2, 0.7]);

  return (
    <Canvas style={{ width: 90, height: 90, position: "absolute" }}>
      <Rect x={0} y={0} width={80} height={80} color="white" opacity={opacity}>
        <Blur blur={20} />
      </Rect>
    </Canvas>
  );
};

// ------------------------------------------------------

export const Header = () => {
  const router = useRouter();

  const { items, fetchCart } = useCartStore();
  const { user, loadUser, isAuthenticated } = useAuthStore();
  const { fetchBuyerProfile } = useBuyerStore();

  const [notificationCount, setNotificationCount] = useState(0);


  // ---- Animated cart bounce ----
  const bounce = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (items.length > 0) {
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [items.length, bounce]);

  // ---- Load user + cart ----
  useEffect(() => {
    if (!isAuthenticated) return;
    loadUser();
    fetchBuyerProfile();
    fetchCart();
  }, [isAuthenticated, fetchBuyerProfile, fetchCart, loadUser]);

  // ---- Real-time notifications ----
  useEffect(() => {
    const socket = io("https://your-server.com");

    socket.on("new-notification", () => {
      setNotificationCount((prev) => prev + 1);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <BlurView
      intensity={100}
      tint="dark"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <View className="bg-primary/90 backdrop-blur-lg flex-row items-center justify-between rounded-b-3xl shadow-md py-3">
        {/* ---- Logo + Skia Glow ---- */}
        <View className="ml-3 relative">
          {/* <Glow /> */}
          <Image
            source={require("../../assets/images/ECOMM1.png")}
            className="h-20 w-20"
            resizeMode="contain"
          />
        </View>

        <View className="flex-row items-center gap-7 mr-5">
          {/* ---- Notifications ---- */}
          <TouchableOpacity
            onPress={() => router.push("../(buyer)/notifications")}
          >
            <View className="relative">
              <Bell color="white" size={24} />
              {notificationCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 h-4 w-4 rounded-full items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">
                    {notificationCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* ---- Cart with bounce ---- */}
          <TouchableOpacity onPress={() => router.push("../(buyer)/cart")}>
            <View className="relative">
              <ShoppingCart color="white" size={24} />

              {items.length > 0 && (
                <Animated.View
                  style={{
                    transform: [{ scale: bounce }],
                    position: "absolute",
                    top: -4,
                    right: -4,
                  }}
                >
                  <View className="bg-red-500 h-4 w-4 rounded-full items-center justify-center">
                    <Text className="text-white text-[10px] font-bold">
                      {items.length}
                    </Text>
                  </View>
                </Animated.View>
              )}
            </View>
          </TouchableOpacity>

          {/* ---- Profile ---- */}
          <TouchableOpacity onPress={() => router.push("../(buyer)/profile")}>
            {user && <ProfileAvatar user={user} size={36} />}
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
};
