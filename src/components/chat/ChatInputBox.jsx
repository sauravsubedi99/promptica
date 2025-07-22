import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';
import TextArea from '../ui/Input/TextArea';
import Button from '../ui/Button/Button';
import { useChat } from '../../context/ChatContext';

const ChatInputBox = () => {
  const { sendMessage, activeChatId, sendingMessage } = useChat();
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(4);
  const textAreaRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const lineCount = value.split('\n').length;
    setRows(Math.min(Math.max(4, lineCount), 7)); // min 4, max 7 rows
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
    setRows(4); // reset after send
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
      <div className="flex items-center justify-center">
        <div className="w-3/4 flex items-center gap-2">
          <TextArea
            ref={textAreaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={rows}
            resize="vertical"
            className="flex-1 max-h-[200px] overflow-auto"
          />
          <Button
            variant="primary"
            size="lg"
            onClick={handleSend}
            disabled={!input.trim() || sendingMessage}
            loading={sendingMessage}
            rightIcon={<SendHorizonal className="w-4 h-4" />}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInputBox;
