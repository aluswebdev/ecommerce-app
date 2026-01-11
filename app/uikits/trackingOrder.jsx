// screens/TrackOrderScreen.js
import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function TrackOrderScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <Pressable onPress={() => router.back()} className="mb-4">
        <Text className="text-blue-500">← Back</Text>
      </Pressable>
      <Text className="text-xl font-bold mb-4">Track Order</Text>
      <Text className="text-gray-600">Tracking order #12345...</Text>
    </View>
  );
}
