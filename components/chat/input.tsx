"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ArrowUp } from "lucide-react";

const handleSubmit = () => {};

export default async function ChatInput() {
  return (
    <div className="flex fixed-bottom-0 w-full items-center justify-center h-12 gap-2 ">
      <Input
        className="flex flex-row rounded-3xl bg-grey w-96 h-12"
        placeholder="What do you need help with?"
      />

      <Button onClick={handleSubmit} className="rounded-full w-8 h-8">
        <ArrowUp size={48} />
      </Button>
    </div>
  );
}
