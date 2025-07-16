// components/chat/ChatInputBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';
import TextArea from '../ui/Input/TextArea';
import Button from '../ui/Button/Button';
import { useChat } from '../../context/ChatContext';

const ChatInputBox = () => {
  const { sendMessage, activeChatId } = useChat();
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(1);
  const textAreaRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const lines = value.split('\n').length;
    setRows(Math.min(lines, 6));
  };

  const handleSend = () => {
    if (!input.trim() || !activeChatId) return;
    sendMessage(input.trim());
    setInput('');
    setRows(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="border-t px-6 py-4 bg-[var(--color-surface)]">
      <div className="flex items-end gap-2">
        <TextArea
          ref={textAreaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={rows}
          resize="none"
          className="flex-1"
        />
        <Button
          variant="primary"
          size="lg"
          onClick={handleSend}
          disabled={!input.trim() || !activeChatId}
          rightIcon={<SendHorizonal className="w-4 h-4" />}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInputBox;
