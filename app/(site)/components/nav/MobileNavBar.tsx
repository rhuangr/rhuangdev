"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { baseLinks } from "./NavBar";
import { HighlightedText } from "../shared/HighlightedText";

export function MobileNavBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden w-full flex justify-start items-center">
      {baseLinks.map((link) => {
        const isActive = pathname === link.href;
        const iconClasses = [
          "flex items-center justify-center",
          isActive
            ? "scale-150"
            : "scale-100 text-foreground",
        ].join(" ");

        return (
          <span key={link.href} className="w-10">
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isActive ? (
                <HighlightedText tilt className={`${iconClasses} !bg-orange-400 !px-0.5 py-0.5`}>
                  <span>{link.icon}</span>
                </HighlightedText>
              ) : (
                <span className={iconClasses}>{link.icon}</span>
              )}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
