// src/pages/auth/TermsOfService.jsx
import React from "react";
import { Link } from "react-router-dom";
import { H1 } from "../../components/ui/Typography/Heading";
import logo from "../../assets/images/logos/logo.svg";

const TermsOfService = () => {
  return (

      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <Link to="/">
            <img
              src={logo}
              alt="Promptica Logo"
              className="w-24 h-auto hover:scale-105 transition-transform duration-200"
            />
          </Link>
          <H1 weight="bold" color="gray-900">Terms of Service</H1>
        </div>

        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
          <li><strong>Account Eligibility:</strong> You must be at least 13 years old to create an account on Promptica.</li>
          <li><strong>Usage:</strong> Promptica provides AI-powered conversation services for learning and productivity purposes.</li>
          <li><strong>Prohibited Conduct:</strong> You agree not to misuse the platform or submit harmful, illegal, or misleading content.</li>
          <li><strong>Changes to Terms:</strong> Terms may be updated periodically. Continued use implies agreement to the latest version.</li>
          <li><strong>Termination:</strong> Accounts violating these terms may be suspended or terminated at our discretion.</li>
        </ul>
      </div>

  );
};

export default TermsOfService;
