import { SkillList } from "./utils/SkillsList";

type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  summary: string;
  skills: string[];
};

const timeline: ExperienceEntry[] = [
  {
    company: "Shopify",
    role: "Engineering Intern",
    period: "Jan - Aug 2025",
    summary:
      "Developed customer identity services, shipping features that improved login success rates and recovery automation.",
    skills: ["TypeScript", "React", "GraphQL", "SQL", "Ruby on Rails"],
  },
  {
    company: "McGill LaunchPad",
    role: "Product Engineer",
    period: "2024",
    summary:
      "Led the front-end track for student founders, coaching teams on design systems, component tooling, and analytics instrumentation.",
    skills: ["TypeScript", "Next.js", "Storybook", "Supabase"],
  },
];

export function Experience() {
  return (
    <section className="mx-auto w-full max-w-3xl space-y-6.5 py-10">
      <h1>Experience</h1>
      {timeline.map((item) => (
        <article
          key={`${item.company}-${item.period}`}
          className="space-y-3"
        >
          <header className="flex items-baseline justify-between gap-3">
            <h2 className="text-heading font-[700] text-foreground">
              {item.company}
            </h2>
            <span className="font-family-geist-mono text-subheading text-muted-foreground">
              {item.period}
            </span>
          </header>
          <p className="text-foreground">
            <span className="font-medium text-foreground">{item.role}</span> — {item.summary}
          </p>
          <SkillList items={item.skills} />
        </article>
      ))}
      <span data-route-sentinel="true" aria-hidden="true" className="block h-1 w-full" />
    </section>
  );
}
