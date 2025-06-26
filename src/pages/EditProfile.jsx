import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiArrowLeft } from "react-icons/fi";
import Sidebar from "../components/Sidebar/Sidebar";

const heartBgStyle = `
@keyframes gradientMove {
  0%, 100% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
}
.bg-animated-love {
  background: linear-gradient(120deg, #ff80b5 0%, #f5d0fe 40%, #a7e6ff 80%, #f3a8ff 100%);
  background-size: 200% 200%;
  animation: gradientMove 12s ease-in-out infinite;
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0.60;
}
.love-heart {
  position: absolute;
  opacity: 0.16;
  pointer-events: none;
  animation: floatHeart 12s ease-in-out infinite;
}
.love-heart-1 { top: 8%; left: 14%; width: 56px; animation-delay: 0s;}
.love-heart-2 { top: 60%; left: 85%; width: 36px; animation-delay: 2s;}
.love-heart-3 { top: 80%; left: 35%; width: 48px; animation-delay: 6s;}
.love-heart-4 { top: 22%; left: 60%; width: 32px; animation-delay: 4s;}
@keyframes floatHeart {
  0%, 100% { transform: translateY(0) scale(1);}
  50% { transform: translateY(-32px) scale(1.1);}
}
`;

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
const GENDERS = ["M", "F", "Other"];
const LOOKING_FOR = ["M", "F", "Other"];

function getProfile() {
  try {
    return JSON.parse(localStorage.getItem("profile")) || {};
  } catch {
    return {};
  }
}

