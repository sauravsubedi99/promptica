// components/chat/ChatWindow.jsx
import React, { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInputBox from './ChatInputBox';
import { useChat } from '../../context/ChatContext';

const ChatWindow = () => {
  const bottomRef = useRef(null);
  const { messages, activeChatId } = useChat();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChatId]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Ready when you are.
          </div>
        ) : (
          messages.map((msg, idx) => <ChatBubble key={idx} message={msg} />)
        )}
        <div ref={bottomRef} />
      </div>
      <ChatInputBox />
    </div>
  );
};

export default ChatWindow;
