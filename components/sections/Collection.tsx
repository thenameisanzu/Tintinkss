"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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

function CollectionRow({
  item,
  index,
}: {
  item: (typeof collection)[number];
  index: number;
}) {
  const { openModal } = useInquiryModal();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 6);
    rx.set(-py * 6);
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      data-cursor-hover
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 800 }}
      className={`group border-t border-porcelain/15 py-8 md:py-12 flex flex-col md:flex-row gap-3 md:gap-10 relative cursor-pointer ${
        index % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
      }`}
    >
      <motion.div
        animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 0.12 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-rust rounded-3xl -z-10"
      />
      <div className="md:w-2/5 flex items-center gap-3">
        <h3 className="font-display font-medium text-4xl md:text-6xl text-porcelain group-hover:text-rust transition-colors duration-300">
          {item.title}
        </h3>
        <ArrowUpRight
          size={24}
          className="text-rust opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0"
        />
      </div>
      <div className={`md:w-3/5 flex flex-col gap-3 ${index % 2 === 1 ? "md:items-end" : ""}`}>
        <p className="font-display italic font-normal text-lg md:text-xl text-porcelain/75 max-w-md leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ x: hovered ? 6 : 0 }}
            className="font-script text-xl text-sage"
          >
            {item.note}
          </motion.span>
          <span className="text-xs text-porcelain/40 group-hover:text-rust transition-colors underline-offset-4 group-hover:underline">
            enquire piece &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Collection() {
  return (
    <section id="collection" className="bg-kiln px-6 md:px-10 py-24 md:py-32">
      <div className="flex items-end justify-between mb-16 md:mb-24">
        <h2 className="font-display font-medium text-huge text-porcelain leading-[0.9]">
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

      <div className="flex flex-col">
        {collection.map((item, i) => (
          <CollectionRow key={item.title} item={item} index={i} />
        ))}
        <div className="border-t border-porcelain/15" />
      </div>
    </section>
  );
}
