import React from "react";
import SwipeCard from "./SwipeCard";

// Sample data (replace with real user data)
const profiles = [
  {
    id: 1,
    name: "Priya",
    age: 22,
    bio: "Loves coffee & sunsets!",
    photo: "/assets/default-avatar.jpg",
  },
  {
    id: 2,
    name: "Arjun",
    age: 25,
    bio: "Traveller. Foodie. Musician.",
    photo: "/assets/default-avatar.jpg",
  },
];

export default function SwipeDeck() {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      {profiles.map((profile) => (
        <SwipeCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
