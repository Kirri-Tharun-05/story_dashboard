import { useState } from "react";

export default function ChatDashboard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "You", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Simple Chat Dashboard</h1>

      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-md">
        <div className="p-4 h-[60vh] overflow-y-auto rounded-t-2xl">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className="bg-blue-700 bg-opacity-40 p-3 rounded-xl mb-3 max-w-[80%]">
                <strong>{msg.sender}:</strong> <span>{msg.text}</span>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2 p-4 bg-gray-900 rounded-b-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
