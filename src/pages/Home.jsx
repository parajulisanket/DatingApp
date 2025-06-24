import React from "react";
import backgroundImage from "../assets/backgroundImage.jpg";
import Footer from "../components/Common/Footer";


export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
      </div>
      {/* Main Content */}
      <div className="z-10 flex flex-col items-center justify-center h-screen w-full">
        <h1 className="text-4xl sm:text-6xl font-bold text-white text-center mb-8 mt-56">
          Start something epic.
        </h1>
        <a
          href="/register"
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full px-8 py-4 text-lg shadow transition"
        >
          Register Now
        </a>
      </div>
      <Footer />
    </div>

  );
}
