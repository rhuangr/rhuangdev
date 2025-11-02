"use client";

import { Skeleton } from "@/app/(site)/components/shared/Skeleton";
import { Shake } from "@/app/(site)/components/shared/HeadingIcon";
import { CookingPot } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex w-full flex-col">
      <h1 className="flex items-center gap-2">
        Cooking something special...
        <Shake infinite shakeDuration={1.5} rotateAmount={8}>
          <CookingPot size={27} />
        </Shake>
      </h1>
      <Skeleton className="mt-5 mb-2 h-3 w-full bg-card" />
      <Skeleton className="mb-2 h-3 w-5/6 bg-card/80" />
      <Skeleton className="mb-2 h-3 w-2/3 bg-card/60" />
      <Skeleton className="mb-2 h-3 w-4/5 bg-card/40" />
      <Skeleton className="mb-2 h-3 w-1/2 bg-card/20" />
      <Skeleton className="mb-2 h-3 w-1/3 bg-card/10" />
    </div>
  );
}
