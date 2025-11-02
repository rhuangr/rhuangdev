'use client';

import type { ReactNode } from "react";
import { RhuangrContextProvider } from "@/app/(site)/components/chat/rhuangrContext";

export function Providers({ children }: { children: ReactNode }) {
  return <RhuangrContextProvider>{children}</RhuangrContextProvider>;
}
