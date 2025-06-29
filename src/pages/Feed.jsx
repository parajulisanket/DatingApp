import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { FaHeart, FaTimes, FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";

// Dummy images (your existing profile images)
import profile1 from "../assets/profile1.jpeg";
import profile2 from "../assets/profile2.jpeg";
import profile3 from "../assets/profile3.jpeg";
import profile4 from "../assets/profile4.jpeg";
import profile5 from "../assets/profile5.jpeg";
import BottomNav from "../components/BottomNav/BottomNav";
import SettingsDropdown from "../components/Common/SettingsDropdown";

const profiles = [
  {
    id: 1,
    name: "Rihanna",
    age: 25,
    bio: "Professional model",
    distance: "1 km",
    job: "Model",
    photo: profile1,
  },
  {
    id: 2,
    name: "Ariana Grande",
    age: 26,
    bio: "singing, dancing, and acting",
    distance: "5 km",
    job: "Singer",
    photo: profile2,
  },
  {
    id: 3,
    name: "Dua Lipa",
    age: 23,
    bio: "Foodie",
    distance: "4 km",
    job: "Singer , Songwriter",
    photo: profile3,
  },
  {
    id: 4,
    name: "Gigi Hadid",
    age: 26,
    bio: "Developer",
    distance: "2 km",
    job: "Model",
    photo: profile4,
  },
  {
    id: 5,
    name: "Megan Fox",
    age: 25,
    bio: "Foodie, Traveler, and Photographer",
    distance: "6 km",
    job: "Actress",
    photo: profile5,
  },
];

// Main Tinder Card
function TinderCard({ profile, drag, onDragEnd, swipe, swipeIcon }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-340, 0, 340], [-24, 0, 24]);

  return (
    <motion.div
      className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg bg-neutral-900 select-none"
      drag={drag ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      style={{ x, rotate, zIndex: 10 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      initial={{ scale: 0.97, y: 32, opacity: 0.9 }}
      exit={
        swipe === "right"
          ? { x: 500, y: 180, rotate: 24, opacity: 0 }
          : swipe === "left"
          ? { x: -500, y: 180, rotate: -24, opacity: 0 }
          : { opacity: 0, scale: 0.8 }
      }
      transition={{ type: "spring", stiffness: 330, damping: 24 }}
      onDragEnd={drag ? onDragEnd : undefined}
    >
      {/* Profile Image */}
      <img
        src={profile.photo}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />
      {/* Distance badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="flex items-center gap-1 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-lg">
          <HiOutlineLocationMarker className="w-4 h-4" />
          {profile.distance}
        </span>
      </div>
      {/* Carousel Dots (vertical, right) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1">
        <span className="block w-2 h-2 bg-gray-300 rounded-full opacity-60"></span>
        <span className="block w-2 h-4 bg-gray-600 rounded-full opacity-100"></span>
        <span className="block w-2 h-2 bg-gray-300 rounded-full opacity-60"></span>
      </div>
      {/* Name & Bio Gradient */}
      <div className="absolute bottom-0 w-full p-0">
        <div className="relative w-full h-24">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-3 left-5">
            <h2 className="text-white text-xl font-semibold mb-1 drop-shadow-md">
              {profile.name}, {profile.age}
            </h2>
            <p className="text-white/90 text-sm font-normal">{profile.bio}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Feed() {
  const [cardIndex, setCardIndex] = useState(0);
  const [swipe, setSwipe] = useState(null);
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

  // const handleRewind = () => {
  //   if (isAnimating.current || cardIndex === 0) return;
  //   setCardIndex((i) => Math.max(i - 1, 0));
  // };

  const topProfile = profiles[cardIndex];

  return (
    <div className="w-full min-h-screen  flex flex-col items-center justify-between px-0 pt-10 pb-20">
      {/* HEADER */}
      <div className="w-full max-w-[420px] flex items-center justify-between px-4 pt-2 pb-2 mx-auto">
        <button className="rounded-full border border-gray-200 w-11 h-11 flex items-center justify-center text-gray-400 text-2xl bg-white shadow-md">
          <IoChevronBack />
        </button>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-black font-bold text-2xl leading-none">
            Discover
          </div>
          <span className="text-gray-400 text-xs -mt-1">nepal</span>
        </div>
        <button className="rounded-full border border-gray-200 w-11 h-11 flex items-center justify-center text-[#FF3366] hover:bg-pink-50 transition  text-2xl bg-white shadow-md">
          <SettingsDropdown />
        </button>
      </div>
      {/* CARD SWIPE AREA */}
      <main className="flex flex-col items-center w-full flex-1 justify-center px-0">
        <div className="relative w-[340px] h-[410px] mt-2 mb-5">
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
                className="absolute w-full h-full flex items-center justify-center text-xl text-white font-bold bg-black/60 rounded-2xl"
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
      {/* SWIPE BUTTONS */}
      <div className="flex justify-evenly items-center gap-7 mb-10  ">
        <button
          className="bg-white w-20 h-20 rounded-full flex items-center justify-center text-orange-400 text-3xl shadow-xl transition"
          onClick={() => handleButton("left")}
          title="Nope"
          aria-label="Nope"
          disabled={isAnimating.current}
        >
          <FaTimes />
        </button>
        <button
          className="bg-[#FF3A5C] w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl shadow-xl transition  -mt-3"
          style={{ boxShadow: "0 10px 25px -10px #FF3A5C" }}
          onClick={() => handleButton("right")}
          title="Like"
          aria-label="Like"
          disabled={isAnimating.current}
        >
          <FaHeart />
        </button>
        <button
          className="bg-white w-20 h-20 rounded-full flex items-center justify-center text-purple-800 text-3xl shadow-xl transition"
          onClick={() => handleButton("superlike")}
          title="Super Like"
          aria-label="Super Like"
          disabled={isAnimating.current}
        >
          <FaStar />
        </button>
      </div>
      {/* BOTTOM NAV */}
      <BottomNav />
    </div>
  );
}
