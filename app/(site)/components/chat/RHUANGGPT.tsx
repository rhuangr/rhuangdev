"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRhuangrContext } from "@/app/(site)/components/chat/rhuangrContext";

interface RHUANGGPTProps {
  className?: string;
}

export function RHUANGGPT({ className }: RHUANGGPTProps) {
  return (
    <div className={`w-full ${className ?? ""}`}>
      <AITextArea />
    </div>
  );
}

function AITextArea() {
  const { submitPrompt } = useRhuangrContext();
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const pathname = usePathname();
  const { isLoading, latestPageSlug } = useRhuangrContext();

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

  useEffect(() => {
    if (!isLoading && latestPageSlug && pathname === "/loading") {
      router.replace(`/${latestPageSlug}`);
    }
  }, [isLoading, latestPageSlug, pathname, router]);

  return (
    <div className="group relative top-1/2 h-11 w-lg w-md max-w-[95vh] mx-auto transition-all duration-700 ease-in-out">
      <input
        value={prompt}
        disabled={isLoading}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me a question..."
        className="backdrop-blur-md shadow-xl focus:outline-none focus:ring-1 ring-indigo-200 absolute placeholder-muted-foreground text-subheading h-11 w-full rounded-lg bg-gray-100/10 border-1 border-red-50/10 pr-14 pl-7"
      />

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-body font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/80 dark:border-input dark:hover:bg-input/50 size-8 absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-fushia-500/80"
        disabled={prompt.trim() === "" || isLoading}
        onClick={handleSubmit}
      >
        <ArrowUp />
        <span className="sr-only">Send</span>
      </button>
    </div>
  );
}
