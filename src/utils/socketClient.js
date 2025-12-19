// utils/socket.js
import { io } from "socket.io-client";

let socket = null;


export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 500,
    });

    console.log("🟢 Socket connected:", socket.id);
  }
  return socket;
};


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("🔴 Socket disconnected");
    socket = null;
  }
};
