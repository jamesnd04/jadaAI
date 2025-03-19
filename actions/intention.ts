"use server";
import { UserMessage, ChatIntention, ChatIntentionSchema } from "@/types/chat";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

async function detectHarmfulUserIntention(
  message: UserMessage,
  openai: OpenAI
): Promise<boolean> {
  const response = await openai.moderations.create({
    model: "omni-moderation-latest",
    input: message.message,
  });
  const data = response.results[0].flagged;
  return data;
}

async function detectMessageIntention(
  message: UserMessage,
  openai: OpenAI,
  model: string
): Promise<ChatIntention> {
  const response = await openai.chat.completions.create({
    model: model,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that can detect the intention of a message. Detect the intention of the message and return the intention.",
      },
      {
        role: "user",
        content: message.message,
      },
    ],
    response_format: zodResponseFormat(ChatIntentionSchema, "chatIntention"),
  });
  const botMessage = response.choices[0].message;
  const parsedMessage = ChatIntentionSchema.parse(botMessage);
  return parsedMessage;
}
export { detectHarmfulUserIntention, detectMessageIntention };
