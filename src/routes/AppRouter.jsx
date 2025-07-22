// src/routes/AppRouter.jsx

import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ChatPage from "../pages/chat/ChatPage";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOTP from "../pages/auth/VerifyOtp.jsx";

const AppRouter = () => {
  const isLoggedIn = !!localStorage.getItem("user");
  const location = useLocation();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />

      {/* Home route logic */}
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/chat" replace /> : <Navigate to="/login" replace />
        }
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/chat/:id?" element={<ChatPage />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
