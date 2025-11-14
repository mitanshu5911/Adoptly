import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSocket } from "../../utils/socketClient";
import axios from "axios";
import { X, Send, Loader, User } from "lucide-react";

export default function ChatBox({
  open,
  onClose,
  requestId,
  currentUser,
  initialPosition = "bottom-right",
}) {
  const socket = getSocket();
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);

  const lastEmit = useRef(0);
  const typingTimeout = useRef(null);
  const scrollRef = useRef(null);

  // ----------------------------------------
  // Load Chat + Join Room
  // ----------------------------------------
  useEffect(() => {
    if (!requestId) return;

    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/getchat", {
          params: { requestId },
        });

        const chat = res.data?.data ?? { messages: [], participants: [] };

        if (mounted) {
          setMessages(chat.messages || []);
          setParticipants(chat.participants || []);
        }
      } catch (err) {
        console.error("Chat load error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    socket.emit("joinRoom", requestId);

    // Receive messages
    socket.on("receiveMessage", (msg) => {
      if (String(msg.sender) === String(currentUser._id)) return;

      setMessages((prev) => [...prev, msg]);
    });

    // Typing
    socket.on("typing", ({ userId }) => {
      if (userId !== currentUser._id) {
        setTyping(true);
        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => setTyping(false), 1200);
      }
    });

    return () => {
      mounted = false;
      socket.off("receiveMessage");
      socket.off("typing");
    };
  }, [requestId]);

  // Scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // ----------------------------------------
  // Send Message
  // ----------------------------------------
  const handleSend = () => {
    if (!text.trim()) return;

    setSending(true);

    const newMsg = {
      sender: currentUser._id,
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);

    socket.emit("sendMessage", {
      requestId,
      sender: currentUser._id,
      text: newMsg.text,
    });

    setText("");
    setSending(false);
  };

  // Typing Handler
  const handleTyping = (value) => {
    setText(value);

    const now = Date.now();
    if (now - lastEmit.current > 700) {
      socket.emit("typing", { requestId, userId: currentUser._id });
      lastEmit.current = now;
    }
  };

  // ----------------------------------------
  // UI
  // ----------------------------------------
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 40 }}
          transition={{ duration: 0.25 }}
          className={`fixed z-50 ${
            initialPosition === "bottom-right"
              ? "bottom-6 right-6"
              : "inset-0 flex items-center justify-center"
          }`}
        >
          <motion.div
            layout
            className="w-[360px] md:w-[440px] max-h-[75vh] bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col border border-green-200"
          >
            {/* ---------------- Header ---------------- */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur">
                  <User size={18} />
                </div>

                <div>
                  <div className="text-sm font-semibold">Pet Connect Chat</div>
                  <div className="text-xs opacity-80 truncate max-w-[180px]">
                    {participants
                      ?.filter((p) => p._id !== currentUser._id)
                      .map((p) => p.name)
                      .join(", ") || "Loading..."}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {loading ? (
                  <div className="text-xs flex items-center gap-1">
                    <Loader className="animate-spin" size={14} /> Loading
                  </div>
                ) : typing ? (
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="text-xs"
                  >
                    Typing…
                  </motion.div>
                ) : null}

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ---------------- Messages ---------------- */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-auto p-4 space-y-3 bg-gradient-to-b from-white to-green-50"
            >
              {messages.length === 0 && !loading && (
                <div className="text-center text-sm text-gray-400 mt-8">
                  No messages yet. Say hi 👋
                </div>
              )}

              {messages.map((m, idx) => {
                const isMine =
                  String(m.sender?._id || m.sender) === String(currentUser._id);
                const msgDate = new Date(m.timestamp);

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-md
                        ${
                          isMine
                            ? "bg-gradient-to-br from-green-500 to-green-600 text-white rounded-br-none"
                            : "bg-green-100 text-gray-800 border border-green-200 rounded-bl-none"
                        }`}
                    >
                      <div>{m.text}</div>
                      <div
                        className={`text-[10px] mt-1 text-right ${
                          isMine ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        {msgDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ---------------- Input ---------------- */}
            <div className="px-3 py-3 border-t bg-white backdrop-blur">
              <div className="flex items-center gap-2">
                <input
                  value={text}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl px-4 py-2 border border-green-300 text-sm focus:ring-2 focus:ring-green-500"
                />

                <motion.button
                  onClick={handleSend}
                  disabled={sending || !text.trim()}
                  whileTap={{ scale: 0.9 }}
                  className={`px-3 py-2 rounded-xl text-white flex items-center gap-2
                    ${
                      text.trim()
                        ? "bg-gradient-to-r from-green-500 to-green-600"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                  <Send size={16} />
                  <span className="hidden sm:inline">Send</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
