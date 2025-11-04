"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAI } from "./useAI";
import type { AIResponseType } from "@/app/(site)/chat/useAI.ts";
import { useRouter } from "next/navigation";

type GeneratedPages = Record<string, AIResponseType>;

type RhuangrContextType = {
  isLoading: boolean;
  error: string | null;
  latestPageSlug: string | null;
  generatedPages: GeneratedPages;
  submitPrompt: (prompt: string) => Promise<void>;
  getGeneratedPage: (slug: string) => AIResponseType | null;
};

type LoadingContextValue = {
  getIsLoading: () => boolean;
};

const RhuangrContext = createContext<RhuangrContextType | undefined>(undefined);
const LoadingContext = createContext<LoadingContextValue | null>(null);

const slugifyHeading = (heading: string) =>
  heading
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w-]/g, "");

export function RhuangrContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, submitPrompt: submitPromptInternal } = useAI();
  const isLoadingRef = useRef(isLoading);
  const [generatedPages, setGeneratedPages] = useState<GeneratedPages>({});
  const [latestPageSlug, setLatestPageSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // updating balatro background when loading
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);
  const loadingValue = useMemo<LoadingContextValue>(
    () => ({
      getIsLoading: () => isLoadingRef.current,
    }),
    []
  );

  const submitPrompt = useCallback(
    async (prompt: string) => {
      try {
        router.push("/loading");
        const result = await submitPromptInternal(prompt);
        if (!result) return;
        const slug = slugifyHeading(result.heading);
        setLatestPageSlug(slug);
        setGeneratedPages((prev) => ({ ...prev, [slug]: result }));
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      }
    },
    [submitPromptInternal]
  );

  const getGeneratedPage = useCallback(
    (slug: string) => generatedPages[slug] ?? null,
    [generatedPages]
  );

  const contextValue = useMemo<RhuangrContextType>(
    () => ({
      isLoading,
      error,
      submitPrompt,
      generatedPages,
      latestPageSlug,
      getGeneratedPage,
    }),
    [
      error,
      generatedPages,
      getGeneratedPage,
      isLoading,
      latestPageSlug,
      submitPrompt,
    ]
  );

  return (
    <LoadingContext.Provider value={loadingValue}>
      <RhuangrContext.Provider value={contextValue}>
        {children}
      </RhuangrContext.Provider>
    </LoadingContext.Provider>
  );
}

export function useRhuangrContext() {
  const context = useContext(RhuangrContext);
  if (!context) {
    throw new Error(
      "useRhuangrContext must be used within the RhuangrContextProvider"
    );
  }
  return context;
}

export function useLoadingContext() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error(
      "useLoadingContext must be used within the RhuangrContextProvider"
    );
  }
  return context;
}
