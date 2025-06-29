import React, { useRef, useEffect, useState } from "react";
import { FiSettings, FiUserPlus, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SettingsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    setOpen(false);
    navigate("/login");
  }

  function handleAddAccount() {
    setOpen(false);
    navigate("/createprofile");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        className="rounded-full border border-gray-200 w-11 h-11 flex items-center justify-center text-[#FF3366] hover:bg-pink-50 transition text-2xl bg-white shadow-md"
        onClick={() => setOpen((o) => !o)}
      >
        <FiSettings />
      </button>
      {/* Dropdown */}
      {open && (
        <div className="text-lg absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 z-50 animate-fade-in">
          <button
            className="w-full text-left px-4 py-2 text-gray-600 hover:bg-pink-50/50 flex items-center gap-2"
            onClick={handleAddAccount}
          >
            <FiUserPlus className="text-xl" />
            Add Account
          </button>
          <button
            className="w-full text-left px-4 py-2 text-gray-600 hover:bg-pink-50/50 flex items-center gap-2"
            onClick={handleLogout}
          >
            <FiLogOut className="text-xl" />
            Logout
          </button>
        </div>
      )}
      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadein 0.18s ease; }
        @keyframes fadein { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: none;} }
      `}</style>
    </div>
  );
}
