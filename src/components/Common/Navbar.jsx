import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";

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
  const [lang, setLang] = React.useState("en");
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <div className="sticky top-0 z-30 w-full">
      {/* Marquee */}
      <div className="w-full bg-[#FFF8F0] overflow-hidden py-2 rounded-t-3xl">
        <div className="whitespace-nowrap animate-marquee text-[#22223B] text-xs font-semibold tracking-wide leading-relaxed">
          <span className="mx-4">Go on your last first date.</span>
          <span className="mx-4">Find your perfect match.</span>
          <span className="mx-4">Make real connections.</span>
          <span className="mx-4">Swipe, chat, and spark something new.</span>
          <span className="mx-4">Love starts with a hello.</span>
          <span className="mx-4">Meet your bestie, your way.</span>
          <span className="mx-4">Dating made simple.</span>
          <span className="mx-4">Discover someone amazing today.</span>
          <span className="mx-4">Kindness is always attractive.</span>
          <span className="mx-4">Ready to meet someone real?</span>
          <span className="mx-4">New matches every day!</span>
          <span className="mx-4">Be bold. Be you. Find love.</span>
          <span className="mx-4">Your next chapter starts here.</span>
          <span className="mx-4">Safe, secure, and fun dating.</span>
          <span className="mx-4">Friends, dates, soulmates—find them all.</span>
          <span className="mx-4">Start something epic.</span>
        </div>
      </div>

      {/* Mobile Navbar */}
      <nav className="w-full bg-[#22223B] flex items-center justify-between h-16 px-4 relative">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10 mr-2" />
          </Link>
        </div>
        {/* Hamburger Button */}
        <button
          className="text-[#FFF8F0] text-3xl focus:outline-none z-[60]"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu />
        </button>

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-[#22223B] via-[#2d2d47] to-[#E63946]/90 shadow-2xl z-50 flex flex-col py-8 px-5 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ top: "4rem" }}
        >
          {/* Logo and Close Button */}
          <div className="flex items-center justify-between mb-7">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-8" />
            </Link>
            <button
              className="text-[#FFF8F0] text-2xl focus:outline-none"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX />
            </button>
          </div>
          {/* Links */}
          <div className="flex flex-col gap-5">
            {navLinks.map((link, idx) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-lg transition duration-200 origin-left transform hover:scale-105 hover:text-[#FF3366] ${
                  pathname === link.to
                    ? "text-[#FFF8F0] font-semibold"
                    : "text-[#F6F6F6] font-normal"
                }`}
                style={{ transitionDelay: `${menuOpen ? idx * 70 : 0}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#FFD6E0] my-5" />
          {/* Language Toggle */}
          <button
            className="h-9 w-full flex items-center justify-center rounded-full bg-[#FFF8F0] border border-[#FFD6E0] transition font-semibold mb-4"
            onClick={() => setLang(lang === "en" ? "np" : "en")}
          >
            <span
              className={
                lang === "en"
                  ? "text-[#FF3366] font-semibold"
                  : "text-[#22223B] opacity-60"
              }
            >
              Eng
            </span>
            <span className="mx-2 text-[#22223B] opacity-40 font-normal">
              |
            </span>
            <span
              className={
                lang === "np"
                  ? "text-[#FF3366] font-semibold"
                  : "text-[#22223B] opacity-60"
              }
            >
              नेपाली
            </span>
          </button>
          {!isLoggedIn ? (
            <Link
              to="/register"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:from-[#E63946] hover:to-[#FF3366] transition text-base"
              onClick={() => setMenuOpen(false)}
            >
              Register{" "}
              <span role="img" aria-label="heart" className="text-xl">
                ❤️
              </span>
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white rounded-full font-medium shadow transition hover:from-[#E63946] hover:to-[#FF3366]"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Marquee Animation CSS */}
      <style>
        {`
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0%   { transform: translateX(0%);}
          100% { transform: translateX(-50%);}
        }
        `}
      </style>
    </div>
  );
}
