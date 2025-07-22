import React, { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import ChatInputBox from "./ChatInputBox";
import { useChat } from "../../context/ChatContext";

const ChatWindow = () => {
  const bottomRef = useRef(null);
  const { messages, activeChatId, loadingMessages, sendingMessage } = useChat();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChatId, sendingMessage]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-gray-100">
        {loadingMessages ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Loading messages...
          </div>
        ) : !activeChatId ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-lg italic">
            What are you working on today?
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg} />
            ))}

            {/* AI is typing... */}
            {sendingMessage && (
              <div className="text-sm text-gray-500 italic animate-pulse px-4">
                AI is typing...
              </div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>
      <ChatInputBox />
    </div>
  );
};

export default ChatWindow;
