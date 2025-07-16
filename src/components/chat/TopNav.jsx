// components/chat/TopNav.jsx
import React, { useState, useRef, useEffect } from "react";
import { LogOut, Settings } from "lucide-react";
import clsx from "clsx";
import SettingsModal from "./SettingsModal";
import { useAuth } from "../../context/AuthContext"; //

const TopNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth(); //fetch user and logout from context

  console.log("TopNav user:", user);

  const handleLogout = () => {
    logout(); // use logout function from context
    window.location.href = "/login"; // redirect
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
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm uppercase">
            {user?.full_name?.charAt(0) || "U"}
          </div>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              {user?.email || "Loading..."}
            </div>
            <button
              onClick={handleSettings}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings size={16} /> Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} /> Log out
            </button>
          </div>
        )}
      </div>

      <SettingsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={() => {
          console.log("Saving settings...");
          setModalOpen(false);
        }}
        user={user} // Pass user data to modal
      />
    </header>
  );
};

export default TopNav;
