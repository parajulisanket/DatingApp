import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  // Placeholder state, later prefill with user's data
  const [name, setName] = useState("Sagar");
  const [age, setAge] = useState(24);
  const [bio, setBio] = useState("Loves hiking and music. Looking to meet awesome people!");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later: Send updated info to backend
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="w-full max-w-xs p-6 bg-white/90 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Edit Profile</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="rounded-full px-4 py-3 bg-gray-100 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={e => setAge(e.target.value)}
            className="rounded-full px-4 py-3 bg-gray-100 focus:outline-none"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
            className="rounded-2xl px-4 py-3 bg-gray-100 focus:outline-none resize-none"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4 py-3 font-semibold"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
