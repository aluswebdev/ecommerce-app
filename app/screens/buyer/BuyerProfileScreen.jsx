import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
// import { useAuth } from '../../contexts/AuthContext';
// import { useNotifications } from '../../contexts/NotificationContext';

const BuyerProfileScreen = ({ navigation }) => {
  // const { user, logout } = useAuth();
  const user = { name: "John Doe", email: "john.doe@example.com" };
  // const { getUnreadCount } = useNotifications();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: "" },
    ]);
  };

  const menuItems = [
    {
      id: "personal-info",
      icon: "person",
      title: "Personal Information",
      subtitle: "Edit your profile details",
      showArrow: true,
    },
    {
      id: "addresses",
      icon: "location-on",
      title: "Delivery Addresses",
      subtitle: "Manage your saved addresses",
      showArrow: true,
    },
    {
      id: "payment",
      icon: "payment",
      title: "Payment Methods",
      subtitle: "Orange Money, QMoney, Bank Cards",
      showArrow: true,
    },
    {
      id: "favorites",
      icon: "favorite",
      title: "My Favorites",
      subtitle: "Your wishlist and saved items",
      showArrow: true,
      badge: "12",
    },
    {
      id: "notifications",
      icon: "notifications",
      title: "Notifications",
      subtitle: "Order updates and promotions",
      showToggle: true,
      toggleValue: notificationsEnabled,
      onToggle: setNotificationsEnabled,
      // badge: getUnreadCount() > 0 ? getUnreadCount().toString() : null,
    },
    {
      id: "language",
      icon: "language",
      title: "Language",
      subtitle: "English, Krio, Temne, Mende",
      showArrow: true,
      value: "English",
    },
    {
      id: "dark-mode",
      icon: "dark-mode",
      title: "Dark Mode",
      subtitle: "Switch to dark theme",
      showToggle: true,
      toggleValue: darkMode,
      onToggle: setDarkMode,
    },
    {
      id: "security",
      icon: "security",
      title: "Privacy & Security",
      subtitle: "Password, two-factor authentication",
      showArrow: true,
    },
    {
      id: "help",
      icon: "help",
      title: "Help & Support",
      subtitle: "FAQ, contact us, report issues",
      showArrow: true,
    },
    {
      id: "about",
      icon: "info",
      title: "About SaloneMarket",
      subtitle: "Version 1.0.0",
      showArrow: true,
    },
  ];

  const renderMenuItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <MaterialIcons name={item.icon} size={24} color="#1E40AF" />
        </View>
        <View style={styles.menuContent}>
          <View style={styles.menuTitleRow}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
            {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
          </View>
          <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
        </View>
      </View>

      {item.showToggle && (
        <Switch
          value={item.toggleValue}
          onValueChange={item.onToggle}
          trackColor={{ false: "#E5E7EB", true: "#93C5FD" }}
          thumbColor={item.toggleValue ? "#1E40AF" : "#F3F4F6"}
        />
      )}

      {item.showArrow && (
        <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.headerButton}>
          <MaterialIcons name="settings" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <TouchableOpacity style={styles.avatarContainer}>
              <Image
                source={{
                  uri:
                    user?.avatar ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
                }}
                style={styles.avatar}
              />
              <View style={styles.editAvatarButton}>
                <MaterialIcons name="camera-alt" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <View style={styles.profileDetails}>
              <Text style={styles.userName}>{user?.name || "John Doe"}</Text>
              <Text style={styles.userEmail}>
                {user?.email || "john@example.com"}
              </Text>
              <Text style={styles.userLocation}>
                <MaterialIcons name="location-on" size={14} color="#6B7280" />{" "}
                {user?.location || "Freetown, Sierra Leone"}
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
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Favorites</Text>
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
            <Text style={styles.quickActionText}>My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction}>
            <MaterialIcons name="favorite" size={24} color="#EF4444" />
            <Text style={styles.quickActionText}>Favorites</Text>
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
        <View style={styles.menuSection}>{menuItems.map(renderMenuItem)}</View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#EF4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SaloneMarket v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ in Sierra Leone</Text>
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
    alignItems: "center",
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
});

export default BuyerProfileScreen;
