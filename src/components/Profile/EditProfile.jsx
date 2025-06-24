import React, { useState } from "react";

export default function EditProfile({ user, onSave }) {
  const [name, setName] = useState(user?.name || "");
  const [age, setAge] = useState(user?.age || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, age, bio });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs p-6 bg-white/90 rounded-2xl shadow-lg">
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
  );
}
