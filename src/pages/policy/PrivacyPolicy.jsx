// src/pages/auth/PrivacyPolicy.jsx
import React from "react";
import { Link } from "react-router-dom";
import { H1 } from "../../components/ui/Typography/Heading";
import logo from "../../assets/images/logos/logo.svg";

const PrivacyPolicy = () => {
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
          <H1 weight="bold" color="gray-900">Privacy Policy</H1>
        </div>

        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
          <li><strong>Information We Collect:</strong> We store your name, email, DOB, and password securely for account access.</li>
          <li><strong>How It’s Used:</strong> To authenticate users and enhance the chat experience with personalized features.</li>
          <li><strong>Storage & Security:</strong> All data is encrypted and not shared with advertisers or third parties.</li>
          <li><strong>Cookies:</strong> We use local storage for session handling only — no trackers or analytics cookies are involved.</li>
          <li><strong>Your Rights:</strong> You may request to view or delete your data by contacting us via support channels.</li>
        </ul>
      </div>

  );
};

export default PrivacyPolicy;
