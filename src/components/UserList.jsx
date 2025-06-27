import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";

export default function UserList({ users, selectedUserId, onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // Activities bar
  const activities = [
    { name: "You", photo: users[0]?.photo },
    ...users.slice(1, 5), // show 4 more as example
  ];

  return (
    <div className="flex-1 flex flex-col w-full h-full relative example">
      {/* Header with settings */}
      <div className="flex items-center justify-between px-6 pt-8 pb-1 ">
        <div className="text-3xl font-extrabold tracking-tight">Messages</div>
        <button className="rounded-full border border-gray-200 w-11 h-11 flex items-center justify-center text-[#FF3366] hover:bg-pink-50 transition text-2xl bg-white shadow-md">
          <FiSettings />
        </button>
      </div>

      {/* Search box */}
      <div className="px-6 pb-3 my-5">
        <input
          type="text"
          className="w-full rounded-xl px-4 py-2 border border-gray-100 focus:ring-2 focus:ring-pink-200 bg-gray-50"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Activities (like stories) */}
      <div className="flex gap-4 px-6 pb-3 overflow-x-auto">
        {activities.map((a, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border-2 border-pink-400 p-1 shadow-lg bg-white">
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
      <div className="flex-1 overflow-y-auto pb-6">
        <div className="text-lg font-semibold text-gray-700 px-6 mb-2">
          Messages
        </div>
        <div className="flex flex-col">
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
                    <span className="ml-1 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {u.unread}
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm text-left truncate w-full ${
                    u.typing ? "text-pink-500" : "text-gray-500"
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
  );
}
