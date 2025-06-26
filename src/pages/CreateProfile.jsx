import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { FiCamera, FiArrowLeft } from "react-icons/fi";

// Example interests (add more as needed)
const INTERESTS = [
  "Photography",
  "Shopping",
  "Karaoke",
  "Yoga",
  "Cooking",
  "Tennis",
  "Run",
  "Swimming",
  "Art",
  "Traveling",
  "Extreme",
  "Music",
  "Drink",
  "Video games",
];

export default function CreateProfile() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState([]);
  const [lookingFor, setLookingFor] = useState("");
  const [gallery, setGallery] = useState([null, null, null, null, null]);
  const [galleryPreview, setGalleryPreview] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle profile photo
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }

  // Handle gallery photos
  function handleGalleryChange(i, e) {
    const file = e.target.files[0];
    let newGallery = [...gallery];
    let newPreview = [...galleryPreview];
    newGallery[i] = file;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreview[i] = reader.result;
        setGalleryPreview([...newPreview]);
      };
      reader.readAsDataURL(file);
    }
    setGallery(newGallery);
  }

  // Step logic
  function handleNext(e) {
    e && e.preventDefault();
    setStep((s) => s + 1);
  }
  function handleBack() {
    setStep((s) => s - 1);
  }
  function handleSkip() {
    setStep((s) => s + 1);
  }
  function handleInterestToggle(item) {
    setInterests((arr) =>
      arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item]
    );
  }

  // Finish
  function handleSubmit(e) {
    e.preventDefault();
    // Save profile (simulate)
    localStorage.setItem(
      "profile",
      JSON.stringify({
        firstName,
        lastName,
        birthday,
        gender,
        interests,
        lookingFor,
        gallery,
        email,
        photo,
      })
    );
    localStorage.setItem("isLoggedIn", "true");
    navigate("/feed");
  }

  // Style for button (matches your screenshots)
  const mainBtn =
    "bg-[#EA4156] text-white font-semibold w-full rounded-2xl py-4 text-lg mt-8 shadow-md hover:brightness-105 transition";

  // Input style
  const input =
    "w-full rounded-2xl border border-[#eee] px-6 py-3 text-lg bg-white placeholder-[#b0b0b0] focus:outline-none mb-4";

  // For mobile card look
  const card =
    "max-w-md w-full mx-auto bg-white rounded-3xl shadow-lg py-8 px-6 flex flex-col items-center mt-4 mb-4";

  return (
    <div className="flex min-h-screen bg-[#FFF8F0] relative">
      {/* Sidebar always visible on the left, above z-0 */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-2 py-6 font-[Inter]">
        {step === 1 && (
          <form className={card} onSubmit={handleNext}>
            <div className="w-full flex justify-between mb-4">
              <span></span>
              <button
                type="button"
                className="text-[#EA4156] font-semibold text-lg"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
            <h1 className="text-3xl font-bold mb-8 text-[#181818] w-full text-left">
              Profile details
            </h1>
            <div className="flex flex-col items-center w-full mb-6">
              <div className="relative w-28 h-28">
                <img
                  src={
                    photoPreview ||
                    ""
                  }
                  alt="Profile"
                  className="rounded-full w-28 h-28 object-cover border-4 border-[#ffd6e0]"
                />
                <label
                  htmlFor="profile-photo"
                  className="absolute -bottom-2 -right-2 bg-[#EA4156] rounded-full p-2 cursor-pointer shadow-md"
                >
                  <FiCamera className="text-white" size={20} />
                  <input
                    id="profile-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </label>
              </div>
            </div>
            <input
              className={input}
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className={input}
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="date"
              className={input + " cursor-pointer"}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
            <button className={mainBtn} type="submit">
              Confirm
            </button>
          </form>
        )}

        {/* Step 2: Gender */}
        {step === 2 && (
          <form className={card} onSubmit={handleNext}>
            <div className="w-full flex justify-between mb-4">
              <button
                type="button"
                onClick={handleBack}
                className="text-[#EA4156]"
              >
                <FiArrowLeft size={24} />
              </button>
              <button
                type="button"
                className="text-[#EA4156] font-semibold text-lg"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
            <h1 className="text-3xl font-bold mb-8 text-[#181818] w-full text-left">
              I am a
            </h1>
            <div className="flex flex-col gap-4 w-full">
              {["Woman", "Man", "Other"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`rounded-2xl border-2 text-lg px-6 py-4 font-semibold flex items-center justify-between
                ${
                  gender === opt
                    ? "bg-[#EA4156] text-white border-[#EA4156]"
                    : "bg-white text-[#181818] border-[#eee]"
                }`}
                  onClick={() => setGender(opt)}
                >
                  {opt}
                  {gender === opt && <span className="ml-2 text-2xl">✔️</span>}
                </button>
              ))}
            </div>
            <button className={mainBtn + " mt-8"} type="submit">
              Continue
            </button>
          </form>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <form className={card} onSubmit={handleNext}>
            <div className="w-full flex justify-between mb-4">
              <button
                type="button"
                onClick={handleBack}
                className="text-[#EA4156]"
              >
                <FiArrowLeft size={24} />
              </button>
              <button
                type="button"
                className="text-[#EA4156] font-semibold text-lg"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
            <h1 className="text-3xl font-bold mb-3 text-[#181818] w-full text-left">
              Your interests
            </h1>
            <p className="text-[#7a7a7a] mb-6 w-full text-left text-base">
              Select a few of your interests and let everyone know what you’re
              passionate about.
            </p>
            <div className="grid grid-cols-2 gap-3 w-full">
              {INTERESTS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`flex items-center gap-2 border rounded-2xl px-4 py-3 text-base font-semibold
                ${
                  interests.includes(opt)
                    ? "bg-[#EA4156] text-white border-[#EA4156] shadow"
                    : "bg-white text-[#181818] border-[#eee]"
                }
                `}
                  onClick={() => handleInterestToggle(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button className={mainBtn + " mt-8"} type="submit">
              Continue
            </button>
          </form>
        )}

        {/* Step 4: Looking For */}
        {step === 4 && (
          <form className={card} onSubmit={handleNext}>
            <div className="w-full flex justify-between mb-4">
              <button
                type="button"
                onClick={handleBack}
                className="text-[#EA4156]"
              >
                <FiArrowLeft size={24} />
              </button>
              <button
                type="button"
                className="text-[#EA4156] font-semibold text-lg"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
            <h1 className="text-3xl font-bold mb-8 text-[#181818] w-full text-left">
              Looking for
            </h1>
            <div className="flex flex-col gap-4 w-full">
              {["Woman", "Man", "Other"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`rounded-2xl border-2 text-lg px-6 py-4 font-semibold flex items-center justify-between
                ${
                  lookingFor === opt
                    ? "bg-[#EA4156] text-white border-[#EA4156]"
                    : "bg-white text-[#181818] border-[#eee]"
                }`}
                  onClick={() => setLookingFor(opt)}
                >
                  {opt}
                  {lookingFor === opt && (
                    <span className="ml-2 text-2xl">✔️</span>
                  )}
                </button>
              ))}
            </div>
            <button className={mainBtn + " mt-8"} type="submit">
              Continue
            </button>
          </form>
        )}

        {/* Step 5: Add Photos */}
        {step === 5 && (
          <form className={card} onSubmit={handleNext}>
            <div className="w-full flex justify-between mb-4">
              <button
                type="button"
                onClick={handleBack}
                className="text-[#EA4156]"
              >
                <FiArrowLeft size={24} />
              </button>
              <button
                type="button"
                className="text-[#EA4156] font-semibold text-lg"
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
            <h1 className="text-3xl font-bold mb-6 text-[#181818] w-full text-left">
              Add your photos
            </h1>
            <div className="grid grid-cols-3 gap-3 mb-2 w-full">
              {[0, 1, 2, 3, 4].map((i) => (
                <label
                  key={i}
                  className="w-24 h-24 rounded-2xl bg-[#FFE6EF] flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-[#EA4156]"
                >
                  {galleryPreview[i] ? (
                    <img
                      src={galleryPreview[i]}
                      className="object-cover w-full h-full"
                      alt="Photo"
                    />
                  ) : (
                    <FiCamera className="text-[#EA4156] text-3xl" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleGalleryChange(i, e)}
                  />
                </label>
              ))}
            </div>
            <button className={mainBtn + " mt-8"} type="submit">
              Continue
            </button>
          </form>
        )}

        {/* Step 6: Email & Password */}
        {step === 6 && (
          <form className={card} onSubmit={handleSubmit}>
            <div className="w-full flex justify-between mb-4">
              <button
                type="button"
                onClick={handleBack}
                className="text-[#EA4156]"
              >
                <FiArrowLeft size={24} />
              </button>
              <span></span>
            </div>
            <h1 className="text-3xl font-bold mb-8 text-[#181818] w-full text-left">
              Create account
            </h1>
            <input
              className={input}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={input}
              placeholder="Create password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className={mainBtn + " mt-8"} type="submit">
              Finish & Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
