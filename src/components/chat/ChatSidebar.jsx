// components/chat/ChatSidebar.jsx
import React, { useState, useEffect } from 'react';
import SidebarItem from './SidebarItem';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useChat } from '../../context/ChatContext';

const ChatSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    chats,
    activeChatId,
    createNewChat,
    selectChat,
    renameChat,
    deleteChat
  } = useChat();

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored) setCollapsed(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside
      className={clsx(
        'h-full border-r border-gray-200 bg-[var(--color-surface)] transition-all duration-300 flex flex-col shadow-sm',
        collapsed ? 'w-[72px]' : 'w-[280px]'
      )}
    >
      {/* Header with logo and collapse */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <img
          src="/logo.svg"
          alt="Promptica"
          className={clsx('h-6 transition-all', collapsed && 'hidden')}
        />
        <button
          onClick={toggleSidebar}
          className="p-1 rounded hover:bg-gray-200"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <button
          onClick={createNewChat}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium px-3 py-2 rounded-md bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)]"
        >
          <Plus size={16} />
          {!collapsed && 'New Chat'}
        </button>
      </div>

      {/* Chat list */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {chats.map((chat) => (
          <SidebarItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onDelete={() => deleteChat(chat.id)}
            onRename={(newTitle) => renameChat(chat.id, newTitle)}
            collapsed={collapsed}
            onSelect={() => selectChat(chat.id)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default ChatSidebar;
