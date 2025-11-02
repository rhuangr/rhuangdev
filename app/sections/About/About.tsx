import { ContactLinks } from "../ContactLinks";
import { HighlightedText } from "../utils/HighlightedText";
import { HeadingSmiley } from "../utils/HeadingIcon";

export function About() {
  return (
    <section className="mx-auto w-full space-y-6.5">
      <h1 className="origin-center text-[22px] font-[700] pb-1 w-fit text-left">
        Hello, I'm Richard
        <HeadingSmiley />
      </h1>

      <section>
        <h2>About</h2>
        <div>
          I'm a second year Computer Science student at McGill University.
        </div>
        <div>I'm interested in frontend dev, AI and systems engineering.</div>
      </section>
      <section>
        <h2>Experience</h2>
        <div>
          <span className=" font-geist-mono text-muted-foreground mr-2">
            Jan-May 2026
          </span>
          Incoming Backend Intern at
          <HighlightedText text="Autodesk" />
        </div>
        <div>
          <span className=" font-geist-mono text-muted-foreground mr-2">
            Jan-Sep 2025
          </span>
          Engineering Intern at
          <HighlightedText text="Shopify" />
        </div>
      </section>
      {/* <section>
       <h2>Other</h2>
        <div>
          Almost a professional League of Legends player.
          <br />
          Like to sing and play the piano
        </div>
        </section> */}
      <section className="pt-3">
        <ContactLinks />
      </section>
    </section>
  );
}