export default function EditProfile() {
  const navigate = useNavigate();
  const profile = getProfile();
  const [step, setStep] = useState(1);

  // Prefilled state
  const [firstName, setFirstName] = useState(profile.firstName || "");
  const [lastName, setLastName] = useState(profile.lastName || "");
  const [dob, setDob] = useState(profile.dob || "");
  const [age, setAge] = useState(profile.age || "");
  const [zodiac, setZodiac] = useState(profile.zodiac || "");
  const [gender, setGender] = useState(profile.gender || "");
  const [interests, setInterests] = useState(
    profile.interests
      ? typeof profile.interests === "string"
        ? profile.interests.split(",").map((x) => x.trim())
        : profile.interests
      : []
  );
  const [lookingFor, setLookingFor] = useState(profile.lookingFor || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [locationField, setLocationField] = useState(profile.location || "");
  const [email] = useState(profile.email || "");
  // const [photos, setPhotos] = useState(profile.photos || []);
  const [photoPreviews, setPhotoPreviews] = useState(profile.photos || []);
  const [mainPhoto, setMainPhoto] = useState(
    (profile.photos && profile.photos[0]) || ""
  );

  // Age & Zodiac from DOB
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const now = new Date();
      let years = now.getFullYear() - birthDate.getFullYear();
      const m = now.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) years--;
      setAge(years);

      // Zodiac
      const month = birthDate.getMonth() + 1;
      const day = birthDate.getDate();
      const zodiacCalc = [
        [120, "Capricorn"],
        [218, "Aquarius"],
        [320, "Pisces"],
        [420, "Aries"],
        [521, "Taurus"],
        [621, "Gemini"],
        [722, "Cancer"],
        [823, "Leo"],
        [923, "Virgo"],
        [1023, "Libra"],
        [1122, "Scorpio"],
        [1222, "Sagittarius"],
        [1231, "Capricorn"],
      ];
      const md = month * 100 + day;
      for (let i = 0; i < zodiacCalc.length; i++) {
        if (md <= zodiacCalc[i][0]) {
          setZodiac(zodiacCalc[i][1]);
          break;
        }
      }
    }
  }, [dob]);

  // Main photo
  function handleMainPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      let newPhotos = [...photoPreviews];
      newPhotos[0] = reader.result;
      setPhotoPreviews(newPhotos);
      setMainPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  }
  // Gallery
  function handleGalleryChange(idx, e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      let newPhotos = [...photoPreviews];
      newPhotos[idx] = reader.result;
      setPhotoPreviews(newPhotos);
    };
    reader.readAsDataURL(file);
  }

  function handleInterestToggle(item) {
    setInterests((arr) =>
      arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item]
    );
  }

  function handleNext(e) {
    e && e.preventDefault();
    setStep((s) => s + 1);
  }
  function handleBack(e) {
    e && e.preventDefault();
    setStep((s) => (s > 1 ? s - 1 : 1));
  }
  function handleSkip() {
    setStep((s) => s + 1);
  }

  function handleSave(e) {
    e.preventDefault();
    localStorage.setItem(
      "profile",
      JSON.stringify({
        firstName,
        lastName,
        dob,
        age,
        zodiac,
        gender,
        interests,
        lookingFor,
        bio,
        location: locationField,
        email,
        photos: photoPreviews,
      })
    );
    navigate("/profile");
  }

  // UI
  const input =
    "w-full rounded-2xl border border-[#eee] px-6 py-3 text-lg bg-white placeholder-[#b0b0b0] focus:outline-none mb-4";
  const mainBtn =
    "bg-[#EA4156] text-white font-semibold w-full rounded-2xl py-4 text-lg mt-8 shadow-md hover:brightness-105 transition";
  const chip =
    "px-4 py-2 rounded-full text-sm font-medium cursor-pointer border border-[#ffd6e0] hover:bg-[#EA4156] hover:text-white transition";
  const card =
    "w-full max-w-md min-h-[440px] bg-white rounded-3xl shadow-xl py-8 px-6 flex flex-col items-center mx-auto";

  // Header bar for Back & Skip
  function StepHeader({ onBack, onSkip, showBack = true, showSkip = true }) {
    return (
      <div className="w-full flex items-center justify-between mb-6">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className="bg-[#FFE6EF] text-[#EA4156] rounded-full p-2 shadow-sm"
            style={{ minWidth: 40, minHeight: 40 }}
            title="Back"
          >
            <FiArrowLeft size={20} />
          </button>
        ) : (
          <span style={{ width: 40 }}></span>
        )}
        {showSkip ? (
          <button
            type="button"
            onClick={onSkip}
            className="text-[#EA4156] font-semibold text-sm underline"
          >
            Skip
          </button>
        ) : (
          <span style={{ width: 36 }}></span>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white relative overflow-hidden">
      <style>{heartBgStyle}</style>
      <div className="bg-animated-love z-0"></div>
      <svg className="love-heart love-heart-1 z-0" viewBox="0 0 48 48">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#ff8fab"
        />
      </svg>
      <svg className="love-heart love-heart-2 z-0" viewBox="0 0 48 48">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#f472b6"
        />
      </svg>
      <svg className="love-heart love-heart-3 z-0" viewBox="0 0 48 48">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#e879f9"
        />
      </svg>
      <svg className="love-heart love-heart-4 z-0" viewBox="0 0 48 48">
        <path
          d="M24 42s-12.94-8.35-16.12-15.04C4.02 23.52 3 21.31 3 18.98 3 13.46 7.67 9 13.06 9c3.07 0 6.13 1.36 8.16 3.58C23.87 12.36 26.93 11 30 11c5.39 0 10.06 4.46 10.06 9.98 0 2.33-1.02 4.54-4.88 7.98C36.94 33.65 24 42 24 42z"
          fill="#fda4af"
        />
      </svg>

      {/* Sidebar: hidden on mobile */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center md:pl-24 z-10">
        <form
          className={card + " max-w-[400px] min-h-[500px]"}
          onSubmit={step === 7 ? handleSave : handleNext}
        >
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <StepHeader onBack={null} onSkip={handleSkip} showBack={false} />
              <h2 className="text-2xl font-bold mb-6 text-[#E63946] w-full text-left">
                Main Photo & Info
              </h2>
              <div className="flex flex-col items-center w-full mb-4">
                <div className="relative w-28 h-28 mb-2">
                  <img
                    src={mainPhoto}
                    alt="profile"
                    className="rounded-full w-28 h-28 object-cover border-4 border-[#FF3366] shadow-lg"
                  />
                  <label
                    htmlFor="main-photo"
                    className="absolute -bottom-2 -right-2 bg-[#EA4156] rounded-full p-2 cursor-pointer shadow"
                    title="Change Photo"
                  >
                    <FiCamera className="text-white" size={20} />
                    <input
                      id="main-photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleMainPhoto}
                    />
                  </label>
                </div>
              </div>
              <div className="flex gap-3 w-full">
                <input
                  className={input}
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className={input}
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <input
                type="date"
                className={input + " cursor-pointer"}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
              <div className="flex w-full gap-2 mb-2">
                <input
                  className={input + " bg-[#F6F6F6]"}
                  value={age ? `Age: ${age}` : ""}
                  disabled
                  readOnly
                />
                <input
                  className={input + " bg-[#F6F6F6]"}
                  value={zodiac ? `Zodiac: ${zodiac}` : ""}
                  disabled
                  readOnly
                />
              </div>
              <button className={mainBtn} type="submit">
                Next
              </button>
            </>
          )}

          {/* STEP 2: Gender */}
          {step === 2 && (
            <>
              <StepHeader onBack={handleBack} onSkip={handleSkip} />
              <h2 className="text-2xl font-bold mb-6 text-[#E63946] w-full text-left">
                Your Gender
              </h2>
              <div className="flex gap-2 w-full mb-6">
                {GENDERS.map((g) => (
                  <button
                    type="button"
                    key={g}
                    className={`flex-1 py-3 rounded-full border text-lg ${
                      gender === g
                        ? "bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white font-bold"
                        : "bg-[#FFF8F0] text-[#22223B] border-[#FFD6E0]"
                    }`}
                    onClick={() => setGender(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <button disabled={!gender} className={mainBtn} type="submit">
                Next
              </button>
            </>
          )}

          {/* STEP 3: Interests */}
          {step === 3 && (
            <>
              <StepHeader onBack={handleBack} onSkip={handleSkip} />
              <h2 className="text-2xl font-bold mb-4 text-[#E63946] w-full text-left">
                Your Interests
              </h2>
              <div className="flex flex-wrap gap-2 w-full mb-6">
                {INTERESTS.map((item) => (
                  <span
                    key={item}
                    className={
                      interests.includes(item)
                        ? chip + " bg-[#EA4156] text-white"
                        : chip + " bg-[#FFE6EF] text-[#EA4156]"
                    }
                    onClick={() => handleInterestToggle(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <button className={mainBtn} type="submit">
                Next
              </button>
            </>
          )}

          {/* STEP 4: Looking For */}
          {step === 4 && (
            <>
              <StepHeader onBack={handleBack} onSkip={handleSkip} />
              <h2 className="text-2xl font-bold mb-4 text-[#E63946] w-full text-left">
                Looking For
              </h2>
              <div className="flex gap-2 w-full mb-6">
                {LOOKING_FOR.map((g) => (
                  <button
                    type="button"
                    key={g}
                    className={`flex-1 py-3 rounded-full border text-lg ${
                      lookingFor === g
                        ? "bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white font-bold"
                        : "bg-[#FFF8F0] text-[#22223B] border-[#FFD6E0]"
                    }`}
                    onClick={() => setLookingFor(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <button disabled={!lookingFor} className={mainBtn} type="submit">
                Next
              </button>
            </>
          )}

          {/* STEP 5: Gallery */}
          {step === 5 && (
            <>
              <StepHeader onBack={handleBack} onSkip={handleSkip} />
              <h2 className="text-2xl font-bold mb-4 text-[#E63946] w-full text-left">
                Gallery Photos (up to 5)
              </h2>
              <div className="grid grid-cols-3 gap-2 mb-2 w-full">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <label
                    key={idx}
                    className="w-20 h-20 rounded-2xl bg-[#FFE6EF] flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-[#EA4156]"
                  >
                    {photoPreviews[idx] ? (
                      <img
                        src={photoPreviews[idx]}
                        className="object-cover w-full h-full"
                        alt={`p${idx}`}
                      />
                    ) : (
                      <FiCamera className="text-[#EA4156] text-2xl" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleGalleryChange(idx, e)}
                    />
                  </label>
                ))}
              </div>
              <button className={mainBtn + " mt-4"} type="submit">
                Next
              </button>
            </>
          )}

          {/* STEP 6: Bio & Location */}
          {step === 6 && (
            <>
              <StepHeader onBack={handleBack} onSkip={handleSkip} />
              <h2 className="text-2xl font-bold mb-4 text-[#E63946] w-full text-left">
                Bio & Location
              </h2>
              <textarea
                placeholder="Short Bio"
                className="rounded-2xl px-4 py-3 bg-[#FFF8F0] w-full resize-none mb-2"
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Location"
                className={input}
                value={locationField}
                onChange={(e) => setLocationField(e.target.value)}
                required
              />
              <button className={mainBtn} type="submit">
                Next
              </button>
            </>
          )}

          {/* STEP 7: Save/Review */}
          {step === 7 && (
            <>
              <StepHeader onBack={handleBack} showSkip={false} />
              <h2 className="text-2xl font-bold mb-4 text-[#E63946] w-full text-left">
                Review & Save
              </h2>
              <div className="w-full flex flex-col gap-2 mb-2">
                <div className="flex gap-3 items-center">
                  <img
                    src={mainPhoto}
                    alt="main"
                    className="w-16 h-16 rounded-full"
                  />
                  <span className="text-lg font-bold">
                    {firstName} {lastName} ({age}, {zodiac})
                  </span>
                </div>
                <div>
                  <span className="font-bold text-sm">Gender:</span> {gender}
                </div>
                <div>
                  <span className="font-bold text-sm">Interests:</span>{" "}
                  {interests.join(", ")}
                </div>
                <div>
                  <span className="font-bold text-sm">Looking for:</span>{" "}
                  {lookingFor}
                </div>
                <div>
                  <span className="font-bold text-sm">Bio:</span> {bio}
                </div>
                <div>
                  <span className="font-bold text-sm">Location:</span>{" "}
                  {locationField}
                </div>
                <div>
                  <span className="font-bold text-sm">Email:</span> {email}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {photoPreviews.filter(Boolean).map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="gallery"
                      className="w-12 h-12 rounded-xl object-cover border border-pink-300"
                    />
                  ))}
                </div>
              </div>
              <button className={mainBtn + " mt-6"} type="submit">
                Save Changes
              </button>
            </>
          )}
        </form>
      </main>
    </div>
  );
}
