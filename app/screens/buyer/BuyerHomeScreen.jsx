import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";
// import { useCart } from '../../contexts/CartContext';
// import { useNotifications } from '../../contexts/NotificationContext';
import { Logo } from "../../components/Logo";

const { width } = Dimensions.get("window");

const BuyerHomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //   const { getUnreadCount } = useNotifications();
  const {
    items: products,
    categories,
    loading,
  } = useSelector((state) => state.products);
  //   const { getCartItemsCount } = useCart();
  //   const { getUnreadCount } = useNotifications();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchProducts({}));
    setRefreshing(false);
  };

  const formatPrice = (price) => {
    return `Le ${price.toLocaleString()}`;
  };

  const renderFeaturedProduct = ({ item }) => (
    <TouchableOpacity style={styles.featuredProduct}>
      <Image source={{ uri: item.images[0] }} style={styles.featuredImage} />
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.featuredPrice}>{formatPrice(item.price)}</Text>
        <View style={styles.featuredFooter}>
          <View style={styles.rating}>
            <MaterialIcons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <View style={styles.categoryIcon}>
        <MaterialIcons name={item.icon} size={24} color="#1E40AF" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
        <View style={styles.productFooter}>
          <View style={styles.rating}>
            <MaterialIcons name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.sellerName}>{item.sellerName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Logo size="small" />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="notifications" size={24} color="#374151" />
            {/* {getUnreadCount() > 0 && <View style={styles.badge} />} */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="shopping-cart" size={24} color="#374151" />
            {/* {getCartItemsCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartItemsCount()}</Text>
              </View>
            )} */}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Welcome to SaloneMarket</Text>
            <Text style={styles.bannerSubtitle}>
              Discover authentic Sierra Leonean products from local sellers
            </Text>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1568027482475-f4fb0087b218?w=400",
            }}
            style={styles.bannerImage}
          />
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Search for products...</Text>
          <MaterialIcons name="filter-list" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <FlatList
            data={categories.slice(1, 7)} // Exclude "All Categories"
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={products.slice(0, 5)}
            renderItem={renderFeaturedProduct}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Popular Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular in Your Area</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productsGrid}>
            {products.map((item, index) => (
              <View key={item.id} style={styles.productWrapper}>
                {renderProduct({ item })}
              </View>
            ))}
          </View>
        </View>

        {/* Local Sellers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Local Sellers</Text>
          <View style={styles.sellersContainer}>
            <TouchableOpacity style={styles.sellerCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100",
                }}
                style={styles.sellerAvatar}
              />
              <View style={styles.sellerInfo}>
                <Text style={styles.sellerName}>Aminata Fashion</Text>
                <Text style={styles.sellerLocation}>Freetown</Text>
                <View style={styles.sellerRating}>
                  <MaterialIcons name="star" size={16} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.8 (67 reviews)</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sellerCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
                }}
                style={styles.sellerAvatar}
              />
              <View style={styles.sellerInfo}>
                <Text style={styles.sellerName}>Bo Farms Cooperative</Text>
                <Text style={styles.sellerLocation}>Bo, Southern Province</Text>
                <View style={styles.sellerRating}>
                  <MaterialIcons name="star" size={16} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.9 (203 reviews)</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  cartBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#1E40AF",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  banner: {
    flexDirection: "row",
    margin: 16,
    padding: 20,
    backgroundColor: "#EBF4FF",
    borderRadius: 16,
    alignItems: "center",
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#9CA3AF",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  seeAll: {
    fontSize: 14,
    color: "#1E40AF",
    fontWeight: "600",
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 16,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    textAlign: "center",
    color: "#374151",
  },
  featuredList: {
    paddingHorizontal: 16,
  },
  featuredProduct: {
    width: 200,
    marginRight: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredInfo: {
    padding: 12,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 8,
  },
  featuredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  location: {
    fontSize: 12,
    color: "#6B7280",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
  },
  productWrapper: {
    width: "50%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  //   sellerName: {
  //     fontSize: 12,
  //     color: '#6B7280',
  //   },
  sellersContainer: {
    paddingHorizontal: 16,
  },
  sellerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  sellerLocation: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  sellerRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#1E40AF",
    borderRadius: 8,
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default BuyerHomeScreen;
