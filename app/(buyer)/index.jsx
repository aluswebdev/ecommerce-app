import React, { useEffect } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Text } from "../reusableComponent/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "../uikits/Header";
import BuyerSearchHeader from "../productcontainer/searchProduct";
import CampaignCarousel from "../buyerComponentUI/campaignCard";
import FeatureGrid from "../productcontainer/featureTop";
import SpecialOfferCard from "../buyerComponentUI/specialOfferCard";
import ProductCard from "../utils/ProductCard";

import useProductStore from "../zustand/seller/productStore";

import producs from "../store/slices/dommyData";
import i18n from "../language/i18n";

const Home = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const uniqueProducts = products.filter(
    (p, i, arr) => arr.findIndex((item) => item._id === p._id) === i
  );

  const { categories } = producs;

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={styles.categoryIcon}>
        <MaterialIcons name={item.icon} size={24} color="#0057b8" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Sticky Header */}

      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Search */}
        <BuyerSearchHeader />

        {/* Feature Section */}
        <FeatureGrid />

        {/* Banner / Intro */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>{i18n.t("home_welcome_title")}</Text>
          <Text style={styles.bannerSubtitle}>
            {i18n.t("home_welcome_subtitle")}
          </Text>
        </View>

        {/* Special Offer */}
        <SpecialOfferCard />

        {/* Campaign Section */}
        <Text style={styles.sectionTitle}>Discover Deals 🔥</Text>
        <CampaignCarousel
          campaigns={[
            {
              image:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
              link: "/campaigns/fashion",
            },
            {
              image:
                "https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?ixlib=rb-4.1.0&auto=format&fit=crop&w=1984&q=80",
              link: "/campaigns/electronics",
            },
            {
              image:
                "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
              link: "/campaigns/home",
            },
          ]}
        />

        {/* Categories */}
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <FlatList
          data={categories.slice(1, 7)}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        {/* Products */}
        <Text style={styles.sectionTitle}>Popular in Your Area</Text>
        <View style={styles.productGrid}>
          {uniqueProducts.map((item) => (
            <View key={item._id} style={styles.productItem}>
              <ProductCard product={item} />
            </View>
          ))}
        </View>

        {/* Spacer */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;

// Home.js — Fully Optimized Production Version



// import React, { useEffect, useMemo } from "react";
// import { View, StyleSheet, TouchableOpacity } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { MaterialIcons } from "@expo/vector-icons";

// import { Header } from "../uikits/Header";
// import BuyerSearchHeader from "../productcontainer/searchProduct";
// import FeatureGrid from "../productcontainer/featureTop";
// import CampaignCarousel from "../buyerComponentUI/campaignCard";
// import SpecialOfferCard from "../buyerComponentUI/specialOfferCard";
// import ProductCardMemo from "../utils/ProductCard";
// import { Text } from "../reusableComponent/Text";

// import useProductStore from "../zustand/seller/productStore";
// import producs from "../store/slices/dommyData";
// import i18n from "../language/i18n";

// // Memoized Product Card to prevent re-render
// const ProductCard = React.memo(ProductCardMemo);

// const Home = () => {
//   const { fetchProducts, products } = useProductStore();

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // 🔥 Deduplicate products without re-running each render
//   const uniqueProducts = useMemo(() => {
//     return products.filter(
//       (p, i, arr) => arr.findIndex((item) => item._id === p._id) === i
//     );
//   }, [products]);

//   const { categories } = producs;

//   // Each section of FlashList
//   const sections = useMemo(
//     () => [
//       { type: "header" },
//       { type: "search" },
//       { type: "features" },
//       { type: "banner" },
//       { type: "special" },
//       { type: "campaigns" },
//       { type: "categories" },
//       { type: "products" },
//       { type: "footerSpace" },
//     ],
//     []
//   );

//   const renderCategory = ({ item }) => (
//     <TouchableOpacity style={styles.categoryCard}>
//       <View style={styles.categoryIcon}>
//         <MaterialIcons name={item.icon} size={24} color="#0057b8" />
//       </View>
//       <Text style={styles.categoryName}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   // 🔥 Production-grade renderer for sections
//   const renderItem = ({ item }) => {
//     switch (item.type) {
//       case "header":
//         return <Header />;

//       case "search":
//         return <BuyerSearchHeader />;

//       case "features":
//         return <FeatureGrid />;

//       case "banner":
//         return (
//           <View style={styles.banner}>
//             <Text style={styles.bannerTitle}>
//               {i18n.t("home_welcome_title")}
//             </Text>
//             <Text style={styles.bannerSubtitle}>
//               {i18n.t("home_welcome_subtitle")}
//             </Text>
//           </View>
//         );

//       case "special":
//         return <SpecialOfferCard />;

//       case "campaigns":
//         return (
//           <View>
//             <Text style={styles.sectionTitle}>Discover Deals 🔥</Text>
//             <CampaignCarousel
//               campaigns={[
//                 {
//                   image:
//                     "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
//                   link: "/campaigns/fashion",
//                 },
//                 {
//                   image:
//                     "https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?ixlib=rb-4.1.0&auto=format&fit=crop&w=1984&q=80",
//                   link: "/campaigns/electronics",
//                 },
//                 {
//                   image:
//                     "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
//                   link: "/campaigns/home",
//                 },
//               ]}
//             />
//           </View>
//         );

//       case "categories":
//         return (
//           <View>
//             <Text style={styles.sectionTitle}>Shop by Category</Text>
//             <FlashList
//               data={categories.slice(1, 7)}
//               horizontal
//               estimatedItemSize={80}
//               showsHorizontalScrollIndicator={false}
//               renderItem={renderCategory}
//               keyExtractor={(c) => c.id}
//               contentContainerStyle={styles.categoriesList}
//             />
//           </View>
//         );

//       case "products":
//         return (
//           <View>
//             <Text style={styles.sectionTitle}>Popular in Your Area</Text>
//             <FlashList
//               data={uniqueProducts}
//               keyExtractor={(item) => item._id}
//               numColumns={2}
//               estimatedItemSize={250}
//               renderItem={({ item }) => (
//                 <View style={styles.productItem}>
//                   <ProductCard product={item} />
//                 </View>
//               )}
//               showsVerticalScrollIndicator={false}
//             />
//           </View>
//         );

//       case "footerSpace":
//         return <View style={{ height: 80 }} />;

//       default:
//         return null;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlashList
//         data={sections}
//         renderItem={renderItem}
//         estimatedItemSize={400}
//         showsVerticalScrollIndicator={false}
//         removeClippedSubviews
//       />
//     </View>
//   );
// };

// export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },

  headerRight: { flexDirection: "row", alignItems: "center" },
  iconButton: { marginLeft: 16 },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  scrollContainer: {
    paddingBottom: 60,
    paddingTop: 12,
  },
  banner: {
    backgroundColor: "#EBF4FF",
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E40AF",
    textAlign: "center",
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 16,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 12,
    color: "#374151",
    textAlign: "center",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  productItem: {
    width: "50%",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
