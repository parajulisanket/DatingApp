import React, { useState, useRef } from "react";
import {
  FaPhone,
  FaVideo,
  FaChevronLeft,
  FaPaperPlane,
  FaMicrophone,
} from "react-icons/fa";

export default function Chat({ user, onSendMessage, onBack }) {
  const [input, setInput] = useState("");
  const inputRef = useRef();

  // Height in px for padding (input bar height)
  const INPUT_BAR_HEIGHT = 72;

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
          className="text-[#FF3366] hover:bg-gray-100 rounded-full p-2 absolute left-4 top-1/2 -translate-y-1/2 transition"
          onClick={onBack}
          aria-label="Back"
        >
          <FaChevronLeft size={26} />
        </button>
        {/* Avatar, name, status */}
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
        {/* audio and video */}
        <div className="flex gap-3 cursor-pointer ">
          <div className="bg-pink-100 hover:bg-pink-200 p-2 rounded-xl text-[#FF3366] shadow-md">
            <FaPhone className="rotate-90" />{" "}
          </div>
          <div className="bg-pink-100 hover:bg-pink-200 p-2 rounded-xl text-[#FF3366] shadow-md">
            <FaVideo />
          </div>
        </div>
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
          <span className="text-gray-400 text-xs px-3 py-0.5 bg-gray-100 rounded-full">
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

      {/* Input bar - fixed at bottom for mobile, absolute for md+ */}
      <form
        onSubmit={sendMessage}
        className={`
          w-full p-5 flex items-center gap-2 bg-white border-t border-gray-200
          fixed bottom-0 left-0 right-0 z-10
          md:absolute md:bottom-0 md:left-0 md:right-0
        `}
        style={{
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
          className="ml-2 p-2 bg-[#FF3366] rounded-full text-white flex items-center justify-center hover:bg-pink-600"
          aria-label="Send"
        >
          <FaPaperPlane size={20} />
        </button>
      </form>
    </div>
  );
}
