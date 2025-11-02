"use client";

import { useRhuangrContext } from "../chat/rhuangrContext";
import { Appear } from "../shared/HeadingIcon";
import { TriangleAlert } from "lucide-react";

export function ErrorComponent() {
  const { error } = useRhuangrContext();

  if (!error) {
    return null;
  }

  return (
    <div className="flex items-center pt-7">
      <Appear className="bg-red-500 mr-4">
        <TriangleAlert size={35} />
      </Appear>
      <p className="font-semibold">{error}</p>
      <Appear className="bg-red-500 mr-4">
        <TriangleAlert size={35} />
      </Appear>
    </div>
  );
}
