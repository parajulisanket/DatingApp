import React, { useState } from "react";
// import SettingsDropdown from "./Common/SettingsDropdown";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import BottomNav from "./BottomNav/BottomNav";
import { useNavigate } from "react-router-dom";
import Filter from "./Common/Filter";

export default function UserList({ users, selectedUserId, onSelect }) {
  const [search, setSearch] = useState("");
  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  const navigate = useNavigate();

  // Activities bar
  const activities = [
    { name: users[0]?.name, photo: users[0]?.photo },
    ...users.slice(1, 5),
  ];

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      {/* Main scrollable content */}
      <div className="flex-1 flex flex-col w-full h-full relative example pb-20">
        {/* Header with settings */}
        <div className="flex items-center justify-between px-6 pt-8 pb-1">
          {/* Back Arrow */}
          <button
            className="w-11 h-11 flex items-center justify-center text-[#FF3366] text-3xl bg-white"
            onClick={() => navigate(-1)}
            aria-label="Go Back"
          >
            <FiArrowLeft />
          </button>
          {/* Centered Title */}
          <div className="flex-1 text-3xl text-black font-bold tracking-wide text-center">
            Messages
          </div>
          {/* Filter */}
          <Filter />
        </div>

        {/* Search box */}
        <div className="px-6 pb-3 my-5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch className="text-xl" />
            </span>
            <input
              type="text"
              className="w-full rounded-xl pl-10 pr-4 py-2 border border-gray-200 focus:ring-2 focus:ring-pink-200 bg-gray-50"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Activities */}
        <div className="flex gap-4 px-6 pb-3 overflow-x-auto">
          {activities.map((a, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#FF3366] p-1 shadow-lg bg-white">
                <img
                  src={a.photo}
                  alt={a.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-xs text-gray-700 font-medium mt-1">
                {a.name}
              </div>
            </div>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="text-lg font-semibold text-gray-700 px-6 mb-2">
            Messages
          </div>
          <div className="flex flex-col overflow-y-auto max-h-[420px]">
            {filtered.map((u) => (
              <button
                key={u.id}
                onClick={() => onSelect(u.id)}
                className={`
                  flex items-center gap-4 px-6 py-3 bg-white 
                  ${u.id === selectedUserId ? "bg-pink-50" : ""}
                  border-b border-gray-300 focus:outline-none transition
                `}
              >
                <div className="relative">
                  <img
                    src={u.photo}
                    alt={u.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                  />
                  {u.activity && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-start justify-center min-w-0">
                  <div className="flex items-center gap-2 w-full">
                    <span className="font-semibold text-base text-gray-900 truncate">
                      {u.name}
                    </span>
                    {u.unread > 0 && (
                      <span className="ml-1 bg-[#FF3366] text-white text-xs font-bold rounded-full px-2 py-0.5">
                        {u.unread}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm text-left truncate w-full ${
                      u.typing ? "text-[#FF3366]" : "text-gray-500"
                    }`}
                  >
                    {u.typing
                      ? "Typing..."
                      : u.lastMessage?.fromMe
                      ? `You: ${u.lastMessage.text}`
                      : u.lastMessage?.text}
                  </span>
                </div>
                <span className="text-xs text-gray-400 ml-2">{u.lastSeen}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* BottomNav absolutely fixed to bottom */}
      <div className="absolute bottom-0 left-0 w-full z-40">
        <BottomNav />
      </div>
    </div>
  );
}
