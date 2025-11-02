'use client';

import React, { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { useAI } from "./useAI";

type rhuangrContextType = {
  isLoading: boolean;
  error: string | null;
  parsedOutput: {
    heading: string;
    paragraphs: { subheading: string; content: string }[];
  } | null;
  submitPrompt: (prompt: string) => Promise<void>;
};

const rhuangrContext = createContext<rhuangrContextType | undefined>(undefined);

//  For changing loading state in Balatro background without rerendering
const LoadingContext = createContext<{ getIsLoading: () => boolean } | null>(
  null,
);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingContext must be used within the RhuangrContextProvider");
  }
  return context;
};

export const RhuangrContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, error, output, submitPrompt } = useAI();
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const parsedOutput = useMemo(() => {
    if (!output) {
      return null;
    }
    return JSON.parse(output.response);
  }, [output]);

  const loadingValue = useMemo(
    () => ({
      getIsLoading: () => isLoadingRef.current,
    }),
    [],
  );

  return (
    <LoadingContext.Provider value={loadingValue}>
      <rhuangrContext.Provider
        value={{ isLoading, error, submitPrompt, parsedOutput }}
      >
        {children}
      </rhuangrContext.Provider>
    </LoadingContext.Provider>
  );
};

export const useRhuangrContext = () => {
  const context = useContext(rhuangrContext);
  if (context === undefined) {
    throw new Error(
      "useRhuangrContext must be used within an rhuangrContextProvider"
    );
  }
  return context;
};

export interface LLMOutputType {
  heading: string;
  paragraphs: {
    subheading: string;
    content: string;
  }[];
}
