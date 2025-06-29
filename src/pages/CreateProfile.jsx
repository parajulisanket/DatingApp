import React, { useState } from "react";
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
  function handleSubmit(e) {
    e.preventDefault();
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

  // Styles
  const mainBtn =
    "bg-[#EA4156] text-white font-bold w-full rounded-full py-4 text-lg shadow-lg hover:brightness-105 transition";
  const input =
    "w-full rounded-full border border-[#eee] px-6 py-4 text-lg bg-gray-200 text-[#22223B] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF3366] mb-4";
  const formWrap = "w-full max-w-xs flex flex-col items-center px-2 pt-[70px]"; 

  // Header bar for each step
  function StepHeader({ showBack = true, showSkip = true }) {
    return (
      <div className="fixed top-0 left-0 w-full max-w-xs flex items-center justify-between py-10 bg-white z-30  rounded-t-2xl"
           style={{ margin: "0 auto", right: 0 }}>
        {showBack ? (
          <button
            type="button"
            onClick={step === 1 ? () => navigate(-1) : handleBack}
            className="border border-gray-200 text-[#EA4156] rounded-xl p-2 shadow-md hover:bg-[#f8f8f8] transition"
            style={{ minWidth: 40, minHeight: 40 }}
            title="Back"
          >
            <FiArrowLeft size={22} />
          </button>
        ) : (
          <span style={{ width: 40 }}></span>
        )}
        {showSkip ? (
          <button
            type="button"
            className="text-[#EA4156] font-semibold text-base"
            onClick={handleSkip}
          >
            Skip
          </button>
        ) : (
          <span style={{ width: 40 }}></span>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 font-[Inter] ">
      {/* STEP 1 */}
      {step === 1 && (
        <form className={formWrap} onSubmit={handleNext}>
          <StepHeader showBack={true} showSkip={true} />
          <h1 className="text-3xl font-extrabold mb-7 text-[#EA4156] w-full text-center">
            Profile Details
          </h1>
          <div className="flex flex-col items-center w-full mb-5">
            <div className="relative w-28 h-28">
              <img
                src={photoPreview || ""}
                alt=""
                className="rounded-full w-28 h-28 object-cover border-4 border-[#EA4156]"
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
          <button className={mainBtn + " mt-4"} type="submit">
            Next
          </button>
        </form>
      )}

      {/* STEP 2: Gender */}
      {step === 2 && (
        <form className={formWrap} onSubmit={handleNext}>
          <StepHeader showBack={true} showSkip={true} />
          <h1 className="text-3xl font-bold mb-8 text-[#EA4156] w-full text-left">
            I am a
          </h1>
          <div className="flex flex-col gap-4 w-full">
            {["Man", "Woman", "Other"].map((opt) => (
              <button
                key={opt}
                type="button"
                className={`rounded-full border-2 text-lg px-6 py-4 font-semibold
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
            Next
          </button>
        </form>
      )}

      {/* STEP 3: Interests */}
      {step === 3 && (
        <form className={formWrap} onSubmit={handleNext}>
          <StepHeader showBack={true} showSkip={true} />
          <h1 className="text-3xl font-bold mb-2 text-[#EA4156] w-full text-left">
            Your interests
          </h1>
          <p className="text-[#7a7a7a] mb-5 w-full text-left  text-base">
            Select a few interests and let everyone know what you’re into.
          </p>
          <div className="flex flex-wrap gap-2 w-full justify-center mb-3">
            {INTERESTS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`px-4 py-2 rounded-xl shadow tracking-wide font-thin text-base hover:bg-[#EA4156] hover:text-white transition
                  ${
                    interests.includes(opt)
                      ? "bg-[#EA4156] text-white border-[#EA4156]"
                      : " text-gray-700 border border-gray-300"
                  }
                `}
                onClick={() => handleInterestToggle(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          <button className={mainBtn + " mt-7"} type="submit">
            Next
          </button>
        </form>
      )}

      {/* STEP 4: Looking For */}
      {step === 4 && (
        <form className={formWrap} onSubmit={handleNext}>
          <StepHeader showBack={true} showSkip={true} />
          <h1 className="text-3xl font-bold mb-8 text-[#EA4156] w-full text-left">
            Looking for
          </h1>
          <div className="flex flex-col gap-4 w-full">
            {["Man", "Woman", "Other"].map((opt) => (
              <button
                key={opt}
                type="button"
                className={`rounded-full border-2 text-lg px-6 py-4 font-semibold
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
            Next
          </button>
        </form>
      )}

      {/* STEP 5: Add Photos */}
      {step === 5 && (
        <form className={formWrap} onSubmit={handleNext}>
          <StepHeader showBack={true} showSkip={true} />
          <h1 className="text-3xl font-bold mb-6 text-[#EA4156] w-full text-center">
            Add your photos
          </h1>
          <div className="grid grid-cols-3 gap-3 mb-2 w-full justify-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <label
                key={i}
                className="w-20 h-20 rounded-2xl bg-[#FFE6EF] flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-[#EA4156]"
              >
                {galleryPreview[i] ? (
                  <img
                    src={galleryPreview[i]}
                    className="object-cover w-full h-full"
                    alt=""
                  />
                ) : (
                  <FiCamera className="text-[#EA4156] text-2xl" />
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
          <button className={mainBtn + " mt-6"} type="submit">
            Next
          </button>
        </form>
      )}

      {/* STEP 6: Email & Password */}
      {step === 6 && (
        <form className={formWrap} onSubmit={handleSubmit}>
          <StepHeader showBack={true} showSkip={false} />
          <h1 className="text-3xl font-bold mb-8 text-[#EA4156] w-full text-center">
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
  );
}