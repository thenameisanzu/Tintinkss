"use client";

import { motion } from "framer-motion";
import { site, footer } from "@/lib/content";
import InstagramIcon from "@/components/icons/InstagramIcon";
import SplitText from "@/components/SplitText";
import Magnetic from "@/components/Magnetic";

const tilesA = ["bg-clay-200", "bg-rust/30", "bg-sage/35", "bg-clay-300", "bg-rust/20", "bg-sage/25"];
const tilesB = ["bg-sage/30", "bg-clay-300", "bg-rust/25", "bg-sage/20", "bg-clay-200", "bg-rust/35"];

function MarqueeRow({ tiles, direction, duration }: { tiles: string[]; direction: 1 | -1; duration: number }) {
  const row = [...tiles, ...tiles, ...tiles];
  return (
    <motion.div
      className="flex gap-4 w-max"
      animate={{ x: direction === 1 ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {row.map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.08, rotate: direction === 1 ? 3 : -3 }}
          className={`w-32 h-32 md:w-44 md:h-44 rounded-2xl ${c} shrink-0 flex items-center justify-center`}
        >
          <InstagramIcon size={20} className="text-kiln/30" />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function InstagramStrip() {
  return (
    <section className="bg-bisque py-16 md:py-20 overflow-hidden">
      <div className="px-6 md:px-10 flex items-center justify-between mb-8">
        <h2 className="font-display font-medium text-3xl md:text-5xl text-kiln">
          <SplitText text={footer.cta} />
        </h2>
        <Magnetic
          as="a"
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-script text-2xl text-rust shrink-0 ml-4"
          strength={0.5}
        >
          <InstagramIcon size={20} />
          {footer.handle}
        </Magnetic>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow tiles={tilesA} direction={1} duration={26} />
        <MarqueeRow tiles={tilesB} direction={-1} duration={32} />
      </div>
    </section>
  );
}
