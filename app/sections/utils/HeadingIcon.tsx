'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Lightbulb, LightbulbOff } from "lucide-react";
import { HighlightedText } from "./HighlightedText";

export const HeadingSmiley = () => {
  return (
    <motion.span
      animate={{ rotate: 96 }}
      transition={{
        duration: 1.2,
        type: "spring",
        stiffness: 200,
        delay: 0.7,
      }}
      className="inline-block"
      initial={{ rotate: 3 }}
    >
      <HighlightedText className="!px-2 pt-0.5 !pb-1.5 font-[800]" text=":)" />
    </motion.span>
  );
};

export const HeadingLightbulb = ({
  shakeDuration = 0.5,
}: {
  shakeDuration?: number;
}) => {
  const [isOn, setOn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOn(true);
    }, (shakeDuration + 0.35) * 1000);

    return () => clearTimeout(timer);
  }, [shakeDuration]);

  return (
    <AnimatePresence mode="wait">
      <div className="inline-block h-7">
        {isOn ? (
          <Appear duration={0.2}>
            <Lightbulb
              className=" size-7 bg-orange-500"
            />
          </Appear>
        ) : (
          <Shake key="off" shakeDuration={shakeDuration} rotateAmount={10} repeat={3}>
            <LightbulbOff className="size-7" />
          </Shake>
        )}
      </div>
    </AnimatePresence>
  );
};

export const Shake = ({
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
}) => {
  const rotate: number[] = [];
  for (let i = 0; i < repeat; i++) {
    rotate.push(-rotateAmount);
    rotate.push(rotateAmount);
  }

  return (
    <motion.div
      animate={{ rotate: [...rotate, 0] }}
      transition={{ duration: shakeDuration, repeat: infinite ? Infinity : 0 }}
      className="inline-flex items-center justify-center ml-2"
    >
      {children}
    </motion.div>
  );
};

export const Appear = ({
  children,
  duration = 0.5,
  delay = 0,
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}) => {
  return (
    <motion.span
      transition={{
        duration,
        type: "spring",
        damping: 9,
        delay,
      }}
      className="inline-flex items-center justify-center bg-orange-500 p-0.5 ml-2"
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotate: 3 }}
    >
      {children}
    </motion.span>
  );
};
