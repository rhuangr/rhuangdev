import { Appear } from "@/app/(site)/components/shared/HeadingIcon";
import { SpotifyTracks } from "@/app/(site)/components/shared/SpotifyTracks";
import { ArrowUpRight, Star } from "lucide-react";

const games = [
  {
    name: "Slay the Spire",
    href: "https://store.steampowered.com/app/646570/Slay_the_Spire/",
    rel: "noopener noreferrer",
  },
  {
    name: "League of Legends",
    href: "https://www.leagueoflegends.com/",
  },
  {
    name: "Baldur's Gate 3",
    href: "https://baldursgate3.game/",
    rel: "noopener noreferrer",
  },
];

export function OtherFactsContent() {
  return (
    <section className="space-y-6.5">
      <h1 className="flex items-center">
        Other Facts
        <Appear delay={0.5}>
          <Star size={24} />
        </Appear>
      </h1>

      <section>
  <h2>Things I&apos;m Learning</h2>
        <ul className="list-disc list-inside">
          <li>How to cook</li>
          <li>Operating Systems</li>
        </ul>
      </section>

      <section>
        <h2>Games I like</h2>
        <ul className="list-disc list-inside">
          {games.map((game) => (
            <li key={game.name}>
              <a
                className="underline transition-colors hover:text-orange-500"
                href={game.href}
                target="_blank"
                rel={game.rel}
              >
                {game.name}
                <ArrowUpRight className="ml-1 inline" size={12} />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Music I like</h2>
        <SpotifyTracks />
      </section>
    </section>
  );
}
