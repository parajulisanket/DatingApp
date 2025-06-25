import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Kendall from "../assets/kendall.jpeg";
import Salena from "../assets/salena.jpeg";

const matches = [
  {
    id: 1,
    name: "Salena ",
    age: 29,
    photo: Salena,
    lastMessage: "Hey there!",
  },
  {
    id: 2,
    name: "Kendall",
    age: 25,
    photo: Kendall,
    lastMessage: "How was your weekend?",
  },
];

// Same animated background CSS as Feed.jsx
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

export default function Matches() {
  return (
    <div className="flex min-h-screen bg-white relative overflow-hidden">
      {/* Animated background */}
      <style>{heartBgStyle}</style>
      <div className="bg-animated-love z-0"></div>
      {/* Floating hearts */}
      <svg className="love-heart love-heart-1 z-0" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#ff8fab"
        />
      </svg>
      <svg className="love-heart love-heart-2 z-0" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#f472b6"
        />
      </svg>
      <svg className="love-heart love-heart-3 z-0" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#e879f9"
        />
      </svg>
      <svg className="love-heart love-heart-4 z-0" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#fda4af"
        />
      </svg>

      {/* Sidebar */}
      <div className="hidden md:block z-20">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center pt-16 md:pt-8 relative z-10">
        <div className="w-full max-w-xs">
          <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow">
            Your Matches
          </h2>
          <div className="flex flex-col gap-4">
            {matches.map(match => (
              <Link
                key={match.id}
                to={`/chat/${match.id}`}
                className="flex items-center bg-white/90 rounded-2xl px-4 py-3 shadow hover:bg-pink-50 transition"
              >
                <img
                  src={match.photo}
                  alt={match.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-400 mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-black">
                    {match.name}, {match.age}
                  </h3>
                  <p className="text-gray-600 text-sm">{match.lastMessage}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
