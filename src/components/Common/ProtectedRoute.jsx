import React from "react";
import { Navigate } from "react-router-dom";

// Checks localStorage for a static "isLoggedIn" flag
export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
