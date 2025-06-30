import React from "react";

const steps = [
  { title: "Create a Profile", description: "Let others know who you are." },
  {
    title: "Swipe Right",
    description: "Like the people you're interested in.",
  },
  { title: "It's a Match!", description: "Chat and meet new people." },
];

export default function OnboardingSteps() {
  return (
    <div className="w-full max-w-xs mx-auto py-10 px-3">
      {steps.map((step, idx) => (
        <div key={idx} className="mb-7 flex items-start">
          <div className="flex-shrink-0">
            <span className="bg-[#EA4156] text-white rounded-full w-10 h-10 flex items-center justify-center font-extrabold text-lg shadow">
              {idx + 1}
            </span>
          </div>
          <div className="ml-4">
            <h4 className="text-base sm:text-lg font-bold mb-1 text-[#22223B]">
              {step.title}
            </h4>
            <p className="text-gray-500 text-sm sm:text-base">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
