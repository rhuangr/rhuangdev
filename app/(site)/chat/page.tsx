"use client";

import { RHUANGGPT } from "./RHUANGGPT";
import { BotMessageSquare, MessageCircleMore } from "lucide-react";
import { useRhuangrContext } from "../chat/rhuangrContext";
import { HighlightedText } from "../components/shared/HighlightedText";
import { Appear } from "../components/shared/HeadingIcon";
export default function ChatPage() {
  return (
    <div className="space-y-6">
      <h1 className="">
        AI Chat{" "}
        <Appear className="p-1">
          <BotMessageSquare size={28} />
        </Appear>{" "}
      </h1>

      <div className="relative w-full">
        <RHUANGGPT open />
      </div>

      <section>
        {" "}
        <h2>some examples</h2>
        <ul className="space-y-4 list-disc list-inside">
          <li>
            <PromptButton prompt="What did Richard do at Shopify?" />
          </li>
          <li>
            <PromptButton prompt="Tell me a fun fact about Richard?" />
          </li>
          <li>
            <PromptButton prompt="What are Richard's hobbies?" />
          </li>
        </ul>
      </section>
      <div className="pt-4 text-xs italic text-muted-foreground">
        Take its answers with a grain of salt...
      </div>
    </div>
  );
}

type PromptButtonProps = {
  prompt: string;
  className?: string;
};

function PromptButton({ prompt, className = "" }: PromptButtonProps) {
  const { submitPrompt } = useRhuangrContext();
  const highlightBtn =
    "flex items-center group transition-colors transition-transform duration-300 ease-in-out hover:translate-x-1 cursor-pointer";

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{prompt}</span>

      <button
        type="button"
        className={highlightBtn}
        onClick={() => submitPrompt(prompt)}
        aria-label={`Ask: ${prompt}`}
      >
        <HighlightedText className="py-0.5 bg-foreground">
          Ask
          <MessageCircleMore
            size={16}
            className="ml-2 inline-block transition-transform group-hover:scale-120 duration-300"
          />
        </HighlightedText>
      </button>
    </span>
  );
}
