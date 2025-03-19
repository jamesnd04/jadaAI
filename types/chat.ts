import { z } from "zod";

export const chatSchema = z.object({
  role: z.enum(["user", "assistant"]),
  message: z.string(),
});

export type ChatSchema = z.infer<typeof chatSchema>;

export const UserMessageSchema = z.object({
  role: z.literal("user"),
  message: z.string(),
});

export type UserMessage = z.infer<typeof UserMessageSchema>;

export const AssistantMessageSchema = z.object({
  role: z.literal("assistant"),
  message: z.string(),
});

export type AssistantMessage = z.infer<typeof AssistantMessageSchema>;

export const ChatHistorySchema = z.array(
  z.union([UserMessageSchema, AssistantMessageSchema])
);

export type ChatHistory = z.infer<typeof ChatHistorySchema>;

export const ChatIntentionSchema = z.enum(["general", "idea"]);

export type ChatIntention = z.infer<typeof ChatIntentionSchema>;
