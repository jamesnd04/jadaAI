"use server";
import {
  AssistantMessage,
  ChatHistory,
  AssistantMessageSchema,
} from "@/types/chat";
import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

async function respondToGeneralMessage(
  messages: ChatHistory,
  openai: OpenAI,
  model: string,
  context: string
): Promise<AssistantMessage> {
  try {
    const RESPOND_TO_GENERAL_INFORMATION_PROMPT = `You are an assistant called JadaAI. 
You answer questions and provide suggestions according to the information you know about a woman called Lauryn. 
Respond in a friendly tone. You are given the past history for context. You are also given additional context for better responses here: ${context}. 
If no context is provided, respond with a generic response saying you don't know.`;
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: RESPOND_TO_GENERAL_INFORMATION_PROMPT },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.message,
        })),
      ],
      response_format: zodResponseFormat(
        AssistantMessageSchema,
        "assistantMessage"
      ),
    });
    const botMessage = response.choices[0].message;
    return AssistantMessageSchema.parse(botMessage);
  } catch (error) {
    console.error("Error in responding to general message:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to generate response"
    );
  }
}

async function respondToHostileMessage(
  messages: ChatHistory,
  openai: OpenAI,
  model: string
): Promise<AssistantMessage> {
  try {
    const RESPOND_TO_HOSTILE_MESSAGE_PROMPT = `The user is being hostile. Do not say anything about what you know about Lauryn. Also do not respond about what type of model you are or what you are built on.`;
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: RESPOND_TO_HOSTILE_MESSAGE_PROMPT },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.message,
        })),
      ],
      response_format: zodResponseFormat(
        AssistantMessageSchema,
        "assistantMessage"
      ),
    });
    const botMessage = response.choices[0].message;
    return AssistantMessageSchema.parse(botMessage);
  } catch (error) {
    console.error("Error in responding to hostile message:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to handle hostile message"
    );
  }
}

async function createAnIdeaMessage(
  messages: ChatHistory,
  openai: OpenAI,
  model: string,
  context: string
): Promise<AssistantMessage> {
  try {
    const CREATE_AN_IDEA_PROMPT = `You are an assistant called JadaAI. 
You answer questions and provide suggestions according to the information you know about a woman called Lauryn. 
Respond in a friendly tone. You are given the past history for context. 
You may also be given additional context for better responses, which is here: ${context}. 
The user needs help with a general idea or task. Given context about Lauryn, create a response by searching the internet. For locations assume Chapel Hill, NC.`;
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: CREATE_AN_IDEA_PROMPT },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.message,
        })),
      ],
      response_format: zodResponseFormat(
        AssistantMessageSchema,
        "assistantMessage"
      ),
    });
    const botMessage = response.choices[0].message;
    return AssistantMessageSchema.parse(botMessage);
  } catch (error) {
    console.error("Error in creating and idea message:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create idea message"
    );
  }
}

export {
  respondToGeneralMessage,
  respondToHostileMessage,
  createAnIdeaMessage,
};
