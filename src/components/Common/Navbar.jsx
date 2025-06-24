import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

// Nav links in the center
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/community", label: "Community" },
  { to: "/pages", label: "Pages" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  // Language state for toggle
  const [lang, setLang] = React.useState("en");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Marquee */}
      <div className="w-full h-7 bg-gradient-to-r from-pink-500 via-red-400 to-pink-500 marquee overflow-hidden">
        <div className="marquee-content text-white text-sm font-semibold tracking-wide">
          <span className="mx-8">Go on your last first date.</span>
          <span className="mx-8">Find your perfect match.</span>
          <span className="mx-8">Make real connections.</span>
          <span className="mx-8">Swipe, chat, and spark something new.</span>
          <span className="mx-8">Love starts with a hello.</span>
          <span className="mx-8">Meet your bestie, your way.</span>
          <span className="mx-8">Dating made simple.</span>
          <span className="mx-8">Discover someone amazing today.</span>
          <span className="mx-8">Kindness is always attractive.</span>
          <span className="mx-8">Ready to meet someone real?</span>
          <span className="mx-8">New matches every day!</span>
          <span className="mx-8">Be bold. Be you. Find love.</span>
          <span className="mx-8">Your next chapter starts here.</span>
          <span className="mx-8">Safe, secure, and fun dating.</span>
          <span className="mx-8">Friends, dates, soulmates—find them all.</span>
          <span className="mx-8">Start something epic.</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-[#fff8f7] border-b flex items-center justify-between h-20 px-10 shadow">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 mr-4" />
        </div>
        {/* Center: Nav Links */}
        <div className="flex-1 flex items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg transition px-2 ${
                pathname === link.to
                  ? "text-black font-bold"
                  : "text-gray-700 font-medium"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Right: Language Toggle and Auth */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            className="h-10 flex items-center px-4 rounded-full bg-white hover:bg-gray-100 border transition font-semibold text-gray-700"
            onClick={() => setLang(lang === "en" ? "np" : "en")}
          >
            <span className={lang === "en" ? "text-pink-500 font-bold" : ""}>
              Eng
            </span>
            <span className="mx-2">|</span>
            <span className={lang === "np" ? "text-pink-500 font-bold" : ""}>
              नेपाली
            </span>
          </button>
          {!isLoggedIn ? (
            <Link
              to="/register"
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-3 rounded-full font-semibold shadow hover:from-pink-600 hover:to-red-500 transition text-lg"
            >
              Register Now
              <span role="img" aria-label="heart" className="text-2xl">
                ❤️
              </span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-full font-medium shadow transition hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
