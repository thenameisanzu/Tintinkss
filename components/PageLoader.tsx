"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/content";

const STAGES = [
  { threshold: 0, text: "Centering the clay..." },
  { threshold: 35, text: "Bisque firing at 1080°C..." },
  { threshold: 70, text: "Glazing & hand-finishing..." },
  { threshold: 96, text: "Studio pieces ready." },
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

    // Progress counter animation from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = "";
          }, 350);
          return 100;
        }
        // Organic progress increments
        const increment = prev < 40 ? 4 : prev < 80 ? 3 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 35);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (reduced) return null;

  const currentStage =
    [...STAGES].reverse().find((s) => progress >= s.threshold)?.text || STAGES[0].text;

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[200] select-none pointer-events-auto overflow-hidden">
          {/* Top Curtain Panel */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
            }}
            className="absolute inset-x-0 top-0 h-[50.5vh] bg-[#F6F3EE] border-b border-clay-300/40 shadow-sm flex items-end justify-center"
          />

          {/* Bottom Curtain Panel */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{
              y: "100%",
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
            }}
            className="absolute inset-x-0 bottom-0 h-[50.5vh] bg-[#F6F3EE] border-t border-clay-300/40 shadow-sm flex items-start justify-center"
          />

          {/* Center Content Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.92,
              transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
          >
            {/* Ambient Warm Ceramic Glow */}
            <div className="absolute w-72 h-72 bg-rust/10 rounded-full blur-3xl pointer-events-none" />

            {/* Embossed Ceramic Maker's Seal Medallion */}
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 15px 35px -5px rgba(44, 36, 32, 0.12), 0 0 0 1px rgba(184, 84, 47, 0.15)",
                    "0 20px 45px -5px rgba(184, 84, 47, 0.22), 0 0 0 1px rgba(184, 84, 47, 0.35)",
                    "0 15px 35px -5px rgba(44, 36, 32, 0.12), 0 0 0 1px rgba(184, 84, 47, 0.15)",
                  ],
                }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-porcelain p-1.5 border-2 border-rust/30 flex items-center justify-center"
              >
                {/* Subtle Inner Ring */}
                <div className="absolute inset-1 rounded-full border border-clay-300/40 pointer-events-none" />

                <Image
                  src="/logo.png"
                  alt={`${site.name} logo`}
                  fill
                  sizes="(max-width: 768px) 96px, 112px"
                  priority
                  className="object-cover rounded-full p-1"
                />
              </motion.div>

              {/* Brand Title */}
              <div className="mt-5 text-center">
                <div className="flex items-baseline justify-center gap-2 font-display text-3xl md:text-4xl text-kiln font-medium tracking-tight">
                  <span>{site.name}</span>
                  <span className="font-script text-rust text-2xl md:text-3xl lowercase">by jia</span>
                </div>
                <span className="font-serif italic text-xs tracking-widest uppercase text-kiln/50 mt-1 block">
                  Studio Pottery &bull; Kottayam
                </span>
              </div>

              {/* Pottery Firing Progress & Timeline */}
              <div className="mt-8 flex flex-col items-center w-64 md:w-72">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-clay-200/80 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-rust rounded-full relative"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  >
                    {/* Glowing lead point */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rust-light shadow-[0_0_8px_rgba(224,114,75,0.8)]" />
                  </motion.div>
                </div>

                {/* Progress Info: Stage Text & Percentage */}
                <div className="w-full flex items-center justify-between mt-3 text-xs">
                  <motion.span
                    key={currentStage}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-script text-base md:text-lg text-rust"
                  >
                    {currentStage}
                  </motion.span>
                  <span className="font-mono font-medium text-kiln/70 text-xs">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
