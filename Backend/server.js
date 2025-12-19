const express = require('express');
const app = express();
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const http = require("http");           
const { Server } = require("socket.io"); 
const Chat = require("./models/chat");  


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


connectDB();


app.use(express.json());
app.use(cors());


app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/Pet'));
app.use('/api', require('./routes/request'));
app.use('/api/chat', require('./routes/chat'));  


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",  
    methods: ["GET", "POST"]
  }
});


io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  
  socket.on("joinRoom", (requestId) => {
    socket.join(String(requestId));
    console.log(`User ${socket.id} joined room ${requestId}`);
  });


  socket.on("typing", ({ requestId, userId }) => {
    socket.to(String(requestId)).emit("typing", { userId });
  });

  
  socket.on("sendMessage", async ({ requestId, sender, text }) => {
    try {
      
      let chat = await Chat.findOne({ requestId });
      if (!chat) {
        chat = await Chat.create({
          requestId,
          participants: [sender],
          messages: []
        });
      }

    
      if (!chat.participants.some(p => String(p) === String(sender))) {
        chat.participants.push(sender);
      }

    
      const message = { sender, text, timestamp: new Date() };
      chat.messages.push(message);
      await chat.save();

      
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
