import React, { useState } from "react";

export default function UserList({ users, selectedUserId, onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col w-full h-full">
      {/* Card header */}
      <div className="text-2xl font-bold px-6 pt-8 pb-2">Messages</div>
      {/* Search */}
      <div className="px-6 pb-4">
        <input
          type="text"
          className="w-full rounded-2xl px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gray-50"
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* User list */}
      <div className="flex-1 overflow-y-auto pb-6">
        {filtered.length === 0 && (
          <div className="text-gray-400 text-center mt-8">No users found</div>
        )}
        <div className="flex flex-col gap-1">
          {filtered.map((u) => (
            <button
              key={u.id}
              onClick={() => onSelect(u.id)}
              className={`flex items-center w-full gap-4 px-6 py-3 rounded-2xl transition-all duration-150
                ${u.id === selectedUserId ? "bg-pink-100" : "hover:bg-gray-100"}
                focus:outline-none
              `}
            >
              <img
                src={u.photo}
                alt={u.name}
                className="w-12 h-12 rounded-full object-cover border shadow"
              />
              <div className="flex-1 flex flex-col items-start justify-center">
                <span
                  className={`font-semibold text-base ${
                    u.id === selectedUserId ? "text-pink-600" : "text-gray-900"
                  }`}
                >
                  {u.name}
                </span>
                <span className="text-xs text-gray-500 mt-0.5">
                  {u.lastSeen}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
