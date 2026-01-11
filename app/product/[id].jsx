import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import { COLOR, COLORS } from "../src/constant/theme";
import ProductImageSlider from "../utils/ProductImageSlider";
import { formatCurrency } from "../config/formatDate";
import { SellerHeader } from "../libs/SellerCard";
import { useCartStore } from "../zustand/cartStore";
import useProductStore from "../zustand/seller/productStore";
import styles from "../styles/productDEtailStyle";
import ButtonGroup from "../uikits/whatsappBtn";
import ProductCard from "../utils/ProductCard";
import API from "../api/axiosAPI";
import React from "react";

// Utility function to remove duplicates by _id
const removeDuplicates = (products) => {
  const seen = new Set();
  return products.filter((item) => {
    if (seen.has(item._id)) return false;
    seen.add(item._id);
    return true;
  });
};

const ProductDetail = () => {
  const { products, loading, message } = useProductStore();
  const { addToCart } = useCartStore();
  const { id } = useLocalSearchParams();

  const router = useRouter();

  if (loading) return <ActivityIndicator size="large" />;
  if (message) return <Text>{message}</Text>;

  const product = products.find(
    (item) => item._id?.toString() === id?.toString()
  );

  const productImgs = product?.images?.map((img) => img?.url);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const sellerId = product?.seller?._id;

  const similarProduct = products.filter((item) => {
    const sameCategory = item?.category === product?.category;
    const sameSubCategory = item?.subCategory === product?.subCategory;
    const notSameProduct = item?._id !== product?._id;
    return notSameProduct && (sameCategory || sameSubCategory);
  });

  const sellerOtherProduct = products.filter(
    (item) => item?._id !== product?._id && item?.seller?._id === sellerId
  );

  const uniqueSimilar = removeDuplicates(similarProduct);
  const uniqueSellerProducts = removeDuplicates(sellerOtherProduct);

  // handle open chat
  const handleChatOpen = async () => {
    try {
      const res = await API.post("/chats/open", {
        sellerId: product?.seller?._id,
        productId: product?._id,
      });

      const chat = res.data.chat;

      router.push(`../chat/${chat?._id}`);
    } catch (err) {
      console.warn("Failed to open chat", err);
    }
  };

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View className="dark:bg-[#121212]">
      <FlatList
        ListHeaderComponent={
          <>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <ProductImageSlider images={productImgs} />

            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title} className="dark:text-[#EDEDED]">
                  {product?.title}
                </Text>
                <TouchableOpacity>
                  <Ionicons name="heart" size={22} color={COLOR.primary} />
                </TouchableOpacity>
              </View>

              <SellerHeader seller={product?.seller} product={product} />
              <Text style={styles.price}>{formatCurrency(product?.price)}</Text>

              <Text style={styles.sectionTitle} className="dark:text-[#EDEDED]">
                Description
              </Text>
              <Text style={styles.description} className="dark:text-[#A3A3A3]">
                {product?.description || "No description provided."}
              </Text>

              <ButtonGroup
                product={product}
                router={router}
                addToCart={addToCart}
              />

              {/* Chat Button */}
              <TouchableOpacity
                onPress={handleChatOpen}
                className="bg-[#1E40AF] py-4 rounded-2xl mt-4 flex-row items-center justify-center active:opacity-80 shadow-md"
              >
                <Ionicons name="chatbubbles-outline" size={20} color="white" />
                <Text className="text-white text-base font-semibold ml-2">
                  Chat with Seller
                </Text>
              </TouchableOpacity>

              <Text
                style={styles.text}
                className="text-center uppercase dark:text-[#ededed]"
              >
                What You Need to Know
              </Text>
              <ItemSpecific product={product} />
            </View>

            {sellerOtherProduct.length > 0 && (
              <View style={{ paddingHorizontal: 12 }}>
                <Text
                  style={styles.sectionTitle}
                  className="dark:text-[#EDEDED]"
                >
                  More From This Seller
                </Text>

                <FlatList
                  data={uniqueSellerProducts}
                  horizontal
                  keyExtractor={(item) => `similar-${item?._id}`}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View className="w-[160px] mr-3">
                      <ProductCard product={item} />
                    </View>
                  )}
                  contentContainerStyle={{ paddingVertical: 8 }}
                />
              </View>
            )}

            <Text
              style={styles.sectionTitle}
              className="ml-5 dark:text-[#EDEDED] text-text"
            >
              Similar Products
            </Text>
          </>
        }
        data={uniqueSimilar}
        numColumns={2}
        keyExtractor={(item, index) => `similar-${item?._id || index}`}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 8,
          marginBottom: 12,
        }}
        renderItem={({ item }) => (
          <View className="w-[50%] p-2">
            <ProductCard product={item} />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={
          <Text
            style={{ textAlign: "center", marginVertical: 12 }}
            className="dark:text-[#EDEDED]"
          >
            No similar products found.
          </Text>
        }
      />
    </View>
  );
};

const ItemSpecific = ({ product }) => {
  // const colours = product.variantColor.split(" ").join(", ");///
  return (
    <>
      <ReusableItemInfo
        text="DElivery Fee:"
        productInfo={product?.shippingFree ? "Free" : "Pay on delivery"}
        icon="car"
      />

      <ReusableItemInfo
        text="Delivery Days:"
        productInfo={
          product?.shippings?.estimatedDays >= 1
            ? `${product?.shippings?.estimatedDays} ${product?.shippings?.estimatedDays > 1 ? "days" : "day"}`
            : product?.shippings?.estimatedDays
        }
        icon="car-outline"
      />

      <ReusableItemInfo
        text="Shipping Location:"
        productInfo={product?.shippings?.shippingLocation}
        icon="location"
      />

      <ReusableItemInfo
        text="Item Colours:"
        // productInfo={colours || "N/A"}///
        icon="color-palette"
      />

      <ReusableItemInfo
        text="Location:"
        productInfo={product?.location?.city}
        icon="location-outline"
      />

      <ReusableItemInfo
        text="Condition:"
        productInfo={product?.condition}
        icon="checkmark-circle-outline"
      />

      <View>
        {product.features?.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Features</Text>
            {product?.features?.map((feat, i) => (
              <Text key={i} style={styles.featureItem}>
                • {feat}
              </Text>
            ))}
          </>
        )}
      </View>
    </>
  );
};

const ReusableItemInfo = ({ text, productInfo, icon }) => {
  return (
    <View className="flex flex-row items-center flex-wrap justify-between mb-3 w-full">
      <View className="flex-row items-center max-w-[40%] flex-shrink">
        <Ionicons name={icon} size={18} color={COLORS.primary} />
        <Text className="text-text dark:text-[#A3A3A3] ml-2 tracking-wider font-semibold flex-shrink">
          {text}
        </Text>
      </View>

      <View className="flex-1 mx-2 border-t border-teal-600" />

      <View className="max-w-[40%] flex-shrink">
        <Text className="text-text dark:text-[#A3A3A3] text-left">
          {productInfo}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(ProductDetail);
