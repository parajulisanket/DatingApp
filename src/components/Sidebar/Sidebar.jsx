import React from "react";
import {
  FaHome,
  FaUser,
  FaCommentDots,
  FaComments,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    // Clear user info in context if you use one
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex flex-col bg-black text-white w-20 min-h-screen items-center pt-20 gap-6 border-r border-gray-800 fixed top-0 left-0 z-40">
      {/* Logo */}
      <Link to="/feed" className="mb-10" title="Feed">
        <span className="text-3xl font-bold">❤️</span>
      </Link>

      {/* Main Nav */}
      <div className="flex flex-col items-center gap-8 flex-1 w-full">
        <Link
          to="/feed"
          title="Home"
          className="hover:bg-gray-900 w-full flex justify-center py-3 rounded transition"
        >
          <FaHome size={24} />
        </Link>
        <Link
          to="/matches"
          title="Matches"
          className="hover:bg-gray-900 w-full flex justify-center py-3 rounded transition"
        >
          <FaCommentDots size={24} />
        </Link>
        <Link
          to="/chat"
          title="Chat"
          className="hover:bg-gray-900 w-full flex justify-center py-3 rounded transition"
        >
          <FaComments size={24} />
        </Link>
        <Link
          to="/profile"
          title="Profile"
          className="hover:bg-gray-900 w-full flex justify-center py-3 rounded transition"
        >
          <FaUser size={24} />
        </Link>
      </div>

      {/* Logout at the very bottom */}
      <button
        onClick={handleLogout}
        title="Logout"
        className="mb-8 hover:bg-gray-900 w-12 h-12 flex items-center justify-center rounded transition"
      >
        <FaSignOutAlt size={22} />
      </button>
    </aside>
  );
}
