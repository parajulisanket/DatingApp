import React from "react";

export default function VerificationBadge() {
  return (
    <span className="inline-flex items-center px-2 py-1 bg-blue-500 text-white text-xs rounded-full ml-2 font-semibold">
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Verified
    </span>
  );
}
