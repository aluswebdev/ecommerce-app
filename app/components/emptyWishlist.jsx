import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

const EmptyWishlistPrompt = ({ isAuthenticated }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/emptyWishlist.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <>
        <Text style={styles.title}>Your Wishlist is Empty ❤️</Text>
        <Text style={styles.subtitle}>
          Sign in or create an account to start saving your favorite products
          and access them anytime.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signInBtn}
            activeOpacity={0.8}
            onPress={() => router.push("../(auth)/login")}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createBtn}
            activeOpacity={0.8}
            onPress={() => router.push("../(auth)/signUp")}
          >
            <Text style={styles.createText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
};

export default EmptyWishlistPrompt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
    opacity: 0.9,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  signInBtn: {
    backgroundColor: "#1E40AF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  signInText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  createBtn: {
    borderWidth: 1.5,
    borderColor: "#1E40AF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  createText: {
    color: "#1E40AF",
    fontSize: 14,
    fontWeight: "600",
  },
  browseBtn: {
    backgroundColor: "#1E40AF",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  browseText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
