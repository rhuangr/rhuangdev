import { ArrowUpRight, Mail, Download } from "lucide-react";

const GITHUB = "https://github.com/rhuangr";
const LINKEDIN = "https://www.linkedin.com/in/rhuangr";
const EMAIL = "richardhuang197@gmail.com";
const RESUME = "/Assets/RichardHuang-Resume.pdf";

const links = [
  {
    label: "github",
    href: GITHUB,
    icon: ArrowUpRight,
  },
  {
    label: "linkedin",
    href: LINKEDIN,
    icon: ArrowUpRight,
  },
  {
    label: "email",
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
  {
    label: "resume",
    href: RESUME,
    icon: Download,
    download: true,
  },
];

export function ContactLinks() {
  return (
    <div className="flex space-x-2">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") || link.download ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") || link.download ? undefined : "noopener noreferrer"}
            download={link.download ? true : undefined}
            className="group flex items-center w-fit h-6.75 px-3 py-2 bg-gray-400/10 border-1 border-gray-50/10 rounded-sm transform hover:rotate-3 hover:scale-110 ease-in-out transition-colors transition-transform duration-400 hover:bg-orange-500"
          >
            <span className="text-foreground text-xs">{link.label}</span>
            <Icon className="w-4 h-4 pl-1 text-foreground transition-transform duration-150 group-hover:scale-135" />
          </a>
        );
      })}
    </div>
  );
}