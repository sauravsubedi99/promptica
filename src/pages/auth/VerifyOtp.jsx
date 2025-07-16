import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input/Input";
import PasswordInput from "../../components/ui/Input/PasswordInput";
import Button from "../../components/ui/Button/Button";
import Alert from "../../components/ui/Feedback/Alert";
import { H1 } from "../../components/ui/Typography/Heading";
import { Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email;

  const [step, setStep] = useState(1); // 1 = OTP verify, 2 = Reset password
  const [formData, setFormData] = useState({
    email: emailFromState || "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!emailFromState) {
      navigate("/forgot-password");
    }
  }, [emailFromState, navigate]);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));

    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setErrors({});
    try {
      if (!formData.otp) {
        setErrors({ otp: "OTP is required." });
        return;
      }

      // 🔁 Replace with real API call
      await new Promise(res => setTimeout(res, 1000));

      // Simulate OTP success
      if (formData.otp === "123456") {
        setStep(2);
        setMessage("OTP verified. You may now reset your password.");
      } else {
        setErrors({ otp: "Invalid OTP." });
      }
    } catch (err) {
      setErrors({ otp: "Failed to verify OTP. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setErrors({});
    try {
      if (!formData.newPassword || !formData.confirmPassword) {
        setErrors({ newPassword: "Password is required." });
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match." });
        return;
      }

      // 🔁 Replace with real API call
      await new Promise(res => setTimeout(res, 1000));

      navigate("/login");
    } catch (err) {
      setErrors({ newPassword: "Failed to reset password." });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    step === 1 ? handleVerifyOtp() : handleResetPassword();
  };

  return (
    <AuthLayout>
      <form className="w-full space-y-5" onSubmit={handleSubmit}>
        <div className="text-center mb-6">
          <H1 weight="bold" color="gray-900">Verify OTP</H1>
        </div>

        {message && <Alert variant="success">{message}</Alert>}
        {errors.general && <Alert variant="error">{errors.general}</Alert>}

        <Input
          label="Email"
          value={formData.email}
          disabled
          leftIcon={<Mail className="w-4 h-4" />}
        />

        {step === 1 ? (
          <>
            <Input
              label="Enter OTP"
              value={formData.otp}
              onChange={handleChange("otp")}
              error={errors.otp}
              leftIcon={<ShieldCheck className="w-4 h-4" />}
              required
              disabled={loading}
            />

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </Button>
          </>
        ) : (
          <>
            <PasswordInput
              label="New Password"
              value={formData.newPassword}
              onChange={handleChange("newPassword")}
              error={errors.newPassword}
              required
              disabled={loading}
            />

            <PasswordInput
              label="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={errors.confirmPassword}
              required
              disabled={loading}
            />

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              fullWidth
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </>
        )}
      </form>
    </AuthLayout>
  );
};

export default VerifyOtp;
