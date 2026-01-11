// screens/HelpCenterScreen.js
import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function HelpCenterScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <Pressable onPress={() => router.back()} className="mb-4">
        <Text className="text-blue-500">← Back</Text>
      </Pressable>
      <Text className="text-xl font-bold mb-4">Help Center</Text>
      <Pressable className="mb-4">
        <Text className="text-blue-500">Contact Support</Text>
      </Pressable>
      <Text className="text-gray-600">
        FAQs, delivery delays, payment issues, and return policies can be found
        here.
      </Text>
    </View>
  );
}
