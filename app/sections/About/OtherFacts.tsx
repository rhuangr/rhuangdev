import { SpotifyTracks } from "../utils/SpotifyTracks";
import { Appear } from "../utils/HeadingIcon";
import { Star, ArrowUpRight } from "lucide-react";

export function OtherFacts() {

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

  return (
    <section className="mx-auto space-y-6.5">
      <h1 className="flex items-center">
        Other Facts{" "}
        <Appear delay={0.5}>
          <Star size={24} />
        </Appear>
      </h1>

      <section>
        <h2>Things I'm Learning</h2>
        <ul className="list-disc list-inside">
          <li>How to cook</li>
          <li>Operating Systems</li>
        </ul>
      </section>

      <section>
        <h2>Games I like</h2>
        <ul className="list-disc list-inside">
          {games.map((g) => (
            <li key={g.name}>
              <a
                className="underline hover:text-orange-500 transition-colors"
                href={g.href}
                target="_blank"
              >
                {g.name}
                <ArrowUpRight className="inline ml-1" size={12} />
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
