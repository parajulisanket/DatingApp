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
  "Dancing",
  "Singing",
];
const GENDERS = ["M", "F", "Other"];
const LOOKING_FOR = ["M", "F", "Other"];
const RELATIONSHIP_GOALS = [
  "Long-term partner",
  "Dating only",
  "Looking for marriage",
];
const SEXUAL_ORIENTATION = [
  "Straight",
  "Gay",
  "Lesbian",
  "Bisexual",
  "Asexual",
  "Demisexual",
  "Pansexual",
  "Queer",
  "Questioning",
];

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

  // States
  const [mainPhoto, setMainPhoto] = useState(profile.photos?.[0] || "");
  const [photoPreviews, setPhotoPreviews] = useState(
    profile.photos || Array(5).fill(null)
  );
  const [firstName, setFirstName] = useState(profile.firstName || "");
  const [lastName, setLastName] = useState(profile.lastName || "");
  const [dob, setDob] = useState(profile.dob || "");
  const [age, setAge] = useState(profile.age || "");
  const [zodiac, setZodiac] = useState(profile.zodiac || "");
  const [gender, setGender] = useState(profile.gender || "");
  const [interests, setInterests] = useState(profile.interests || []);
  // const [interestInput, setInterestInput] = useState("");
  const [lookingFor, setLookingFor] = useState(profile.lookingFor || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [locationField, setLocationField] = useState(profile.location || "");
  const [email] = useState(profile.email || "");

  // Added fields
  const [relationshipGoal, setRelationshipGoal] = useState(
    profile.relationshipGoal || RELATIONSHIP_GOALS[0]
  );
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [sexualOrientation, setSexualOrientation] = useState(
    profile.sexualOrientation || SEXUAL_ORIENTATION[0]
  );
  const [showOrientationPicker, setShowOrientationPicker] = useState(false);

  // Birthdate, Age, Zodiac
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const now = new Date();
      let years = now.getFullYear() - birthDate.getFullYear();
      const m = now.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) years--;
      setAge(years);

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

  // Handlers
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
  // function handleInterestAdd(e) {
  //   e.preventDefault();
  //   if (interestInput.trim() && !interests.includes(interestInput.trim())) {
  //     setInterests([...interests, interestInput.trim()]);
  //     setInterestInput("");
  //   }
  // }
  function handleInterestToggle(item) {
    setInterests((arr) =>
      arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item]
    );
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
        relationshipGoal,
        sexualOrientation,
      })
    );
    navigate("/profile");
  }

  // Render
  return (
    <div className="min-h-screen bg-[#f7f7fa] flex justify-center items-center">
      <div className="relative w-full  bg-white rounded-3xl mx-auto flex flex-col shadow-xl min-h-screen overflow-y-auto py-2">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white rounded-t-3xl  flex items-center px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-20 text-[#EA4156] p-2 rounded-full"
          >
            <FiArrowLeft size={26} />
          </button>
          <span className="text-xl font-bold  text-black">Edit Profile</span>
        </div>
        <div
          className="flex flex-col gap-3 px-5 py-2"
          onSubmit={handleSave}
          autoComplete="off"
        >
          {/* Gallery */}
          <div className="flex flex-col items-center pt-1">
            <div className="relative w-28 h-28 flex justify-center items-center">
              <img
                src={mainPhoto}
                alt="profile"
                className="rounded-full w-28 h-28 object-cover border-4 border-[#FF3366] shadow"
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
          <div className="grid grid-cols-3 gap-2 my-4 w-full">
            {[0, 1, 2, 3, 4].map((idx) => (
              <label
                key={idx}
                className="w-20 h-20 rounded-xl bg-[#FFE6EF] flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-[#EA4156]"
              >
                {photoPreviews[idx] ? (
                  <img
                    src={photoPreviews[idx]}
                    className="object-cover w-full h-full"
                    alt={`gallery${idx}`}
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
          {/* Names */}
          <div className="flex gap-2 w-full">
            <input
              className="w-1/2 rounded-xl border border-[#eee] px-5 py-4 text-base bg-gray-200 placeholder-gray-500 focus:outline-none mb-0"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className="w-1/2 rounded-xl border border-[#eee] px-5 py-4 text-base bg-gray-200 placeholder-gray-500 focus:outline-none mb-0"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          {/* Birthday */}
          <input
            type="date"
            className="w-full rounded-xl border border-[#eee] px-5 py-4 text-base bg-[#FFE6EF] placeholder-gray-500 focus:outline-none text-[#EA4156] uppercase"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          {/* Age & Zodiac */}
          <div className="flex w-full gap-2">
            <input
              className="w-1/2 rounded-xl border border-[#eee] px-5 py-4 text-base bg-gray-100 placeholder-gray-500 focus:outline-none mb-0"
              value={age ? `Age: ${age}` : ""}
              disabled
              readOnly
            />
            <input
              className="w-1/2 rounded-xl border border-[#eee] px-5 py-4 text-base bg-gray-100 placeholder-gray-500 focus:outline-none mb-0"
              value={zodiac ? `Zodiac: ${zodiac}` : ""}
              disabled
              readOnly
            />
          </div>
          {/* Gender */}
          <div>
            <div className="font-semibold text-base text-[#181930] mb-2">
              Gender
            </div>
            <div className="flex gap-2 w-full">
              {GENDERS.map((g) => (
                <button
                  type="button"
                  key={g}
                  className={`flex-1 py-2 rounded-xl border text-base ${
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
          </div>
          {/* Relationship Goal */}
          <div
            className="bg-white rounded-xl border border-gray-200 mb-1 px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => setShowGoalPicker(true)}
          >
            <div className="font-semibold text-base text-[#181930] mb-1 flex justify-between items-center">
              <span>Relationship goal</span>
              <svg
                width={20}
                height={20}
                fill="none"
                stroke="#9696a0"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </div>
            <div className="text-[#9696a0] text-base">{relationshipGoal}</div>
          </div>
          {/* Sexual Orientation */}
          <div
            className="bg-white rounded-xl border border-gray-200 mb-1 px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => setShowOrientationPicker(true)}
          >
            <div className="font-semibold text-base text-[#181930] mb-1 flex justify-between items-center">
              <span>Sexual Orientation</span>
              <svg
                width={20}
                height={20}
                fill="none"
                stroke="#9696a0"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </div>
            <div className="text-[#9696a0] text-base">{sexualOrientation}</div>
          </div>
          {/* Interests */}
          <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 mb-1">
            <div className="font-semibold text-base text-[#181930] mb-1">
              Interests
            </div>

            <div className="flex flex-wrap gap-2 text-[#9696a0] text-sm">
              {[
                ...INTERESTS,
                ...interests.filter((i) => !INTERESTS.includes(i)),
              ].map((item) => (
                <span
                  key={item}
                  className={
                    interests.includes(item)
                      ? "bg-[#FFE6EF] text-[#EA4156] px-3 py-1 rounded-xl cursor-pointer"
                      : "bg-gray-200 text-[#22223B] px-3 py-1 rounded-xl cursor-pointer"
                  }
                  onClick={() => handleInterestToggle(item)}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          {/* Looking For */}
          <div>
            <div className="font-semibold text-base text-[#181930] mb-2">
              Looking For
            </div>
            <div className="flex gap-2 w-full">
              {LOOKING_FOR.map((g) => (
                <button
                  type="button"
                  key={g}
                  className={`flex-1 py-2 rounded-xl border text-base ${
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
          </div>
          {/* Bio */}
          <textarea
            placeholder="Short Bio"
            className="rounded-xl px-4 py-4 border w-full resize-none bg-gray-200 placeholder-gray-500 my-2"
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
          {/* Location */}
          <input
            type="text"
            placeholder="Location"
            className="w-full rounded-xl border border-[#eee] px-5 py-4 text-base bg-gray-200 placeholder-gray-500 focus:outline-none mb-2"
            value={locationField}
            onChange={(e) => setLocationField(e.target.value)}
            required
          />
          {/* Email - display only */}
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-[#eee] px-5 py-4 text-base bg-gray-200 placeholder-gray-500 focus:outline-none mb-2"
            value={email}
            disabled
          />
          {/* Save */}
          <form
            className="flex flex-col gap-3 px-5 py-2"
            onSubmit={handleSave}
            autoComplete="off"
          >
            <button
              className="bg-[#EA4156] text-white font-bold w-full rounded-2xl py-4 text-base mt-2 mb-6 shadow-md hover:brightness-105 transition"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Relationship Goal Picker */}
        {showGoalPicker && (
          <BottomSheetModal
            title="Relationship goal"
            options={RELATIONSHIP_GOALS}
            selected={relationshipGoal}
            onSelect={(opt) => {
              setRelationshipGoal(opt);
              setShowGoalPicker(false);
            }}
            onCancel={() => setShowGoalPicker(false)}
          />
        )}
        {/* Sexual Orientation Picker */}
        {showOrientationPicker && (
          <BottomSheetModal
            title="Sexual Orientation"
            options={SEXUAL_ORIENTATION}
            selected={sexualOrientation}
            onSelect={(opt) => {
              setSexualOrientation(opt);
              setShowOrientationPicker(false);
            }}
            onCancel={() => setShowOrientationPicker(false)}
          />
        )}
        {/* Modal animation style */}
        <style>{`
          .animate-fade-in-up {
            animation: fadeInUp 0.18s cubic-bezier(.44,1.45,.47,1);
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(60px);}
            to { opacity: 1; transform: none;}
          }
        `}</style>
      </div>
    </div>
  );
}

// BottomSheetModal: Card-sized, centered, mobile-style picker
function BottomSheetModal({ title, options, selected, onSelect, onCancel }) {
  return (
    <div className="fixed inset-0 z-30 bg-black/50 flex items-end justify-center">
      <div
        className="w-full max-w-xs mx-auto mb-8 rounded-3xl bg-white pb-2 px-0 shadow-2xl animate-fade-in-up"
        style={{
          minWidth: 320,
          borderRadius: 28,
        }}
      >
        <div className="px-6 pt-5 pb-2 font-extrabold text-lg text-[#181930]">
          {title}
        </div>
        <div className="px-3">
          {options.map((opt) => (
            <button
              key={opt}
              className={`w-full text-left px-4 py-3 mb-2 rounded-xl text-base transition
                ${
                  selected === opt
                    ? "bg-[#f6dde1] text-[#E63946] font-medium"
                    : "bg-[#f5f6f7] text-[#181930] font-normal"
                }
              `}
              style={{ letterSpacing: 0.1, fontSize: 17 }}
              onClick={() => onSelect(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        <button
          className="block w-full mt-2 py-3 text-center text-[#b1b1bc] font-bold text-base rounded-xl"
          style={{ letterSpacing: 0.4, fontSize: 16 }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
