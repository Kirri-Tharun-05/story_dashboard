// ChatGPTStyleChat.jsx
import React, { useState } from "react";

export default function ChatGPTStyleChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "This is a sample reply from assistant." }
      ]);
    }, 500);
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-lg font-semibold mb-4">ChatGPT Clone</h2>
        <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded w-full">
          + New Chat
        </button>
        {/* Add more sidebar items as needed */}
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-4 border-b border-gray-300 bg-white shadow-sm">
          <h1 className="text-xl font-medium">Chat</h1>
        </div>

        {/* Chat messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-2xl px-4 py-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-100 self-end ml-auto"
                  : "bg-gray-200 self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-300 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-4 py-2"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
