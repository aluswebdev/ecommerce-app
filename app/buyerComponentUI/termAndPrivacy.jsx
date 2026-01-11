import { useState } from "react";
import { View, ScrollView, Pressable, Linking } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text } from "../reusableComponent/Text";

export default function InteractiveTermsPrivacyScreen() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-5 bg-white shadow-sm">
        <Pressable onPress={() => router.back()} className="bg-blue-100 p-2 rounded-full">
          <Feather name="arrow-left" size={22} color="#0057b8" />
        </Pressable>
        <Text className="text-lg font-bold text-gray-900">Terms & Privacy</Text>
        <View className="w-6" />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Terms of Service */}
        <Pressable
          onPress={() => setShowTerms(!showTerms)}
          className="flex-row justify-between items-center mb-2"
        >
          <Text className="text-xl font-bold text-gray-900">
            Terms of Service
          </Text>
          <MaterialIcons
            name={showTerms ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="#374151"
          />
        </Pressable>
        {showTerms && (
          <View className="mb-6 bg-white rounded-xl shadow-sm p-4">
            <Text className="text-gray-700 leading-6 mb-2">
              Welcome to our app. By accessing or using our services, you agree
              to the following:
            </Text>
            <View className="ml-4 mb-2">
              <Bullet text="Use the app responsibly and legally." />
              <Bullet text="Do not misuse our services or attempt unauthorized access." />
              <Bullet text="We may update the terms periodically; continued use means acceptance." />
            </View>
          </View>
        )}

        {/* Privacy Policy */}
        <Pressable
          onPress={() => setShowPrivacy(!showPrivacy)}
          className="flex-row justify-between items-center mb-2"
        >
          <Text className="text-xl font-bold text-gray-900">
            Privacy Policy
          </Text>
          <MaterialIcons
            name={showPrivacy ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="#374151"
          />
        </Pressable>
        {showPrivacy && (
          <View className="mb-6 bg-white rounded-xl shadow-sm p-4">
            <Text className="text-gray-700 leading-6 mb-2">
              Your privacy is important. Key points include:
            </Text>
            <View className="ml-4 mb-2">
              <Bullet text="We respect your privacy and never sell your personal data." />
              <Bullet text="You can request access, correction, or deletion of your data." />
              <Bullet text="Cookies and analytics may be used to enhance your experience." />
              <Bullet
                text="Contact us at privacy@example.com"
                link="mailto:privacy@example.com"
              />
            </View>
          </View>
        )}

        {/* Agree Button */}
        <Pressable
          onPress={() => router.back()}
          className="mt-4 bg-[#0057b8] py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold">I Agree</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

// Reusable bullet point component
function Bullet({ text, link }) {
  return (
    <Pressable
      onPress={() => link && Linking.openURL(link)}
      className="flex-row items-start mb-2"
    >
      <View className="w-2 h-2 bg-[#0057b8] rounded-full mt-2 mr-2" />
      <Text
        className={`text-gray-700 ${link ? "underline text-blue-600" : ""}`}
      >
        {text}
      </Text>
    </Pressable>
  );
}
