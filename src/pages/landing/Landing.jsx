// src/pages/landing/Landing.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { H1, H4, Button } from "./../../components/ui";
import logo from "../../assets/images/logos/logo.svg";

const Landing = () => {
  useEffect(() => {
    // console.log("Landing component MOUNTED");
  }, []);

  return (
    <div className="h-screen bg-surface flex flex-col justify-center items-center px-4 text-center">
      <Link to="/">
        <img src={logo} alt="Promptica Logo" className="w-30 h-30" />
      </Link>
      <div className="text-center space-y-4">
        <H1>Welcome to PROMPTICA!</H1>
        <H4>Your AI Language Coach for IELTS & CELPIP Mastery</H4>
        <div className="mt-8 flex justify-center space-x-4">
          <Link to="/login">
            <Button size="lg">Login</Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="secondary">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
