import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

import { COLORS } from "../src/constant/theme";

import SellerInfoModal from "./sellerInfo";

const SellerCard = ({ seller }) => {
  const router = useRouter();

  if (!seller) return null;

  return (
    <View style={styles.sellerCard}>
      {seller.product?.length > 0 && (
        <>
          <Text style={styles.moreTitle}>More from this seller</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 8 }}
          >
            {seller.product.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={{ marginRight: 12 }}
                onPress={() => router.push(`/product/${item._id}`)}
              >
                <Image
                  source={{ uri: item.images?.[0] || "" }}
                  style={styles.otherProductImage}
                />
                <Text style={styles.otherProductTitle} numberOfLines={1}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const SellerHeader = ({ seller }) => {
  const feedback = seller?.feedback || {};
  const positive = feedback.positive || 0;
  const total = feedback.total || 0;
  const [isModalVisible, setModalVisible] = useState(false);

  const positivePercent = total > 0 ? Math.round((positive / total) * 100) : 0;

  return (
    <View style={styles.sellerHeader} className="dark:text-[#EDEDED]">
      <Image
        source={{
          uri: seller.profilePhoto || "https://via.placeholder.com/50",
        }}
        style={styles.sellerAvatar}
      />
      <View style={{ marginLeft: 12 }}>
        <TouchableOpacity
          style={styles.sellerName}
          onPress={() => setModalVisible(true)}
        >
          <Text className="dark:text-[#EDEDED]">
            {seller.fullName || "Unnamed Seller"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.sellerMeta}>
          {positivePercent}% positive feedback
        </Text>

        <SellerInfoModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          seller={seller}
        />
      </View>
    </View>
  );
};

export { SellerCard, SellerHeader };

const styles = StyleSheet.create({
  sellerCard: {
    marginTop: 24,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },
  sellerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: "#ccc",
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sellerMeta: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },
  ratingBox: {
    marginTop: 8,
  },
  ratingTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 6,
  },
  ratingItem: {
    fontSize: 13,
    color: "#444",
    marginLeft: 4,
  },
  locationLabel: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 8,
  },
  moreTitle: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  otherProductImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  otherProductTitle: {
    fontSize: 12,
    marginTop: 4,
    maxWidth: 100,
  },
  text: {
    fontSize: 16,
    color: COLORS.dark,
    fontWeight: "bold",
    marginTop: -12,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 5,
  },
});
