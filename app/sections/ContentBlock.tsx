import type React from "react";

interface ContentBlockProps {
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ContentBlock({
  header,
  children,
  className,
}: ContentBlockProps) {
  return (
    <div className={`flex w-full flex-col gap-y-3 py-2 ${className}`}>
      <div className="flex-shrink-0 text-heading font-[700]">{header}</div>
      <div className="w-full pl-5">{children}</div>
    </div>
  );
}
