// components/chat/ChatLayout.jsx
import React from 'react';
import ChatSidebar from './ChatSidebar';
import TopNav from './TopNav';
import ChatWindow from './ChatWindow';

const ChatLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-surface text-[var(--color-text)]">
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatLayout;
