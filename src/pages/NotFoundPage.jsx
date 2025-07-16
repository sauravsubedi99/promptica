// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { H1, H4 } from "../components/ui/Typography/Heading";
import Button from "../components/ui/Button/Button";
import { AlertTriangle } from "lucide-react";
import notFoundImage from "../assets/images/graphics/404.svg"; // Make sure to place this image or replace path

const NotFound = () => {
  return (
      <div className="h-screen bg-surface flex flex-col justify-center items-center px-4 text-center">
        <img
          src={notFoundImage}
          alt="404 Not Found"
          className="w-64 h-64 object-contain"
        />
        <H1 weight="bold" color="gray-900">
          Oops! Page Not Found
        </H1>
        <H4 color="gray-600">
          The page you're looking for doesn't exist or has been moved.
        </H4>
        <Button asChild variant="primary" className=" flex flex-col justify-center items-center px-4 text-center mt-4">
          <Link to="/">
            <AlertTriangle className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </Button>
      </div>
  );
};

export default NotFound;
