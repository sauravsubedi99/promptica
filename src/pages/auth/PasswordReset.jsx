import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import PasswordInput from "../../components/ui/Input/PasswordInput";
import Button from "../../components/ui/Button/Button";
import Alert from "../../components/ui/Feedback/Alert";
import { H1 } from "../../components/ui/Typography/Heading";
import logo from "../../assets/images/logos/logo.svg";
import { resetPasswordConfirm } from "../../lib/api";
import PasswordStrengthMeter from "../../components/ui/PasswordStrengthMeter";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const uid = params.get("uid");
  const token = params.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Validate reset token params
  useEffect(() => {
    if (!uid || !token) {
      setError("Invalid or expired password reset link.");
    }
  }, [uid, token]);

  // Live confirm password validation
  useEffect(() => {
    if (formData.confirmPassword.length > 0) {
      setPasswordsMatch(formData.confirmPassword === formData.newPassword);
    } else {
      setPasswordsMatch(true); // neutral state when empty
    }
  }, [formData.confirmPassword, formData.newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (!passwordsMatch) return; // prevent submission if mismatch

    setLoading(true);
    try {
      await resetPasswordConfirm({
        uid,
        token,
        new_password: formData.newPassword,
      });
      setMessage("Your password has been reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        {/* Logo & Title */}
        <div className="flex flex-col justify-center items-center text-center mb-6">
          <img
            src={logo}
            alt="Promptica Logo"
            className="w-28 sm:w-36 h-auto object-contain mb-4 hover:scale-105 transition-transform duration-200"
          />
          <H1 weight="bold" color="gray-900" className="mb-2">
            Reset Your Password
          </H1>
          <p className="text-sm text-gray-600">
            Enter your new password and confirm it below.
          </p>
        </div>

        {/* Alerts */}
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}
        {message && <Alert variant="success" className="mb-4">{message}</Alert>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <PasswordInput
            label="Password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            disabled={loading}
            required
          />

          {/* Password Strength Meter */}
          {formData.newPassword && <PasswordStrengthMeter password={formData.newPassword} />}

          {/* Confirm Password */}
          <div>
            <PasswordInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              disabled={loading}
              required
              className={!passwordsMatch ? "border-red-500 focus:ring-red-500" : ""}
            />
            {!passwordsMatch && formData.confirmPassword.length > 0 && (
              <p className="text-xs text-red-600 mt-1">Passwords do not match.</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            fullWidth
            variant="primary"
            size="lg"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
