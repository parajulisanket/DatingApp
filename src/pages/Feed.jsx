import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import {
  FaUndoAlt,
  FaTimes,
  FaHeart,
  FaStar,
  FaInfoCircle,
} from "react-icons/fa";
import profile1 from "../assets/profile1.jpeg";
import profile2 from "../assets/profile2.jpeg";
import profile3 from "../assets/profile3.jpeg";

// Add emoji if you want per-profile
const profiles = [
  {
    id: 1,
    name: "Sagar Sharma",
    age: 25,
    bio: "Web Developer, loves coding and coffee",
    emoji: "💻",
    distance: "3km away",
    zodiac: "Gemini",
    photo: profile1,
  },
  {
    id: 2,
    name: "Sagar Neupane",
    age: 26,
    bio: "Tech Enthusiast",
    emoji: "🚀",
    distance: "4km away",
    zodiac: "Leo",
    photo: profile2,
  },
  {
    id: 3,
    name: "Astha Oli",
    age: 23,
    bio: "Foodie",
    emoji: "🍔",
    distance: "6km away",
    zodiac: "Libra",
    photo: profile3,
  },
];

export default function Feed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
  };

  const handleNope = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
  };

  const profile = profiles[currentIndex];

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      {/* Center: Card */}
      <main className="flex-1 flex justify-center items-center">
        {profile ? (
          <div className="relative w-[400px] h-[700px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col justify-end items-stretch">
            {/* Profile Image Full-bleed */}
            <img
              src={profile.photo}
              alt={profile.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay gradient for bottom text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Card Content */}
            <div className="relative p-6 pt-0 pb-32 flex flex-col justify-end h-full z-10">
              <div className="mb-2">
                <span className="text-white text-3xl font-bold drop-shadow">
                  {profile.name}
                </span>
                <span className="ml-2 text-2xl align-middle">
                  {profile.emoji || "😊"}
                </span>
                <span className="text-white text-2xl font-semibold ml-2">
                  {profile.age}
                </span>
              </div>
              <div className="flex items-center gap-4 mb-1">
                <span className="bg-black/60 text-white rounded-lg px-3 py-1 text-xs font-semibold">
                  {profile.distance}
                </span>
                <span className="bg-black/60 text-white rounded-lg px-3 py-1 text-xs font-semibold">
                  {profile.zodiac}
                </span>
              </div>
              <div className="text-white text-base font-medium drop-shadow mb-2">
                {profile.bio}
              </div>
            </div>
            {/* ACTION BUTTONS */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 z-20">
              <button
                className="bg-white/80 hover:bg-white text-yellow-500 rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow"
                title="Rewind"
                // You can implement rewind logic if needed
              >
                <FaUndoAlt />
              </button>
              <button
                className="bg-white/80 hover:bg-red-100 text-red-500 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow"
                onClick={handleNope}
                title="Nope"
              >
                <FaTimes />
              </button>
              <button
                className="bg-white/80 hover:bg-pink-100 text-pink-500 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow"
                onClick={handleLike}
                title="Like"
              >
                <FaHeart />
              </button>
              <button
                className="bg-white/80 hover:bg-blue-100 text-blue-500 rounded-full w-16 h-16 flex items-center justify-center text-2xl shadow"
                // You can implement superlike logic if needed
                title="Super Like"
              >
                <FaStar />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-white text-2xl">No more profiles!</div>
        )}
      </main>
    </div>
  );
}
