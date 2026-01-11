import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useAuthStore from "../zustand/authStore";
import Toast from "react-native-toast-message";
import { Text } from "../reusableComponent/Text";
import { router } from "expo-router";

const LoginScreen = () => {
  const { login, loading, loadUser } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "", role: "buyer" });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please enter both email and password.",
      });
      return;
    }

    try {
      await login({ ...form }); // ✅ role included
      await loadUser();
      router.push(`../(${form.role})/`);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../../assets/images/lgo1.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to your <Text as="span" className="text-[#1e40af]">{form.role}</Text> account</Text>

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            form.role === "buyer" && styles.roleSelected,
          ]}
          onPress={() => setForm((prev) => ({ ...prev, role: "buyer" }))}
        >
          <MaterialIcons name="shopping-bag" size={20} color="#fff" />
          <Text style={styles.roleText}>Buyer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            form.role === "seller" && styles.roleSelected,
          ]}
          onPress={() => setForm((prev) => ({ ...prev, role: "seller" }))}
        >
          <MaterialIcons name="storefront" size={20} color="#fff" />
          <Text style={styles.roleText}>Seller</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email address"
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <Text style={styles.loginText}>Logging in...</Text>
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.footerText} onPress={() => router.push("./signUp")}>
        Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
      </Text>
    </KeyboardAvoidingView>
    
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E3A8A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#93C5FD",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  roleSelected: {
    backgroundColor: "#1E40AF",
  },
  roleText: {
    color: "#fff",
    fontWeight: "600",
  },
  inputContainer: {
    gap: 12,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },
  loginBtn: {
    backgroundColor: "#1E40AF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    textAlign: "center",
    color: "#1E40AF",
    marginTop: 16,
    fontWeight: "500",
  },
  footerText: {
    textAlign: "center",
    marginTop: 24,
    color: "#6B7280",
  },
  signupLink: {
    color: "#1E40AF",
    fontWeight: "600",
  },
});
