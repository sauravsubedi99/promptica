import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Copy, Check } from "lucide-react";
import clsx from "clsx";
import { useChat } from "../../context/ChatContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatBubble = ({ message }) => {
  // Prevent rendering if message is missing or invalid
  if (!message || typeof message.content !== "string") return null;

  const isUser = message.role === "user";
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [copied, setCopied] = useState(false);
  const { activeChatId } = useChat();

  // Copy text handler
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Like / Dislike
  const handleLike = () => {
    setLiked(true);
    setDisliked(false);
    // Optionally send feedback to backend
    // sendFeedback(activeChatId, message.content, 'like');
  };

  const handleDislike = () => {
    setLiked(false);
    setDisliked(true);
    // sendFeedback(activeChatId, message.content, 'dislike');
  };

  // Timestamp formatter
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Slide-in animation on mount
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={clsx(
        "max-w-3xl px-4 py-3 rounded-lg shadow-sm whitespace-pre-wrap break-words transition-all duration-300 transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        isUser
          ? "ml-auto bg-[var(--color-primary)] text-white"
          : "mr-auto bg-white text-gray-900"
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="prose prose-sm max-w-none">{children}</p>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 text-pink-600 px-1 py-0.5 rounded">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-white text-sm rounded p-3 overflow-x-auto my-2">
              {children}
            </pre>
          ),
          li: ({ children }) => <li className="ml-4 list-disc">{children}</li>,
        }}
      >
        {message.content}
      </ReactMarkdown>

      <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
        {!isUser && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              title="Like"
              className={liked ? "text-blue-500" : "hover:text-blue-500"}
              aria-label="Like message"
            >
              <ThumbsUp size={16} />
            </button>
            <button
              onClick={handleDislike}
              title="Dislike"
              className={disliked ? "text-red-500" : "hover:text-red-500"}
              aria-label="Dislike message"
            >
              <ThumbsDown size={16} />
            </button>
            <button
              onClick={handleCopy}
              title="Copy to clipboard"
              className={copied ? "text-green-500" : "hover:text-green-500"}
              aria-label="Copy message"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        )}
        {message.created_at && (
          <span>{formatTimestamp(message.created_at)}</span>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
