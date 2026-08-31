"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";

const CRAFT_STAGES = [
  { threshold: 0, label: "01", text: "Centering raw stoneware..." },
  { threshold: 30, label: "02", text: "Wheel throwing & trimming..." },
  { threshold: 65, label: "03", text: "Bisque firing at 1080°C..." },
  { threshold: 90, label: "04", text: "Hand-glazing studio collection..." },
  { threshold: 98, label: "05", text: "Pieces ready." },
];

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
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
          }, 450);
          return 100;
        }
        const increment = prev < 35 ? 4 : prev < 75 ? 3 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 34);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (reduced) return null;

  const currentStage =
    [...CRAFT_STAGES].reverse().find((s) => progress >= s.threshold) || CRAFT_STAGES[0];

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[200] select-none pointer-events-auto overflow-hidden">
          
          {/* Staggered Vertical Shutter Columns (Reveal Exit Animation) */}
          <div className="absolute inset-0 flex z-0 pointer-events-none">
            {[0, 1, 2, 3].map((col) => (
              <motion.div
                key={col}
                initial={{ y: "0%" }}
                exit={{
                  y: "-100%",
                  transition: {
                    duration: 0.85,
                    ease: [0.77, 0, 0.175, 1],
                    delay: col * 0.08,
                  },
                }}
                className="h-full w-[25.2%] -mr-[0.2%] bg-[#1C1613]"
              />
            ))}
          </div>

          {/* Main Content Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.94,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-porcelain"
          >
            {/* Ambient Kiln Hearth Glow */}
            <div className="absolute w-[500px] h-[500px] bg-rust/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative flex flex-col items-center max-w-sm w-full text-center">
              
              {/* Ceramic Maker's Seal Medallion */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center mb-6"
              >
                {/* Breathing Terracotta Halo */}
                <motion.div
                  className="absolute -inset-2.5 rounded-full border border-rust/30 pointer-events-none"
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Embossed Ceramic Medallion */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-porcelain p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.35)] border-2 border-rust/60 flex items-center justify-center">
                  <div className="absolute inset-1 rounded-full border border-clay-300/40 pointer-events-none" />
                  <Image
                    src="/logo.png"
                    alt={`${site.name} logo`}
                    fill
                    sizes="(max-width: 768px) 96px, 112px"
                    priority
                    className="object-cover rounded-full p-0.5"
                  />
                </div>
              </motion.div>

              {/* Brand Title */}
              <div className="flex items-baseline justify-center gap-2 font-display text-3xl sm:text-4xl text-porcelain font-medium tracking-tight">
                <span>{site.name}</span>
                <span className="font-script text-rust text-2xl sm:text-3xl lowercase">by jia</span>
              </div>

              {/* Poetic Philosophy Line */}
              <p className="font-script text-xl sm:text-2xl text-porcelain/80 mt-1.5">
                everything here was mud once
              </p>

              {/* Pottery Craft Progress Bar & Milestones */}
              <div className="mt-8 w-full max-w-[260px] flex flex-col items-center">
                {/* Hairline Progress Bar */}
                <div className="w-full h-[2px] bg-porcelain/15 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-rust rounded-full relative"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-rust-light shadow-[0_0_8px_rgba(224,114,75,1)]" />
                  </motion.div>
                </div>

                {/* Dynamic Stage Narrative & Percent */}
                <div className="w-full flex items-center justify-between mt-3 text-xs">
                  <motion.span
                    key={currentStage.text}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif italic text-porcelain/70 text-xs truncate max-w-[190px]"
                  >
                    {currentStage.text}
                  </motion.span>
                  <span className="font-mono font-medium text-rust text-xs">
                    {progress}%
                  </span>
                </div>
              </div>

              {/* Studio Origin Micro-Tag */}
              <span className="font-serif italic text-[11px] tracking-widest uppercase text-porcelain/40 mt-6 block">
                Kottayam, Kerala &bull; Studio Pottery
              </span>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
