"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Bot, Home, Lightbulb, Sparkles, Star } from "lucide-react";
import { TextShimmer } from "@/app/(site)/components/shared/TextShimmer";
import { useRhuangrContext } from "@/app/(site)/chat/rhuangrContext";


export type LinkDescriptor = {
  href: string;
  label: ReactNode;
  icon?: ReactNode;
};

const commonIconProps = { size: 15, strokeWidth: 2 };

export const baseLinks: LinkDescriptor[] = [
  { href: "/", label: "Home", icon: <Home {...commonIconProps} /> },
  {
    href: "/projects",
    label: "Projects",
    icon: <Lightbulb {...commonIconProps} />,
  },
  { href: "/other", label: "Other", icon: <Star {...commonIconProps} /> },
];

// Individual nav link component

export function NavBar() {
  const { isLoading, generatedPages } = useRhuangrContext();

  const links = useMemo(() => {
    const generatedLinks = Object.entries(generatedPages).map(
      ([slug, page]) => ({
        href: `/${slug}`,
        label:
          page.heading.length > 12
            ? `${page.heading.slice(0, 12)}…`
            : page.heading,
        icon: <Bot {...commonIconProps} />,
      })
    );

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
    <nav className="relative flex flex-col space-y-3 h-auto">
      <div className="relative inline-block">
        <IndividualNavLink
          link={{
            href: "/chat",
            label: "AI chat",
            icon: <Bot {...commonIconProps} />,
          }}
          isLastRendered={false}
        />
      </div>
      {/* <div className="w-2/5 border h-0.5 border-muted-foreground/20 rounded-full" /> */}
      {renderedLinks.map((link, index) => {
        const isLastRendered =
          index === renderedLinks.length - 1 && index > baseLinks.length;
        return (
          <IndividualNavLink
            key={link.href}
            link={link}
            isLastRendered={isLastRendered}
          />
        );
      })}
    </nav>
  );
}

function IndividualNavLink({
  link,
  isLastRendered = false,
}: {
  link: LinkDescriptor;
  isLastRendered?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === link.href;
  const content = (
    <Link
      href={link.href}
      className={[
        "relative px-1.5 text-subheading transform transition-colors transition-transform duration-200 inline-block origin-left",
        isActive
          ? "text-foreground font-bold translate-x-3 scale-120 -rotate-1"
          : "text-foreground/70 font-normal",
        "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      ].join(" ")}
    >
      <span className="flex items-center gap-2">
        {isActive && link.icon}
        {link.label}
      </span>
    </Link>
  );

  if (isLastRendered) {
    return (
      <motion.div
        key={link.href}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 1 }}
      >
        {content}
      </motion.div>
    );
  }

  return <span key={link.href}>{content}</span>;
}
