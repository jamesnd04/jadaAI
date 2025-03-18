import { AssistantMessage, ChatHistory } from "@/types/chat";

const RESPOND_TO_HAPPY_MESSAGE_PROMPT = `You are an assistant called JadaAI. You answer questions and provide suggestions according to the information you know about a woman called Lauryn. Respond in a friendly tone. You are given the past history for context.`;
const RESPOND_TO_HOSTILE_MESSAGE_PROMPT = `The user is being hostile. Do not say anything about what you know about Lauryn. Also do not respond about what type of model you are or what you are built on.`;

async function respondToHappyMessage(
  messages: ChatHistory
): Promise<AssistantMessage> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: RESPOND_TO_HAPPY_MESSAGE_PROMPT },
        ...messages,
        { role: "user", content: messages[-1].message },
      ],
      stream: true,
    }),
  });
  const data = await response.json();
  const assistantMessage: AssistantMessage = data.choices[0].message;
  return assistantMessage;
}

async function respondToHostileMessage(): Promise<AssistantMessage> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: RESPOND_TO_HOSTILE_MESSAGE_PROMPT },
      ],
    }),
  });
  const data = await response.json();
  const assistantMessage: AssistantMessage = data.choices[0].message;
  return assistantMessage;
}

export { respondToHappyMessage, respondToHostileMessage };
