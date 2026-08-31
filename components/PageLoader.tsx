"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stamped, setStamped] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    if (prefersReduced) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = "";
          }, 500);
          return 100;
        }
        if (prev >= 45 && !stamped) {
          setStamped(true);
        }
        const increment = prev < 40 ? 4 : prev < 75 ? 3 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 36);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [stamped]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(6px)",
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F7F4EE] select-none pointer-events-auto overflow-hidden px-6"
        >
          {/* Subtle Ambient Studio Clay Glow */}
          <div className="absolute w-[500px] h-[500px] bg-rust/10 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] bg-sage/15 rounded-full blur-[90px] -bottom-10 -right-10 pointer-events-none" />

          {/* Central Ceramic Sketch & Stamp Container */}
          <div className="relative flex flex-col items-center max-w-sm w-full">
            
            {/* SVG Hand-Drawn Ceramic Vessel & Flora Illustration */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full absolute inset-0 pointer-events-none drop-shadow-sm overflow-visible"
              >
                {/* Outer delicate guide halo */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="#B8542F"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  strokeOpacity="0.35"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Hand-drawn Ceramic Vase Outline (Drawn in real-time) */}
                <motion.path
                  d="M 68 55 C 68 70, 60 85, 52 110 C 44 135, 56 160, 100 160 C 144 160, 156 135, 148 110 C 140 85, 132 70, 132 55 C 132 48, 120 45, 100 45 C 80 45, 68 48, 68 55 Z"
                  fill="none"
                  stroke="#B8542F"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
                />

                {/* Botanical Wildflower Stem emerging from vessel */}
                <motion.path
                  d="M 100 45 Q 105 25, 115 15 M 104 32 Q 116 30, 120 24 M 98 22 Q 88 18, 86 12"
                  fill="none"
                  stroke="#7A8B78"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.9 }}
                  transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
                />

                {/* Delicate vessel base line */}
                <motion.path
                  d="M 80 166 L 120 166"
                  stroke="#2C2420"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeOpacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </svg>

              {/* Tintinkss Seal Logo - Tactile Ink Stamp Drop */}
              <motion.div
                initial={{ scale: 0, opacity: 0, y: -20, rotate: -15 }}
                animate={{
                  scale: stamped ? 1 : 0,
                  opacity: stamped ? 1 : 0,
                  y: stamped ? 0 : -20,
                  rotate: stamped ? 0 : -15,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 22,
                  mass: 0.8,
                }}
                className="relative z-10 w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-porcelain p-1.5 shadow-[0_12px_30px_rgba(184,84,47,0.22)] border-2 border-rust flex items-center justify-center"
              >
                {/* Concentric stamp impression ring */}
                <div className="absolute inset-1 rounded-full border border-rust/40 pointer-events-none" />

                <Image
                  src="/logo.png"
                  alt={`${site.name} logo`}
                  fill
                  sizes="(max-width: 768px) 88px, 104px"
                  priority
                  className="object-cover rounded-full p-0.5"
                />
              </motion.div>
            </div>

            {/* Brand Title & Handwritten Details */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-5 text-center flex flex-col items-center"
            >
              <div className="flex items-baseline justify-center gap-2 font-display text-3xl sm:text-4xl text-kiln font-medium tracking-tight">
                <span>{site.name}</span>
                <span className="font-script text-rust text-2xl sm:text-3xl lowercase">by jia</span>
              </div>
              <span className="font-script text-xl sm:text-2xl text-rust/90 mt-1">
                handmade slowly in Kottayam
              </span>
            </motion.div>

            {/* Minimal Progress Line & Milestone */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 w-full max-w-[220px] flex flex-col items-center"
            >
              <div className="w-full h-1 bg-clay-200 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-rust rounded-full relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rust-light shadow-[0_0_6px_rgba(224,114,75,0.9)]" />
                </motion.div>
              </div>

              <div className="w-full flex items-center justify-between mt-2 font-serif italic text-xs text-kiln/60">
                <span>Small batch ceramics</span>
                <span className="font-mono font-medium text-rust text-xs">{progress}%</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
