import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="w-full max-w-xs p-6 bg-white/90 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Create Account</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="rounded-full px-4 py-3 bg-gray-100 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="rounded-full px-4 py-3 bg-gray-100 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-full px-4 py-3 bg-gray-100 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4 py-3 font-semibold"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 font-bold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
