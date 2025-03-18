import Header from "@/components/chat/header";
import ChatInput from "@/components/chat/input";
import { ChatMessages } from "@/components/chat/messages";
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
      "Lauryn is passionate about technology and design. She enjoys creating user-friendly interfaces and working on innovative projects.",
  },
];

export default function Chat() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Header />
      <div className="pt-2 flex flex-col h-full w-[80%]">
        <ChatMessages messages={sampleChatHistory} />
        <ChatInput />
      </div>
    </div>
  );
}
