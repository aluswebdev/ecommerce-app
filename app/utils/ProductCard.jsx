import { Plus } from "lucide-react-native";
import { useCallback, useRef } from "react";
import { useWishlistStore } from "../zustand/wishlistStore";
import WishlistButton from "../uikits/WishlistButton";
import { useCartStore } from "../zustand/cartStore";
import useAuthStore from "../zustand/authStore";

import { Animated, Image, TouchableOpacity, View } from "react-native";
import { Text } from "../reusableComponent/Text";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { formatCurrency } from "../config/formatDate";

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuthStore();
  const { fetchWishlist, addWishlist, removeWishlist, isInWishlist } =
    useWishlistStore();
  const { addToCart } = useCartStore();
  console.log(product._id)

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        fetchWishlist(); // fetch fresh data every time screen is focused
      }
    }, [isAuthenticated, fetchWishlist])
  );

  const isWishlist = useWishlistStore((state) =>
    state.wishlist.some((item) => item.product._id === product._id)
  );

  const handleToggleWishlist = (id) => {
    if (!isAuthenticated) {
      // Handle unauthenticated state
      router.push("../(auth)/login");
      return;
    }
    if (isWishlist) {
      isInWishlist(id);
      return removeWishlist(id);
    } else {
      return addWishlist(id);
    }
  };

  const productLower = product.condition.toLowerCase();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const discountPrice =
    product.price - (product.price * product.discountPrice) / 100;

  const handleAddToCart = (id, quantity) => {
    if (!isAuthenticated) {
      router.push("../(auth)/login");
      return;
    }

    if (!product.inStock) return;
    addToCart(id, quantity);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`../product/${product?._id}`)}
      className="w-full rounded-xl bg-[#fff] shadow-md overflow-hidden rounded-b-r-3xl m-auto"
    >
      <View className="relative">
        <Image
          source={{ uri: product?.images[0]?.url }}
          className="w-full h-48 rounded-t-xl"
          resizeMode="cover"
        />

        <WishlistButton
          isBookmarked={isWishlist}
          onToggle={() => handleToggleWishlist(product._id)}
        />
      </View>

      <View className="p-3 relative w-full object-cover rounded-t-lg">
        <Text className="text-gray-500">{product.category}</Text>
        {/* Title + Price */}
        <Text className="text-lg text-gray-900" numberOfLines={1}>
          {product.title}
        </Text>

        <Text className="text-primary">{formatCurrency(discountPrice)}</Text>
        <View className="flex-row gap-3">
          <Text className="text-sm font-13 text-gray-500 line-through">
            SLE {product.price.toFixed(2)}
          </Text>
          {product.discountPrice > 0 && (
            <Text className="text-sm text-red-500">
              -{product.discountPrice}%
            </Text>
          )}
        </View>

        {/* Condition */}
        {productLower === "new" ? (
          <View className="bg-green-100 px-2 py-0.5 rounded-md self-start">
            <Text className="text-green-700 font-medium text-[11px]">
              {productLower}
            </Text>
          </View>
        ) : productLower === "used" ? (
          <View className="border border-gray-300 px-2 py-0.5 rounded-md self-start">
            <Text className="text-gray-600 font-medium text-[11px]">
              {productLower}
            </Text>
          </View>
        ) : productLower === "refurbished" ? (
          <View className="bg-amber-100 px-2 py-0.5 rounded-md self-start">
            <Text className="text-amber-700 font-medium text-[11px]">
              {productLower}
            </Text>
          </View>
        ) : (
          <Text className="text-gray-400 text-xs">condition: N/A</Text>
        )}

        <View className="flex-row justify-between items-center mt-2">
          <View>
            <Text
              style={{ color: product.inStock ? "#16A34A" : "red" }}
              className="text-xs font-semibold"
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>

        {/* add to cart */}

        <Animated.View
          style={{ transform: [{ scale: scaleAnim }] }}
          className="flex-row justify-end mb-[-10.7] mr-[-10.7] absolute bottom-3 right-3"
        >
          <TouchableOpacity
            onPress={() => handleAddToCart(product._id, 1)}
            disabled={!product.inStock}
            className={`p-2.5 rounded-full shadow ${
              product.inStock ? "bg-primary" : "bg-muted"
            }`}
          >
            <Plus size={18} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

// import { useCallback, useEffect } from "react";
// import { router } from "expo-router";
// import { TouchableOpacity } from "react-native";
// import Text from "../reusableComponent/Text";
// import {
//   Canvas,
//   Rect,
//   useImage,
//   Image,
//   Group,
 
// } from "@shopify/react-native-skia";
// // import {
// //   useSharedValue,
// //   withTiming,
// //   withSequence,
// // } from "react-native-reanimated";

// // Zustand stores
// import { useWishlistStore } from "../zustand/wishlistStore";
// import useAuthStore from "../zustand/authStore";
// import { useCartStore } from "../zustand/cartStore";

