import { create } from "zustand";
import API from "../../api/axiosAPI";

export const useChatStore = create((set, get) => ({
  chats: [],
  messages: [],
  activeChat: null,
  typingUsers: {}, // { chatId: [userIds] }
  loadingMessages: false,

  // -----------------------------
  // ACTIVE CHAT
  // -----------------------------
  setActiveChat: (chatId) => {
    const current = get().activeChat;
    if (current === chatId) return; // Prevent infinite loops
    set({ activeChat: chatId });
  },

  // -----------------------------
  // MESSAGES LOGIC
  // -----------------------------
  setMessages: (msgs) => set({ messages: msgs }),

  appendMessage: (msg) => {
    const current = get().messages;
    set({ messages: [...current, msg] });
  },

  // -----------------------------
  // FETCH ALL CHATS
  // -----------------------------
  fetchChats: async () => {
    const res = await API.get("/chats");
    set({ chats: res.data });
  },

  // -----------------------------
  // FETCH CHAT MESSAGES
  // -----------------------------
  fetchMessages: async (chatId) => {
    set({ loadingMessages: true });

    try {
      const res = await API.get(`/chats/${chatId}`);
      set({ messages: res.data });
    } finally {
      set({ loadingMessages: false });
    }
  },

  // -----------------------------
  // SEND MESSAGE
  // (Instant UI update + real API request)
  // -----------------------------
  sendMessage: async (chatId, text) => {
    // Create temp bubble for instant UI
    const tempMessage = {
      _id: Date.now().toString(),
      text,
      sender: { _id: get().userId || "me" },
      createdAt: new Date().toISOString(),
      status: "sending",
    };

    get().appendMessage(tempMessage);

    try {
      const res = await API.post(`/chats/${chatId}/send`, { text });

      // Replace temp message with actual message
      const updated = get().messages.map((m) =>
        m._id === tempMessage._id ? res.data : m
      );

      set({ messages: updated });

      return res.data;
    } catch (err) {
      console.log("SEND ERROR:", err);
      return null;
    }
  },

  // -----------------------------
  // MESSAGE STATUS UPDATES
  // -----------------------------
  updateMessageStatus: (messageId, status) => {
    const updated = get().messages.map((m) =>
      m._id === messageId ? { ...m, status } : m
    );
    set({ messages: updated });
  },

  // -----------------------------
  // TYPING INDICATOR
  // -----------------------------
  setTyping: (chatId, userId, isTyping) => {
    const typing = { ...get().typingUsers };

    if (!typing[chatId]) typing[chatId] = [];

    if (isTyping) {
      if (!typing[chatId].includes(userId)) {
        typing[chatId].push(userId);
      }
    } else {
      typing[chatId] = typing[chatId].filter((id) => id !== userId);
    }

    set({ typingUsers: typing });
  },
}));
