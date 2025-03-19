"use server";
import { OpenAI } from "openai";
import { ChatHistory } from "@/types/chat";
import { Pinecone } from "@pinecone-database/pinecone";

export async function generatePossibleAnswer(
  openai: OpenAI,
  messages: ChatHistory,
  model: string,
  context: string
): Promise<string> {
  const SYSTEM_PROMPT = `You have been provided a conversation history between a user and an assistant. Given the last message from the user, generate a possible answer to the user's message. Here may be additional context: ${context}`;
  const response = await openai.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.message,
      })),
    ],
  });
  const botMessage = response.choices[0].message;
  if (botMessage.content) {
    return botMessage.content;
  } else {
    throw new Error("No hypothetical answer generated");
  }
}

export async function findPossibleAnswersInKnowledgeBase(
  pc: Pinecone,
  indexName: string,
  query: string
): Promise<string> {
  try {
    const namespace = pc.index(indexName).namespace("");
    const matches = await namespace.searchRecords({
      query: {
        topK: 3,
        inputs: { text: query },
      },
      fields: ["personal"],
      rerank: {
        model: "bge-reranker-v2-m3",
        topN: 2,
        rankFields: ["personal"],
      },
    });

    if (matches.result.hits.length === 0) {
      return "";
    }

    const responseHits = matches.result.hits.map(
      (hit) => (hit.fields as { chunk_text: string }).chunk_text
    );
    const resultingContext: string = responseHits.join("\n");

    return resultingContext;
  } catch (error) {
    console.error(
      "Error in finding possible answers in knowledge base:",
      error
    );
    throw new Error("Issue finding possible answers in knowledge base");
  }
}

export async function determineKeyPersonalFactors(
  openai: OpenAI,
  model: string,
  messages: ChatHistory
): Promise<string> {
  try {
    const SYSTEM_PROMPT = `You are an assistant called JadaAI.
   The user needs help generating an idea or a concept. 
   Based on the request, generate key topics that are relevant to the user's request. 
   An example could be 'date idea', 'gift idea', 'Indian restaraunts'. 
   If you can't find any key topics, respond with an empty string.`;
    const userMessage = messages[messages.length - 1].message;

    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.message,
        })),
        { role: "user", content: userMessage },
      ],
    });
    const botMessage = response.choices[0].message;
    if (botMessage.content) {
      return botMessage.content;
    } else {
      throw new Error("Issue generating key personal factors");
    }
  } catch (error) {
    console.error("Error in determining key personal factors:", error);
    throw new Error("Issue determining key personal factors");
  }
}
