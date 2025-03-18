import { UserMessage, ChatIntention } from "@/types/chat";

async function detectUserIntention(
  message: UserMessage
): Promise<ChatIntention> {
  const response = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message.message }],
    }),
  });
  const data = await response.json();
  if (data.results[0].flagged) {
    return "hostile";
  }
  return "happy";
}

export { detectUserIntention };
