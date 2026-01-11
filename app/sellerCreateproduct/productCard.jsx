import {
  View,
  Image,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../src/constant/theme";
import { Text } from "../reusableComponent/Text";
import { formatDate, formatCurrency } from "../config/formatDate";

import { useSellerStore } from "../zustand/seller/getSellerProducts";

import { router } from "expo-router";

// Status Badge Colors
const statusColors = {
  pending: { bg: "#fff3cd", text: "#856404" },
  active: { bg: "#d4edda", text: "#155724" },
  inactive: { bg: "#f8d7da", text: "#721c24" },
};

const getThumbnailUrl = (url) => {
  if (!url) return null;
  return url.replace("/upload/", "/upload/w_400,h_300,c_fill/");
};

// Seller Activity Colors/

const ProductCard = ({ item, handleDeleteProduct }) => {
  const { toggleProductStatus, isLoading, products } = useSellerStore();

  const status = statusColors[item.status] || statusColors.pending;

  

  const handleToggle = async () => {
    if (isLoading) return;
    await toggleProductStatus(item._id); // ✅ only toggles on switch change/
  };

  const discountPrice = item.price - (item.price * item.discountPrice) / 100;

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 12,
        marginBottom: 16,
        padding: 1,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      {/* Product Image */}
      {item.images && item.images.length > 0 ? (
        <Image
          source={{ uri: getThumbnailUrl(item.images[0].url) }}
          className="w-full h-48 rounded-t-lg"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-44 bg-gray-200 justify-center items-center rounded-lg mb-2">
          <Ionicons name="image-outline" size={50} color="#aaa" />
          <Text style={{ color: "#aaa", marginTop: 5 }}>No Image</Text>
        </View>
      )}

      {/* Product Info */}
      <View className="p-2 flex-row m-2 items-center justify-between">
        <View>
          <Text style={{ color: "#6c757d", marginBottom: 2 }}>
            {item.category}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}>
            {item.title}
          </Text>

          <Text className="text-primary">{formatCurrency(discountPrice)}</Text>

          <View className="flex-row items-center gap-2">
            <Text className="text-sm line-through text-gray-500">
              {formatCurrency(item.price)}
            </Text>
            <Text className="text-sm text-red-500">-{item.discountPrice}%</Text>
          </View>
          <Text className="text-[#555]">Condition: {item.condition}</Text>
          <Text className="text-[#555]">Stock: {item.stock}</Text>
        </View>

        <View>
          <View className="bg-white p-4 rounded-2xl shadow-md mb-3">
            <Text className="text-gray-600">
              Status:{" "}
              <Text
                style={{
                  backgroundColor: status.bg,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  marginRight: 8,
                }}
                className="bg-gray-200n px-2 py-1 rounded-full "
              >
                <Text
                  style={{
                    color: status.text,
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {item.status.toUpperCase()}
                </Text>
              </Text>
            </Text>

            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-black font-medium">
                {item.status === "active" ? "Active" : "Inactive"}
              </Text>

              {products.isLoading ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : 

              <Switch
              value={item.status === "active"}
              onValueChange={handleToggle}
              trackColor={{ false: "#d1d5db", true: "#34d399" }} // gray & green
              thumbColor={item.status === "active" ? "#10b981" : "#f4f3f4"}
              ios_backgroundColor="#d1d5db"
              />
            }
            </View>
          </View>
          <Text>
            createdAt:{" "}
            <Text className="text-primary">{formatDate(item.createdAt)}</Text>
          </Text>
          <Text>
            UpdatedAt:{" "}
            <Text className="text-primary">{formatDate(item.updatedAt)}</Text>
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View className="m-2 mb-4 flex-row justify-end">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "../sellerCreateproduct/product",
              params: { id: item._id },
            })
          }
          style={{ marginRight: 16 }}
        >
          <Ionicons name="pencil-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteProduct(item._id)}>
          <Ionicons name="trash-outline" size={22} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
