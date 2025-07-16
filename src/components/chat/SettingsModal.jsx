// components/chat/SettingsModal.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Input from '../ui/Input/Input';
import PasswordInput from '../ui/Input/PasswordInput';
import Button from '../ui/Button/Button';

const SettingsModal = ({ isOpen, onClose, onSave }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Account Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6">
          {/* Profile Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0 file:text-sm file:font-semibold
                         file:bg-[var(--color-primary)] file:text-white hover:file:bg-[var(--color-primary-light)]"
            />
          </div>

          {/* Password Change */}
          <div className="space-y-4">
            <PasswordInput label="Current Password" placeholder="Enter current password" />
            <PasswordInput label="New Password" placeholder="Enter new password" />
            <PasswordInput label="Confirm New Password" placeholder="Re-enter new password" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SettingsModal;
