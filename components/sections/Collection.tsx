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
    ry.set(px * 4);
    rx.set(-py * 4);
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
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 800 }}
      className={`group border-b border-porcelain/10 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 relative cursor-pointer transition-colors duration-300 hover:border-rust/30 ${
        index % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
      }`}
    >
      {/* Title & Arrow */}
      <div className={`flex items-center gap-3.5 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
        <h3 className="font-display font-medium text-4xl md:text-6xl text-porcelain group-hover:text-rust-light transition-colors duration-300">
          {item.title}
        </h3>
        <motion.div
          animate={{
            x: hovered ? 4 : 0,
            y: hovered ? -4 : 0,
            opacity: hovered ? 1 : 0.3,
          }}
          transition={{ duration: 0.25 }}
          className="text-rust shrink-0"
        >
          <ArrowUpRight size={28} />
        </motion.div>
      </div>

      {/* Description & Action */}
      <div className={`flex flex-col gap-3 max-w-lg ${index % 2 === 1 ? "md:items-end" : ""}`}>
        <p className="font-display italic font-normal text-lg md:text-xl text-porcelain/75 group-hover:text-porcelain/90 leading-relaxed transition-colors duration-300">
          {item.description}
        </p>
        <div className="flex items-center gap-3.5 pt-0.5">
          <span className="font-script text-xl text-sage">
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

      <div className="flex flex-col border-t border-porcelain/10">
        {collection.map((item, i) => (
          <CollectionRow key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
