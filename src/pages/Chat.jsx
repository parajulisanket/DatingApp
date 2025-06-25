import React, { useRef, useState } from "react";
import {
  FaChevronLeft,
  FaInfoCircle,
  FaMicrophone,
  FaRegSmile,
  FaPlus,
} from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function Chat({ user, onSendMessage, onBack }) {
  const fileInputRef = useRef(null);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Send text message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(user.id, input);
    setInput("");
    setShowEmoji(false);
  };

  // Add image to chat
  const handleAddImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onSendMessage(user.id, { image: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  // Add emoji to input
  const handleEmojiSelect = (emoji) => {
    setInput((prev) => prev + emoji.native);
    setShowEmoji(false);
  };

  // Voice message logic
  const handleStartVoice = async () => {
    setIsRecording(true);
    if (navigator.mediaDevices && window.MediaRecorder) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new window.MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const audioUrl = URL.createObjectURL(audioBlob);
          onSendMessage(user.id, { audio: audioUrl });
          setIsRecording(false);
        };
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, 5000);
      } catch (err) {
        alert("Could not record audio");
        setIsRecording(false);
      }
    } else {
      alert("Voice message not supported in this browser");
      setIsRecording(false);
    }
  };
  const handleStopVoice = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  if (!user)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a user to start chatting
      </div>
    );

  return (
    <div className="flex-1 flex flex-col w-full h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6 pb-3 bg-white rounded-t-3xl shadow-sm sticky top-0 z-20">
        
        {/* Back arrow (mobile) */}
        <button className="text-gray-700 md:hidden" onClick={onBack}>
          <FaChevronLeft size={22} />
        </button>
        {/* Avatar & Info */}
        <div className="flex items-center">
          <img
            src={user.photo}
            alt={user.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow mr-3"
          />
          <div>
            <div className="font-bold text-lg text-black leading-none">
              {user.name}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{user.lastSeen}</div>
          </div>
        </div>
        <button className="text-gray-400">
          <FaInfoCircle size={22} />
        </button>
      </div>

      {/* Read receipt upsell */}
      <div className="w-full text-center py-2 bg-white">
        <div className="text-gray-300 text-lg">
          See when {user.name} read your message
        </div>
        <div className="text-orange-500 font-bold mt-0.5 cursor-pointer">
          Get read receipt
        </div>
      </div>

      {/* Emoji picker (absolute, above input) */}
      {showEmoji && (
        <div className="absolute bottom-24 left-0 right-0 mx-auto z-30">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
        </div>
      )}

      {/* Messages */}
      <div
        className="flex-1 w-full px-4 py-2 overflow-y-auto flex flex-col gap-3 bg-white"
        style={{ minHeight: "160px" }}
      >
        {user.messages.map((msg, i) =>
          msg.image ? (
            <div
              key={i}
              className={`rounded-2xl p-2 max-w-[70%] ${
                msg.fromMe ? "bg-pink-500 ml-auto" : "bg-gray-200 mr-auto"
              }`}
            >
              <img
                src={msg.image}
                alt="Sent"
                className="rounded-xl max-w-full max-h-40"
              />
            </div>
          ) : msg.audio ? (
            <div
              key={i}
              className={`rounded-2xl px-4 py-3 max-w-[70%] ${
                msg.fromMe
                  ? "bg-pink-500 text-white ml-auto"
                  : "bg-gray-200 text-black mr-auto"
              } flex items-center`}
            >
              <audio controls src={msg.audio} />
            </div>
          ) : (
            <div
              key={i}
              className={`rounded-2xl px-4 py-3 max-w-[70%] break-words ${
                msg.fromMe
                  ? "bg-pink-500 text-white ml-auto"
                  : "bg-gray-200 text-black mr-auto"
              }`}
            >
              {msg.text}
            </div>
          )
        )}
        {isRecording && (
          <div className="text-gray-400 text-sm text-center">
            Recording voice message...
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="w-full p-2 flex items-center gap-2 bg-white sticky bottom-0 z-20"
      >
        {/* Microphone: Record audio */}
        <button
          type="button"
          className={`text-gray-400 px-2 ${
            isRecording ? "text-pink-500 animate-pulse" : ""
          }`}
          onClick={isRecording ? handleStopVoice : handleStartVoice}
          disabled={isRecording}
        >
          <FaMicrophone size={26} />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new message"
          className="flex-1 rounded-3xl px-4 py-3 bg-[#f6f6f6] border-none outline-none text-gray-700 text-lg"
        />
        {/* Emoji button */}
        <button
          type="button"
          className="text-gray-400 px-2"
          onClick={() => setShowEmoji((v) => !v)}
          tabIndex={-1}
        >
          <FaRegSmile size={26} />
        </button>
        {/* Image attach button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAddImage}
        />
        <button
          type="button"
          className="text-gray-400 px-2"
          onClick={() => fileInputRef.current?.click()}
          tabIndex={-1}
        >
          <FaPlus size={26} />
        </button>
      </form>
    </div>
  );
}
