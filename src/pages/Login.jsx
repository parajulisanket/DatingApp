import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "password123";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setError("Invalid email or password!");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8F0] relative overflow-hidden font-[Inter]">
      {/* Optional: Soft pink radial accents */}
      <div className="absolute left-[-80px] top-[-80px] w-[250px] h-[250px] bg-[#FFD6E0] opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute right-[-70px] bottom-[-70px] w-[180px] h-[180px] bg-[#FF3366] opacity-20 rounded-full blur-2xl z-0"></div>

      <div className="w-full max-w-xs p-8 bg-white rounded-2xl shadow-xl border border-[#FFD6E0] z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#22223B] tracking-tight font-[Inter]">
          Log in
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-full px-4 py-3 bg-[#FFF8F0] text-[#22223B] placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#FF3366] transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="rounded-full px-4 py-3 bg-[#FFF8F0] text-[#22223B] placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#FF3366] transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white font-bold rounded-full py-3 mt-2 shadow-lg hover:brightness-110 transition text-lg"
          >
            Log in
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </form>
        <p className="mt-4 text-center text-[#7A7A7A] text-sm">
          Try{" "}
          <span className="text-[#22223B] font-semibold">demo@example.com</span>{" "}
          / <span className="text-[#22223B] font-semibold">password123</span>
        </p>
        <p className="mt-2 text-center text-[#7A7A7A] text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-[#FF3366] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
