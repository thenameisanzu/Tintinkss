"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { collection } from "@/lib/content";
import SplitText from "@/components/SplitText";
import { useInquiryModal } from "@/components/InquiryModalContext";
import { ArrowUpRight, Sparkles } from "lucide-react";

const categoryMap: Record<string, string> = {
  Pottery: "Wheel-thrown Mug / Cup",
  Postcards: "Illustrated Ceramic Postcard",
  "Calendar Cards": "Calendar Cards Keepsake",
  "Custom Collectibles": "Custom Story Piece",
};

function CollectionCard({
  item,
  index,
}: {
  item: (typeof collection)[number];
  index: number;
}) {
  const { openModal } = useInquiryModal();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [entryPos, setEntryPos] = useState({ x: 200, y: 100 });

  // Ultra-Smooth 3D Tilt Spring Physics
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 24, mass: 0.7 });
  const sry = useSpring(ry, { stiffness: 160, damping: 24, mass: 0.7 });

  // Ultra-Smooth Radial Cursor Follower
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(100);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 28, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 28, mass: 0.6 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    ry.set(px * 3.5);
    rx.set(-py * 3.5);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setEntryPos({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    }
    setHovered(true);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  const handleEnquire = () => {
    const mappedCat = categoryMap[item.title] || "Custom Story Piece";
    openModal("commission", mappedCat);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <motion.div
        ref={ref}
        onClick={handleEnquire}
        onMouseMove={handleMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleLeave}
        animate={{
          scale: hovered ? 1.02 : 1,
          y: hovered ? -3 : 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 1000 }}
        className={`group relative p-7 sm:p-9 md:p-12 rounded-[2rem] sm:rounded-[2.4rem] bg-porcelain/[0.035] border border-porcelain/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 md:gap-12 cursor-pointer shadow-sm hover:shadow-[0_30px_70px_rgba(184,84,47,0.32)] hover:border-rust/60 overflow-hidden ${
          index % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
        }`}
      >
        {/* Expanding Full-Color Radial Fill Bloom (Fluid Easing) */}
        <motion.div
          initial={false}
          animate={{
            clipPath: hovered
              ? `circle(170% at ${entryPos.x}px ${entryPos.y}px)`
              : `circle(0% at ${entryPos.x}px ${entryPos.y}px)`,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-none absolute inset-0 rounded-[2rem] sm:rounded-[2.4rem] bg-gradient-to-br from-[#C45E36] via-[#B8542F] to-[#983D1C] shadow-[inset_0_0_80px_rgba(0,0,0,0.25)]"
        />

        {/* Dynamic Cursor-Following Radial Spotlight Highlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[2rem] sm:rounded-[2.4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${smoothX}px ${smoothY}px,
                rgba(255, 255, 255, 0.16),
                transparent 70%
              )
            `,
          }}
        />

        {/* Radial Border Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] sm:rounded-[2.4rem] border-2 border-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
          style={{
            maskImage: useMotionTemplate`
              radial-gradient(
                320px circle at ${smoothX}px ${smoothY}px,
                black,
                transparent
              )
            `,
            WebkitMaskImage: useMotionTemplate`
              radial-gradient(
                320px circle at ${smoothX}px ${smoothY}px,
                black,
                transparent
              )
            `,
          }}
        />

        {/* Title & Arrow */}
        <div className={`relative z-10 flex items-center gap-3.5 sm:gap-4 shrink-0 max-w-full md:max-w-[48%] ${index % 2 === 1 ? "md:justify-end" : ""}`}>
          <h3 className="font-display font-medium text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-porcelain group-hover:text-white transition-colors duration-400 tracking-tight break-words group-hover:drop-shadow-sm">
            {item.title}
          </h3>
          <motion.div
            animate={{
              x: hovered ? 5 : 0,
              y: hovered ? -5 : 0,
              scale: hovered ? 1.15 : 1,
              opacity: hovered ? 1 : 0.4,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-rust group-hover:text-white shrink-0 transition-colors duration-400"
          >
            <ArrowUpRight size={26} className="md:w-8 md:h-8" />
          </motion.div>
        </div>

        {/* Description & Action */}
        <div className={`relative z-10 flex flex-col gap-3 sm:gap-3.5 max-w-full md:max-w-[48%] ${index % 2 === 1 ? "md:items-end" : ""}`}>
          <p className="font-display italic font-normal text-base sm:text-lg md:text-lg lg:text-xl text-porcelain/75 group-hover:text-porcelain leading-relaxed transition-colors duration-400">
            {item.description}
          </p>
          <div className="flex items-center gap-3 pt-0.5">
            <span className="font-script text-lg sm:text-xl text-sage group-hover:text-bisque transition-colors duration-400">
              {item.note}
            </span>
            <span className="text-xs font-medium tracking-wider uppercase text-porcelain/50 group-hover:text-white group-hover:bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-400 underline-offset-4">
              enquire piece &rarr;
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Collection() {
  return (
    <section id="collection" className="bg-kiln px-6 md:px-12 py-24 md:py-32 overflow-hidden">
      {/* Header with Staggered Scroll Entrance */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display font-medium text-huge text-porcelain leading-[0.98] py-1">
            <SplitText text="The" />
            <br />
            <SplitText text="Collection" delay={0.08} />
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 text-rust"
        >
          <Sparkles size={16} />
          <span className="font-script text-2xl text-rust">
            made in small batches
          </span>
        </motion.div>
      </div>

      {/* Staggered Scroll-Revealed Cards List */}
      <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
        {collection.map((item, i) => (
          <CollectionCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
