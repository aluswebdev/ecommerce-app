// components/ChatHeader.jsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatHeader({ otherUser, router }) {
  return (
    <View className="flex-row items-center py-3 px-4 bg-white border-b border-gray-200 shadow-sm">
      <TouchableOpacity onPress={() => router.back()} className="mr-3">
        <Ionicons name="arrow-back" size={24} color="#1e40af" />
      </TouchableOpacity>

      <Image
        source={{ uri: otherUser?.profilePhoto || "https://via.placeholder.com/100" }}
        className="w-10 h-10 rounded-full"
      />

      <View className="ml-3">
        <Text className="font-semibold text-lg text-gray-900">
          {otherUser?.fullName || "Unknown User"}
        </Text>
        <Text className="text-xs text-green-600">Online</Text>
      </View>
    </View>
  );
}
