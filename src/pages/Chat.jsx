import React, { useState, useRef } from "react";
import {
  FaChevronLeft,
  FaEllipsisV,
  FaPaperPlane,
  FaMicrophone,
} from "react-icons/fa";

export default function Chat({ user, onSendMessage, onBack }) {
  const [input, setInput] = useState("");
  const inputRef = useRef();

  // Estimate heights (in px)
  const INPUT_BAR_HEIGHT = 72; 
  const BOTTOM_NAV_HEIGHT = 75; 
  // const TOTAL_BOTTOM = INPUT_BAR_HEIGHT + BOTTOM_NAV_HEIGHT;



  // Send text message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(user.id, input);
    setInput("");
  };

  if (!user) return null;

  return (
    <div className="flex-1 flex flex-col w-full h-full relative bg-white">
      {/* Chat header */}
      <div
        className="relative px-6 pt-7 pb-4 bg-white rounded-t-[32px] shadow flex items-center"
        style={{ minHeight: 85 }}
      >
        {/* Back arrow */}
        <button
          className="text-gray-500 hover:bg-gray-100 rounded-full p-2 absolute left-4 top-1/2 -translate-y-1/2 transition"
          onClick={onBack}
          aria-label="Back"
        >
          <FaChevronLeft size={26} />
        </button>
        {/* Avatar, name, status - centered */}
        <div className="flex flex-1 flex-col items-center justify-center min-w-0">
          <div className="flex items-center gap-3">
            <img
              src={user.photo}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover border-4 border-white shadow"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-lg text-black truncate">
                {user.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-pink-500">Online</span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
        {/* Three-dot menu */}
        <button
          className="text-gray-500 hover:bg-gray-100 rounded-full p-2 absolute right-4 top-1/2 -translate-y-1/2 transition"
          aria-label="Options"
        >
          <FaEllipsisV size={20} />
        </button>
      </div>
      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Messages */}
      <div
        className="flex-1 w-full px-4 py-4 overflow-y-auto flex flex-col gap-3 bg-white"
        style={{
          paddingBottom: `${INPUT_BAR_HEIGHT + 16}px`,
        }}
      >
        {/* Date separator */}
        <div className="flex items-center justify-center my-2">
          <span className="text-gray-300 text-xs px-3 py-0.5 bg-gray-50 rounded-full">
            Today
          </span>
        </div>
        {/* Message bubbles */}
        {user.messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col max-w-[75%] ${
              msg.fromMe ? "ml-auto items-end" : "mr-auto items-start"
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-3 mb-1 break-words text-base ${
                msg.fromMe
                  ? "bg-pink-100 text-gray-900"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-xs text-gray-400 mt-0.5">
              {msg.time || "2:55 PM"}
            </span>
          </div>
        ))}
      </div>

      {/* Input bar - always above BottomNav */}
      <form
        onSubmit={sendMessage}
        className="w-full px-4 py-3 flex items-center gap-2 bg-white border-t border-gray-100"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: `${BOTTOM_NAV_HEIGHT}px`,
          zIndex: 10,
          borderBottomLeftRadius: "32px",
          borderBottomRightRadius: "32px",
          minHeight: `${INPUT_BAR_HEIGHT}px`,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Your message"
          className="flex-1 rounded-3xl px-4 py-3 bg-gray-100 border-none outline-none text-gray-500 text-base"
          ref={inputRef}
        />
        <button
          type="button"
          className="text-gray-400 px-2"
          tabIndex={-1}
          aria-label="Microphone"
        >
          <FaMicrophone size={22} />
        </button>
        <button
          type="submit"
          className="ml-2 p-2 bg-pink-500 rounded-full text-white flex items-center justify-center hover:bg-pink-600"
          aria-label="Send"
        >
          <FaPaperPlane size={20} />
        </button>
      </form>
    </div>
  );
}
