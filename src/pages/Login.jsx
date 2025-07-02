import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import Footer from "../components/Common/Footer";

const DEMO_EMAIL = "demo@email.com";
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
    <div className="flex flex-col justify-center items-center  px-4 my-36">
      <h2 className="text-3xl font-medium text-center mb-8 text-[#EA4156]">
        Log In
      </h2>
      <form
        className="flex flex-col gap-4 w-full max-w-xs"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          autoComplete="username"
          placeholder="Email"
          className="rounded-full px-4 py-3 bg-gray-200 text-[#22223B] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF3366] transition w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          className="rounded-full px-4 py-3 bg-gray-200 text-[#22223B] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF3366] transition w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white font-bold rounded-full py-3 mt-2 shadow-lg hover:brightness-110 transition text-lg w-full"
        >
          Log in
        </button>
        {error && (
          <p className="text-red-500 text-sm text-center mt-1">{error}</p>
        )}
      </form>
      <div className="mt-6 text-center text-[#7A7A7A] text-[15px]">
        Try{" "}
        <span className="font-semibold text-[#22223B]">demo@email.com</span>
        {" / "}
        <span className="font-semibold text-[#22223B]">password123</span>
      </div>
      <div className="mt-3 text-center text-[#7A7A7A] text-[15px]">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-[#FF3366] font-semibold hover:underline"
        >
          Sign up
        </Link>
      </div>
        {/* <Footer /> */}
    </div>
  );
}
