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

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Marquee */}
      <div className="w-full bg-[#FFF8F0] marquee overflow-hidden py-2">
        <div className="marquee-content text-[#22223B] text-sm font-semibold tracking-wide leading-relaxed">
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
      <nav className="w-full bg-[#22223B] flex items-center justify-between h-20 px-4 sm:px-6 md:px-10 shadow relative">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <img src={logo} alt="Logo" className="h-16 md:h-20 mr-3" />
        </div>

        {/* Hamburger Button (only when drawer is closed) */}
        {!menuOpen && (
          <button
            className="md:hidden text-[#FFF8F0] text-3xl focus:outline-none z-[60] transition-transform duration-300"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        )}

        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg transition px-2 ${
                pathname === link.to
                  ? "text-[#FFF8F0] font-semibold"
                  : "text-[#F6F6F6] font-normal hover:text-[#FF3366]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <button
            className="h-10 flex items-center px-4 rounded-full bg-[#FFF8F0] border  transition font-semibold"
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
          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <Link
              to="/register"
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-[#E63946] hover:to-[#FF3366] transition text-lg"
            >
              Register Now{" "}
              <span role="img" aria-label="heart" className="text-2xl">
                ❤️
              </span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white rounded-full font-medium shadow transition hover:from-[#E63946] hover:to-[#FF3366]"
            >
              Logout
            </button>
          )}
        </div>

        {/* Overlay for mobile drawer */}
        <div
          className={`md:hidden fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-[#22223B] via-[#2d2d47] to-[#E63946]/90 shadow-2xl rounded-l-3xl z-50 flex flex-col py-10 px-7 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Logo and Close Button */}
          <div className="flex items-center justify-between mb-10">
            <img src={logo} alt="Logo" className="h-10" />
            <button
              className="text-[#FFF8F0] text-2xl focus:outline-none"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX />
            </button>
          </div>

          {/* Animated Links */}
          <div className="flex flex-col gap-6">
            {navLinks.map((link, idx) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-lg transition duration-200 origin-left transform hover:scale-105 hover:text-[#FF3366] ${
                  pathname === link.to
                    ? "text-[#FFF8F0] font-semibold"
                    : "text-[#F6F6F6] font-normal"
                }`}
                style={{
                  transitionDelay: `${menuOpen ? idx * 70 : 0}ms`,
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#FFD6E0] my-7" />

          {/* Language Toggle */}
          <button
            className="h-10 w-full flex items-center justify-center rounded-full bg-[#FFF8F0] border border-[#FFD6E0] transition font-semibold mb-4"
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

          {/* Auth Button */}
          {!isLoggedIn ? (
            <Link
              to="/register"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-[#E63946] hover:to-[#FF3366] transition text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Register Now{" "}
              <span role="img" aria-label="heart" className="text-2xl">
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
    </div>
  );
}
