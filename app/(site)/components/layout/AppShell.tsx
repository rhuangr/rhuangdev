"use client";

import type { ReactNode } from "react";
import BalatroBackground from "@/app/(site)/components/layout/BalatroBackground";
import { NavBar } from "@/app/(site)/components/nav/NavBar";
import { RHUANGGPT } from "@/app/(site)/components/chat/RHUANGGPT";
import { ErrorComponent } from "../error/error";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative flex flex-col min-h-screen min-w-screen text-foreground bg-background selection:bg-orange-500 hover:bg-orange-600">
      <div className="fixed h-screen w-full">
        <BalatroBackground />
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-10 z-1">
        <RHUANGGPT />
        <div className="text-center text-xs pt-2">
          {" "}
          © 2025 Made by Richard Huang
        </div>
      </div>
      <div className="min-h-screen relative w-full">
        <div className="relative bg-background rounded-b-3xl shadow-lg/20 z-5 mx-10">
          <div className="relative w-full text-foreground mb-40">
            <main className="min-h-[95vh] mx-auto max-w-2xl grid grid-cols-1 md:grid-cols-[2fr_5fr] items-center px-10 pb-7 md:px-0 relative pt-20 pb-25">
              {" "}
              <div className="col-1 mb-5">
                <NavBar />
              </div>
              <div className="col-2 h-auto">
                {children}
                <ErrorComponent />
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                Still curious? Keep scrolling
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
