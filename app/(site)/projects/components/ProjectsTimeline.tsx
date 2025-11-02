import { HighlightedText } from "@/app/(site)/components/shared/HighlightedText";
import { HeadingLightbulb } from "@/app/(site)/components/shared/HeadingIcon";
import { SkillList } from "@/app/(site)/components/shared/SkillsList";

type ProjectEntry = {
  projectName: string;
  summary: string;
  skills: string[];
  link: string;
};

const timeline: ProjectEntry[] = [
  {
    projectName: "AI Maze Runner",
    summary:
      "Lightweight reinforcement learning program to train agents to cooperate and navigate mazes.",
    skills: ["Python", "Pytorch", "Numpy"],
    link: "https://github.com/rhuangr/MARL-Maze",
  },
  {
    projectName: "Game Resume",
    summary: "Resume website designed as an interactive game experience.",
    skills: ["Unity", "C#"],
    link: "https://rhuangr.github.io/rhuang-Game-Resume/",
  },
];

export function ProjectsTimeline() {
  return (
    <section className="mx-auto w-full space-y-6.5">
      <h1 className="flex items-center">
        Projects <HeadingLightbulb shakeDuration={0.5} />
      </h1>
      {timeline.map((item) => (
        <article key={item.projectName} className="space-y-2">
          <header className="flex justify-between">
            <h2 className="text-heading font-[700] text-foreground">{item.projectName}</h2>
          </header>
          <p className="text-foreground">{item.summary}</p>
          <HighlightedText tilt text="Check it out" className="mt-1.5" href={item.link} />
          <SkillList items={item.skills} />
        </article>
      ))}
    </section>
  );
}
