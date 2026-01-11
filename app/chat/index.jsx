import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useChatStore } from "../zustand/chatStore/chatStore";
import useAuthStore  from "../zustand/authStore"; // <-- import authStore
import { useRouter } from "expo-router";
import { formatTime } from "../config/formatTime";

export default function ChatListScreen() {
  const router = useRouter();
  const { chats, fetchChats } = useChatStore();
  const { user } = useAuthStore(); // <-- logged-in user

  

  useEffect(() => {
    fetchChats();
  }, []);

   // -----------------------------------------
    // SET OTHER USER (BUYER OR SELLER)
    // -----------------------------------------
    // useEffect(() => {
    //   const chat = chats.find((c) => c._id === chatId);
    //   if (!chat) return;
  
    //   const person = chat.participants.find((p) => p._id !== user.id);
    //   setOtherUser(person);
    // }, [chats, user.id]);

  const renderItem = ({ item }) => {
    const otherUser = item.participants.find((p) => p._id !== user.id);
    console.log(otherUser.fullName)
    console.log(item._id)

    return (
      <TouchableOpacity
        className="flex-row items-center p-3 border-b border-gray-200"
        onPress={() => router.push(`../chat/${item._id}`)}
      >
        <Image
          source={{
            uri: otherUser?.profilePhoto || "https://via.placeholder.com/50",
          }}
          className="w-12 h-12 rounded-full"
        />

        <View className="ml-3 flex-1">
          <Text className="font-semibold text-lg">
            {otherUser?.fullName || "User"}
          </Text>
          <Text className="text-gray-500" numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>

        <Text className="text-xs text-gray-400">
          {new Date(item.updatedAt).toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}
