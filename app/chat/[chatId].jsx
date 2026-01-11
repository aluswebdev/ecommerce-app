import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useChatStore } from "../zustand/chatStore/chatStore";
import { getSocket } from "../services/socketClient";
import ChatBubble from "../chatCoponent/ChatBubble";
import ChatInput from "../chatCoponent/ChatInput";
import useAuthStore from "../zustand/authStore";
import ChatHeader from "../chatCoponent/chatHeader";

import TypingDots from "../chatCoponent/typingComp";

export default function ChatRoom() {
  const { chatId } = useLocalSearchParams();
  const { user } = useAuthStore();
  const router = useRouter();
  const scrollRef = useRef(null);

  const [otherUser, setOtherUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    messages,
    fetchMessages,
    sendMessage,
    setActiveChat,
    appendMessage,
    chats,
    setMessages,
  } = useChatStore();

  // -----------------------------------------
  // SET OTHER USER (BUYER OR SELLER)
  // -----------------------------------------
  useEffect(() => {
    const chat = chats.find((c) => c._id === chatId);
    if (!chat) return;

    const person = chat.participants.find((p) => p._id !== user.id);
    setOtherUser(person);
  }, [chats, chatId, user.id]);

  // -----------------------------------------
  // INITIAL FETCH + JOIN SOCKET ROOM
  // -----------------------------------------
  useEffect(() => {
    if (!chatId) return;

    fetchMessages(chatId);
    // setActiveChat(chatId);

    const socket = getSocket();
    if (!socket) return;

    socket.emit("joinChat", chatId);

    return () => {
      socket.emit("leaveChat", chatId);
    };
  }, [chatId]);

  // -----------------------------------------
  // SOCKET REALTIME MESSAGE LISTENER
  // -----------------------------------------
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (msg) => {
      if (msg.chat === chatId) {
        appendMessage(msg);
        scrollRef.current?.scrollToEnd({ animated: true });
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [chatId]);

  // -----------------------------------------
  // SOCKET TYPING INDICATOR
  // -----------------------------------------
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("markRead", { chatId });

    socket.on("typing", ({ chatId: cId, userId }) => {
      if (cId === chatId && userId !== user.id) {
        setIsTyping(true);
      }
    });

    socket.on("stopTyping", ({ chatId: cId, userId }) => {
      if (cId === chatId && userId !== user.id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [chatId, user.id]);

  // -----------------------------------------
  // SEND MESSAGE HANDLER
  // -----------------------------------------

  const handleSend = useCallback(
    async (text) => {
      if (!text.trim()) return;
      await sendMessage(chatId, text);
      scrollRef.current?.scrollToEnd({ animated: true });
    },
    [chatId, sendMessage]
  );

  // -----------------------------------------
  // RENDER ITEMS
  // -----------------------------------------
  const renderItem = useCallback(({ item }) => <ChatBubble item={item} />, []);

  // -----------------------------------------
  // LOAD MORE MESSAGE
  // -----------------------------------------
  const loadMoreMessage = async () => {
    if (loadingMore) return;

    setLoadingMore(true);
    const olderMessages = await fetchMessages(chatId, page + 1);

    if (olderMessages.length > 0) {
      setMessages((prev) => [...olderMessages, ...prev]);
      setPage((prev) => prev + 1);
    }

    setLoadingMore(false);
  };

  // -----------------------------------------
  // UI RENDER
  // -----------------------------------------
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ChatHeader otherUser={otherUser} isTyping={isTyping} router={router} />

      <FlatList
        ref={scrollRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreMessage}
        inverted //show newest at bottom
        // PERFORMANCE BOOSTER
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        // AVOID UNNECESSARY RE-RENDERS
        keyboardShouldPersistTaps="always"
        // smooth scroll to bottom when new message arrive
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Typing indicator */}
      {isTyping && <TypingDots />}

      <ChatInput onSend={handleSend} chatId={chatId} />
    </KeyboardAvoidingView>
  );
}
