import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute, { GuestRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const getStoredUserId = () => {
  // New logins save the ID directly; older sessions can read it from the token.
  const storedUserId = localStorage.getItem("userID");
  if (storedUserId) return storedUserId;

  const payload = localStorage.getItem("token")?.split(".")[1];
  if (!payload) return null;

  try {
    // JWT payloads use URL-safe Base64, so convert it before decoding.
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")));
    return decodedPayload.userID || null;
  } catch {
    return null;
  }
};

const AppRoutes = ({ user, userId, setUser, setUserId, isAuthenticated }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userID");
    setUser(null);
    setUserId(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {pathname === "/dashboard" && (
        <Navbar userName={user} onLogout={handleLogout} />
      )}
      <Routes>
        <Route element={<GuestRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/login"
            element={<Login setUser={setUser} setUserId={setUserId} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/dashboard"
            element={<Dashboard userName={user} userId={userId} />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(getStoredUserId);
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("token"))
  );

  const updateUser = (nextUser) => {
    setUser(nextUser);
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  };

  const updateUserId = (nextUserId) => {
    setUserId(nextUserId);
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  };

  return (
    <Router>
      <AppRoutes
        user={user}
        userId={userId}
        setUser={updateUser}
        setUserId={updateUserId}
        isAuthenticated={isAuthenticated}
      />
    </Router>
  );
};

export default App;