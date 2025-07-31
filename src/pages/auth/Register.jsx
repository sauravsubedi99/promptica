import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input/Input";
import PasswordInput from "../../components/ui/Input/PasswordInput";
import PasswordStrengthMeter from "../../components/ui/PasswordStrengthMeter";
import Button from "../../components/ui/Button/Button";
import Alert from "../../components/ui/Feedback/Alert";
import { H1 } from "../../components/ui/Typography/Heading";
import { User, Mail, CalendarDays, ArrowRight } from "lucide-react";
import logo from "../../assets/images/logos/logo.svg";
import { signup } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Field-level validation logic
  const validateField = (field, value) => {
    switch (field) {
      case "fullName":
        if (!value.trim()) return "Full name is required.";
        return "";
      case "email":
        if (!value) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address.";
        return "";
      case "dob":
        if (!value) return "Date of birth is required.";
        const dobDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        if (dobDate > today) return "Date of birth cannot be in the future.";
        if (age < 13) return "You must be at least 13 years old.";
        return "";
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 8) return "Password must be at least 8 characters long.";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password.";
        if (value !== formData.password) return "Passwords do not match.";
        return "";
      case "acceptTerms":
        if (!value) return "You must accept the terms and conditions.";
        return "";
      default:
        return "";
    }
  };

  // On input change (real-time validation)
  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));

    // Additional live validation for confirmPassword when password changes
    if (field === "password" && formData.confirmPassword) {
      const matchError = formData.confirmPassword !== value ? "Passwords do not match." : "";
      setErrors((prev) => ({ ...prev, confirmPassword: matchError }));
    }
    if (field === "confirmPassword") {
      const matchError = value !== formData.password ? "Passwords do not match." : "";
      setErrors((prev) => ({ ...prev, confirmPassword: matchError }));
    }
  };

  const handleFocus = (field) => () => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  // Final submit validation
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) newErrors[field] = errorMsg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        dob: formData.dob,
        password: formData.password,
        terms_accepted: formData.acceptTerms,
      };

      const res = await signup(payload);
      const token = res.data.access;
      const user = res.data.user;

      login(token, user);
      navigate("/chat");
    } catch (err) {
      let msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        Object.values(err?.response?.data || {})[0]?.[0] ||
        "Registration failed. Please try again.";

      msg = msg.charAt(0).toUpperCase() + msg.slice(1);
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <AuthLayout>
      <div className="w-full" onKeyDown={handleKeyDown}>
        <div className="flex flex-col justify-center items-center text-center mb-2">
          <button onClick={() => (window.location.href = "/")} className="mb-2">
            <img
              src={logo}
              alt="Promptica Logo"
              className="w-30 h-30 hover:scale-105 transition-transform duration-200"
            />
          </button>
          <H1 weight="bold" color="gray-900" className="mb-2">
            Create your account
          </H1>
        </div>

        {errors.general && (
          <Alert variant="error" className="mb-4">
            {errors.general}
          </Alert>
        )}

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            onFocus={handleFocus("fullName")}
            error={errors.fullName}
            leftIcon={<User className="w-4 h-4" />}
            disabled={loading}
            autoFocus
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            onFocus={handleFocus("email")}
            error={errors.email}
            leftIcon={<Mail className="w-4 h-4" />}
            disabled={loading}
            autoComplete="email"
            required
          />

          <Input
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={handleChange("dob")}
            onFocus={handleFocus("dob")}
            error={errors.dob}
            leftIcon={<CalendarDays className="w-4 h-4" />}
            disabled={loading}
            required
          />

          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={handleChange("password")}
            onFocus={handleFocus("password")}
            error={errors.password}
            disabled={loading}
            autoComplete="new-password"
            required
          />

          {formData.password && <PasswordStrengthMeter password={formData.password} />}

          <PasswordInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            onFocus={handleFocus("confirmPassword")}
            error={errors.confirmPassword}
            disabled={loading}
            autoComplete="new-password"
            required
          />

          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange("acceptTerms")}
              onFocus={handleFocus("acceptTerms")}
              disabled={loading}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-0.5"
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <button
                onClick={() => window.open("/terms", "_blank")}
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                onClick={() => window.open("/privacy", "_blank")}
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Privacy Policy
              </button>
            </span>
          </label>
          {errors.acceptTerms && <p className="text-xs text-red-600 ml-5">{errors.acceptTerms}</p>}

          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
            fullWidth
            variant="primary"
            size="lg"
            rightIcon={!loading && <ArrowRight className="w-4 h-4" />}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => (window.location.href = "/login")}
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                Login Here
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
