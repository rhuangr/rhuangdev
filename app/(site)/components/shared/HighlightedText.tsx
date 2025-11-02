import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface HighlightedTextProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
  href?: string;
}

export function HighlightedText({
  children,
  className,
  hover = true,
  tilt = false,
  href,
}: HighlightedTextProps) {
  const baseClassName = `inline-flex items-center ${className ?? ""} mx-1.5 font-[500] bg-orange-500 hover:bg-orange-600 transform ${
    tilt ? "rotate-2" : ""
  } ${
    hover ? "hover:rotate-4" : ""
  } ${href ? "group underline" : ""} px-1 transition-colors transition-transform duration-300`;

  if (href) {
    return (
      <a href={href} className={baseClassName}>
        {children}
        <ArrowUpRight className="inline-block ml-1 mb-0.5 w-3 h-3 group-hover:scale-125 transition-transform duration-300" />
      </a>
    );
  }

  return <span className={baseClassName}>{children}</span>;
}
