import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function GalleryModal({ images, initialIndex = 0, onClose }) {
  const [current, setCurrent] = useState(initialIndex);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* Phone mockup container */}
      <div
        className="
          w-full
          h-full
          max-w-[375px]
          max-h-[812px]
          md:rounded-[2.5rem]
          flex flex-col
          bg-white
          shadow-2xl
          overflow-hidden
          relative
          mx-auto
          border border-gray-200
        "
        style={{
          boxShadow:
            "0 0 0 8px rgba(0,0,0,0.07), 0 8px 40px 0 rgba(0,0,0,0.24)",
        }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <button
            onClick={onClose}
            className="rounded-full border border-gray-200 w-12 h-12 flex items-center justify-center text-[#FF3366] text-2xl bg-white shadow-sm"
            aria-label="Back"
          >
            <FiArrowLeft />
          </button>
          <span className="text-base text-gray-700 font-semibold">
            {current + 1} / {images.length}
          </span>
          <span className="w-12" /> {/* spacer */}
        </div>
        {/* Main Image */}
        <div className="flex-1 w-full flex items-center justify-center bg-white px-2">
          <img
            src={images[current]}
            alt="gallery"
            className="object-cover rounded-2xl max-h-[57vh] w-full border"
            style={{
              background: "#f9f9f9",
              borderRadius: "1.25rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            }}
            draggable={false}
          />
        </div>
        {/* Thumbnails (bottom) */}
        <div className="flex items-center gap-2 px-3 py-5 bg-white justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              className={`rounded-xl overflow-hidden border-2 transition flex-shrink-0
                ${
                  i === current
                    ? "border-[#FF3366] opacity-100"
                    : "border-transparent opacity-40"
                }
              `}
              style={{
                width: 65,
                height: 65,
                minWidth: 65,
                minHeight: 65,
                borderRadius: "1.1rem",
                boxShadow:
                  i === current
                    ? "0 0 0 2px #FF3366"
                    : "0 1px 6px rgba(0,0,0,0.06)",
                background: "#fafafa",
              }}
              onClick={() => setCurrent(i)}
              aria-label={`Show image ${i + 1}`}
            >
              <img
                src={img}
                alt={`thumb-${i}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
