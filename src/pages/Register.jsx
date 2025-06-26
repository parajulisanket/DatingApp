import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8F0] relative overflow-hidden font-[Inter]">
      {/* Optional: Soft pink gradient background accents */}
      <div className="absolute left-[-100px] top-[-100px] w-[300px] h-[300px] bg-[#FFD6E0] opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute right-[-80px] bottom-[-80px] w-[220px] h-[220px] bg-[#FF3366] opacity-20 rounded-full blur-2xl z-0"></div>

      <div className="w-full max-w-xs p-8 bg-white rounded-2xl shadow-xl border border-[#FFD6E0] z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#22223B] tracking-tight font-[Inter]">
          Let’s Get Started!
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="rounded-full px-4 py-3 bg-[#FFF8F0] text-[#22223B] placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#FF3366] transition"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-full px-4 py-3 bg-[#FFF8F0] text-[#22223B] placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#FF3366] transition"
          />
          <input
            type="password"
            placeholder="Create a password"
            className="rounded-full px-4 py-3 bg-[#FFF8F0] text-[#22223B] placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#FF3366] transition"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white font-bold rounded-full py-3 mt-2 shadow-lg hover:brightness-110 transition text-lg"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-[#7A7A7A]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#FF3366] font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
