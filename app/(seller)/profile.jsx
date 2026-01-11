import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Dimensions,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import {
  Edit2,
  Users,
  ShoppingCart,
  DollarSign,
  Star,
  CheckCircle,
  Camera,
  Activity,
} from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";
import { Canvas, Path } from "@shopify/react-native-skia";
import Carousel from "react-native-reanimated-carousel";
import useSellerStore from "../zustand/seller/useSellerStore";
import useAuthStore from "../zustand/authStore";
import useSellerAnalyticsStore from "../zustand/seller/getAnalyticsStore";

const screenWidth = Dimensions.get("window").width;
const PRIMARY = "#1e40af";

const dummySeller = {
  coverImage: "https://picsum.photos/800/200",
  followers: 1240,
  products: 85,
  revenue: 12450,
  rating: 4.5,
  verified: true,
  reviews: [
    { id: "1", user: "John Doe", comment: "Great seller!", rating: 5 },
    { id: "2", user: "Mary Jane", comment: "Fast shipping.", rating: 4 },
    {
      id: "3",
      user: "Ali Kamara",
      comment: "Product as described.",
      rating: 4,
    },
  ],
  salesData: {
    monthly: [1200, 1800, 1600, 2100, 2600, 3150],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  followerActivity: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    data: [5, 10, 8, 12, 7, 15],
  },
  productList: Array.from({ length: 10 }, (_, i) => ({
    id: i.toString(),
    image: `https://i.pravatar.cc/150?img=${i + 10}`,
    title: `Product ${i + 1}`,
  })),
};

