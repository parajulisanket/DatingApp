import React, { useRef, useEffect, useState } from "react";
import { FiSettings, FiUserPlus, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SettingsDropdown() {
  const [open, setOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setConfirmLogout(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    setOpen(false);
    setConfirmLogout(false);
    navigate("/login");
  }

  function handleAddAccount() {
    setOpen(false);
    setConfirmLogout(false);
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
      {open && !confirmLogout && (
        <div className="text-lg absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 z-50 animate-fade-in">
          <button
            className="w-full text-left px-4 py-2 text-gray-500 hover:bg-pink-50/50 flex items-center gap-2"
            onClick={handleAddAccount}
          >
            <FiUserPlus className="text-xl" />
            Add Account
          </button>
          <button
            className="w-full text-left px-4 py-2 text-gray-500 hover:bg-pink-50/50 flex items-center gap-2"
            onClick={() => setConfirmLogout(true)}
          >
            <FiLogOut className="text-xl" />
            Logout
          </button>
        </div>
      )}

      {/* Modal for logout confirmation */}
      {open && confirmLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-2xl shadow-xl px-7 py-8 max-w-[90vw] w-80 flex flex-col items-center animate-fade-in-modal relative">
            <div className="text-xl tracking-wide font-semibold mb-2 text-gray-900">
              Log out
            </div>
            <div className="text-gray-500 mb-6 text-center text-base">
              Are you sure you want to log out?
            </div>
            <button
              className="w-full py-3 bg-[#FF3366] text-white rounded-full font-semibold mb-2 text-base"
              onClick={handleLogout}
            >
              Log out
            </button>
            <button
              className="text-gray-400 text-base mt-1"
              onClick={() => setConfirmLogout(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        .animate-fade-in { animation: fadein 0.18s ease; }
        @keyframes fadein { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: none;} }
        .animate-fade-in-modal { animation: modalFadeIn 0.23s cubic-bezier(.44,1.45,.47,1) }
        @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.98) translateY(16px);} to { opacity: 1; transform: scale(1) translateY(0);} }
      `}</style>
    </div>
  );
}
