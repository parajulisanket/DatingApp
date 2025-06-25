import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Animated background CSS (same as rest of app)
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

export default function EditProfile() {
  // Placeholder state, later prefill with user's data
  const [name, setName] = useState("Sagar");
  const [age, setAge] = useState(24);
  const [bio, setBio] = useState(
    "Loves hiking and music. Looking to meet awesome people!"
  );

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: Send updated info to backend
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated love background */}
      <style>{heartBgStyle}</style>
      <div className="bg-animated-love z-0"></div>
      <svg
        className="love-heart love-heart-1 z-0"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#ff8fab"
        />
      </svg>
      <svg
        className="love-heart love-heart-2 z-0"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#f472b6"
        />
      </svg>
      <svg
        className="love-heart love-heart-3 z-0"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#e879f9"
        />
      </svg>
      <svg
        className="love-heart love-heart-4 z-0"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#fda4af"
        />
      </svg>

      {/* Main content */}
      <div className="w-full max-w-xs p-6 bg-white/90 rounded-2xl shadow-lg z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Edit Profile
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-full px-4 py-3 bg-gray-100 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="rounded-full px-4 py-3 bg-gray-100 focus:outline-none"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="rounded-2xl px-4 py-3 bg-gray-100 focus:outline-none resize-none"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4 py-3 font-semibold"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
