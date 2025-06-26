import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatApp from "./pages/ChatApp";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Navbar from "./components/Common/Navbar";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Feed from "./pages/Feed";
import CreateProfile from "./pages/CreateProfile";

// Helper function to check login
const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";

// Layout component for global navbar control
function AppLayout() {
  const location = useLocation();

  const noNavbarRoutes = [
    "/feed",
    "/profile",
    "/matches",
    "/chat",
    "/editprofile",
    "/Createprofile",
  ];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <div className="relative min-h-screen">
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={isLoggedIn() ? <Navigate to="/feed" replace /> : <Home />}
        />
        <Route
          path="/login"
          element={isLoggedIn() ? <Navigate to="/feed" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={
            isLoggedIn() ? <Navigate to="/feed" replace /> : <Register />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <Matches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/createprofile" element={<CreateProfile />} />
        <Route
          path="/editprofile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* Fallback for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
