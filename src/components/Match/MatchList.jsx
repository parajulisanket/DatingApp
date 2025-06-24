import React from "react";
import { Link } from "react-router-dom";

const matches = [
  { id: 1, name: "Priya", age: 22, photo: "/assets/default-avatar.jpg" },
  { id: 2, name: "Arjun", age: 25, photo: "/assets/default-avatar.jpg" },
];

export default function MatchList() {
  return (
    <div className="flex flex-col gap-4">
      {matches.map((match) => (
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
          <div>
            <h3 className="font-semibold text-black">{match.name}, {match.age}</h3>
            <p className="text-gray-600 text-sm">Say hi!</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
