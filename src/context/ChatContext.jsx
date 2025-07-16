import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  fetchConversations,
  createConversation,
  updateConversation,
  deleteConversation,
  fetchMessages,
  sendPrompt
} from '../lib/api';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  // Fetch chats on mount
  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await fetchConversations();
        setChats(res.data || []);
      } catch (err) {
        console.error("Failed to load conversations", err);
      }
    };
    loadChats();
  }, []);

  const createNewChat = async () => {
    try {
      const res = await createConversation("Untitled Chat");
      const newChat = res.data;
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChat.id);
      setMessages([]);
    } catch (err) {
      console.error("Failed to create conversation", err);
    }
  };

  const selectChat = async (chatId) => {
    setActiveChatId(chatId);
    try {
      const res = await fetchMessages(chatId);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to load messages", err);
      setMessages([]);
    }
  };

  const renameChat = async (chatId, newTitle) => {
    try {
      await updateConversation(chatId, newTitle);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, title: newTitle } : chat
        )
      );
    } catch (err) {
      console.error("Failed to rename conversation", err);
    }
  };

  const deleteChatById = async (chatId) => {
    try {
      await deleteConversation(chatId);
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));
      if (activeChatId === chatId) {
        setActiveChatId(null);
        setMessages([]);
      }
    } catch (err) {
      console.error("Failed to delete conversation", err);
    }
  };

  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await sendPrompt(activeChatId, text);
      const aiMsg = res.data?.response;
      if (aiMsg) {
        setMessages((prev) => [...prev, { role: 'ai', content: aiMsg }]);
      }
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChatId,
        messages,
        createNewChat,
        selectChat,
        renameChat,
        deleteChat: deleteChatById,
        sendMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
