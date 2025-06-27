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
// import Navbar from "./components/Common/Navbar";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Feed from "./pages/Feed";
import CreateProfile from "./pages/CreateProfile";
import BottomNav from "./components/BottomNav/BottomNav";

// Helper function to check login
const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "false";

// Layout component for global navbar control
function AppLayout() {
  const location = useLocation();

  // Top Navbar logic
  const noNavbarRoutes = [
    "/feed",
    "/profile",
    "/matches",
    "/chat",
    "/editprofile",
    "/createprofile",
  ];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  // Hide BottomNav on /chat/:id (but NOT on /chat)
  const hideBottomNav = /^\/chat\/[^/]+$/.test(location.pathname);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-400">
      {/* Centered Mobile Mockup */}
      <div
        className="
          w-full h-full min-h-screen
          md:w-[375px] md:h-[812px]  
          md:rounded-[2.5rem] 
          bg-white overflow-hidden flex flex-col relative
          transition-all duration-300
        "
      >
        {/* Navbar */}
        {/* {!hideNavbar && <Navbar />} */}

        {/* Main app content (routes) */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                isLoggedIn() ? <Navigate to="/feed" replace /> : <Home />
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn() ? <Navigate to="/feed" replace /> : <Login />
              }
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
            {/* Individual Chat Page */}
            <Route
              path="/chat/:id"
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
        {/* Bottom Navigation */}
        {!hideBottomNav && <BottomNav />}
      </div>
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
