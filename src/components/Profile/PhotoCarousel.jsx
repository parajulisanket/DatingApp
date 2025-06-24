import React, { useState } from "react";

export default function PhotoCarousel({ photos }) {
  const [idx, setIdx] = useState(0);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="relative w-64 h-80 mb-4">
      <img
        src={photos[idx]}
        alt={`Profile ${idx + 1}`}
        className="w-full h-full rounded-2xl object-cover"
      />
      {photos.length > 1 && (
        <>
          <button
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/60 rounded-full px-2 py-1"
            disabled={idx === 0}
            onClick={() => setIdx((i) => Math.max(i - 1, 0))}
          >‹</button>
          <button
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/60 rounded-full px-2 py-1"
            disabled={idx === photos.length - 1}
            onClick={() => setIdx((i) => Math.min(i + 1, photos.length - 1))}
          >›</button>
        </>
      )}
    </div>
  );
}
