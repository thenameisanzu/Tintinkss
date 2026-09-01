"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site, footer, instagramPhotos } from "@/lib/content";
import InstagramIcon from "@/components/icons/InstagramIcon";
import SplitText from "@/components/SplitText";
import Magnetic from "@/components/Magnetic";

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: typeof instagramPhotos;
  direction: 1 | -1;
  duration: number;
}) {
  const row = [...items, ...items, ...items];

  return (
    <div
      className={`flex gap-4 md:gap-6 w-max gpu-layer ${
        direction === 1 ? "animate-marquee-left" : "animate-marquee-right"
      }`}
      style={{ animationDuration: `${duration}s` }}
    >
      {row.map((item, i) => (
        <motion.a
          key={i}
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          whileHover={{ scale: 1.05, y: -4 }}
          className="group relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-[1.8rem_0.6rem_1.8rem_0.6rem] shrink-0 overflow-hidden bg-clay-200 shadow-md border border-clay-200/60 block"
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 150px, 240px"
            className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Hover overlay with Instagram icon and tag */}
          <div className="absolute inset-0 bg-kiln/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-porcelain p-3 text-center">
            <div className="w-10 h-10 rounded-full bg-porcelain/20 flex items-center justify-center mb-1.5 shadow-sm">
              <InstagramIcon size={20} className="text-porcelain" />
            </div>
            <span className="font-script text-lg text-rust-light">{item.tag}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

export default function InstagramStrip() {
  const half = Math.ceil(instagramPhotos.length / 2);
  const row1 = instagramPhotos.slice(0, half);
  const row2 = instagramPhotos.slice(half).concat(instagramPhotos.slice(0, 2));

  return (
    <section className="bg-bisque py-16 md:py-24 overflow-hidden border-t border-clay-200/50">
      <div className="px-6 md:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <span className="font-script text-2xl text-rust block mb-1">Follow the Journey</span>
          <h2 className="font-display font-medium text-3xl md:text-5xl text-kiln">
            <SplitText text={footer.cta} />
          </h2>
        </div>
        <Magnetic
          as="a"
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-script text-2xl md:text-3xl text-rust hover:text-rust-hover shrink-0 transition-colors"
          strength={0.4}
        >
          <InstagramIcon size={22} />
          {footer.handle}
        </Magnetic>
      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        <MarqueeRow items={row1.length > 0 ? row1 : instagramPhotos} direction={1} duration={28} />
        <MarqueeRow items={row2.length > 0 ? row2 : instagramPhotos} direction={-1} duration={34} />
      </div>
    </section>
  );
}
