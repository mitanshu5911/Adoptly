const express = require('express');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const http = require("http");           // <-- Added
const { Server } = require("socket.io"); // <-- Added
const Chat = require("./models/chat");  // <-- Added

// Cloudinary Config
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// DB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/Pet'));
app.use('/api', require('./routes/request'));
app.use('/api/chat', require('./routes/chat'));   // <-- Added chat routes

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",  // Replace with frontend URL in production
    methods: ["GET", "POST"]
  }
});

// SOCKET IO LOGIC
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Join chat room using requestId
  socket.on("joinRoom", (requestId) => {
    socket.join(String(requestId));
    console.log(`User ${socket.id} joined room ${requestId}`);
  });

  // Typing indicator
  socket.on("typing", ({ requestId, userId }) => {
    socket.to(String(requestId)).emit("typing", { userId });
  });

  // Send message
  socket.on("sendMessage", async ({ requestId, sender, text }) => {
    try {
      // Find or create chat
      let chat = await Chat.findOne({ requestId });
      if (!chat) {
        chat = await Chat.create({
          requestId,
          participants: [sender],
          messages: []
        });
      }

      // Optional: add sender to participants if missing
      if (!chat.participants.some(p => String(p) === String(sender))) {
        chat.participants.push(sender);
      }

      // Save message
      const message = { sender, text, timestamp: new Date() };
      chat.messages.push(message);
      await chat.save();

      // Send new message to all room users
      io.to(String(requestId)).emit("receiveMessage", message);

    } catch (err) {
      console.error("Error sending message:", err);
      socket.emit("errorMessage", "Server error while sending message");
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
