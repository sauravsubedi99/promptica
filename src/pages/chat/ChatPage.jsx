// src/pages/chat/ChatPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatLayout from '../../components/chat/ChatLayout';
import { ChatProvider } from '../../context/ChatContext';

const ChatPage = () => {
  const { id: chatId } = useParams();
  return (
    <ChatProvider chatIdFromRoute={chatId}>
      <ChatLayout />
    </ChatProvider>
  );
};

export default ChatPage;
