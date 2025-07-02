import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import GalleryModal from "../components/GalleryModal";

// Dummy
const demoGallery = [
  require("../assets/profile1.jpeg"),
  require("../assets/profile2.jpeg"),
  require("../assets/profile3.jpeg"),
  require("../assets/profile4.jpeg"),
  require("../assets/profile5.jpeg"),
];

const allInterests = ["Travelling", "Books", "Music", "Dancing", "Modeling"];

export default function ProfileDetail({ profiles }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const profile = profiles.find((p) => String(p.id) === String(id));

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

  const selectedInterests = ["Travelling", "Books"];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 overflow-y-auto">
      <div className="w-full h-full min-h-screen max-w-[430px] bg-white overflow-y-auto flex flex-col relative shadow-xl mx-auto">
        {/* Profile Image Section */}
        <div className="relative w-full h-[370px] overflow-hidden shadow-lg">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-full object-cover object-top"
            onClick={() => {
              setGalleryIndex(0);
              setGalleryOpen(true);
            }}
            style={{ cursor: "pointer" }}
          />
          {/* Chevron-Up Go Back Button */}
          <button
            className="absolute left-1/2 z-40"
            style={{
              bottom: "-2px",
              transform: "translateX(-50%)",
              background: "#fff",
              borderRadius: "9999px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
            onClick={() => navigate(-1)}
            aria-label="Go Back"
          >
            <svg
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF3366"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 14l6-6 6 6" />
            </svg>
          </button>
        </div>

        {/* Main card content */}
        <div className="w-full px-5 pt-10 pb-2 relative z-20 bg-white rounded-t-3xl -mt-4">
          {/* Name, job, and distance */}
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="text-2xl font-bold text-[#22223B] mb-0.5">
                {profile.name}, {profile.age}
              </div>
              <div className="text-gray-500 text-base">
                {profile.job || "Professional model"}
              </div>
            </div>
            <div className="flex items-center gap-1 bg-pink-50 text-[#FF3366] px-3 py-1 rounded-lg font-bold text-base">
              <HiOutlineLocationMarker className="w-5 h-5" />
              {profile.distance}
            </div>
          </div>
          {/* Location */}
          <div className="mt-2">
            <div className="font-bold text-lg text-gray-700">Location</div>
            <div className="flex items-center gap-2 text-base mt-1">
              <span className="text-gray-500">Chicago, IL United States</span>
            </div>
          </div>
          {/* About */}
          <div className="mt-2">
            <div className="font-bold text-lg text-gray-700">About</div>
            <div className="text-gray-500 text-base mt-1">
              My name is {profile.name} and I enjoy meeting new people and
              finding ways to help them have an uplifting experience. I enjoy
              reading also.
            </div>
          </div>
          {/* Interests */}
          <div className="mt-3">
            <div className="font-bold text-lg text-gray-700 mb-1">
              Interests
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {allInterests.map((interest) => (
                <span
                  key={interest}
                  className={`border px-3 py-[2px] rounded-xl  text-base flex items-center gap-2
                    ${
                      selectedInterests.includes(interest)
                        ? "border-[#FF3366] bg-[#FFF0F6] text-[#FF3366]"
                        : "border-gray-200 bg-gray-50 text-gray-400"
                    }
                  `}
                >
                  {selectedInterests.includes(interest) && (
                    <FaCheck className="text-[#FF3366]" size={12} />
                  )}
                  {interest}
                </span>
              ))}
            </div>
          </div>
          {/* Gallery */}
          <div className="mt-7">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg text-gray-700">Gallery</span>
              <button
                className="text-[#FF3366] font-semibold text-base"
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
        <div className="h-14" />
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
