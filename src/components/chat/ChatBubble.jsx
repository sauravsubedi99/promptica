// components/chat/ChatBubble.jsx
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import clsx from 'clsx';

const ChatBubble = ({ message }) => {
  const isUser = message.role === 'user';
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleLike = () => {
    setLiked(true);
    setDisliked(false);
    // TODO: send feedback to backend
  };

  const handleDislike = () => {
    setLiked(false);
    setDisliked(true);
    // TODO: send feedback to backend
  };

  return (
    <div
      className={clsx(
        'max-w-3xl px-4 py-3 rounded-lg shadow-sm whitespace-pre-wrap break-words',
        isUser
          ? 'ml-auto bg-[var(--color-primary)] text-white'
          : 'mr-auto bg-white text-gray-900'
      )}
    >
      <p className="text-sm leading-relaxed">{message.content}</p>

      {!isUser && (
        <div className="flex items-center gap-2 mt-3 text-gray-400 text-xs">
          <button
            onClick={handleLike}
            className={liked ? 'text-blue-500' : 'hover:text-blue-500'}
            title="Like"
          >
            <ThumbsUp size={16} />
          </button>
          <button
            onClick={handleDislike}
            className={disliked ? 'text-red-500' : 'hover:text-red-500'}
            title="Dislike"
          >
            <ThumbsDown size={16} />
          </button>
          <button
            onClick={handleCopy}
            className={copied ? 'text-green-500' : 'hover:text-green-500'}
            title="Copy"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
