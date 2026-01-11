import React, { useCallback, useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { getSocket } from "../services/socketClient";
import { useLocalSearchParams } from "expo-router";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const { chatId } = useLocalSearchParams();

  const socket = getSocket();
  const typingTimeoutRef = useRef(null);

  // optimized typing function (debounced)
  const handleTyping = useCallback(() => {
    socket.emit("typing", { chatId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { chatId });
    }, 1500);
  }, [chatId, socket]);

  const handleChangeText = useCallback(
    (value) => {
      setText(value);
      handleTyping();
    },
    [handleTyping]
  );

  return (
    <View className="flex-row items-center p-6 bg-white border-t border-gray-200 mb-10">
      <TextInput
        placeholder="Type a message..."
        value={text}
        onChangeText={handleChangeText}
        className="flex-1 p-3 bg-gray-100 rounded-full"
      />

      <TouchableOpacity
        className="ml-2 bg-blue-500 px-4 py-2 rounded-full"
        onPress={() => {
          onSend(text);
          setText("");
        }}
      >
        <Text className="text-white font-semibold">Send</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(ChatInput)
