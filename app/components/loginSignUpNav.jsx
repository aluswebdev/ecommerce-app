import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "../reusableComponent/Text";
import { router } from "expo-router";

const LoginSignUpNav = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/lgo1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to SLEM</Text>
        <Text style={styles.subtitle}>
          Sign in to track orders, save favorites, and get personalized
          recommendations.
        </Text>
      </View>

      {/* Auth Buttons */}
      <View style={styles.authButtons}>
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => router.push("../(auth)/login")}
          activeOpacity={0.8}
        >
          <MaterialIcons name="login" size={22} color="#fff" />
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity
          style={styles.createAccBtn}
          onPress={() => router.push("../(auth)/signup")}
          activeOpacity={0.8}
        >
          <MaterialIcons name="person-add-alt-1" size={22} color="#1E40AF" />
          <Text style={styles.createAccText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Links */}
      <View style={styles.quickLinks}>
        <TouchableOpacity style={styles.linkItem} activeOpacity={0.7}>
          <MaterialIcons name="storefront" size={26} color="#9CA3AF" />
          <Text style={styles.linkText}>Browse Products</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkItem} activeOpacity={0.7}>
          <MaterialIcons name="shopping-cart" size={26} color="#9CA3AF" />
          <Text style={styles.linkText}>View Cart (0)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkItem} activeOpacity={0.7}>
          <MaterialIcons name="help-outline" size={26} color="#9CA3AF" />
          <Text style={styles.linkText}>Help & Support</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>SLEM | Version 1.0.0</Text>
        <Text style={styles.footerText}>
          Supporting Sierra Leonean businesses across all 16 districts.
        </Text>
        <Text style={styles.footerText}>Made with ❤️ for Sierra Leone</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 20,
    marginHorizontal: 10,
  },
  authButtons: {
    alignItems: "center",
    marginVertical: 20,
  },
  signInBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E40AF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    width: "85%",
  },
  signInText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  orText: {
    color: "#6B7280",
    marginVertical: 10,
    fontWeight: "500",
  },
  createAccBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E7FF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    width: "85%",
  },
  createAccText: {
    color: "#1E40AF",
    fontWeight: "600",
    fontSize: 16,
  },
  quickLinks: {
    marginTop: 24,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    paddingTop: 20,
    gap: 20,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
    paddingBottom: 16,
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
  },
});

export default LoginSignUpNav;
