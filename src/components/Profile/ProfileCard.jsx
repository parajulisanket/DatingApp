import React from "react";

export default function ProfileCard({ user }) {
  return (
    <div className="w-full max-w-xs p-6 bg-white/90 rounded-2xl shadow-lg flex flex-col items-center">
      <img
        src={user.photo}
        alt="Profile"
        className="w-28 h-28 rounded-full object-cover border-4 border-pink-500 mb-4"
      />
      <h2 className="text-2xl font-bold text-black mb-1">{user.name}, {user.age}</h2>
      <p className="text-gray-600 mb-4 text-center">{user.bio}</p>
    </div>
  );
}
