"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function AssistantUI({ initialMessages }) {
  const [messages, setMessages] = useState(
    initialMessages || [
      { role: "assistant", text: "Hi! How can I help with your fitness today?" },
    ]
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load saved chat history for logged-in user (if any)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/chat/history");
        const data = await res.json();
        if (!mounted) return;
        if (data?.success && Array.isArray(data.messages) && data.messages.length > 0) {
          // Map server messages to local shape
          setMessages(data.messages.map((m) => ({ role: m.role, text: m.text })));
        }
      } catch (err) {
        // ignore - show default initial message
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmedInput }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/fitness-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data = await res.json();
      const aiReply = data.reply || data.response || "No response from AI.";
      setMessages((prev) => [...prev, { role: "assistant", text: aiReply }]);

      // Persist the user + assistant messages to server-side history
      (async () => {
        try {
          await fetch("/api/chat/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [
                { role: "user", text: trimmedInput },
                { role: "assistant", text: aiReply },
              ],
            }),
          });
        } catch (e) {
          // ignore save errors
        }
      })();
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Error connecting to AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1A1A]/90 backdrop-blur-md text-white rounded-none">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-green-400/10 to-cyan-400/10">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse" />
          AI Fitness Assistant
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0E0E0E]/70">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-[85%] rounded-2xl p-3 shadow-md ${
              msg.role === "assistant"
                ? "bg-gradient-to-r from-green-400/10 to-cyan-400/10 border-l-2 border-green-400/40"
                : "bg-gray-800/40 border-r-2 border-cyan-400/30 self-end ml-auto"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </motion.div>
        ))}
        {loading && (
          <p className="text-xs text-gray-400 animate-pulse">AI is typing...</p>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-800 bg-[#1A1A1A]/80">
        <div className="flex items-center gap-2 bg-gray-800/50 rounded-xl border border-gray-700 px-3 py-2">
          <input
            type="text"
            placeholder="Ask about workouts, diet, or goals..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-transparent text-white outline-none placeholder-gray-400 text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="p-2 bg-gradient-to-r from-green-400 to-cyan-400 text-black rounded-lg hover:from-green-500 hover:to-cyan-500 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
