import { detectUserIntention } from "@/modules/intention";
import {
  respondToHappyMessage,
  respondToHostileMessage,
} from "@/modules/response";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const intention = await detectUserIntention(messages);
    const response =
      intention === "happy"
        ? await respondToHappyMessage(messages)
        : await respondToHostileMessage();
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
