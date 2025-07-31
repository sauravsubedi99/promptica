import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // ✅ Reusable function to fetch the latest user (used in modal updates too)
  const fetchCurrentUser = async () => {
    if (!token) return;
    try {
      const res = await getCurrentUser();
      setUser(res.data.user);
      setToken(res.data.access); // if your endpoint refreshes token
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.access);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout();
    }
  };

  // Initial fetch on mount or token change
  useEffect(() => {
    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      await fetchCurrentUser();
      setLoading(false);
    };
    init();
  }, [token]);

  // ✅ Login updates token + user (optional userData param)
  const login = (newToken, userData = null) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      fetchCurrentUser(); // fallback fetch if userData isn't provided
    }
  };

  // ✅ Logout clears everything
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("activeChatId"); // Optional: clean chat state too
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, setUser, fetchCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
