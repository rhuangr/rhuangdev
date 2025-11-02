"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { useRhuangrContext } from "@/app/(site)/chat/rhuangrContext";
import { cn } from "@/app/lib/utils";

interface RHUANGGPTProps {
  open: boolean;
}

export function RHUANGGPT({ open }: RHUANGGPTProps) {
  return (
    open && (
      <div className="flex items-center space-x-3">
        <AITextArea />
      </div>
    )
  );
}

function AITextArea() {
  const { submitPrompt } = useRhuangrContext();

  const [prompt, setPrompt] = useState("");
  const { isLoading } = useRhuangrContext();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      return;
    }

    try {
      await submitPrompt(prompt);
    } finally {
      setPrompt("");
    }
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await handleSubmit();
    }
  };

  return (
    <div className="relative h-10 w-full md:w-4/5">
      <input
        value={prompt}
        disabled={isLoading}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me a question..."
        className="relative text-[13px] top-1/2 -translate-y-1/2 bg-foreground/80 text-black backdrop-blur-md shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-black/40  h-10 w-full rounded-lg  border border-red-50/10 pr-10 pl-5"
      />

      <button
        type="submit"
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center " +
            "size-6.5 rounded-full transition-colors " +
            "disabled:pointer-events-none disabled:opacity-50 shadow-xs focus-visible:ring-2 focus-visible:ring-indigo-300"
        )}
        disabled={prompt.trim() === "" || isLoading}
        onClick={handleSubmit}
      >
        <ArrowUp size={14} strokeWidth={2.5} className="text-black" />
        <span className="sr-only">Send</span>
      </button>
    </div>
  );
}
