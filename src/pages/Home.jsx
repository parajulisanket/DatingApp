import React from "react";
import background_main from "../assets/background_main.png";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-black/50 ">
      {/* Background Image */}
      <div className="absolute inset-0 z-10">
        <img
          src={background_main}
          alt="Background"
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
        {/* Gradient overlay for effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#22223B]/50 via-[#22223B]/70 to-[#E63946]/50 pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="flex flex-1 flex-col items-center justify-center min-h-screen w-full px-4 text-center relative z-10">
        <span className="uppercase tracking-widest text-[#FF3366] font-semibold mb-4 text-base md:text-lg drop-shadow">
          Find your perfect match
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#FFF8F0] mb-8 drop-shadow-lg">
          Start something <span className="text-[#FF3366]">epic.</span>
        </h1>
        {/* Register Button */}
        <a
          href="/register"
          className="bg-gradient-to-r from-[#FF3366] to-[#E63946] hover:from-[#E63946] hover:to-[#FF3366]
            text-[#FFF8F0] font-bold rounded-full px-10 py-4 text-lg shadow-xl transition-transform duration-200
            hover:scale-105 focus:scale-105 active:scale-95"
          style={{
            boxShadow: "0 4px 16px rgba(255,51,102,0.25)",
          }}
        >
          Register Now
        </a>
      </div>

      {/* Fallback for debugging: show border if image fails */}
      <style>
        {`
          img[alt="Background"]:not([src]) {
            border: 3px dashed red;
            background: #fff0f3;
          }
        `}
      </style>
    </div>
  );
}
