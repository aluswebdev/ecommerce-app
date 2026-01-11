import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API calls - replace with actual MongoDB API
export const fetchChatRooms = createAsyncThunk(
  'chat/fetchChatRooms',
  async (userId) => {
    // Mock chat rooms data
    const mockChatRooms = [
      {
        id: 'room_1',
        participants: [
          {
            id: 'user1',
            name: 'John Doe',
            role: 'buyer',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
          },
          {
            id: 'seller1',
            name: 'Aminata Fashion',
            role: 'seller',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100'
          }
        ],
        lastMessage: {
          id: 'msg_latest',
          text: 'Thank you for your purchase! Your order will be shipped tomorrow.',
          senderId: 'seller1',
          timestamp: '2024-01-20T15:30:00Z',
          read: false
        },
        productContext: {
          id: '1',
          name: 'Traditional Gele Headwrap',
          image: 'https://images.unsplash.com/photo-1594736797933-d0b1b80d0b6e?w=100'
        },
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: '2024-01-20T15:30:00Z'
      },
      {
        id: 'room_2',
        participants: [
          {
            id: 'user1',
            name: 'John Doe',
            role: 'buyer',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
          },
          {
            id: 'seller2',
            name: 'Bo Farms Cooperative',
            role: 'seller',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
          }
        ],
        lastMessage: {
          id: 'msg_latest2',
          text: 'Is this palm oil organic certified?',
          senderId: 'user1',
          timestamp: '2024-01-19T14:20:00Z',
          read: true
        },
        productContext: {
          id: '2',
          name: 'Premium Palm Oil',
          image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100'
        },
        createdAt: '2024-01-19T14:00:00Z',
        updatedAt: '2024-01-19T14:20:00Z'
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockChatRooms.filter(room =>
      room.participants.some(p => p.id === userId)
    );
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ roomId, page = 1, limit = 50 }) => {
    // Mock messages data
    const mockMessages = [
      {
        id: 'msg_1',
        roomId: 'room_1',
        text: 'Hello! I\'m interested in the Traditional Gele Headwrap. Is it available in red and gold?',
        senderId: 'user1',
        senderName: 'John Doe',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        timestamp: '2024-01-20T10:05:00Z',
        read: true,
        type: 'text'
      },
      {
        id: 'msg_2',
        roomId: 'room_1',
        text: 'Yes, we have it in stock! The red and gold variant is very popular. Would you like me to reserve one for you?',
        senderId: 'seller1',
        senderName: 'Aminata Fashion',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100',
        timestamp: '2024-01-20T10:10:00Z',
        read: true,
        type: 'text'
      },
      {
        id: 'msg_3',
        roomId: 'room_1',
        text: 'That would be great! Can you tell me more about the material and care instructions?',
        senderId: 'user1',
        senderName: 'John Doe',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        timestamp: '2024-01-20T10:15:00Z',
        read: true,
        type: 'text'
      },
      {
        id: 'msg_4',
        roomId: 'room_1',
        text: 'It\'s made from 100% cotton with traditional gold threading. Hand wash only to preserve the colors. Very durable and comfortable to wear!',
        senderId: 'seller1',
        senderName: 'Aminata Fashion',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100',
        timestamp: '2024-01-20T10:20:00Z',
        read: true,
        type: 'text'
      },
      {
        id: 'msg_5',
        roomId: 'room_1',
        text: 'Perfect! I\'ll place an order now.',
        senderId: 'user1',
        senderName: 'John Doe',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        timestamp: '2024-01-20T10:25:00Z',
        read: true,
        type: 'text'
      },
      {
        id: 'msg_latest',
        roomId: 'room_1',
        text: 'Thank you for your purchase! Your order will be shipped tomorrow.',
        senderId: 'seller1',
        senderName: 'Aminata Fashion',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100',
        timestamp: '2024-01-20T15:30:00Z',
        read: false,
        type: 'text'
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 500));
    
    const roomMessages = mockMessages.filter(msg => msg.roomId === roomId);
    return {
      messages: roomMessages,
      hasMore: false,
      page
    };
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ roomId, text, senderId, senderName, senderAvatar, type = 'text', attachments = [] }) => {
    // Mock API call
    const newMessage = {
      id: `msg_${Date.now()}`,
      roomId,
      text,
      senderId,
      senderName,
      senderAvatar,
      timestamp: new Date().toISOString(),
      read: false,
      type,
      attachments
    };

    await new Promise(resolve => setTimeout(resolve, 300));
    return newMessage;
  }
);

export const markMessagesAsRead = createAsyncThunk(
  'chat/markMessagesAsRead',
  async ({ roomId, userId }) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 200));
    return { roomId, userId };
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    rooms: [],
    currentRoom: null,
    messages: {},
    loading: false,
    error: null,
    sendingMessage: false,
    onlineUsers: []
  },
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    clearCurrentRoom: (state) => {
      state.currentRoom = null;
    },
    addMessage: (state, action) => {
      const message = action.payload;
      if (!state.messages[message.roomId]) {
        state.messages[message.roomId] = [];
      }
      state.messages[message.roomId].push(message);
      
      // Update last message in room
      const room = state.rooms.find(r => r.id === message.roomId);
      if (room) {
        room.lastMessage = message;
        room.updatedAt = message.timestamp;
      }
    },
    updateOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    markRoomMessagesAsRead: (state, action) => {
      const { roomId, userId } = action.payload;
      if (state.messages[roomId]) {
        state.messages[roomId] = state.messages[roomId].map(msg =>
          msg.senderId !== userId ? { ...msg, read: true } : msg
        );
      }
      
      // Update room last message read status
      const room = state.rooms.find(r => r.id === roomId);
      if (room && room.lastMessage && room.lastMessage.senderId !== userId) {
        room.lastMessage.read = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { messages } = action.payload;
        if (messages.length > 0) {
          const roomId = messages[0].roomId;
          state.messages[roomId] = messages;
        }
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.sendingMessage = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendingMessage = false;
        const message = action.payload;
        if (!state.messages[message.roomId]) {
          state.messages[message.roomId] = [];
        }
        state.messages[message.roomId].push(message);
        
        // Update room last message
        const room = state.rooms.find(r => r.id === message.roomId);
        if (room) {
          room.lastMessage = message;
          room.updatedAt = message.timestamp;
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendingMessage = false;
        state.error = action.error.message;
      })
      .addCase(markMessagesAsRead.fulfilled, (state, action) => {
        const { roomId, userId } = action.payload;
        if (state.messages[roomId]) {
          state.messages[roomId] = state.messages[roomId].map(msg =>
            msg.senderId !== userId ? { ...msg, read: true } : msg
          );
        }
      });
  }
});

export const {
  setCurrentRoom,
  clearCurrentRoom,
  addMessage,
  updateOnlineUsers,
  markRoomMessagesAsRead
} = chatSlice.actions;

export default chatSlice.reducer;