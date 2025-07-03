import React, { useState } from "react";
import { FiChevronRight, FiSliders } from "react-icons/fi";

export default function Filter() {
  // Modal open state
  const [open, setOpen] = useState(false);

  // Filter states
  const [interested, setInterested] = useState("Girls");
  const [location, setLocation] = useState("Chicago, USA");
  const [distance, setDistance] = useState(40);
  const [age, setAge] = useState(25);

  return (
    <>
      {/* Always show the filter icon */}
      <button
        className={
          "w-11 h-11 flex items-center justify-center text-[#FF3366] text-2xl bg-white rounded-full border border-gray-200 shadow-md hover:bg-pink-50 transition " +
          (open ? "rotate-0" : "rotate-90")
        }
        onClick={() => setOpen(true)}
        aria-label="Open Filters"
      >
        <FiSliders />
      </button>

      {/* Show modal if open */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex flex-col justify-end animate-fade-in-modal ">
          {/* Bottom Sheet */}
          <div
            className="w-full max-w-[375px] mx-auto rounded-t-[60px] bg-white shadow-2xl border-t border-gray-100 overflow-hidden relative animate-slide-up"
            style={{
              minHeight: 550,
              boxShadow: "0 -6px 32px -4px rgba(0,0,0,0.10)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5">
              <div className="w-14"></div>
              <h2 className="font-black text-xl tracking-wide text-center flex-1">
                Filters
              </h2>
              <button
                className="text-[#F5516C] text-base px-2 font-me active:scale-95 transition w-14 text-right"
                onClick={() => {
                  setInterested("Girls");
                  setLocation("Chicago, USA");
                  setDistance(40);
                  setAge(25);
                  setOpen(false);
                }}
              >
                Clear
              </button>
            </div>

            {/* Interested In */}
            <div className="px-7 mt-2">
              <div className="font-semibold text-lg mb-3">Interested in</div>
              <div className="flex rounded-2xl border border-[#ddd] overflow-hidden bg-white">
                {["Girls", "Boys", "Both"].map((g) => (
                  <button
                    key={g}
                    className={`flex-1 py-3 text-lg font-semibold transition
                      ${
                        interested === g
                          ? "bg-[#F5516C] text-white"
                          : "bg-white text-[#444] hover:bg-[#fff2f6]"
                      }
                      ${g !== "Girls" ? "border-l border-[#eee]" : ""}
                    `}
                    style={{
                      borderRadius:
                        g === "Girls"
                          ? "1rem 0 0 1rem"
                          : g === "Both"
                          ? "0 1rem 1rem 0"
                          : "0",
                    }}
                    onClick={() => setInterested(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="px-7 mt-8">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Location
              </div>
              <button className="w-full flex items-center justify-between rounded-2xl border border-[#eee] py-4 px-4 bg-white text-lg font-semibold text-left mb-3">
                {location}
                <FiChevronRight className="text-[#F5516C] text-2xl" />
              </button>
            </div>

            {/* Distance Slider */}
            <div className="px-7 mt-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Distance</span>
                <span className="text-lg font-medium text-gray-700">
                  {distance}km
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full mt-3 accent-[#F5516C] h-2"
                style={{
                  accentColor: "#F5516C",
                }}
              />
            </div>

            {/* Age Slider */}
            <div className="px-7 mt-8">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Age</span>
                <span className="text-lg font-medium text-gray-700">{age}</span>
              </div>
              <input
                type="range"
                min={18}
                max={80}
                step={1}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full mt-3 accent-[#F5516C] h-2"
                style={{ accentColor: "#F5516C" }}
              />
            </div>

            {/* Continue Button */}
            <div className="px-7 pb-8 pt-10">
              <button
                className="w-full rounded-2xl bg-[#F5516C] text-white font-bold text-lg py-4 mt-2 shadow-md active:scale-98 transition"
                onClick={() => {
                  alert(
                    `Applied:\nInterested: ${interested}\nLocation: ${location}\nDistance: ${distance}km\nAge: ${age}`
                  );
                  setOpen(false);
                }}
              >
                Continue
              </button>
            </div>
          </div>
          <style>{`
            .animate-fade-in-modal {
              animation: fadeInModalBg 0.2s;
            }
            @keyframes fadeInModalBg {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-slide-up {
              animation: slideUpSheet 0.32s cubic-bezier(.44,1.45,.47,1);
            }
            @keyframes slideUpSheet {
              from { transform: translateY(100%); opacity: 0.4;}
              to { transform: translateY(0); opacity: 1;}
            }
          `}</style>
        </div>
      )}
    </>
  );
}