export default function SellerProfile() {
  const { loadAuth } = useAuthStore();
  const {
    profile,
    fetchSellerProfile,
    loading,
    followersCount,
    initFollowState,
  } = useSellerStore();
  const { fetchAnalytics, stats, sales } = useSellerAnalyticsStore();

  const scheme = useColorScheme();
  const dark = scheme === "dark";
  const theme = {
    background: dark ? "#020617" : "#f8f9fb",
    card: dark ? "#020617" : "#fff",
    text: dark ? "#e5e7eb" : "#111827",
    muted: dark ? "#94a3b8" : "#64748b",
  };

  useEffect(() => {
    loadAuth();
    fetchSellerProfile();
    // fetchAnalytics();
    initFollowState(profile);
  }, [fetchSellerProfile, fetchAnalytics, profile, initFollowState, loadAuth]);

  console.log(profile);

  const labels = {
    weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    monthly: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(dummySeller.name);
  const [editedStore, setEditedStore] = useState(dummySeller.store);

  const renderReview = ({ item }) => (
    <View style={[styles.reviewCard, { backgroundColor: theme.card }]}>
      <Text style={{ color: theme.text, fontWeight: "600" }}>{item.user}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 4,
        }}
      >
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            color={i < item.rating ? "#facc15" : "#e5e7eb"}
          />
        ))}
      </View>
      <Text style={{ color: theme.muted }}>{item.comment}</Text>
    </View>
  );
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Cover/Banner */}
      <TouchableOpacity
        style={{ position: "relative" }}
        onPress={() => alert("Change Banner Picture")}
      >
        <Image
          source={{ uri: dummySeller.coverImage }}
          style={styles.coverImage}
        />
        <Camera
          size={24}
          color="#fff"
          style={{ position: "absolute", top: 16, right: 16 }}
        />
      </TouchableOpacity>

      {/* Header */}
      <View
        style={[styles.header, { backgroundColor: theme.card, marginTop: -50 }]}
      >
        <TouchableOpacity onPress={() => alert("Change Profile Picture")}>
         {loading ? <Activity size={80} color={PRIMARY} /> : <Image
            source={{ uri: profile?.user?.profilePhoto }}
            style={styles.avatar}
          /> }
          <Camera
            size={20}
            color="#fff"
            style={{ position: "absolute", bottom: 15, right: 5, zIndex: 90000 }}
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.name, { color: theme.text }]}>
              {profile?.user?.fullName}
            </Text>
            {profile?.verified && (
              <CheckCircle
                size={18}
                color={PRIMARY}
                style={{ marginLeft: 6 }}
              />
            )}
          </View>
          <Text style={[styles.store, { color: theme.muted }]}>
            {profile?.storeName}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
          >
            <Star size={16} color="#facc15" />
            <Text style={{ color: theme.muted, marginLeft: 4 }}>
              {profile?.rating?.count}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.editButton}
        >
          <Edit2 size={24} color={PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <Users size={22} color={PRIMARY} />
          <Text style={[styles.statValue, { color: PRIMARY }]}>
            {followersCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.muted }]}>
            Followers
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <ShoppingCart size={22} color={PRIMARY} />
          <Text style={[styles.statValue, { color: PRIMARY }]}>
            {profile?.products?.length}
          </Text>
          <Text style={[styles.statLabel, { color: theme.muted }]}>
            Products
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.card }]}>
          <DollarSign size={22} color={PRIMARY} />
          <Text
            style={[styles.statValue, { color: PRIMARY }]}
          >{`Le ${stats.revenue.toLocaleString()}`}</Text>
          <Text style={[styles.statLabel, { color: theme.muted }]}>
            Revenue
          </Text>
        </View>
      </View>

      {/* Sales Analytics */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Sales Analytics
        </Text>
        <LineChart
          data={{
            labels: labels.monthly,
            datasets: [{ data: sales.monthly || [0] }],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisLabel="Le "
          chartConfig={{
            backgroundGradientFrom: theme.card,
            backgroundGradientTo: theme.card,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(30,64,175, ${opacity})`,
            labelColor: () => theme.text,
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 12 }}
        />
        <Canvas style={{ height: 100, width: screenWidth - 32, marginTop: 12 }}>
          <Path
            path={`M0 50 Q50 10 100 50 T${screenWidth - 32} 50`}
            color={PRIMARY}
            style={{ strokeWidth: 3 }}
          />
        </Canvas>
      </View>

      {/* Follower Activity */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Follower Activity
        </Text>
        <LineChart
          data={{
            labels: dummySeller.followerActivity.labels,
            datasets: [{ data: dummySeller.followerActivity.data }],
          }}
          width={screenWidth - 32}
          height={180}
          chartConfig={{
            backgroundGradientFrom: theme.card,
            backgroundGradientTo: theme.card,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(30,64,175, ${opacity})`,
            labelColor: () => theme.text,
          }}
          style={{ borderRadius: 12, marginTop: 8 }}
        />
      </View>

      {/* Products Carousel */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Products
        </Text>
        <Carousel
          loop
          width={screenWidth}
          height={180}
          autoPlay={false}
          data={dummySeller.productList}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 140, height: 140, borderRadius: 12 }}
              />
              <Text style={{ color: theme.text, marginTop: 4 }}>
                {item.title}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Reviews */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Reviews
        </Text>
        <FlatList
          data={dummySeller.reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReview}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 8 }}
        />
      </View>

      {/* Edit Profile Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text
              style={[
                styles.sectionTitle,
                { color: theme.text, marginBottom: 12 },
              ]}
            >
              Edit Profile
            </Text>
            <TextInput
              style={[
                styles.input,
                { color: theme.text, borderColor: PRIMARY },
              ]}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Name"
              placeholderTextColor={theme.muted}
            />
            <TextInput
              style={[
                styles.input,
                { color: theme.text, borderColor: PRIMARY },
              ]}
              value={editedStore}
              onChangeText={setEditedStore}
              placeholder="Store Name"
              placeholderTextColor={theme.muted}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: "#6b7280" }]}
              >
                <Text style={styles.followButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: PRIMARY }]}
              >
                <Text style={styles.followButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 60 },
  coverImage: {
    width: "100%",
    height: 180,
    marginBottom: -50,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
  },
  headerText: { flex: 1, marginLeft: 16 },
  name: { fontSize: 20, fontWeight: "700" },
  store: { fontSize: 14, marginTop: 4 },
  editButton: { padding: 8 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 2,
  },
  statValue: { fontSize: 16, fontWeight: "700", marginTop: 4 },
  statLabel: { fontSize: 12, marginTop: 2 },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  followButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  messageButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  followButtonText: { color: "#fff", fontWeight: "600" },
  section: { padding: 16, borderRadius: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "600" },
  reviewCard: {
    width: screenWidth / 2.5,
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    elevation: 2,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: { width: "85%", padding: 16, borderRadius: 16 },
  input: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 12 },
  modalButton: {
    flex: 1,
    padding: 19,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
});
