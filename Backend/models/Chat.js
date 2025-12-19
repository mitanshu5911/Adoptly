// models/Chat.js
const mongoose = require("mongoose");

// Message Schema
const messageSchema = new mongoose.Schema({
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  text: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

// Chat Schema
const chatSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    required: true,
    unique: true   
  },

  
  participants: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    }
  ],

  messages: [messageSchema],

}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
