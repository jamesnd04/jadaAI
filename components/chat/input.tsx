"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowUp } from "lucide-react";
import { ChatHistory } from "@/types/chat";
import {
  generatePossibleAnswer,
  findPossibleAnswersInKnowledgeBase,
  determineKeyPersonalFactors,
} from "@/actions/chat";

interface ChatInputProps {
  messages: ChatHistory;
  onMessageSend?: (messages: ChatHistory) => void;
}

export default function ChatInput({ messages, onMessageSend }: ChatInputProps) {
  return (
    <div className="flex fixed-bottom-0 w-full items-center justify-center h-12 gap-2 ">
      <Input
        className="flex flex-row rounded-3xl bg-grey w-full h-12"
        placeholder="What do you need help with?"
      />

      <Button className="rounded-full w-8 h-8">
        <ArrowUp size={48} />
      </Button>
    </div>
  );
}
