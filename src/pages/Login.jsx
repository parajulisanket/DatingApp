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
    // Static credential check
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      // Save login flag in localStorage
      localStorage.setItem("isLoggedIn", "true");
      // Redirect to main page (home/swipe)
      navigate("/");
    } else {
      setError("Invalid email or password!");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 relative overflow-hidden">
      <div className="w-full max-w-xs p-6 bg-white/90 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Log in</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="rounded-full px-4 py-3 bg-gray-100"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-full px-4 py-3 bg-gray-100"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-4 py-3 font-semibold"
          >
            Log in
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        <p className="mt-4 text-center text-gray-600">
          Try <span className="text-black">demo@example.com</span> / <span className="text-black">password123</span>
        </p>
        <p className="mt-2 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-500 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
