import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchConversations,
  createConversation,
  updateConversation,
  deleteConversation,
  fetchMessages,
  sendPrompt,
} from "../lib/api";
import { useAuth } from "./AuthContext";

// Sort chats by most recent activity
const sortChatsByRecent = (chatList) => {
  return [...chatList].sort(
    (a, b) =>
      new Date(b.updated_at || b.created_at) -
      new Date(a.updated_at || a.created_at)
  );
};

// Store initial prompt to avoid sending it multiple times
let queuedInitialPrompt = null;
let queuedInitialMessage = null;

const ChatContext = createContext();

export const ChatProvider = ({ children, chatIdFromRoute }) => {
  const { token, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(() => {
    return chatIdFromRoute ? parseInt(chatIdFromRoute, 10) : null;
  });
  const [messages, setMessages] = useState([]);

  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  // Load conversations when token is available and auth is done loading
  useEffect(() => {
    if (authLoading || !token) return;

    const loadChats = async () => {
      setLoadingChats(true);
      try {
        const res = await fetchConversations();
        const list = Array.isArray(res.data) ? res.data : [];
        // console.log("Fetched conversations:", list);

        const mappedList = list.map((chat) => ({
          ...chat,
          title: chat.label || "Untitled",
        }));

        setChats(sortChatsByRecent(mappedList));

        // If the chatId from the URL exists, load its messages
        const match = list.find((c) => c.id === Number(chatIdFromRoute));
        if (chatIdFromRoute) {
          const match = list.find((c) => c.id === Number(chatIdFromRoute));
          if (match) {
            setActiveChatId(match.id);
            await loadMessages(match.id);
          } else {
            console.warn("Invalid chat ID in URL:", chatIdFromRoute);
            setActiveChatId(null);
            setMessages([]);
          }
        } else {
          // No chat ID = show welcome state
          setActiveChatId(null);
          setMessages([]);
        }
      } catch (err) {
        console.error("Failed to load conversations", err);
      } finally {
        setLoadingChats(false);
      }
    };

    loadChats();
  }, [authLoading, token, chatIdFromRoute]);

  // Load messages for the active chat when it changes
  useEffect(() => {
    if (!queuedInitialPrompt || !activeChatId || chats.length === 0) return;

    const prompt = queuedInitialPrompt;
    queuedInitialPrompt = null;

    // Delay a tick to ensure messages aren't cleared after this runs
    setTimeout(() => {
      sendMessage(prompt);
    }, 0);
  }, [activeChatId, chats]);

  // Load messages for a specific chat
  const loadMessages = async (chatId) => {
    setLoadingMessages(true);
    try {
      const res = await fetchMessages(chatId);
      // console.log("Fetched raw messages from API:", res.data);

      // Split query/response pairs into separate user + ai messages
      let mapped = (res.data || []).flatMap((item) => [
        { role: "user", content: item.query },
        { role: "ai", content: item.response },
      ]);

      // Re-inject queued message if this is a new chat
      if (mapped.length === 0 && queuedInitialMessage) {
        mapped = [queuedInitialMessage];
        queuedInitialMessage = null;
      }

      setMessages(mapped);
    } catch (err) {
      console.error("Failed to load messages", err);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Create a new chat and navigate to its URL
  const createNewChat = async () => {
    try {
      const res = await createConversation("New Chat");
      const newChat = res.data;
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChat.id);
      setMessages([]);
      navigate(`/chat/${newChat.id}`);
    } catch (err) {
      console.error("Failed to create conversation", err);
    }
  };

  // Select an existing chat by ID and load messages
  const selectChat = async (chatId) => {
    setActiveChatId(chatId);
    setMessages([]);
    navigate(`/chat/${chatId}`);
    await loadMessages(chatId);
  };

  // Rename a conversation
  const renameChat = async (chatId, newTitle) => {
    try {
      await updateConversation(chatId, newTitle);
      setChats((prev) => {
        const updated = prev.map((chat) =>
          chat.id === chatId
            ? { ...chat, title: newTitle, updated_at: new Date().toISOString() }
            : chat
        );
        return sortChatsByRecent(updated);
      });
    } catch (err) {
      console.error("Failed to rename conversation", err);
    }
  };

  // Delete a conversation
  const deleteChatById = async (chatId) => {
    try {
      await deleteConversation(chatId);
      setChats((prev) => prev.filter((chat) => chat.id !== chatId));
      if (chatId === activeChatId) {
        setActiveChatId(null);
        setMessages([]);
        navigate("/chat");
      }
    } catch (err) {
      console.error("Failed to delete conversation", err);
    }
  };

  const sendMessage = async (text) => {
    if (!text || typeof text !== "string" || !text.trim()) return;

    const userMsg = { role: "user", content: text.trim() };
    setSendingMessage(true);

    try {
      let currentChatId = activeChatId;
      let isNewlyCreated = false;

      // Create chat if none exists yet
      if (!currentChatId) {
        const res = await createConversation("New Chat");
        const newChat = res.data;
        currentChatId = newChat.id;

        queuedInitialPrompt = text;
        queuedInitialMessage = { role: "user", content: text.trim() };

        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(currentChatId);
        navigate(`/chat/${newChat.id}`);
        return; //exit so prompt is sent after nav
      }

      // Add user message immediately
      setMessages((prev) => [...prev, userMsg]);

      // Send to backend
      const res = await sendPrompt(currentChatId, text);
      const aiMsg = res.data?.response;

      if (!aiMsg || typeof aiMsg !== "string" || !aiMsg.trim()) {
        console.warn("Invalid AI response:", aiMsg);
        return;
      }

      // Insert empty AI bubble
      setMessages((prev) => [...prev, { role: "ai", content: "" }]);

      // Stream typing effect
      let index = 0;
      const stream = () => {
        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          const aiText = aiMsg.slice(0, index);
          updated[lastIndex] = { ...updated[lastIndex], content: aiText };
          return updated;
        });

        index++;
        if (index <= aiMsg.length) {
          setTimeout(stream, 15);
        }
      };
      stream();

      // Rename chat if title is still "New Chat"
      const chatObj = chats.find((c) => c.id === currentChatId);
      const chatTitle = chatObj?.title || chatObj?.label || "";
      if (aiMsg && chatTitle.trim().toLowerCase() === "new chat") {
        const cleaned = aiMsg
          .replace(/\n+/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 50);

        const newTitle = cleaned || "New Chat";

        try {
          await updateConversation(currentChatId, newTitle);
          setChats((prev) => {
            const updated = prev.map((chat) =>
              chat.id === currentChatId
                ? {
                    ...chat,
                    title: newTitle,
                    updated_at: new Date().toISOString(),
                  }
                : chat
            );
            return sortChatsByRecent(updated);
          });
        } catch (err) {
          console.error("Failed to update chat title", err);
        }
      }

      // Sort chats by activity
      setChats((prev) => {
        const updated = prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, updated_at: new Date().toISOString() }
            : chat
        );
        return sortChatsByRecent(updated);
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChatId,
        messages,
        loadingChats,
        loadingMessages,
        sendingMessage,
        createNewChat,
        selectChat,
        renameChat,
        deleteChat: deleteChatById,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
