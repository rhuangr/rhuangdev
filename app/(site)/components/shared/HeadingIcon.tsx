'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Lightbulb, LightbulbOff } from "lucide-react";
import { HighlightedText } from "@/app/(site)/components/shared/HighlightedText";

export function HeadingSmiley() {
  return (
    <motion.span
      className="inline-block"
      initial={{ rotate: 3 }}
      animate={{ rotate: 96 }}
      transition={{ duration: 1.2, type: "spring", stiffness: 200, delay: 0.7 }}
    >
      <HighlightedText className="!px-2 pt-0.5 !pb-1.5 font-[800]" text=":)" />
    </motion.span>
  );
}

export function HeadingLightbulb({ shakeDuration = 0.5 }: { shakeDuration?: number }) {
  const [isOn, setOn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOn(true), (shakeDuration + 0.35) * 1000);
    return () => clearTimeout(timer);
  }, [shakeDuration]);

  return (
    <AnimatePresence mode="wait">
      <div className="inline-block h-7">
        {isOn ? (
          <Appear duration={0.2}>
            <Lightbulb className="size-7 bg-orange-500" />
          </Appear>
        ) : (
          <Shake key="off" shakeDuration={shakeDuration} rotateAmount={10} repeat={3}>
            <LightbulbOff className="size-7" />
          </Shake>
        )}
      </div>
    </AnimatePresence>
  );
}

export function Shake({
  children,
  shakeDuration = 0.5,
  rotateAmount = 10,
  repeat = 3,
  infinite = false,
}: {
  children: React.ReactNode;
  shakeDuration?: number;
  rotateAmount?: number;
  repeat?: number;
  infinite?: boolean;
}) {
  const rotate: number[] = [];
  for (let i = 0; i < repeat; i += 1) {
    rotate.push(-rotateAmount, rotateAmount);
  }

  return (
    <motion.div
      className="inline-flex items-center justify-center ml-2"
      animate={{ rotate: [...rotate, 0] }}
      transition={{ duration: shakeDuration, repeat: infinite ? Infinity : 0 }}
    >
      {children}
    </motion.div>
  );
}

export function Appear({
  children,
  duration = 0.5,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-flex items-center justify-center bg-orange-500 p-0.5 ml-2 ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: 3 }}
      transition={{ duration, type: "spring", damping: 9, delay }}
    >
      {children}
    </motion.span>
  );
}
