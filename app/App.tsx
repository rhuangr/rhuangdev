"use client";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import { RhuangrContextProvider } from "./sections/About/rhuangrContext";
import { NavBar } from "./components/NavBar";
import AppRoutes from "./AppRoutes";
import { RHUANGGPT } from "./sections/About/RHUANGGPT";
import Balatro from "./components/Balatro";

export function App() {
  return (
    <RhuangrContextProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </RhuangrContextProvider>
  );
}

function AppLayout() {
  return (
    <div className="relative flex flex-col min-h-screen min-w-screen text-foreground bg-background selection:bg-orange-500 hover:bg-orange-600">
      <div className="fixed h-screen w-full">
        <Balatro mouseInteraction={false} />
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-10 z-1">
        <RHUANGGPT />
        <div className="text-center text-xs pt-2">
          {" "}
          © 2025 Made by Richard Huang
        </div>
      </div>
      <div className="min-h-screen relative w-full">
        <div className="relative bg-background rounded-b-3xl shadow-lg/20 z-5">
          <div className="relative w-full text-foreground mb-40 ">
            <main className="min-h-[95vh] mx-auto max-w-2xl grid grid-cols-2 grid-cols-[2fr_5fr] items-center px-7 pb-7 md:px-0 relative pt-20 pb-20">
              <div className="col-1 fixed mb-5">
                <NavBar />
              </div>
              <div className="col-2">
                <AppRoutes />
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

export default App;
