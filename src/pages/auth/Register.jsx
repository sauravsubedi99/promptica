import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input/Input";
import PasswordInput from "../../components/ui/Input/PasswordInput";
import Button from "../../components/ui/Button/Button";
import Alert from "../../components/ui/Feedback/Alert";
import { H1 } from "../../components/ui/Typography/Heading";
import { User, Mail, CalendarDays, ArrowRight, Check, X } from "lucide-react";
import logo from "../../assets/images/logos/logo.svg";
import { signup } from "../../lib/api"; // API call
import { useAuth } from "../../context/AuthContext";

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, level: null, checks: {} };

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  const levels = [
    { name: "Very Weak", bgColor: "bg-red-500", textColor: "text-red-600" },
    { name: "Weak", bgColor: "bg-red-400", textColor: "text-red-600" },
    { name: "Fair", bgColor: "bg-yellow-500", textColor: "text-yellow-600" },
    { name: "Good", bgColor: "bg-blue-500", textColor: "text-blue-600" },
    { name: "Strong", bgColor: "bg-green-500", textColor: "text-green-600" },
  ];

  return {
    score,
    level: levels[Math.min(score, levels.length - 1)],
    checks,
    percentage: (score / 5) * 100,
  };
};

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

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required.";
    } else {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      if (dobDate > today) {
        newErrors.dob = "Date of birth cannot be in the future.";
      } else if (age < 13) {
        newErrors.dob = "You must be at least 13 years old.";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      if (!validateForm()) return;

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

      // // Save token to localStorage
      // localStorage.setItem("token", token);
      // //store user data to localStorage
      // localStorage.setItem("user", JSON.stringify(user));

      login(token, user);
      navigate("/chat");
    } catch (err) {
      const msg =
      err?.response?.data?.message || 
      err?.response?.data?.error || 
      "Registration failed. Please try again."; // default fallback
      console.error("Registration error:", err);

      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }

    if (field === "confirmPassword" || field === "password") {
      const match =
        field === "password"
          ? formData.confirmPassword === value
          : value === formData.password;
      if (!match) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match.",
        }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.confirmPassword;
          return updated;
        });
      }
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
            error={errors.dob}
            leftIcon={<CalendarDays className="w-4 h-4" />}
            disabled={loading}
            required
          />

          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={handleChange("password")}
            error={errors.password}
            disabled={loading}
            autoComplete="new-password"
            required
          />

          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-medium ${passwordStrength.level?.textColor}`}
                >
                  Password Strength: {passwordStrength.level?.name}
                </span>
                <span className="text-xs text-gray-500">
                  {passwordStrength.score}/5
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.level?.bgColor}`}
                  style={{ width: `${passwordStrength.percentage}%` }}
                />
              </div>
              <div className="space-y-1 mt-2">
                {Object.entries(passwordStrength.checks).map(
                  ([key, passed]) => (
                    <div key={key} className="flex items-center text-xs">
                      {passed ? (
                        <Check className="w-3 h-3 text-green-500 mr-2" />
                      ) : (
                        <X className="w-3 h-3 text-gray-400 mr-2" />
                      )}
                      <span
                        className={passed ? "text-green-600" : "text-gray-500"}
                      >
                        {key === "length" && "At least 8 characters"}
                        {key === "uppercase" && "One uppercase letter"}
                        {key === "lowercase" && "One lowercase letter"}
                        {key === "number" && "One number"}
                        {key === "special" && "One special character"}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <PasswordInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
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
          {errors.acceptTerms && (
            <p className="text-xs text-red-600 ml-5">{errors.acceptTerms}</p>
          )}

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
