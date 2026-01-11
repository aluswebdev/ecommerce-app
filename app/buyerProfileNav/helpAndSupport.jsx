import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  LayoutAnimation,
  Platform,
  UIManager,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "../language/i18n";
import { useLanguageStore } from "../zustand/languageStore/languageStore";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpSupportScreen = () => {
  const { language } = useLanguageStore();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: i18n.t("faq_how_to_buy", { lng: language }),
      answer: i18n.t("faq_how_to_buy_answer", { lng: language }),
    },
    {
      question: i18n.t("faq_payment_methods", { lng: language }),
      answer: i18n.t("faq_payment_methods_answer", { lng: language }),
    },
    {
      question: i18n.t("faq_delivery_time", { lng: language }),
      answer: i18n.t("faq_delivery_time_answer", { lng: language }),
    },
  ];

  const toggleFAQ = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
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
          {i18n.t("help_support", { lng: language })}
        </Text>
        <View style={styles.quickActions}>
          <SupportButton
            icon="chat"
            label={i18n.t("contact_chat", { lng: language })}
            onPress={() => console.log("Open chat screen")}
          />
          <SupportButton
            icon="call"
            label={i18n.t("contact_call", { lng: language })}
            onPress={() => Linking.openURL("tel:+23212345678")}
          />
          <SupportButton
            icon="email"
            label={i18n.t("contact_email", { lng: language })}
            onPress={() => Linking.openURL("mailto:support@slem.com")}
          />
        </View>
        {/* FAQ */}
        <Text style={styles.sectionTitle}>
          {i18n.t("frequently_asked_questions", { lng: language })}
        </Text>
        {faqItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqCard}
            activeOpacity={0.8}
            onPress={() => toggleFAQ(index)}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <MaterialIcons
                name={activeIndex === index ? "expand-less" : "expand-more"}
                size={24}
                color="#1E40AF"
              />
            </View>

            {activeIndex === index && (
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
        {/* Quick info footer */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            Support available Mon – Sat, 8am – 6pm
          </Text>
          <Text style={styles.footerTextSmall}>
            Average response time: 5–10 minutes
          </Text>
        </View>
        <View style={{ height: 120 }} /> {/* Space for main footer */}
      </ScrollView>

      {/* Main Footer fixed at bottom */}
      <View style={styles.footer}>
        <View style={styles.line} />
        <Text style={styles.footerTitle}>SLEM | Version 1.0.0</Text>
        <Text style={styles.footerText1}>
          Supporting Sierra Leonean businesses across all 16 districts.
        </Text>
        <Text style={styles.footerText1}>Made with ❤️ for Sierra Leone</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HelpSupportScreen;

/* ---------------- Components ---------------- */
const SupportButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.supportBtn} onPress={onPress}>
    <MaterialIcons name={icon} size={22} color="#1E40AF" />
    <Text style={styles.supportText}>{label}</Text>
  </TouchableOpacity>
);

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E40AF",
    textAlign: "center",
    marginBottom: 24,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  supportBtn: {
    flex: 1,
    backgroundColor: "#E0E7FF",
    marginHorizontal: 6,
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  supportText: {
    marginTop: 6,
    fontSize: 14,
    color: "#1E40AF",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },
  faqCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E40AF",
    flex: 1,
    paddingRight: 10,
  },
  faqAnswer: {
    marginTop: 10,
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  footerInfo: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  footerTextSmall: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  footer: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 16,
    alignItems: "center",
  },
  footerTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
  },
  footerText1: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  line: {
    height: 2,
    backgroundColor: "#1E40AF",
    marginBottom: 12,
    borderRadius: 1,
  },
});
