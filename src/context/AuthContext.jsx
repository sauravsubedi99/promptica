import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  // Check if token exists in localStorage
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        console.log("AuthContext token:", token);
        const res = await getCurrentUser(); 
        console.log("Fetched user:", res.data);
        setUser(res.data);
      } catch {
        logout(); // token invalid
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);
  // Fetch user data on initial load
  const login = (newToken, userData = null) => {
    localStorage.setItem("token", newToken);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
    setToken(newToken);
  };

  // Logout function to clear token and user data
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
