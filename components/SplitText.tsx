"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045 },
  },
};

const word: Variants = {
  hidden: { y: "135%", rotate: 4 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SplitText({
  text,
  className = "",
  delay = 0,
  viewport = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  viewport?: boolean;
}) {
  const words = text.split(" ");
  const viewportProps = viewport
    ? { whileInView: "show", viewport: { once: true, margin: "-10%" } }
    : { animate: "show" };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      {...viewportProps}
      transition={{ delayChildren: delay }}
      className={`inline-block ${className}`}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pt-[0.12em] -mt-[0.12em] pb-[0.35em] -mb-[0.35em] mr-[0.22em] align-bottom"
        >
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
