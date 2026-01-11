// services/socket.js
import { io } from "socket.io-client";
import API from "../api/axiosAPI";

let socket = null;

const SOCKET_URL = API.defaults.baseURL.replace("/api/v1", "")

export const initSocket = (token) => {
  if (socket && socket.connected) return socket;
  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
  });

  socket.on("connect_error", (err) => {
    console.warn("Socket connect_error:", err.message);
  });

  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
