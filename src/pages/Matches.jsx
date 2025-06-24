import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Kendall from "../assets/kendall.jpeg";
import Salena from "../assets/salena.jpeg";

const matches = [
  {
    id: 1,
    name: "Salena ",
    age: 29,
    photo: Salena,
    lastMessage: "Hey there!",
  },
  {
    id: 2,
    name: "Kendall",
    age: 25,
    photo: Kendall,
    lastMessage: "How was your weekend?",
  },
  // Add more sample matches as needed
];

export default function Matches() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center pt-16 md:pt-8">
        <div className="w-full max-w-xs">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Your Matches
          </h2>
          <div className="flex flex-col gap-4">
            {matches.map(match => (
              <Link
                key={match.id}
                to={`/chat/${match.id}`}
                className="flex items-center bg-white/90 rounded-2xl px-4 py-3 shadow hover:bg-pink-50 transition"
              >
                <img
                  src={match.photo}
                  alt={match.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-400 mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-black">
                    {match.name}, {match.age}
                  </h3>
                  <p className="text-gray-600 text-sm">{match.lastMessage}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
