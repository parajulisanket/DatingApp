import React from "react";

const steps = [
  { title: "Create a Profile", description: "Let others know who you are." },
  { title: "Swipe Right", description: "Like the people you're interested in." },
  { title: "It's a Match!", description: "Chat and meet new people." },
];

export default function OnboardingSteps() {
  return (
    <div className="w-full max-w-xs mx-auto mt-8">
      {steps.map((step, idx) => (
        <div key={idx} className="mb-6">
          <div className="flex items-center mb-2">
            <span className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
              {idx + 1}
            </span>
            <h4 className="ml-3 text-lg font-bold">{step.title}</h4>
          </div>
          <p className="ml-11 text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
