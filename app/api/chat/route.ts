"use server";
import {
  detectHarmfulUserIntention,
  detectMessageIntention,
} from "@/actions/intention";
import {
  respondToGeneralMessage,
  createAnIdeaMessage,
  respondToHostileMessage,
} from "@/actions/response";
import {
  determineKeyPersonalFactors,
  generatePossibleAnswer,
  findPossibleAnswersInKnowledgeBase,
} from "@/actions/chat";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const model = process.env.OPENAI_MODEL as string;
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string,
  });
  const indexName = process.env.PINECONE_INDEX_NAME as string;

  try {
    const { messages } = await req.json();
    const harmfulIntention = await detectHarmfulUserIntention(messages, openai);
    if (harmfulIntention) {
      const response = await respondToHostileMessage(messages, openai, model);
      return NextResponse.json(response);
    } else {
      const messageIntention = await detectMessageIntention(
        messages,
        openai,
        model
      );
      const personalContext = await determineKeyPersonalFactors(
        openai,
        model,
        messages
      );
      const additionalContext = await generatePossibleAnswer(
        openai,
        messages,
        model,
        personalContext
      );
      const improvedContextForModel = await findPossibleAnswersInKnowledgeBase(
        pc,
        indexName,
        additionalContext
      );
      if (messageIntention === "general") {
        const response = await respondToGeneralMessage(
          messages,
          openai,
          model,
          improvedContextForModel
        );
        return NextResponse.json(response);
      } else if (messageIntention === "idea") {
        const response = await createAnIdeaMessage(
          messages,
          openai,
          model,
          improvedContextForModel
        );
        return NextResponse.json(response);
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
