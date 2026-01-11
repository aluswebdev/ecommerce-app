import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "../language/i18n";
import { useLanguageStore } from "../zustand/languageStore/languageStore";

export default function LanguageScreen() {
  const { language, setLanguage } = useLanguageStore();

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "kr", label: "Krio", flag: "🇸🇱" },
    { code: "men", label: "Mende", flag: "🗣️" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.headerTitle}>{i18n.t("change_language")}</Text>
        <Text style={styles.subtitle}>
          {i18n.t("choose_language") || "Select your preferred language"}
        </Text>

        {/* Language options */}
        <View style={styles.list}>
          {languages.map((item) => (
            <TouchableOpacity
              key={item.code}
              activeOpacity={0.8}
              style={[
                styles.optionCard,
                language === item.code && styles.selectedCard,
              ]}
              onPress={() => setLanguage(item.code)}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.flag}>{item.flag}</Text>
                <Text
                  style={[
                    styles.optionText,
                    language === item.code && styles.selectedText,
                  ]}
                >
                  {item.label}
                </Text>
              </View>
              {language === item.code && (
                <MaterialIcons name="check-circle" size={28} color="#2563EB" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer help text */}
        <Text style={styles.helpText}>
          {i18n.t("language_change_help") ||
            "Your selection will apply to the whole app immediately."}
        </Text>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.line} />
        <Text style={styles.footerTitle}>SLEM | Version 1.0.0</Text>
        <Text style={styles.footerText}>
          Supporting Sierra Leonean businesses across all 16 districts.
        </Text>
        <Text style={styles.footerText}>Made with ❤️ for Sierra Leone</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60, // space for footer
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  list: {
    marginBottom: 40,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: "#EFF6FF",
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 24,
    marginRight: 14,
  },
  optionText: {
    fontSize: 16,
    color: "#374151",
  },
  selectedText: {
    color: "#2563EB",
    fontWeight: "600",
  },
  helpText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  footer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 20,
    alignItems: "center",
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
    marginBottom: 2,
  },
  line: {
    width: "80%",
    height: 2,
    backgroundColor: "#1E40AF",
    marginBottom: 12,
    borderRadius: 1,
  },
});
