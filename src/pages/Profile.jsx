import React, { useRef, useState } from "react";
import { FiCamera, FiSettings } from "react-icons/fi";

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

  // Handler for settings click (customize as needed)
  function handleSettingsClick() {
    window.location.href = "/settings"; // or open a modal
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center relative bg-white">
      {/* Header */}
      <div className="w-full flex items-center justify-between px-6 py-10 absolute top-0 left-0 z-20">
        <span className="text-3xl font-bold text-black tracking-wide">
          My Profile
        </span>
        <button className="rounded-full border border-gray-200 w-11 h-11 flex items-center justify-center text-[#FF3366] hover:bg-pink-50 transition   text-2xl bg-white shadow-md">
          <FiSettings />
        </button>
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
            className="absolute -bottom-2 -right-2 bg-[#EA4156] rounded-full p-3 shadow transition hover:bg-[#FF3366]"
            style={{ zIndex: 10 }}
            onClick={handleCameraClick}
            title="Change Profile Photo"
          >
            <FiCamera className="text-white" size={28} />
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
        <div className="text-center mt-2">
          <span className="text-2xl font-extrabold text-[#22223B]">
            {user.firstName}
          </span>
          {user.age && (
            <span className="text-2xl font-normal text-[#EA4156]">
              , {user.age}
            </span>
          )}
          <div className="text-[#EA4156] text-base font-medium mt-1">
            {user.location}
          </div>
        </div>
        {/* Zodiac, Gender, Looking for */}
        <div className="flex justify-center gap-3 mt-2">
          {user.zodiac && (
            <span className="bg-[#FFF0F4] text-[#EA4156] px-3 py-1 rounded-full text-xs font-semibold">
              {user.zodiac}
            </span>
          )}
          {user.gender && (
            <span className="bg-[#FDE8EA] text-[#22223B] px-3 py-1 rounded-full text-xs font-medium">
              {user.gender === "M"
                ? "Man"
                : user.gender === "F"
                ? "Woman"
                : user.gender}
            </span>
          )}
          {user.lookingFor && (
            <span className="bg-[#E4F1FB] text-[#22223B] px-3 py-1 rounded-full text-xs font-medium">
              Looking for {user.lookingFor}
            </span>
          )}
        </div>
        {/* Bio */}
        {user.bio && (
          <div className="text-[#22223B] text-base mt-5 mb-2 text-center">
            {user.bio}
          </div>
        )}
        {/* Interests */}
        {interestChips.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-2 mb-4">
            {interestChips.map(
              (interest, idx) =>
                interest && (
                  <span
                    key={idx}
                    className="bg-[#FFE6EF] text-[#EA4156] px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                )
            )}
          </div>
        )}
        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            {gallery.map(
              (url, idx) =>
                url && (
                  <img
                    key={idx}
                    src={url}
                    alt={`gallery${idx + 1}`}
                    className="w-16 h-16 rounded-2xl object-cover border border-[#FFB3C6]"
                  />
                )
            )}
          </div>
        )}
        {/* Edit Button */}
        <button
          onClick={() => (window.location.href = "/editprofile")}
          className="mt-10 bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white font-bold rounded-full py-3 px-8 shadow hover:brightness-110 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
