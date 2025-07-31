import React, { useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import ChatBubble from "./ChatBubble";
import ChatInputBox from "./ChatInputBox";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { H1, H5 } from "../ui";
import PromptCard from "./PromptCard";

const prePrompts = [
  {
    id: "ielts_dates",
    icon: "CalendarDays",
    title: "IELTS Dates",
    prompt: "Show me upcoming IELTS exam dates in London, Ontario. Include available slots, test types, and deadlines.",
    backgroundColor: "blue",
  },
  {
    id: "ielts_tips",
    icon: "Lightbulb",
    title: "Prep Tips",
    prompt: "Give me the top 5 preparation tips for scoring above band 7 in IELTS Academic.",
    backgroundColor: "amber",
  },
  {
    id: "ielts_writing_sample",
    icon: "PenLine",
    title: "Writing Sample",
    prompt: "Show me a band 9 sample answer for IELTS Writing Task 2 about climate change.",
    backgroundColor: "green",
  },
  {
    id: "ielts_score_explained",
    icon: "BarChart2",
    title: "Score Breakdown",
    prompt: "Explain how the IELTS band score is calculated for each section: Listening, Reading, Writing, and Speaking.",
    backgroundColor: "violet",
  },
  {
    id: "ielts_vs_toefl",
    icon: "Scales",
    title: "IELTS vs TOEFL",
    prompt: "Compare IELTS and TOEFL. Which is better for studying in Canada?",
    backgroundColor: "rose",
  },
  {
    id: "ielts_vocabulary",
    icon: "BookOpen",
    title: "Vocab Boost",
    prompt: "Give me a list of high-scoring vocabulary words for IELTS Writing Task 1 with examples.",
    backgroundColor: "orange",
  },
];

const ChatWindow = () => {
  const bottomRef = useRef(null);
  const {
    messages,
    activeChatId,
    loadingMessages,
    sendMessage,
    sendingMessage,
  } = useChat();
  const { user } = useAuth();

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
          <div className="h-full flex flex-col items-center justify-center gap-6 text-center text-gray-600">
            <H1 className="mb-4">Hi, {user?.full_name?.split(" ")[0]}</H1>
            <H5 className="mb-8">Whenever you’re ready, I’m here to help</H5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {prePrompts.map((item) => (
                <PromptCard
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  prompt={item.prompt}
                  backgroundColor={item.backgroundColor}
                  onClick={() => sendMessage(item.prompt)}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <ChatBubble key={idx} message={msg} />
            ))}

            {/* AI is typing... */}
            {sendingMessage && (
              <div className="text-sm text-gray-500 italic animate-pulse px-4">
                Promptica is typing...
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
