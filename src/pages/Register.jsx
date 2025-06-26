import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Register() {
  const [step, setStep] = useState(1);
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSendOtp(e) {
    e.preventDefault();
    setError("");
    if (!number || number.length < 6) {
      setError("Please enter a valid phone number!");
      return;
    }
    setStep(2);
  }

  function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    if (otp === "123456") {
      navigate("/Createprofile", { state: { number } });
    } else {
      setError("Incorrect OTP! Try 123456");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8F0] font-[Inter]">
      <div className="w-full max-w-sm p-10 bg-white rounded-3xl shadow-2xl border border-[#FFD6E0] z-10 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-[#22223B] tracking-tight">
          Create your account
        </h2>
        {step === 1 && (
          <form className="flex flex-col gap-8 w-full" onSubmit={handleSendOtp}>
            <PhoneInput
              country={"np"}
              value={number}
              onChange={setNumber}
              inputStyle={{
                width: "100%",
                borderRadius: "40px",
                padding: "18px 24px 18px 58px",
                background: "#FFF8F0",
                fontSize: "1rem",
                color: "#22223B",
                border: "1px solid #f5e2e8",
                fontWeight: 400,
                letterSpacing: "0.02em",
                boxShadow: "none",
                outline: "none",
                height: "64px",
              }}
              containerStyle={{
                width: "100%",
                borderRadius: "40px",
                marginBottom: "0px",
              }}
              buttonStyle={{
                border: "none",
                background: "transparent",
                borderRadius: "40px",
              }}
              dropdownStyle={{
                borderRadius: "14px",
              }}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
                autoComplete: "tel",
              }}
              placeholder="Enter your phone number"
              disableDropdown={false}
              disableCountryCode={false}
            />
            <button
              type="submit"
              className="bg-[#EA4156] hover:brightness-110 text-white font-semibold rounded-full py-4 text-lg shadow-lg transition-all"
              style={{
                fontSize: "1.5rem",
                marginTop: "18px",
                borderRadius: "40px",
                boxShadow: "0 8px 32px 0 rgba(234,65,86,0.12)",
              }}
            >
              Continue
            </button>
            {error && (
              <p className="text-red-500 text-center text-base">{error}</p>
            )}
          </form>
        )}

        {step === 2 && (
          <form
            className="flex flex-col gap-6 w-full"
            onSubmit={handleVerifyOtp}
          >
            <input
              type="text"
              placeholder="Enter OTP (try 123456)"
              className="rounded-full px-5 py-4 bg-[#FFF8F0] text-[#22223B] placeholder-[#B0B0B0] text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#FF3366] transition border-none tracking-widest text-center"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              autoFocus
              inputMode="numeric"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white font-bold rounded-full py-4 text-lg shadow-lg hover:brightness-110 transition"
            >
              Verify OTP
            </button>
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
          </form>
        )}

        <p className="mt-6 text-center text-[#7A7A7A] text-base">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#FF3366] font-semibold hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
