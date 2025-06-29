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
import BottomNav from "./components/BottomNav/BottomNav";
// import Footer from "./components/Common/Footer";

// log in check function
const isLoggedIn = () => localStorage.getItem("isLoggedIn") === "true";

// Layout for the mobile-mockup view
function AppLayout() {
  const location = useLocation();

  // List of routes where navbar should be hidden
  const noNavbarRoutes = [
    "/feed",
    "/profile",
    "/matches",
    "/chat",
    "/editprofile",
    "/createprofile",
  ];

  //  bottom nav should be hidden
  const hideBottomNavRoutes = ["/", "/login", "/register","/editprofile", "/createprofile"];

  // Lowercase for matching
  const pathLower = location.pathname.toLowerCase();

  // Hide Navbar if path matches any noNavbarRoute
  const hideNavbar = noNavbarRoutes.some(
    (r) =>
      pathLower === r ||
      (r.endsWith("/")
        ? pathLower.startsWith(r)
        : pathLower.startsWith(r + "/"))
  );

  // Hide BottomNav on /chat/:id, home, login, register
  const hideBottomNav =
    /^\/chat\/[^/]+$/.test(pathLower) ||
    hideBottomNavRoutes.includes(pathLower);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black/50">
      {/* Mobile-mockup container */}
      <div
        className="
          w-full h-full min-h-screen
          md:w-[375px] md:h-[812px]  
          md:rounded-[2.5rem] 
          bg-white overflow-hidden flex flex-col relative
          shadow-xl
          transition-all duration-300
        "
      >
        {/*  show navbar on public landing, login, register pages */}
        {!hideNavbar && <Navbar />}

        {/* Main content area */}
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
            {/* <Route path="/footer" element={<Footer />} /> */}
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
        {/* Bottom Navigation (hide on chat/:id, home, login, register) */}
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
