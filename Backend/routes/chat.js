const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");


router.get("/getchat", async (req, res) => {
  const { requestId } = req.query;

  console.log("📨 Received request for chat, requestId:", requestId);

  try {
    if (!requestId) {
      return res.status(400).json({
        success: false,
        message: "requestId is required",
      });
    }

    const chat = await Chat.findOne({ requestId })
      .populate({
        path: "messages.sender",
        select: "name email",
      })
      .populate({
        path: "participants",
        select: "name email",
      });

    console.log("💬 Chat exists?", chat ? "YES" : "NO");

    if (!chat) {
      return res.json({
        success: true,
        data: { messages: [], participants: [] },
      });
    }

    res.json({
      success: true,
      data: {
        messages: chat.messages || [],
        participants: chat.participants || [],
      },
    });
  } catch (error) {
    console.error("❌ Error fetching chat:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching chat",
    });
  }
});


router.post("/", async (req, res) => {
  const { requestId, participants = [] } = req.body;

  try {
    if (!requestId) {
      return res.status(400).json({
        success: false,
        message: "requestId is required",
      });
    }

    const chat = await Chat.findOneAndUpdate(
      { requestId },
      {
        $setOnInsert: {
          requestId,
          participants,
          messages: [],
        },
      },
      { upsert: true, new: true }
    ).populate({
      path: "participants",
      select: "name email",
    });

    console.log("🆕 Chat created or fetched:", chat._id);

    res.json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error("❌ Error creating chat:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating chat",
    });
  }
});

module.exports = router;
