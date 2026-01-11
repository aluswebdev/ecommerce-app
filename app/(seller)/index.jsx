import React, { useCallback } from "react";
import { View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSellerStore } from "../zustand/seller/getSellerProducts";
import ProductCard from "../sellerCreateproduct/productCard";
import { router } from "expo-router";
import { Text } from "../reusableComponent/Text";

// import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../src/constant/theme";
import { useFocusEffect } from "@react-navigation/native";

export default function ProductsScreen() {
  const {
    sellerProducts,
    loading,
    products,
    deleteProduct,
    updateProduct,
  } = useSellerStore();


  useFocusEffect(
    useCallback(() => {
      sellerProducts();
    }, [sellerProducts])
  );

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (productId, updatedData) => {
    updateProduct(productId, updatedData);
  };



  return (
    <View style={{ flex: 1, paddingTop: 16 }}>
      <TouchableOpacity
        onPress={() => router.push("../sellerCreateproduct/productcreate")}
        style={{
          backgroundColor: COLORS.primary,
          padding: 12,
          margin: 16,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text className="text-white">Add Product</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text>Loading products...</Text>
        </View>
      ) : products.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No products found
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              handleDeleteProduct={handleDeleteProduct}
              handleEditProduct={handleEditProduct}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}
