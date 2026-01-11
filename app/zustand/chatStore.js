// store/chatStore.js
import { create } from "zustand";

export const useChatStore = create((set) => ({
  currentChat: null,
  messages: [],
  setCurrentChat: (chat) => set({ currentChat: chat }),
  setMessages: (messages) => set({ messages }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));

