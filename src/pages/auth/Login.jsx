import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/ui/Input/Input";
import PasswordInput from "../../components/ui/Input/PasswordInput";
import Button from "../../components/ui/Button/Button";
import Alert from "../../components/ui/Feedback/Alert";
import { H1 } from "../../components/ui/Typography/Heading";
import { Mail, ArrowRight } from "lucide-react";
import logo from "../../assets/images/logos/logo.svg";
import { useAuth } from "../../context/AuthContext";
import { signin } from "../../lib/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // use login function from context

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError("Both fields are required.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address.");
        return;
      }

      // Signin API call
      const res = await signin({
        email: formData.email,
        password: formData.password,
      });

      //extract token and user data from response
      const token = res.data.access;
      const user = res.data.user;
 

      // // Save token to localStorage
      // localStorage.setItem("token", token);
      // //store user data to localStorage
      // localStorage.setItem("user", JSON.stringify(user));

      login(token, user); // save token + user to context
      navigate("/chat", { replace: true }); // redirect

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message || err);
      const msg = err.response?.data?.error || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));

    if (error) setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading && formData.email && formData.password) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <AuthLayout>
      <div className="w-full" onKeyDown={handleKeyDown}>
        <div className="flex flex-col justify-center items-center text-center mb-6">
          <Link to="/" className="mb-4">
            <img 
              src={logo} 
              alt="Promptica Logo" 
              className="w-30 h-30 hover:scale-105 transition-transform duration-200" 
            />
          </Link>
          <H1 weight="bold" color="gray-900" className="mb-2">
            Welcome back
          </H1>
        </div>

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

        <div className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            leftIcon={<Mail className="w-4 h-4" />}
            onChange={handleChange('email')}
            disabled={loading}
            autoComplete="email"
            autoFocus
            required
          />

          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={handleChange('password')}
            disabled={loading}
            autoComplete="current-password"
            required
          />

          <div className="flex items-center justify-between">
            <Link 
              to="/forgot-password" 
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>

          <Button 
            onClick={handleSubmit}
            loading={loading}
            disabled={loading || !formData.email || !formData.password}
            fullWidth 
            variant="primary"
            size="lg"
            rightIcon={!loading && <ArrowRight className="w-4 h-4" />}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account yet?{" "}
              <Link 
                to="/register" 
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
