"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/lib/content";
import { ArrowDown } from "lucide-react";
import SplitText from "@/components/SplitText";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yBlob1 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yHeadline = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleFade = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const lines = hero.headline.split("\n");

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-porcelain texture-grain pt-28 pb-10 px-6 md:px-10"
    >
      <motion.div
        style={{ y: yBlob1 }}
        initial={{ scale: 0, rotate: -8 }}
        animate={{
          scale: 1,
          borderRadius: [
            "42% 58% 65% 35% / 45% 45% 55% 55%",
            "58% 42% 35% 65% / 55% 65% 35% 45%",
            "42% 58% 65% 35% / 45% 45% 55% 55%",
          ],
        }}
        transition={{
          scale: { duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 1.7 },
          borderRadius: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 },
        }}
        className="pointer-events-none absolute -right-24 top-16 w-[340px] h-[340px] md:w-[520px] md:h-[520px] bg-rust/90 blur-[1px]"
        aria-hidden
      />

      <motion.div
        style={{ y: yBlob2 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, y: [0, -18, 0] }}
        transition={{
          scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.9 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
        }}
        className="pointer-events-none absolute right-8 top-40 w-24 h-24 md:w-36 md:h-36 rounded-full bg-sage"
        aria-hidden
      />

      <motion.div
        style={{ opacity: opacityFade }}
        className="flex items-center justify-between text-sm font-medium text-kiln/70 relative z-10"
      >
        <span>{hero.eyebrow}</span>
        <span className="hidden md:inline font-script text-xl text-rust">handmade, always</span>
      </motion.div>

      <motion.div style={{ y: yHeadline, opacity: opacityFade, scale: scaleFade }} className="relative z-10">
        {lines.map((l, i) => (
          <div key={i} className="overflow-visible py-0.5">
            <SplitText
              text={l}
              delay={1.6 + i * 0.25}
              viewport={false}
              className="font-display font-medium text-mega leading-[0.98] text-kiln"
            />
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.7 }}
          className="mt-8 max-w-md md:max-w-lg font-display italic font-normal text-base md:text-lg text-kiln/80 leading-relaxed"
        >
          {hero.sub}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
        className="relative z-10 flex items-center justify-between"
      >
        <Magnetic
          as="a"
          href="#collection"
          className="group inline-flex items-center gap-3 font-medium text-kiln border-b-2 border-kiln pb-1 hover:border-rust hover:text-rust transition-colors"
        >
          {hero.cta}
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={16} />
          </motion.span>
        </Magnetic>
        <span className="hidden md:block font-script text-xl text-kiln/60">scroll on down</span>
      </motion.div>
    </section>
  );
}
