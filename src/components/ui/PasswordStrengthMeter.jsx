// src/components/ui/PasswordStrengthMeter.jsx
import React from "react";
import getPasswordStrength from "../../utils/getPasswordStrength";
import { Check } from "lucide-react";

const PasswordStrengthMeter = ({ password }) => {
  const { score, level, checks } = getPasswordStrength(password);

  return (
    <div className="space-y-2">
      {/* Strength Bar + Label + Score */}
      <div className="flex items-center justify-between">
        <div className="w-full h-2 rounded bg-gray-200 overflow-hidden mr-2">
          <div
            className={`h-2 ${level.color} transition-all duration-300`}
            style={{ width: `${(score / 5) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">
          {level.label} <span className="text-gray-500 text-xs ml-1">{score}/5</span>
        </span>
      </div>

      {/* Criteria with Green Ticks */}
      <ul className="space-y-1">
        <li className={`flex items-center text-sm ${checks.length ? "text-green-600" : "text-gray-500"}`}>
          <Check className="w-4 h-4 mr-2" /> At least 8 characters
        </li>
        <li className={`flex items-center text-sm ${checks.uppercase ? "text-green-600" : "text-gray-500"}`}>
          <Check className="w-4 h-4 mr-2" /> One uppercase letter
        </li>
        <li className={`flex items-center text-sm ${checks.lowercase ? "text-green-600" : "text-gray-500"}`}>
          <Check className="w-4 h-4 mr-2" /> One lowercase letter
        </li>
        <li className={`flex items-center text-sm ${checks.number ? "text-green-600" : "text-gray-500"}`}>
          <Check className="w-4 h-4 mr-2" /> One number
        </li>
        <li className={`flex items-center text-sm ${checks.special ? "text-green-600" : "text-gray-500"}`}>
          <Check className="w-4 h-4 mr-2" /> One special character
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrengthMeter;
