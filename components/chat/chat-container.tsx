"use client";

import { ChatMessages } from "@/components/chat/messages";
import ChatInput from "@/components/chat/input";
import { AssistantMessage, ChatHistory } from "@/types/chat";
import { useState } from "react";

export default function ChatContainer({
  initialChatHistory,
}: {
  initialChatHistory: ChatHistory;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] =
    useState<ChatHistory>(initialChatHistory);

  async function handleMessageSend(messages: ChatHistory): Promise<void> {
    setChatHistory(messages);
    setIsLoading(true);
    const messageResponse = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
    });
    const botResponse: AssistantMessage = await messageResponse.json();
    setIsLoading(false);
    setChatHistory([...messages, botResponse]);
  }

  return (
    <div className="pt-2 flex flex-col h-full w-[80%]">
      <ChatMessages messages={chatHistory} />
      <ChatInput messages={chatHistory} onMessageSend={handleMessageSend} />
    </div>
  );
}
