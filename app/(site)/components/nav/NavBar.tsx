'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Bot, Home, Lightbulb, Star } from "lucide-react";
import { TextShimmer } from "@/app/(site)/components/shared/TextShimmer";
import { useRhuangrContext } from "@/app/(site)/components/chat/rhuangrContext";

type LinkDescriptor = {
  href: string;
  label: ReactNode;
  icon?: ReactNode;
};

const commonIconProps = { size: 13, strokeWidth: 2 };

const baseLinks: LinkDescriptor[] = [
  { href: "/", label: "Home", icon: <Home {...commonIconProps} /> },
  { href: "/projects", label: "Projects", icon: <Lightbulb {...commonIconProps} /> },
  { href: "/other", label: "Other facts", icon: <Star {...commonIconProps} /> },
];

export function NavBar() {
  const pathname = usePathname();
  const { isLoading, generatedPages } = useRhuangrContext();

  const links = useMemo(() => {
    const generatedLinks = Object.entries(generatedPages).map(([slug, page]) => ({
      href: `/${slug}`,
      label: page.heading.length > 12 ? `${page.heading.slice(0, 12)}…` : page.heading,
      icon: <Bot {...commonIconProps} />,
    }));

    return [...baseLinks, ...generatedLinks];
  }, [generatedPages]);

  const renderedLinks = useMemo(() => {
    if (!isLoading) {
      return links;
    }

    return [
      ...links,
      {
        href: "/loading",
        label: <TextShimmer duration={1}>Loading…</TextShimmer>,
        icon: <Bot {...commonIconProps} />,
      },
    ];
  }, [isLoading, links]);

  return (
    <nav className="relative flex flex-col gap-4 w-fit h-auto pl-4">
      {renderedLinks.map((link, index) => {
        const isActive = pathname === link.href;
        const content = (
          <Link
            href={link.href}
            className={[
              "px-1.5 text-subheading transform transition-colors transition-transform duration-200 inline-block origin-left",
              isActive
                ? "text-foreground font-bold translate-x-3 scale-110 -rotate-2"
                : "text-muted-foreground font-normal",
              "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            ].join(" ")}
          >
            <span className="flex items-center gap-2">
              {isActive && link.icon}
              {link.label}
            </span>
          </Link>
        );

        if (index === renderedLinks.length - 1) {
          return (
            <motion.div key={link.href} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              {content}
            </motion.div>
          );
        }

        return <span key={link.href}>{content}</span>;
      })}
    </nav>
  );
}
