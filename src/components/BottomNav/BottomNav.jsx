import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faClone,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function BottomNav() {
  const location = useLocation();
  const active = (route) => location.pathname === route;

  return (
    <nav className="absolute bottom-0 left-0 right-0 w-full z-40 bg-gray-100 border-t border-gray-200 shadow flex justify-around items-center py-6 px-2">
      {/* Feed/Discover */}
      <Link
        to="/feed"
        className="flex-1 flex flex-col items-center relative py-1"
      >
        <FontAwesomeIcon
          icon={faClone}
          size="lg"
          className={active("/feed") ? "text-[#FF3A5C]" : "text-gray-400"}
        />
        {active("/feed") && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-[#FF3A5C] " />
        )}
      </Link>

      {/* Matches/Heart */}
      <Link
        to="/matches"
        className="flex-1 flex flex-col items-center relative py-1"
      >
        <FontAwesomeIcon
          icon={faHeart}
          size="lg"
          className={active("/matches") ? "text-[#FF3A5C]" : "text-gray-400"}
        />
        {/* Notification dot */}
        {/* <span
          className="absolute"
          style={{
            top: 2,
            left: "65%",
            transform: "translateX(-50%)",
            background: "#FF3A5C",
            borderRadius: "50%",
            width: 16,
            height: 16,
            border: "3px solid #fafafd",
            display: "block",
            zIndex: 10,
          }}
        /> */}
        {active("/matches") && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2  " />
        )}
      </Link>

      {/* Chat */}
      <Link
        to="/chat"
        className="flex-1 flex flex-col items-center relative py-1"
      >
        <FontAwesomeIcon
          icon={faMessage}
          size="lg"
          className={active("/chat") ? "text-[#FF3A5C]" : "text-gray-400"}
        />
        {active("/chat") && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2  transition-all duration-200" />
        )}
      </Link>

      {/* Profile */}
      <Link
        to="/profile"
        className="flex-1 flex flex-col items-center relative py-1"
      >
        <FontAwesomeIcon
          icon={faUser}
          size="lg"
          className={active("/profile") ? "text-[#FF3A5C]" : "text-gray-400"}
        />
        {active("/profile") && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2   transition-all duration-200" />
        )}
      </Link>
    </nav>
  );
}
