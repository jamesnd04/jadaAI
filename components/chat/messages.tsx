import { ChatHistory } from "@/types/chat";
import { motion } from "framer-motion";

interface ChatMessagesProps {
  messages: ChatHistory;
}

interface MessageProps {
  message: string;
}

const UserMessage = ({ message }: MessageProps) => (
  <div className="flex justify-end mb-4">
    <div className="bg-gray-100 p-4 rounded-3xl max-w-[70%]">{message}</div>
  </div>
);

const AssistantMessage = ({ message }: MessageProps) => (
  <div className="flex justify-start mb-4">
    <div className="bg-blue-500 text-white p-4 rounded-3xl max-w-[70%]">
      {message}
    </div>
  </div>
);

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="space-y-4 h-[80%] overflow-y-auto w-full px-4">
      {messages.map((message, index) =>
        message.role === "user" ? (
          <motion.div
            transition={{ ease: "easeInOut", duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <UserMessage key={index} message={message.message} />
          </motion.div>
        ) : (
          <motion.div
            transition={{ ease: "easeInOut", duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <AssistantMessage key={index} message={message.message} />
          </motion.div>
        )
      )}
    </div>
  );
}
