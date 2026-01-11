import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import i18n from "../language/i18n";
import { useLanguageStore } from "../zustand/languageStore/languageStore";
import useAuthStore from "../zustand/authStore";

const SecurityScreen = () => {
  const { language } = useLanguageStore();
  const { changePassword, loading } = useAuthStore();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert(
        i18n.t("error", { lng: language }),
        i18n.t("password_required_fields", { lng: language })
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert(
        i18n.t("error", { lng: language }),
        i18n.t("password_mismatch", { lng: language })
      );
      return;
    }
    await changePassword(currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          {i18n.t("security_settings", { lng: language })}
        </Text>

        {/* Change Password */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {i18n.t("change_password", { lng: language })}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={i18n.t("current_password", { lng: language })}
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TextInput
            style={styles.input}
            placeholder={i18n.t("new_password", { lng: language })}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder={i18n.t("confirm_password", { lng: language })}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleChangePassword}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveText}>
                {i18n.t("save_changes", { lng: language })}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Two-Factor Authentication */}
        <View style={styles.card}>
          <View style={styles.twoFAContainer}>
            <Text style={styles.cardTitle}>
              {i18n.t("two_factor_authentication", { lng: language })}
            </Text>
            <Switch
              value={twoFAEnabled}
              onValueChange={setTwoFAEnabled}
              trackColor={{ false: "#E5E7EB", true: "#1E40AF" }}
              thumbColor={twoFAEnabled ? "#fff" : "#fff"}
            />
          </View>
          <Text style={styles.subtitle}>
            {i18n.t("two_factor_auth_help", { lng: language }) ||
              "Add an extra layer of security to your account by enabling 2FA."}
          </Text>
        </View>
      </ScrollView>

      {/* Footer fixed at bottom */}
      <View style={styles.footer}>
        <View style={styles.line} />
        <Text style={styles.footerTitle}>SLEM | Version 1.0.0</Text>
        <Text style={styles.footerText}>
          Supporting Sierra Leonean businesses across all 16 districts.
        </Text>
        <Text style={styles.footerText}>Made with ❤️ for Sierra Leone</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 20, // extra space so content doesn't overlap footer
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  saveButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  twoFAContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  footer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    alignItems: "center",
  },
  footerTitle: {
    fontSize: 13,
    textAlign: "center",
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
    marginVertical: 12,
  },
});
