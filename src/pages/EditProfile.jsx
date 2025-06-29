import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiArrowLeft } from "react-icons/fi";

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
  const [photoPreviews, setPhotoPreviews] = useState(profile.photos || []);
  const [mainPhoto, setMainPhoto] = useState(
    (profile.photos && profile.photos[0]) || ""
  );

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

  // UI Classes
  const input =
    "w-full rounded-2xl border border-[#eee] px-5 py-4 text-base bg-gray-200 placeholder-gray-500 focus:outline-none mb-4";
  const mainBtn =
    "bg-[#EA4156] text-white font-bold w-full rounded-2xl py-4 text-base mt-8 shadow-md hover:brightness-105 transition";
  const chip =
    "px-4 py-2 rounded-xl text-xs font-thin cursor-pointer  hover:bg-[#EA4156] hover:text-white transition shadow";

  // Responsive header inside card only
  function StepHeader() {
    return (
      <div className="flex items-center justify-between py-10 px-6 w-full">
        <button
          type="button"
          onClick={() => (step === 1 ? navigate("/profile") : handleBack())}
          className="border border-gray-200 text-[#EA4156] rounded-xl p-2 shadow-md hover:bg-[#f8f8f8] transition"
          style={{ minWidth: 40, minHeight: 40 }}
          title="Back"
        >
          <FiArrowLeft size={22} />
        </button>
        {step !== 7 && (
          <button
            type="button"
            onClick={handleSkip}
            className="text-[#EA4156] font-medium text-base "
          >
            Skip
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#a7aab2]">
      <div className="relative w-full max-w-md bg-white min-h-screen mx-auto flex flex-col shadow-lg">
        {/* Header - inside mobile card only */}
        <StepHeader />

        {/* Main form area */}
        <main className="flex-1 w-full px-6 pb-4">
          <form
            className="w-full flex flex-col items-center"
            onSubmit={step === 7 ? handleSave : handleNext}
          >
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h2 className="text-3xl font-bold mb-5 mt-2 text-[#E63946] w-full text-center">
                  Main Photo & Info
                </h2>
                <div className="flex flex-col items-center w-full my-4">
                  <div className="relative w-28 h-28 my-4 flex justify-center items-center">
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
                <div className="flex gap-2 w-full mb-3">
                  <input
                    className={input + " mb-0"}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    className={input + " mb-0"}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <input
                  type="date"
                  className={input + " cursor-pointer mb-0"}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
                <div className="flex w-full gap-2 mt-3">
                  <input
                    className={input + " bg-[#F6F6F6] mb-0"}
                    value={age ? `Age: ${age}` : ""}
                    disabled
                    readOnly
                  />
                  <input
                    className={input + " bg-[#F6F6F6] mb-0 "}
                    value={zodiac ? `Zodiac: ${zodiac}` : ""}
                    disabled
                    readOnly
                  />
                </div>
                <button className={mainBtn + " mt-6"} type="submit">
                  Next
                </button>
              </>
            )}

            {/* STEP 2: Gender */}
            {step === 2 && (
              <>
                <h2 className="text-3xl font-bold mb-6 text-[#E63946] w-full text-left">
                  Your Gender
                </h2>
                <div className="flex gap-2 w-full my-6">
                  {GENDERS.map((g) => (
                    <button
                      type="button"
                      key={g}
                      className={`flex-1 py-3 rounded-full border text-base ${
                        gender === g
                          ? "bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white font-bold"
                          : "bg-gray-200 text-[#22223B] border-gray-300"
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
                <h2 className="text-3xl font-bold mb-4 text-[#E63946] w-full text-left">
                  Your Interests
                </h2>
                <div className="flex flex-wrap gap-2 w-full my-6 tracking-wide">
                  {INTERESTS.map((item) => (
                    <span
                      key={item}
                      className={
                        interests.includes(item)
                          ? chip + " bg-[#EA4156] text-white"
                          : chip + "text-gray-700 border border-gray-300 bg-white "
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
                <h2 className="text-3xl font-bold mb-4 text-[#E63946] w-full text-left">
                  Looking For
                </h2>
                <div className="flex gap-2 w-full my-6">
                  {LOOKING_FOR.map((g) => (
                    <button
                      type="button"
                      key={g}
                      className={`flex-1 py-3 rounded-full border text-base ${
                        lookingFor === g
                          ? "bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white font-bold"
                          : "bg-gray-200 text-[#22223B] border-gray-300"
                      }`}
                      onClick={() => setLookingFor(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!lookingFor}
                  className={mainBtn}
                  type="submit"
                >
                  Next
                </button>
              </>
            )}

            {/* STEP 5: Gallery */}
            {step === 5 && (
              <>
                <h2 className="text-3xl font-bold mb-4 text-[#E63946] w-full text-left">
                  Gallery Photos
                </h2>
                <div className="grid grid-cols-3 gap-2 my-6 w-full">
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
                <h2 className="text-3xl font-bold mb-4 text-[#E63946] w-full text-left">
                  Bio & Location
                </h2>
                <textarea
                  placeholder="Short Bio"
                  className="rounded-2xl px-4 py-3 border w-full resize-none my-6 bg-gray-200 placeholder-gray-500 "
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
                <h2 className="text-3xl font-bold mb-4 text-[#E63946] w-full text-left">
                  Review & Save
                </h2>
                <div className="w-full flex flex-col gap-2 my-2">
                  <div className="flex gap-3 items-center">
                    <img
                      src={mainPhoto}
                      alt="main"
                      className="w-12 h-12 rounded-full"
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
                  <div className="flex flex-wrap gap-2 my-2">
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
    </div>
  );
}
