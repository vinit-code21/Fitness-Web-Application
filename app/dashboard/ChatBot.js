"use client";
import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input };
    setMessages([...messages, newMessage]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { role: "bot", text: data.reply };

    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-2xl p-3 flex flex-col">
      <div className="h-64 overflow-y-auto mb-2 p-2 border rounded">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-1 p-2 rounded ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 border rounded-l px-2 py-1"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-3 py-1 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}
