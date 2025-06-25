import React, { useState } from "react";
import SuperLikeBadge from "./SuperLikeBadge"; 

export default function SwipeCard({ profile }) {
  const [superLiked, setSuperLiked] = useState(false);

  const handleSuperLike = () => {
    setSuperLiked(true);
    // Optionally, you can also call an API
  };

  return (
    <div className="w-80 bg-white rounded-3xl shadow-lg p-4 mb-6 relative flex flex-col items-center">
      {superLiked && <SuperLikeBadge />}
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-60 h-72 rounded-2xl object-cover mb-4"
      />
      <h3 className="text-xl font-bold mb-1">
        {profile.name}, {profile.age}
      </h3>
      <p className="text-gray-500 text-center">{profile.bio}</p>
      <div className="flex gap-4 mt-6">
        <button className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-2xl">
          ❌
        </button>
        <button className="bg-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg border-4 border-white">
          ❤️
        </button>
        <button
          className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl"
          onClick={handleSuperLike}
        >
          ⭐
        </button>
      </div>
    </div>
  );
}
