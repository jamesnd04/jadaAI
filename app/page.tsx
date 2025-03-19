"use client";
import Header from "@/components/chat/header";
import ChatInput from "@/components/chat/input";
import { ChatMessages } from "@/components/chat/messages";
import { ChatHistory } from "@/types/chat";
import { useState } from "react";
import { sendMessage } from "@/utilities/chat";

const sampleChatHistory: ChatHistory = [
  {
    role: "user",
    message: "Hi, can you tell me about Lauryn?",
  },
  {
    role: "assistant",
    message:
      "Hello! I'd be happy to help you learn about Lauryn. What would you like to know specifically?",
  },
  {
    role: "user",
    message: "What are her interests?",
  },
  {
    role: "assistant",
    message:
      "Lauryn is passionate about marketing and design. She enjoys creating great social media content and working on exciting events.",
  },
];

export default function Chat() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] =
    useState<ChatHistory>(sampleChatHistory);

  function handleMessageSend(messages: ChatHistory): void {
    setChatHistory(messages);
    setIsLoading(true);

    sendMessage(messages.slice(-5));
    setIsLoading(false);
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Header />
      <div className="pt-2 flex flex-col h-full w-[80%]">
        <ChatMessages messages={chatHistory} />
        <ChatInput messages={chatHistory} onMessageSend={handleMessageSend} />
      </div>
    </div>
  );
}
