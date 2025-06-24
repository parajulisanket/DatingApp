import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import profile from "../assets/profile.jpeg";

export default function Profile() {
  const user = {
    name: "Sanket",
    age: 20,
    bio: "Loves hiking and music. Looking to meet awesome people!",
    photo: profile, 
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar: only visible on md+ screens */}
      <Sidebar />
      {/* Main content: add left padding for sidebar */}
      <main className="flex-1 flex flex-col items-center justify-center pl-0 md:pl-20">
        <div className="w-full max-w-xs p-6 bg-white/90 rounded-2xl shadow-lg flex flex-col items-center">
          <img
            src={user.photo}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover  mb-4"
          />
          <h2 className="text-2xl font-bold text-black mb-1">
            {user.name}, {user.age}
          </h2>
          <p className="text-gray-600 mb-4 text-center">{user.bio}</p>
          <Link
            to="/editprofile"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-2 font-semibold transition"
          >
            Edit Profile
          </Link>
        </div>
      </main>
    </div>
  );
}
