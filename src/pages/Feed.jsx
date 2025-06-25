import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaUndoAlt, FaTimes, FaHeart, FaStar } from "react-icons/fa";
import profile1 from "../assets/profile1.jpeg";
import profile2 from "../assets/profile2.jpeg";
import profile3 from "../assets/profile3.jpeg";

// Sample profiles
const profiles = [
  {
    id: 1,
    name: "Sagar Sharma",
    age: 25,
    bio: "Professional model",
    distance: "1 km",
    photo: profile1,
  },
  {
    id: 2,
    name: "Sagar Neupane",
    age: 26,
    bio: "Tech Enthusiast",
    distance: "4 km",
    photo: profile2,
  },
  {
    id: 3,
    name: "Astha Oli",
    age: 23,
    bio: "Foodie",
    distance: "6 km",
    photo: profile3,
  },
];

// Add this custom style to your CSS or tailwind global styles
const heartBgStyle = `
@keyframes gradientMove {
  0%, 100% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
}
.bg-animated-love {
  background: linear-gradient(120deg, #ff80b5 0%, #f5d0fe 40%, #a7e6ff 80%, #f3a8ff 100%);
  background-size: 200% 200%;
  animation: gradientMove 12s ease-in-out infinite;
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0.60;
}
.love-heart {
  position: absolute;
  opacity: 0.16;
  pointer-events: none;
  animation: floatHeart 12s ease-in-out infinite;
}
.love-heart-1 { top: 8%; left: 14%; width: 56px; animation-delay: 0s;}
.love-heart-2 { top: 60%; left: 85%; width: 36px; animation-delay: 2s;}
.love-heart-3 { top: 80%; left: 35%; width: 48px; animation-delay: 6s;}
.love-heart-4 { top: 22%; left: 60%; width: 32px; animation-delay: 4s;}
@keyframes floatHeart {
  0%, 100% { transform: translateY(0) scale(1);}
  50% { transform: translateY(-32px) scale(1.1);}
}
`;

export default function Feed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
  const handleNope = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, profiles.length - 1));
  const handleRewind = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));

  const profile = profiles[currentIndex];

  return (
    <div className="flex min-h-screen bg-white relative overflow-hidden">
      {/* Gradient and animated hearts background */}
      <style>{heartBgStyle}</style>
      <div className="bg-animated-love"></div>
      {/* Animated hearts */}
      <svg className="love-heart love-heart-1" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#ff8fab"
        />
      </svg>
      <svg className="love-heart love-heart-2" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#f472b6"
        />
      </svg>
      <svg className="love-heart love-heart-3" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#e879f9"
        />
      </svg>
      <svg className="love-heart love-heart-4" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#fda4af"
        />
      </svg>

      {/* Sidebar */}
      <div className="hidden md:block relative z-20">
        <Sidebar />
      </div>

      {/* Center area */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-6 md:py-0 relative z-10">
        {profile ? (
          <div className="relative w-full max-w-[360px] md:max-w-[420px] h-[500px] md:h-[600px] bg-neutral-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col items-stretch justify-end">
            {/* Profile photo */}
            <img
              src={profile.photo}
              alt={profile.name}
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />

            {/* Top-left: distance badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="flex items-center bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-xl shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c1.1046 0 2-.8954 2-2s-.8954-2-2-2-2 .8954-2 2 .8954 2 2 2zm0 8c-3.314 0-6-2.6863-6-6a6 6 0 0112 0c0 3.3137-2.686 6-6 6z"
                  />
                </svg>
                {profile.distance}
              </span>
            </div>

            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Card content: bottom */}
            <div className="relative z-10 p-6 flex flex-col gap-1 mt-auto">
              <div className="flex items-end gap-2 mb-1">
                <h2 className="text-white text-2xl md:text-3xl font-semibold">
                  {profile.name}
                </h2>
                <span className="text-white/80 text-xl md:text-2xl font-medium">
                  {profile.age}
                </span>
              </div>
              <div className="text-gray-200 text-base md:text-lg">
                {profile.bio}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-white text-2xl font-semibold mt-10">
            No more profiles!
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-6 mt-8 md:mt-6">
          <button
            className="bg-white/90 hover:bg-white text-yellow-500 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl shadow-xl transition"
            onClick={handleRewind}
            title="Rewind"
            disabled={currentIndex === 0}
            aria-label="Rewind"
          >
            <FaUndoAlt />
          </button>
          <button
            className="bg-white/90 hover:bg-red-100 text-red-500 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-xl transition"
            onClick={handleNope}
            title="Nope"
            aria-label="Nope"
          >
            <FaTimes />
          </button>
          <button
            className="bg-white/90 hover:bg-pink-100 text-pink-500 rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-xl transition"
            onClick={handleLike}
            title="Like"
            aria-label="Like"
          >
            <FaHeart />
          </button>
          <button
            className="bg-white/90 hover:bg-blue-100 text-blue-500 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl shadow-xl transition"
            // Add superlike handler if needed
            title="Super Like"
            aria-label="Super Like"
          >
            <FaStar />
          </button>
        </div>
      </main>
    </div>
  );
}
