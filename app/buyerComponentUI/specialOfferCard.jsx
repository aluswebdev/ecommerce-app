import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Gift, Percent } from "lucide-react-native";

export default function SpecialOfferCard() {
  return (
    <LinearGradient
      colors={["#f97316", "#ec4899"]} // orange-500 to pink-500
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="mt-4 rounded-2xl p-4"
    >
      <View className="flex-row justify-between items-center">
        <View>
          <View className="flex-row items-center gap-2 mb-1">
            <Percent size={20} color="white" />
            <Text className="text-white font-semibold">Special Offer</Text>
          </View>
          <Text className="text-white text-sm opacity-90">
            Get 20% off on your first order! Use code FIRST20 at checkout.
          </Text>
        </View>
        <Gift size={48} color="white" style={{ opacity: 0.8 }} />
      </View>
    </LinearGradient>
  );
}
