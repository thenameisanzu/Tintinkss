"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { artistStory } from "@/lib/content";
import SplitText from "@/components/SplitText";

export default function ArtistStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.08]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section ref={ref} id="studio" className="relative bg-kiln text-porcelain px-6 md:px-10 py-24 md:py-32 overflow-hidden">
      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-20">
        <div className="md:sticky md:top-24 md:self-start">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-script text-2xl text-rust inline-block"
          >
            {artistStory.kicker}
          </motion.span>
          <h2 className="font-display font-medium text-huge mt-2 leading-[0.92]">
            <SplitText text={artistStory.name.split(" ")[0]} />
            <br />
            <SplitText text={artistStory.name.split(" ").slice(1).join(" ")} delay={0.1} />
          </h2>

          <div className="mt-10 w-full aspect-[4/5] rounded-[3rem_1rem_3rem_1rem] overflow-hidden relative shadow-2xl border border-porcelain/10 group">
            <motion.div
              style={{ scale: imgScale, rotate: imgRotate }}
              className="w-full h-full relative"
            >
              <Image
                src={artistStory.image || "/founder.jpg"}
                alt={artistStory.imageAlt || artistStory.name}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-kiln/80 via-transparent to-transparent pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-6 left-6 font-script text-2xl md:text-3xl text-porcelain drop-shadow-md z-10"
              >
                at the wheel
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-10 md:gap-14 md:pt-16">
          {artistStory.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic font-normal text-xl md:text-2xl leading-relaxed text-porcelain/90 max-w-xl"
            >
              {p}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", bounce: 0.5 }}
            className="font-script text-3xl text-rust mt-4"
          >
            {artistStory.signoff}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
