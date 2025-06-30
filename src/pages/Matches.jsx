import React from "react";
import BottomNav from "../components/BottomNav/BottomNav";
import kylie from "../assets/kylie.jpg";
import profile1 from "../assets/profile1.jpeg";
import profile2 from "../assets/profile2.jpeg";
import profile3 from "../assets/profile3.jpeg";
import profile4 from "../assets/profile4.jpeg";
import profile5 from "../assets/profile5.jpeg";
import SettingsDropdown from "../components/Common/SettingsDropdown";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const todayMatches = [
  { id: 1, name: "Leilani", age: 19, photo: kylie },
  { id: 2, name: "Annabelle", age: 20, photo: profile3 },
  { id: 3, name: "Reagan", age: 24, photo: profile4 },
  { id: 4, name: "Hadley", age: 25, photo: profile5 },
];

const yesterdayMatches = [
  { id: 5, name: "Sophie", age: 21, photo: profile1 },
  { id: 6, name: "Maya", age: 22, photo: profile2 },
];

export default function Matches() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full min-h-screen md:w-[375px] md:h-[812px] md:rounded-[2rem] md:shadow-2xl overflow-hidden flex flex-col relative ">
      <div className="flex items-center justify-between px-6 pt-10 pb-3">
        {/* Back Arrow */}
        <button
          className=" w-11 h-11 flex items-center justify-center text-[#FF3366]  text-3xl bg-white "
          onClick={() => navigate(-1)}
          aria-label="Go Back"
        >
          <FiArrowLeft />
        </button>
        <h1 className="flex-1 text-3xl font-bold text-gray-700 text-center">
          Matches
        </h1>
        <SettingsDropdown />
      </div>

      <p className="text-gray-500 text-base mt-2 m-6">
        This is a list of people who have liked you and your matches.
      </p>

      <div className="flex-1 w-full overflow-y-auto pb-24 example">
        {/* today match card*/}
        <div className="w-full px-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm font-semibold">Today</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {todayMatches.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl overflow-hidden shadow bg-white relative group"
              >
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full h-40 object-cover"
                />
                {/* Name overlay */}
                <div className="absolute bottom-10 left-0 w-full py-2 px-3">
                  <span className="text-white font-semibold text-lg drop-shadow">
                    {m.name}, {m.age}
                  </span>
                </div>
                {/* Action icons */}
                <div className="absolute left-0 right-0 bottom-2 flex justify-between px-5 z-10">
                  <button className="bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center shadow text-gray-500 text-xl hover:text-black">
                    &#10006;
                  </button>
                  <button className="bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center shadow text-gray-500 text-xl hover:text-[#FF3366]">
                    &#10084;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* yesterday match card */}
        <div className="w-full px-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm font-semibold">
              Yesterday
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {yesterdayMatches.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl overflow-hidden shadow bg-white relative group"
              >
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute bottom-10 left-0 w-full py-2 px-3">
                  <span className="text-white font-semibold text-lg drop-shadow">
                    {m.name}, {m.age}
                  </span>
                </div>
                <div className="absolute left-0 right-0 bottom-2 flex justify-between px-5 z-10">
                  <button className="bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center shadow text-gray-500 text-xl hover:text-black">
                    &#10006;
                  </button>
                  <button className="bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center shadow text-gray-500 text-xl hover:text-[#FF3366]">
                    &#10084;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* bottom nav */}
      <BottomNav />
    </div>
  );
}
