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
import Chat from "./pages/Chat";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Navbar from "./components/Common/Navbar";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Feed from "./pages/Feed";

// Helper function to check login
const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";

// Layout component to handle navbar visibility and route rendering
function AppLayout() {
  const location = useLocation();

  // All routes where navbar should NOT be shown (logged-in/side-nav pages)
  const noNavbarRoutes = [
    "/feed",
    "/profile",
    "/matches",
    "/chat",
    "/editprofile",
  ];

  const hideNavbar = isLoggedIn() && noNavbarRoutes.includes(location.pathname);

  return (
    <div className="relative min-h-screen">
      {!hideNavbar && <Navbar />}
      <Routes>
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

        {/* Feed page: protected */}
        <Route
          path="/feed"
          element={isLoggedIn() ? <Feed /> : <Navigate to="/login" replace />}
        />

        {/* Other protected pages */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
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
        <Route
          path="/editprofile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        {/* Fallback for 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

// Wrap in BrowserRouter in the main App export
export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
