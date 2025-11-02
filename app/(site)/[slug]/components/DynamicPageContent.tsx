"use client";

import { Bot } from "lucide-react";
import { Appear } from "@/app/(site)/components/shared/HeadingIcon";
import { useRhuangrContext } from "@/app/(site)/chat/rhuangrContext";

export function DynamicPageContent({ slug }: { slug: string }) {
  const { getGeneratedPage } = useRhuangrContext();
  const page = getGeneratedPage(slug);

  if (!page) {
    return (
      <div className="space-y-3">
        <h1>There&apos;s nothing here…</h1>
        <p className="text-muted-foreground">
          Pages are not stored in local storage or a database. {"Sorry :("}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6.5">
      <h1 className="flex items-center gap-2 text-heading">
        {page.heading}
        <Appear>
          <Bot size={27} />
        </Appear>
      </h1>
      {page.paragraphs.map((paragraph, index) => (
        <section key={index} className="space-y-2">
          <h2>{paragraph.subheading}</h2>
          <p>{paragraph.content}</p>
        </section>
      ))}
    </div>
  );
}
