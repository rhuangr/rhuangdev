import { ContactLinks } from "@/app/(site)/components/home/ContactLinks";
import { HighlightedText } from "@/app/(site)/components/shared/HighlightedText";
import { HeadingSmiley } from "@/app/(site)/components/shared/HeadingIcon";

export function HomeAboutSection() {
  return (
    <section className="mx-auto w-full space-y-6.5">
      <h1 className="w-fit origin-center pb-1 text-left text-[22px] font-[700]">
        Hello, I&apos;m Richard
        <HeadingSmiley />
      </h1>

      <section>
        <h2>About</h2>
  <p>I&apos;m a second year Computer Science student at McGill University.</p>
  <p>I&apos;m interested in frontend dev, AI and systems engineering.</p>
      </section>

      <section>
        <h2>Experience</h2>
        <p>
          <span className="mr-2 font-geist-mono text-muted-foreground">Jan-May 2026</span>
          Incoming Backend Intern at
          <HighlightedText text="Autodesk" />
        </p>
        <p>
          <span className="mr-2 font-geist-mono text-muted-foreground">Jan-Sep 2025</span>
          Engineering Intern at
          <HighlightedText text="Shopify" />
        </p>
      </section>

      <section className="pt-3">
        <ContactLinks />
      </section>
    </section>
  );
}
