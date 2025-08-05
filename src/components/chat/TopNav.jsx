// components/chat/TopNav.jsx
import React, { useState, useRef, useEffect } from "react";
import { LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import SettingsModal from "./SettingsModal";
import { useAuth } from "../../context/AuthContext";
// import { IMAGE_BASE_URL } from "../../config";
import { getUserImageUrl } from "../../config";


const TopNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth(); //fetch user and logout from context
  const navigate = useNavigate();

  // console.log("TopNav user:", user);

  const handleLogout = () => {
    logout(); // use logout function from context
    navigate("/login", { replace: true }); // redirect to login
  };

  const handleSettings = () => {
    setModalOpen(true);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-end px-6 py-2 bg-surface border-b border-gray-300">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="rounded-full w-9 h-9 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          {user?.image ? (
            <img
              src={getUserImageUrl(user?.image)}
              alt="User avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm uppercase">
              {user?.full_name?.charAt(0) || "U"}
            </div>
          )}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black/10 z-50 transition-all duration-200">
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.full_name || "Loading..."}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || ""}
              </p>
            </div>

            {/* Menu Actions */}
            <div className="py-2">
              <button
                onClick={handleSettings}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition rounded-lg"
              >
                <Settings
                  size={16}
                  className="text-gray-500 group-hover:text-blue-700"
                />
                <span>Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition rounded-lg"
              >
                <LogOut size={16} className="text-red-500" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <SettingsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() => {
          setModalOpen(false);
        }}
        user={user} // Pass user data to modal
      />
    </header>
  );
};

export default TopNav;
