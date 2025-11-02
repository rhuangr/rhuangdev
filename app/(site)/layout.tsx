import type { ReactNode } from "react";
import { AppShell } from "@/app/(site)/components/layout/AppShell";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
