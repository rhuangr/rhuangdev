'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";

const spotifyTracks = [
  "https://open.spotify.com/embed/track/02VBYrHfVwfEWXk5DXyf0T?utm_source=generator",
  "https://open.spotify.com/embed/track/6ENvqECRj6usbnhoemJFav?utm_source=generator",
  "https://open.spotify.com/embed/track/0Yos7Ql3MvIXE56swDiInZ?utm_source=generator",
];

export function SpotifyTracks() {
  const [hidden, setHidden] = useState(true);
  const step = 7;
  const total = (spotifyTracks.length - 1) * step;
  const height = 22;

  const itemVariants = {
    stacked: ({ i, loaded }: { i: number; loaded: boolean }): TargetAndTransition => ({
      top: `${i * step}px`,
      scale: 0.9 - total / 100 + (i * step) / 100,
      opacity: loaded ? (100 - total + i * step) / 100 : 0,
      transition: { duration: 0.4, damping: 15, type: "spring" },
    }),
    expanded: ({ i, loaded }: { i: number; loaded: boolean }): TargetAndTransition => ({
      top: `${(-i + (spotifyTracks.length - 1)) * height * 4}px`,
      scale: 1,
      opacity: loaded ? 1 : 0,
      transition: { duration: 0.4, damping: 15, type: "spring" },
    }),
  };

  return (
    <div
      className="relative h-32"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      {spotifyTracks.map((track, i) => (
        <SpotifyItem key={track} track={track} hidden={hidden} variants={itemVariants} i={i} />
      ))}
    </div>
  );
}

function SpotifyItem({
  track,
  hidden,
  variants,
  i,
}: {
  track: string;
  hidden: boolean;
  variants: Record<string, (args: { i: number; loaded: boolean }) => TargetAndTransition>;
  i: number;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.iframe
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      data-testid="embed-iframe"
      src={track}
      className="absolute left-0 h-22 w-4/5 z-5 pb-1 rounded-md border-0 shadow-lg"
      animate={hidden ? "stacked" : "expanded"}
      variants={variants}
      custom={{ i, loaded }}
      onLoad={() => setLoaded(true)}
    />
  );
}
