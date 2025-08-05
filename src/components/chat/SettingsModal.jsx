import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, User } from "lucide-react";
import PasswordInput from "../ui/Input/PasswordInput";
import Button from "../ui/Button/Button";
import PasswordStrengthMeter from "../ui/PasswordStrengthMeter";
import Alert from "../ui/Feedback/Alert";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { H3 } from "../ui";
import { updateUserPassword, updateUserPhoto } from "../../lib/api";
import { getUserImageUrl } from "../../config";

const TABS = ["Account", "Security", "Settings"];

const SettingsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Account");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Feedback states for each tab
  const [accountFeedback, setAccountFeedback] = useState({
    type: "",
    message: "",
  });
  const [securityFeedback, setSecurityFeedback] = useState({
    type: "",
    message: "",
  });
  const [settingsFeedback, setSettingsFeedback] = useState({
    type: "",
    message: "",
  });

  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showStrength, setShowStrength] = useState(false);
  const [matchError, setMatchError] = useState(false);

  const [generalPrompt, setGeneralPrompt] = useState(
    () => localStorage.getItem("generalPrompt") || ""
  );

  const { user, fetchCurrentUser } = useAuth();
  const { chats } = useChat();

  // Reset state whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      setAccountFeedback({ type: "", message: "" });
      setSecurityFeedback({ type: "", message: "" });
      setSettingsFeedback({ type: "", message: "" });
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
      setShowStrength(false);
      setSelectedFile(null);
    }
  }, [isOpen]);

  // Fetch current user data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCurrentUser();
    }
  }, [isOpen]);

  // Sync preview with user image if available
  useEffect(() => {
    if (user?.image) {
      setPreviewUrl(getUserImageUrl(user?.image));
    }
  }, [user?.image]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Preview selected file locally
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  // Validate password match
  useEffect(() => {
    setMatchError(confirmPwd && newPwd !== confirmPwd);
  }, [newPwd, confirmPwd]);

  const handlePasswordSave = async () => {
    if (!currentPwd || !newPwd || !confirmPwd || matchError) {
      setSecurityFeedback({
        type: "error",
        message: "Please complete the form correctly.",
      });
      return;
    }

    try {
      await updateUserPassword({
        id: user?.id,
        current_password: currentPwd,
        password: newPwd,
      });
      setSecurityFeedback({
        type: "success",
        message: "Password updated successfully.",
      });
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
      setShowStrength(false);
    } catch (err) {
      // console.error("Password update failed:", err.response?.data || err);

      let msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        // Extract first field error dynamically if backend returns field-level errors
        (typeof err?.response?.data === "object"
          ? Object.values(err.response.data)[0]?.[0]
          : null) ||
        "Failed to update password. Try again.";

      msg = msg.charAt(0).toUpperCase() + msg.slice(1);

      setSecurityFeedback({
        type: "error",
        message: msg,
      });
    }
  };

  const handlePromptSave = () => {
    localStorage.setItem("generalPrompt", generalPrompt);
    setSettingsFeedback({
      type: "success",
      message: "Prompt saved successfully.",
    });
  };

  const handleProfilePhotoUpload = async () => {
    if (!selectedFile) {
      setAccountFeedback({
        type: "error",
        message: "Please select a file first.",
      });
      return;
    }

    const validTypes = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024;

    if (!validTypes.includes(selectedFile.type)) {
      setAccountFeedback({
        type: "error",
        message: "Only JPEG and PNG formats are allowed.",
      });
      return;
    }

    if (selectedFile.size > maxSize) {
      setAccountFeedback({
        type: "error",
        message: "File size must not exceed 2 MB.",
      });
      return;
    }

    try {
      await updateUserPhoto(selectedFile);
      await fetchCurrentUser();
      setAccountFeedback({
        type: "success",
        message: "Profile photo updated successfully.",
      });
      setSelectedFile(null);
    } catch (err) {
      console.error("Photo upload failed:", err.response?.data || err);
      setAccountFeedback({
        type: "error",
        message: err.response?.data?.photo?.[0] || "Failed to update photo.",
      });
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 relative flex min-h-[500px]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Tabs */}
        <div className="w-1/4 pr-4 border-r border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Settings</h2>
          <div className="flex flex-col space-y-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`text-left px-3 py-2 rounded-md ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="w-3/4 pl-6 overflow-y-auto space-y-6">
          {/* Account Tab */}
          {activeTab === "Account" && (
            <div className="space-y-6">
              <H3 className="mb-8 text-center">Account Settings</H3>
              {accountFeedback.message && (
                <Alert
                  variant={accountFeedback.type}
                  dismissible
                  onDismiss={() =>
                    setAccountFeedback({ type: "", message: "" })
                  }
                  className="mb-4"
                >
                  {accountFeedback.message}
                </Alert>
              )}

              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <label
                  htmlFor="photoUpload"
                  className="relative group cursor-pointer"
                >
                  <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-2 border border-gray-300 group-hover:border-blue-400 transition">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-gray-500" />
                    )}
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium flex items-center gap-1">
                        Edit
                      </span>
                    </div>
                  </div>
                </label>
                <input
                  id="photoUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const validTypes = ["image/jpeg", "image/png"];
                      const maxSize = 2 * 1024 * 1024;

                      if (!validTypes.includes(file.type)) {
                        setAccountFeedback({
                          type: "error",
                          message: "Only JPEG and PNG formats are allowed.",
                        });
                        setSelectedFile(null);
                        return;
                      }

                      if (file.size > maxSize) {
                        setAccountFeedback({
                          type: "error",
                          message: "File size must not exceed 2 MB.",
                        });
                        setSelectedFile(null);
                        return;
                      }

                      setSelectedFile(file);
                      setAccountFeedback({ type: "", message: "" });
                    }
                  }}
                  className="hidden"
                />
                {selectedFile && (
                  <Button
                    variant="primary"
                    className="mt-3"
                    onClick={handleProfilePhotoUpload}
                  >
                    Save New Photo
                  </Button>
                )}
              </div>

              {/* Info Summary */}
              <div className="space-y-4 text-sm text-gray-700">
                {[
                  { label: "Name", value: user?.full_name },
                  { label: "Email", value: user?.email },
                  {
                    label: "Date of Birth",
                    value: user?.dob || "Not Provided",
                  },
                  { label: "Total Conversations", value: chats.length },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-gray-200 pb-2"
                  >
                    <div className="text-gray-400 font-semibold tracking-wide text-md uppercase mb-2">
                      {item.label}
                    </div>
                    <div className="text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "Security" && (
            <div className="space-y-4">
              <H3 className="mb-8 text-center">Change Password</H3>
              {securityFeedback.message && (
                <Alert
                  variant={securityFeedback.type}
                  dismissible
                  onDismiss={() =>
                    setSecurityFeedback({ type: "", message: "" })
                  }
                  className="mb-4"
                >
                  {securityFeedback.message}
                </Alert>
              )}
              <PasswordInput
                label="Current Password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                required
              />
              <PasswordInput
                label="New Password"
                value={newPwd}
                onChange={(e) => {
                  setNewPwd(e.target.value);
                  setShowStrength(!!e.target.value);
                }}
              />
              {showStrength && <PasswordStrengthMeter password={newPwd} />}
              <PasswordInput
                label="Confirm New Password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                error={matchError ? "Passwords do not match" : ""}
              />
              <Button variant="primary" onClick={handlePasswordSave}>
                Change Password
              </Button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "Settings" && (
            <div className="space-y-4">
              <H3 className="mb-8 text-center">General Prompt</H3>
              {settingsFeedback.message && (
                <Alert
                  variant={settingsFeedback.type}
                  dismissible
                  onDismiss={() =>
                    setSettingsFeedback({ type: "", message: "" })
                  }
                  className="mb-4"
                >
                  {settingsFeedback.message}
                </Alert>
              )}
              <textarea
                className="w-full p-2 border rounded text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-400"
                rows={5}
                value={generalPrompt}
                onChange={(e) => setGeneralPrompt(e.target.value)}
              />
              <Button variant="primary" onClick={handlePromptSave}>
                Save Prompt
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SettingsModal;
