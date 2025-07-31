// src/pages/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import Alert from "../../components/ui/Feedback/Alert";
import { H1 } from "../../components/ui/Typography/Heading";
import { Mail, ArrowRight } from "lucide-react";
import logo from "../../assets/images/logos/logo.svg";
import { resetPasswordRequest } from "../../lib/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      // API request to send reset link
      const res = await resetPasswordRequest({ email });
      console.log("Response:", res);
      console.log("Data:", res.data);

      setMessage("A password reset link has been sent to your email. Please check your inbox.");
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to send reset link. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        {/* Logo and Heading */}
        <div className="flex flex-col justify-center items-center text-center mb-6">
          <Link to="/" className="mb-4">
            <img
              src={logo}
              alt="Promptica Logo"
              className="w-28 sm:w-36 h-auto object-contain hover:scale-105 transition-transform duration-200"
            />
          </Link>
          <H1 weight="bold" color="gray-900" className="mb-2">
            Reset your password
          </H1>
          <p className="text-sm text-gray-600">
            Enter your registered email address to receive a reset link.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert
            variant="error"
            className="mb-4"
            dismissible
            onDismiss={() => setError("")}
          >
            {error}
          </Alert>
        )}
        {message && (
          <Alert variant="success" className="mb-4">
            {message}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            disabled={loading}
            autoComplete="email"
            required
          />

          <Button
            type="submit"
            loading={loading}
            disabled={loading || !email}
            fullWidth
            variant="primary"
            size="lg"
            rightIcon={!loading && <ArrowRight className="w-4 h-4" />}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          {/* Back to login */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Back to login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
