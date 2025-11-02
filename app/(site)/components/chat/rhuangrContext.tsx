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
import { useAI, type AIResponse } from "./useAI";

export interface LLMParagraph {
  subheading: string;
  content: string;
}

export interface LLMOutputType {
  heading: string;
  paragraphs: LLMParagraph[];
}

type GeneratedPages = Record<string, LLMOutputType>;

type RhuangrContextType = {
  isLoading: boolean;
  error: string | null;
  latestPageSlug: string | null;
  generatedPages: GeneratedPages;
  submitPrompt: (prompt: string) => Promise<void>;
  getGeneratedPage: (slug: string) => LLMOutputType | null;
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
    .replace(" ", "_");

export function RhuangrContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, error, submitPrompt: submitPromptInternal } = useAI();
  const isLoadingRef = useRef(isLoading);
  const [generatedPages, setGeneratedPages] = useState<GeneratedPages>({});
  const [latestPageSlug, setLatestPageSlug] = useState<string | null>(null);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const handleOutput = useCallback((result: AIResponse | null) => {
    if (!result) {
      return;
    }

    const parsed = JSON.parse(result.response) as LLMOutputType;
    if (!parsed.heading) {
      throw new Error("Parsed output is missing heading, AI is being stupid.");
    }
    const slug = slugifyHeading(parsed.heading);
    setGeneratedPages((prev) => ({ ...prev, [slug]: parsed }));
    setLatestPageSlug(slug);
  }, []);

  const submitPrompt = useCallback(
    async (prompt: string) => {
      const result = await submitPromptInternal(prompt);
      handleOutput(result ?? null);
    },
    [handleOutput, submitPromptInternal]
  );

  const loadingValue = useMemo<LoadingContextValue>(
    () => ({
      getIsLoading: () => isLoadingRef.current,
    }),
    []
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
