"use client";

import type { ReactNode } from "react";
import BalatroBackground from "@/app/(site)/components/layout/BalatroBackground";
import { MobileNavBar } from "@/app/(site)/components/nav/MobileNavBar";
import { NavBar } from "@/app/(site)/components/nav/NavBar";
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
      <div className="min-h-screen relative w-full">
        <div className="relative bg-background rounded-b-3xl shadow-lg/20 lg:mx-8">
          <div className="w-full text-foreground">
            <div className="relative top-12 left-6 z-1 md:hidden">
              <MobileNavBar />
            </div>
            <main className="relative min-h-[calc(100vh-2rem)] max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-[170px_400px] items-center px-8 relative pt-20 pb-25">
              <div className="hidden md:block md:col-start-1 md:col-span-1">
                <NavBar />
              </div>
              <div className="col-span-1 md:col-start-2 md:col-span-2">
                {children}
                <ErrorComponent />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
