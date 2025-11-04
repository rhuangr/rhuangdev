import { motion } from "framer-motion";

export function Arrow({
  children,
  x = 0,
  y = 0,
  className,
}: {
  children: React.ReactNode;
  x?: number;
  y?: number;
  className?: string;
}) {
  let xPos = [];
  let yPos = [];

  for (let i = 0; i < 5; i += 1) {
    xPos.push(x * i);
    yPos.push(y * i);
  }
  for (let i = 5; i > 0; i -= 1) {
    xPos.push(x * i);
    yPos.push(y * i);
  }

  return (
    <motion.span
      className={`inline-flex items-center justify-center ${className}`}
      animate={{ x: [...xPos], y: [...yPos] }}
      transition={{ duration: 1, delay: 0, repeat: Infinity }}
    >
      {/* <div className="w-20 h-6 bg-orange-500 text-subheading font-bold flex items-center justify-center pr-2 [clip-path:polygon(0_0,85%_0,100%_50%,85%_100%,0_100%)]">
      </div> */}
      {children}
    </motion.span>
  );
}
