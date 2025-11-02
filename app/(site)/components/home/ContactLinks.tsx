import { ArrowUpRight, Download, Mail, type LucideIcon } from "lucide-react";

const GITHUB = "https://github.com/rhuangr";
const LINKEDIN = "https://www.linkedin.com/in/rhuangr";
const EMAIL = "richardhuang197@gmail.com";
const RESUME = "/Assets/RichardHuang-Resume.pdf";

const links: Array<{
  label: string;
  href: string;
  icon: LucideIcon;
  download?: boolean;
}> = [
  { label: "github", href: GITHUB, icon: ArrowUpRight },
  { label: "linkedin", href: LINKEDIN, icon: ArrowUpRight },
  { label: "email", href: `mailto:${EMAIL}`, icon: Mail },
  { label: "resume", href: RESUME, icon: Download, download: true },
];

export function ContactLinks() {
  return (
    <div className="flex space-x-2">
      {links.map((link) => {
        const Icon = link.icon;
        const isMailOrDownload = link.href.startsWith("mailto:") || link.download;

        return (
          <a
            key={link.label}
            href={link.href}
            target={isMailOrDownload ? undefined : "_blank"}
            rel={isMailOrDownload ? undefined : "noopener noreferrer"}
            download={link.download ? true : undefined}
            className="group flex h-6.75 w-fit items-center rounded-sm border-1 border-gray-50/10 bg-gray-400/10 px-3 py-2 transition-colors transition-transform duration-400 ease-in-out hover:rotate-3 hover:scale-110 hover:bg-orange-500"
          >
            <span className="text-xs text-foreground">{link.label}</span>
            <Icon className="ml-1 w-4 shrink-0 pl-1 text-foreground transition-transform duration-150 group-hover:scale-135" />
          </a>
        );
      })}
    </div>
  );
}
