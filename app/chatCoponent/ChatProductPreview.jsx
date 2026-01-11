import React from "react";
import { View, Text, Image } from "react-native";
import { useChatStore } from "../zustand/chatStore/chatStore";

export default function ChatProductPreview({ chatId }) {
  const { chats } = useChatStore();

  const chat = chats.find((c) => c._id === chatId);
  if (!chat) return null;

  const product = chat.product;

  return (
    <View className="flex-row items-center p-3 bg-gray-100 border-b border-gray-300">
      <Image
        source={{ uri: product.images[0] }}
        className="w-14 h-14 rounded-lg"
      />
      <View className="ml-3 flex-1">
        <Text className="font-semibold">{product.title}</Text>
        <Text className="text-blue-500 font-bold">Le {product.price}</Text>
      </View>
    </View>
  );
}
