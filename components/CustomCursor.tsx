"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const springX = useSpring(cx, { damping: 25, stiffness: 300, mass: 0.5 });
  const springY = useSpring(cy, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };
    window.addEventListener("mousemove", move);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) setHovering(false);
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [cx, cy]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: hovering ? 32 : 12,
          height: hovering ? 32 : 12,
          opacity: hovering ? 0.9 : 0.65,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-full bg-porcelain shadow-sm"
      />
    </motion.div>
  );
}
