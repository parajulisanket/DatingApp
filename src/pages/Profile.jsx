import React, { useRef, useState } from "react";
import {
  FiCamera,
  FiMapPin,
  FiArrowLeft,
  FiEdit2,
  FiPlus,
} from "react-icons/fi";
import { FaRocket, FaStar, FaBell } from "react-icons/fa";
import SettingsDropdown from "../components/Common/SettingsDropdown";
import { useNavigate } from "react-router-dom";

// Utility to get profile from localStorage
function getProfile() {
  try {
    return JSON.parse(localStorage.getItem("profile")) || {};
  } catch {
    return {};
  }
}

export default function Profile() {
  const user = getProfile();
  const [mainPhoto, setMainPhoto] = useState(
    (user.photos && user.photos[0]) || ""
  );
  const fileInputRef = useRef();

  const [platinumIndex, setPlatinumIndex] = useState(0);
  const platinumOffers = [
    {
      title: "Get Dating Platinum",
      desc: "Get Unlimited Likes, Passport and more!",
      button: "Get Dating Platinum",
    },
    {
      title: "Boost Your Profile",
      desc: "Increase your visibility and get more matches!",
      button: "Boost Now",
    },
    {
      title: "See Who Likes You",
      desc: "Instantly see who liked your profile!",
      button: "Unlock Feature",
    },
  ];
  const startX = useRef(null);

  function handleTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50 && platinumIndex > 0) {
      setPlatinumIndex((idx) => idx - 1);
    } else if (dx < -50 && platinumIndex < platinumOffers.length - 1) {
      setPlatinumIndex((idx) => idx + 1);
    }
  }

  // To trigger file input
  function handleCameraClick() {
    fileInputRef.current.click();
  }

  // When user picks new photo
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setMainPhoto(reader.result);
      // Save to profile in localStorage for persistence
      const profile = getProfile();
      profile.photos = [reader.result, ...(profile.photos?.slice(1) || [])];
      localStorage.setItem("profile", JSON.stringify(profile));
    };
    reader.readAsDataURL(file);
  }

  // Show interests as chips
  const interestChips = user.interests
    ? typeof user.interests === "string"
      ? user.interests.split(",").map((x) => x.trim())
      : user.interests
    : [];

  // Gallery
  const gallery =
    user.photos && user.photos.length > 1 ? user.photos.slice(1) : [];

  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center relative bg-white">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-6 py-10 absolute top-0 left-0 z-20">
        {/* Back Arrow */}
        <button
          className="w-11 h-11 flex items-center justify-left text-[#FF3366] text-3xl bg-white"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
        >
          <FiArrowLeft />
        </button>
        <span className="text-3xl font-bold text-gray-600 tracking-wide">
          Profile
        </span>
        <SettingsDropdown />
      </div>

      <div className="w-full flex flex-col items-center px-5 py-24 ">
        {/* Profile main photo with camera icon */}
        <div className="relative mb-3 flex items-center justify-center">
          <img
            src={mainPhoto}
            alt="profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-[#FF3366] shadow-lg"
          />
          {/* Camera icon */}
          <button
            type="button"
            className="absolute -bottom-2 right-4 bg-[#EA4156] rounded-full p-2 shadow transition hover:bg-[#FF3366]"
            style={{ zIndex: 10 }}
            onClick={handleCameraClick}
            title="Change Profile Photo"
          >
            <FiCamera className="text-white" size={20} />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handlePhotoChange}
            />
          </button>
        </div>
        {/* Name, age */}
        <div className="relative flex flex-col items-center mb-1">
          <div className="text-center mt-3 ">
            <div className="text-2xl font-extrabold text-[#22223B]">
              {user.firstName},{" "}
              <span className="font-normal text-[#EA4156]">{user.age}</span>
            </div>
            <div className="text-gray-400 text-sm my-1 flex items-center gap-1 justify-center">
              <FiMapPin className="inline-block" size={14} />
              {user.location}
            </div>
          </div>
          {/* Edit Icon */}
          <button
            className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-pink-100 w-12 h-12 flex items-center justify-center rounded-full shadow text-pink-400"
            onClick={() => (window.location.href = "/editprofile")}
            title="Edit Profile"
          >
            <FiEdit2 size={26} />
          </button> 
        </div>

        {/* <div className="w-full h-5 max-w-auto flex items-center ">
          <hr className="w-full border-t border-gray-400 " />
        </div> */}

        {/* Card Section (Super Likes, Boosts, Subscriptions) */}
        <div className="w-full flex justify-center gap-3 m-4 px-2">
          {/* Card 1 */}
          <div className="relative flex-1">
            <div className="bg-white rounded-xl flex flex-col items-center py-5 border border-gray-200">
              <span className="text-sky-400 text-2xl mb-2">
                <FaStar />
              </span>
              <div className="text-gray-600 text-sm">0 Super Likes</div>
            </div>
            {/* Plus Icon */}
            <button
              className="absolute left-1/2 -translate-x-1/2 -bottom-4 bg-white border border-dashed border-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 text-xl"
              style={{ zIndex: 2 }}
              // onClick={}
              aria-label="Add Super Like"
            >
              <FiPlus />
            </button>
          </div>
          {/* Card 2 */}
          <div className="relative flex-1">
            <div className="bg-white rounded-xl flex-1 flex flex-col items-center py-5 border border-gray-200">
              <span className="text-pink-400 text-2xl mb-2">
                <FaRocket />
              </span>
              <div className="text-gray-600 text-sm">My Boosts</div>
            </div>
            {/* Plus Icon */}
            <button
              className="absolute left-1/2 -translate-x-1/2 -bottom-4 bg-white border border-dashed border-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 text-xl"
              style={{ zIndex: 2 }}
              // onClick={}
              aria-label="Add Super Like"
            >
              <FiPlus />
            </button>
          </div>
          {/* Card 3 */}
          <div className="relative flex-1">
            <div className="bg-white rounded-xl flex-1 flex flex-col items-center py-5  border border-gray-200">
              <span className="text-red-400 text-2xl mb-2">
                <FaBell />
              </span>
              <div className="text-gray-600 text-sm">Subscriptions</div>
            </div>
            {/* Plus Icon */}
            <button
              className="absolute left-1/2 -translate-x-1/2 -bottom-4 bg-white border border-dashed border-gray-300 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 text-xl"
              style={{ zIndex: 2 }}
              // onClick={}
              aria-label="Add Super Like"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        {/* Platinum Carousel */}
        <div className="w-full px-0 mt-2 mb-6 select-none">
          <div
            className="overflow-hidden w-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500"
              style={{
                width: `${platinumOffers.length * 100}%`,
                transform: `translateX(-${
                  platinumIndex * (100 / platinumOffers.length)
                }%)`,
              }}
            >
              {platinumOffers.map((offer, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl py-8 px-5 flex flex-col items-center mx-2"
                  style={{
                    width: "100vw",
                  }}
                >
                  <div className="font-bold text-lg text-[#22223B] mb-2 text-center">
                    {offer.title}
                  </div>
                  <div className="text-gray-400 text-center text-sm mb-4">
                    {offer.desc}
                  </div>
                  <button className="bg-white  font-semibold text-[#FF3366] py-3 px-8 rounded-full shadow-xl text-lg">
                    {offer.button}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Dots */}
          <div className="flex gap-2  justify-center"> 
            {platinumOffers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPlatinumIndex(idx)}
                className={`w-2 h-2 rounded-full transition ${
                  platinumIndex === idx ? "bg-[#FF3366]" : "bg-gray-300"
                }`}
                aria-label={`Go to Platinum offer ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Edit Button */}
        {/* <button
          onClick={() => (window.location.href = "/editprofile")}
          className="mt-10 bg-pink-200 text-white font-extrabold rounded-full p-3  shadow hover:bg-pink-300 transition"
        >
          <FiEdit2 />
        </button> */}
      </div>
    </div>
  );
}
