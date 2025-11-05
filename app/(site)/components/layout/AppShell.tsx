"use client";

import type { ReactNode } from "react";
import BalatroBackground from "@/app/(site)/components/layout/BalatroBackground";
import { MobileNavBar } from "@/app/(site)/components/nav/MobileNavBar";
import { NavBar } from "@/app/(site)/components/nav/NavBar";
import { ErrorComponent } from "../error/error";
import { Analytics } from "@vercel/analytics/next";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative flex flex-col min-h-screen min-w-screen text-foreground bg-background selection:bg-orange-500 hover:bg-orange-600 ">
      <div className="fixed h-screen w-full">
        <BalatroBackground />
      </div>
      <div className="min-h-screen relative w-full">
        <div className="relative bg-background rounded-b-3xl shadow-lg/20 overflow-x-hidden">
          <div className="w-full text-foreground">
            <div className="relative top-12 left-6 mb-5 z-1 md:hidden">
              <MobileNavBar />
            </div>
            <main className="relative min-h-[90vh] md:min-h-[96vh] max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-[170px_400px] items-center px-6 relative pt-18 pb-20 md:pt-20 md:pb-25">
              <div className="hidden md:block md:col-start-1 md:col-span-1">
                <NavBar />
              </div>
              <div className="w-fit mx-auto col-span-1 md:col-start-2 md:col-span-2">
                {children}
                <ErrorComponent />
                <Analytics />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
