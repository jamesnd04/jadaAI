import Header from "@/components/chat/header";
import ChatContainer from "@/components/chat/chat-container";
import { ChatHistory } from "@/types/chat";

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
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Header />
      <ChatContainer initialChatHistory={sampleChatHistory} />
    </div>
  );
}
