import React, { useState, useRef } from 'react';
import { Send, ArrowUpCircle, Rocket } from 'lucide-react';
import TextArea from '../ui/Input/TextArea';
import { useChat } from '../../context/ChatContext';

const ChatInputBox = () => {
  const { sendMessage, sendingMessage } = useChat();
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(4);
  const textAreaRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    const lineCount = value.split('\n').length;
    setRows(Math.min(Math.max(4, lineCount), 7));
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
    setRows(4);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendingMessage) {
      handleSend();
      }
    }
  };

  return (
    <div className="px-4 py-3 bg-gray-100 border-t border-gray-200">
      <div className="relative w-full md:w-3/4 mx-auto">
        <TextArea
          ref={textAreaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={rows}
          resize="vertical"
          className="w-full pr-12 max-h-[200px] overflow-auto"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || sendingMessage}
          className="absolute bottom-2.5 right-3 p-2 rounded-full text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInputBox;
