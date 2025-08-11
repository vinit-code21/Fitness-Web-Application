"use client";
import { useState, useRef, useEffect } from "react";

export default function AssistantUI() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! How can I help with your fitness today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Unknown error");
      }
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply || "I’m here, but couldn’t get a proper response just now.",
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            `⚠ Oops, I couldn’t connect to AI. ${err.message ? "Error: " + err.message : "Let’s try again or you can ask something else."}`,
        },
      ]);
    }

    setLoading(false);
  };

  // Optional: test API connection
  const testApi = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "test" }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `API test: ${JSON.stringify(data)}` },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "API test failed." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <h2 className="text-lg font-bold mb-4">AI Fitness Assistant</h2>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto space-y-3 bg-[#2E3C36] p-3 rounded-lg">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[85%] transition-opacity duration-300 ${
              msg.role === "assistant"
                ? "bg-[#80FF72] text-black self-start"
                : "bg-white/20 text-white self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="p-2 rounded-lg bg-[#80FF72] text-black self-start animate-pulse">
            Typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 p-2 rounded-l-lg bg-[#1f2925] border border-white/20 text-white"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-[#80FF72] text-black px-4 rounded-r-lg"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
        <button
          className="bg-blue-500 text-white px-2 rounded"
          onClick={testApi}
          disabled={loading}
        >
          Test API
        </button>
      </div>
    </div>
  );
}
