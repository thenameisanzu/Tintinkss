"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { collection } from "@/lib/content";
import SplitText from "@/components/SplitText";
import { useInquiryModal } from "@/components/InquiryModalContext";
import { ArrowUpRight } from "lucide-react";

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

  // 3D Tilt Values
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });

  // Radial Reveal Cursor Tracking Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 300 });

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
    ry.set(px * 5);
    rx.set(-py * 5);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
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
      ref={ref}
      onClick={handleEnquire}
      onMouseMove={handleMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 900 }}
      className={`group relative p-7 sm:p-9 md:p-12 rounded-[2rem] sm:rounded-[2.4rem] bg-porcelain/[0.035] border border-porcelain/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 md:gap-12 cursor-pointer transition-all duration-400 shadow-sm hover:shadow-2xl overflow-hidden ${
        index % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
      }`}
    >
      {/* Dynamic Cursor-Tracking Radial Spotlight Reveal */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] sm:rounded-[2.4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              550px circle at ${smoothX}px ${smoothY}px,
              rgba(184, 84, 47, 0.22),
              rgba(184, 84, 47, 0.06) 40%,
              transparent 80%
            )
          `,
        }}
      />

      {/* Radial Border Highlight Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] sm:rounded-[2.4rem] border-2 border-rust/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
        <h3 className="font-display font-medium text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-porcelain group-hover:text-rust transition-colors duration-300 tracking-tight break-words">
          {item.title}
        </h3>
        <motion.div
          animate={{
            x: hovered ? 4 : 0,
            y: hovered ? -4 : 0,
            opacity: hovered ? 1 : 0.4,
          }}
          transition={{ duration: 0.25 }}
          className="text-rust shrink-0"
        >
          <ArrowUpRight size={26} className="md:w-8 md:h-8" />
        </motion.div>
      </div>

      {/* Description & Action */}
      <div className={`relative z-10 flex flex-col gap-3 sm:gap-3.5 max-w-full md:max-w-[48%] ${index % 2 === 1 ? "md:items-end" : ""}`}>
        <p className="font-display italic font-normal text-base sm:text-lg md:text-lg lg:text-xl text-porcelain/75 group-hover:text-porcelain/90 leading-relaxed transition-colors duration-300">
          {item.description}
        </p>
        <div className="flex items-center gap-3 pt-0.5">
          <span className="font-script text-lg sm:text-xl text-sage">
            {item.note}
          </span>
          <span className="text-xs font-medium tracking-wider uppercase text-porcelain/40 group-hover:text-rust transition-colors underline-offset-4 group-hover:underline">
            enquire piece &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Collection() {
  return (
    <section id="collection" className="bg-kiln px-6 md:px-12 py-24 md:py-32">
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <h2 className="font-display font-medium text-huge text-porcelain leading-[0.98] py-1">
          <SplitText text="The" />
          <br />
          <SplitText text="Collection" delay={0.08} />
        </h2>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="hidden md:block font-script text-2xl text-rust mb-2"
        >
          made in small batches
        </motion.span>
      </div>

      {/* Cards List with Zero Divider Lines */}
      <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
        {collection.map((item, i) => (
          <CollectionCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