// export default function SkiaProductCard({
//   product,
//   width = 180,
//   height = 300,
// }) {
//   const { isAuthenticated } = useAuthStore();
//   const { addToCart } = useCartStore();
//   const { addWishlist, removeWishlist, isInWishlist } = useWishlistStore();

//   // Skia image loader
//   const image = useImage(product?.images[0]?.url);

//   // Animations
//   // const cartScale = useValue(1);
//   // const heartScale = useSharedValue(1);

//   const isLiked = useWishlistStore((state) =>
//     state.wishlist.some((item) => item.product._id === product._id)
//   );

//   const isLikeCheck1 = () =>
//     isLiked ? removeWishlist(product._id) : addWishlist(product._id);

//   // const isLikeCheck = () => isLiked ? removeWishlist(product._id) : addWishlist(product._id)

//   const handleWishlist = useCallback(() => {
//     if (!isAuthenticated) {
//       router.push("../(auth)/login");
//       return;
//     }
//     // heartScale.value = withSequence(
//     //   withTiming(1.2, { duration: 120 }),
//     //   withTiming(1, { duration: 120 })
//     // );
//     // isLikeCheck();
//     isLiked ? removeWishlist(product._id) : addWishlist(product._id);
//   }, [
      
//     isAuthenticated,
//     removeWishlist,
//     addWishlist,
//     product._id,
//     isLiked,
//   ]);

//   const handleCart = useCallback(() => {
//     if (!isAuthenticated) {
//       router.push("../(auth)/login");
//       return;
//     }
//     if (!product.inStock) return;

//     addToCart(product._id, 1);
//     // cartScale.value = withSequence(
//     //   withTiming(1.2, { duration: 120 }),
//     //   withTiming(1, { duration: 120 })
//     // );
//   }, [addToCart, isAuthenticated, product]);

//   // if (!image || !font || !smallFont) return null;

//   const cardRadius = 20;

//   const discountPrice =
//     product.price - (product.price * product.discountPrice) / 100;

//   return (
//     <TouchableOpacity onPress={() => router.push(`../product/${product._id}`)}>
//       <Canvas style={{ width, height }}>
//         {/* ----- Card Background Gradient ----- */}
//         <Rect
//           x={0}
//           y={0}
//           width={width}
//           height={height}
//           color="#fff"
//           shadow={{
//             dx: 0,
//             dy: 8,
//             blur: 20,
//             color: "rgba(0,0,0,0.15)",
//           }}
//           r={cardRadius}
//         />

//         {/* ----- Product Image ----- */}
//         <Image
//           image={image}
//           x={0}
//           y={0}
//           width={width}
//           height={160}
//           fit="cover"
//           r={cardRadius}
//         />

//         {/* ----- Wishlist Heart ----- */}
//         <Group
//           origin={{ x: width - 30, y: 20 }}
//           transform={[{ scale: "" }]}
//           onPress={handleWishlist}
//         >
//           <Rect
//             x={width - 50}
//             y={10}
//             width={40}
//             height={40}
//             r={12}
//             color="rgba(255,255,255,0.9)"
//           />

//           <Text
//             x={width - 33}
//             y={37}
//             color={isLiked ? "red" : "#777"}
//             text={isLiked ? "❤️" : "🤍"}
//             // font={font}
//           />
//         </Group>

//         {/* ----- Title ----- */}
//         <Text
//           x={12}
//           y={185}
//           text={product.title.slice(0, 22)}
//           // font={font}
//           color="#111"
//         />

//         {/* ----- Category ----- */}
//         <Text
//           x={12}
//           y={205}
//           text={product.category}
//           // font={smallFont}
//           color="#777"
//         />

//         {/* ----- Price ----- */}
//         <Text
//           x={12}
//           y={230}
//           text={`SLE ${discountPrice.toFixed(2)}`}
//           // font={font}
//           color="#0A84FF"
//         />

//         {/* Original Price + Discount */}
//         <Text
//           x={12}
//           y={250}
//           text={`SLE ${product.price.toFixed(2)}  -${product.discountPrice}%`}
//           // font={smallFont}
//           color="#d33"
//         />

//         {/* ----- Add to Cart Button ----- */}
//         <Group
//           origin={{ x: width - 35, y: height - 40 }}
//           transform={[{ scale: "" }]}
//           onPress={handleCart}
//         >
//           <Rect
//             x={width - 60}
//             y={height - 60}
//             width={50}
//             height={50}
//             r={25}
//             color={product.inStock ? "#0A84FF" : "#aaa"}
//           />
//           <Text
//             x={width - 42}
//             y={height - 28}
//             text="+"
//             // font={font}
//             color="#fff"
//           />
//         </Group>
//       </Canvas>
//     </TouchableOpacity>
//   );
// }
