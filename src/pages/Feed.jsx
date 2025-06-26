import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaHeart, FaTimes, FaUndoAlt, FaStar } from "react-icons/fa";
import profile1 from "../assets/profile1.jpeg";
import profile2 from "../assets/profile2.jpeg";
import profile3 from "../assets/profile3.jpeg";
import profile4 from "../assets/profile4.jpeg";
import profile5 from "../assets/profile5.jpeg";

//  background animated 
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

const profiles = [
  {
    id: 1,
    name: "Sagar Sharma",
    age: 25,
    bio: "Professional model",
    distance: "1 km",
    job: "Model",
    photo: profile1,
  },
  {
    id: 2,
    name: "Sagar Neupane",
    age: 26,
    bio: "Tech Enthusiast",
    distance: "5 km",
    job: "Software Engineer",
    photo: profile2,
  },
  {
    id: 3,
    name: "Astha Oli",
    age: 23,
    bio: "Foodie",
    distance: "4 km",
    job: "Chef",
    photo: profile3,
  },
  {
    id: 4,
    name: "Pradeep Marasini",
    age: 26,
    bio: "Developer",
    distance: "2 km",
    job: "Software Engineer",
    photo: profile4,
  },
  {
    id: 5,
    name: "Sheetal Sharma",
    age: 25,
    bio: "Foodie, Traveler, and Photographer",
    distance: "6 km",
    job: "Photographer",
    photo: profile5,
  },
];

// TinderCard: top card only
function TinderCard({ profile, drag, onDragEnd, swipe, swipeIcon }) {
  return (
    <motion.div
      className="absolute w-full h-full rounded-3xl bg-neutral-900 shadow-2xl overflow-hidden select-none"
      drag={drag ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      animate={{ scale: 1, y: 0, x: 0, rotate: 0, opacity: 1 }}
      initial={{ scale: 0.96, y: 32, x: 0, rotate: 0, opacity: 0.8 }}
      exit={
        swipe === "right"
          ? { x: 500, rotate: 22, opacity: 0 }
          : swipe === "left"
          ? { x: -140, rotate: -22, opacity: 0 }
          : { opacity: 0, scale: 0.8 }
      }
      transition={{ type: "spring", stiffness: 330, damping: 24 }}
      onDragEnd={drag ? onDragEnd : undefined}
      style={{ zIndex: 10 }}
    >
      <img
        src={profile.photo}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 w-full p-6 flex flex-col gap-1 z-10">
        <div className="flex items-end gap-2 mb-1">
          <h2 className="text-white text-2xl md:text-3xl font-semibold">
            {profile.name}, {profile.age}
          </h2>
        </div>
        <div className="text-gray-200 text-base md:text-lg">{profile.job}</div>
        <div className="text-white/70 text-sm">{profile.bio}</div>
      </div>
      <div className="absolute top-4 left-4 z-20">
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
      {/* icon on swipe */}
      {swipeIcon && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          initial={{ scale: 0.4, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", duration: 0.22 }}
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg bg-white/90">
            {swipeIcon === "right" ? (
              <FaHeart className="text-pink-500 text-4xl" />
            ) : (
              <FaTimes className="text-red-500 text-4xl" />
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Feed() {
  const [cardIndex, setCardIndex] = useState(0);
  const [swipe, setSwipe] = useState(null); // "left" or "right"
  const [swipeIcon, setSwipeIcon] = useState(null);
  const isAnimating = useRef(false);

  const nextCard = () => setCardIndex((i) => Math.min(i + 1, profiles.length));

  const handleDragEnd = (_, info) => {
    if (isAnimating.current) return;
    if (info.offset.x > 100) {
      setSwipeIcon("right");
      setSwipe("right");
      isAnimating.current = true;
      setTimeout(() => {
        nextCard();
        setSwipe(null);
        setSwipeIcon(null);
        isAnimating.current = false;
      }, 380);
    } else if (info.offset.x < -80) {
      setSwipeIcon("left");
      setSwipe("left");
      isAnimating.current = true;
      setTimeout(() => {
        nextCard();
        setSwipe(null);
        setSwipeIcon(null);
        isAnimating.current = false;
      }, 380);
    }
  };

  const handleButton = (dir) => {
    if (isAnimating.current) return;
    setSwipeIcon(dir);
    setSwipe(dir);
    isAnimating.current = true;
    setTimeout(() => {
      nextCard();
      setSwipe(null);
      setSwipeIcon(null);
      isAnimating.current = false;
    }, 380);
  };
  const handleRewind = () => {
    if (isAnimating.current || cardIndex === 0) return;
    setCardIndex((i) => Math.max(i - 1, 0));
  };

  const topProfile = profiles[cardIndex];

  return (
    <div className="flex min-h-screen bg-white relative overflow-hidden items-center justify-center">
      <style>{heartBgStyle}</style>
      <div className="bg-animated-love"></div>

      {/* Sidebar */}
      <div className="hidden md:block relative z-20">
        <Sidebar />
      </div>

      {/* --MOBILE PHONE MOCKUP BOX -- */}
      <div
        className="
          relative
          bg-gray-50
          w-[400px] h-[750px] mx-auto rounded-[2.5rem] shadow-2xl border border-black
          flex flex-col items-center justify-between
          overflow-hidden
          z-10
        "
        style={{
          boxShadow:
            "0 6px 40px 0 rgba(74, 58, 255, 0.10), 0 1.5px 4px 0 rgba(0,0,0,0.08)",
          border: "1px solid black",
        }}
      >
        <main className="flex flex-col items-center w-full flex-1 justify-center px-2 pt-6 relative z-10">
          <div className="relative w-full max-w-[350px] h-[500px]">
            <AnimatePresence>
              {topProfile && (
                <TinderCard
                  key={topProfile.id}
                  profile={topProfile}
                  drag={true}
                  onDragEnd={handleDragEnd}
                  swipe={swipe}
                  swipeIcon={swipeIcon}
                />
              )}
              {!topProfile && (
                <motion.div
                  key="no-more"
                  className="absolute w-full h-full flex items-center justify-center text-xl text-white font-bold bg-black/60 rounded-3xl"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                >
                  No more profiles!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-6 pb-8">
          <button
            className="bg-white/90 hover:bg-yellow-100 text-yellow-500 rounded-full w-14 h-14 flex items-center justify-center text-xl shadow-xl transition cursor-pointer"
            onClick={handleRewind}
            title="Rewind"
            disabled={cardIndex === 0 || isAnimating.current}
            aria-label="Rewind"
          >
            <FaUndoAlt />
          </button>
          <button
            className="bg-white/90 hover:bg-red-100 text-red-500 rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-xl transition"
            onClick={() => handleButton("left")}
            title="Nope"
            aria-label="Nope"
            disabled={isAnimating.current}
          >
            <FaTimes />
          </button>
          <button
            className="bg-white/90 hover:bg-pink-100 text-pink-500 rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-xl transition"
            onClick={() => handleButton("right")}
            title="Like"
            aria-label="Like"
            disabled={isAnimating.current}
          >
            <FaHeart />
          </button>
          <button
            className="bg-white/90 hover:bg-blue-100 text-blue-500 rounded-full w-14 h-14 flex items-center justify-center text-xl shadow-xl transition"
            // Superlike handler can be implemented
            title="Super Like"
            aria-label="Super Like"
            disabled={isAnimating.current}
          >
            <FaStar />
          </button>
        </div>
      </div>
    </div>
  );
}
