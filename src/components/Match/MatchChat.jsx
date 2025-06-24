import React, { useState } from "react";

export default function MatchChat({ match }) {
  const [messages, setMessages] = useState([
    { fromMe: false, text: "Hi!" },
    { fromMe: true, text: "Hey there!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { fromMe: true, text: input }]);
    setInput("");
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-2 bg-white/80">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-2xl px-4 py-2 max-w-xs ${
              msg.fromMe
                ? "bg-pink-500 text-white ml-auto"
                : "bg-gray-200 text-black mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex items-center p-4 bg-white/90">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4 py-2 border focus:outline-none"
        />
        <button
          type="submit"
          className="ml-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full font-bold"
        >
          Send
        </button>
      </form>
    </div>
  );
}
