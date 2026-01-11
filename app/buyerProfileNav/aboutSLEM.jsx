import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import i18n from "../language/i18n";
import { useLanguageStore } from "../zustand/languageStore/languageStore";

const AboutSLEM = () => {
  const { language } = useLanguageStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const comingSoon = () =>
    Alert.alert(
      i18n.t("about.comingSoon", { lng: language }),
      "This content will be available soon."
    );

  const handleWebsitePress = () => {
    Alert.alert(
      "Coming Soon 🚧",
      "Our website is currently under development. Please check back later."
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {/* Logo */}
          <Image
            source={require("../../assets/images/lgo1.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>SLEM</Text>
          <Text style={styles.version}>v1.0.0</Text>
          {/* About */}
          <Text style={styles.sectionTitle}>
            {i18n.t("about.title", { lng: language })}
          </Text>
          <Text style={styles.paragraph}>
            {i18n.t("about.description1", { lng: language })}
          </Text>
          <Text style={styles.paragraph}>
            {i18n.t("about.description2", { lng: language })}
          </Text>
          {/* Mission */}
          <View style={styles.card}>
            <MaterialIcons name="emoji-objects" size={24} color="#1E40AF" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {i18n.t("about.missionTitle", { lng: language })}
              </Text>
              <Text style={styles.cardText}>
                {i18n.t("about.missionText", { lng: language })}
              </Text>
            </View>
          </View>
          {/* Vision */}
          <View style={styles.card}>
            <MaterialIcons name="visibility" size={24} color="#1E40AF" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {i18n.t("about.visionTitle", { lng: language })}
              </Text>
              <Text style={styles.cardText}>
                {i18n.t("about.visionText", { lng: language })}
              </Text>
            </View>
          </View>
          {/* Values */}
          <Text style={styles.sectionTitle}>
            {i18n.t("about.valuesTitle", { lng: language })}
          </Text>
          <Text style={styles.paragraph}>
            {i18n.t("about.valuesText", { lng: language })}
          </Text>
          {/* Founder */}
          <Text style={styles.sectionTitle}>
            {i18n.t("about.founderTitle", { lng: language })}
          </Text>
          <View style={styles.card}>
            <MaterialIcons name="person" size={24} color="#1E40AF" />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {i18n.t("about.founderName", { lng: language })}
              </Text>
              <Text style={styles.role}>
                {i18n.t("about.founderRole", { lng: language })}
              </Text>
              <Text style={styles.cardText}>
                {i18n.t("about.founderText", { lng: language })}
              </Text>
            </View>
          </View>
          {/* Contact */}
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <TouchableOpacity
            style={styles.contactCard}
            onPress={handleWebsitePress}
          >
            <MaterialIcons name="public" size={22} color="#1E40AF" />
            <Text style={styles.contactText}>Website (Coming Soon)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() =>
              Alert.alert("Contact", "Email us at support@slemapp.com")
            }
          >
            <MaterialIcons name="email" size={22} color="#1E40AF" />
            <Text style={styles.contactText}>support@slemapp.com</Text>
          </TouchableOpacity>
          {/* Legal */}
          <Text style={styles.sectionTitle}>
            {i18n.t("about.legalTitle", { lng: language })}
          </Text>
          <TouchableOpacity style={styles.link} onPress={comingSoon}>
            <Text style={styles.linkText}>
              {i18n.t("about.privacy", { lng: language })}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={comingSoon}>
            <Text style={styles.linkText}>
              {i18n.t("about.terms", { lng: language })}
            </Text>
          </TouchableOpacity>
          <View style={{ height: 120 }} /> {/* Space for footer */}
        </Animated.View>
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

export default AboutSLEM;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E40AF",
    textAlign: "center",
  },
  version: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    padding: 16,
    borderRadius: 14,
    marginTop: 12,
  },
  cardContent: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: "#1F2937",
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#1E40AF",
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
    marginBottom: 12,
    borderRadius: 1,
  },
});
