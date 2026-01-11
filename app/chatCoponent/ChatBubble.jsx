import React, { useMemo } from "react";
import { View, Text } from "react-native";
import useAuthStore from "../zustand/authStore";
import { Ionicons } from "@expo/vector-icons";

const ChatBubble = ({ item }) => {
  const { user } = useAuthStore();

  const userId = user._id || user.id

  const isMine = item.sender._id === userId;

  const time = useMemo(() => {
    return new Date(item.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [item.createdAt]);

  return (
    <View
      className={`m-2 p-3 rounded-2xl max-w-[80%] ${
        isMine ? "self-end bg-[#1e40af]" : "self-start bg-gray-200"
      }`}
    >
      <Text className={isMine ? "text-white" : "text-black"}>{item.text}</Text>

      <View className="flex-row items-center justify-end mt-1">
        <Text
          className={`text-[10px] mr-1 ${
            isMine ? "text-blue-200" : "text-gray-500"
          }`}
        >
          {time}
        </Text>

        {isMine && (
          <Ionicons
            name={
              item.status === "read"
                ? "checkmark-done"
                : item.status === "delivered"
                  ? "checkmark-done-outline"
                  : "checkmark-outline"
            }
            size={14}
            color={item.status === "delivered" ? "#a7f3d0" : "#e0e7ff"}
          />
        )}
      </View>
    </View>
  );
};

export default React.memo(ChatBubble);
