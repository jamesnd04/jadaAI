import { AssistantMessage, ChatHistory } from "@/types/chat";

export async function sendMessage(
  messages: ChatHistory
): Promise<AssistantMessage> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const data = await response.json();
  return data;
}
