import useAuthStore from "../zustand/authStore";
import ProfileAvatar from "../buyerComponentUI/profilevatar";

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useWishlistStore } from "../zustand/wishlistStore";
import { Text } from "../reusableComponent/Text";

// render items
import ProfileInfo from "../buyerprofileComp/personalInfo";
import UserAddress from "../buyerprofileComp/userAddress";
import BuyerFavorites from "../buyerprofileComp/buyerFavourite";
import BuyerLanguage from "../buyerprofileComp/buyerLanguage";
import BuyerSecurity from "../buyerprofileComp/buyerSecurity";
import BuyerHelp from "../buyerprofileComp/buyerHelp";
import AboutInfo from "../buyerprofileComp/aboutInfo";
import useBuyerStore from "../zustand/buyerStore/buyerStore";
import { useEffect } from "react";

const BuyerProfileScreen1 = () => {
  const { user, logout } = useAuthStore();
  const {fetchBuyerProfile, buyer} = useBuyerStore();
  useEffect(() => {
    fetchBuyerProfile();
  }, [fetchBuyerProfile]);

  const { wishlist } = useWishlistStore();
  const wishListLength = wishlist ? wishlist.length : 0;

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: () => logout() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View className="px-5 py-4 bg-primary rounded-b-3xl shadow-md flex-row items-center justify-between mt-[-15%]">
        <Text className="text-white text-lg font-bold">My Settings</Text>
        <Ionicons name="settings" size={24} color="white" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <TouchableOpacity style={styles.avatarContainer}>
              <ProfileAvatar user={user} size={80} />
              <View style={styles.editAvatarButton}>
                <MaterialIcons name="camera-alt" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <View style={styles.profileDetails}>
              <Text style={styles.userName}>
                {buyer?.fullName || "John Doe"}
              </Text>
              <Text style={styles.userEmail}>
                {buyer?.email || "john@example.com"}
              </Text>
              <Text style={styles.userLocation}>
                <MaterialIcons name="location-on" size={14} color="#6B7280" />{" "}
                {buyer?.location?.city || "Freetown, Sierra Leone"}
              </Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>15</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{wishListLength}</Text>
              <Text style={styles.statLabel}>Wishlists </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <MaterialIcons name="receipt" size={24} color="#1E40AF" />
            <Text style={styles.quickActionText}>My Orders </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <MaterialIcons name="favorite" size={24} color="#EF4444" />
            <Text style={styles.quickActionText}>Wishlist </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <MaterialIcons name="chat" size={24} color="#10B981" />
            <Text style={styles.quickActionText}>Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <MaterialIcons name="local-offer" size={24} color="#F59E0B" />
            <Text style={styles.quickActionText}>Deals</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <ProfileInfo styles={styles} />
        <UserAddress styles={styles} />
        <BuyerFavorites styles={styles} wishListLength={wishListLength} />
        <BuyerLanguage styles={styles} />
        <BuyerSecurity styles={styles} />
        <BuyerHelp styles={styles} />
        <AboutInfo styles={styles} />

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Footer */}
        
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>SLEM | Version 1.0.0</Text>
          <Text style={styles.footerText}>
            Supporting Sierra Leonean businesses across all 16 districts.
          </Text>
          <Text style={styles.footerText}>Made with ❤️ for Sierra Leone</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default BuyerProfileScreen1;

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
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 8,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1E40AF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 14,
    color: "#6B7280",
    flexDirection: "row",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
  },
  quickActions: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  quickActionText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  menuSection: {
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EBF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  menuValue: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  badge: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    marginBottom: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
    marginLeft: 8,
  },
  footer: {
    marginTop: 15,
    marginBottom: 30,
    alignItems: "center",
    paddingBottom: 30,
    marginVertical: 20,
  },
  footerTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  line: {
    height: 2,
    backgroundColor: "#1E40AF",
    marginVertical: 20,
  },
});
