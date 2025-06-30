import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import GalleryModal from "../components/GalleryModal";

// Dummy gallery for demo, replace with your real images or use profile.gallery
const demoGallery = [
  require("../assets/profile1.jpeg"),
  require("../assets/profile2.jpeg"),
  require("../assets/profile3.jpeg"),
  require("../assets/profile4.jpeg"),
  require("../assets/profile5.jpeg"),
];

// Default interests for demo (replace with dynamic if you have in profile)
const allInterests = ["Travelling", "Books", "Music", "Dancing", "Modeling"];

export default function ProfileDetail({ profiles }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Modal state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Find profile by id from the profiles array (prop)
  const profile = profiles.find((p) => String(p.id) === String(id));

  // Fallback if profile not found
  if (!profile)
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">User not found.</div>
        <button
          onClick={() => navigate(-1)}
          className="mt-5 px-4 py-2 rounded bg-[#FF3366] text-white font-bold shadow"
        >
          Go Back
        </button>
      </div>
    );

  // Example selected interests for this user
  const selectedInterests = ["Travelling", "Books"];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-500 overflow-y-auto">
      <div className="w-full h-full min-h-screen md:w-[375px] md:h-[812px] md:rounded-[2.5rem] bg-white overflow-y-auto flex flex-col relative shadow-xl transition-all duration-300 mx-auto">
        {/* Header inside card */}
        <div className="w-full flex items-center justify-between px-4 pt-5 pb-3 bg-transparent z-20 sticky top-0 rounded-t-[2.5rem]">
          <button
            className="w-11 h-11 flex items-center justify-center text-[#FF3366] text-3xl "
            onClick={() => navigate(-1)}
            aria-label="Go Back"
          >
            <FiArrowLeft />
          </button>
          <span></span>
          <button
            className="w-11 h-11 flex items-center justify-center text-[#FF3366] text-2xl"
            aria-label="Send Message"
          >
            <FiSend />
          </button>
        </div>
        {/* Large profile image  */}
        <div className="relative flex flex-col items-center z-0 -mt-20">
          <div className="w-full h-[340px] relative  overflow-hidden">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover"
              onClick={() => {
                setGalleryIndex(0);
                setGalleryOpen(true);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Main card content */}
        <div className="w-full p-6 shadow-none relative z-20 bg-white rounded-t-3xl -mt-5">
          {/* Name, job, and distance */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-[#22223B] mb-0.5">
                {profile.name}, {profile.age}
              </div>
              <div className="text-gray-500 font-medium">
                {profile.job || "Professional model"}
              </div>
            </div>
            <div className="flex items-center gap-1 bg-pink-50 text-[#FF3366] px-3 py-1 rounded-lg font-semibold text-sm">
              <HiOutlineLocationMarker className="w-5 h-5" />
              {profile.distance}
            </div>
          </div>
          {/* Location */}
          <div className="mt-3">
            <div className="text-gray-700 font-semibold">Location</div>
            <div className="flex items-center gap-2 text-sm font-medium mt-1">
              <span className="text-gray-500">Chicago, IL United States</span>
            </div>
          </div>
          {/* About */}
          <div className="mt-3">
            <div className="text-gray-700 font-semibold">About</div>
            <div className="text-gray-500 text-base mt-1">
              My name is {profile.name} and I enjoy meeting new people and
              finding ways to help them have an uplifting experience. I enjoy
              reading also.
            </div>
          </div>
          {/* Interests */}
          <div className="mt-3">
            <div className="text-gray-700 font-semibold">Interests</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {allInterests.map((interest) => (
                <span
                  key={interest}
                  className={`border px-4 py-1.5 rounded-xl font-medium text-sm flex items-center gap-1 ${
                    selectedInterests.includes(interest)
                      ? "border-[#FF3366] bg-white text-[#FF3366]"
                      : "border-gray-200 bg-gray-50 text-gray-500"
                  }`}
                >
                  {selectedInterests.includes(interest) && (
                    <FaCheck className="text-[#FF3366]" size={13} />
                  )}
                  {interest}
                </span>
              ))}
            </div>
          </div>
          {/* Gallery */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-semibold">Gallery</span>
              <button
                className="text-[#FF3366] font-semibold text-sm"
                onClick={() => {
                  setGalleryIndex(0);
                  setGalleryOpen(true);
                }}
              >
                See all
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {demoGallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="gallery"
                  className="rounded-xl object-cover w-full h-28 cursor-pointer"
                  onClick={() => {
                    setGalleryIndex(i);
                    setGalleryOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="h-20" />
      </div>
      {/* Gallery Modal */}
      {galleryOpen && (
        <GalleryModal
          images={demoGallery}
          initialIndex={galleryIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </div>
  );
}
