import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface highlightedTextProps {
  text: ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
  href?: string;
}

export const HighlightedText = ({
  text,
  className,
  hover = true,
  tilt = false,
  href,
}: highlightedTextProps) => {
  const commonClassName = `inline-block ${className} mx-1.5 font-[500] bg-orange-500 hover:bg-orange-600 transform ${
    tilt ? "rotate-1" : ""
  } ${
    hover ? "hover:rotate-4" : ""
  } 
${href? "group underline" : ""} px-1 transition-colors transition-transform duration-300`;
  return href ? (
    <a href={href} className={commonClassName}>
      {text}
      <ArrowUpRight className="inline-block ml-1 mb-0.5 w-3 h-3 group-hover:scale-125 transition-transform duration-300" />
    </a>
  ) : (
    <span className={commonClassName}>{text}</span>
  );
};
