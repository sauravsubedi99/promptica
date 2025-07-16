// components/chat/SidebarItem.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Pencil, MessageCircle } from 'lucide-react';
import clsx from 'clsx';

const SidebarItem = ({ chat, isActive, onRename, onDelete, collapsed, onSelect }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [inputValue, setInputValue] = useState(chat.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRenaming]);

  const handleRename = () => {
    if (inputValue.trim()) {
      onRename(inputValue.trim());
      setIsRenaming(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRename();
    if (e.key === 'Escape') {
      setIsRenaming(false);
      setInputValue(chat.title);
    }
  };

  return (
    <div
      onClick={() => onSelect(chat.id)}
      className={clsx(
        'group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors',
        isActive ? 'bg-[var(--color-primary-light)] text-white' : 'hover:bg-gray-100'
      )}
      title={collapsed ? chat.title : undefined}
    >
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        <MessageCircle size={16} className="text-gray-500 shrink-0" />

        {isRenaming ? (
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleRename}
            className="w-full text-sm bg-transparent border-b border-gray-300 outline-none"
          />
        ) : (
          <span className="truncate text-sm text-gray-800">
            {chat.title}
          </span>
        )}
      </div>

      {!collapsed && !isRenaming && (
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsRenaming(true);
            }}
            className="text-gray-400 hover:text-blue-500"
            title="Rename"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-gray-400 hover:text-red-500"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
